import React, { useState, useEffect } from 'react';
import { Video, Radio } from 'lucide-react';

interface LeadClinicianCardProps {
  onVideoCallClick: () => void;
}

export const LeadClinicianCard: React.FC<LeadClinicianCardProps> = ({ onVideoCallClick }) => {
  const [currentTime, setCurrentTime] = useState<string>('6:41 PM');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 ? hours % 12 : 12;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="right-top-row">
      {/* Live Digital Clock Card */}
      <div className="clock-pill-card">
        <div className="live-time-display">{currentTime}</div>
        <div className="live-shift-label">
          <Radio size={12} className="animate-pulse" />
          Shift: Acute Resus Bay A
        </div>
      </div>

      {/* Clinician Card */}
      <div className="clinician-card">
        <img
          src="/assets/dr_jane.jpg"
          alt="Dr. Jane - Lead Cardiologist"
          className="clinician-avatar"
        />
        <div className="clinician-name">Jane cardiologist</div>
        <button
          id="btn-lead-video-call"
          className="video-call-btn"
          onClick={onVideoCallClick}
        >
          <Video size={13} />
          <span>Video call</span>
        </button>
      </div>
    </div>
  );
};
