import React from 'react';
import type { GameItem } from '../../types';

interface GameCardProps {
  game: GameItem;
  isWinterActive: boolean;
  onPlayGame: (game: GameItem) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, isWinterActive, onPlayGame }) => {
  return (
    <article
      className="game-card"
      tabIndex={0}
      role="button"
      onClick={() => onPlayGame(game)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPlayGame(game);
        }
      }}
      aria-label={`Play ${game.title} by ${game.creator}`}
    >
      {/* Game Art Thumbnail */}
      <div className="game-card-art" style={{ background: game.bgGradient }}>
        <span className="game-card-emoji">{game.emoji}</span>
        <span className="game-card-badge">{game.category}</span>

        {/* Festive Winter Badge when Active */}
        {isWinterActive && game.festiveBadge && (
          <span className="game-card-festive-badge">❄️ {game.festiveBadge}</span>
        )}
      </div>

      {/* Info details */}
      <div className="game-card-info">
        <h3 className="game-card-title">{game.title}</h3>
        <p className="game-card-creator">
          by <b>{game.creator}</b>
        </p>
        <p className="game-card-desc">{game.description}</p>
      </div>

      {/* Card Footer / Stats */}
      <div className="game-card-meta">
        <span className="game-card-plays">🎮 {game.plays} plays</span>
        <span className="game-card-play-btn">
          Play <span>→</span>
        </span>
      </div>
    </article>
  );
};
