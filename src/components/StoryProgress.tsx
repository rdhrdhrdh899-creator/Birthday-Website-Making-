import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, User, Flame } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface StoryProgressProps {
  visitorName: string;
  onChangeName: () => void;
  onReplay: () => void;
  scrollProgress: number;
}

export const StoryProgress: React.FC<StoryProgressProps> = ({
  visitorName,
  onChangeName,
  scrollProgress,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsPlaying(audioEngine.getSoundState());
    const interval = setInterval(() => {
      setIsPlaying(audioEngine.getSoundState());
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const nextState = audioEngine.toggleSound();
    setIsPlaying(nextState);
  };

  return (
    <>
      {/* Top subtle reading progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-stone-200/80 z-40 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-amber-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating top bar controls */}
      <nav
        id="story-ambient-controls"
        aria-label="Story Controls"
        className="fixed top-4 right-4 z-40 flex items-center gap-2"
      >
        {/* Attitude Beat Toggle with live visualizer bars */}
        <button
          id="sound-toggle-btn"
          type="button"
          onClick={handleToggleSound}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all backdrop-blur-md shadow-md cursor-pointer ${
            isPlaying
              ? 'bg-violet-600 border-violet-500 text-white shadow-violet-500/20'
              : 'bg-white/90 hover:bg-white border-stone-200 text-stone-700 hover:text-stone-900 shadow-stone-200'
          }`}
          title={isPlaying ? "Mute attitude beat" : "Play attitude beat"}
          aria-label={isPlaying ? "Mute attitude beat" : "Play attitude beat"}
        >
          {isPlaying ? (
            <>
              <Flame className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              <div className="flex items-end gap-[2px] h-3">
                <span className="w-[3px] bg-white rounded-full h-full animate-pulse" />
                <span className="w-[3px] bg-white rounded-full h-2 animate-bounce" />
                <span className="w-[3px] bg-white rounded-full h-3.5 animate-pulse" />
              </div>
              <span className="text-[11px] tracking-wide">Beat ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-[11px] font-medium text-stone-600">Beat OFF</span>
            </>
          )}
        </button>

        {/* Change Name Badge / Button */}
        {visitorName && (
          <button
            id="change-name-top-btn"
            type="button"
            onClick={onChangeName}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white border border-stone-200 text-xs font-medium text-stone-700 hover:text-stone-950 transition-all backdrop-blur-md shadow-md shadow-stone-200 cursor-pointer"
            title={`Personalized for ${visitorName}. Click to change name.`}
          >
            <User className="w-3.5 h-3.5 text-violet-600" />
            <span className="text-[11px] max-w-[85px] truncate">{visitorName}</span>
          </button>
        )}
      </nav>
    </>
  );
};
