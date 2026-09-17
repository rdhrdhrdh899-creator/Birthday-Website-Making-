import React from 'react';
import { motion } from 'motion/react';
import { PhotoScene } from '../PhotoScene';
import { PhotoConfig } from '../../types';

interface PhotoScene2Props {
  photo: PhotoConfig;
  visitorName: string;
}

export const PhotoScene2: React.FC<PhotoScene2Props> = ({ photo, visitorName }) => {
  return (
    <PhotoScene photo={photo} id="scene-photo-2">
      <div className="space-y-6 select-none max-w-lg mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-stone-500 text-sm sm:text-base font-medium tracking-wide uppercase font-mono"
        >
          There's something funny about birthdays.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg sm:text-2xl text-stone-800 font-light"
        >
          You start noticing the people who remembered.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-stone-600 text-base sm:text-lg font-light"
        >
          Not because you expect them to...
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-xl sm:text-2xl text-stone-900 font-serif-accent italic font-semibold"
        >
          ...but because they didn't have to.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="pt-6 space-y-3"
        >
          <p className="text-2xl sm:text-4xl font-serif-accent text-violet-700 font-bold">
            {visitorName}, you didn't have to.
          </p>
          <p className="text-xl sm:text-2xl text-stone-800 font-medium">
            But you did.
          </p>
          <p className="text-3xl sm:text-5xl font-serif-accent text-stone-950 font-bold pt-2">
            Thank you.
          </p>
        </motion.div>
      </div>
    </PhotoScene>
  );
};
