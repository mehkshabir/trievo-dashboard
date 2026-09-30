import React from 'react';
import { Droplet, Calendar, Video, RefreshCw, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { PatientCase } from '../../types';

interface PriorityQueueCardsProps {
  cases: PatientCase[];
  onRerunTriage: (caseItem: PatientCase) => void;
  onAcknowledgeAlert: (caseId: string) => void;
  onViewReport: (caseItem: PatientCase) => void;
  onOverridePriority: (caseItem: PatientCase) => void;
}

export const PriorityQueueCards: React.FC<PriorityQueueCardsProps> = ({
  cases,
  onRerunTriage,
  onAcknowledgeAlert,
  onViewReport,
  onOverridePriority
}) => {
  const getCategoryIcon = (index: number) => {
    if (index === 0) return <Droplet size={14} color="#0f766e" />;
    if (index === 1) return <Calendar size={14} color="#9333ea" />;
    return <Video size={14} color="#0284c7" />;
  };

  const getPriorityBadge = (level: number, label: string) => {
    return <span className={`esi-badge level-${level}`}>ESI {level} • {label}</span>;
  };

  return (
    <section className="bottom-queue-section" aria-label="In-Week Visits and Live Priority Queue">
      <div className="queue-section-title">
        <span>In-Week Visits & Live Emergency Triage</span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#0d9488' }}>
          ● Live WebSocket Stream
        </span>
      </div>

      <div className="queue-cards-grid">
        {cases.map((caseItem, idx) => {
          return (
            <div
              key={caseItem.id}
              className="priority-case-card"
              id={`case-card-${caseItem.id}`}
            >
              {/* Card Top: Category Icon + Scheduled Date + Priority Badge */}
              <div className="case-card-header">
                <div className="case-date-pill">
                  <div className="case-icon-badge">{getCategoryIcon(idx)}</div>
                  <span>{caseItem.scheduledTime}</span>
                </div>
                {getPriorityBadge(caseItem.priorityLevel, caseItem.priorityLabel)}
              </div>

              {/* Service Category (CBC / Clinic Visit / Video Consultation) */}
              <div>
                <div className="case-title">{caseItem.serviceCategory}</div>
                <div className="case-complaint" style={{ marginTop: '4px' }}>
                  {caseItem.chiefComplaint}
                </div>
              </div>

              {/* Patient Vitals Quick-Strip */}
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  fontSize: '11px',
                  color: '#64748b',
                  background: 'rgba(255, 255, 255, 0.45)',
                  padding: '6px 10px',
                  borderRadius: '10px'
                }}
              >
                <span>HR: <b>{caseItem.vitals.heartRate}</b></span>
                <span>BP: <b>{caseItem.vitals.bpSystolic}/{caseItem.vitals.bpDiastolic}</b></span>
                <span>SpO2: <b>{caseItem.vitals.spo2}%</b></span>
              </div>

              {/* Assigned Doctor matching inspo */}
              <div className="case-doctor-row">
                <div className="doctor-info-box">
                  <img
                    src={caseItem.doctor.avatar}
                    alt={caseItem.doctor.name}
                    className="doctor-thumb"
                  />
                  <div>
                    <div className="doc-name">{caseItem.doctor.name}</div>
                    <div className="doc-role">{caseItem.doctor.role}</div>
                  </div>
                </div>
              </div>

              {/* One-Click Action Strip (Specification 07-trievo-dashboard.md) */}
              <div className="card-actions-strip">
                <button
                  className="action-btn-sm"
                  onClick={() => onRerunTriage(caseItem)}
                  title="Re-classify with Priority Engine"
                >
                  <RefreshCw size={11} /> Re-run
                </button>

                {caseItem.priorityLevel === 1 && !caseItem.acknowledged ? (
                  <button
                    className="action-btn-sm primary-action"
                    onClick={() => onAcknowledgeAlert(caseItem.id)}
                    title="Acknowledge Critical Alert"
                  >
                    <AlertCircle size={11} /> Acknowledge
                  </button>
                ) : (
                  <button
                    className="action-btn-sm"
                    onClick={() => onOverridePriority(caseItem)}
                    title="Override Priority Level"
                  >
                    <CheckCircle2 size={11} /> Override
                  </button>
                )}

                <button
                  className="action-btn-sm"
                  onClick={() => onViewReport(caseItem)}
                  title="View Full Trievo Clinical Report"
                >
                  <FileText size={11} /> Report
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
