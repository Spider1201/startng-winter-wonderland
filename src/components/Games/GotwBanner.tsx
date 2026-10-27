import React from 'react';
import type { GameItem } from '../../types';

interface GotwBannerProps {
  game: GameItem;
  isWinterActive: boolean;
  onPlay: (game: GameItem) => void;
}

export const GotwBanner: React.FC<GotwBannerProps> = ({ game, isWinterActive, onPlay }) => {
  return (
    <section className="gotw-banner" aria-label="Game of the week spotlight">
      {/* Left / Art Cover */}
      <div className="gotw-cover">
        {/* Whimsical winter flakes or speed lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isWinterActive
              ? 'radial-gradient(circle at 75% 30%, rgba(216, 253, 113, 0.25), transparent 60%)'
              : 'radial-gradient(circle at 75% 30%, rgba(247, 183, 49, 0.25), transparent 60%)'
          }}
        />
        <span className="gotw-emoji-hero">{game.emoji}</span>
      </div>

      {/* Right / Info text */}
      <div className="gotw-text">
        <span className="gotw-badge">
          {isWinterActive ? '❄️ Holiday Game of the Week' : '⭐ Game of the Week'}
        </span>
        <h2 className="gotw-title">
          {game.title}
          {isWinterActive ? ': Winter Edition' : ''}
        </h2>
        <p className="gotw-desc">
          {isWinterActive
            ? 'The harmattan cold has hit Lagos roads! Drift your iconic yellow bus across frosted highways, pick up passengers in cozy sweaters, and rack up festive points.'
            : game.description}
        </p>
        <button
          type="button"
          className="gotw-cta"
          onClick={() => onPlay(game)}
        >
          <span>Play {game.title}</span>
          <span>→</span>
        </button>
      </div>
    </section>
  );
};
