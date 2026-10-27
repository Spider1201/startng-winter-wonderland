import React, { useState } from 'react';

interface FairyLightsProps {
  isWinterActive?: boolean;
  onBulbClick?: (index: number) => void;
}

interface BulbData {
  id: number;
  xPercent: number;
  yOffset: number;
  color: string;
  glowColor: string;
  delay: string;
}

export const FairyLights: React.FC<FairyLightsProps> = ({ isWinterActive = true, onBulbClick }) => {
  const [activeBulb, setActiveBulb] = useState<number | null>(null);

  if (!isWinterActive) return null;

  // Curated festive color palette harmonized with Start.ng lime
  const colors = [
    { fill: '#d8fd71', glow: 'rgba(216, 253, 113, 0.85)' }, // Start.ng Lime
    { fill: '#ffeaa7', glow: 'rgba(255, 234, 167, 0.85)' }, // Warm Golden Glow
    { fill: '#74b9ff', glow: 'rgba(116, 185, 255, 0.8)' },  // Frosted Ice Cyan
    { fill: '#ff7675', glow: 'rgba(255, 118, 117, 0.75)' }, // Festive Cranberry
    { fill: '#55efc4', glow: 'rgba(85, 239, 196, 0.8)' }   // Mint Aurora
  ];

  const bulbCount = 14;
  const bulbs: BulbData[] = [];

  for (let i = 0; i < bulbCount; i++) {
    const xPercent = (i / (bulbCount - 1)) * 96 + 2;
    // Catenary sag curve: wire sags in the middle between anchor posts
    const sag = Math.sin((i / (bulbCount - 1)) * Math.PI) * 14;
    const colorScheme = colors[i % colors.length];

    bulbs.push({
      id: i,
      xPercent,
      yOffset: 6 + sag,
      color: colorScheme.fill,
      glowColor: colorScheme.glow,
      delay: `${(i * 0.35) % 2.4}s`
    });
  }

  const handleBulbClick = (index: number) => {
    setActiveBulb(index);
    onBulbClick?.(index);
    setTimeout(() => {
      setActiveBulb(null);
    }, 600);
  };

  return (
    <div
      className="fairy-lights-container"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '42px',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 35
      }}
    >
      {/* SVG String Wire */}
      <svg
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
        viewBox="0 0 1000 42"
        preserveAspectRatio="none"
      >
        <path
          d="M 0,4 Q 250,28 500,24 T 1000,6"
          fill="none"
          stroke="rgba(41, 42, 35, 0.45)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
      </svg>

      {/* Twinkling Bulbs */}
      {bulbs.map((b, idx) => {
        const isFlashed = activeBulb === idx;
        return (
          <div
            key={b.id}
            className="fairy-bulb"
            onClick={() => handleBulbClick(idx)}
            style={{
              position: 'absolute',
              left: `${b.xPercent}%`,
              top: `${b.yOffset}px`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'auto',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Socket cap */}
            <div
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: '#292a23',
                borderRadius: '1px'
              }}
            />
            {/* Glow Glass Bulb */}
            <div
              style={{
                width: isFlashed ? '12px' : '9px',
                height: isFlashed ? '15px' : '12px',
                borderRadius: '50% 50% 45% 45%',
                backgroundColor: b.color,
                boxShadow: isFlashed
                  ? `0 0 20px 6px ${b.glowColor}`
                  : `0 0 10px 2px ${b.glowColor}`,
                animation: isFlashed ? 'none' : 'light-glow-pulse 3s ease-in-out infinite',
                animationDelay: b.delay,
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                transform: isFlashed ? 'scale(1.3)' : 'scale(1)'
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
