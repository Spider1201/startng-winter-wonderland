import { useState, useEffect, useCallback } from 'react';
import type { SeasonalMode, ThemeMode } from '../types';

export interface SeasonalThemeState {
  isWinterActive: boolean;
  mode: SeasonalMode;
  isNaturalDecember: boolean;
  hasUrlOverride: boolean;
  theme: ThemeMode;
  setMode: (newMode: SeasonalMode) => void;
  toggleTheme: () => void;
  resetToAuto: () => void;
}

export function useSeasonalTheme(): SeasonalThemeState {
  // Check natural calendar: month 11 is December (0-indexed)
  const [isNaturalDecember] = useState<boolean>(() => {
    const now = new Date();
    return now.getMonth() === 11;
  });

  // Base theme: light or dark (persisted in localStorage as in Start.ng)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // Fallback
    }
    return 'light';
  });

  // Check URL param ?winterPreview=1 or ?winterPreview=0
  const [urlParamOverride, setUrlParamOverride] = useState<boolean | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const params = new URLSearchParams(window.location.search);
      const winterParam = params.get('winterPreview') ?? params.get('winter');
      if (winterParam === '1' || winterParam === 'true') return true;
      if (winterParam === '0' || winterParam === 'false') return false;
    } catch {
      // Ignore
    }
    return null;
  });

  // Reviewer session mode ('auto' | 'winter-preview' | 'normal-force')
  const [mode, setModeState] = useState<SeasonalMode>(() => {
    if (urlParamOverride === true) return 'winter-preview';
    if (urlParamOverride === false) return 'normal-force';
    try {
      const sessionMode = sessionStorage.getItem('startng_seasonal_mode');
      if (sessionMode === 'winter-preview' || sessionMode === 'normal-force' || sessionMode === 'auto') {
        return sessionMode as SeasonalMode;
      }
    } catch {
      // Ignore
    }
    return 'auto';
  });

  // Calculate if winter theme is active
  const isWinterActive = mode === 'winter-preview'
    ? true
    : mode === 'normal-force'
      ? false
      : isNaturalDecember;

  const setMode = useCallback((newMode: SeasonalMode) => {
    setModeState(newMode);
    try {
      sessionStorage.setItem('startng_seasonal_mode', newMode);
      // Update URL query param nicely without page reload for easy sharing
      const url = new URL(window.location.href);
      if (newMode === 'winter-preview') {
        url.searchParams.set('winterPreview', '1');
      } else if (newMode === 'normal-force') {
        url.searchParams.set('winterPreview', '0');
      } else {
        url.searchParams.delete('winterPreview');
        url.searchParams.delete('winter');
      }
      window.history.replaceState({}, '', url.toString());
      setUrlParamOverride(newMode === 'winter-preview' ? true : newMode === 'normal-force' ? false : null);
    } catch {
      // Fallback
    }
  }, []);

  const resetToAuto = useCallback(() => {
    setMode('auto');
  }, [setMode]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  // Sync HTML document attributes, title, and favicon
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    if (isWinterActive) {
      root.setAttribute('data-seasonal-theme', 'winter');
      document.title = 'start.ng · Winter Wonderland ❄️ · Good vibes. Good games.';
      const favicon = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (favicon) {
        favicon.href = '/favicon-winter.svg';
      }
    } else {
      root.removeAttribute('data-seasonal-theme');
      document.title = 'start.ng · Good vibes. Good games.';
      const favicon = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (favicon) {
        favicon.href = '/favicon.svg';
      }
    }
  }, [isWinterActive, theme]);

  return {
    isWinterActive,
    mode,
    isNaturalDecember,
    hasUrlOverride: urlParamOverride !== null,
    theme,
    setMode,
    toggleTheme,
    resetToAuto
  };
}
