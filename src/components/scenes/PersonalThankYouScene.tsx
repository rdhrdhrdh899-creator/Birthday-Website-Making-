import React from 'react';
import { motion } from 'motion/react';

interface PersonalThankYouSceneProps {
  visitorName: string;
}

export const PersonalThankYouScene: React.FC<PersonalThankYouSceneProps> = ({ visitorName }) => {
  return (
    <section
      id="scene-personal-thankyou"
      className="relative min-h-screen w-full flex items-center justify-center px-6 py-28 text-center"
    >
      <div className="max-w-xl mx-auto space-y-7 select-none">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-serif-accent font-semibold text-violet-700"
        >
          {visitorName},
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-normal text-stone-900 leading-snug"
        >
          Thank you for taking a moment to wish me.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-stone-600 text-base sm:text-lg max-w-md mx-auto leading-relaxed"
        >
          You probably sent a message that took you less than a minute in between your busy schedule.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-stone-800 text-lg sm:text-xl font-medium"
        >
          But it still made its way to me.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="pt-4"
        >
          <span className="text-stone-500 text-sm font-mono tracking-widest uppercase block mb-3 font-semibold">
            That counts.
          </span>
          <h3 className="text-3xl sm:text-5xl font-serif-accent font-bold text-stone-950 tracking-tight">
            More than you think. ❤️
          </h3>
        </motion.div>
      </div>
    </section>
  );
};
