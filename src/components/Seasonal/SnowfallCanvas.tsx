import React, { useEffect, useRef } from 'react';

interface SnowfallCanvasProps {
  isWinterActive?: boolean;
}

interface Flake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  swaySpeed: number;
  swayDist: number;
  swayOffset: number;
  opacity: number;
  layer: number; // 0: back, 1: mid, 2: front
}

export const SnowfallCanvas: React.FC<SnowfallCanvasProps> = ({ isWinterActive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isWinterActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    const flakes: Flake[] = [];

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Populate flakes (about 55 flakes for gentle, whimsical atmosphere)
    const count = Math.min(60, Math.floor(window.innerWidth / 22));
    for (let i = 0; i < count; i++) {
      const layer = Math.random() < 0.2 ? 2 : Math.random() < 0.6 ? 1 : 0;
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: layer === 2 ? 2.8 + Math.random() * 1.5 : layer === 1 ? 1.6 + Math.random() * 1.2 : 0.8 + Math.random() * 0.8,
        speed: layer === 2 ? 0.9 + Math.random() * 0.7 : layer === 1 ? 0.5 + Math.random() * 0.5 : 0.25 + Math.random() * 0.3,
        swaySpeed: 0.001 + Math.random() * 0.002,
        swayDist: 15 + Math.random() * 25,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: layer === 2 ? 0.75 : layer === 1 ? 0.55 : 0.35,
        layer
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 1;

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];

        if (!prefersReducedMotion) {
          f.y += f.speed;
          f.x += Math.sin(time * f.swaySpeed + f.swayOffset) * 0.45;

          // Wrap horizontally
          if (f.x > width + 10) f.x = -10;
          if (f.x < -10) f.x = width + 10;

          // Wrap vertically
          if (f.y > height + 10) {
            f.y = -10;
            f.x = Math.random() * width;
          }
        }

        // Draw soft snowflake
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.fill();

        // Extra soft glow for foreground flakes
        if (f.layer === 2) {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(216, 253, 113, ${f.opacity * 0.15})`;
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isWinterActive]);

  if (!isWinterActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="snow-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh'
      }}
    />
  );
};
