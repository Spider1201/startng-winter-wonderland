import React from 'react';
import { ALL_AZ_GAMES } from '../../data/games';

export const AzGamesList: React.FC = () => {
  return (
    <details className="az-games">
      <summary>
        <span>Every game on start.ng, A to Z ({ALL_AZ_GAMES.length})</span>
        <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Click to expand ▼</span>
      </summary>
      <ul className="az-games-list">
        {ALL_AZ_GAMES.map(g => (
          <li key={g.name}>
            <a
              href="#games"
              style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}
              onClick={e => e.preventDefault()}
            >
              {g.name}
            </a>
            <span>by {g.creator}</span>
          </li>
        ))}
      </ul>
    </details>
  );
};
