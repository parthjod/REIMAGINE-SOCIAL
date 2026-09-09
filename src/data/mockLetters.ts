// src/data/mockLetters.ts
import type { SlowLetter } from '../types/social';

export const INITIAL_LETTERS: SlowLetter[] = [
  {
    id: 'letter-1',
    sender: {
      id: 'user-mariana',
      name: 'Mariana Silva',
      handle: '@mariana.ink',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      role: 'Poet & Translator',
      city: 'Lisbon',
      constellation: 'Poetics of Everyday',
    },
    recipientName: 'You',
    subject: 'On learning to look at things that do not move',
    body: `Dear traveler,

I am writing this as the Atlantic fog wraps around the tram tracks of Alfama. I wanted to send you something unhurried. 

Yesterday I spent an entire hour simply observing an old stucco wall whose paint has peeled away in layers over seventy years: ochre, terracotta, chalk white, and bare stone. It reminded me how modern screens train us to crave constant flicker, as if stillness were death. But the wall was completely alive, holding decades of Atlantic rain and morning salt.

May your evening have that same quiet endurance. Do not let the rush convince you that only rapid things have value.

Yours in slow resonance,
Mariana`,
    sealColor: '#f43f5e',
    sentTime: 'Yesterday at Dusk (19:42)',
    deliveryTime: 'Delivered at Sunrise (06:14)',
    isDelivered: true,
    isOpened: false,
    reflectionPrompt: 'What is a quiet, unmoving thing you noticed today?',
  },
  {
    id: 'letter-2',
    sender: {
      id: 'user-arjun',
      name: 'Arjun Mehta',
      handle: '@arjun.slow',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Sound Archivist',
      city: 'Bengaluru',
      constellation: 'Acoustic Ecologies',
    },
    recipientName: 'You',
    subject: 'The sound before thunder in the Western Ghats',
    body: `Friend,

Before monsoon clouds break over the canopy in Agumbe, there is a distinct silence of three minutes where cicadas stop, tree frogs pause, and the air cools by five degrees. 

I’m packaging that acoustic silence in this note. When you feel overwhelmed by the feeds and the notifications, imagine sitting under that broad wet teak leaf waiting for the first drops.

Breathe gently,
Arjun`,
    sealColor: '#34d399',
    sentTime: 'Today at Dawn (05:48)',
    deliveryTime: 'Arriving at Sunset (18:30)',
    isDelivered: false,
    isOpened: false,
    reflectionPrompt: 'When was the last time you paused to listen to the weather change?',
  },
];
