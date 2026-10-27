import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { GameItem } from '../../types';

interface MiniGameModalProps {
  game: GameItem | null;
  isOpen: boolean;
  onClose: () => void;
  isWinterActive: boolean;
}

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  emoji: string;
  points: number;
}

export const MiniGameModal: React.FC<MiniGameModalProps> = ({
  game,
  isOpen,
  onClose,
  isWinterActive
}) => {
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [playerX, setPlayerX] = useState<number>(50); // percentage 0 - 100
  const [activeItems, setActiveItems] = useState<FallingItem[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<FallingItem[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(20);
    setIsGameOver(false);
    setIsPlaying(true);
    itemsRef.current = [];
    setActiveItems([]);
  }, []);

  // Handle player movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isPlaying) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPlayerX(Math.max(5, Math.min(95, x)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isPlaying || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setPlayerX(Math.max(5, Math.min(95, x)));
  };

  // Game timer countdown
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Game loop: drop items & detect catch
  useEffect(() => {
    if (!isPlaying) return;

    let nextSpawn = 0;
    const pool = isWinterActive
      ? [
          { emoji: '❄️', points: 10 },
          { emoji: '🪙', points: 25 },
          { emoji: '🍛', points: 30 },
          { emoji: '🎁', points: 50 },
          { emoji: '⭐', points: 15 }
        ]
      : [
          { emoji: '🪙', points: 20 },
          { emoji: '🍛', points: 30 },
          { emoji: '🍞', points: 15 },
          { emoji: '⭐', points: 10 }
        ];

    const loop = () => {
      nextSpawn += 1;
      if (nextSpawn % 24 === 0) {
        const itemType = pool[Math.floor(Math.random() * pool.length)];
        itemsRef.current.push({
          id: Date.now() + Math.random(),
          x: 10 + Math.random() * 80,
          y: -5,
          speed: 1.8 + Math.random() * 1.6,
          emoji: itemType.emoji,
          points: itemType.points
        });
      }

      // Update positions & check collisions
      for (let i = itemsRef.current.length - 1; i >= 0; i--) {
        const it = itemsRef.current[i];
        it.y += it.speed;

        // Collision with player basket at y = 82%
        if (it.y >= 78 && it.y <= 88) {
          if (Math.abs(it.x - playerX) < 14) {
            setScore(prev => prev + it.points);
            itemsRef.current.splice(i, 1);
            continue;
          }
        }

        // Off screen
        if (it.y > 100) {
          itemsRef.current.splice(i, 1);
        }
      }

      setActiveItems([...itemsRef.current]);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playerX, isWinterActive]);

  if (!isOpen || !game) return null;

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Play ${game.title}`}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          maxWidth: '520px',
          padding: '24px',
          border: '2px solid var(--ink)',
          boxShadow: '8px 8px 0 var(--lime)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="card-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.8rem' }}>{game.emoji}</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                {game.title}
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                by {game.creator} · {isWinterActive ? '❄️ Festive Arcade' : 'Start.ng Instant Play'}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="close"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--ink)'
            }}
          >
            ✕
          </button>
        </div>

        {/* Mini-Game Playing Canvas Area */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          style={{
            position: 'relative',
            width: '100%',
            height: '240px',
            backgroundColor: isWinterActive ? '#0a171f' : '#1f201b',
            borderRadius: '14px',
            overflow: 'hidden',
            cursor: isPlaying ? 'ew-resize' : 'default',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '12px',
            userSelect: 'none'
          }}
        >
          {/* Top HUD: Score & Time */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--mono)',
              color: '#ffffff',
              fontSize: '0.9rem',
              zIndex: 10
            }}
          >
            <span>Score: <b style={{ color: 'var(--lime)', fontSize: '1.1rem' }}>{score}</b></span>
            <span>Time: <b>{timeLeft}s</b></span>
          </div>

          {/* Falling Items */}
          {isPlaying &&
            activeItems.map(it => (
              <span
                key={it.id}
                style={{
                  position: 'absolute',
                  left: `${it.x}%`,
                  top: `${it.y}%`,
                  fontSize: '1.6rem',
                  lineHeight: 1,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none'
                }}
              >
                {it.emoji}
              </span>
            ))}

          {/* Player Catcher (Danfo bus or festive sleigh) */}
          {isPlaying && (
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: `${playerX}%`,
                transform: 'translateX(-50%)',
                fontSize: '2.4rem',
                lineHeight: 1,
                transition: 'left 0.04s ease-out'
              }}
            >
              {game.id === 'danfo-defense' ? '🚐' : isWinterActive ? '🛷' : '🕹️'}
            </div>
          )}

          {/* Start Screen Overlay */}
          {!isPlaying && !isGameOver && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(10, 23, 31, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                color: '#ffffff',
                textAlign: 'center',
                padding: '20px'
              }}
            >
              <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--lime)' }}>
                {isWinterActive ? '❄️ Holiday Catch Challenge' : '🎮 Ready, Player One?'}
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', maxWidth: '300px' }}>
                Move mouse or finger left & right to catch falling items in 20 seconds!
              </p>
              <button
                type="button"
                className="btn"
                onClick={startGame}
                style={{
                  background: 'var(--lime)',
                  color: '#292a23',
                  padding: '10px 22px',
                  boxShadow: '3px 3px 0 #ffffff'
                }}
              >
                Start Game 🚀
              </button>
            </div>
          )}

          {/* Game Over Screen */}
          {isGameOver && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(10, 23, 31, 0.9)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                color: '#ffffff',
                textAlign: 'center',
                padding: '20px'
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>🎉</span>
              <h4 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--lime)' }}>
                Game Complete!
              </h4>
              <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
                You scored <span style={{ color: 'var(--lime)', fontSize: '1.2rem' }}>{score}</span> points!
              </p>
              <button
                type="button"
                className="btn"
                onClick={startGame}
                style={{
                  background: 'var(--lime)',
                  color: '#292a23',
                  padding: '10px 20px',
                  marginTop: '6px'
                }}
              >
                Play Again 🔄
              </button>
            </div>
          )}
        </div>

        {/* Modal Info Footer */}
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>
          {game.description} In the full Start.ng ecosystem, each game runs seamlessly at its own subdomain.
        </p>
      </div>
    </div>
  );
};
