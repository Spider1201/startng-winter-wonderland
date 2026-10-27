import React from 'react';

interface FooterProps {
  isWinterActive: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isWinterActive }) => {
  return (
    <footer className="container site-footer">
      <div className="site-footer-grid">
        <div className="site-footer-brand">
          <a
            href="/"
            className="logo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1.35rem',
              fontWeight: 800,
              textDecoration: 'none',
              color: 'var(--ink)'
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                backgroundColor: 'var(--lime)',
                position: 'relative'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <polygon points="4,2 12,7 4,12" fill="#292a23" />
              </svg>
              {isWinterActive && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '-5px',
                    fontSize: '0.85rem'
                  }}
                  aria-hidden="true"
                >
                  🎅
                </span>
              )}
            </span>
            <span>
              <b>start</b>
              <span style={{ color: 'var(--muted)' }}>.ng</span>
            </span>
          </a>
          <p>
            Nigeria's home for browser games, made by the community and by creators across Africa.
            {isWinterActive && (
              <span style={{ display: 'block', marginTop: '6px', color: 'var(--lime)', fontWeight: 600 }}>
                ❄️ Wishing all players and creators a wonderful holiday season!
              </span>
            )}
          </p>
        </div>

        <nav aria-label="Play">
          <h2>Play</h2>
          <ul>
            <li>
              <a href="#games">All games</a>
            </li>
            <li>
              <a href="#games">Daily tournament</a>
            </li>
            <li>
              <a href="#games">Leaderboard</a>
            </li>
            <li>
              <a href="#games">Categories</a>
            </li>
            <li>
              <a href="#games">The Hangout</a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Make games">
          <h2>Make games</h2>
          <ul>
            <li>
              <a href="#how">Independent creators</a>
            </li>
            <li>
              <a href="#how">Build a game</a>
            </li>
            <li>
              <a href="#how">Docs for your AI (.md)</a>
            </li>
          </ul>
        </nav>

        <nav aria-label="About">
          <h2>About</h2>
          <ul>
            <li>
              <a href="#about">About start.ng</a>
            </li>
          </ul>
        </nav>
      </div>

      <p className="site-footer-base">
        <span>© 2026 start.ng · Whimsical December Theme Concept</span>
        <span>Games from Nigeria and across Africa. Built with love by the community.</span>
      </p>
    </footer>
  );
};
