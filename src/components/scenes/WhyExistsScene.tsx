import React from 'react';
import { motion } from 'motion/react';

export const WhyExistsScene: React.FC = () => {
  return (
    <section
      id="scene-why-exists"
      className="relative min-h-screen w-full flex items-center justify-center px-6 py-28 text-center"
    >
      <div className="max-w-xl mx-auto space-y-8 select-none">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-lg sm:text-2xl text-stone-700 font-light"
        >
          I received a bunch of birthday wishes today.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-sm sm:text-base text-stone-700">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-4 rounded-2xl bg-white/90 border border-stone-200/90 shadow-sm"
          >
            Some were long & thoughtful.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="p-4 rounded-2xl bg-white/90 border border-stone-200/90 shadow-sm"
          >
            Some were just: "HBD bro 🎂"
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="p-4 rounded-2xl bg-white/90 border border-stone-200/90 shadow-sm"
          >
            Some arrived right at 12:00 AM.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="p-4 rounded-2xl bg-white/90 border border-stone-200/90 shadow-sm"
          >
            Some arrived much, much later.
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-stone-900 text-lg sm:text-xl font-medium pt-2"
        >
          But every single one made my day genuinely better.
        </motion.p>

        <div className="space-y-4 pt-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-stone-500 text-base"
          >
            So instead of sending the exact same copy-paste...
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-stone-500 text-sm font-mono"
          >
            "Thank you ❤️" ... to everyone ...
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-serif-accent font-bold text-stone-950 tracking-tight pt-3"
          >
            I made this experience.
          </motion.h2>
        </div>
      </div>
    </section>
  );
};
