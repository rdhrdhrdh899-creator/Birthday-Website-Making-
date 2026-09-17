import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, Flame } from 'lucide-react';
import { audioEngine } from '../../utils/audio';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
}

export const InteractiveThankYouScene: React.FC = () => {
  const [isOfficial, setIsOfficial] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOfficialTap = () => {
    if (isOfficial) return;
    setIsOfficial(true);
    audioEngine.playPunchyStinger();

    const newParticles: Particle[] = [];
    const colors = ['#7c3aed', '#6366f1', '#f59e0b', '#ec4899', '#10b981'];
    for (let i = 0; i < 28; i++) {
      const angle = (Math.PI * 2 * i) / 28 + (Math.random() - 0.5) * 0.4;
      const speed = 45 + Math.random() * 85;
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        size: Math.random() * 4 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle,
        speed,
      });
    }
    setParticles(newParticles);
  };

  return (
    <section
      id="scene-interactive-thankyou"
      className="relative min-h-[85vh] w-full flex items-center justify-center px-6 py-24 text-center select-none"
    >
      <div className="max-w-md mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <span className="text-xs font-mono text-violet-700 uppercase tracking-widest font-bold block">
            Interaction • High Voltage
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-accent font-bold text-stone-900">
            Okay, let's make this official.
          </h2>
        </motion.div>

        {/* The glowing button */}
        <div className="relative inline-flex items-center justify-center">
          {/* Light glow halo */}
          <div
            className={`absolute -inset-2 rounded-2xl bg-gradient-to-r from-violet-500/25 to-amber-500/25 blur-xl transition-opacity duration-700 pointer-events-none ${
              isOfficial ? 'opacity-90 scale-110' : 'opacity-50 animate-pulse'
            }`}
          />

          {/* Burst particles */}
          {particles.map((p) => {
            const tx = Math.cos(p.angle) * p.speed;
            const ty = Math.sin(p.angle) * p.speed;
            return (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: tx,
                  y: ty,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
                className="absolute rounded-full pointer-events-none z-20"
                style={{
                  backgroundColor: p.color,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  boxShadow: `0 0 6px ${p.color}`,
                }}
              />
            );
          })}

          <motion.button
            ref={buttonRef}
            id="official-thankyou-btn"
            type="button"
            onClick={handleOfficialTap}
            whileHover={!isOfficial ? { scale: 1.04 } : {}}
            whileTap={!isOfficial ? { scale: 0.95 } : {}}
            className={`relative z-10 flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base tracking-wide transition-all shadow-xl cursor-pointer ${
              isOfficial
                ? 'bg-white text-emerald-700 border-2 border-emerald-500 shadow-emerald-500/10'
                : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-700 hover:to-indigo-700 text-white border border-violet-400 shadow-violet-600/30'
            }`}
          >
            {isOfficial ? (
              <>
                <Check className="w-5 h-5 text-emerald-600" />
                <span>Officially Received with Swag ✓</span>
              </>
            ) : (
              <>
                <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
                <span>Tap this 👆</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Reaction Text */}
        <AnimatePresence>
          {isOfficial && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="space-y-1.5 pt-2"
            >
              <p className="text-stone-800 text-lg font-bold">Yep.</p>
              <p className="text-violet-800 font-serif-accent text-2xl sm:text-3xl tracking-wide italic font-semibold">
                That's my official Thank You. ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
