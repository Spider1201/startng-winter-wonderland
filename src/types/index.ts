export type ThemeMode = 'light' | 'dark';

export type SeasonalMode = 'auto' | 'winter-preview' | 'normal-force';

export interface GameItem {
  id: string;
  title: string;
  slug: string;
  creator: string;
  description: string;
  category: 'Action' | 'Arcade' | 'Runner' | 'Board' | 'Puzzle' | 'Simulation';
  tags: string[];
  plays: string;
  rating: number;
  emoji: string;
  bgGradient: string;
  isGotw?: boolean;
  isLegendary?: boolean;
  festiveBadge?: string;
}

export type SnowmanMood = 'idle' | 'waving' | 'bouncing' | 'talking';

export interface SnowmanQuote {
  id: number;
  message: string;
  subtext?: string;
  icon: string;
}

export interface SnowParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  scale: number;
  shape: 'flake' | 'star' | 'circle' | 'sparkle';
}
