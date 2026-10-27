import React from 'react';
import { Snowman } from '../Seasonal/Snowman';
import { WinterHeroMound } from '../Seasonal/WinterHeroMound';
import { PineGarland } from '../Seasonal/PineGarland';

interface HeroSectionProps {
  isWinterActive: boolean;
  onSnowmanInteract?: () => void;
  onOpenMiniGame?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isWinterActive,
  onSnowmanInteract,
  onOpenMiniGame
}) => {
  return (
    <section className="hero-section" id="hero">
      {/* Decorative Evergreen Pine Garlands Framing Corners in Winter Mode */}
      <PineGarland position="top-left" isWinterActive={isWinterActive} />
      <PineGarland position="top-right" isWinterActive={isWinterActive} />

      <div className="hero-content-layout">
        {/* Core Hero Text & Primary CTA */}
        <div className="hero-text-block">
          <p className="eyebrow">Big imagination. Played everywhere.</p>
          <h1 className="hero-headline">
            Good vibes.
            <br />
            <mark>Good games.</mark>
          </h1>
          <p className="lead">
            Games made by builders in the community. Each one lives at its own start.ng address.
            Pick one and play right in your browser.
          </p>

          <div className="actions">
            <a
              href="#games"
              className={`btn ${isWinterActive ? 'btn-play-winter' : ''}`}
            >
              {/* Snow cap crest on button in winter */}
              {isWinterActive && (
                <svg
                  className="snow-cap-crest"
                  viewBox="0 0 100 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M 0,10 C 15,2 35,0 50,4 C 65,8 85,1 100,6 L 100,10 Z"
                    fill="#ffffff"
                  />
                  <ellipse cx="25" cy="4" rx="4" ry="2" fill="#ffffff" />
                  <ellipse cx="75" cy="4" rx="5" ry="2.2" fill="#ffffff" />
                </svg>
              )}
              <span>Play now</span>
              <span>→</span>
            </a>

            {/* Whimsical Seasonal Quick Play Mini-Game */}
            {isWinterActive && onOpenMiniGame && (
              <button
                type="button"
                className="btn ghost"
                onClick={onOpenMiniGame}
                title="Play a quick holiday mini-game in your browser"
              >
                <span>❄️ Play Mini-Game</span>
              </button>
            )}
          </div>
        </div>

        {/* Snowman Character Stage (Active during December or Preview) */}
        {isWinterActive && (
          <div className="hero-snowman-stage">
            <Snowman isWinterActive={isWinterActive} onInteract={onSnowmanInteract} />
          </div>
        )}
      </div>

      {/* Layered Snowy Ground Mound Transitioning to Games */}
      <WinterHeroMound isWinterActive={isWinterActive} />
    </section>
  );
};
