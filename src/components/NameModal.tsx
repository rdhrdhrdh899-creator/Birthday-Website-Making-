import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Flame } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface NameModalProps {
  isOpen: boolean;
  onSubmitName: (name: string) => void;
}

export const NameModal: React.FC<NameModalProps> = ({ isOpen, onSubmitName }) => {
  const [inputVal, setInputVal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = inputVal.trim().replace(/\s+/g, ' ');

    if (!cleanName) {
      setErrorMessage("Come on, I need at least a name 😭");
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }

    if (cleanName.length > 30) {
      setErrorMessage("Whoa, that's a mighty long name! Let's keep it under 30 characters ✨");
      return;
    }

    const formatted = cleanName
      .split(' ')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    setErrorMessage('');
    setIsSubmitting(true);

    // Start attitude beat on user interaction
    audioEngine.startBeat();

    setTimeout(() => {
      onSubmitName(formatted);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="name-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md"
        >
          <motion.div
            id="name-modal-card"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md p-8 md:p-10 rounded-3xl bg-white border border-stone-200/90 shadow-2xl shadow-stone-900/15 relative overflow-hidden text-center"
          >
            {/* Subtle light glow accents */}
            <div
              className="absolute -top-16 -left-16 w-36 h-36 rounded-full bg-violet-400/15 blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-16 -right-16 w-36 h-36 rounded-full bg-amber-400/15 blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold mb-4 tracking-wide"
              >
                <Flame className="w-3.5 h-3.5 text-violet-600" />
                <span>Before we begin... 👀</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mb-2 font-serif-accent"
              >
                Enter your good name ✨
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-stone-500 text-sm mb-6 max-w-xs mx-auto"
              >
                Just so I know who I'm personally thanking with full swag & vibe.
              </motion.p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    ref={inputRef}
                    id="visitor-name-input"
                    type="text"
                    value={inputVal}
                    onChange={(e) => {
                      setInputVal(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Your name"
                    autoComplete="off"
                    maxLength={35}
                    className="w-full px-5 py-3.5 rounded-2xl bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 text-base font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 focus:bg-white transition-all text-center tracking-wide shadow-inner"
                  />
                  {errorMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-500 text-xs mt-2 font-medium"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  id="name-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-sm transition-all shadow-lg shadow-violet-500/25 cursor-pointer disabled:opacity-75"
                >
                  <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>{isSubmitting ? "Starting the vibe..." : "Drop the Beat & Enter →"}</span>
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </motion.button>
              </form>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-stone-400 text-xs mt-5"
              >
                Promise, I'm not collecting it. 😌
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
