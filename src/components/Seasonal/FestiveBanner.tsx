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
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
      className="festive-floating-widget"
      aria-label="Seasonal Theme Reviewer Controls"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 55,
        fontFamily: 'var(--font-sans)'
      }}
    >
      {/* Collapsed Floating Pill Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            background: 'var(--card)',
            color: 'var(--ink)',
            border: '2px solid var(--ink)',
            borderRadius: '999px',
            padding: '8px 16px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '4px 4px 0 var(--lime)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
          }}
          title="Open Winter Theme Reviewer Controls"
        >
          <span style={{ fontSize: '1rem' }}>{isWinterActive ? '❄️' : '🎮'}</span>
          <span>Theme: {isWinterActive ? 'Winter' : 'Standard'}</span>
          <span
            style={{
              fontSize: '0.72rem',
              background: isWinterActive ? 'var(--lime)' : 'var(--line)',
              color: 'var(--on-lime)',
              padding: '1px 6px',
              borderRadius: '999px',
              fontFamily: 'var(--mono)',
              fontWeight: 800
            }}
          >
            ⚙️
          </span>
        </button>
      )}

      {/* Expanded Reviewer Controller Card */}
      {isOpen && (
        <div
          style={{
            background: 'var(--card)',
            color: 'var(--ink)',
            border: '2px solid var(--ink)',
            borderRadius: '16px',
            padding: '18px 20px',
            boxShadow: '6px 6px 0 var(--lime), 0 16px 36px rgba(0, 0, 0, 0.2)',
            width: '320px',
            maxWidth: 'calc(100vw - 32px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            animation: 'bubble-pop-in 0.25s ease-out'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>🎄</span>
              <div>
                <strong style={{ fontSize: '0.95rem', fontWeight: 800, display: 'block' }}>
                  Winter Theme Controls
                </strong>
                <span style={{ fontSize: '0.74rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                  {isNaturalDecember
                    ? 'Dec 1–31 (Active by date)'
                    : mode === 'winter-preview'
                      ? 'Preview mode (?winterPreview=1)'
                      : 'Standard theme active'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '2px 6px',
                lineHeight: 1
              }}
              aria-label="Close reviewer controls"
            >
              ✕
            </button>
          </div>

          {/* 3-way Mode Segmented Control */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Activation Mode
            </span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                borderRadius: '8px',
                padding: '2px',
                gap: '2px'
              }}
            >
              <button
                type="button"
                onClick={() => setMode('winter-preview')}
                style={{
                  background: mode === 'winter-preview' ? 'var(--lime)' : 'transparent',
                  color: mode === 'winter-preview' ? 'var(--on-lime)' : 'var(--ink)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 4px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                ❄️ Winter
              </button>
              <button
                type="button"
                onClick={() => setMode('normal-force')}
                style={{
                  background: mode === 'normal-force' ? 'var(--lime)' : 'transparent',
                  color: mode === 'normal-force' ? 'var(--on-lime)' : 'var(--ink)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 4px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => setMode('auto')}
                style={{
                  background: mode === 'auto' ? 'var(--lime)' : 'transparent',
                  color: mode === 'auto' ? 'var(--on-lime)' : 'var(--ink)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 4px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                Auto
              </button>
            </div>
          </div>

          {/* Audio Chime Toggle */}
          {isWinterActive && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Snowman Chimes</span>
              <button
                type="button"
                onClick={toggleSound}
                style={{
                  background: isMuted ? 'var(--bg)' : 'var(--lime)',
                  color: isMuted ? 'var(--muted)' : 'var(--on-lime)',
                  border: '1px solid var(--line)',
                  borderRadius: '999px',
                  padding: '4px 10px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {isMuted ? '🔇 Off' : '🔔 On'}
              </button>
            </div>
          )}

          {/* Copy Preview Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            style={{
              background: 'var(--bg)',
              color: 'var(--ink)',
              border: '1.5px solid var(--line)',
              borderRadius: '8px',
              padding: '7px 12px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '4px'
            }}
          >
            <span>{copied ? '✓ Copied to clipboard!' : '🔗 Copy ?winterPreview=1 Link'}</span>
          </button>
        </div>
      )}
    </aside>
  );
};
