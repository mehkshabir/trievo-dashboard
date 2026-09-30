import React from 'react';
import { Search, RotateCw, Bell, Sparkles, ShieldCheck } from 'lucide-react';
import { StaffRole } from '../../types';

interface GlassConsoleHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onRefresh: () => void;
  role: StaffRole;
  onRoleToggle: () => void;
  criticalCount: number;
  onAlertClick: () => void;
  isSyncing: boolean;
}

export const GlassConsoleHeader: React.FC<GlassConsoleHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onRefresh,
  role,
  onRoleToggle,
  criticalCount,
  onAlertClick,
  isSyncing
}) => {
  return (
    <header className="console-header">
      {/* Brand logo matching inspo */}
      <div className="brand-block">
        <div className="brand-icon">
          <Sparkles size={22} strokeWidth={2.4} />
        </div>
        <div>
          <h1 className="brand-title">TrievoHealth</h1>
          <p className="brand-subtitle">Emergency Triage Decision Support Console</p>
        </div>
      </div>

      {/* Frosted search pill */}
      <div className="search-pill-container">
        <Search size={16} color="#64748b" />
        <input
          id="patient-search-input"
          type="text"
          className="search-input"
          placeholder="Search patient name, MRN, symptom, ESI level..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Header controls cluster */}
      <div className="header-actions">
        {/* Sync button */}
        <button
          id="header-sync-btn"
          className="header-circle-btn"
          onClick={onRefresh}
          title="Re-sync priority queue via BFF"
          aria-label="Refresh triage queue"
        >
          <RotateCw size={17} className={isSyncing ? 'animate-spin' : ''} />
        </button>

        {/* Alerts button with ping badge */}
        <button
          id="header-alert-btn"
          className="header-circle-btn"
          onClick={onAlertClick}
          title="Active Critical Alerts"
          aria-label="Critical notifications"
        >
          <Bell size={17} />
          {criticalCount > 0 && <span className="pulse-badge" />}
        </button>

        {/* Staff profile pill with interactive role toggle */}
        <div
          id="staff-profile-pill"
          className="staff-profile-pill"
          onClick={onRoleToggle}
          title={`Click to switch role (Current: ${role.toUpperCase()})`}
          role="button"
          tabIndex={0}
        >
          <img
            src="/assets/dr_jane.jpg"
            alt="Dr. Jane"
            className="avatar-circle"
          />
          <div>
            <div className="staff-name">Dr. Jane M.</div>
            <div className="staff-role-tag">
              {role === 'admin' ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  <ShieldCheck size={11} /> ADMIN LEAD
                </span>
              ) : (
                'STAFF ON-DUTY'
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
