/**
 * Attitude & Swagger Beat Audio Engine
 * Pure Web Audio API synthesis - no external audio files required.
 * Generates an upbeat, stylish, punchy hip-hop/trap groove with 808 kick,
 * crisp snare, rolling hi-hats, and an attitude bassline.
 */

class AttitudeAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private tempo: number = 98; // 98 BPM attitude bounce
  private stepDuration: number = (60 / 98) / 4; // 16th note

  // Bass notes for attitude groove (E minor swagger)
  // E1, G1, A1, B1, D2
  private bassNotes = [41.2, 49.0, 55.0, 61.74, 73.42];

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getSoundState(): boolean {
    return this.isPlaying;
  }

  public toggleSound(forceState?: boolean): boolean {
    this.initContext();
    const target = forceState !== undefined ? forceState : !this.isPlaying;

    if (target) {
      this.startBeat();
    } else {
      this.stopBeat();
    }
    return this.isPlaying;
  }

  public startBeat() {
    this.initContext();
    if (this.isPlaying || !this.ctx) return;
    this.isPlaying = true;
    this.currentStep = 0;

    const intervalMs = this.stepDuration * 1000;
    this.timerId = window.setInterval(() => {
      this.step();
    }, intervalMs);
  }

  public stopBeat() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private step() {
    if (!this.ctx || !this.isPlaying) return;
    const step = this.currentStep % 16;
    const time = this.ctx.currentTime;

    // 1. Kick Pattern (808 Boom)
    // Steps: 0, 6, 8, 11
    if (step === 0 || step === 6 || step === 8 || step === 11) {
      this.playKick(time);
    }

    // 2. Snare / Clap Pattern (Punchy on beats 4 & 12)
    if (step === 4 || step === 12) {
      this.playSnare(time);
    }

    // 3. Hi-Hat Pattern (Rolling trap style)
    if (step % 2 === 0 || step === 7 || step === 14 || step === 15) {
      const velocity = step % 4 === 0 ? 0.08 : 0.04;
      this.playHiHat(time, velocity);
    }

    // 4. Attitude Bassline (E minor groove)
    if (step === 0) this.playBass(time, this.bassNotes[0], 0.35);
    if (step === 3) this.playBass(time, this.bassNotes[1], 0.2);
    if (step === 6) this.playBass(time, this.bassNotes[2], 0.25);
    if (step === 8) this.playBass(time, this.bassNotes[0], 0.35);
    if (step === 11) this.playBass(time, this.bassNotes[3], 0.2);
    if (step === 14) this.playBass(time, this.bassNotes[4], 0.25);

    // 5. Catchy Attitude Synth Stabs
    if (step === 2 || step === 6 || step === 10 || step === 14) {
      const notes = [329.63, 392.0, 440.0, 493.88];
      const pitch = notes[(step / 2) % notes.length];
      this.playSynthStab(time, pitch);
    }

    this.currentStep++;
  }

  // 808 Kick Drum with pitch drop
  private playKick(time: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);

    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.25);
  }

  // Crisp Snare Drum with noise + tone
  private playSnare(time: number) {
    if (!this.ctx) return;

    // Noise component
    const bufferSize = this.ctx.sampleRate * 0.12;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, time);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    // Body tone
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.frequency.setValueAtTime(220, time);
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.08);

    oscGain.gain.setValueAtTime(0.18, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);

    noise.start(time);
    osc.start(time);
    noise.stop(time + 0.15);
    osc.stop(time + 0.08);
  }

  // Rolling Metallic Hi-Hat
  private playHiHat(time: number, vol: number) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7500, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(time);
    noise.stop(time + 0.04);
  }

  // Deep Attitude 808 Bass
  private playBass(time: number, freq: number, duration: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, time);
    filter.frequency.exponentialRampToValueAtTime(120, time + duration);

    gain.gain.setValueAtTime(0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Catchy Synth Stabs
  private playSynthStab(time: number, freq: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, time);

    gain.gain.setValueAtTime(0.09, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.18);
  }

  public playPunchyStinger() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.playKick(now);
    this.playSnare(now + 0.1);
  }
}

export const audioEngine = new AttitudeAudioEngine();
