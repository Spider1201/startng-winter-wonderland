import React from 'react';

interface PineGarlandProps {
  position?: 'top-left' | 'top-right' | 'hero-corner';
  isWinterActive?: boolean;
}

export const PineGarland: React.FC<PineGarlandProps> = ({ position = 'top-left', isWinterActive = true }) => {
  if (!isWinterActive) return null;

  const isRight = position === 'top-right';

  return (
    <div
      className={`pine-garland pine-garland-${position}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        [isRight ? 'right' : 'left']: 0,
        width: '140px',
        height: '110px',
        pointerEvents: 'none',
        zIndex: 2,
        transform: isRight ? 'scaleX(-1)' : 'none',
        opacity: 0.88
      }}
    >
      <svg viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {/* Pine needles clusters */}
        <g stroke="#1b4d3e" strokeWidth="2.4" strokeLinecap="round">
          <line x1="0" y1="0" x2="35" y2="28" />
          <line x1="10" y1="8" x2="28" y2="4" />
          <line x1="20" y1="16" x2="38" y2="10" />
          <line x1="30" y1="24" x2="48" y2="22" />

          {/* Branch 2 */}
          <line x1="0" y1="10" x2="55" y2="45" stroke="#2d6a4f" strokeWidth="3" />
          <line x1="15" y1="20" x2="12" y2="35" />
          <line x1="25" y1="28" x2="26" y2="46" />
          <line x1="38" y1="36" x2="44" y2="52" />
          <line x1="48" y1="42" x2="62" y2="40" />

          {/* Branch 3 with frosted lime tips */}
          <line x1="12" y1="0" x2="75" y2="30" stroke="#40916c" strokeWidth="2.6" />
          <line x1="32" y1="12" x2="46" y2="2" stroke="#d8fd71" strokeWidth="2" />
          <line x1="50" y1="18" x2="66" y2="12" stroke="#d8fd71" strokeWidth="2" />
          <line x1="62" y1="24" x2="80" y2="24" stroke="#ffffff" strokeWidth="2" />
        </g>

        {/* Snow Dusting on pine needles */}
        <ellipse cx="25" cy="18" rx="7" ry="2.5" fill="#ffffff" opacity="0.9" />
        <ellipse cx="44" cy="30" rx="9" ry="3" fill="#ffffff" opacity="0.9" />
        <ellipse cx="62" cy="22" rx="6" ry="2.2" fill="#ffffff" opacity="0.9" />

        {/* Holly Berries Cluster */}
        <circle cx="28" cy="24" r="3.6" fill="#eb4d4b" />
        <circle cx="34" cy="22" r="3.4" fill="#ff7675" />
        <circle cx="31" cy="29" r="3.2" fill="#d63031" />
        <circle cx="29" cy="23" r="1.1" fill="#ffffff" />

        {/* Golden Pinecone */}
        <ellipse cx="56" cy="46" rx="5" ry="8" fill="#a0522d" transform="rotate(18 56 46)" />
        <line x1="53" y1="42" x2="59" y2="44" stroke="#d8fd71" strokeWidth="1" />
        <line x1="52" y1="47" x2="58" y2="49" stroke="#d8fd71" strokeWidth="1" />
      </svg>
    </div>
  );
};
