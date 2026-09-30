import React from 'react';
import { CircularGauge } from '../ui/CircularGauge';

interface FloatingMetricsDockProps {
  criticalPercent?: number;
  emergentPercent?: number;
  stablePercent?: number;
}

export const FloatingMetricsDock: React.FC<FloatingMetricsDockProps> = ({
  criticalPercent = 5,
  emergentPercent = 5,
  stablePercent = 5
}) => {
  return (
    <div className="floating-bottom-metrics-dock" id="floating-bottom-metrics">
      {/* 1st Metric Pill (Matching inspo 5% teal) */}
      <div className="bottom-metric-item" title="Critical Cases Queue %">
        <CircularGauge
          value={criticalPercent}
          size={38}
          strokeWidth={4}
          color1="#14b8a6"
          label=""
        />
      </div>

      {/* 2nd Metric Pill (Matching inspo 5% pink/coral) */}
      <div className="bottom-metric-item" title="Emergent Bed Occupancy %">
        <CircularGauge
          value={emergentPercent}
          size={38}
          strokeWidth={4}
          color1="#ec4899"
          label=""
        />
      </div>

      {/* 3rd Metric Pill (Matching inspo 5% green/teal) */}
      <div className="bottom-metric-item" title="Triage SLA Adherence %">
        <CircularGauge
          value={stablePercent}
          size={38}
          strokeWidth={4}
          color1="#06b6d4"
          label=""
        />
      </div>
    </div>
  );
};
