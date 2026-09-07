// src/data/mockCampfire.ts
import type { CampfireThought, AmbientSoundtrack } from '../types/social';

export const AMBIENT_SOUNDS: AmbientSoundtrack[] = [
  {
    id: 'hearth',
    name: 'Cedar Fireplace',
    icon: '🔥',
    description: 'Warm, low wood crackle & gentle embers',
  },
  {
    id: 'rain',
    name: 'Rain on Moss',
    icon: '🌧️',
    description: 'Soothing pink-noise rain on cedar leaves',
  },
  {
    id: 'twilight',
    name: 'Twilight Waves',
    icon: '🌊',
    description: 'Rhythmic oceanic swells under a night sky',
  },
  {
    id: 'chimes',
    name: 'Temple Wind Chimes',
    icon: '🎐',
    description: 'Harmonic bronze resonance in mountain wind',
  },
];

export const INITIAL_CAMPFIRE_THOUGHTS: CampfireThought[] = [
  {
    id: 'spark-1',
    author: 'Miriam',
    location: 'Oslo',
    text: 'Watching tea steam rise against the blue evening window. No thoughts needed.',
    timeAgo: 'Just now',
    vibe: 'Stillness',
    glowColor: '#38bdf8',
  },
  {
    id: 'spark-2',
    author: 'Kenji',
    location: 'Kyoto',
    text: 'Finished carving a wooden spoon. My hands smell like walnut oil.',
    timeAgo: '1m ago',
    vibe: 'Craft',
    glowColor: '#fbbf24',
  },
  {
    id: 'spark-3',
    author: 'Zoya',
    location: 'Shimla',
    text: 'Fog has completely swallowed the pine valley. Grateful for this quiet heater.',
    timeAgo: '2m ago',
    vibe: 'Presence',
    glowColor: '#34d399',
  },
  {
    id: 'spark-4',
    author: 'Mateo',
    location: 'Bogotá',
    text: 'Closed my laptop for the night. The silence in the room feels like drinking clean water.',
    timeAgo: '4m ago',
    vibe: 'Freedom',
    glowColor: '#f43f5e',
  },
  {
    id: 'spark-5',
    author: 'Aanya',
    location: 'Jaipur',
    text: 'Sitting on the rooftop listening to dusk pigeons settling in the archways.',
    timeAgo: '5m ago',
    vibe: 'Peace',
    glowColor: '#a78bfa',
  },
];
