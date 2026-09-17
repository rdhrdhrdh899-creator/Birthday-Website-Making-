import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  scale: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  tilt: number;
  vTilt: number;
  roll: number;
  vRoll: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
  alpha: number;
  color1: string;
  color2: string;
  color3: string;
}

export const RosePetalsShower: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Rose shades - deep romantic crimson to vivid ruby and soft rose
    const petalPalettes = [
      { c1: '#fda4af', c2: '#e11d48', c3: '#881337' }, // Classic deep crimson rose
      { c1: '#f43f5e', c2: '#be123c', c3: '#4c0519' }, // Dark velvet red
      { c1: '#fb7185', c2: '#f43f5e', c3: '#9f1239' }, // Vibrant ruby rose
      { c1: '#fecdd3', c2: '#e11d48', c3: '#881337' }, // Soft blushing petal
      { c1: '#ff4d6d', c2: '#c9184a', c3: '#590d22' }, // Rich rose pink
    ];

    const isMobile = window.innerWidth < 768;
    const maxPetals = isMobile ? 32 : 55;

    const createPetal = (fromTopLeftOnly = false): Petal => {
      const pal = petalPalettes[Math.floor(Math.random() * petalPalettes.length)];
      
      // Rain concentrated heavily from upper-left corner
      let startX: number;
      let startY: number;

      if (fromTopLeftOnly) {
        // Spawn either just above the top edge on left side, or on the upper-left side edge
        if (Math.random() > 0.4) {
          startX = Math.random() * (width * 0.4) - 40;
          startY = -30 - Math.random() * 50;
        } else {
          startX = -30 - Math.random() * 30;
          startY = Math.random() * (height * 0.4) - 20;
        }
      } else {
        // Initial distribution across diagonal shower trajectory
        startX = Math.random() * (width * 0.7) - 60;
        startY = Math.random() * height - 50;
      }

      const size = 12 + Math.random() * 12;

      return {
        x: startX,
        y: startY,
        size,
        scale: 0.7 + Math.random() * 0.5,
        // Drifts down and towards the right
        vx: 1.0 + Math.random() * 1.8,
        vy: 1.4 + Math.random() * 2.2,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.035,
        tilt: Math.random() * Math.PI,
        vTilt: 0.02 + Math.random() * 0.03,
        roll: Math.random() * Math.PI,
        vRoll: 0.015 + Math.random() * 0.03,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.02 + Math.random() * 0.02,
        swayAmp: 0.8 + Math.random() * 1.2,
        alpha: 0.75 + Math.random() * 0.25,
        color1: pal.c1,
        color2: pal.c2,
        color3: pal.c3,
      };
    };

    const petals: Petal[] = [];
    for (let i = 0; i < maxPetals; i++) {
      petals.push(createPetal(false));
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.66, 3);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Update physics
        p.swayPhase += p.swaySpeed * dt;
        p.x += (p.vx + Math.sin(p.swayPhase) * p.swayAmp) * dt;
        p.y += p.vy * dt;
        p.rotation += p.vRot * dt;
        p.tilt += p.vTilt * dt;
        p.roll += p.vRoll * dt;

        // Draw individual realistic rose petal
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // 3D flutter illusion via dual cosine/sine projection
        const cosTilt = Math.max(Math.abs(Math.cos(p.tilt)), 0.18);
        const sinRoll = Math.max(Math.abs(Math.sin(p.roll)), 0.22);
        ctx.scale(p.scale * cosTilt, p.scale * sinRoll);

        // Soft drop shadow for natural depth
        ctx.shadowColor = 'rgba(136, 19, 55, 0.22)';
        ctx.shadowBlur = 6 * p.scale;
        ctx.shadowOffsetY = 3 * p.scale;

        // Petal shape curve
        ctx.beginPath();
        const sz = p.size;
        ctx.moveTo(0, -sz);
        // Right petal lobe
        ctx.bezierCurveTo(sz * 0.85, -sz * 0.65, sz * 0.95, sz * 0.45, 0, sz);
        // Left petal lobe
        ctx.bezierCurveTo(-sz * 0.95, sz * 0.45, -sz * 0.85, -sz * 0.65, 0, -sz);
        ctx.closePath();

        // Velvet petal radial shading
        const grad = ctx.createRadialGradient(-sz * 0.2, -sz * 0.25, sz * 0.05, 0, 0, sz);
        grad.addColorStop(0, p.color1);
        grad.addColorStop(0.55, p.color2);
        grad.addColorStop(1, p.color3);

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle petal vein highlight
        ctx.shadowColor = 'transparent';
        ctx.beginPath();
        ctx.moveTo(0, -sz * 0.85);
        ctx.quadraticCurveTo(sz * 0.25, 0, 0, sz * 0.8);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.18 * p.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();

        // Reset petal once it drifts out of view (past right edge or bottom)
        if (p.y > height + 60 || p.x > width + 60) {
          petals[i] = createPetal(true);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      id="rose-petals-shower-container"
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle rosy ambient glow specifically in upper-left corner */}
      <div
        className="absolute -top-12 -left-12 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-rose-300/25 blur-3xl pointer-events-none"
      />
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
