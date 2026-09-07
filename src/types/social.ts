// src/types/social.ts

export type ResonanceType = 'perspective' | 'grounding' | 'spark' | 'humanity';

export interface ResonanceInfo {
  id: ResonanceType;
  label: string;
  hindiLabel: string;
  icon: string;
  description: string;
  color: string;
}

export const RESONANCE_TYPES: Record<ResonanceType, ResonanceInfo> = {
  perspective: {
    id: 'perspective',
    label: 'Perspective Shift',
    hindiLabel: 'दृष्टिकोण परिवर्तन',
    icon: '🌌',
    description: 'Expanded how I see the world or questioned a default belief.',
    color: '#38bdf8',
  },
  grounding: {
    id: 'grounding',
    label: 'Grounding Calm',
    hindiLabel: 'शांति और ठहराव',
    icon: '🌿',
    description: 'Brought stillness, clarity, and breath to my day.',
    color: '#34d399',
  },
  spark: {
    id: 'spark',
    label: 'Creative Spark',
    hindiLabel: 'रचनात्मक प्रेरणा',
    icon: '⚡',
    description: 'Catalyzed a new idea, question, or desire to create.',
    color: '#fbbf24',
  },
  humanity: {
    id: 'humanity',
    label: 'Shared Humanity',
    hindiLabel: 'साझा आत्मीयता',
    icon: '🫂',
    description: 'Made me feel seen, less alone, and deeply understood.',
    color: '#f43f5e',
  },
};

export type IntentionTag =
  | 'Deep Reflection'
  | 'Creative Spark'
  | 'Quiet Observation'
  | 'Unfiltered Life'
  | 'Philosophical'
  | 'Poetic';

export interface PostAuthor {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  city: string;
  constellation: string;
}

export interface EpochPost {
  id: string;
  author: PostAuthor;
  timestamp: string;
  promptAnchor: string;
  text: string;
  image?: string;
  quote?: string;
  intention: IntentionTag;
  resonances: Record<ResonanceType, number>;
  userResonances: ResonanceType[];
}

export interface DailyEpoch {
  id: string;
  dateStr: string;
  epochNumber: number;
  themeTitle: string;
  hindiThemeTitle: string;
  prompt: string;
  hindiPrompt: string;
  curatorNote: string;
  posts: EpochPost[];
}

export interface ConstellationNode {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  bio: string;
  city: string;
  cluster: string;
  x: number; // 0 - 100 percentage
  y: number; // 0 - 100 percentage
  connections: string[]; // Node IDs
  frequencies: string[];
  recentThought: string;
  auraColor: string;
  resonanceTotal: number;
}

export interface CampfireThought {
  id: string;
  author: string;
  location: string;
  text: string;
  timeAgo: string;
  vibe: string;
  glowColor: string;
}

export interface AmbientSoundtrack {
  id: 'hearth' | 'rain' | 'twilight' | 'chimes';
  name: string;
  icon: string;
  description: string;
}

export interface SlowLetter {
  id: string;
  sender: PostAuthor;
  recipientName: string;
  subject: string;
  body: string;
  sealColor: string;
  sentTime: string;
  deliveryTime: string;
  isDelivered: boolean;
  isOpened: boolean;
  reflectionPrompt: string;
}

export interface EscapeMetrics {
  doomscrollHoursSaved: number;
  mindfulIntentionScore: number; // 0 - 100
  deepConnectionsFormed: number;
  quietMinutesInPresence: number;
  resonanceGiven: number;
  epochsCompleted: number;
}
