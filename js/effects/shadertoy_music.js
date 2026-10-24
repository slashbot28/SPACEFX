// ========================================================
// SHADERTOY MUSIC VISUALIZER COLLECTION (10 SHADERS WITH REAL MUSIC)
// WebGL GPU Raymarching & Shaders + Web Audio Procedural Synthesizer
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// --------------------------------------------------------
// PROCEDURAL WEB AUDIO SYNTHESIZER & ANALYSER ENGINE
// --------------------------------------------------------
class ShaderToyAudioEngine {
  constructor() {
    this.ctx = null;
    this.analyser = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.track = 'synthwave';
    this.volume = 0.6;
    this.audioTexData = new Uint8Array(512 * 2); // 512x2 ShaderToy audio texture layout
    this.freqData = new Uint8Array(256);
    this.waveData = new Uint8Array(256);
    this.timer = null;
    this.micStream = null;
    this.levels = { bass: 0, mid: 0, treble: 0, energy: 0 };
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.8;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
  }

  async resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  setVolume(v) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  async setTrack(track) {
    this.track = track;
    if (this.isPlaying) {
      this.stop();
      await this.play();
    }
  }

  async play() {
    await this.resume();
    if (!this.ctx) return;
    this.isPlaying = true;

    if (this.track === 'mic') {
      try {
        this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        const micSource = this.ctx.createMediaStreamSource(this.micStream);
        micSource.connect(this.analyser);
      } catch (err) {
        console.warn('Microphone access denied, switching to synthwave:', err);
        this.track = 'synthwave';
        this.startProceduralLoop();
      }
    } else {
      this.startProceduralLoop();
    }
  }

  stop() {
    this.isPlaying = false;
    clearInterval(this.timer);
    this.timer = null;
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
    }
  }

  startProceduralLoop() {
    if (this.timer) clearInterval(this.timer);
    let step = 0;
    const bpm = this.track === 'ambient' ? 65 : this.track === 'lofi' ? 85 : this.track === 'techno' ? 132 : 120;
    const stepTime = (60 / bpm / 4) * 1000;

    this.timer = setInterval(() => {
      if (!this.isPlaying || !this.ctx || this.ctx.state !== 'running') return;
      this.playStep(step % 16);
      step++;
    }, stepTime);
  }

  playStep(step) {
    const t = this.ctx.currentTime;
    const track = this.track;

    // 1. Kick Drum
    if (track === 'techno' || track === 'synthwave') {
      if (step % 4 === 0) this.triggerKick(t);
    } else if (track === 'lofi') {
      if (step === 0 || step === 7 || step === 10) this.triggerKick(t, 0.7);
    } else if (track === 'ambient') {
      if (step === 0) this.triggerDeepDrone(t);
    }

    // 2. Snare / Clap
    if ((track === 'synthwave' || track === 'lofi') && (step === 4 || step === 12)) {
      this.triggerSnare(t);
    } else if (track === 'techno' && (step === 4 || step === 12)) {
      this.triggerClap(t);
    }

    // 3. Hi-Hats
    if (track === 'techno') {
      if (step % 2 === 1) this.triggerHat(t, 0.3);
      if (step % 4 === 2) this.triggerHat(t, 0.6); // open hat on off-beat
    } else if (track === 'synthwave' || track === 'lofi') {
      if (step % 2 === 0) this.triggerHat(t, 0.25);
    }

    // 4. Bassline & Synth Chords
    if (track === 'synthwave') {
      const notes = [55, 55, 65.4, 55, 49, 49, 65.4, 73.4];
      const note = notes[step % notes.length];
      this.triggerSynthBass(t, note);
      if (step === 0) this.triggerChord(t, [220, 261.6, 329.6]); // Am
      if (step === 8) this.triggerChord(t, [174.6, 220, 261.6]); // F
    } else if (track === 'techno') {
      const acidNotes = [65.4, 65.4, 130.8, 65.4, 98, 65.4, 116.5, 87.3];
      this.triggerAcidBass(t, acidNotes[step % acidNotes.length]);
    } else if (track === 'lofi') {
      if (step === 0) this.triggerWarmChord(t, [130.8, 164.8, 196.0, 246.9]); // Cmaj7
      if (step === 8) this.triggerWarmChord(t, [110.0, 130.8, 164.8, 196.0]); // Am7
    } else if (track === 'ambient' || track === 'ocean') {
      if (step % 8 === 0) {
        const chord = track === 'ocean' ? [65.4, 98.0, 130.8] : [146.8, 220.0, 293.6];
        this.triggerWarmChord(t, chord, 2.5);
      }
    }
  }

  triggerKick(t, gainMul = 1.0) {
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(32, t + 0.12);
    g.gain.setValueAtTime(gainMul, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.22);
  }

  triggerSnare(t) {
    // Noise + tone
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, t);
    oscGain.gain.setValueAtTime(0.4, t);
    oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.16);

    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start(t);
  }

  triggerClap(t) {
    const bufferSize = this.ctx.sampleRate * 0.18;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 3;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.6, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    noise.connect(filter);
    filter.connect(g);
    g.connect(this.masterGain);
    noise.start(t);
  }

  triggerHat(t, vol = 0.3) {
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7500;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    noise.connect(filter);
    filter.connect(g);
    g.connect(this.masterGain);
    noise.start(t);
  }

  triggerSynthBass(t, freq) {
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const g = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, t);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(700, t);
    filter.frequency.exponentialRampToValueAtTime(150, t + 0.2);
    g.gain.setValueAtTime(0.45, t);
    g.gain.exponentialRampToValueAtTime(0.01, t + 0.22);
    osc.connect(filter);
    filter.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.24);
  }

  triggerAcidBass(t, freq) {
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const g = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, t);
    filter.type = 'lowpass';
    filter.Q.value = 12;
    filter.frequency.setValueAtTime(2800, t);
    filter.frequency.exponentialRampToValueAtTime(300, t + 0.16);
    g.gain.setValueAtTime(0.4, t);
    g.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
    osc.connect(filter);
    filter.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.2);
  }

  triggerChord(t, freqs) {
    freqs.forEach(f => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, t);
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;
      g.gain.setValueAtTime(0.08, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
      osc.connect(filter);
      filter.connect(g);
      g.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 1.25);
    });
  }

  triggerWarmChord(t, freqs, duration = 1.8) {
    freqs.forEach(f => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(0.12, t);
      g.gain.linearRampToValueAtTime(0.16, t + 0.4);
      g.gain.exponentialRampToValueAtTime(0.001, t + duration);
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + duration + 0.1);
    });
  }

  triggerDeepDrone(t) {
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(45, t);
    g.gain.setValueAtTime(0.3, t);
    g.gain.exponentialRampToValueAtTime(0.01, t + 3.0);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 3.1);
  }

  updateAudioData() {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.freqData);
      this.analyser.getByteTimeDomainData(this.waveData);

      // Copy into ShaderToy 512x2 layout:
      // Row 0 (offset 0..255): Frequency spectrum
      // Row 1 (offset 512..767): Waveform
      for (let i = 0; i < 256; i++) {
        this.audioTexData[i] = this.freqData[i];
        this.audioTexData[512 + i] = this.waveData[i];
      }

      // Compute scalar levels for simple uniform binding
      let b = 0, m = 0, tr = 0;
      for (let i = 1; i <= 8; i++) b += this.freqData[i];
      for (let i = 12; i <= 40; i++) m += this.freqData[i];
      for (let i = 50; i <= 120; i++) tr += this.freqData[i];

      this.levels.bass = (b / 8) / 255;
      this.levels.mid = (m / 29) / 255;
      this.levels.treble = (tr / 71) / 255;
      this.levels.energy = (this.levels.bass + this.levels.mid + this.levels.treble) / 3;
    } else {
      // Idle procedural pulsing when audio is muted
      const t = performance.now() * 0.003;
      this.levels.bass = 0.2 + 0.15 * Math.sin(t * 2);
      this.levels.mid = 0.2 + 0.1 * Math.cos(t * 3);
      this.levels.treble = 0.15 + 0.1 * Math.sin(t * 5);
      this.levels.energy = (this.levels.bass + this.levels.mid + this.levels.treble) / 3;

      for (let i = 0; i < 256; i++) {
        const val = Math.floor(Math.abs(Math.sin(t + i * 0.05)) * 140);
        this.audioTexData[i] = val;
        this.audioTexData[512 + i] = 128 + Math.floor(Math.sin(t * 4 + i * 0.1) * 60);
      }
    }
  }
}


// --------------------------------------------------------
// SHADERTOY WEBGL CANVAS RUNNER & HUD CONTROLLER
// --------------------------------------------------------
class ShaderToyRunner {
  constructor(container, fragmentShaderSource, settings, effectTitle, defaultTrack) {
    this.container = container;
    this.fragmentShaderSource = fragmentShaderSource;
    this.settings = settings;
    this.effectTitle = effectTitle;
    this.defaultTrack = defaultTrack || 'synthwave';
    this.active = false;
    this.rafId = null;
    this.audio = new ShaderToyAudioEngine();
    this.audio.track = settings.musicTrack || this.defaultTrack;
    this.audio.volume = settings.musicVolume !== undefined ? settings.musicVolume : 0.6;
    this.audioGain = settings.audioReactivity !== undefined ? settings.audioReactivity : 1.2;

    this.mouse = [0, 0, 0, 0];
    this.startTime = performance.now();
    this.lastTime = this.startTime;
    this.frameCount = 0;

    this.initDOM();
    this.initWebGL();
    this.initHUD();
    this.bindEvents();
    this.active = true;
    this.loop();
  }

  initDOM() {
    this.container.innerHTML = '';
    this.wrapper = document.createElement('div');
    this.wrapper.style.position = 'relative';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';
    this.wrapper.style.overflow = 'hidden';
    this.wrapper.style.background = '#000';

    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';

    this.wrapper.appendChild(this.canvas);
    this.container.appendChild(this.wrapper);
  }

