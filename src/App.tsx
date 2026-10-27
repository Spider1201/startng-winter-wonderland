import React, { useState } from 'react';
import { useSeasonalTheme } from './hooks/useSeasonalTheme';
import { useAudioEffects } from './hooks/useAudioEffects';
import { FestiveBanner } from './components/Seasonal/FestiveBanner';
import { SnowfallCanvas } from './components/Seasonal/SnowfallCanvas';
import { Navbar } from './components/Navigation/Navbar';
import { HeroSection } from './components/Hero/HeroSection';
import { GameShelf } from './components/Games/GameShelf';
import { HowItWorks } from './components/Content/HowItWorks';
import { AboutSection } from './components/Content/AboutSection';
import { Footer } from './components/Content/Footer';
import { MiniGameModal } from './components/Interactive/MiniGameModal';
import type { GameItem } from './types';
import { COMMUNITY_GAMES } from './data/games';

export const App: React.FC = () => {
  const {
    isWinterActive,
    mode,
    isNaturalDecember,
    hasUrlOverride,
    theme,
    setMode,
    toggleTheme
  } = useSeasonalTheme();

  const { isMuted, toggleSound, playSnowmanChime, playLightJingle } = useAudioEffects();

  const [activeGameModal, setActiveGameModal] = useState<GameItem | null>(null);
  const [isMiniGameOpen, setIsMiniGameOpen] = useState<boolean>(false);

  const handleOpenGame = (game: GameItem) => {
    setActiveGameModal(game);
    setIsMiniGameOpen(true);
  };

  const handleOpenDefaultMiniGame = () => {
    setActiveGameModal(COMMUNITY_GAMES[0]);
    setIsMiniGameOpen(true);
  };

  const handleCloseMiniGame = () => {
    setIsMiniGameOpen(false);
    setActiveGameModal(null);
  };

  return (
    <div className={`app-root ${isWinterActive ? 'theme-winter' : 'theme-standard'}`}>
      {/* 1. Reviewer & Seasonal Theme Preview Controller Banner */}
      <FestiveBanner
        isWinterActive={isWinterActive}
        mode={mode}
        isNaturalDecember={isNaturalDecember}
        hasUrlOverride={hasUrlOverride}
        setMode={setMode}
        isMuted={isMuted}
        toggleSound={toggleSound}
      />

      {/* 2. Multi-depth Falling Snowfall Simulation (Canvas, pointer-events: none) */}
      <SnowfallCanvas isWinterActive={isWinterActive} />

      {/* 3. Navigation with Fairy Lights and Brand Identity */}
      <Navbar
        isWinterActive={isWinterActive}
        theme={theme}
        toggleTheme={toggleTheme}
        onBulbClick={playLightJingle}
      />

      {/* 4. Main Page Content */}
      <main id="main-content">
        {/* Hero Section with Interactive Animated Snowman */}
        <HeroSection
          isWinterActive={isWinterActive}
          onSnowmanInteract={playSnowmanChime}
          onOpenMiniGame={handleOpenDefaultMiniGame}
        />

        {/* Community Games Catalog Shelf */}
        <GameShelf
          isWinterActive={isWinterActive}
          onPlayGame={handleOpenGame}
        />

        {/* 4-Step Publishing Workflow */}
        <HowItWorks />

        {/* About Start.ng & Community FAQ */}
        <AboutSection />
      </main>

      {/* 5. Complete Footer */}
      <Footer isWinterActive={isWinterActive} />

      {/* 6. Playable Browser Mini-Game Modal */}
      <MiniGameModal
        game={activeGameModal}
        isOpen={isMiniGameOpen}
        onClose={handleCloseMiniGame}
        isWinterActive={isWinterActive}
      />
    </div>
  );
};

export default App;
