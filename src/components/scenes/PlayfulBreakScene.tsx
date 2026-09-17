import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Flame } from 'lucide-react';
import { audioEngine } from '../../utils/audio';

export const PlayfulBreakScene: React.FC = () => {
  const [isFixed, setIsFixed] = useState(false);

  const handleFix = () => {
    setIsFixed(true);
    audioEngine.playPunchyStinger();
  };

  return (
    <section
      id="scene-playful-break"
      className="relative min-h-[75vh] w-full flex items-center justify-center px-6 py-20 text-center select-none"
    >
      <div className="max-w-md mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <p className="text-stone-500 text-base font-mono uppercase tracking-wider font-semibold">
            Hold up.
          </p>
          <h3 className="text-2xl sm:text-3xl font-serif-accent font-bold text-stone-900">
            Enough emotions.
          </h3>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            I've become slightly concerned that this website is getting suspiciously wholesome. Where's the attitude?
          </p>
        </motion.div>

        <div>
          {!isFixed ? (
            <motion.button
              id="fix-wholesome-btn"
              type="button"
              onClick={handleFix}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold transition-all shadow-lg cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Fix it with Swag 😂</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-sm font-semibold shadow-sm font-mono"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Attitude level restored to 100%. 🤝🔥</span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