  initHUD() {
    this.hud = document.createElement('div');
    this.hud.className = 'shadertoy-audio-hud';
    this.hud.style.position = 'absolute';
    this.hud.style.bottom = '20px';
    this.hud.style.left = '50%';
    this.hud.style.transform = 'translateX(-50%)';
    this.hud.style.zIndex = '30';
    this.hud.style.display = 'flex';
    this.hud.style.alignItems = 'center';
    this.hud.style.gap = '12px';
    this.hud.style.background = 'rgba(10, 14, 24, 0.85)';
    this.hud.style.backdropFilter = 'blur(16px)';
    this.hud.style.border = '1px solid rgba(255, 255, 255, 0.15)';
    this.hud.style.borderRadius = '30px';
    this.hud.style.padding = '8px 18px';
    this.hud.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(6, 182, 212, 0.2)';
    this.hud.style.color = '#fff';
    this.hud.style.fontSize = '13px';
    this.hud.style.userSelect = 'none';

    this.hud.innerHTML = `
      <button id="st-hud-play" style="background: var(--accent-gradient, linear-gradient(135deg, #06b6d4, #8b5cf6)); border: none; color: #fff; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 0 15px rgba(6,182,212,0.5); transition: transform 0.2s;">
        ▶
      </button>
      <div style="display: flex; flex-direction: column;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-cyan, #06b6d4); font-weight: 700;">
          🎵 Muziek & Audio-Reactief
        </span>
        <span id="st-hud-status" style="font-size: 12px; font-weight: 500; color: #e2e8f0;">
          Gepauzeerd (Klik Play)
        </span>
      </div>
      <div style="height: 24px; width: 1px; background: rgba(255,255,255,0.15); margin: 0 4px;"></div>
      <select id="st-hud-track" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: #fff; font-size: 12px; border-radius: 8px; padding: 4px 8px; cursor: pointer; outline: none;">
        <option value="synthwave">Cyberpunk Synthwave</option>
        <option value="ambient">Deep Space Ambient</option>
        <option value="lofi">Chillout Lofi Beat</option>
        <option value="techno">Hypnotic Acid Techno</option>
        <option value="ocean">Sub-aquatic Drone</option>
        <option value="mic">🎤 Microfoon Input (Live)</option>
      </select>
    `;

    this.wrapper.appendChild(this.hud);

    this.btnPlay = this.hud.querySelector('#st-hud-play');
    this.statusText = this.hud.querySelector('#st-hud-status');
    this.selectTrack = this.hud.querySelector('#st-hud-track');
    this.selectTrack.value = this.audio.track;

    this.btnPlay.addEventListener('click', async () => {
      if (this.audio.isPlaying) {
        this.audio.stop();
        this.btnPlay.textContent = '▶';
        this.btnPlay.style.boxShadow = '0 0 15px rgba(6,182,212,0.5)';
        this.statusText.textContent = 'Gepauzeerd';
      } else {
        await this.audio.play();
        this.btnPlay.textContent = '❚❚';
        this.btnPlay.style.boxShadow = '0 0 20px #10b981';
        this.statusText.textContent = `Speelt: ${this.selectTrack.options[this.selectTrack.selectedIndex].text}`;
      }
    });

    this.selectTrack.addEventListener('change', async (e) => {
      await this.audio.setTrack(e.target.value);
      if (this.audio.isPlaying) {
        this.statusText.textContent = `Speelt: ${this.selectTrack.options[this.selectTrack.selectedIndex].text}`;
      }
    });
  }

  initWebGL() {
    this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    if (!this.gl) {
      this.container.innerHTML = '<div style="color:red;padding:20px;">WebGL niet ondersteund door deze browser.</div>';
      return;
    }
    const gl = this.gl;

    // Fullscreen quad
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsHeader = `
      precision highp float;
      uniform vec3 iResolution;
      uniform float iTime;
      uniform float iTimeDelta;
      uniform float iFrame;
      uniform vec4 iMouse;
      uniform sampler2D iChannel0;
      uniform float u_audioBass;
      uniform float u_audioMid;
      uniform float u_audioTreble;
      uniform float u_audioLevel;
      uniform float u_speed;
      uniform vec3 u_colorA;
      uniform vec3 u_colorB;
    `;

    const fullFsSource = fsHeader + this.fragmentShaderSource + `
      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const vs = this.compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = this.compileShader(gl.FRAGMENT_SHADER, fullFsSource);
    if (!vs || !fs) return;

    this.program = gl.createProgram();
    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error('ShaderToy Program link error:', gl.getProgramInfoLog(this.program));
      return;
    }

    gl.useProgram(this.program);

    // Quad buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(this.program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    this.uRes = gl.getUniformLocation(this.program, 'iResolution');
    this.uTime = gl.getUniformLocation(this.program, 'iTime');
    this.uTimeDelta = gl.getUniformLocation(this.program, 'iTimeDelta');
    this.uFrame = gl.getUniformLocation(this.program, 'iFrame');
    this.uMouse = gl.getUniformLocation(this.program, 'iMouse');
    this.uChannel0 = gl.getUniformLocation(this.program, 'iChannel0');
    this.uBass = gl.getUniformLocation(this.program, 'u_audioBass');
    this.uMid = gl.getUniformLocation(this.program, 'u_audioMid');
    this.uTreble = gl.getUniformLocation(this.program, 'u_audioTreble');
    this.uLevel = gl.getUniformLocation(this.program, 'u_audioLevel');
    this.uSpeed = gl.getUniformLocation(this.program, 'u_speed');
    this.uColA = gl.getUniformLocation(this.program, 'u_colorA');
    this.uColB = gl.getUniformLocation(this.program, 'u_colorB');

    // Audio Texture (512x2: row 0 freq, row 1 waveform)
    this.audioTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.audioTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, 512, 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, this.audio.audioTexData);

    this.resize();
  }

  compileShader(type, src) {
    const gl = this.gl;
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(s), '\nSource:', src);
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  resize() {
    if (!this.canvas || !this.gl) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    const bw = Math.floor(w * dpr);
    const bh = Math.floor(h * dpr);

    if (this.canvas.width !== bw || this.canvas.height !== bh) {
      this.canvas.width = bw;
      this.canvas.height = bh;
      this.gl.viewport(0, 0, bw, bh);
    }
  }

  bindEvents() {
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse[0] = e.clientX - rect.left;
      this.mouse[1] = rect.height - (e.clientY - rect.top);
    });

    this.canvas.addEventListener('mousedown', (e) => {
      this.mouse[2] = this.mouse[0];
      this.mouse[3] = this.mouse[1];
    });

    this.canvas.addEventListener('mouseup', () => {
      this.mouse[2] = 0;
      this.mouse[3] = 0;
    });
  }

  hexToRgb(hex, def = [0.2, 0.8, 1.0]) {
    if (!hex) return def;
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    const num = parseInt(clean, 16);
    return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
  }

  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (settings.musicVolume !== undefined) {
      this.audio.setVolume(settings.musicVolume);
    }
    if (settings.musicTrack && settings.musicTrack !== this.audio.track) {
      this.audio.setTrack(settings.musicTrack);
      if (this.selectTrack) this.selectTrack.value = settings.musicTrack;
    }
    if (settings.audioReactivity !== undefined) {
      this.audioGain = settings.audioReactivity;
    }
  }

  loop() {
    if (!this.active) return;
    this.resize();

    const now = performance.now();
    const dt = (now - this.lastTime) / 1000;
    const time = (now - this.startTime) / 1000;
    this.lastTime = now;
    this.frameCount++;

    // Update audio analysis
    this.audio.updateAudioData();

    const gl = this.gl;
    if (gl && this.program) {
      gl.useProgram(this.program);

      // Upload updated audio texture
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.audioTex);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 512, 2, gl.LUMINANCE, gl.UNSIGNED_BYTE, this.audio.audioTexData);
      gl.uniform1i(this.uChannel0, 0);

      // Set standard uniforms
      gl.uniform3f(this.uRes, this.canvas.width, this.canvas.height, 1.0);
      gl.uniform1f(this.uTime, time * (this.settings.speed || 1.0));
      gl.uniform1f(this.uTimeDelta, dt);
      gl.uniform1f(this.uFrame, this.frameCount);
      gl.uniform4f(this.uMouse, this.mouse[0], this.mouse[1], this.mouse[2], this.mouse[3]);

      // Audio uniforms with gain
      const gain = this.audioGain || 1.2;
      gl.uniform1f(this.uBass, Math.min(2.5, this.audio.levels.bass * gain));
      gl.uniform1f(this.uMid, Math.min(2.5, this.audio.levels.mid * gain));
      gl.uniform1f(this.uTreble, Math.min(2.5, this.audio.levels.treble * gain));
      gl.uniform1f(this.uLevel, Math.min(2.5, this.audio.levels.energy * gain));
      gl.uniform1f(this.uSpeed, this.settings.speed || 1.0);

      const colA = this.hexToRgb(this.settings.colorA, [0.0, 0.9, 1.0]);
      const colB = this.hexToRgb(this.settings.colorB, [1.0, 0.2, 0.6]);
      gl.uniform3f(this.uColA, colA[0], colA[1], colA[2]);
      gl.uniform3f(this.uColB, colB[0], colB[1], colB[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    this.rafId = requestAnimationFrame(() => this.loop());
  }

  destroy() {
    this.active = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.audio.stop();
    window.removeEventListener('resize', this.onResize);
    if (this.container) this.container.innerHTML = '';
  }
}

// --------------------------------------------------------
// SHADERTOY REGISTRY DEFINITIONS
// --------------------------------------------------------

window.EffectRegistry["shadertoy-lunchbreak"] = {
  id: "shadertoy-lunchbreak",
  title: "Lunchbreak — Cybernetic Iridescence (Audio Reactive)",
  category: "Audio Effect",
  tech: "WebGL GPU Raymarching & Sound Texture",
  github: "https://www.shadertoy.com/view/flGyWc",
  description: "Organische cybernetische fractale architectuur met volumetrische iriserende lichtstralen die pulseren op ingebouwde lofi-beat of microfoon.",
  defaultSettings: {
  "musicTrack": "lofi",
  "musicVolume": 0.6,
  "audioReactivity": 1.3,
  "speed": 1,
  "colorA": "#00e5ff",
  "colorB": "#ff007f"
},
  controls: [
    {
      type: "select", key: "musicTrack", label: "Muziek Soundtrack",
      options: [{"value":"synthwave","label":"Cyberpunk Synthwave"},{"value":"ambient","label":"Deep Space Ambient"},{"value":"lofi","label":"Chillout Lofi Beat"},{"value":"techno","label":"Hypnotic Acid Techno"},{"value":"ocean","label":"Sub-aquatic Drone"},{"value":"mic","label":"🎤 Microfoon Live Input"}]
    },
    { type: "range", key: "musicVolume", label: "Muziek Volume", min: 0, max: 1, step: 0.05 },
    { type: "range", key: "audioReactivity", label: "Audio Reactiviteit", min: 0.2, max: 3.0, step: 0.1 },
    { type: "range", key: "speed", label: "Animatie Snelheid", min: 0.2, max: 3.0, step: 0.1 },
    { type: "color", key: "colorA", label: "Primaire Tint (Neon)" },
    { type: "color", key: "colorB", label: "Secundaire Tint (Glow)" }
  ],

  init(container, settings) {
    this.runner = new ShaderToyRunner(container, "\nmat2 rot(float a) {\n    float s = sin(a), c = cos(a);\n    return mat2(c, -s, s, c);\n}\n\nfloat map(vec3 p) {\n    float fft = texture2D(iChannel0, vec2(0.1, 0.25)).r * u_audioBass * 1.5;\n    p.xy *= rot(p.z * 0.15 + iTime * 0.2);\n    p.z += iTime * 0.8;\n    vec3 q = mod(p, 4.0) - 2.0;\n    float box = max(abs(q.x) - 0.5 - fft * 0.3, max(abs(q.y) - 0.5, abs(q.z) - 0.5));\n    float sphere = length(q) - (0.8 + fft * 0.4);\n    return max(box, -sphere);\n}\n\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    vec3 ro = vec3(0.0, 0.0, -3.0);\n    vec3 rd = normalize(vec3(uv, 1.2));\n    rd.xy *= rot(sin(iTime * 0.3) * 0.3);\n\n    float t = 0.0;\n    float glow = 0.0;\n    for (int i = 0; i < 70; i++) {\n        vec3 p = ro + rd * t;\n        float d = map(p);\n        glow += 0.02 / (0.05 + abs(d));\n        if (d < 0.002 || t > 25.0) break;\n        t += d * 0.65;\n    }\n\n    vec3 col = vec3(0.0);\n    if (t < 25.0) {\n        vec3 p = ro + rd * t;\n        vec2 eps = vec2(0.005, 0.0);\n        vec3 n = normalize(vec3(map(p + eps.xyy) - map(p - eps.xyy),\n                               map(p + eps.yxy) - map(p - eps.yxy),\n                               map(p + eps.yyx) - map(p - eps.yyx)));\n        float diff = max(dot(n, normalize(vec3(1.0, 2.0, -1.0))), 0.0);\n        float spec = pow(max(dot(reflect(rd, n), normalize(vec3(1.0, 2.0, -1.0))), 0.0), 16.0);\n        col = mix(u_colorA, u_colorB, sin(p.z * 0.5 + iTime) * 0.5 + 0.5) * (diff + 0.3) + spec;\n    }\n\n    col += mix(u_colorA, u_colorB, uv.y + 0.5) * glow * (0.08 + u_audioBass * 0.15);\n    col = pow(col, vec3(0.85));\n    fragColor = vec4(col, 1.0);\n}\n", settings, "Lunchbreak — Cybernetic Iridescence (Audio Reactive)", "lofi");
  },

  update(settings) {
    if (this.runner) {
      this.runner.update(settings);
    }
  },

  destroy() {
    if (this.runner) {
      this.runner.destroy();
      this.runner = null;
    }
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>\n<html lang="nl">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Lunchbreak — Cybernetic Iridescence (Audio Reactive) — SPACEFX Studio</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body, html { width: 100%; height: 100%; overflow: hidden; background: #000; font-family: system-ui, sans-serif; }\n    canvas { display: block; width: 100vw; height: 100vh; }\n  </style>\n</head>\n<body>\n  <div id="container" style="width: 100vw; height: 100vh;"></div>\n  <script>\n    ` + ShaderToyAudioEngine.toString() + `\n    ` + ShaderToyRunner.toString() + `\n    const glsl = "\nmat2 rot(float a) {\n    float s = sin(a), c = cos(a);\n    return mat2(c, -s, s, c);\n}\n\nfloat map(vec3 p) {\n    float fft = texture2D(iChannel0, vec2(0.1, 0.25)).r * u_audioBass * 1.5;\n    p.xy *= rot(p.z * 0.15 + iTime * 0.2);\n    p.z += iTime * 0.8;\n    vec3 q = mod(p, 4.0) - 2.0;\n    float box = max(abs(q.x) - 0.5 - fft * 0.3, max(abs(q.y) - 0.5, abs(q.z) - 0.5));\n    float sphere = length(q) - (0.8 + fft * 0.4);\n    return max(box, -sphere);\n}\n\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    vec3 ro = vec3(0.0, 0.0, -3.0);\n    vec3 rd = normalize(vec3(uv, 1.2));\n    rd.xy *= rot(sin(iTime * 0.3) * 0.3);\n\n    float t = 0.0;\n    float glow = 0.0;\n    for (int i = 0; i < 70; i++) {\n        vec3 p = ro + rd * t;\n        float d = map(p);\n        glow += 0.02 / (0.05 + abs(d));\n        if (d < 0.002 || t > 25.0) break;\n        t += d * 0.65;\n    }\n\n    vec3 col = vec3(0.0);\n    if (t < 25.0) {\n        vec3 p = ro + rd * t;\n        vec2 eps = vec2(0.005, 0.0);\n        vec3 n = normalize(vec3(map(p + eps.xyy) - map(p - eps.xyy),\n                               map(p + eps.yxy) - map(p - eps.yxy),\n                               map(p + eps.yyx) - map(p - eps.yyx)));\n        float diff = max(dot(n, normalize(vec3(1.0, 2.0, -1.0))), 0.0);\n        float spec = pow(max(dot(reflect(rd, n), normalize(vec3(1.0, 2.0, -1.0))), 0.0), 16.0);\n        col = mix(u_colorA, u_colorB, sin(p.z * 0.5 + iTime) * 0.5 + 0.5) * (diff + 0.3) + spec;\n    }\n\n    col += mix(u_colorA, u_colorB, uv.y + 0.5) * glow * (0.08 + u_audioBass * 0.15);\n    col = pow(col, vec3(0.85));\n    fragColor = vec4(col, 1.0);\n}\n";\n    const runner = new ShaderToyRunner(document.getElementById("container"), glsl, ` + JSON.stringify(s) + `, "Lunchbreak — Cybernetic Iridescence (Audio Reactive)", "lofi");\n  <\\/script>\n</body>\n</html>`;
  }
};

