import React, { useState } from 'react';
import type { SeasonalMode } from '../../types';

interface FestiveBannerProps {
  isWinterActive: boolean;
  mode: SeasonalMode;
  isNaturalDecember: boolean;
  hasUrlOverride: boolean;
  setMode: (mode: SeasonalMode) => void;
  isMuted: boolean;
  toggleSound: () => void;
}

export const FestiveBanner: React.FC<FestiveBannerProps> = ({
  isWinterActive,
  mode,
  isNaturalDecember,
  setMode,
  isMuted,
  toggleSound
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('winterPreview', '1');
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <aside
      className="festive-banner-bar"
      aria-label="Seasonal Theme Preview Controller"
      style={{
        position: 'relative',
        zIndex: 50,
        background: isWinterActive ? '#152b22' : 'var(--card)',
        color: isWinterActive ? '#f6f5ee' : 'var(--ink)',
        borderBottom: '1.5px solid var(--line)',
        padding: isCollapsed ? '6px 16px' : '8px 16px',
        fontSize: '0.85rem',
        transition: 'background 0.3s ease, color 0.3s ease'
      }}
    >
      <div
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px 16px'
        }}
      >
        {/* Left: Status info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: isWinterActive ? 'var(--lime)' : 'var(--line)',
              color: '#292a23',
              fontWeight: 800,
              fontSize: '0.9rem'
            }}
          >
            {isWinterActive ? '❄️' : '🎮'}
          </span>
          <div>
            <strong style={{ fontWeight: 700 }}>
              {isWinterActive ? 'December Winter Wonderland' : 'Standard Start.ng Theme'}
            </strong>
            {!isCollapsed && (
              <span
                style={{
                  marginLeft: '8px',
                  color: isWinterActive ? '#a7f3d0' : 'var(--muted)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--mono)'
                }}
              >
                {isNaturalDecember
                  ? '(Active via calendar: Dec 1–31)'
                  : mode === 'winter-preview'
                    ? '(Reviewer Preview Active · ?winterPreview=1)'
                    : '(Calendar mode: Normal outside Dec)'}
              </span>
            )}
          </div>
        </div>

        {/* Right: Controls & Switcher */}
        {!isCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* 3-way Mode Segmented Buttons */}
            <div
              style={{
                display: 'inline-flex',
                background: isWinterActive ? '#0d1e17' : 'var(--bg)',
                border: '1px solid var(--line)',
                borderRadius: '999px',
                padding: '2px'
              }}
            >
              <button
                type="button"
                onClick={() => setMode('winter-preview')}
                style={{
                  background: mode === 'winter-preview' ? 'var(--lime)' : 'none',
                  color: mode === 'winter-preview' ? 'var(--on-lime)' : 'inherit',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                title="Force December Winter Wonderland theme (?winterPreview=1)"
              >
                ❄️ Winter Mode
              </button>
              <button
                type="button"
                onClick={() => setMode('normal-force')}
                style={{
                  background: mode === 'normal-force' ? 'var(--lime)' : 'none',
                  color: mode === 'normal-force' ? 'var(--on-lime)' : 'inherit',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                title="Force Normal homepage theme (?winterPreview=0)"
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => setMode('auto')}
                style={{
                  background: mode === 'auto' ? 'var(--lime)' : 'none',
                  color: mode === 'auto' ? 'var(--on-lime)' : 'inherit',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                title="Auto calendar rule (Active Dec 1–31 only)"
              >
                Auto (Calendar)
              </button>
            </div>

            {/* Optional Sound chime toggle */}
            {isWinterActive && (
              <button
                type="button"
                onClick={toggleSound}
                style={{
                  background: isMuted ? 'transparent' : 'var(--lime)',
                  color: isMuted ? 'inherit' : 'var(--on-lime)',
                  border: '1px solid var(--line)',
                  borderRadius: '999px',
                  padding: '4px 10px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title={isMuted ? 'Click to enable snowman chimes' : 'Mute winter chimes'}
              >
                {isMuted ? '🔇 Audio Off' : '🔔 Audio On'}
              </button>
            )}

            {/* Share Preview Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              style={{
                background: 'transparent',
                color: 'inherit',
                border: '1px solid var(--line)',
                borderRadius: '999px',
                padding: '4px 10px',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
              title="Copy preview URL with ?winterPreview=1"
            >
              {copied ? '✓ Link Copied' : '🔗 Copy Preview Link'}
            </button>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            padding: '2px 6px',
            fontSize: '0.75rem',
            opacity: 0.7
          }}
          aria-label={isCollapsed ? 'Expand banner' : 'Collapse banner'}
        >
          {isCollapsed ? '▼ Show Controls' : '▲ Hide'}
        </button>
      </div>
    </aside>
  );
};
