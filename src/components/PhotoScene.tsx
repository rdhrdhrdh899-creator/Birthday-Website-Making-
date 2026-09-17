import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PhotoConfig } from '../types';
import { Camera } from 'lucide-react';

interface PhotoSceneProps {
  photo: PhotoConfig;
  children: React.ReactNode;
  id?: string;
  overlayDarkness?: 'light' | 'medium' | 'deep';
  align?: 'center' | 'left';
}

export const PhotoScene: React.FC<PhotoSceneProps> = ({
  photo,
  children,
  id,
  align = 'center',
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id={id || photo.section}
      className="relative min-h-[90vh] sm:min-h-screen w-full flex items-center justify-center px-5 sm:px-8 py-24 overflow-hidden"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {!imgError ? (
          <img
            src={photo.src}
            alt={photo.alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            style={{ objectPosition: photo.focalPosition || 'center' }}
            className={`w-full h-full object-cover transition-transform duration-1000 ease-out transform scale-100 hover:scale-[1.03] ${
              imgLoaded ? 'opacity-35 sm:opacity-45 blur-[0.5px]' : 'opacity-0'
            }`}
          />
        ) : (
          /* Graceful fallback */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-stone-100 via-stone-50 to-[#fafaf9]">
            <div className="flex items-center gap-2 text-stone-500 text-xs px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm">
              <Camera className="w-3.5 h-3.5 text-violet-600" />
              <span>Personal photo placeholder</span>
            </div>
          </div>
        )}

        {/* Luminous Light Theme Overlays for pristine text legibility */}
        <div className="absolute inset-0 bg-[#fafaf9]/75 sm:bg-[#fafaf9]/65 backdrop-blur-[2px] transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf9] via-transparent to-[#fafaf9]/90" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#fafaf9]/30 to-[#fafaf9]/90" />
      </div>

      {/* Foreground Content */}
      <div
        className={`relative z-10 w-full max-w-2xl mx-auto flex flex-col ${
          align === 'left' ? 'items-start text-left' : 'items-center text-center'
        }`}
      >
        {children}

        {/* Caption */}
        {photo.caption && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 flex items-center gap-2 text-[11px] text-stone-600 tracking-wider uppercase font-mono px-3.5 py-1.5 rounded-full bg-white/90 border border-stone-200/90 shadow-sm backdrop-blur-sm"
          >
            <Camera className="w-3 h-3 text-violet-600" />
            <span>{photo.caption}</span>
          </motion.div>
        )}
      </div>
    </section>
  );
};
