import React, { useState } from 'react';
import { FairyLights } from './FairyLights';
import type { ThemeMode, SeasonalMode } from '../../types';

interface NavbarProps {
  isWinterActive: boolean;
  theme: ThemeMode;
  toggleTheme: () => void;
  onBulbClick?: (index: number) => void;
  mode?: SeasonalMode;
  setMode?: (mode: SeasonalMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isWinterActive,
  theme,
  toggleTheme,
  onBulbClick,
  setMode
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleToggleWinter = () => {
    if (!setMode) return;
    setMode(isWinterActive ? 'normal-force' : 'winter-preview');
  };

  return (
    <header className="nav-wrapper" style={{ position: 'sticky', top: 0, zIndex: 40, width: '100%' }}>
      {/* Fairy Lights draped along top edge when festive */}
      <FairyLights isWinterActive={isWinterActive} onBulbClick={onBulbClick} />

      <nav
        className={`container nav ${isMobileMenuOpen ? 'open' : ''}`}
        aria-label="Main navigation"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 24px',
          position: 'relative'
        }}
      >
        {/* Brand Logo - Authentic Start.ng */}
        <a
          href="/"
          className="logo"
          aria-label="start.ng homepage"
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '1.35rem',
            fontWeight: 800,
            textDecoration: 'none',
            color: 'var(--ink)'
          }}
        >
          {/* Logo icon box */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              backgroundColor: 'var(--lime)',
              position: 'relative',
              flexShrink: 0
            }}
          >
            {/* Play triangle */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <polygon points="4,2 12,7 4,12" fill="#292a23" />
            </svg>

            {/* Winter Santa Hat perched on Logo Icon when Festive */}
            {isWinterActive && (
              <span
                style={{
                  position: 'absolute',
                  top: '-9px',
                  left: '-6px',
                  fontSize: '1rem',
                  lineHeight: 1,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                  transform: 'rotate(-12deg)',
                  pointerEvents: 'none'
                }}
                aria-hidden="true"
              >
                🎅
              </span>
            )}
          </span>

          <span style={{ letterSpacing: '-0.03em' }}>
            <b style={{ fontWeight: 800 }}>start</b>
            <span style={{ color: 'var(--muted)', fontWeight: 600 }}>.ng</span>
          </span>
        </a>

        {/* Center / Desktop Nav Links */}
        <div
          className="nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}
        >
          <a href="#games" className="nav-link">
            Games
          </a>
          <a href="#games" className="nav-link">
            Tournament
          </a>
          <a href="#how" className="nav-link">
            Creators
          </a>
          <a href="#how" className="nav-link">
            Docs
          </a>
        </div>

        {/* Right Actions: Winter Switcher + Dark/Light Theme + Avatar */}
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Winter Theme Quick Toggle */}
          {setMode && (
            <button
              type="button"
              onClick={handleToggleWinter}
              aria-label={`Toggle winter theme (${isWinterActive ? 'Active' : 'Inactive'})`}
              style={{
                background: isWinterActive ? 'var(--lime)' : 'var(--card)',
                color: isWinterActive ? 'var(--on-lime)' : 'var(--ink)',
                border: '1.5px solid var(--line)',
                borderRadius: '999px',
                padding: '6px 12px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: isWinterActive ? '2px 2px 0 var(--ink)' : 'none',
                transition: 'all 0.2s ease'
              }}
              title="Click to toggle December Winter Wonderland theme"
            >
              <span>{isWinterActive ? '❄️' : '☃️'}</span>
              <span>{isWinterActive ? 'Winter ON' : 'Winter OFF'}</span>
            </button>
          )}

          {/* Theme Toggle Button (Light/Dark) */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{
              background: 'var(--card)',
              border: '1.5px solid var(--line)',
              borderRadius: '999px',
              padding: '6px 12px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--ink)',
              transition: 'background 0.2s ease'
            }}
          >
            <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--mono)' }}>
              {theme === 'dark' ? 'DARK' : 'LIGHT'}
            </span>
          </button>

          {/* Start.ng Player Character Avatar */}
          <div
            className="player-avatar-badge"
            title="Player One (start.ng character)"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: 'var(--lime)',
              border: '2px solid var(--ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '2px 2px 0 var(--ink)',
              flexShrink: 0
            }}
          >
            {isWinterActive ? '🧤' : '👾'}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-nav-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--ink)',
              fontSize: '1.4rem',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-drawer"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--card)',
            borderBottom: '2px solid var(--line)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 12px 24px var(--scrim)',
            zIndex: 45
          }}
        >
          <a
            href="#games"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ padding: '8px 0', fontWeight: 600, color: 'var(--ink)' }}
          >
            🎮 Games
          </a>
          <a
            href="#games"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ padding: '8px 0', fontWeight: 600, color: 'var(--ink)' }}
          >
            🏆 Tournament
          </a>
          <a
            href="#how"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ padding: '8px 0', fontWeight: 600, color: 'var(--ink)' }}
          >
            🛠️ Creators
          </a>
          <a
            href="#how"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ padding: '8px 0', fontWeight: 600, color: 'var(--ink)' }}
          >
            📄 Docs
          </a>
        </div>
      )}
    </header>
  );
};
