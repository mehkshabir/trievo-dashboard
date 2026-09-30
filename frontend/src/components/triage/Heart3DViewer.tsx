import React, { useState } from 'react';
import { Heart, Activity, Box, Rotate3d } from 'lucide-react';
import { LiveEcWaveform } from './LiveEcWaveform';

export const Heart3DViewer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'cgi' | 'sketchfab'>('cgi');
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // Sketchfab Heart Model UID
  const sketchfabUID = '9ac30f400abf4fd0848f941d76bdc23d'; // Animated Heart Model

  return (
    <div className="organ-stage-viewport" id="organ-3d-stage">
      {/* 3D Model Render Area */}
      {viewMode === 'sketchfab' ? (
        <iframe
          title="Sketchfab 3D Heart Organ"
          className="organ-3d-iframe"
          src={`https://sketchfab.com/models/${sketchfabUID}/embed?autostart=1&autospin=0.3&transparent=1&ui_controls=0&ui_infos=0&ui_watermark=0`}
          allow="autoplay; fullscreen; xr-spatial-tracking"
        />
      ) : (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="/assets/heart_3d.png"
            alt="3D Anatomical Heart"
            className="organ-image-fallback"
            style={{
              animationPlayState: isRotating ? 'running' : 'paused'
            }}
          />
        </div>
      )}

      {/* Mode Switcher Tool Badge */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 18,
          display: 'flex',
          gap: 6,
          zIndex: 10
        }}
      >
        <button
          onClick={() => setViewMode(viewMode === 'cgi' ? 'sketchfab' : 'cgi')}
          style={{
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            borderRadius: '9999px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#334155',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
          }}
          title="Switch 3D View Mode (Sketchfab Embed vs CGI Render)"
        >
          {viewMode === 'cgi' ? <Box size={13} /> : <Rotate3d size={13} />}
          {viewMode === 'cgi' ? 'Sketchfab 3D' : 'High-Res CGI'}
        </button>

        <button
          onClick={() => setIsRotating(!isRotating)}
          style={{
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            borderRadius: '9999px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#334155',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
          }}
          title="Toggle Pulse Animation"
        >
          <Activity size={13} />
          {isRotating ? 'Pulse: ON' : 'Pulse: PAUSE'}
        </button>
      </div>

      {/* Floating Tag: "Heart Ring" */}
      <div className="floating-organ-tag tag-heart-ring">
        <Heart size={14} color="#ef4444" fill="#ef4444" />
        <span>Heart Ring</span>
      </div>

      {/* Floating Tag: "Spot 98.5%" SpO2 + Live ECG Waveform */}
      <div className="floating-organ-tag tag-vitals-spot">
        <div className="spot-label">Spot SpO2 / Sinus</div>
        <div className="spot-value-row">
          <span className="spot-value">98.5%</span>
          <span style={{ fontSize: '10px', color: '#14b8a6', fontWeight: 700 }}>100% Flow</span>
        </div>
        <LiveEcWaveform color="#14b8a6" speed={1.8} />
      </div>

      {/* Floating Tag: Doctor Schedule Callout */}
      <div className="floating-organ-tag tag-doctor-schedule">
        <img
          src="/assets/dr_hetmyer.jpg"
          alt="Pulmonary Doctor"
          className="schedule-avatar"
        />
        <div>
          <div className="schedule-label">Today • Triage Assigned</div>
          <div className="schedule-time">Monday 10:00 - 11:30</div>
          <div className="schedule-dept">Pulmonary Doctor / Dr. Hetmyer</div>
        </div>
      </div>
    </div>
  );
};
