import React, { useEffect, useRef } from 'react';

interface CinematicBackgroundProps {
  reducedMotion?: boolean;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({ reducedMotion = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const particleCount = reducedMotion ? 20 : isMobile ? 30 : 60;

    interface Particle {
      x: number;
      y: number;
      size: number;
      alpha: number;
      baseAlpha: number;
      speedY: number;
      twinklePhase: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = 0.2 + Math.random() * 0.4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        speedY: (Math.random() * 0.15 + 0.05) * (reducedMotion ? 0 : 1),
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(time - lastTime, 100);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          p.twinklePhase += 0.015 * (dt / 16);
          p.alpha = p.baseAlpha + Math.sin(p.twinklePhase) * 0.15;
          p.y -= p.speedY * (dt / 16);
          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }
        }

        let drawX = p.x;
        let drawY = p.y;
        if (mouseRef.current.active && !isMobile && !reducedMotion) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const factor = (150 - dist) / 150;
            drawX -= dx * factor * 0.04;
            drawY -= dy * factor * 0.04;
          }
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        // Soft golden/violet micro-particles in light theme
        ctx.fillStyle = `rgba(147, 51, 234, ${p.alpha.toFixed(2)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Light aesthetic luminous glows */}
      <div
        className="absolute -top-[20vw] -left-[15vw] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-violet-200/40 via-indigo-100/30 to-transparent blur-[120px] pointer-events-none"
      />
      <div
        className="absolute top-[30vh] -right-[15vw] w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-amber-100/40 via-rose-100/30 to-transparent blur-[130px] pointer-events-none"
      />
      <div
        className="absolute bottom-[-10vh] left-[15vw] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-sky-100/35 via-teal-50/30 to-transparent blur-[120px] pointer-events-none"
      />

      {/* Floating light particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Subtle fine paper texture / light grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
