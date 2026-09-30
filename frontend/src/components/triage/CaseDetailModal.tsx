import { X, ShieldAlert, CheckCircle, Activity } from 'lucide-react';
import { PatientCase } from '../../types';

interface CaseDetailModalProps {
  caseItem: PatientCase | null;
  onClose: () => void;
  onRerun: (caseItem: PatientCase) => void;
  onAcknowledge: (caseId: string) => void;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({
  caseItem,
  onClose,
  onRerun,
  onAcknowledge
}) => {
  if (!caseItem) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-glass"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: caseItem.priorityLevel === 1 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(20, 184, 166, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: caseItem.priorityLevel === 1 ? '#ef4444' : '#0d9488'
            }}
          >
            <Activity size={22} />
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
              TRIEVO CLINICAL REPORT • MRN: {caseItem.mrn}
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#0f172a' }}>
              {caseItem.patientName}, {caseItem.age}y ({caseItem.gender})
            </h2>
          </div>
        </div>

        {/* Priority Engine Box */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            borderRadius: 18,
            padding: 18,
            marginBottom: 16
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0d9488', textTransform: 'uppercase' }}>
              Trievo Priority Engine Analysis
            </span>
            <span className={`esi-badge level-${caseItem.priorityLevel}`}>
              ESI {caseItem.priorityLevel} • {caseItem.priorityLabel}
            </span>
          </div>
          <p style={{ fontSize: 13.5, color: '#334155', lineHeight: 1.5 }}>
            {caseItem.explanation.priorityReason}
          </p>
          <div style={{ marginTop: 8, fontSize: 11.5, color: '#64748b' }}>
            Model Confidence: <b>{(caseItem.explanation.confidenceScore * 100).toFixed(0)}%</b> • Algorithmic Classification via ESI v4 Protocols
          </div>
        </div>

        {/* Verify Safety Rule Flags */}
        <div
          style={{
            background: caseItem.verifyFlags.length > 0 ? 'rgba(254, 242, 242, 0.7)' : 'rgba(240, 253, 250, 0.7)',
            border: caseItem.verifyFlags.length > 0 ? '1px solid rgba(254, 202, 202, 0.8)' : '1px solid rgba(204, 251, 241, 0.8)',
            borderRadius: 18,
            padding: 18,
            marginBottom: 16
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            {caseItem.verifyFlags.length > 0 ? (
              <>
                <ShieldAlert size={16} color="#dc2626" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#b91c1c' }}>
                  Trievo Verify Safety Guardrails Triggered
                </span>
              </>
            ) : (
              <>
                <CheckCircle size={16} color="#059669" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#047857' }}>
                  Trievo Verify: All Safety Checks Passed
                </span>
              </>
            )}
          </div>
          <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.4 }}>
            {caseItem.explanation.verifyDetails}
          </p>
        </div>

        {/* Recommended Clinical Action */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.65)',
            borderRadius: 18,
            padding: 16,
            marginBottom: 20
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>
            Recommended Clinical Protocol:
          </div>
          <div style={{ fontSize: 13, color: '#0f172a', fontWeight: 600 }}>
            {caseItem.explanation.recommendedAction}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={() => {
              onRerun(caseItem);
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 9999,
              padding: '8px 16px',
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Re-run Priority Classification
          </button>

          {caseItem.priorityLevel === 1 && !caseItem.acknowledged && (
            <button
              onClick={() => {
                onAcknowledge(caseItem.id);
                onClose();
              }}
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: 9999,
                padding: '8px 18px',
                fontSize: 12.5,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
              }}
            >
              Acknowledge Alert
            </button>
          )}

          <button
            onClick={onClose}
            style={{
              background: '#0d9488',
              color: 'white',
              border: 'none',
              borderRadius: 9999,
              padding: '8px 20px',
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)'
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
