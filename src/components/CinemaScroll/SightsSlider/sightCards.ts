import type { ComponentType } from 'react';
import { IconEpoch, IconResonance, IconCampfire, IconConstellation, IconSlowLetter } from './icons';

export interface SightCardData {
  ariaLabel: string;
  kicker: string;
  heading: string;
  body: string;
  Icon: ComponentType;
}

export const SIGHT_CARDS: SightCardData[] = [
  {
    ariaLabel: 'Open Finite Epochs card',
    kicker: 'Anti-Doomscroll',
    heading: 'Finite Epochs',
    body: 'A bounded daily stream with a clear horizon. When today is explored, you are caught up and free.',
    Icon: IconEpoch,
  },
  {
    ariaLabel: 'Open Qualitative Resonance card',
    kicker: 'Beyond The Like Button',
    heading: 'Deep Resonance',
    body: 'Four meaningful dimensions of human connection: Perspective, Grounding, Spark, and Shared Humanity.',
    Icon: IconResonance,
  },
  {
    ariaLabel: 'Open Synchronous Campfire card',
    kicker: 'Live Co-Presence',
    heading: 'The Campfire',
    body: 'Gather in real-time with ambient procedural soundscapes and ephemeral thought ripples without surveillance.',
    Icon: IconCampfire,
  },
  {
    ariaLabel: 'Open Constellations card',
    kicker: 'Spatial Human Map',
    heading: 'Constellations',
    body: 'Discover kindred minds connected through shared curiosities and crafts, not follower follower counts.',
    Icon: IconConstellation,
  },
  {
    ariaLabel: 'Open Slow Letters card',
    kicker: 'Epistolary Depth',
    heading: 'Slow Letters',
    body: 'Deliberate letters sealed with wax and delivered at golden hour (Dawn or Dusk) to restore genuine correspondence.',
    Icon: IconSlowLetter,
  },
];
