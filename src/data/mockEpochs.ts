// src/data/mockEpochs.ts
import type { DailyEpoch } from '../types/social';

export const TODAY_EPOCH: DailyEpoch = {
  id: 'epoch-142',
  dateStr: 'September 7, 2026',
  epochNumber: 142,
  themeTitle: 'The Dignity of Quiet Failure',
  hindiThemeTitle: 'मौन असफलता की गरिमा',
  prompt:
    'What is something you learned today by failing quietly, away from the performance of success?',
  hindiPrompt: 'आज आपने किसी दिखावे के बिना, चुपचाप असफल होकर क्या नया सीखा?',
  curatorNote:
    'Today’s epoch rejects the hustle brag. We gather around the things that fell apart softly and gave us back our breath.',
  posts: [
    {
      id: 'post-1',
      author: {
        id: 'user-elena',
        name: 'Elena Rostova',
        handle: '@elena.arch',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'Spatial Designer & Potter',
        city: 'Kyoto / Berlin',
        constellation: 'Atmospheres & Light',
      },
      timestamp: '2 hours ago',
      promptAnchor: 'A tea bowl that collapsed on the wheel',
      text: 'I spent 4 hours trying to throw a tall stoneware vase with clay that was too wet. At 3:15 PM it slumped into a wet, folded ruin. In the old days I would have felt the sting of wasted time or looked for an aesthetic angle to photograph it. Instead, I just put my hands in warm water and listened to the rain outside. The clay will be wedged and reborn tomorrow. Not everything needs an audience.',
      quote: 'The clay forgives what the ego resists.',
      intention: 'Quiet Observation',
      resonances: {
        perspective: 42,
        grounding: 98,
        spark: 19,
        humanity: 73,
      },
      userResonances: ['grounding'],
    },
    {
      id: 'post-2',
      author: {
        id: 'user-arjun',
        name: 'Arjun Mehta',
        handle: '@arjun.slow',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        role: 'Sound Archivist & Essayist',
        city: 'Bengaluru',
        constellation: 'Acoustic Ecologies',
      },
      timestamp: '3 hours ago',
      promptAnchor: 'A song I tried recording for 6 weeks',
      text: 'I’ve been obsessed with capturing the acoustic reverb of an empty stairwell near MG Road at midnight. Last night my recorder glitched and clipped the entire 40-minute tape into harsh white noise. I walked back home empty-handed in the warm drizzle. Walking without having to show a result felt like walking for the first time in months. The stairwell didn’t care that my microphone failed; it just sang to the night anyway.',
      intention: 'Deep Reflection',
      resonances: {
        perspective: 84,
        grounding: 61,
        spark: 38,
        humanity: 92,
      },
      userResonances: ['perspective', 'humanity'],
    },
    {
      id: 'post-3',
      author: {
        id: 'user-saoirse',
        name: 'Saoirse Chen',
        handle: '@saoirse.film',
        avatar:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        role: 'Analog Cinematographer',
        city: 'Taipei / Vancouver',
        constellation: 'Slow Visuals',
      },
      timestamp: '5 hours ago',
      promptAnchor: 'Overexposed 35mm roll from dawn',
      text: 'Accidentally left the shutter dial on Bulb while photographing dawn fishermen at Tamsui. An entire roll came back milky white. But looking at the negatives held against the sunlight, there were faint ghost silhouettes—like memories fading in mist. It taught me that precision is a tool, but accident is where the mystery lives.',
      intention: 'Creative Spark',
      resonances: {
        perspective: 67,
        grounding: 45,
        spark: 112,
        humanity: 34,
      },
      userResonances: ['spark'],
    },
    {
      id: 'post-4',
      author: {
        id: 'user-dev',
        name: 'Devansh Verma',
        handle: '@dev.verma',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        role: 'Philosopher & Mountain Guide',
        city: 'Manali',
        constellation: 'Wilderness & Solitude',
      },
      timestamp: '6 hours ago',
      promptAnchor: 'Turning back 200m before the ridge',
      text: 'We were 200 meters below the ridge when the clouds lowered with black hail. The old social media reflex whispered: "Push for the summit photo, you promised an update." But the mountain has no feeds. We turned back, shared a thermos of ginger tea under a rock shelf, and watched snow geese drift across the valley. It was the best decision of my summer.',
      quote: 'Summits are arbitrary points; survival and wonder are the real ascent.',
      intention: 'Philosophical',
      resonances: {
        perspective: 95,
        grounding: 88,
        spark: 24,
        humanity: 81,
      },
      userResonances: [],
    },
    {
      id: 'post-5',
      author: {
        id: 'user-mariana',
        name: 'Mariana Silva',
        handle: '@mariana.ink',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        role: 'Poet & Translator',
        city: 'Lisbon',
        constellation: 'Poetics of Everyday',
      },
      timestamp: '7 hours ago',
      promptAnchor: 'An untranslatable word from Portuguese',
      text: 'Spent the morning failing to translate "desassossego" into English for a workshop. Every dictionary word felt stiff and plastic. Finally gave up, made espresso, and read the sentence out loud to a friend who doesn’t speak Portuguese. She said, "I don’t know what the word means, but your voice sounds like rain hitting a windowpane." Sometimes understanding happens under the words.',
      intention: 'Poetic',
      resonances: {
        perspective: 53,
        grounding: 77,
        spark: 69,
        humanity: 104,
      },
      userResonances: ['humanity'],
    },
    {
      id: 'post-6',
      author: {
        id: 'user-kian',
        name: 'Kian Thorne',
        handle: '@kian.bread',
        avatar:
          'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        role: 'Wild Sourdough Baker',
        city: 'Edinburgh',
        constellation: 'Slow Crafts',
      },
      timestamp: '9 hours ago',
      promptAnchor: 'A collapsed rye loaf in the hearth',
      text: 'Over-proofed the rye loaf because I fell asleep reading Mary Oliver. It baked flat as a stone. Crushed it with toasted hazelnuts and honey for dessert instead. The kitchen smelled like caramel and warm grain. Perfection is an algorithm’s idea of life; humans thrive on delicious accidents.',
      intention: 'Unfiltered Life',
      resonances: {
        perspective: 39,
        grounding: 84,
        spark: 52,
        humanity: 63,
      },
      userResonances: [],
    },
  ],
};
