import React from 'react';
import { motion } from 'motion/react';
import { PhotoScene } from '../PhotoScene';
import { PhotoConfig } from '../../types';

interface PhotoScene3Props {
  photo: PhotoConfig;
  visitorName: string;
}

export const PhotoScene3: React.FC<PhotoScene3Props> = ({ photo, visitorName }) => {
  return (
    <PhotoScene photo={photo} id="scene-photo-3">
      <div className="space-y-6 select-none max-w-lg mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-4xl font-serif-accent font-bold text-violet-700"
        >
          {visitorName},
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-xl sm:text-2xl text-stone-900 font-light leading-relaxed"
        >
          Thank you for remembering me today.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-stone-600 text-base sm:text-lg font-normal leading-relaxed"
        >
          I hope you have a genuinely awesome and blessed day too.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="pt-6 space-y-4"
        >
          <p className="text-stone-500 text-base sm:text-lg font-light italic font-serif-accent">
            And if today ever gets a little noisy...
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif-accent text-stone-950 font-bold leading-snug">
            remember that somewhere, someone is glad you stopped by.
          </h3>
        </motion.div>
      </div>
    </PhotoScene>
  );
};
