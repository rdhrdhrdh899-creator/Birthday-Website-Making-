import React from 'react';
import { motion } from 'motion/react';

interface PersonalizedSurpriseSceneProps {
  visitorName: string;
}

export const PersonalizedSurpriseScene: React.FC<PersonalizedSurpriseSceneProps> = ({ visitorName }) => {
  return (
    <section
      id="scene-surprise"
      className="relative min-h-[75vh] w-full flex items-center justify-center px-6 py-24 text-center select-none"
    >
      <div className="max-w-lg mx-auto space-y-7">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl font-serif-accent font-semibold text-stone-800"
        >
          {visitorName}...
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-xl sm:text-2xl text-stone-600 font-light"
        >
          ...you're still here scrolling?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="inline-block px-6 py-2.5 rounded-full bg-white border border-stone-200 text-stone-900 text-base font-mono font-semibold shadow-md shadow-stone-900/5"
        >
          Okay. Pure Respect. 😂🔥
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="space-y-3 pt-4"
        >
          <p className="text-sm uppercase tracking-widest text-stone-500 font-mono font-semibold">
            Since you actually stayed till the end...
          </p>
          <h3 className="text-2xl sm:text-4xl font-serif-accent font-bold text-violet-700 tracking-tight">
            You're officially part of the birthday lore.
          </h3>
        </motion.div>
      </div>
    </section>
  );
};
