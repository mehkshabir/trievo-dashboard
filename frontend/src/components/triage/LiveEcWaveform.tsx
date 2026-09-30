import React, { useEffect, useRef } from 'react';

interface LiveEcWaveformProps {
  color?: string;
  speed?: number;
}

export const LiveEcWaveform: React.FC<LiveEcWaveformProps> = ({
  color = '#14b8a6',
  speed = 2
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    // ECG points pattern
    const pattern = [0, 0, 1, 0, -2, 14, -8, 2, 0, 0, 0, 1, 0];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.8;
      ctx.lineJoin = 'round';

      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      for (let x = 0; x < width; x++) {
        const index = Math.floor(((x + offset) % 120) / 10);
        const yOffset = (pattern[index] || 0) * (height / 32);
        const y = midY - yOffset;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      offset += speed;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, speed]);

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={28}
      style={{ width: '120px', height: '28px', display: 'block' }}
    />
  );
};
