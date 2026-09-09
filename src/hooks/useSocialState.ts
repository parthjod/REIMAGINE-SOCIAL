// src/hooks/useSocialState.ts
import { useState, useEffect } from 'react';
import type {
  DailyEpoch,
  EpochPost,
  ResonanceType,
  CampfireThought,
  SlowLetter,
  EscapeMetrics,
  ConstellationNode,
  IntentionTag,
} from '../types/social';
import { TODAY_EPOCH } from '../data/mockEpochs';
import { INITIAL_CAMPFIRE_THOUGHTS } from '../data/mockCampfire';
import { INITIAL_LETTERS } from '../data/mockLetters';
import { MOCK_CONSTELLATIONS } from '../data/mockConstellations';
import { soundscape } from '../lib/ambientAudio';
import { safeJsonParse } from '../lib/sanitize';

const STORAGE_KEYS = {
  EPOCH: 'pause_social_epoch_v1',
  CAMPFIRE: 'pause_social_campfire_v1',
  LETTERS: 'pause_social_letters_v1',
  STATS: 'pause_social_stats_v1',
};

const DEFAULT_STATS: EscapeMetrics = {
  doomscrollHoursSaved: 3.4,
  mindfulIntentionScore: 94,
  deepConnectionsFormed: 18,
  quietMinutesInPresence: 48,
  resonanceGiven: 14,
  epochsCompleted: 12,
};

export type SocialTab = 'epoch' | 'campfire' | 'constellation' | 'letters' | 'radar' | 'manifesto';