window.EffectRegistry["shadertoy-sound-flower"] = {
  id: "shadertoy-sound-flower",
  title: "Sound Flower & Audio Mandala",
  category: "Audio Effect",
  tech: "Radial Frequency Raymarch & Kaleidoscopic Math",
  github: "https://www.shadertoy.com/view/Xs3GWj",
  description: "Kaleidoscopische bloemvormige audiomandala waarvan de bloembladen vloeiend ademen op verschillende harmonische frequentiebanden.",
  defaultSettings: {
  "musicTrack": "ambient",
  "musicVolume": 0.6,
  "audioReactivity": 1.4,
  "speed": 1,
  "colorA": "#a855f7",
  "colorB": "#38bdf8"
},
  controls: [
    {
      type: "select", key: "musicTrack", label: "Muziek Soundtrack",
      options: [{"value":"synthwave","label":"Cyberpunk Synthwave"},{"value":"ambient","label":"Deep Space Ambient"},{"value":"lofi","label":"Chillout Lofi Beat"},{"value":"techno","label":"Hypnotic Acid Techno"},{"value":"ocean","label":"Sub-aquatic Drone"},{"value":"mic","label":"🎤 Microfoon Live Input"}]
    },
    { type: "range", key: "musicVolume", label: "Muziek Volume", min: 0, max: 1, step: 0.05 },
    { type: "range", key: "audioReactivity", label: "Audio Reactiviteit", min: 0.2, max: 3.0, step: 0.1 },
    { type: "range", key: "speed", label: "Animatie Snelheid", min: 0.2, max: 3.0, step: 0.1 },
    { type: "color", key: "colorA", label: "Primaire Tint (Neon)" },
    { type: "color", key: "colorB", label: "Secundaire Tint (Glow)" }
  ],

  init(container, settings) {
    this.runner = new ShaderToyRunner(container, "\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    float r = length(uv);\n    float a = atan(uv.y, uv.x);\n\n    float fftNorm = (a + 3.14159) / 6.28318;\n    float audioFreq = texture2D(iChannel0, vec2(abs(fftNorm - 0.5) * 2.0, 0.25)).r;\n    float wave = texture2D(iChannel0, vec2(r, 0.75)).r - 0.5;\n\n    float petals = 8.0;\n    float shape = sin(a * petals + iTime * 0.5) * 0.15 * (1.0 + u_audioBass * 1.8);\n    float shape2 = cos(a * petals * 2.0 - iTime * 0.8) * 0.08 * (1.0 + u_audioMid * 1.5);\n    float targetR = 0.35 + shape + shape2 + audioFreq * 0.3;\n\n    float d = abs(r - targetR);\n    float ringGlow = 0.015 / (d + 0.008);\n\n    float ring2 = abs(r - (targetR + 0.18 + wave * 0.1));\n    ringGlow += 0.008 / (ring2 + 0.01);\n\n    float core = 0.04 / (length(uv) + 0.05);\n\n    vec3 col = mix(u_colorA, u_colorB, sin(a * 3.0 + iTime) * 0.5 + 0.5);\n    col *= (ringGlow + core * (1.0 + u_audioBass * 2.0));\n    col += vec3(0.05, 0.1, 0.2) / (r + 0.1);\n\n    fragColor = vec4(col, 1.0);\n}\n", settings, "Sound Flower & Audio Mandala", "ambient");
  },

  update(settings) {
    if (this.runner) {
      this.runner.update(settings);
    }
  },

  destroy() {
    if (this.runner) {
      this.runner.destroy();
      this.runner = null;
    }
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>\n<html lang="nl">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Sound Flower & Audio Mandala — SPACEFX Studio</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body, html { width: 100%; height: 100%; overflow: hidden; background: #000; font-family: system-ui, sans-serif; }\n    canvas { display: block; width: 100vw; height: 100vh; }\n  </style>\n</head>\n<body>\n  <div id="container" style="width: 100vw; height: 100vh;"></div>\n  <script>\n    ` + ShaderToyAudioEngine.toString() + `\n    ` + ShaderToyRunner.toString() + `\n    const glsl = "\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    float r = length(uv);\n    float a = atan(uv.y, uv.x);\n\n    float fftNorm = (a + 3.14159) / 6.28318;\n    float audioFreq = texture2D(iChannel0, vec2(abs(fftNorm - 0.5) * 2.0, 0.25)).r;\n    float wave = texture2D(iChannel0, vec2(r, 0.75)).r - 0.5;\n\n    float petals = 8.0;\n    float shape = sin(a * petals + iTime * 0.5) * 0.15 * (1.0 + u_audioBass * 1.8);\n    float shape2 = cos(a * petals * 2.0 - iTime * 0.8) * 0.08 * (1.0 + u_audioMid * 1.5);\n    float targetR = 0.35 + shape + shape2 + audioFreq * 0.3;\n\n    float d = abs(r - targetR);\n    float ringGlow = 0.015 / (d + 0.008);\n\n    float ring2 = abs(r - (targetR + 0.18 + wave * 0.1));\n    ringGlow += 0.008 / (ring2 + 0.01);\n\n    float core = 0.04 / (length(uv) + 0.05);\n\n    vec3 col = mix(u_colorA, u_colorB, sin(a * 3.0 + iTime) * 0.5 + 0.5);\n    col *= (ringGlow + core * (1.0 + u_audioBass * 2.0));\n    col += vec3(0.05, 0.1, 0.2) / (r + 0.1);\n\n    fragColor = vec4(col, 1.0);\n}\n";\n    const runner = new ShaderToyRunner(document.getElementById("container"), glsl, ` + JSON.stringify(s) + `, "Sound Flower & Audio Mandala", "ambient");\n  <\\/script>\n</body>\n</html>`;
  }
};

window.EffectRegistry["shadertoy-neon-tunnel"] = {
  id: "shadertoy-neon-tunnel",
  title: "Neon Hyperspace Sound Tunnel",
  category: "Audio Effect",
  tech: "Polar Warp Raymarch & Audio Waveform Grid",
  github: "https://www.shadertoy.com/view/MdVXzw",
  description: "Hogesnelheids-hyperspace tunnel met pulserende neonringen, golfvormvervorming en sterrenveld dat accelereert op de beat.",
  defaultSettings: {
  "musicTrack": "synthwave",
  "musicVolume": 0.6,
  "audioReactivity": 1.5,
  "speed": 1.2,
  "colorA": "#06b6d4",
  "colorB": "#ec4899"
},
  controls: [
    {
      type: "select", key: "musicTrack", label: "Muziek Soundtrack",
      options: [{"value":"synthwave","label":"Cyberpunk Synthwave"},{"value":"ambient","label":"Deep Space Ambient"},{"value":"lofi","label":"Chillout Lofi Beat"},{"value":"techno","label":"Hypnotic Acid Techno"},{"value":"ocean","label":"Sub-aquatic Drone"},{"value":"mic","label":"🎤 Microfoon Live Input"}]
    },
    { type: "range", key: "musicVolume", label: "Muziek Volume", min: 0, max: 1, step: 0.05 },
    { type: "range", key: "audioReactivity", label: "Audio Reactiviteit", min: 0.2, max: 3.0, step: 0.1 },
    { type: "range", key: "speed", label: "Animatie Snelheid", min: 0.2, max: 3.0, step: 0.1 },
    { type: "color", key: "colorA", label: "Primaire Tint (Neon)" },
    { type: "color", key: "colorB", label: "Secundaire Tint (Glow)" }
  ],

  init(container, settings) {
    this.runner = new ShaderToyRunner(container, "\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    float r = length(uv);\n    float a = atan(uv.y, uv.x);\n\n    float z = 1.0 / (r + 0.001);\n    float tunnelU = a / 3.14159;\n    float tunnelV = z + iTime * (1.5 + u_audioBass * 2.5);\n\n    float fft = texture2D(iChannel0, vec2(fract(tunnelU * 0.5), 0.25)).r * u_audioBass;\n    float wave = texture2D(iChannel0, vec2(fract(tunnelV * 0.1), 0.75)).r - 0.5;\n\n    vec2 grid = abs(fract(vec2(tunnelU * 6.0, tunnelV * 2.0)) - 0.5);\n    float line = min(grid.x, grid.y);\n    float wire = smoothstep(0.06, 0.01, line);\n\n    float ringGlow = exp(-fract(tunnelV * 2.0) * 3.0) * (0.5 + fft * 2.0);\n\n    vec3 col = mix(u_colorA, u_colorB, sin(tunnelU * 3.1415 + iTime) * 0.5 + 0.5);\n    col *= (wire * 1.5 + ringGlow * 2.0 + wave * 0.8);\n\n    col *= smoothstep(0.0, 0.35, r);\n    col += vec3(0.01, 0.02, 0.05) * z * 0.1;\n    col += mix(vec3(1.0), u_colorB, 0.4) * (0.015 / (r + 0.02)) * (1.0 + u_audioBass * 3.0);\n\n    fragColor = vec4(col, 1.0);\n}\n", settings, "Neon Hyperspace Sound Tunnel", "synthwave");
  },

  update(settings) {
    if (this.runner) {
      this.runner.update(settings);
    }
  },

  destroy() {
    if (this.runner) {
      this.runner.destroy();
      this.runner = null;
    }
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>\n<html lang="nl">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Neon Hyperspace Sound Tunnel — SPACEFX Studio</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body, html { width: 100%; height: 100%; overflow: hidden; background: #000; font-family: system-ui, sans-serif; }\n    canvas { display: block; width: 100vw; height: 100vh; }\n  </style>\n</head>\n<body>\n  <div id="container" style="width: 100vw; height: 100vh;"></div>\n  <script>\n    ` + ShaderToyAudioEngine.toString() + `\n    ` + ShaderToyRunner.toString() + `\n    const glsl = "\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    float r = length(uv);\n    float a = atan(uv.y, uv.x);\n\n    float z = 1.0 / (r + 0.001);\n    float tunnelU = a / 3.14159;\n    float tunnelV = z + iTime * (1.5 + u_audioBass * 2.5);\n\n    float fft = texture2D(iChannel0, vec2(fract(tunnelU * 0.5), 0.25)).r * u_audioBass;\n    float wave = texture2D(iChannel0, vec2(fract(tunnelV * 0.1), 0.75)).r - 0.5;\n\n    vec2 grid = abs(fract(vec2(tunnelU * 6.0, tunnelV * 2.0)) - 0.5);\n    float line = min(grid.x, grid.y);\n    float wire = smoothstep(0.06, 0.01, line);\n\n    float ringGlow = exp(-fract(tunnelV * 2.0) * 3.0) * (0.5 + fft * 2.0);\n\n    vec3 col = mix(u_colorA, u_colorB, sin(tunnelU * 3.1415 + iTime) * 0.5 + 0.5);\n    col *= (wire * 1.5 + ringGlow * 2.0 + wave * 0.8);\n\n    col *= smoothstep(0.0, 0.35, r);\n    col += vec3(0.01, 0.02, 0.05) * z * 0.1;\n    col += mix(vec3(1.0), u_colorB, 0.4) * (0.015 / (r + 0.02)) * (1.0 + u_audioBass * 3.0);\n\n    fragColor = vec4(col, 1.0);\n}\n";\n    const runner = new ShaderToyRunner(document.getElementById("container"), glsl, ` + JSON.stringify(s) + `, "Neon Hyperspace Sound Tunnel", "synthwave");\n  <\\/script>\n</body>\n</html>`;
  }
};

window.EffectRegistry["shadertoy-tetris-dimension"] = {
  id: "shadertoy-tetris-dimension",
  title: "The Tetris Dimension (3D Volumetric Blocks)",
  category: "Audio Effect",
  tech: "Volumetric Raymarch & Tetromino Color Math",
  github: "https://www.shadertoy.com/view/NtByzD",
  description: "Surrealistische driedimensionale wereld van zwevende, vallende en oplichtende Tetris-blokken die dansen op chiptune- en synthwavemuziek.",
  defaultSettings: {
  "musicTrack": "synthwave",
  "musicVolume": 0.6,
  "audioReactivity": 1.3,
  "speed": 1,
  "colorA": "#00ffff",
  "colorB": "#ff3366"
},
  controls: [
    {
      type: "select", key: "musicTrack", label: "Muziek Soundtrack",
      options: [{"value":"synthwave","label":"Cyberpunk Synthwave"},{"value":"ambient","label":"Deep Space Ambient"},{"value":"lofi","label":"Chillout Lofi Beat"},{"value":"techno","label":"Hypnotic Acid Techno"},{"value":"ocean","label":"Sub-aquatic Drone"},{"value":"mic","label":"🎤 Microfoon Live Input"}]
    },
    { type: "range", key: "musicVolume", label: "Muziek Volume", min: 0, max: 1, step: 0.05 },
    { type: "range", key: "audioReactivity", label: "Audio Reactiviteit", min: 0.2, max: 3.0, step: 0.1 },
    { type: "range", key: "speed", label: "Animatie Snelheid", min: 0.2, max: 3.0, step: 0.1 },
    { type: "color", key: "colorA", label: "Primaire Tint (Neon)" },
    { type: "color", key: "colorB", label: "Secundaire Tint (Glow)" }
  ],

  init(container, settings) {
    this.runner = new ShaderToyRunner(container, "\nmat2 rotT(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }\n\nfloat sdBox(vec3 p, vec3 b) {\n    vec3 q = abs(p) - b;\n    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);\n}\n\nfloat mapTetris(vec3 p, out vec3 blockColor) {\n    p.xy *= rotT(sin(iTime * 0.2) * 0.3);\n    p.z += iTime * 1.5;\n\n    vec3 cell = floor(p / 2.0);\n    vec3 q = mod(p, 2.0) - 1.0;\n\n    float seed = sin(cell.x * 12.9898 + cell.y * 78.233 + cell.z * 45.164);\n    float blockType = fract(seed * 43758.5453);\n\n    if (blockType < 0.15) blockColor = vec3(0.0, 0.9, 1.0);\n    else if (blockType < 0.3) blockColor = vec3(1.0, 0.85, 0.0);\n    else if (blockType < 0.45) blockColor = vec3(0.65, 0.1, 0.9);\n    else if (blockType < 0.6) blockColor = vec3(0.1, 0.9, 0.2);\n    else if (blockType < 0.75) blockColor = vec3(0.95, 0.15, 0.1);\n    else if (blockType < 0.9) blockColor = vec3(0.1, 0.3, 0.95);\n    else blockColor = vec3(1.0, 0.5, 0.0);\n\n    float fft = texture2D(iChannel0, vec2(fract(seed), 0.25)).r * u_audioBass * 0.4;\n    float box = sdBox(q, vec3(0.42 + fft * 0.15)) - 0.05;\n    return box;\n}\n\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    vec3 ro = vec3(0.0, 0.0, -4.0);\n    vec3 rd = normalize(vec3(uv, 1.0));\n\n    float t = 0.0;\n    vec3 col = vec3(0.02, 0.03, 0.06);\n    vec3 blockColor = vec3(1.0);\n    float glow = 0.0;\n\n    for (int i = 0; i < 60; i++) {\n        vec3 p = ro + rd * t;\n        vec3 bCol;\n        float d = mapTetris(p, bCol);\n        glow += 0.015 / (0.04 + abs(d));\n        if (d < 0.003 || t > 20.0) {\n            blockColor = bCol;\n            break;\n        }\n        t += d * 0.7;\n    }\n\n    if (t < 20.0) {\n        vec3 p = ro + rd * t;\n        float fog = exp(-t * 0.08);\n        col = blockColor * (0.8 + u_audioBass * 0.6) * fog;\n    }\n    col += blockColor * glow * (0.08 + u_audioBass * 0.2);\n    col *= 1.0 - length(uv) * 0.4;\n    fragColor = vec4(col, 1.0);\n}\n", settings, "The Tetris Dimension (3D Volumetric Blocks)", "synthwave");
  },

  update(settings) {
    if (this.runner) {
      this.runner.update(settings);
    }
  },

  destroy() {
    if (this.runner) {
      this.runner.destroy();
      this.runner = null;
    }
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>\n<html lang="nl">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>The Tetris Dimension (3D Volumetric Blocks) — SPACEFX Studio</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body, html { width: 100%; height: 100%; overflow: hidden; background: #000; font-family: system-ui, sans-serif; }\n    canvas { display: block; width: 100vw; height: 100vh; }\n  </style>\n</head>\n<body>\n  <div id="container" style="width: 100vw; height: 100vh;"></div>\n  <script>\n    ` + ShaderToyAudioEngine.toString() + `\n    ` + ShaderToyRunner.toString() + `\n    const glsl = "\nmat2 rotT(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }\n\nfloat sdBox(vec3 p, vec3 b) {\n    vec3 q = abs(p) - b;\n    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);\n}\n\nfloat mapTetris(vec3 p, out vec3 blockColor) {\n    p.xy *= rotT(sin(iTime * 0.2) * 0.3);\n    p.z += iTime * 1.5;\n\n    vec3 cell = floor(p / 2.0);\n    vec3 q = mod(p, 2.0) - 1.0;\n\n    float seed = sin(cell.x * 12.9898 + cell.y * 78.233 + cell.z * 45.164);\n    float blockType = fract(seed * 43758.5453);\n\n    if (blockType < 0.15) blockColor = vec3(0.0, 0.9, 1.0);\n    else if (blockType < 0.3) blockColor = vec3(1.0, 0.85, 0.0);\n    else if (blockType < 0.45) blockColor = vec3(0.65, 0.1, 0.9);\n    else if (blockType < 0.6) blockColor = vec3(0.1, 0.9, 0.2);\n    else if (blockType < 0.75) blockColor = vec3(0.95, 0.15, 0.1);\n    else if (blockType < 0.9) blockColor = vec3(0.1, 0.3, 0.95);\n    else blockColor = vec3(1.0, 0.5, 0.0);\n\n    float fft = texture2D(iChannel0, vec2(fract(seed), 0.25)).r * u_audioBass * 0.4;\n    float box = sdBox(q, vec3(0.42 + fft * 0.15)) - 0.05;\n    return box;\n}\n\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    vec3 ro = vec3(0.0, 0.0, -4.0);\n    vec3 rd = normalize(vec3(uv, 1.0));\n\n    float t = 0.0;\n    vec3 col = vec3(0.02, 0.03, 0.06);\n    vec3 blockColor = vec3(1.0);\n    float glow = 0.0;\n\n    for (int i = 0; i < 60; i++) {\n        vec3 p = ro + rd * t;\n        vec3 bCol;\n        float d = mapTetris(p, bCol);\n        glow += 0.015 / (0.04 + abs(d));\n        if (d < 0.003 || t > 20.0) {\n            blockColor = bCol;\n            break;\n        }\n        t += d * 0.7;\n    }\n\n    if (t < 20.0) {\n        vec3 p = ro + rd * t;\n        float fog = exp(-t * 0.08);\n        col = blockColor * (0.8 + u_audioBass * 0.6) * fog;\n    }\n    col += blockColor * glow * (0.08 + u_audioBass * 0.2);\n    col *= 1.0 - length(uv) * 0.4;\n    fragColor = vec4(col, 1.0);\n}\n";\n    const runner = new ShaderToyRunner(document.getElementById("container"), glsl, ` + JSON.stringify(s) + `, "The Tetris Dimension (3D Volumetric Blocks)", "synthwave");\n  <\\/script>\n</body>\n</html>`;
  }
};

window.EffectRegistry["shadertoy-happy-glow-cruise"] = {
  id: "shadertoy-happy-glow-cruise",
  title: "Happy Glow Cruise (Retrowave Outrun Horizon)",
  category: "Audio Effect",
  tech: "Outrun Perspective Grid & Solar Corona Raymarch",
  github: "https://www.shadertoy.com/view/3ccyD7",
  description: "Zomerse neon retrowave horizon met oneindig perspectiefraster, pulserende synthesizersol en zacht gloeiende bergcontouren.",
  defaultSettings: {
  "musicTrack": "synthwave",
  "musicVolume": 0.6,
  "audioReactivity": 1.3,
  "speed": 1,
  "colorA": "#f59e0b",
  "colorB": "#ec4899"
},
  controls: [
    {
      type: "select", key: "musicTrack", label: "Muziek Soundtrack",
      options: [{"value":"synthwave","label":"Cyberpunk Synthwave"},{"value":"ambient","label":"Deep Space Ambient"},{"value":"lofi","label":"Chillout Lofi Beat"},{"value":"techno","label":"Hypnotic Acid Techno"},{"value":"ocean","label":"Sub-aquatic Drone"},{"value":"mic","label":"🎤 Microfoon Live Input"}]
    },
    { type: "range", key: "musicVolume", label: "Muziek Volume", min: 0, max: 1, step: 0.05 },
    { type: "range", key: "audioReactivity", label: "Audio Reactiviteit", min: 0.2, max: 3.0, step: 0.1 },
    { type: "range", key: "speed", label: "Animatie Snelheid", min: 0.2, max: 3.0, step: 0.1 },
    { type: "color", key: "colorA", label: "Primaire Tint (Neon)" },
    { type: "color", key: "colorB", label: "Secundaire Tint (Glow)" }
  ],

  init(container, settings) {
    this.runner = new ShaderToyRunner(container, "\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    vec3 col = vec3(0.05, 0.02, 0.1);\n\n    vec2 sunPos = vec2(0.0, 0.12);\n    float sunDist = length(uv - sunPos);\n    float sunR = 0.28 + u_audioBass * 0.08;\n\n    if (sunDist < sunR) {\n        float scanline = sin(uv.y * 70.0) * 0.5 + 0.5;\n        float cut = smoothstep(0.2, 0.25, scanline);\n        if (uv.y < sunPos.y) {\n            float grad = (uv.y - (sunPos.y - sunR)) / (sunR);\n            col = mix(u_colorB, u_colorA, grad) * (0.4 + cut * 0.6);\n        } else {\n            col = u_colorA;\n        }\n    }\n    col += mix(u_colorB, u_colorA, 0.5) * (0.03 / (sunDist + 0.05)) * (1.0 + u_audioBass * 1.5);\n\n    if (uv.y > -0.05 && uv.y < 0.1) {\n        float m = sin(uv.x * 6.0) * 0.04 + cos(uv.x * 14.0) * 0.02;\n        if (uv.y < m) {\n            col = vec3(0.03, 0.01, 0.08);\n        }\n    }\n\n    if (uv.y < -0.05) {\n        float depth = -0.05 / (uv.y + 0.051);\n        float gx = uv.x * depth;\n        float gz = depth + iTime * (3.0 + u_audioBass * 2.0);\n\n        vec2 grid = abs(fract(vec2(gx * 2.5, gz * 0.8)) - 0.5);\n        float wire = smoothstep(0.08, 0.01, min(grid.x, grid.y));\n\n        float fft = texture2D(iChannel0, vec2(fract(gx * 0.1), 0.25)).r * u_audioBass;\n        vec3 gridCol = mix(vec3(0.0, 0.9, 1.0), u_colorB, sin(gz * 0.2) * 0.5 + 0.5);\n\n        float fog = exp(-depth * 0.06);\n        col = mix(col, gridCol * (wire * 2.5 + fft * 1.2), fog);\n    }\n\n    fragColor = vec4(col, 1.0);\n}\n", settings, "Happy Glow Cruise (Retrowave Outrun Horizon)", "synthwave");
  },

  update(settings) {
    if (this.runner) {
      this.runner.update(settings);
    }
  },

  destroy() {
    if (this.runner) {
      this.runner.destroy();
      this.runner = null;
    }
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>\n<html lang="nl">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Happy Glow Cruise (Retrowave Outrun Horizon) — SPACEFX Studio</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body, html { width: 100%; height: 100%; overflow: hidden; background: #000; font-family: system-ui, sans-serif; }\n    canvas { display: block; width: 100vw; height: 100vh; }\n  </style>\n</head>\n<body>\n  <div id="container" style="width: 100vw; height: 100vh;"></div>\n  <script>\n    ` + ShaderToyAudioEngine.toString() + `\n    ` + ShaderToyRunner.toString() + `\n    const glsl = "\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    vec3 col = vec3(0.05, 0.02, 0.1);\n\n    vec2 sunPos = vec2(0.0, 0.12);\n    float sunDist = length(uv - sunPos);\n    float sunR = 0.28 + u_audioBass * 0.08;\n\n    if (sunDist < sunR) {\n        float scanline = sin(uv.y * 70.0) * 0.5 + 0.5;\n        float cut = smoothstep(0.2, 0.25, scanline);\n        if (uv.y < sunPos.y) {\n            float grad = (uv.y - (sunPos.y - sunR)) / (sunR);\n            col = mix(u_colorB, u_colorA, grad) * (0.4 + cut * 0.6);\n        } else {\n            col = u_colorA;\n        }\n    }\n    col += mix(u_colorB, u_colorA, 0.5) * (0.03 / (sunDist + 0.05)) * (1.0 + u_audioBass * 1.5);\n\n    if (uv.y > -0.05 && uv.y < 0.1) {\n        float m = sin(uv.x * 6.0) * 0.04 + cos(uv.x * 14.0) * 0.02;\n        if (uv.y < m) {\n            col = vec3(0.03, 0.01, 0.08);\n        }\n    }\n\n    if (uv.y < -0.05) {\n        float depth = -0.05 / (uv.y + 0.051);\n        float gx = uv.x * depth;\n        float gz = depth + iTime * (3.0 + u_audioBass * 2.0);\n\n        vec2 grid = abs(fract(vec2(gx * 2.5, gz * 0.8)) - 0.5);\n        float wire = smoothstep(0.08, 0.01, min(grid.x, grid.y));\n\n        float fft = texture2D(iChannel0, vec2(fract(gx * 0.1), 0.25)).r * u_audioBass;\n        vec3 gridCol = mix(vec3(0.0, 0.9, 1.0), u_colorB, sin(gz * 0.2) * 0.5 + 0.5);\n\n        float fog = exp(-depth * 0.06);\n        col = mix(col, gridCol * (wire * 2.5 + fft * 1.2), fog);\n    }\n\n    fragColor = vec4(col, 1.0);\n}\n";\n    const runner = new ShaderToyRunner(document.getElementById("container"), glsl, ` + JSON.stringify(s) + `, "Happy Glow Cruise (Retrowave Outrun Horizon)", "synthwave");\n  <\\/script>\n</body>\n</html>`;
  }
};

window.EffectRegistry["shadertoy-glass-origin"] = {
  id: "shadertoy-glass-origin",
  title: "Glass Origin (Chromatic Prism Caustics)",
  category: "Audio Effect",
  tech: "Volumetric Glass Dispersion & Internal Raymarch",
  github: "https://www.shadertoy.com/view/scS3Wy",
  description: "Volumetrisch kristallen prisma met interne chromatische lichtbreking en pulserende caustics die reageren op kristallijne pads.",
  defaultSettings: {
  "musicTrack": "ambient",
  "musicVolume": 0.6,
  "audioReactivity": 1.2,
  "speed": 1,
  "colorA": "#38bdf8",
  "colorB": "#f43f5e"
},
  controls: [
    {
      type: "select", key: "musicTrack", label: "Muziek Soundtrack",
      options: [{"value":"synthwave","label":"Cyberpunk Synthwave"},{"value":"ambient","label":"Deep Space Ambient"},{"value":"lofi","label":"Chillout Lofi Beat"},{"value":"techno","label":"Hypnotic Acid Techno"},{"value":"ocean","label":"Sub-aquatic Drone"},{"value":"mic","label":"🎤 Microfoon Live Input"}]
    },
    { type: "range", key: "musicVolume", label: "Muziek Volume", min: 0, max: 1, step: 0.05 },
    { type: "range", key: "audioReactivity", label: "Audio Reactiviteit", min: 0.2, max: 3.0, step: 0.1 },
    { type: "range", key: "speed", label: "Animatie Snelheid", min: 0.2, max: 3.0, step: 0.1 },
    { type: "color", key: "colorA", label: "Primaire Tint (Neon)" },
    { type: "color", key: "colorB", label: "Secundaire Tint (Glow)" }
  ],

  init(container, settings) {
    this.runner = new ShaderToyRunner(container, "\nmat2 rotG(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }\n\nfloat sdOctahedron(vec3 p, float s) {\n    p = abs(p);\n    return (p.x + p.y + p.z - s) * 0.57735027;\n}\n\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    vec3 ro = vec3(0.0, 0.0, -3.2);\n    vec3 rd = normalize(vec3(uv, 1.4));\n\n    ro.xz *= rotG(iTime * 0.35);\n    rd.xz *= rotG(iTime * 0.35);\n    ro.yz *= rotG(sin(iTime * 0.2) * 0.2);\n    rd.yz *= rotG(sin(iTime * 0.2) * 0.2);\n\n    float s = 1.2 + u_audioBass * 0.3;\n    float t = 0.0;\n    float glow = 0.0;\n\n    for (int i = 0; i < 50; i++) {\n        vec3 p = ro + rd * t;\n        float d = sdOctahedron(p, s);\n        glow += 0.015 / (0.02 + abs(d));\n        if (d < 0.002 || t > 10.0) break;\n        t += d * 0.8;\n    }\n\n    vec3 col = vec3(0.01, 0.02, 0.04);\n    if (t < 10.0) {\n        vec3 p = ro + rd * t;\n        vec2 eps = vec2(0.005, 0.0);\n        vec3 n = normalize(vec3(\n            sdOctahedron(p + eps.xyy, s) - sdOctahedron(p - eps.xyy, s),\n            sdOctahedron(p + eps.yxy, s) - sdOctahedron(p - eps.yxy, s),\n            sdOctahedron(p + eps.yyx, s) - sdOctahedron(p - eps.yyx, s)\n        ));\n\n        vec3 refrR = refract(rd, n, 1.0 / 1.52);\n        vec3 refrG = refract(rd, n, 1.0 / 1.54);\n        vec3 refrB = refract(rd, n, 1.0 / 1.56);\n\n        col.r += max(0.0, dot(refrR, vec3(0.5, 0.8, -0.3))) * u_colorA.r;\n        col.g += max(0.0, dot(refrG, vec3(0.5, 0.8, -0.3))) * u_colorA.g;\n        col.b += max(0.0, dot(refrB, vec3(0.5, 0.8, -0.3))) * u_colorA.b;\n\n        float fresnel = pow(1.0 - max(dot(-rd, n), 0.0), 3.0);\n        col += mix(u_colorA, u_colorB, fresnel) * 1.2;\n    }\n\n    col += mix(u_colorA, u_colorB, uv.y + 0.5) * glow * (0.05 + u_audioBass * 0.2);\n    fragColor = vec4(col, 1.0);\n}\n", settings, "Glass Origin (Chromatic Prism Caustics)", "ambient");
  },

  update(settings) {
    if (this.runner) {
      this.runner.update(settings);
    }
  },

  destroy() {
    if (this.runner) {
      this.runner.destroy();
      this.runner = null;
    }
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>\n<html lang="nl">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Glass Origin (Chromatic Prism Caustics) — SPACEFX Studio</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body, html { width: 100%; height: 100%; overflow: hidden; background: #000; font-family: system-ui, sans-serif; }\n    canvas { display: block; width: 100vw; height: 100vh; }\n  </style>\n</head>\n<body>\n  <div id="container" style="width: 100vw; height: 100vh;"></div>\n  <script>\n    ` + ShaderToyAudioEngine.toString() + `\n    ` + ShaderToyRunner.toString() + `\n    const glsl = "\nmat2 rotG(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }\n\nfloat sdOctahedron(vec3 p, float s) {\n    p = abs(p);\n    return (p.x + p.y + p.z - s) * 0.57735027;\n}\n\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    vec3 ro = vec3(0.0, 0.0, -3.2);\n    vec3 rd = normalize(vec3(uv, 1.4));\n\n    ro.xz *= rotG(iTime * 0.35);\n    rd.xz *= rotG(iTime * 0.35);\n    ro.yz *= rotG(sin(iTime * 0.2) * 0.2);\n    rd.yz *= rotG(sin(iTime * 0.2) * 0.2);\n\n    float s = 1.2 + u_audioBass * 0.3;\n    float t = 0.0;\n    float glow = 0.0;\n\n    for (int i = 0; i < 50; i++) {\n        vec3 p = ro + rd * t;\n        float d = sdOctahedron(p, s);\n        glow += 0.015 / (0.02 + abs(d));\n        if (d < 0.002 || t > 10.0) break;\n        t += d * 0.8;\n    }\n\n    vec3 col = vec3(0.01, 0.02, 0.04);\n    if (t < 10.0) {\n        vec3 p = ro + rd * t;\n        vec2 eps = vec2(0.005, 0.0);\n        vec3 n = normalize(vec3(\n            sdOctahedron(p + eps.xyy, s) - sdOctahedron(p - eps.xyy, s),\n            sdOctahedron(p + eps.yxy, s) - sdOctahedron(p - eps.yxy, s),\n            sdOctahedron(p + eps.yyx, s) - sdOctahedron(p - eps.yyx, s)\n        ));\n\n        vec3 refrR = refract(rd, n, 1.0 / 1.52);\n        vec3 refrG = refract(rd, n, 1.0 / 1.54);\n        vec3 refrB = refract(rd, n, 1.0 / 1.56);\n\n        col.r += max(0.0, dot(refrR, vec3(0.5, 0.8, -0.3))) * u_colorA.r;\n        col.g += max(0.0, dot(refrG, vec3(0.5, 0.8, -0.3))) * u_colorA.g;\n        col.b += max(0.0, dot(refrB, vec3(0.5, 0.8, -0.3))) * u_colorA.b;\n\n        float fresnel = pow(1.0 - max(dot(-rd, n), 0.0), 3.0);\n        col += mix(u_colorA, u_colorB, fresnel) * 1.2;\n    }\n\n    col += mix(u_colorA, u_colorB, uv.y + 0.5) * glow * (0.05 + u_audioBass * 0.2);\n    fragColor = vec4(col, 1.0);\n}\n";\n    const runner = new ShaderToyRunner(document.getElementById("container"), glsl, ` + JSON.stringify(s) + `, "Glass Origin (Chromatic Prism Caustics)", "ambient");\n  <\\/script>\n</body>\n</html>`;
  }
};

window.EffectRegistry["shadertoy-fibonacci-zoom"] = {
  id: "shadertoy-fibonacci-zoom",
  title: "Extruded Fibonacci Zoom (Fractal Spiral)",
  category: "Audio Effect",
  tech: "Logarithmic Golden Spiral Extrusion",
  github: "https://www.shadertoy.com/view/sfVGDG",
  description: "Shane's meesterlijke oneindige logaritmische gulden spiraalzoom met metalen reliëf en pompende acid-techno beats.",
  defaultSettings: {
  "musicTrack": "techno",
  "musicVolume": 0.6,
  "audioReactivity": 1.4,
  "speed": 1,
  "colorA": "#22c55e",
  "colorB": "#eab308"
},
  controls: [
    {
      type: "select", key: "musicTrack", label: "Muziek Soundtrack",
      options: [{"value":"synthwave","label":"Cyberpunk Synthwave"},{"value":"ambient","label":"Deep Space Ambient"},{"value":"lofi","label":"Chillout Lofi Beat"},{"value":"techno","label":"Hypnotic Acid Techno"},{"value":"ocean","label":"Sub-aquatic Drone"},{"value":"mic","label":"🎤 Microfoon Live Input"}]
    },
    { type: "range", key: "musicVolume", label: "Muziek Volume", min: 0, max: 1, step: 0.05 },
    { type: "range", key: "audioReactivity", label: "Audio Reactiviteit", min: 0.2, max: 3.0, step: 0.1 },
    { type: "range", key: "speed", label: "Animatie Snelheid", min: 0.2, max: 3.0, step: 0.1 },
    { type: "color", key: "colorA", label: "Primaire Tint (Neon)" },
    { type: "color", key: "colorB", label: "Secundaire Tint (Glow)" }
  ],

  init(container, settings) {
    this.runner = new ShaderToyRunner(container, "\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    float r = length(uv);\n    float a = atan(uv.y, uv.x);\n\n    float spiral = log(r + 0.001) * 1.618 - a + iTime * (0.8 + u_audioBass * 1.2);\n    float cells = fract(spiral * 1.5);\n\n    float seg = sin(a * 13.0 + log(r + 0.01) * 8.0);\n    float fft = texture2D(iChannel0, vec2(cells, 0.25)).r * u_audioBass;\n\n    float depth = abs(cells - 0.5) * 2.0;\n    float edge = smoothstep(0.4, 0.48, depth);\n\n    vec3 col = mix(u_colorA, u_colorB, sin(spiral * 3.0) * 0.5 + 0.5);\n    col *= (1.0 - edge * 0.7) * (seg * 0.3 + 0.7 + fft * 1.5);\n    col += u_colorB * (0.03 / (r + 0.03)) * (1.0 + u_audioBass * 2.0);\n\n    fragColor = vec4(col, 1.0);\n}\n", settings, "Extruded Fibonacci Zoom (Fractal Spiral)", "techno");
  },

  update(settings) {
    if (this.runner) {
      this.runner.update(settings);
    }
  },

  destroy() {
    if (this.runner) {
      this.runner.destroy();
      this.runner = null;
    }
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>\n<html lang="nl">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Extruded Fibonacci Zoom (Fractal Spiral) — SPACEFX Studio</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body, html { width: 100%; height: 100%; overflow: hidden; background: #000; font-family: system-ui, sans-serif; }\n    canvas { display: block; width: 100vw; height: 100vh; }\n  </style>\n</head>\n<body>\n  <div id="container" style="width: 100vw; height: 100vh;"></div>\n  <script>\n    ` + ShaderToyAudioEngine.toString() + `\n    ` + ShaderToyRunner.toString() + `\n    const glsl = "\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    float r = length(uv);\n    float a = atan(uv.y, uv.x);\n\n    float spiral = log(r + 0.001) * 1.618 - a + iTime * (0.8 + u_audioBass * 1.2);\n    float cells = fract(spiral * 1.5);\n\n    float seg = sin(a * 13.0 + log(r + 0.01) * 8.0);\n    float fft = texture2D(iChannel0, vec2(cells, 0.25)).r * u_audioBass;\n\n    float depth = abs(cells - 0.5) * 2.0;\n    float edge = smoothstep(0.4, 0.48, depth);\n\n    vec3 col = mix(u_colorA, u_colorB, sin(spiral * 3.0) * 0.5 + 0.5);\n    col *= (1.0 - edge * 0.7) * (seg * 0.3 + 0.7 + fft * 1.5);\n    col += u_colorB * (0.03 / (r + 0.03)) * (1.0 + u_audioBass * 2.0);\n\n    fragColor = vec4(col, 1.0);\n}\n";\n    const runner = new ShaderToyRunner(document.getElementById("container"), glsl, ` + JSON.stringify(s) + `, "Extruded Fibonacci Zoom (Fractal Spiral)", "techno");\n  <\\/script>\n</body>\n</html>`;
  }
};

window.EffectRegistry["shadertoy-cave-diving"] = {
  id: "shadertoy-cave-diving",
  title: "Cave Diving (Bioluminescent Cavern)",
  category: "Audio Effect",
  tech: "Volumetric Cavern Raymarch & Caustic Lighting",
  github: "https://www.shadertoy.com/view/XcVyWD",
  description: "Onderwater diepzeegrot met volumetrische watermist, oplichtende bioluminescente flora en diepe sub-bass oceaandrone.",
  defaultSettings: {
  "musicTrack": "ocean",
  "musicVolume": 0.6,
  "audioReactivity": 1.2,
  "speed": 0.8,
  "colorA": "#0284c7",
  "colorB": "#10b981"
},
  controls: [
    {
      type: "select", key: "musicTrack", label: "Muziek Soundtrack",
      options: [{"value":"synthwave","label":"Cyberpunk Synthwave"},{"value":"ambient","label":"Deep Space Ambient"},{"value":"lofi","label":"Chillout Lofi Beat"},{"value":"techno","label":"Hypnotic Acid Techno"},{"value":"ocean","label":"Sub-aquatic Drone"},{"value":"mic","label":"🎤 Microfoon Live Input"}]
    },
    { type: "range", key: "musicVolume", label: "Muziek Volume", min: 0, max: 1, step: 0.05 },
    { type: "range", key: "audioReactivity", label: "Audio Reactiviteit", min: 0.2, max: 3.0, step: 0.1 },
    { type: "range", key: "speed", label: "Animatie Snelheid", min: 0.2, max: 3.0, step: 0.1 },
    { type: "color", key: "colorA", label: "Primaire Tint (Neon)" },
    { type: "color", key: "colorB", label: "Secundaire Tint (Glow)" }
  ],

  init(container, settings) {
    this.runner = new ShaderToyRunner(container, "\nmat2 rotC(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }\n\nfloat mapCave(vec3 p) {\n    p.xy += vec2(sin(p.z * 0.2), cos(p.z * 0.25)) * 1.5;\n    float tunnel = 3.5 - length(p.xy);\n    float noise = sin(p.x * 2.0) * cos(p.y * 2.0) * sin(p.z * 2.0) * 0.35;\n    return -(tunnel + noise);\n}\n\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    vec3 ro = vec3(0.0, 0.0, iTime * 1.5);\n    vec3 rd = normalize(vec3(uv, 1.2));\n    rd.xy *= rotC(sin(iTime * 0.15) * 0.3);\n\n    float t = 0.0;\n    float glow = 0.0;\n\n    for (int i = 0; i < 65; i++) {\n        vec3 p = ro + rd * t;\n        float d = mapCave(p);\n        glow += 0.02 / (0.05 + abs(d));\n        if (d < 0.005 || t > 25.0) break;\n        t += d * 0.6;\n    }\n\n    vec3 col = vec3(0.01, 0.04, 0.08);\n    if (t < 25.0) {\n        vec3 p = ro + rd * t;\n        float caustic = sin(p.x * 5.0 + iTime) * sin(p.y * 5.0 + iTime) * sin(p.z * 5.0);\n        float fog = exp(-t * 0.08);\n        vec3 rockCol = mix(u_colorA * 0.4, u_colorB, caustic * 0.5 + 0.5);\n        col = rockCol * (fog + u_audioBass * 0.4);\n    }\n\n    col += u_colorB * glow * (0.04 + u_audioBass * 0.12);\n    fragColor = vec4(col, 1.0);\n}\n", settings, "Cave Diving (Bioluminescent Cavern)", "ocean");
  },

  update(settings) {
    if (this.runner) {
      this.runner.update(settings);
    }
  },

  destroy() {
    if (this.runner) {
      this.runner.destroy();
      this.runner = null;
    }
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>\n<html lang="nl">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Cave Diving (Bioluminescent Cavern) — SPACEFX Studio</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body, html { width: 100%; height: 100%; overflow: hidden; background: #000; font-family: system-ui, sans-serif; }\n    canvas { display: block; width: 100vw; height: 100vh; }\n  </style>\n</head>\n<body>\n  <div id="container" style="width: 100vw; height: 100vh;"></div>\n  <script>\n    ` + ShaderToyAudioEngine.toString() + `\n    ` + ShaderToyRunner.toString() + `\n    const glsl = "\nmat2 rotC(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }\n\nfloat mapCave(vec3 p) {\n    p.xy += vec2(sin(p.z * 0.2), cos(p.z * 0.25)) * 1.5;\n    float tunnel = 3.5 - length(p.xy);\n    float noise = sin(p.x * 2.0) * cos(p.y * 2.0) * sin(p.z * 2.0) * 0.35;\n    return -(tunnel + noise);\n}\n\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    vec3 ro = vec3(0.0, 0.0, iTime * 1.5);\n    vec3 rd = normalize(vec3(uv, 1.2));\n    rd.xy *= rotC(sin(iTime * 0.15) * 0.3);\n\n    float t = 0.0;\n    float glow = 0.0;\n\n    for (int i = 0; i < 65; i++) {\n        vec3 p = ro + rd * t;\n        float d = mapCave(p);\n        glow += 0.02 / (0.05 + abs(d));\n        if (d < 0.005 || t > 25.0) break;\n        t += d * 0.6;\n    }\n\n    vec3 col = vec3(0.01, 0.04, 0.08);\n    if (t < 25.0) {\n        vec3 p = ro + rd * t;\n        float caustic = sin(p.x * 5.0 + iTime) * sin(p.y * 5.0 + iTime) * sin(p.z * 5.0);\n        float fog = exp(-t * 0.08);\n        vec3 rockCol = mix(u_colorA * 0.4, u_colorB, caustic * 0.5 + 0.5);\n        col = rockCol * (fog + u_audioBass * 0.4);\n    }\n\n    col += u_colorB * glow * (0.04 + u_audioBass * 0.12);\n    fragColor = vec4(col, 1.0);\n}\n";\n    const runner = new ShaderToyRunner(document.getElementById("container"), glsl, ` + JSON.stringify(s) + `, "Cave Diving (Bioluminescent Cavern)", "ocean");\n  <\\/script>\n</body>\n</html>`;
  }
};

window.EffectRegistry["shadertoy-grid-attractor"] = {
  id: "shadertoy-grid-attractor",
  title: "Grid Attractor (Cybernetic Sound Matrix)",
  category: "Audio Effect",
  tech: "Particle Grid Deformation & Magnetic Field Math",
  github: "https://www.shadertoy.com/view/43cBzn",
  description: "Cybernetisch deeltjesraster met magnetische aantrekkingskrachten en schokgolven die synchroon pulseren op elektronische beats.",
  defaultSettings: {
  "musicTrack": "techno",
  "musicVolume": 0.6,
  "audioReactivity": 1.5,
  "speed": 1.1,
  "colorA": "#00ffff",
  "colorB": "#a855f7"
},
  controls: [
    {
      type: "select", key: "musicTrack", label: "Muziek Soundtrack",
      options: [{"value":"synthwave","label":"Cyberpunk Synthwave"},{"value":"ambient","label":"Deep Space Ambient"},{"value":"lofi","label":"Chillout Lofi Beat"},{"value":"techno","label":"Hypnotic Acid Techno"},{"value":"ocean","label":"Sub-aquatic Drone"},{"value":"mic","label":"🎤 Microfoon Live Input"}]
    },
    { type: "range", key: "musicVolume", label: "Muziek Volume", min: 0, max: 1, step: 0.05 },
    { type: "range", key: "audioReactivity", label: "Audio Reactiviteit", min: 0.2, max: 3.0, step: 0.1 },
    { type: "range", key: "speed", label: "Animatie Snelheid", min: 0.2, max: 3.0, step: 0.1 },
    { type: "color", key: "colorA", label: "Primaire Tint (Neon)" },
    { type: "color", key: "colorB", label: "Secundaire Tint (Glow)" }
  ],

  init(container, settings) {
    this.runner = new ShaderToyRunner(container, "\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n\n    vec2 attractor = vec2(sin(iTime * 1.2) * 0.4, cos(iTime * 0.9) * 0.25);\n    if (iMouse.z > 0.0) {\n        attractor = (iMouse.xy - 0.5 * iResolution.xy) / iResolution.y;\n    }\n\n    vec2 dVec = uv - attractor;\n    float dist = length(dVec);\n    float force = (0.2 + u_audioBass * 0.6) / (dist + 0.1);\n\n    vec2 warpedUV = uv - normalize(dVec) * force * 0.15;\n\n    vec2 gridUV = fract(warpedUV * 25.0) - 0.5;\n    float dDot = length(gridUV);\n    float dotRadius = 0.08 + u_audioMid * 0.12;\n    float dotAlpha = smoothstep(dotRadius, dotRadius - 0.04, dDot);\n\n    float wave = texture2D(iChannel0, vec2(dist * 0.5, 0.75)).r;\n\n    vec3 col = mix(u_colorA, u_colorB, dist * 2.0);\n    col *= dotAlpha * (1.2 + wave * 0.8);\n    col += u_colorA * (0.02 / (dist + 0.02)) * (1.0 + u_audioBass * 2.5);\n\n    fragColor = vec4(col, 1.0);\n}\n", settings, "Grid Attractor (Cybernetic Sound Matrix)", "techno");
  },

  update(settings) {
    if (this.runner) {
      this.runner.update(settings);
    }
  },

  destroy() {
    if (this.runner) {
      this.runner.destroy();
      this.runner = null;
    }
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>\n<html lang="nl">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Grid Attractor (Cybernetic Sound Matrix) — SPACEFX Studio</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body, html { width: 100%; height: 100%; overflow: hidden; background: #000; font-family: system-ui, sans-serif; }\n    canvas { display: block; width: 100vw; height: 100vh; }\n  </style>\n</head>\n<body>\n  <div id="container" style="width: 100vw; height: 100vh;"></div>\n  <script>\n    ` + ShaderToyAudioEngine.toString() + `\n    ` + ShaderToyRunner.toString() + `\n    const glsl = "\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n\n    vec2 attractor = vec2(sin(iTime * 1.2) * 0.4, cos(iTime * 0.9) * 0.25);\n    if (iMouse.z > 0.0) {\n        attractor = (iMouse.xy - 0.5 * iResolution.xy) / iResolution.y;\n    }\n\n    vec2 dVec = uv - attractor;\n    float dist = length(dVec);\n    float force = (0.2 + u_audioBass * 0.6) / (dist + 0.1);\n\n    vec2 warpedUV = uv - normalize(dVec) * force * 0.15;\n\n    vec2 gridUV = fract(warpedUV * 25.0) - 0.5;\n    float dDot = length(gridUV);\n    float dotRadius = 0.08 + u_audioMid * 0.12;\n    float dotAlpha = smoothstep(dotRadius, dotRadius - 0.04, dDot);\n\n    float wave = texture2D(iChannel0, vec2(dist * 0.5, 0.75)).r;\n\n    vec3 col = mix(u_colorA, u_colorB, dist * 2.0);\n    col *= dotAlpha * (1.2 + wave * 0.8);\n    col += u_colorA * (0.02 / (dist + 0.02)) * (1.0 + u_audioBass * 2.5);\n\n    fragColor = vec4(col, 1.0);\n}\n";\n    const runner = new ShaderToyRunner(document.getElementById("container"), glsl, ` + JSON.stringify(s) + `, "Grid Attractor (Cybernetic Sound Matrix)", "techno");\n  <\\/script>\n</body>\n</html>`;
  }
};

window.EffectRegistry["shadertoy-quantum-pulse"] = {
  id: "shadertoy-quantum-pulse",
  title: "Quantum Pulse (Plasma Fusion Core)",
  category: "Audio Effect",
  tech: "Volumetric Noise Plasma & Harmonic Waves",
  github: "https://www.shadertoy.com/view/tfBXzD",
  description: "Krachtige gloeiende plasmafusiekern omringd door kosmische zonnevlammen en energieringen die ontploffen op de beats.",
  defaultSettings: {
  "musicTrack": "synthwave",
  "musicVolume": 0.6,
  "audioReactivity": 1.5,
  "speed": 1.2,
  "colorA": "#f43f5e",
  "colorB": "#38bdf8"
},
  controls: [
    {
      type: "select", key: "musicTrack", label: "Muziek Soundtrack",
      options: [{"value":"synthwave","label":"Cyberpunk Synthwave"},{"value":"ambient","label":"Deep Space Ambient"},{"value":"lofi","label":"Chillout Lofi Beat"},{"value":"techno","label":"Hypnotic Acid Techno"},{"value":"ocean","label":"Sub-aquatic Drone"},{"value":"mic","label":"🎤 Microfoon Live Input"}]
    },
    { type: "range", key: "musicVolume", label: "Muziek Volume", min: 0, max: 1, step: 0.05 },
    { type: "range", key: "audioReactivity", label: "Audio Reactiviteit", min: 0.2, max: 3.0, step: 0.1 },
    { type: "range", key: "speed", label: "Animatie Snelheid", min: 0.2, max: 3.0, step: 0.1 },
    { type: "color", key: "colorA", label: "Primaire Tint (Neon)" },
    { type: "color", key: "colorB", label: "Secundaire Tint (Glow)" }
  ],

  init(container, settings) {
    this.runner = new ShaderToyRunner(container, "\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    float r = length(uv);\n    float a = atan(uv.y, uv.x);\n\n    float plasma = sin(uv.x * 10.0 + iTime * 2.0) +\n                   sin(uv.y * 12.0 - iTime * 1.5) +\n                   sin((uv.x + uv.y) * 8.0 + iTime * 3.0);\n    plasma = sin(plasma * 2.0 + iTime);\n\n    float fft = texture2D(iChannel0, vec2(r * 0.5, 0.25)).r * u_audioBass;\n\n    float coreR = 0.22 + u_audioBass * 0.12;\n    float coreDist = abs(r - coreR);\n\n    float arc = sin(a * 12.0 + iTime * 4.0 + plasma * 3.0) * 0.03;\n    float arcGlow = 0.01 / (abs(r - (coreR + arc)) + 0.008);\n\n    vec3 col = mix(u_colorA, u_colorB, sin(a * 2.0 + iTime) * 0.5 + 0.5);\n    col *= (arcGlow + fft * 2.0);\n\n    col += mix(vec3(1.0), u_colorA, 0.3) * (0.02 / (r + 0.01)) * (1.0 + u_audioBass * 3.0);\n\n    float rays = sin(a * 16.0 + iTime) * 0.5 + 0.5;\n    col += u_colorB * rays * (0.05 + u_audioTreble * 0.2) / (r + 0.2);\n\n    fragColor = vec4(col, 1.0);\n}\n", settings, "Quantum Pulse (Plasma Fusion Core)", "synthwave");
  },

  update(settings) {
    if (this.runner) {
      this.runner.update(settings);
    }
  },

  destroy() {
    if (this.runner) {
      this.runner.destroy();
      this.runner = null;
    }
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>\n<html lang="nl">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Quantum Pulse (Plasma Fusion Core) — SPACEFX Studio</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body, html { width: 100%; height: 100%; overflow: hidden; background: #000; font-family: system-ui, sans-serif; }\n    canvas { display: block; width: 100vw; height: 100vh; }\n  </style>\n</head>\n<body>\n  <div id="container" style="width: 100vw; height: 100vh;"></div>\n  <script>\n    ` + ShaderToyAudioEngine.toString() + `\n    ` + ShaderToyRunner.toString() + `\n    const glsl = "\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\n    float r = length(uv);\n    float a = atan(uv.y, uv.x);\n\n    float plasma = sin(uv.x * 10.0 + iTime * 2.0) +\n                   sin(uv.y * 12.0 - iTime * 1.5) +\n                   sin((uv.x + uv.y) * 8.0 + iTime * 3.0);\n    plasma = sin(plasma * 2.0 + iTime);\n\n    float fft = texture2D(iChannel0, vec2(r * 0.5, 0.25)).r * u_audioBass;\n\n    float coreR = 0.22 + u_audioBass * 0.12;\n    float coreDist = abs(r - coreR);\n\n    float arc = sin(a * 12.0 + iTime * 4.0 + plasma * 3.0) * 0.03;\n    float arcGlow = 0.01 / (abs(r - (coreR + arc)) + 0.008);\n\n    vec3 col = mix(u_colorA, u_colorB, sin(a * 2.0 + iTime) * 0.5 + 0.5);\n    col *= (arcGlow + fft * 2.0);\n\n    col += mix(vec3(1.0), u_colorA, 0.3) * (0.02 / (r + 0.01)) * (1.0 + u_audioBass * 3.0);\n\n    float rays = sin(a * 16.0 + iTime) * 0.5 + 0.5;\n    col += u_colorB * rays * (0.05 + u_audioTreble * 0.2) / (r + 0.2);\n\n    fragColor = vec4(col, 1.0);\n}\n";\n    const runner = new ShaderToyRunner(document.getElementById("container"), glsl, ` + JSON.stringify(s) + `, "Quantum Pulse (Plasma Fusion Core)", "synthwave");\n  <\\/script>\n</body>\n</html>`;
  }
};
