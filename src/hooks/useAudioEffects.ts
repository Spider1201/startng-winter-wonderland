import { useState, useCallback, useRef } from 'react';

export function useAudioEffects() {
  const [isMuted, setIsMuted] = useState<boolean>(true); // Default muted as per requirements
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Play gentle winter chime chord (C6, E6, G6, C7 with soft decay)
  const playSnowmanChime = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [1046.5, 1318.51, 1567.98, 2093.0]; // C6, E6, G6, C7
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        // Soft bell envelope
        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.85);
      });
    } catch {
      // Audio fallback silent
    }
  }, [isMuted, getAudioContext]);

  // Play subtle fairy light twinkle chime
  const playLightJingle = useCallback((freqIndex = 0) => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const scale = [880, 987.77, 1108.73, 1174.66, 1318.51, 1479.98, 1661.22, 1760];
      const freq = scale[freqIndex % scale.length];
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Ignore
    }
  }, [isMuted, getAudioContext]);

  const toggleSound = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (!next) {
        // If unmuting, resume context
        getAudioContext();
      }
      return next;
    });
  }, [getAudioContext]);

  return {
    isMuted,
    toggleSound,
    playSnowmanChime,
    playLightJingle
  };
}
