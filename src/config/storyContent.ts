import { StoryConfig } from '../types';

/**
 * ==============================================================================
 * PERSONAL STORY CONFIGURATION
 * ==============================================================================
 * You can easily customize your photographs, messages, captions, and text here
 * without modifying any animation or layout code.
 *
 * To use your own personal photographs:
 * 1. Place your images in `/public/photos/` (e.g. `photo01.jpg`, `photo02.jpg`, `photo03.jpg`)
 * 2. Update the `src` paths below to `/photos/photo01.jpg`, etc.
 * 3. Adjust `focalPosition` if needed (e.g., '50% 30%' to focus on eyes/face).
 * ==============================================================================
 */

export const STORY_CONFIG: StoryConfig = {
  authorName: "Rahul", // Your name as the birthday celebrant

  photos: {
    // Scene 3: First Photo Reveal ("Where's the fun in that?")
    photo1: {
      id: "photo-01",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop",
      alt: "Candid moment with a warm smile",
      caption: "Circa today: surviving another year around the sun.",
      section: "scene-3-reveal",
      focalPosition: "50% 35%",
    },

    // Scene 8: Personal Photo Moment ("Not because you expect them to...")
    photo2: {
      id: "photo-02",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop",
      alt: "Quiet candid moment looking into the evening light",
      caption: "Quiet gratitude for the people who show up.",
      section: "scene-8-reflection",
      focalPosition: "50% 30%",
    },

    // Scene 13: Final Photo ("Somewhere, someone is glad you stopped by")
    photo3: {
      id: "photo-03",
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600&auto=format&fit=crop",
      alt: "Soft evening light and a peaceful smile",
      caption: "Here is to another orbit.",
      section: "scene-13-final",
      focalPosition: "50% 40%",
    },
  },

  messages: {
    heroGreeting: "You wished me on my birthday...",

    whyExists: [
      "I received a bunch of birthday wishes today.",
      "Some were long.",
      "Some were just... Happy Birthday 🎂",
      "Some arrived at midnight.",
      "Some arrived much later.",
      "But every single one made my day a little better.",
      "So instead of sending the same generic reply...",
      "I made this."
    ],

    thankYouHeading: "Thank you for taking a moment to wish me.",
    thankYouBody: [
      "You probably sent a message that took you less than a minute.",
      "It was a quick notification in the middle of your busy day.",
      "But it still made its way to me.",
      "That counts.",
      "More than you think. ❤️"
    ],

    smileQuestion: "How much did your birthday wish make me smile?",

    photo2Reflection: [
      "There's something funny about birthdays.",
      "You start noticing the people who remembered.",
      "Not because you expect them to...",
      "But because they didn't have to."
    ],

    digitalGiftContent: {
      tag: "UNLOCKED REWARD",
      title: "Your Official Birthday Reward",
      body: [
        "You officially made my birthday a little better.",
        "That's literally it.",
        "No promo codes. No subscription. No NFT."
      ],
      footnote: "Just 100% pure, unfiltered gratitude. 😂❤️"
    },

    finalReflection: [
      "Thank you for remembering me today.",
      "I hope you have a genuinely good day too.",
      "And if today ever gets a little noisy...",
      "remember that somewhere, someone is glad you stopped by."
    ],

    footerNote: "Made with slightly unnecessary amounts of code. 💻❤️"
  }
};
