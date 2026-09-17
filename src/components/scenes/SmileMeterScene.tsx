import React, { useState } from 'react';
import { motion } from 'motion/react';
import { audioEngine } from '../../utils/audio';

export const SmileMeterScene: React.FC = () => {
  const [level, setLevel] = useState<number>(75);

  const getSmileFeedback = (val: number) => {
    if (val < 25) {
      return {
        emoji: '😐',
        text: 'Okay... fair enough.',
        accent: 'text-stone-500',
      };
    } else if (val < 65) {
      return {
        emoji: '😎',
        text: "That's more like it, full attitude.",
        accent: 'text-indigo-700 font-semibold',
      };
    } else if (val < 99) {
      return {
        emoji: '🔥😎',
        text: "Now we're talking! Certified Swagger.",
        accent: 'text-violet-700 font-bold',
      };
    } else {
      return {
        emoji: '👑🔥',
        text: 'Scientific conclusion: You brought king-size energy to my day! ❤️',
        accent: 'text-amber-600 font-bold text-lg',
      };
    }
  };

  const current = getSmileFeedback(level);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setLevel(val);
    if (val === 100 && level !== 100) {
      audioEngine.playPunchyStinger();
    }
  };

  return (
    <section
      id="scene-smile-meter"
      className="relative min-h-[90vh] w-full flex items-center justify-center px-6 py-24 text-center select-none"
    >
      <div className="max-w-lg mx-auto space-y-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <span className="text-xs font-mono text-violet-700 uppercase tracking-widest font-bold block">
            The Metric • Scientific Accuracy: 100%
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-accent font-bold text-stone-900">
            One completely scientific question...
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light">
            How much did your birthday wish make me smile?
          </p>
        </motion.div>

        {/* Meter Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-xl shadow-stone-900/5 relative overflow-hidden"
        >
          {/* Reaction Display */}
          <div className="flex flex-col items-center justify-center min-h-[110px] space-y-3">
            <motion.div
              key={current.emoji}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="text-4xl sm:text-5xl"
            >
              {current.emoji}
            </motion.div>

            <motion.p
              key={current.text}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-base sm:text-lg ${current.accent} transition-colors duration-300`}
            >
              {current.text}
            </motion.p>
          </div>

          {/* Interactive Range Slider */}
          <div className="space-y-3 pt-6">
            <div className="flex justify-between items-center text-xs font-mono text-stone-500 px-1 font-semibold">
              <span>😐 Calm</span>
              <span className="text-violet-700 font-bold text-sm">{level}%</span>
              <span>👑 Boss Level</span>
            </div>

            <input
              id="smile-slider-input"
              type="range"
              min="0"
              max="100"
              value={level}
              onChange={handleSliderChange}
              className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400"
              aria-label="Smile Level Slider"
            />
          </div>

          <p className="text-[11px] text-stone-400 font-mono mt-6">
            * Research methodology: 100% genuine vibe verification.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
