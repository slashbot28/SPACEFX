// ========================================================
// AUDIO REACTIVITY MANAGER (MICROPHONE & SYNTH BEAT)
// Web Audio API Frequency Analyser & Beat Detection
// ========================================================

window.AudioReactive = {
  active: false,
  mode: 'off', // 'off', 'mic', 'synth'
  ctx: null,
  analyser: null,
  dataArray: null,
  source: null,
  stream: null,
  synthTimer: null,
  levels: {
    bass: 0,
    mid: 0,
    treble: 0,
    energy: 0,
    isBeat: false
  },
  lastBeatTime: 0,

  init() {
    // Lazy initialize on user gesture
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  },

  async startMic() {
    this.init();
    if (!this.ctx) return false;
    if (this.ctx.state === 'suspended') await this.ctx.resume();

    try {
      this.stop();
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      this.source = this.ctx.createMediaStreamSource(this.stream);
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;
      this.source.connect(this.analyser);

      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      this.active = true;
      this.mode = 'mic';
      this.tick();
      return true;
    } catch (err) {
      console.warn('Microphone access denied or unavailable, falling back to Synth Beat:', err);
      return this.startSynthBeat();
    }
  },

  startSynthBeat() {
    this.init();
    this.stop();
    this.active = true;
    this.mode = 'synth';

    // Simulated 128 BPM electronic kick/bass pulse
    let phase = 0;
    this.synthLoop = () => {
      if (!this.active || this.mode !== 'synth') return;
      phase += 0.08;
      const kick = Math.pow(Math.max(0, Math.sin(phase)), 8);
      const snare = Math.pow(Math.max(0, Math.sin(phase + Math.PI)), 12);
      const hat = Math.pow(Math.max(0, Math.sin(phase * 2)), 4) * 0.5;

      this.levels.bass = kick * 0.95 + 0.05;
      this.levels.mid = snare * 0.8 + 0.1;
      this.levels.treble = hat * 0.7 + 0.05;
      this.levels.energy = (this.levels.bass + this.levels.mid + this.levels.treble) / 3;
      this.levels.isBeat = kick > 0.7;

      requestAnimationFrame(this.synthLoop);
    };
    this.synthLoop();
    return true;
  },

  stop() {
    this.active = false;
    this.mode = 'off';
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    this.levels = { bass: 0, mid: 0, treble: 0, energy: 0, isBeat: false };
  },

  tick() {
    if (!this.active || this.mode !== 'mic') return;

    if (this.analyser && this.dataArray) {
      this.analyser.getByteFrequencyData(this.dataArray);
      const len = this.dataArray.length;

      // Split into frequency bands
      // Bass: bins 0 to ~10 (approx 0 - 200Hz)
      let bassSum = 0, bassCount = Math.min(10, len);
      for (let i = 0; i < bassCount; i++) bassSum += this.dataArray[i];
      const bassVal = (bassSum / bassCount) / 255;

      // Mid: bins 10 to ~50 (approx 200Hz - 2kHz)
      let midSum = 0, midCount = Math.min(40, len - 10);
      for (let i = 10; i < 10 + midCount; i++) midSum += this.dataArray[i];
      const midVal = (midSum / midCount) / 255;

      // Treble: bins 50+
      let trebleSum = 0, trebleCount = Math.max(1, len - 50);
      for (let i = 50; i < len; i++) trebleSum += this.dataArray[i];
      const trebleVal = (trebleSum / trebleCount) / 255;

      this.levels.bass = bassVal;
      this.levels.mid = midVal;
      this.levels.treble = trebleVal;
      this.levels.energy = (bassVal * 1.5 + midVal + trebleVal) / 3;

      const now = performance.now();
      if (bassVal > 0.65 && now - this.lastBeatTime > 280) {
        this.levels.isBeat = true;
        this.lastBeatTime = now;
      } else {
        this.levels.isBeat = false;
      }
    }

    requestAnimationFrame(() => this.tick());
  },

  getLevels() {
    return this.levels;
  }
};