export function useSocialState() {
  const [activeTab, setActiveTab] = useState<SocialTab>('epoch');

  // Epoch State with schema protection
  const [epoch, setEpoch] = useState<DailyEpoch>(() => {
    return safeJsonParse<DailyEpoch>(
      localStorage.getItem(STORAGE_KEYS.EPOCH),
      TODAY_EPOCH,
      (val) => Boolean(val && typeof val === 'object' && 'posts' in (val as DailyEpoch))
    );
  });

  const [isEpochCaughtUp, setIsEpochCaughtUp] = useState(false);

  // Campfire State
  const [campfireThoughts, setCampfireThoughts] = useState<CampfireThought[]>(() => {
    return safeJsonParse<CampfireThought[]>(
      localStorage.getItem(STORAGE_KEYS.CAMPFIRE),
      INITIAL_CAMPFIRE_THOUGHTS,
      (val) => Array.isArray(val)
    );
  });

  const [activeSound, setActiveSound] = useState<'hearth' | 'rain' | 'twilight' | 'chimes' | null>(null);
  const [soundVolume, setSoundVolume] = useState<number>(0.35);

  // Constellation State
  const [nodes] = useState<ConstellationNode[]>(MOCK_CONSTELLATIONS);
  const [selectedNode, setSelectedNode] = useState<ConstellationNode | null>(null);

  // Letters State
  const [letters, setLetters] = useState<SlowLetter[]>(() => {
    return safeJsonParse<SlowLetter[]>(
      localStorage.getItem(STORAGE_KEYS.LETTERS),
      INITIAL_LETTERS,
      (val) => Array.isArray(val)
    );
  });

  // Escape Stats
  const [stats, setStats] = useState<EscapeMetrics>(() => {
    return safeJsonParse<EscapeMetrics>(
      localStorage.getItem(STORAGE_KEYS.STATS),
      DEFAULT_STATS,
      (val) => Boolean(val && typeof val === 'object')
    );
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EPOCH, JSON.stringify(epoch));
      localStorage.setItem(STORAGE_KEYS.CAMPFIRE, JSON.stringify(campfireThoughts));
      localStorage.setItem(STORAGE_KEYS.LETTERS, JSON.stringify(letters));
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch {
      // ignore storage quota errors
    }
  }, [epoch, campfireThoughts, letters, stats]);

  // Audio Handler
  const toggleSound = (mode: 'hearth' | 'rain' | 'twilight' | 'chimes') => {
    if (activeSound === mode) {
      soundscape.stop();
      setActiveSound(null);
    } else {
      soundscape.play(mode);
      soundscape.setVolume(soundVolume);
      setActiveSound(mode);
    }
  };

  const updateVolume = (vol: number) => {
    setSoundVolume(vol);
    soundscape.setVolume(vol);
  };

  // Toggle Resonance on a Post
  const toggleResonance = (postId: string, type: ResonanceType) => {
    setEpoch((prev) => {
      const updatedPosts = prev.posts.map((p) => {
        if (p.id !== postId) return p;
        const alreadyResonated = p.userResonances.includes(type);
        const nextUserResonances = alreadyResonated
          ? p.userResonances.filter((r) => r !== type)
          : [...p.userResonances, type];

        const delta = alreadyResonated ? -1 : 1;
        return {
          ...p,
          userResonances: nextUserResonances,
          resonances: {
            ...p.resonances,
            [type]: Math.max(0, p.resonances[type] + delta),
          },
        };
      });
      return { ...prev, posts: updatedPosts };
    });

    setStats((prev) => ({
      ...prev,
      resonanceGiven: prev.resonanceGiven + 1,
      mindfulIntentionScore: Math.min(100, prev.mindfulIntentionScore + 1),
    }));
  };

  // Add new Post to Epoch
  const addPost = (text: string, intention: IntentionTag, promptAnchor: string) => {
    const newPost: EpochPost = {
      id: `post-${Date.now()}`,
      author: {
        id: 'user-self',
        name: 'You (Human Presence)',
        handle: '@you.presence',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        role: 'Intentional Seeker',
        city: 'Present Realm',
        constellation: 'Atmospheres & Light',
      },
      timestamp: 'Just now',
      promptAnchor: promptAnchor || 'Daily reflection',
      text,
      intention,
      resonances: {
        perspective: 1,
        grounding: 1,
        spark: 0,
        humanity: 2,
      },
      userResonances: ['humanity'],
    };

    setEpoch((prev) => ({
      ...prev,
      posts: [newPost, ...prev.posts],
    }));

    setStats((prev) => ({
      ...prev,
      deepConnectionsFormed: prev.deepConnectionsFormed + 1,
      mindfulIntentionScore: Math.min(100, prev.mindfulIntentionScore + 2),
    }));
  };

  // Add Campfire Thought
  const addCampfireThought = (text: string, vibe: string) => {
    const newThought: CampfireThought = {
      id: `spark-${Date.now()}`,
      author: 'You',
      location: 'Here & Now',
      text,
      timeAgo: 'Just now',
      vibe: vibe || 'Warmth',
      glowColor: '#38bdf8',
    };

    setCampfireThoughts((prev) => [newThought, ...prev.slice(0, 8)]);
    setStats((prev) => ({
      ...prev,
      quietMinutesInPresence: prev.quietMinutesInPresence + 5,
    }));
  };

  // Send Slow Letter
  const sendLetter = (recipientName: string, subject: string, body: string, reflectionPrompt: string) => {
    const newLetter: SlowLetter = {
      id: `letter-${Date.now()}`,
      sender: {
        id: 'user-self',
        name: 'You',
        handle: '@you.presence',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        role: 'Intentional Correspondent',
        city: 'Here',
        constellation: 'Poetics of Everyday',
      },
      recipientName,
      subject,
      body,
      sealColor: '#fbbf24',
      sentTime: 'Just now (Sunset Seal)',
      deliveryTime: 'Delivering at Dawn (06:00)',
      isDelivered: false,
      isOpened: false,
      reflectionPrompt: reflectionPrompt || 'A quiet thought sent with care.',
    };

    setLetters((prev) => [newLetter, ...prev]);
    setStats((prev) => ({
      ...prev,
      deepConnectionsFormed: prev.deepConnectionsFormed + 1,
      doomscrollHoursSaved: +(prev.doomscrollHoursSaved + 0.3).toFixed(1),
    }));
  };

  const openLetter = (id: string) => {
    setLetters((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isOpened: true } : l))
    );
  };

  return {
    activeTab,
    setActiveTab,
    epoch,
    isEpochCaughtUp,
    setIsEpochCaughtUp,
    toggleResonance,
    addPost,
    campfireThoughts,
    addCampfireThought,
    activeSound,
    soundVolume,
    toggleSound,
    updateVolume,
    nodes,
    selectedNode,
    setSelectedNode,
    letters,
    sendLetter,
    openLetter,
    stats,
  };
}
