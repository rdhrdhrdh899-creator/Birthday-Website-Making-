import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, UserCheck, Heart, Flame } from 'lucide-react';

interface FinalSceneProps {
  onReplay: () => void;
  onChangeName: () => void;
  visitorName: string;
}

export const FinalScene: React.FC<FinalSceneProps> = ({
  onReplay,
  onChangeName,
  visitorName,
}) => {
  return (
    <footer
      id="scene-final"
      className="relative min-h-[80vh] w-full flex flex-col items-center justify-between px-6 pt-28 pb-12 text-center select-none"
    >
      <div className="max-w-md mx-auto space-y-7 my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="w-14 h-14 mx-auto rounded-3xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shadow-sm">
            <Heart className="w-7 h-7 fill-rose-500" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-accent font-bold text-stone-950 tracking-tight leading-tight">
            Thank you for the birthday wish. ❤️
          </h2>

          <p className="text-xl sm:text-2xl text-stone-600 font-light font-serif-accent italic">
            Seriously. Stay awesome.
          </p>
        </motion.div>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            id="replay-experience-btn"
            type="button"
            onClick={onReplay}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold tracking-wide uppercase transition-all shadow-lg hover:shadow-xl cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-violet-300" />
            <span>Replay this with the Beat ↻</span>
          </button>

          <button
            id="change-name-final-btn"
            type="button"
            onClick={onChangeName}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 hover:text-stone-950 text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-violet-600" />
            <span>Change name ({visitorName})</span>
          </button>
        </motion.div>
      </div>

      {/* Footer credits */}
      <div className="pt-16 text-center space-y-2">
        <p className="text-xs text-stone-500 font-mono font-medium">
          Made with slightly unnecessary amounts of code & attitude. 💻🔥
        </p>
        <p className="text-[11px] text-stone-400">
          Personal response experience • Full swagger & genuine gratitude
        </p>
      </div>
    </footer>
  );
};
