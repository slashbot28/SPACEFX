// ========================================================
// AUDIO EFFECTS (WEB AUDIO API)
// Source: lindelof/awesome-web-effect
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// 1. RETRO SOUND EFFECTS GENERATOR & VISUALIZER
window.EffectRegistry['audio-effects'] = {
  id: 'audio-effects',
  title: 'Web Audio 8-Bit Synthesizer',
  category: 'Audio Effect',
  tech: 'Web Audio API Oscillators & Frequency Analyzer',
  github: 'https://github.com/cwilso/Audio-Input-Effects',
  description: 'Procedurele 8-bit geluidseffecten synthesizer met real-time spectrum analyzer en chiptune generator.',
  defaultSettings: {
    volume: 0.35,
    waveform: 'square', // square, sawtooth, sine, triangle
    barColor: '#06b6d4',
    glowColor: '#3b82f6'
  },
  controls: [
    { type: 'range', key: 'volume', label: 'Master Volume', min: 0.05, max: 0.8, step: 0.05 },
    { type: 'select', key: 'waveform', label: 'Oscillator Type', options: ['square', 'sawtooth', 'triangle', 'sine'] },
    { type: 'color', key: 'barColor', label: 'Spectrum Kleur' },
    { type: 'trigger', key: 'triggerMelody', label: '🎵 Start / Stop Chiptune Melodie' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.wrapper = document.createElement('div');
    this.wrapper.style.display = 'flex';
    this.wrapper.style.flexDirection = 'column';
    this.wrapper.style.alignItems = 'center';
    this.wrapper.style.justifyContent = 'center';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';
    this.wrapper.style.gap = '18px';

    this.wrapper.innerHTML = `
      <div id="audio-status-banner" style="color: var(--accent-cyan); font-weight: 600; font-size: 0.88rem; text-align: center;">
        🔊 Klik op een geluidsknop hieronder of start de chiptune melodie!
      </div>

      <div style="position: relative; width: 480px; max-width: 90%; height: 180px; border-radius: 14px; overflow: hidden; background: #07090e; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 15px 35px rgba(0,0,0,0.7);">
        <canvas id="audio-vis-canvas" width="480" height="180" style="width: 100%; height: 100%; display: block;"></canvas>
        <div id="audio-playing-indicator" style="position: absolute; top: 12px; right: 14px; font-family: var(--font-mono); font-size: 0.72rem; color: #10b981; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); padding: 2px 8px; border-radius: 999px;">
          ● STANDBY
        </div>
      </div>

      <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; max-width: 500px;">
        <button class="btn-action" data-sfx="laser">🔫 Laser Blaster</button>
        <button class="btn-action" data-sfx="coin">🪙 Retro Coin</button>
        <button class="btn-action" data-sfx="jump">🦘 8-Bit Jump</button>
        <button class="btn-action" data-sfx="explosion">💥 Explosion</button>
        <button class="btn-action" data-sfx="powerup">⚡ Power-Up</button>
      </div>

      <div style="display: flex; gap: 12px;">
        <button id="btn-toggle-melody" class="btn-action btn-primary" style="padding: 8px 20px; font-size: 0.85rem;">
          🎵 Speel 8-Bit Chiptune Melodie
        </button>
      </div>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.canvas = this.wrapper.querySelector('#audio-vis-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.statusEl = this.wrapper.querySelector('#audio-status-banner');
    this.indicatorEl = this.wrapper.querySelector('#audio-playing-indicator');

    this.peaks = new Array(32).fill(0);
    this.initAudio();

    this.wrapper.querySelectorAll('button[data-sfx]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.playSFX(btn.dataset.sfx);
      });
    });

    this.isPlayingMelody = false;
    this.melodyTimer = null;
    this.wrapper.querySelector('#btn-toggle-melody').addEventListener('click', () => {
      this.toggleMelody();
    });

    this.time = 0;
    this.active = true;
    this.loop();
  },
  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!this.audioCtx) this.audioCtx = new AudioContext();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.7;
      this.analyser.connect(this.audioCtx.destination);
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    } catch (e) {
      console.warn('AudioContext niet ondersteund of geblokkeerd', e);
    }
  },
  playSFX(type) {
    if (!this.audioCtx) this.initAudio();
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

    this.indicatorEl.textContent = `● SFX: ${type.toUpperCase()}`;
    this.indicatorEl.style.color = '#06b6d4';
    this.statusEl.textContent = `🔊 Geluidseffect geactiveerd: ${type}!`;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = this.settings.waveform;
    const now = this.audioCtx.currentTime;
    const vol = this.settings.volume;

    gain.connect(this.analyser);

    if (type === 'laser') {
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.16);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'coin') {
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'jump') {
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(650, now + 0.22);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'explosion') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.45);
      gain.gain.setValueAtTime(vol * 1.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'powerup') {
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.28);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.start(now);
      osc.stop(now + 0.32);
    }
  },
  toggleMelody() {
    if (!this.audioCtx) this.initAudio();
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

    this.isPlayingMelody = !this.isPlayingMelody;
    const btn = this.wrapper.querySelector('#btn-toggle-melody');

    if (this.isPlayingMelody) {
      btn.textContent = '⏹ Stop Melodie';
      btn.style.background = '#ef4444';
      this.indicatorEl.textContent = '● MELODIE SPEELT';
      this.indicatorEl.style.color = '#f59e0b';
      this.statusEl.textContent = '🎶 8-Bit Chiptune Synth Melodie actief!';

      // Play 8-bit arpeggio melody
      const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 293.66, 349.23, 440.00, 587.33, 440.00, 349.23];
      let step = 0;

      this.melodyTimer = setInterval(() => {
        if (!this.isPlayingMelody) return;
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = this.settings.waveform;
        osc.frequency.setValueAtTime(notes[step % notes.length], now);
        gain.gain.setValueAtTime(this.settings.volume * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        gain.connect(this.analyser);
        osc.start(now);
        osc.stop(now + 0.14);

        step++;
      }, 150);
    } else {
      btn.textContent = '🎵 Speel 8-Bit Chiptune Melodie';
      btn.style.background = '';
      this.indicatorEl.textContent = '● STANDBY';
      this.indicatorEl.style.color = '#10b981';
      this.statusEl.textContent = '🔊 Klik op een geluidsknop hieronder of start de chiptune melodie!';
      clearInterval(this.melodyTimer);
    }
  },
  triggerMelody() {
    this.toggleMelody();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
  },
  loop() {
    if (!this.active) return;
    this.time += 0.05;

    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Subtle cyber grid background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    let hasAudioSignal = false;
    if (this.analyser && this.dataArray) {
      this.analyser.getByteFrequencyData(this.dataArray);
      for (let i = 0; i < this.dataArray.length; i++) {
        if (this.dataArray[i] > 10) { hasAudioSignal = true; break; }
      }
    }

    const numBars = 28;
    const barWidth = (w / numBars) - 3;

    // Draw active audio bars or lively idle standby wave
    for (let i = 0; i < numBars; i++) {
      let val = 0;

      if (hasAudioSignal && this.dataArray) {
        val = this.dataArray[i % this.dataArray.length] / 255;
      } else {
        // Hypnotic standby sine dance so visualizer is NEVER empty or dead
        const idleWave = (Math.sin(this.time * 2 + i * 0.25) + 1) * 0.5;
        const subWave = (Math.cos(this.time * 1.3 - i * 0.15) + 1) * 0.5;
        val = (idleWave * 0.15 + subWave * 0.1) * (1 - Math.abs(i - numBars / 2) / (numBars / 2) * 0.4);
      }

      const barHeight = Math.max(4, val * (h - 20));
      const x = i * (barWidth + 3) + 6;
      const y = h - barHeight - 8;

      // Peak hold calculation
      if (barHeight > this.peaks[i]) {
        this.peaks[i] = barHeight;
      } else {
        this.peaks[i] = Math.max(4, this.peaks[i] - 1.2);
      }

      // Draw frequency bar with neon gradient
      const barGrad = ctx.createLinearGradient(0, y, 0, h);
      barGrad.addColorStop(0, '#38bdf8');
      barGrad.addColorStop(0.5, this.settings.barColor);
      barGrad.addColorStop(1, '#1e1b4b');

      ctx.fillStyle = barGrad;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw glowing peak cap
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#38bdf8';
      ctx.fillRect(x, h - this.peaks[i] - 10, barWidth, 2);
      ctx.shadowBlur = 0;
    }

    // Oscilloscope center glow line
    ctx.beginPath();
    ctx.strokeStyle = hasAudioSignal ? '#f59e0b' : 'rgba(6, 182, 212, 0.4)';
    ctx.lineWidth = 1.5;
    for (let x = 0; x < w; x += 6) {
      const cy = h / 2 + Math.sin(x * 0.05 + this.time * 3) * (hasAudioSignal ? 25 : 6);
      if (x === 0) ctx.moveTo(x, cy); else ctx.lineTo(x, cy);
    }
    ctx.stroke();

    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    clearInterval(this.melodyTimer);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Web Audio 8-Bit Synthesizer</title>
  <style>
    body { margin: 0; background: #0c0f18; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; gap: 16px; color: white; }
    canvas { background: #07090e; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
    button { padding: 12px 20px; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <h2>Web Audio 8-Bit Synthesizer</h2>
  <canvas id="c" width="480" height="180"></canvas>
  <div style="display: flex; gap: 10px;">
    <button onclick="play('laser')">🔫 Laser</button>
    <button onclick="play('coin')">🪙 Munt</button>
    <button onclick="play('jump')">🦘 Sprong</button>
    <button onclick="play('explosion')">💥 Boem</button>
  </div>
  <script>
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const c = document.getElementById('c'), cvs = c.getContext('2d');
    const an = ctx.createAnalyser(); an.fftSize = 64; an.connect(ctx.destination);
    const data = new Uint8Array(an.frequencyBinCount);

    function play(t) {
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = '${s.waveform}'; const now = ctx.currentTime;
      osc.connect(g); g.connect(an);
      if (t === 'laser') {
        osc.frequency.setValueAtTime(880, now); osc.frequency.exponentialRampToValueAtTime(110, now + 0.16);
        g.gain.setValueAtTime(${s.volume}, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.start(now); osc.stop(now + 0.16);
      } else if (t === 'coin') {
        osc.frequency.setValueAtTime(987, now); osc.frequency.setValueAtTime(1318, now + 0.08);
        g.gain.setValueAtTime(${s.volume}, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now); osc.stop(now + 0.35);
      }
    }

    function loop() {
      an.getByteFrequencyData(data);
      cvs.clearRect(0, 0, 480, 180);
      for (let i = 0; i < 28; i++) {
        const h = (data[i] / 255) * 160;
        cvs.fillStyle = '${s.barColor}';
        cvs.fillRect(i * 17 + 6, 180 - h, 14, h);
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`;
  }
};

