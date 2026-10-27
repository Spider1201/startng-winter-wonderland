import React, { useState, useMemo } from 'react';
import { COMMUNITY_GAMES } from '../../data/games';
import { GameCard } from './GameCard';
import { GotwBanner } from './GotwBanner';
import { AzGamesList } from './AzGamesList';
import type { GameItem } from '../../types';

interface GameShelfProps {
  isWinterActive: boolean;
  onPlayGame: (game: GameItem) => void;
}

export const GameShelf: React.FC<GameShelfProps> = ({ isWinterActive, onPlayGame }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Action', 'Arcade', 'Runner', 'Board', 'Puzzle', 'Simulation'];

  const filteredGames = useMemo(() => {
    if (selectedCategory === 'All') return COMMUNITY_GAMES;
    return COMMUNITY_GAMES.filter(g => g.category === selectedCategory);
  }, [selectedCategory]);

  const gotwGame = COMMUNITY_GAMES.find(g => g.isGotw) || COMMUNITY_GAMES[0];

  return (
    <section id="games" className="container">
      {/* Game of the Week Spotlight */}
      <GotwBanner game={gotwGame} isWinterActive={isWinterActive} onPlay={onPlayGame} />

      {/* Shelf Header */}
      <div className="section-head">
        <div>
          <h2>Games from the community</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '0.95rem' }}>
            {isWinterActive
              ? 'Play community-built games dusted with seasonal cheer and winter holiday events.'
              : 'Built by independent creators. Zero installation, zero waiting.'}
          </p>
        </div>
        <span className="games-count-badge">
          Showing {filteredGames.length} of {COMMUNITY_GAMES.length} featured games
        </span>
      </div>

      {/* Filter Category Chips */}
      <div className="filter-bar" role="tablist" aria-label="Game categories">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={selectedCategory === cat}
            className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === 'All' && '✨ '}
            {cat}
          </button>
        ))}
      </div>

      {/* Game Grid */}
      <div className="games-grid">
        {filteredGames.map(game => (
          <GameCard
            key={game.id}
            game={game}
            isWinterActive={isWinterActive}
            onPlayGame={onPlayGame}
          />
        ))}
      </div>

      {/* A-Z Directory Accordion */}
      <AzGamesList />
    </section>
  );
};
