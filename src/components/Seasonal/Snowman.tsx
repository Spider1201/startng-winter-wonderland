import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SNOWMAN_QUOTES } from '../../data/games';
import type { SnowmanQuote, SnowParticle } from '../../types';

interface SnowmanProps {
  onInteract?: () => void;
  isWinterActive?: boolean;
}

export const Snowman: React.FC<SnowmanProps> = ({ onInteract, isWinterActive = true }) => {
  const [isBouncing, setIsBouncing] = useState<boolean>(false);
  const [isWaving, setIsWaving] = useState<boolean>(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);
  const [isBubbleOpen, setIsBubbleOpen] = useState<boolean>(false);
  const [particles, setParticles] = useState<SnowParticle[]>([]);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const bounceTimerRef = useRef<number | null>(null);
  const bubbleTimerRef = useRef<number | null>(null);

  // Generate a burst of snow & sparkle particles
  const triggerParticleBurst = useCallback(() => {
    const newParticles: SnowParticle[] = [];
    const colors = ['#ffffff', '#d8fd71', '#dff9fb', '#ffeaa7', '#f1fbd2'];
    const shapes: ('flake' | 'star' | 'circle' | 'sparkle')[] = ['flake', 'star', 'circle', 'sparkle'];

    for (let i = 0; i < 22; i++) {
      const angle = (Math.PI * 2 * i) / 22 + (Math.random() - 0.5) * 0.4;
      const distance = 40 + Math.random() * 85;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 20; // slight upward bias
      const rot = (Math.random() - 0.5) * 360;

      newParticles.push({
        id: Date.now() + i,
        x: dx,
        y: dy,
        vx: dx,
        vy: dy,
        size: 5 + Math.random() * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: rot,
        rotationSpeed: (Math.random() - 0.5) * 45,
        opacity: 1,
        scale: 0.8 + Math.random() * 0.4,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }

    setParticles(newParticles);

    // Clean particles after animation ends
    setTimeout(() => {
      setParticles([]);
    }, 900);
  }, []);

  // Main interaction handler (Click / Keyboard / Tap)
  const handleInteraction = useCallback((e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Trigger bounce
    setIsBouncing(true);
    if (bounceTimerRef.current) clearTimeout(bounceTimerRef.current);
    bounceTimerRef.current = window.setTimeout(() => {
      setIsBouncing(false);
    }, 800);

    // Particle burst
    triggerParticleBurst();

    // Sound / outer callback
    onInteract?.();

    // Advance quote and show speech bubble
    setCurrentQuoteIndex(prev => (prev + 1) % SNOWMAN_QUOTES.length);
    setIsBubbleOpen(true);

    // Auto dismiss bubble after 8 seconds
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = window.setTimeout(() => {
      setIsBubbleOpen(false);
    }, 8000);
  }, [onInteract, triggerParticleBurst]);

  // Touch handlers to avoid accidental clicks when scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const endX = e.changedTouches[0]?.clientX ?? 0;
    const endY = e.changedTouches[0]?.clientY ?? 0;
    const distX = Math.abs(endX - touchStartRef.current.x);
    const distY = Math.abs(endY - touchStartRef.current.y);

    // If movement was small, it was an intentional tap, not a scroll
    if (distX < 12 && distY < 12) {
      handleInteraction(e);
    }
    touchStartRef.current = null;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleInteraction(e);
    }
  };

  // Close speech bubble
  const handleCloseBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBubbleOpen(false);
  };

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (bounceTimerRef.current) clearTimeout(bounceTimerRef.current);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, []);

  const quote: SnowmanQuote = SNOWMAN_QUOTES[currentQuoteIndex] || SNOWMAN_QUOTES[0];

  if (!isWinterActive) return null;

  return (
    <div
      className="snowman-wrapper"
      role="button"
      tabIndex={0}
      aria-label="Festive Start.ng snowman - Click or press Enter for holiday cheer"
      onClick={handleInteraction}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsWaving(true)}
      onMouseLeave={() => setIsWaving(false)}
    >
      {/* Speech Dialogue Bubble */}
      {isBubbleOpen && (
        <div
          className="snowman-speech-bubble"
          role="status"
          aria-live="polite"
          onClick={e => e.stopPropagation()}
        >
          <div className="speech-header">
            <span className="speech-badge">
              <span>{quote.icon}</span>
              <span>Player One</span>
            </span>
            <button
              type="button"
              className="speech-close"
              onClick={handleCloseBubble}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
          <p className="speech-text">{quote.message}</p>
          {quote.subtext && <p className="speech-subtext">{quote.subtext}</p>}
          <span className="speech-click-hint">Click me again for more quotes! 🎁</span>
        </div>
      )}

      {/* Snow Particles Burst */}
      <div className="snow-burst-container" aria-hidden="true">
        {particles.map(p => (
          <span
            key={p.id}
            className="snow-burst-particle"
            style={
              {
                '--dx': `${p.vx}px`,
                '--dy': `${p.vy}px`,
                '--rot': `${p.rotation}deg`,
                backgroundColor: p.shape === 'circle' ? p.color : 'transparent',
                color: p.color,
                fontSize: `${p.size}px`,
                width: p.shape === 'circle' ? `${p.size}px` : 'auto',
                height: p.shape === 'circle' ? `${p.size}px` : 'auto',
                borderRadius: p.shape === 'circle' ? '50%' : '0'
              } as React.CSSProperties
            }
          >
            {p.shape === 'flake' && '❄'}
            {p.shape === 'star' && '✦'}
            {p.shape === 'sparkle' && '✨'}
          </span>
        ))}
      </div>

      {/* Original SVG Snowman Illustration */}
      <svg
        className={`snowman-figure ${isBouncing ? 'is-bouncing' : ''}`}
        viewBox="0 0 200 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Snow sphere gradients for 3D depth */}
          <radialGradient id="snowBaseGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#eef6fb" />
            <stop offset="100%" stopColor="#cfdfed" />
          </radialGradient>

          <radialGradient id="snowTorsoGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#edf5fa" />
            <stop offset="100%" stopColor="#c8dbee" />
          </radialGradient>

          <radialGradient id="snowHeadGrad" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#edf5fa" />
            <stop offset="100%" stopColor="#c9dcee" />
          </radialGradient>

          {/* Top Hat Gradient */}
          <linearGradient id="topHatGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3d3e35" />
            <stop offset="100%" stopColor="#181914" />
          </linearGradient>

          {/* Scarf Green Gradient */}
          <linearGradient id="scarfGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1b4d3e" />
            <stop offset="35%" stopColor="#d8fd71" />
            <stop offset="65%" stopColor="#1b4d3e" />
            <stop offset="100%" stopColor="#d8fd71" />
          </linearGradient>

          {/* Carrot Nose Gradient */}
          <linearGradient id="carrotGrad" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor="#ff793f" />
            <stop offset="100%" stopColor="#cd6133" />
          </linearGradient>
        </defs>

        {/* --- Left Arm (Resting twig) --- */}
        <g className="snowman-arm-left">
          <path
            d="M58 135 L22 120 L12 110 M22 120 L16 130"
            stroke="#5c4033"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Warm green mitten */}
          <path
            d="M10 108 C7 104 10 98 15 101 C18 103 21 112 17 116 Z"
            fill="#1b4d3e"
          />
        </g>

        {/* --- Right Arm (Raised for Waving) --- */}
        <g className={`snowman-arm-right ${isWaving ? 'is-waving' : ''}`}>
          <path
            d="M142 135 L175 110 L188 95 M175 110 L186 118"
            stroke="#5c4033"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Mitten on waving hand */}
          <path
            d="M185 92 C192 88 198 96 193 103 C189 108 180 102 185 92 Z"
            fill="#d8fd71"
            stroke="#292a23"
            strokeWidth="1.2"
          />
          {/* Thumb */}
          <path
            d="M180 97 C177 94 180 90 184 92"
            fill="#d8fd71"
            stroke="#292a23"
            strokeWidth="1.2"
          />
        </g>

        {/* --- Snow Body Bottom Sphere --- */}
        <circle cx="100" cy="188" r="48" fill="url(#snowBaseGrad)" />
        <ellipse cx="100" cy="230" rx="36" ry="6" fill="#0f172a" opacity="0.08" />

        {/* --- Snow Body Middle Sphere --- */}
        <circle cx="100" cy="128" r="38" fill="url(#snowTorsoGrad)" />

        {/* Buttons (Coal Pebbles / Controller Buttons) */}
        <circle cx="100" cy="118" r="3.5" fill="#292a23" />
        <circle cx="100" cy="132" r="3.5" fill="#292a23" />
        <circle cx="100" cy="146" r="3.5" fill="#292a23" />
        {/* Tiny Start.ng Lime Accent Pin */}
        <rect x="86" y="126" width="6" height="6" rx="1.5" fill="#d8fd71" stroke="#292a23" strokeWidth="0.8" />

        {/* --- Snow Body Head Sphere --- */}
        <circle cx="100" cy="74" r="28" fill="url(#snowHeadGrad)" />

        {/* --- Face Features --- */}
        {/* Coal Pebble Eyes with Blinking animation */}
        <g className="snowman-eyes">
          <circle cx="90" cy="68" r="3.2" fill="#292a23" />
          <circle cx="89" cy="67" r="1" fill="#ffffff" />

          <circle cx="110" cy="68" r="3.2" fill="#292a23" />
          <circle cx="109" cy="67" r="1" fill="#ffffff" />
        </g>

        {/* Rosy Winter Cheeks */}
        <circle cx="82" cy="76" r="4.5" fill="#ff7675" opacity="0.35" />
        <circle cx="118" cy="76" r="4.5" fill="#ff7675" opacity="0.35" />

        {/* 3D Carrot Nose */}
        <polygon points="98,72 130,76 98,77" fill="url(#carrotGrad)" />
        <circle cx="98" cy="74.5" r="2" fill="#e17055" />

        {/* Cheerful Coal Smile */}
        <g className="snowman-smile">
          <circle cx="88" cy="83" r="1.6" fill="#292a23" />
          <circle cx="94" cy="86" r="1.6" fill="#292a23" />
          <circle cx="100" cy="87" r="1.6" fill="#292a23" />
          <circle cx="106" cy="86" r="1.6" fill="#292a23" />
          <circle cx="112" cy="83" r="1.6" fill="#292a23" />
        </g>

        {/* --- Cozy Knitted Scarf --- */}
        {/* Scarf wrapped around neck */}
        <path
          d="M74 96 C84 92 116 92 126 96 C129 104 122 108 100 107 C78 108 71 104 74 96 Z"
          fill="url(#scarfGrad)"
          stroke="#292a23"
          strokeWidth="1.2"
        />
        {/* Scarf Hanging Tail with Flutter */}
        <g className="snowman-scarf-fringe">
          <path
            d="M106 102 L116 142 L98 144 L98 104 Z"
            fill="#1b4d3e"
            stroke="#292a23"
            strokeWidth="1"
          />
          {/* Lime Stripe on tail */}
          <path
            d="M101 116 L113 115 L114 123 L99 124 Z"
            fill="#d8fd71"
          />
          {/* Fringes */}
          <line x1="99" y1="144" x2="99" y2="152" stroke="#d8fd71" strokeWidth="1.8" />
          <line x1="104" y1="143" x2="104" y2="153" stroke="#1b4d3e" strokeWidth="1.8" />
          <line x1="109" y1="143" x2="109" y2="153" stroke="#d8fd71" strokeWidth="1.8" />
          <line x1="114" y1="142" x2="114" y2="151" stroke="#1b4d3e" strokeWidth="1.8" />
        </g>

        {/* --- Top Hat with Start.ng Lime Ribbon & Holly --- */}
        <g className="snowman-hat">
          {/* Hat Brim */}
          <ellipse cx="100" cy="52" rx="34" ry="7" fill="#181914" stroke="#292a23" strokeWidth="1.2" />
          {/* Hat Crown */}
          <path
            d="M78 51 L81 18 C81 16 83 14 85 14 L115 14 C117 14 119 16 119 18 L122 51 Z"
            fill="url(#topHatGrad)"
            stroke="#292a23"
            strokeWidth="1.2"
          />
          {/* Hat Top Ellipse */}
          <ellipse cx="100" cy="16" rx="17" ry="3.5" fill="#3a3b32" />
          {/* Start.ng Lime Ribbon */}
          <path
            d="M78 48 L122 48 L121 41 L79 41 Z"
            fill="#d8fd71"
          />
          {/* Holly Leaves & Berries */}
          <path
            d="M116 43 C120 40 125 42 124 45 C122 47 118 46 116 43 Z"
            fill="#20bf6b"
          />
          <circle cx="117" cy="45" r="2.2" fill="#eb4d4b" />
          <circle cx="120" cy="46" r="2" fill="#eb4d4b" />
        </g>

        {/* Little whimsical sparkles near hat */}
        <g className="snowman-sparkles" aria-hidden="true">
          <path
            d="M62 38 L65 41 L62 44 L59 41 Z"
            fill="#d8fd71"
            opacity="0.9"
          />
          <path
            d="M145 32 L147 34 L145 36 L143 34 Z"
            fill="#ffeaa7"
            opacity="0.85"
          />
        </g>
      </svg>

      {/* Snowy base soft shadow */}
      <div className="snowman-ground-shadow" aria-hidden="true" />
    </div>
  );
};
