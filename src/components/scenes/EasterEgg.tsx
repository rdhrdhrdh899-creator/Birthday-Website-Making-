import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';
import { audioEngine } from '../../utils/audio';

export const EasterEgg: React.FC = () => {
  const [found, setFound] = useState(false);
  const [revealedModal, setRevealedModal] = useState(false);

  const handleStarClick = () => {
    setFound(true);
    setRevealedModal(true);
    audioEngine.playPunchyStinger();
  };

  return (
    <div className="relative w-full py-10 flex items-center justify-center select-none overflow-hidden">
      {/* Hidden suspicious star */}
      <motion.button
        id="suspicious-star-easter-egg"
        type="button"
        onClick={handleStarClick}
        title="✨"
        aria-label="A tiny glowing point in the sky"
        whileHover={{ scale: 1.4 }}
        whileTap={{ scale: 0.9 }}
        className="group relative p-3 rounded-full cursor-pointer focus:outline-none opacity-50 hover:opacity-100 transition-opacity"
      >
        <Star
          className={`w-4 h-4 transition-colors ${
            found
              ? 'text-amber-500 fill-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]'
              : 'text-stone-400 group-hover:text-amber-500'
          }`}
        />
        <span className="sr-only">Mysterious hidden star</span>
      </motion.button>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {revealedModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm"
            onClick={() => setRevealedModal(false)}
          >
            <div
              className="max-w-sm w-full p-6 rounded-3xl bg-white border border-stone-200 text-center space-y-3 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-600">
                <Star className="w-6 h-6 fill-amber-500" />
              </div>
              <h4 className="text-xl font-serif-accent font-bold text-stone-900">
                You found the suspicious star! ⭐
              </h4>
              <p className="text-sm text-stone-600 leading-relaxed font-mono">
                Honestly, I didn't think anyone would actually notice or tap on that. You got eagle eyes!
              </p>
              <p className="text-xs text-amber-700 font-bold pt-1">
                Eagle Eye Swagger Unlocked 🏆🔥
              </p>
              <button
                type="button"
                onClick={() => setRevealedModal(false)}
                className="mt-3 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold cursor-pointer shadow-sm"
              >
                Close & carry on ✨
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
