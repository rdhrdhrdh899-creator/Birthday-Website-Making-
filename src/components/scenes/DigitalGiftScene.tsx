import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { audioEngine } from '../../utils/audio';

export const DigitalGiftScene: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (isOpen) return;
    setIsOpen(true);
    audioEngine.playPunchyStinger();
  };

  return (
    <section
      id="scene-digital-gift"
      className="relative min-h-[85vh] w-full flex items-center justify-center px-6 py-24 text-center select-none"
    >
      <div className="max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 space-y-2"
        >
          <span className="text-xs font-mono text-violet-700 uppercase tracking-widest font-bold block">
            A small token
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-accent font-bold text-stone-900">
            You unlocked something 🎁
          </h2>
        </motion.div>

        {/* Gift Card Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="closed-gift"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleOpenGift}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-xl hover:border-violet-400 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-700 group-hover:scale-110 transition-transform">
                  <Gift className="w-8 h-8" />
                </div>

                <p className="text-stone-700 text-sm font-semibold mb-4">
                  A small digital parcel waiting for you.
                </p>

                <button
                  id="open-gift-btn"
                  type="button"
                  className="px-7 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-violet-500/25 cursor-pointer"
                >
                  Open it
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="opened-gift"
                initial={{ scale: 0.85, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-violet-300 shadow-2xl relative overflow-hidden text-center space-y-4"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>YOUR REWARD</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif-accent font-bold text-stone-900">
                  You officially made my birthday a whole lot better.
                </h3>

                <div className="space-y-1 text-sm text-stone-600 pt-2 font-mono">
                  <p>That's it.</p>
                  <p>No coupon. No subscription. No NFT.</p>
                </div>

                <div className="pt-3 border-t border-stone-100 text-stone-900 text-sm font-semibold flex items-center justify-center gap-1.5">
                  <span>Just genuine gratitude + attitude.</span>
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
