import React, { useState } from 'react';
import { X, Shield, Check, ToggleLeft, ToggleRight, Save } from 'lucide-react';

interface VerifyRulesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RuleItem {
  id: string;
  name: string;
  category: string;
  description: string;
  enabled: boolean;
}

export const VerifyRulesDrawer: React.FC<VerifyRulesDrawerProps> = ({ isOpen, onClose }) => {
  const [rules, setRules] = useState<RuleItem[]>([
    {
      id: 'RULE_V01',
      name: 'Pediatric Hypoxia Guardrail',
      category: 'Airway & Vitals',
      description: 'Force minimum ESI-2 if age < 5 and SpO2 < 93% regardless of chief complaint.',
      enabled: true
    },
    {
      id: 'RULE_V02',
      name: 'qSOFA Sepsis Auto-Escalator',
      category: 'Infection Safety',
      description: 'Trigger Verify Safety Flag if RR > 22, SBP < 100, or acute altered mentation.',
      enabled: true
    },
    {
      id: 'RULE_V04',
      name: 'Antiplatelet vs GI Bleed Vault Check',
      category: 'Medication Safety',
      description: 'Cross-reference Trievo Vault records before suggesting Aspirin in acute chest pain.',
      enabled: true
    },
    {
      id: 'RULE_V07',
      name: 'Trauma Shock Index Multiplier',
      category: 'Trauma Protocol',
      description: 'Heart Rate / SBP ratio > 0.9 automatically prompts blood bank cross-match readiness.',
      enabled: false
    }
  ]);

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-glass"
        style={{ maxWidth: 640 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}
          >
            <Shield size={20} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0d9488', letterSpacing: '0.04em' }}>
              ADMIN CONSOLE • ROLE-BASED ACCESS
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#0f172a' }}>
              Trievo Verify Rule-Set Editor
            </h2>
          </div>
        </div>

        <p style={{ fontSize: 13, color: '#475569', marginBottom: 18 }}>
          Rules configured here define safety overrides in the independent Verify Engine before classification is rendered to staff.
        </p>

        {savedSuccess && (
          <div
            style={{
              background: 'rgba(209, 250, 229, 0.9)',
              border: '1px solid #10b981',
              borderRadius: 12,
              padding: '8px 14px',
              fontSize: 12,
              color: '#065f46',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 14
            }}
          >
            <Check size={16} /> Rules synchronized to Trievo Verify via Redis Pub/Sub backplane.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {rules.map((rule) => (
            <div
              key={rule.id}
              style={{
                background: 'rgba(255, 255, 255, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                borderRadius: 16,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>
                    {rule.name}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      background: 'rgba(15, 23, 42, 0.06)',
                      padding: '2px 6px',
                      borderRadius: 6,
                      color: '#475569'
                    }}
                  >
                    {rule.id}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.4 }}>
                  {rule.description}
                </div>
              </div>

              <button
                onClick={() => toggleRule(rule.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: rule.enabled ? '#0d9488' : '#94a3b8'
                }}
                title={rule.enabled ? 'Click to disable rule' : 'Click to enable rule'}
              >
                {rule.enabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 9999,
              padding: '8px 18px',
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              background: '#1e293b',
              color: 'white',
              border: 'none',
              borderRadius: 9999,
              padding: '8px 20px',
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Save size={14} /> Save & Broadcast
          </button>
        </div>
      </div>
    </div>
  );
};
