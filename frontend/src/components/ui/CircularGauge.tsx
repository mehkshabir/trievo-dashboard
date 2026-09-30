import React from 'react';

interface CircularGaugeProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color1?: string;
  color2?: string;
  label?: string;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
  value,
  size = 58,
  strokeWidth = 5.5,
  color1 = '#14b8a6', // teal
  label
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <div className="mini-circular-gauge" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0, 0, 0, 0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color1}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <span className="gauge-val" style={{ fontSize: `${size * 0.28}px` }}>
          {value}%
        </span>
        {label && (
          <div style={{ fontSize: '8px', color: '#64748b', fontWeight: 600 }}>{label}</div>
        )}
      </div>
    </div>
  );
};
