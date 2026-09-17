import React, { useState, useEffect, useCallback } from 'react';
import { CinematicBackground } from './components/CinematicBackground';
import { NameModal } from './components/NameModal';
import { StoryProgress } from './components/StoryProgress';
import { HeroScene } from './components/scenes/HeroScene';
import { PhotoScene1 } from './components/scenes/PhotoScene1';
import { WhyExistsScene } from './components/scenes/WhyExistsScene';
import { PersonalThankYouScene } from './components/scenes/PersonalThankYouScene';
import { InteractiveThankYouScene } from './components/scenes/InteractiveThankYouScene';
import { SmileMeterScene } from './components/scenes/SmileMeterScene';
import { PhotoScene2 } from './components/scenes/PhotoScene2';
import { PlayfulBreakScene } from './components/scenes/PlayfulBreakScene';
import { DigitalGiftScene } from './components/scenes/DigitalGiftScene';
import { EasterEgg } from './components/scenes/EasterEgg';
import { PersonalizedSurpriseScene } from './components/scenes/PersonalizedSurpriseScene';
import { PhotoScene3 } from './components/scenes/PhotoScene3';
import { FinalScene } from './components/scenes/FinalScene';
import { STORY_CONFIG } from './config/storyContent';

const STORAGE_KEY = 'birthday_visitor_name';

export default function App() {
  const [visitorName, setVisitorName] = useState<string>('');
  const [isNameModalOpen, setIsNameModalOpen] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [replayKey, setReplayKey] = useState<number>(0);

  // Check saved visitor name & reduced motion on mount
  useEffect(() => {
    try {
      const savedName = localStorage.getItem(STORAGE_KEY);
      if (savedName && savedName.trim()) {
        setVisitorName(savedName.trim());
        setIsNameModalOpen(false);
      }
    } catch {
      // LocalStorage unavailable fallback
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  // Track scroll progress for reading bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNameSubmit = (name: string) => {
    setVisitorName(name);
    setIsNameModalOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch {
      // In-memory fallback
    }
  };

  const handleChangeName = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Fallback
    }
    setVisitorName('');
    setIsNameModalOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setReplayKey((prev) => prev + 1);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fafaf9] text-[#0f172a] selection:bg-violet-500/20 selection:text-violet-900">
      {/* Luminous Light Atmosphere & Golden Dust Background */}
      <CinematicBackground reducedMotion={reducedMotion} />

      {/* Persistent subtle progress & sound/name controls */}
      {!isNameModalOpen && visitorName && (
        <StoryProgress
          visitorName={visitorName}
          onChangeName={handleChangeName}
          onReplay={handleReplay}
          scrollProgress={scrollProgress}
        />
      )}

      {/* Name entry modal (Scene 1) */}
      <NameModal
        isOpen={isNameModalOpen}
        onSubmitName={handleNameSubmit}
      />

      {/* Main Story Flow (Visible immediately once name is known) */}
      {!isNameModalOpen && visitorName && (
        <main key={replayKey} className="relative z-10 w-full overflow-hidden">
          {/* Scene 2: Personalized Introduction */}
          <HeroScene visitorName={visitorName} />

          {/* Scene 3: First Photo Reveal */}
          <PhotoScene1 photo={STORY_CONFIG.photos.photo1} />

          {/* Scene 4: Why This Website Exists */}
          <WhyExistsScene />

          {/* Scene 5: Personalized Thank-You */}
          <PersonalThankYouScene visitorName={visitorName} />

          {/* Scene 6: Interactive Thank-You Button */}
          <InteractiveThankYouScene />

          {/* Scene 7: Smile Meter */}
          <SmileMeterScene />

          {/* Scene 8: Personal Photo Moment */}
          <PhotoScene2 photo={STORY_CONFIG.photos.photo2} visitorName={visitorName} />

          {/* Scene 9: Playful Break */}
          <PlayfulBreakScene />

          {/* Scene 10: Digital Gift */}
          <DigitalGiftScene />

          {/* Scene 11: Easter Egg (Secret mysterious star) */}
          <EasterEgg />

          {/* Scene 12: Personalized Surprise */}
          <PersonalizedSurpriseScene visitorName={visitorName} />

          {/* Scene 13: Final Photo */}
          <PhotoScene3 photo={STORY_CONFIG.photos.photo3} visitorName={visitorName} />

          {/* Scene 14: Final Thank-You & Controls */}
          <FinalScene
            visitorName={visitorName}
            onReplay={handleReplay}
            onChangeName={handleChangeName}
          />
        </main>
      )}
    </div>
  );
}
