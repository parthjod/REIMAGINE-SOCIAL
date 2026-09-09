// src/lib/ambientAudio.ts
// Pure client-side Web Audio API soundscape synthesizer

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private currentMode: 'hearth' | 'rain' | 'twilight' | 'chimes' | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private activeNodes: (AudioNode | number)[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        Math.max(0, Math.min(val, 1)),
        this.ctx.currentTime,
        0.05,
      );
    }
  }

  public stop() {
    if (!this.isPlaying) return;
    this.activeNodes.forEach((node) => {
      if (typeof node === 'number') {
        window.clearInterval(node);
      } else {
        try {
          if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
            (node as AudioScheduledSourceNode).stop();
          }
          node.disconnect();
        } catch {
          // ignore already stopped nodes
        }
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
    this.currentMode = null;
  }

  public play(mode: 'hearth' | 'rain' | 'twilight' | 'chimes') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.isPlaying && this.currentMode === mode) {
      this.stop();
      return;
    }

    this.stop();
    this.isPlaying = true;
    this.currentMode = mode;

    switch (mode) {
      case 'rain':
        this.startRain();
        break;
      case 'hearth':
        this.startHearth();
        break;
      case 'twilight':
        this.startTwilight();
        break;
      case 'chimes':
        this.startChimes();
        break;
    }
  }

  private startRain() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0,
      b1 = 0,
      b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.11;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();
    this.activeNodes.push(whiteNoise, filter, gain);
  }

  private startHearth() {
    if (!this.ctx || !this.masterGain) return;
    // Low rumble
    const rumble = this.ctx.createOscillator();
    rumble.type = 'triangle';
    rumble.frequency.setValueAtTime(55, this.ctx.currentTime);

    const rumbleGain = this.ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    rumble.connect(rumbleGain);
    rumbleGain.connect(this.masterGain);
    rumble.start();
    this.activeNodes.push(rumble, rumbleGain);

    // Crackle impulses
    const interval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain) return;
      if (Math.random() > 0.4) {
        const crackle = this.ctx.createOscillator();
        const crackleGain = this.ctx.createGain();
        crackle.type = 'square';
        crackle.frequency.setValueAtTime(1200 + Math.random() * 2400, this.ctx.currentTime);
        crackleGain.gain.setValueAtTime(0.08 + Math.random() * 0.1, this.ctx.currentTime);
        crackleGain.gain.exponentialRampToValueAtTime(
          0.0001,
          this.ctx.currentTime + 0.03 + Math.random() * 0.04,
        );
        crackle.connect(crackleGain);
        crackleGain.connect(this.masterGain);
        crackle.start();
        crackle.stop(this.ctx.currentTime + 0.08);
      }
    }, 90);
    this.activeNodes.push(interval);
  }

  private startTwilight() {
    if (!this.ctx || !this.masterGain) return;
    // Harmonic warm drone: Root 110Hz (A2), Fifth 165Hz (E3), Ninth 247.5Hz (B3)
    const freqs = [110, 164.8, 220, 277.2];
    freqs.forEach((f, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.12 / (idx + 1), this.ctx.currentTime);

      // Gentle LFO wobble
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15 + idx * 0.05, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      this.activeNodes.push(osc, gain, lfo, lfoGain);
    });
  }

  private startChimes() {
    if (!this.ctx || !this.masterGain) return;
    const pentatonic = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
    const chimeTimer = window.setInterval(() => {
      if (!this.ctx || !this.masterGain) return;
      if (Math.random() > 0.45) {
        const note = pentatonic[Math.floor(Math.random() * pentatonic.length)] ?? 523.25;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.8);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + 3.0);
      }
    }, 1200);
    this.activeNodes.push(chimeTimer);
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentMode: this.currentMode,
    };
  }
}

export const soundscape = new SoundscapeEngine();
