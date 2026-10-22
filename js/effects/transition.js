// ========================================================
// TRANSITION EFFECTS
// Source: lindelof/awesome-web-effect
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// 1. GLITCH TRANSITION SLIDESHOW
window.EffectRegistry['glitch-transition'] = {
  id: 'glitch-transition',
  title: 'Cyber Glitch Transition Slideshow (Eigen Tag / Tekst)',
  category: 'Transition Effect',
  tech: 'CSS Keyframe Slicing & RGB Shift',
  github: 'https://github.com/codrops/GlitchSlideshow',
  description: 'Cyberpunk glitch overgang tussen meerdere scènes met chromatische RGB-aberratie, slice offsets en jouw eigen cyber-badge.',
  defaultSettings: {
    customGlitchTag: 'CYBER_SECURITY // GEERT',
    intensity: 18,
    intervalSpeed: 3,
    rgbSplit: true
  },
  controls: [
    { type: 'text', key: 'customGlitchTag', label: 'Glitch Tag / Codewoord', placeholder: 'CYBER_SECURITY // GEERT' },
    { type: 'range', key: 'intensity', label: 'Glitch Offset (px)', min: 6, max: 45, step: 2 },
    { type: 'range', key: 'intervalSpeed', label: 'Wissel Cyclus (sec)', min: 1.5, max: 8, step: 0.5 },
    { type: 'switch', key: 'rgbSplit', label: 'RGB Chromatic Aberration' },
    { type: 'trigger', key: 'triggerGlitchNext', label: '⚡ Glitch Naar Volgende Scène' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.currentSlide = 0;

    this.slides = [
      {
        title: '🌆 SCENE 01: NEO TOKYO',
        sub: 'Sector 7 Neon Skyline',
        bg: 'linear-gradient(135deg, #1e1b4b 0%, #31104b 50%, #4a044e 100%)',
        accent: '#06b6d4',
        icon: '🏙️'
      },
      {
        title: '🧬 SCENE 02: NEURAL CORE',
        sub: 'Quantum Data Highway',
        bg: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #065f46 100%)',
        accent: '#10b981',
        icon: '💾'
      },
      {
        title: '🛸 SCENE 03: HYPER SINGULARITY',
        sub: 'Sub-space Event Horizon',
        bg: 'linear-gradient(135deg, #431407 0%, #7c2d12 50%, #991b1b 100%)',
        accent: '#f59e0b',
        icon: '🌌'
      }
    ];

    this.wrapper = document.createElement('div');
    this.wrapper.style.display = 'flex';
    this.wrapper.style.flexDirection = 'column';
    this.wrapper.style.alignItems = 'center';
    this.wrapper.style.justifyContent = 'center';
    this.wrapper.style.gap = '16px';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';

    this.render();
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.startAutoTransition();
  },
  render() {
    const cur = this.slides[this.currentSlide];
    this.wrapper.innerHTML = `
      <div style="font-size: 0.88rem; color: var(--accent-cyan); font-weight: 600;">
        ⚡ Slideshow met automatische glitch-transities (of klik op het scherm)
      </div>

      <div id="glitch-box" style="
        position: relative; width: 500px; max-width: 90%; height: 320px;
        border-radius: 14px; overflow: hidden; box-shadow: 0 20px 45px rgba(0,0,0,0.8);
        border: 1px solid rgba(255,255,255,0.12); cursor: pointer; user-select: none;
      ">
        <!-- Main active slide -->
        <div id="slide-main" style="
          position: absolute; inset: 0; background: ${cur.bg};
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          color: #fff; font-family: var(--font-sans);
        ">
          <div style="font-size: 3.5rem; filter: drop-shadow(0 0 20px ${cur.accent});">${cur.icon}</div>
          <div style="font-size: 1.4rem; font-weight: 800; margin-top: 10px; color: ${cur.accent}; text-shadow: 0 0 15px ${cur.accent}; font-family: var(--font-mono);">${cur.title}</div>
          <div style="font-size: 0.88rem; color: #cbd5e1; margin-top: 4px;">${cur.sub}</div>
          <div id="glitch-custom-tag" style="margin-top: 12px; font-size: 0.76rem; font-family: var(--font-mono); letter-spacing: 2px; color: ${cur.accent}; background: rgba(0,0,0,0.6); padding: 3px 10px; border-radius: 4px; border: 1px solid ${cur.accent};">
            [${this.settings.customGlitchTag || 'CYBER_SECURITY // GEERT'}]
          </div>
        </div>

        <!-- Glitch slice layers (RGB channels & horizontal tears) -->
        <div id="glitch-r" style="position: absolute; inset: 0; background: ${cur.bg}; mix-blend-mode: screen; opacity: 0; pointer-events: none; filter: drop-shadow(5px 0 0 #ef4444);"></div>
        <div id="glitch-b" style="position: absolute; inset: 0; background: ${cur.bg}; mix-blend-mode: screen; opacity: 0; pointer-events: none; filter: drop-shadow(-5px 0 0 #06b6d4);"></div>
        <div id="glitch-strip" style="position: absolute; inset: 0; pointer-events: none; opacity: 0; background: rgba(255,255,255,0.15);"></div>

        <!-- Scanlines overlay -->
        <div style="position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px);"></div>
      </div>

      <div style="display: flex; gap: 12px;">
        <button id="btn-glitch-prev" class="btn-action" style="padding: 6px 14px; font-size: 0.82rem;">◀ Vorige</button>
        <button id="btn-glitch-manual" class="btn-action btn-primary" style="padding: 6px 16px; font-size: 0.82rem;">
          ⚡ Glitch Naar Volgende Slide ▶
        </button>
      </div>
    `;

    this.box = this.wrapper.querySelector('#glitch-box');
    this.slideMain = this.wrapper.querySelector('#slide-main');
    this.layerR = this.wrapper.querySelector('#glitch-r');
    this.layerB = this.wrapper.querySelector('#glitch-b');
    this.layerStrip = this.wrapper.querySelector('#glitch-strip');

    this.box.addEventListener('click', () => this.doTransition(1));
    this.wrapper.querySelector('#btn-glitch-manual').addEventListener('click', () => this.doTransition(1));
    this.wrapper.querySelector('#btn-glitch-prev').addEventListener('click', () => this.doTransition(-1));
  },
  doTransition(direction = 1) {
    if (this.isGlitching) return;
    this.isGlitching = true;

    const off = this.settings.intensity;
    const nextIdx = (this.currentSlide + direction + this.slides.length) % this.slides.length;
    const next = this.slides[nextIdx];

    // Heavy glitch burst sequence
    this.layerR.style.opacity = '0.9';
    this.layerB.style.opacity = '0.9';
    this.layerStrip.style.opacity = '0.8';

    // Step 1: displacement & tear
    this.layerR.style.transform = `translate(${off}px, -4px) skewX(-4deg)`;
    this.layerB.style.transform = `translate(-${off}px, 4px) skewX(4deg)`;
    this.layerStrip.style.clipPath = `polygon(0 20%, 100% 20%, 100% 45%, 0 45%)`;

    setTimeout(() => {
      // Step 2: Swap content halfway through glitch
      this.currentSlide = nextIdx;
      this.slideMain.style.background = next.bg;
      this.slideMain.querySelector('div:nth-child(1)').textContent = next.icon;
      this.slideMain.querySelector('div:nth-child(1)').style.filter = `drop-shadow(0 0 20px ${next.accent})`;
      const t = this.slideMain.querySelector('div:nth-child(2)');
      t.textContent = next.title;
      t.style.color = next.accent;
      t.style.textShadow = `0 0 15px ${next.accent}`;
      this.slideMain.querySelector('div:nth-child(3)').textContent = next.sub;

      this.layerR.style.transform = `translate(-${off * 0.7}px, 6px) skewX(6deg)`;
      this.layerB.style.transform = `translate(${off * 0.7}px, -6px) skewX(-6deg)`;
      this.layerStrip.style.clipPath = `polygon(0 60%, 100% 60%, 100% 85%, 0 85%)`;
    }, 120);

    setTimeout(() => {
      // Step 3: Settle down
      this.layerR.style.opacity = '0';
      this.layerB.style.opacity = '0';
      this.layerStrip.style.opacity = '0';
      this.layerR.style.transform = 'translate(0, 0)';
      this.layerB.style.transform = 'translate(0, 0)';
      this.isGlitching = false;
    }, 280);
  },
  startAutoTransition() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.doTransition(1);
    }, this.settings.intervalSpeed * 1000);
  },
  triggerGlitchNext() {
    this.doTransition(1);
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    const tag = this.wrapper ? this.wrapper.querySelector('#glitch-custom-tag') : null;
    if (tag) tag.textContent = `[${this.settings.customGlitchTag || 'CYBER_SECURITY // GEERT'}]`;
    this.startAutoTransition();
  },
  destroy() {
    clearInterval(this.interval);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Cyber Glitch Transition Slideshow</title>
  <style>
    body { margin: 0; background: #080a0f; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: monospace; }
    .box { position: relative; width: 500px; height: 320px; border-radius: 14px; overflow: hidden; cursor: pointer; }
    .slide { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; }
    .glitch-r { position: absolute; inset: 0; opacity: 0; filter: drop-shadow(6px 0 0 #ef4444); pointer-events: none; }
    .glitch-b { position: absolute; inset: 0; opacity: 0; filter: drop-shadow(-6px 0 0 #06b6d4); pointer-events: none; }
  </style>
</head>
<body>
  <div class="box" id="box">
    <div class="slide" id="slide" style="background: #1e1b4b;"><h2>SCENE 1: NEO TOKYO</h2></div>
    <div class="glitch-r" id="gr"></div>
    <div class="glitch-b" id="gb"></div>
  </div>
  <script>
    const box = document.getElementById('box'), slide = document.getElementById('slide');
    const gr = document.getElementById('gr'), gb = document.getElementById('gb');
    const scenes = ['linear-gradient(135deg, #1e1b4b, #4a044e)', 'linear-gradient(135deg, #022c22, #065f46)', 'linear-gradient(135deg, #431407, #991b1b)'];
    let idx = 0;
    function glitch() {
      gr.style.opacity = '0.9'; gb.style.opacity = '0.9';
      gr.style.transform = 'translate(${s.intensity}px, -4px)';
      gb.style.transform = 'translate(-${s.intensity}px, 4px)';
      setTimeout(() => {
        idx = (idx + 1) % scenes.length;
        slide.style.background = scenes[idx];
        slide.innerHTML = '<h2>SCENE ' + (idx + 1) + '</h2>';
      }, 120);
      setTimeout(() => { gr.style.opacity = '0'; gb.style.opacity = '0'; }, 260);
    }
    box.addEventListener('click', glitch);
    setInterval(glitch, ${s.intervalSpeed * 1000});
  </script>
</body>
</html>`;
  }
};

// 2. CIRCULAR CLIP-PATH WIPE
window.EffectRegistry['circle-wipe'] = {
  id: 'circle-wipe',
  title: 'Circle Clip-Path Wipe',
  category: 'Transition Effect',
  tech: 'CSS clip-path: circle()',
  github: 'https://github.com/CodyHouse/image-mask-effect',
  description: 'Rond masker dat openvouwt vanuit het muispunt of midden.',
  defaultSettings: {
    duration: 1.2,
    reverse: false
  },
  controls: [
    { type: 'range', key: 'duration', label: 'Overgangsduur (sec)', min: 0.5, max: 3, step: 0.1 },
    { type: 'trigger', key: 'triggerWipe', label: '▶ Speel Wipe Af' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.wrapper = document.createElement('div');
    this.wrapper.style.display = 'flex';
    this.wrapper.style.alignItems = 'center';
    this.wrapper.style.justifyContent = 'center';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';

    this.wrapper.innerHTML = `
      <div id="wipe-box" style="position: relative; width: 500px; height: 320px; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6); cursor: pointer;">
        <!-- Achtergrond slide -->
        <div style="position: absolute; inset: 0; background: linear-gradient(135deg, #1e3a8a, #0f172a); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.5rem; font-weight: bold;">
          <span>SCENE 1: Deep Ocean 🌊</span>
        </div>
        <!-- Bovenliggende ge-clipte slide -->
        <div id="wipe-layer" style="position: absolute; inset: 0; background: linear-gradient(135deg, #be123c, #fbbf24); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.5rem; font-weight: bold; clip-path: circle(0% at 50% 50%); transition: clip-path ${this.settings.duration}s cubic-bezier(0.77, 0, 0.175, 1);">
          <span>SCENE 2: Solar Flare ☀️</span>
        </div>
      </div>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.box = this.wrapper.querySelector('#wipe-box');
    this.layer = this.wrapper.querySelector('#wipe-layer');
    this.revealed = false;

    this.box.addEventListener('click', (e) => {
      const rect = this.box.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      this.toggleWipe(px, py);
    });
  },
  toggleWipe(x = 50, y = 50) {
    this.revealed = !this.revealed;
    this.layer.style.transition = `clip-path ${this.settings.duration}s cubic-bezier(0.77, 0, 0.175, 1)`;
    if (this.revealed) {
      this.layer.style.clipPath = `circle(150% at ${x}% ${y}%)`;
    } else {
      this.layer.style.clipPath = `circle(0% at ${x}% ${y}%)`;
    }
  },
  triggerWipe() {
    this.toggleWipe();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.layer) {
      this.layer.style.transition = `clip-path ${this.settings.duration}s cubic-bezier(0.77, 0, 0.175, 1)`;
    }
  },
  destroy() {},
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Circle Wipe Transition</title>
  <style>
    body { margin: 0; background: #000; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
    .box { position: relative; width: 500px; height: 320px; border-radius: 16px; overflow: hidden; cursor: pointer; }
    .s1 { position: absolute; inset: 0; background: #1e3a8a; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; }
    .s2 {
      position: absolute; inset: 0; background: #be123c; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;
      clip-path: circle(0% at 50% 50%); transition: clip-path ${s.duration}s cubic-bezier(0.77, 0, 0.175, 1);
    }
    .s2.open { clip-path: circle(150% at 50% 50%); }
  </style>
</head>
<body>
  <div class="box" onclick="document.getElementById('s2').classList.toggle('open')">
    <div class="s1">Klik om te wisselen</div>
    <div class="s2" id="s2">Onthuld! ✨</div>
  </div>
</body>
</html>`;
  }
};

