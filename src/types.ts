export interface PhotoConfig {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  section: string;
  focalPosition: string; // e.g., 'center', '50% 30%', 'top center'
  aspectRatio?: string;
}

export interface StoryConfig {
  authorName: string;
  photos: {
    photo1: PhotoConfig;
    photo2: PhotoConfig;
    photo3: PhotoConfig;
  };
  messages: {
    heroGreeting: string;
    whyExists: string[];
    thankYouHeading: string;
    thankYouBody: string[];
    smileQuestion: string;
    photo2Reflection: string[];
    digitalGiftContent: {
      tag: string;
      title: string;
      body: string[];
      footnote: string;
    };
    finalReflection: string[];
    footerNote: string;
  };
}

export interface VisitorState {
  name: string;
  isEntered: boolean;
  hasOfficialThankYouClicked: boolean;
  smileLevel: number;
  isEmotionalFixed: boolean;
  isGiftOpened: boolean;
  isEasterEggFound: boolean;
  soundEnabled: boolean;
}
