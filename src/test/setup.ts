// src/test/setup.ts
import '@testing-library/jest-dom';
import '../i18n';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock window.scrollTo
window.scrollTo = () => {};

// Mock Web Audio API for jsdom environment
class MockAudioContext {
  createGain = () => ({
    connect: () => {},
    disconnect: () => {},
    gain: { value: 1, setValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
  });
  createBiquadFilter = () => ({
    connect: () => {},
    disconnect: () => {},
    frequency: { setValueAtTime: () => {} },
    Q: { setValueAtTime: () => {} },
  });
  createBufferSource = () => ({
    connect: () => {},
    disconnect: () => {},
    start: () => {},
    stop: () => {},
  });
  createOscillator = () => ({
    connect: () => {},
    disconnect: () => {},
    start: () => {},
    stop: () => {},
    frequency: { setValueAtTime: () => {} },
  });
  createBuffer = () => ({
    getChannelData: () => new Float32Array(256),
  });
  destination = {};
  currentTime = 0;
  sampleRate = 44100;
  close = async () => {};
}

// @ts-expect-error mock window.AudioContext for jsdom test suite
window.AudioContext = MockAudioContext;
// @ts-expect-error mock window.webkitAudioContext for jsdom test suite
window.webkitAudioContext = MockAudioContext;
