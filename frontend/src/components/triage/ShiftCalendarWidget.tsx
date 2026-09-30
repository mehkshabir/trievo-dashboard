import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export const ShiftCalendarWidget: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(2);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Days 1 through 28 matching inspo calendar
  const days = Array.from({ length: 28 }, (_, i) => i + 1);

  return (
    <div className="calendar-glass-card">
      <div className="calendar-header">
        <div className="calendar-month">
          <span>Feb 2024</span>
          <ChevronDown size={14} color="#64748b" />
        </div>
        <div className="cal-nav-buttons">
          <button className="cal-nav-btn" aria-label="Previous Month">
            <ChevronLeft size={14} />
          </button>
          <button className="cal-nav-btn" aria-label="Next Month">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="calendar-days-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-header">
            {day}
          </div>
        ))}

        {days.map((day) => {
          const isActive = day === selectedDay;
          const isSurgeDay = day === 9 || day === 17;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`day-cell ${isActive ? 'active-shift' : ''} ${
                isSurgeDay ? 'surge-indicator' : ''
              }`}
              title={
                isActive
                  ? 'Current Active On-Call Shift'
                  : isSurgeDay
                  ? 'Predicted Emergency Surge Surge Day'
                  : `Shift day ${day}`
              }
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
