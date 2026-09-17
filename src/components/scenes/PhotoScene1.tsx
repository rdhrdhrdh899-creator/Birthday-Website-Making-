import React from 'react';
import { motion } from 'motion/react';
import { PhotoScene } from '../PhotoScene';
import { PhotoConfig } from '../../types';

interface PhotoScene1Props {
  photo: PhotoConfig;
}

export const PhotoScene1: React.FC<PhotoScene1Props> = ({ photo }) => {
  return (
    <PhotoScene photo={photo} id="scene-photo-1">
      <div className="space-y-6 select-none">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-stone-500 text-sm sm:text-base font-mono tracking-widest uppercase font-semibold"
        >
          Okay...
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl sm:text-2xl text-stone-700 font-light"
        >
          I could've just replied with a regular...
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="inline-block px-6 py-2.5 rounded-2xl bg-white/95 border border-stone-200 text-stone-900 text-lg font-mono tracking-wide shadow-md shadow-stone-900/5"
        >
          "Thank you ❤️"
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-stone-500 text-base"
        >
          But honestly...
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif-accent italic font-bold text-stone-950 tracking-tight"
        >
          where's the fun in that? 😉
        </motion.h2>
      </div>
    </PhotoScene>
  );
};
