import { STATE } from "./state.js";

export const AudioSys = {
  ctx: null,
  init() {
    if (!this.ctx)
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  },
  play(freq, type, dur, vol = 0.05) {
    if (!STATE.settings.audio) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + dur);
  },

  success() {
    this.play(800, "square", 0.1, 0.05);
    setTimeout(() => this.play(1200, "square", 0.2, 0.05), 100);
  },
  hit() {
    this.play(150, "sawtooth", 0.1, 0.1);
    setTimeout(() => this.play(100, "sawtooth", 0.2, 0.1), 50);
  },
  blip() {
    this.play(600, "square", 0.05, 0.05);
  },

  levelUp() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => setTimeout(() => this.play(f, "square", 0.25, 0.07), i * 110));
    setTimeout(() => {
      this.play(523, "square", 0.5, 0.04);
      this.play(659, "square", 0.5, 0.04);
      this.play(784, "square", 0.5, 0.04);
    }, 480);
  },

  achievement() {
    [900, 1100, 1400, 1800].forEach((f, i) =>
      setTimeout(() => this.play(f, "sine", 0.2, 0.05), i * 85),
    );
  },

  mastered() {
    this.play(440, "square", 0.4, 0.04);
    this.play(554, "square", 0.4, 0.04);
    this.play(659, "square", 0.4, 0.04);
    setTimeout(() => {
      this.play(440, "square", 0.5, 0.04);
      this.play(554, "square", 0.5, 0.04);
      this.play(659, "square", 0.5, 0.04);
      this.play(880, "square", 0.5, 0.04);
    }, 420);
  },

  combo() {
    [400, 500, 640, 800].forEach((f, i) =>
      setTimeout(() => this.play(f, "sawtooth", 0.1, 0.04), i * 60),
    );
  },

  star() {
    this.play(2400, "sine", 0.04, 0.04);
    setTimeout(() => this.play(2800, "sine", 0.03, 0.03), 30);
  },

  undo() {
    this.play(400, "sawtooth", 0.15, 0.06);
    setTimeout(() => this.play(300, "sawtooth", 0.15, 0.06), 100);
    setTimeout(() => this.play(200, "sawtooth", 0.2, 0.05), 210);
  },

  revEasy() {
    this.play(660, "sine", 0.1, 0.05);
    setTimeout(() => this.play(880, "sine", 0.15, 0.05), 110);
  },
  revHard() {
    this.play(440, "triangle", 0.1, 0.05);
    setTimeout(() => this.play(330, "triangle", 0.15, 0.05), 110);
  },

  modal() {
    this.play(440, "sine", 0.08, 0.04);
    setTimeout(() => this.play(660, "sine", 0.12, 0.03), 60);
  },

  ping() {
    this.play(1000, "sine", 0.08, 0.04);
    setTimeout(() => this.play(1200, "sine", 0.12, 0.03), 80);
  },
};
