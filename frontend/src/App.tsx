import React, { useState, useMemo } from 'react';
import { FloatingNavDock } from './components/layout/FloatingNavDock';
import { GlassConsoleHeader } from './components/layout/GlassConsoleHeader';
import { Heart3DViewer } from './components/triage/Heart3DViewer';
import { LeadClinicianCard } from './components/triage/LeadClinicianCard';
import { ShiftCalendarWidget } from './components/triage/ShiftCalendarWidget';
import { PriorityQueueCards } from './components/triage/PriorityQueueCards';
import { FloatingMetricsDock } from './components/layout/FloatingMetricsDock';
import { CaseDetailModal } from './components/triage/CaseDetailModal';
import { VideoCallModal } from './components/triage/VideoCallModal';
import { VerifyRulesDrawer } from './components/admin/VerifyRulesDrawer';
import { CircularGauge } from './components/ui/CircularGauge';
import { INITIAL_CASES } from './services/mockData';
import { PatientCase, StaffRole } from './types';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cases, setCases] = useState<PatientCase[]>(INITIAL_CASES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [role, setRole] = useState<StaffRole>('staff');
  const [selectedCaseForReport, setSelectedCaseForReport] = useState<PatientCase | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isRulesDrawerOpen, setIsRulesDrawerOpen] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Filtered cases based on search query
  const filteredCases = useMemo(() => {
    if (!searchQuery.trim()) return cases;
    const q = searchQuery.toLowerCase();
    return cases.filter(
      (c) =>
        c.patientName.toLowerCase().includes(q) ||
        c.mrn.toLowerCase().includes(q) ||
        c.chiefComplaint.toLowerCase().includes(q) ||
        c.serviceCategory.toLowerCase().includes(q) ||
        `esi ${c.priorityLevel}`.includes(q)
    );
  }, [cases, searchQuery]);

  // Count active unacknowledged critical cases
  const criticalCount = useMemo(() => {
    return cases.filter((c) => c.priorityLevel === 1 && !c.acknowledged).length;
  }, [cases]);

  // One-Click Action: Re-run Triage (dispatches POST /api/v1/priority/classify)
  const handleRerunTriage = (targetCase: PatientCase) => {
    setIsSyncing(true);
    setNotificationMsg(`Triggered POST /api/v1/priority/classify for ${targetCase.mrn}...`);

    setTimeout(() => {
      setCases((prev) =>
        prev.map((c) => {
          if (c.id === targetCase.id) {
            return {
              ...c,
              explanation: {
                ...c.explanation,
                confidenceScore: Math.min(0.99, c.explanation.confidenceScore + 0.02)
              }
            };
          }
          return c;
        })
      );
      setIsSyncing(false);
      setNotificationMsg(`Triage re-classified successfully via Priority Engine for ${targetCase.patientName}.`);
      setTimeout(() => setNotificationMsg(null), 3000);
    }, 800);
  };

  // One-Click Action: Acknowledge Critical Alert
  const handleAcknowledgeAlert = (caseId: string) => {
    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, acknowledged: true } : c))
    );
    setNotificationMsg('Critical STEMI alert acknowledged. Cath Lab notified.');
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  // One-Click Action: Override Priority
  const handleOverridePriority = (targetCase: PatientCase) => {
    const nextLevel = targetCase.priorityLevel === 2 ? 3 : 2;
    const nextLabel = nextLevel === 2 ? 'Emergent' : 'Urgent';

    setCases((prev) =>
      prev.map((c) =>
        c.id === targetCase.id
          ? {
              ...c,
              priorityLevel: nextLevel,
              priorityLabel: nextLabel,
              explanation: {
                ...c.explanation,
                verifyStatus: 'OVERRIDDEN',
                verifyDetails: `Attending Physician manually adjusted priority to ESI-${nextLevel}. Audit logged in Trievo Vault.`
              }
            }
          : c
      )
    );
    setNotificationMsg(`Priority overridden to ESI-${nextLevel} for ${targetCase.patientName}.`);
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  // Switch role or open rule drawer
  const handleRoleToggle = () => {
    if (role === 'staff') {
      setRole('admin');
      setIsRulesDrawerOpen(true);
    } else {
      setRole('staff');
    }
  };

  return (
    <div className="ambient-viewport">
      <div className="ambient-overlay" />

      {/* Main Container Stage */}
      <div className="dashboard-stage">
        {/* Left Floating Pill Dock */}
        <FloatingNavDock
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === 'settings') setIsRulesDrawerOpen(true);
          }}
        />

        {/* Central Frosted Glass Window */}
        <main className="glass-console-window">
          {/* Header */}
          <GlassConsoleHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onRefresh={() => {
              setIsSyncing(true);
              setTimeout(() => {
                setIsSyncing(false);
                setNotificationMsg('Triage Queue synchronized via Redis backplane.');
                setTimeout(() => setNotificationMsg(null), 2500);
              }, 600);
            }}
            role={role}
            onRoleToggle={handleRoleToggle}
            criticalCount={criticalCount}
            onAlertClick={() => {
              const critical = cases.find((c) => c.priorityLevel === 1);
              if (critical) setSelectedCaseForReport(critical);
            }}
            isSyncing={isSyncing}
          />

          {/* Active Critical Banner (Prominent for ESI-1) */}
          {criticalCount > 0 && (
            <div className="critical-alert-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <AlertTriangle size={18} color="#ef4444" className="animate-pulse" />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#b91c1c' }}>
                  CRITICAL ALERT: 1 Patient with unacknowledged ESI-1 (STEMI suspected) in Resus Bay 1
                </span>
              </div>
              <button
                onClick={() => handleAcknowledgeAlert(cases[0].id)}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: 9999,
                  padding: '5px 14px',
                  fontSize: 11.5,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Acknowledge Alert
              </button>
            </div>
          )}

          {/* Real-time Toast Feedback */}
          {notificationMsg && (
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: 14,
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                alignSelf: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
              }}
            >
              <CheckCircle size={14} color="#14b8a6" />
              <span>{notificationMsg}</span>
            </div>
          )}

          {/* Upper Stage: 3D Organ + Widgets Grid */}
          <div className="console-main-grid">
            {/* Left Organ Column */}
            <div className="left-organ-column">
              <div className="overview-header">
                <h2 className="overview-title">
                  Overview <span>Patient Health</span>
                </h2>

                {/* Circular Gauge Matching Inspo 5% */}
                <div className="dial-container" title="ESI Level 1 Critical Ratio">
                  <CircularGauge
                    value={5}
                    size={56}
                    strokeWidth={5}
                    color1="#0d9488"
                    label=""
                  />
                </div>
              </div>

              {/* Interactive 3D Heart Viewport with floating tags */}
              <Heart3DViewer />
            </div>

            {/* Right Column: Clock + Clinician Card + Shift Calendar */}
            <div className="right-widgets-column">
              <LeadClinicianCard
                onVideoCallClick={() => setIsVideoModalOpen(true)}
              />

              <ShiftCalendarWidget />
            </div>
          </div>

          {/* Bottom Row: In-Week Visits & Live Priority Queue */}
          <PriorityQueueCards
            cases={filteredCases}
            onRerunTriage={handleRerunTriage}
            onAcknowledgeAlert={handleAcknowledgeAlert}
            onViewReport={(c) => setSelectedCaseForReport(c)}
            onOverridePriority={handleOverridePriority}
          />

          {/* Bottom Floating Stat Dock (5% | 5% | 5%) */}
          <FloatingMetricsDock
            criticalPercent={5}
            emergentPercent={5}
            stablePercent={5}
          />
        </main>
      </div>

      {/* Modals & Drawers */}
      <CaseDetailModal
        caseItem={selectedCaseForReport}
        onClose={() => setSelectedCaseForReport(null)}
        onRerun={handleRerunTriage}
        onAcknowledge={handleAcknowledgeAlert}
      />

      <VideoCallModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <VerifyRulesDrawer
        isOpen={isRulesDrawerOpen}
        onClose={() => setIsRulesDrawerOpen(false)}
      />
    </div>
  );
};
