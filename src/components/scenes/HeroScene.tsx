import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { RosePetalsShower } from '../RosePetalsShower';

interface HeroSceneProps {
  visitorName: string;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ visitorName }) => {
  // Typing animation state
  const [typedCount, setTypedCount] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Full greeting sequence
  const prefix = "Hey, ";
  const name = visitorName || "Friend";
  const suffix = " 👋";
  const totalLength = prefix.length + name.length + suffix.length;

  useEffect(() => {
    // Reset typing on visitorName change
    setTypedCount(0);
    setIsTypingComplete(false);

    let currentIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeNextChar = () => {
      currentIndex++;
      setTypedCount(currentIndex);

      if (currentIndex < totalLength) {
        // Natural typing pause after comma
        const isCommaPause = currentIndex === prefix.length;
        const delay = isCommaPause ? 240 : 55 + Math.random() * 35;
        timer = setTimeout(typeNextChar, delay);
      } else {
        setIsTypingComplete(true);
      }
    };

    // Initial slight delay before typing begins
    timer = setTimeout(typeNextChar, 400);

    return () => clearTimeout(timer);
  }, [visitorName, totalLength, prefix.length]);

  // Derived typed segments
  const prefixTyped = prefix.slice(0, Math.min(typedCount, prefix.length));
  
  const nameTypedLength = Math.max(0, Math.min(typedCount - prefix.length, name.length));
  const nameTyped = name.slice(0, nameTypedLength);

  const suffixTypedLength = Math.max(0, typedCount - prefix.length - name.length);
  const suffixTyped = suffix.slice(0, suffixTypedLength);

  return (
    <section
      id="scene-hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 text-center select-none overflow-hidden"
    >
      {/* Rose Petals Shower raining down diagonally from upper-left corner */}
      <RosePetalsShower />

      <div className="relative z-20 max-w-xl mx-auto space-y-6">
        {/* Badge: Personal response loaded */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50/90 border border-rose-200 text-rose-800 text-xs font-semibold mb-4 tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Personal response loaded</span>
          </div>

          {/* Typing Greeting Header */}
          <h1
            id="hero-typing-greeting"
            className="min-h-[70px] sm:min-h-[85px] md:min-h-[105px] flex items-center justify-center flex-wrap text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-950 font-serif-accent"
          >
            <span>{prefixTyped}</span>
            {nameTyped && (
              <span className="text-violet-700 underline decoration-violet-300 underline-offset-8">
                {nameTyped}
              </span>
            )}
            <span>{suffixTyped}</span>

            {/* Blinking Typewriter Cursor */}
            <span
              className={`inline-block w-[3px] sm:w-[4px] h-[0.85em] align-middle bg-violet-600 ml-1.5 rounded-full transition-opacity duration-300 ${
                isTypingComplete ? 'animate-pulse opacity-70' : 'opacity-100'
              }`}
              aria-hidden="true"
            />
          </h1>
        </motion.div>

        {/* Step 2: You wished me on my birthday... (Reveals as typing nears completion) */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isTypingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-lg sm:text-2xl text-stone-600 font-light"
        >
          You wished me on my birthday...
        </motion.p>

        {/* Step 3: ...so I made something special for you. */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isTypingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="text-xl sm:text-3xl text-stone-900 font-medium font-serif-accent italic tracking-wide"
        >
          ...so I made something special for you.
        </motion.p>
      </div>

      {/* Subtle Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isTypingComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.0, duration: 0.9 }}
        className="relative z-20 absolute bottom-10 flex flex-col items-center gap-2 text-stone-500 text-xs tracking-widest uppercase font-mono cursor-pointer hover:text-stone-900 transition-colors"
        onClick={() => {
          window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
        }}
      >
        <span>Scroll to feel the vibe</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-violet-600" />
        </motion.div>
      </motion.div>
    </section>
  );
};

