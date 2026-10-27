import React from 'react';

interface WinterHeroMoundProps {
  isWinterActive?: boolean;
}

export const WinterHeroMound: React.FC<WinterHeroMoundProps> = ({ isWinterActive = true }) => {
  if (!isWinterActive) return null;

  return (
    <div
      className="winter-hero-mound-container"
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '110px',
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', display: 'block' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Back snow hill gradient */}
          <linearGradient id="backSnowHill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.75" />
            <stop offset="100%" stopColor="var(--bg)" stopOpacity="0.95" />
          </linearGradient>

          {/* Front crisp snowdrift gradient */}
          <linearGradient id="frontSnowDrift" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="70%" stopColor="#e2e8f0" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--bg)" stopOpacity="1" />
          </linearGradient>

          {/* Lantern Warm Glow */}
          <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffeaa7" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#d8fd71" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d8fd71" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Back Hill */}
        <path
          d="M 0,70 Q 240,40 520,65 T 1000,45 Q 1120,55 1200,60 L 1200,120 L 0,120 Z"
          fill="url(#backSnowHill)"
        />

        {/* Miniature Pine Silhouette on Back Ridge */}
        <polygon points="210,62 216,48 222,62" fill="#1b4d3e" opacity="0.8" />
        <polygon points="212,52 216,42 220,52" fill="#2d6a4f" opacity="0.9" />
        <line x1="216" y1="62" x2="216" y2="66" stroke="#5c4033" strokeWidth="1.5" />

        <polygon points="380,68 388,50 396,68" fill="#1b4d3e" opacity="0.85" />
        <polygon points="382,56 388,44 394,56" fill="#40916c" opacity="0.95" />
        <line x1="388" y1="68" x2="388" y2="72" stroke="#5c4033" strokeWidth="1.8" />

        {/* Front Sculpted Drift */}
        <path
          d="M 0,92 C 180,72 320,102 540,82 C 780,60 960,88 1200,75 L 1200,120 L 0,120 Z"
          fill="url(#frontSnowDrift)"
        />

        {/* Tiny Lantern Beside the Drift Path */}
        <g transform="translate(680, 52)">
          {/* Lantern Light Glow Aura */}
          <circle cx="10" cy="14" r="28" fill="url(#lanternGlow)" />
          {/* Wooden Post */}
          <line x1="10" y1="12" x2="10" y2="38" stroke="#3d3e35" strokeWidth="2.5" strokeLinecap="round" />
          {/* Glass Lantern Housing */}
          <rect x="5" y="6" width="10" height="12" rx="2" fill="#ffeaa7" stroke="#181914" strokeWidth="1.2" />
          <polygon points="3,6 10,1 17,6" fill="#181914" />
          <circle cx="10" cy="1" r="1.5" fill="#d8fd71" />
        </g>
      </svg>
    </div>
  );
};
