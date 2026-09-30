import React, { useState } from 'react';
import { X, Mic, MicOff, Video, VideoOff, PhoneOff, Activity } from 'lucide-react';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({ isOpen, onClose }) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-glass"
        style={{ maxWidth: 540, padding: 24, textAlign: 'center' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#0d9488', letterSpacing: '0.05em' }}>
            SECURE CLINICAL TELE-TRIAGE SESSION • E2EE
          </span>
        </div>

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 280,
            borderRadius: 20,
            overflow: 'hidden',
            background: '#0f172a',
            marginBottom: 18,
            boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
          }}
        >
          {videoOn ? (
            <img
              src="/assets/dr_jane.jpg"
              alt="Dr. Jane Video Feed"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b'
              }}
            >
              Video Disabled
            </div>
          )}

          {/* Vitals HUD overlay on call */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(8px)',
              padding: '6px 12px',
              borderRadius: 12,
              color: 'white',
              fontSize: 11,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Activity size={13} color="#14b8a6" />
            <span>ECG Sinus 72 bpm • SpO2 99%</span>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: 8,
              color: 'white',
              fontSize: 12,
              fontWeight: 600
            }}
          >
            Jane (Cardiologist) • On-Duty
          </div>
        </div>

        {/* Call Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
          <button
            onClick={() => setMicOn(!micOn)}
            style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: micOn ? 'rgba(255,255,255,0.8)' : '#ef4444',
              color: micOn ? '#0f172a' : 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={micOn ? 'Mute Mic' : 'Unmute Mic'}
          >
            {micOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>

          <button
            onClick={() => setVideoOn(!videoOn)}
            style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: videoOn ? 'rgba(255,255,255,0.8)' : '#ef4444',
              color: videoOn ? '#0f172a' : 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={videoOn ? 'Turn Camera Off' : 'Turn Camera On'}
          >
            {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>

          <button
            onClick={onClose}
            style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="End Video Call"
          >
            <PhoneOff size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
