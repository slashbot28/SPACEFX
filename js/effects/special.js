// ========================================================
// OTHER / RETRO SPECIAL EFFECTS
// Source: lindelof/awesome-web-effect
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// 1. DOOM FIRE ALGORITHM (1993 PSX DOOM)
window.EffectRegistry['doom-fire'] = {
  id: 'doom-fire',
  title: 'Classic Doom Fire Algorithm (1993)',
  category: 'Other Effect',
  tech: 'Pixel Array Decay Simulation',
  github: 'https://github.com/filipedeschamps/doom-fire-algorithm',
  description: 'De legendarische vuursimulatie uit Doom met pixel interpolatie en windafbuiging.',
  defaultSettings: {
    fireIntensity: 36,
    decay: 3,
    wind: 1,
    pixelScale: 4
  },
  controls: [
    { type: 'range', key: 'fireIntensity', label: 'Vuur Intensiteit', min: 10, max: 36, step: 1 },
    { type: 'range', key: 'decay', label: 'Verval Snelheid', min: 1, max: 6, step: 1 },
    { type: 'range', key: 'wind', label: 'Wind Richting', min: -3, max: 3, step: 1 },
    { type: 'range', key: 'pixelScale', label: 'Pixel Grootte', min: 2, max: 8, step: 1 }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.canvas = document.createElement('canvas');
    this.canvas.style.borderRadius = '12px';
    this.canvas.style.boxShadow = '0 0 40px rgba(249, 115, 22, 0.4)';
    this.canvas.style.imageRendering = 'pixelated';
    container.innerHTML = '';
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    // DOOM Fire 37-color palette
    this.palette = [
      [7,7,7], [31,7,7], [47,15,7], [71,15,7], [87,23,7], [103,31,7], [119,31,7], [143,39,7],
      [159,47,7], [175,63,7], [191,71,7], [199,71,7], [223,79,7], [223,87,7], [223,87,7],
      [215,95,7], [215,103,15], [207,111,15], [207,119,15], [207,127,15], [207,135,23], [199,135,23],
      [199,143,23], [199,151,31], [191,159,31], [191,159,31], [191,167,39], [191,167,39], [191,175,47],
      [183,175,47], [183,183,47], [183,183,55], [207,207,111], [223,223,159], [239,239,199], [255,255,255]
    ];

    this.initFire();
    this.active = true;
    this.loop();
  },
  initFire() {
    this.scale = this.settings.pixelScale;
    this.fireWidth = Math.floor(120);
    this.fireHeight = Math.floor(80);
    this.canvas.width = this.fireWidth;
    this.canvas.height = this.fireHeight;
    this.canvas.style.width = `${this.fireWidth * this.scale}px`;
    this.canvas.style.height = `${this.fireHeight * this.scale}px`;

    const total = this.fireWidth * this.fireHeight;
    this.firePixels = new Uint8Array(total);

    // Bottom row is max heat
    for (let i = 0; i < this.fireWidth; i++) {
      this.firePixels[(this.fireHeight - 1) * this.fireWidth + i] = this.settings.fireIntensity - 1;
    }

    this.imgData = this.ctx.createImageData(this.fireWidth, this.fireHeight);
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.scale !== this.settings.pixelScale) this.initFire();
  },
  loop() {
    if (!this.active) return;

    const audio = (window.AudioReactive && window.AudioReactive.active) ? window.AudioReactive.getLevels() : null;
    const baseHeat = Math.min(35, this.settings.fireIntensity - 1);
    const bottomHeat = audio ? Math.min(35, Math.floor(baseHeat + audio.bass * 14)) : baseHeat;

    // Refresh bottom row with dynamic audio heat boost
    for (let i = 0; i < this.fireWidth; i++) {
      this.firePixels[(this.fireHeight - 1) * this.fireWidth + i] = bottomHeat;
    }

    const w = this.fireWidth;
    const h = this.fireHeight;
    const pixels = this.firePixels;
    const decay = audio ? Math.max(1, this.settings.decay - Math.floor(audio.bass * 2)) : this.settings.decay;
    const wind = this.settings.wind;

    // Propagate fire upward
    for (let x = 0; x < w; x++) {
      for (let y = 1; y < h; y++) {
        const fromIdx = y * w + x;
        const heat = pixels[fromIdx];

        if (heat === 0) {
          pixels[fromIdx - w] = 0;
        } else {
          const randDecay = Math.floor(Math.random() * decay);
          const targetX = x - randDecay + wind;
          const targetY = y - 1;

          if (targetX >= 0 && targetX < w) {
            const targetIdx = targetY * w + targetX;
            pixels[targetIdx] = Math.max(0, heat - randDecay);
          }
        }
      }
    }

    // Render palette to imageData
    const data = this.imgData.data;
    for (let i = 0; i < pixels.length; i++) {
      const heat = Math.min(this.palette.length - 1, pixels[i]);
      const rgb = this.palette[heat];
      const p = i * 4;
      data[p] = rgb[0];
      data[p + 1] = rgb[1];
      data[p + 2] = rgb[2];
      data[p + 3] = heat === 0 ? 0 : 255;
    }

    this.ctx.putImageData(this.imgData, 0, 0);
    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Doom Fire Algorithm</title>
  <style>
    body { margin: 0; background: #000; display: flex; align-items: center; justify-content: center; height: 100vh; }
    canvas { width: ${120 * s.pixelScale}px; height: ${80 * s.pixelScale}px; image-rendering: pixelated; box-shadow: 0 0 50px #f97316; }
  </style>
</head>
<body>
  <canvas id="fire"></canvas>
  <script>
    const c = document.getElementById('fire'), ctx = c.getContext('2d');
    const w = 120, h = 80; c.width = w; c.height = h;
    const pixels = new Uint8Array(w * h);
    for (let i = 0; i < w; i++) pixels[(h - 1) * w + i] = 35;
    const imgData = ctx.createImageData(w, h);
    const pal = [[7,7,7],[31,7,7],[47,15,7],[71,15,7],[87,23,7],[103,31,7],[119,31,7],[143,39,7],[159,47,7],[175,63,7],[191,71,7],[199,71,7],[223,79,7],[223,87,7],[223,87,7],[215,95,7],[215,103,15],[207,111,15],[207,119,15],[207,127,15],[207,135,23],[199,135,23],[199,143,23],[199,151,31],[191,159,31],[191,159,31],[191,167,39],[191,167,39],[191,175,47],[183,175,47],[183,183,47],[183,183,55],[207,207,111],[223,223,159],[239,239,199],[255,255,255]];

    function tick() {
      for (let x = 0; x < w; x++) {
        for (let y = 1; y < h; y++) {
          const heat = pixels[y * w + x];
          const decay = Math.floor(Math.random() * ${s.decay});
          const tx = x - decay + ${s.wind};
          if (tx >= 0 && tx < w) pixels[(y - 1) * w + tx] = Math.max(0, heat - decay);
        }
      }
      for (let i = 0; i < pixels.length; i++) {
        const rgb = pal[Math.min(pal.length - 1, pixels[i])];
        const p = i * 4;
        imgData.data[p] = rgb[0]; imgData.data[p+1] = rgb[1]; imgData.data[p+2] = rgb[2]; imgData.data[p+3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);
      requestAnimationFrame(tick);
    }
    tick();
  </script>
</body>
</html>`;
  }
};

// 2. BAD TV RETRO CRT SCANLINES (WITH CUSTOM TEXT)
window.EffectRegistry['bad-tv'] = {
  id: 'bad-tv',
  title: 'Bad TV Retro CRT Distortion',
  category: 'Other Effect',
  tech: 'CSS Scanlines & Static Noise Jitter',
  github: 'https://github.com/felixturner/bad-tv-shader',
  description: 'Retro televisie beeldbuis met horizontale scanlines, roll en ruis. Met invoer voor je eigen zendernaam en berichten!',
  defaultSettings: {
    customTitle: 'GEERT TV',
    customSubtitle: '[VCR_PLAY] CH-04 STEREO',
    customFooter: 'TRACKING AUTO OK // 1994',
    textColor: '#00ff66',
    scanlineDensity: 3
  },
  controls: [
    { type: 'text', key: 'customTitle', label: '📺 Zendernaam / Titel', placeholder: 'Bijv. GEERT TV' },
    { type: 'text', key: 'customSubtitle', label: '📼 Subtitel / Tijd', placeholder: '[VCR_PLAY] LIVE' },
    { type: 'text', key: 'customFooter', label: '📟 Onderschrift / Status', placeholder: 'SIGNAL OK' },
    { type: 'color', key: 'textColor', label: 'Phosphor Gloed Kleur' },
    { type: 'range', key: 'scanlineDensity', label: 'Scanline Hoogte (px)', min: 2, max: 6, step: 1 }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
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
  },
  render() {
    const s = this.settings;
    this.wrapper.innerHTML = `
      <!-- Quick on-stage text editor -->
      <div style="display: flex; gap: 8px; align-items: center; max-width: 520px; width: 90%; z-index: 5;">
        <input type="text" id="tv-live-input" value="${s.customTitle || 'GEERT TV'}" placeholder="Typ hier je eigen TV zendernaam..."
          style="flex: 1; height: 38px; background: #111827; border: 1px solid ${s.textColor}; border-radius: 8px; color: ${s.textColor}; padding: 0 14px; font-size: 0.95rem; font-family: var(--font-mono); font-weight: 700; outline: none; box-shadow: 0 0 10px ${s.textColor}33;">
      </div>

      <div class="bad-tv-screen" id="tv-screen" style="box-shadow: 0 0 50px ${s.textColor}33;">
        <div class="bad-tv-content" id="tv-content" style="color: ${s.textColor}; text-shadow: 0 0 10px ${s.textColor};">
          <div id="tv-disp-title" style="font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; letter-spacing: 2px;">${s.customTitle || 'GEERT TV'}</div>
          <div id="tv-disp-sub" style="font-size: 1rem; opacity: 0.85;">${s.customSubtitle || '[VCR_PLAY] CH-04 STEREO'}</div>
          <div id="tv-disp-foot" style="font-size: 0.82rem; margin-top: 14px; opacity: 0.7;">${s.customFooter || 'TRACKING AUTO OK // 1994'}</div>
        </div>
      </div>
    `;

    const liveInp = this.wrapper.querySelector('#tv-live-input');
    const dispTitle = this.wrapper.querySelector('#tv-disp-title');
    liveInp.addEventListener('input', (e) => {
      this.settings.customTitle = e.target.value;
      dispTitle.textContent = e.target.value || 'GEERT TV';
      // Sync with inspector input if present
      const inspInp = document.getElementById('input-customTitle');
      if (inspInp && inspInp !== document.activeElement) inspInp.value = e.target.value;
    });
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    const s = this.settings;
    const dispTitle = this.wrapper.querySelector('#tv-disp-title');
    const dispSub = this.wrapper.querySelector('#tv-disp-sub');
    const dispFoot = this.wrapper.querySelector('#tv-disp-foot');
    const liveInp = this.wrapper.querySelector('#tv-live-input');
    const screen = this.wrapper.querySelector('#tv-screen');
    const content = this.wrapper.querySelector('#tv-content');

    if (dispTitle) dispTitle.textContent = s.customTitle || 'GEERT TV';
    if (dispSub) dispSub.textContent = s.customSubtitle || '[VCR_PLAY] CH-04 STEREO';
    if (dispFoot) dispFoot.textContent = s.customFooter || 'TRACKING AUTO OK // 1994';
    if (liveInp && document.activeElement !== liveInp) liveInp.value = s.customTitle || '';
    if (screen) screen.style.boxShadow = `0 0 50px ${s.textColor}33`;
    if (content) {
      content.style.color = s.textColor;
      content.style.textShadow = `0 0 10px ${s.textColor}`;
    }
  },
  destroy() {},
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Bad TV Retro CRT: ${s.customTitle || 'GEERT TV'}</title>
  <style>
    body { margin: 0; background: #000; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: monospace; }
    .screen {
      position: relative; width: 520px; height: 320px; background: #050505; border-radius: 16px;
      overflow: hidden; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 45px ${s.textColor}44;
    }
    .screen::before {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.4) 50%),
                  linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06));
      background-size: 100% ${s.scanlineDensity}px, 6px 100%; pointer-events: none; z-index: 2;
    }
    .content {
      color: ${s.textColor}; text-shadow: 0 0 10px ${s.textColor}; text-align: center;
      animation: flick 0.15s infinite;
    }
    @keyframes flick { 0% { opacity: 0.95; } 50% { opacity: 1; } 100% { opacity: 0.93; } }
  </style>
</head>
<body>
  <div class="screen">
    <div class="content">
      <h1 style="font-size: 2.2rem; margin-bottom: 6px;">${s.customTitle || 'GEERT TV'}</h1>
      <p style="font-size: 1rem; margin: 0;">${s.customSubtitle || '[VCR_PLAY] LIVE'}</p>
      <p style="font-size: 0.8rem; margin-top: 10px; opacity: 0.7;">${s.customFooter || 'TRACKING OK'}</p>
    </div>
  </div>
</body>
</html>`;
  }
};

// 3. FROSTED GLASS STUDIO (WITH CUSTOM TEXT)
window.EffectRegistry['frosted-glass'] = {
  id: 'frosted-glass',
  title: 'Frosted Glass Studio (Glassmorphism)',
  category: 'Other Effect',
  tech: 'CSS backdrop-filter: blur()',
  github: 'https://github.com/adriancarriger/frosted-glass',
  description: 'Moderne glasachtige interface met real-time aanpasbare blur, reflectie en jouw eigen titel en tekst.',
  defaultSettings: {
    customTitle: '💎 Glassmorphism UI',
    customSubtitle: 'Luxe matglas element met live aanpasbare backdrop filtering.',
    blur: 24,
    opacity: 0.15,
    borderGlow: 0.25,
    borderRadius: 20
  },
  controls: [
    { type: 'text', key: 'customTitle', label: 'Titel Tekst', placeholder: 'Bijv. Geert Design Studio' },
    { type: 'text', key: 'customSubtitle', label: 'Beschrijving Tekst', placeholder: 'Omschrijving...' },
    { type: 'range', key: 'blur', label: 'Blur Sterkte (px)', min: 4, max: 60, step: 2 },
    { type: 'range', key: 'opacity', label: 'Glas Wit-Transparantie', min: 0.05, max: 0.6, step: 0.05 },
    { type: 'range', key: 'borderGlow', label: 'Rand Reflectie', min: 0.05, max: 0.6, step: 0.05 },
    { type: 'range', key: 'borderRadius', label: 'Hoek Afronding (px)', min: 4, max: 40, step: 2 }
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
    this.wrapper.style.position = 'relative';

    this.wrapper.innerHTML = `
      <!-- Colorful abstract spheres behind glass -->
      <div style="position: absolute; width: 220px; height: 220px; border-radius: 50%; background: #3b82f6; filter: blur(30px); top: 15%; left: 25%;"></div>
      <div style="position: absolute; width: 200px; height: 200px; border-radius: 50%; background: #ec4899; filter: blur(30px); bottom: 15%; right: 25%;"></div>

      <div class="frosted-glass-box" id="glass-box" style="
        position: relative; z-index: 5;
        backdrop-filter: blur(${this.settings.blur}px);
        -webkit-backdrop-filter: blur(${this.settings.blur}px);
        background: rgba(255, 255, 255, ${this.settings.opacity});
        border: 1px solid rgba(255, 255, 255, ${this.settings.borderGlow});
        border-radius: ${this.settings.borderRadius}px;
      ">
        <h3 id="glass-title" style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">${this.settings.customTitle || '💎 Glassmorphism UI'}</h3>
        <p id="glass-sub" style="font-size: 0.9rem; color: rgba(255,255,255,0.85); line-height: 1.6;">${this.settings.customSubtitle || 'Luxe matglas element met live aanpasbare backdrop filtering.'}</p>
      </div>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);
    this.box = this.wrapper.querySelector('#glass-box');
    this.titleEl = this.wrapper.querySelector('#glass-title');
    this.subEl = this.wrapper.querySelector('#glass-sub');
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.box) {
      this.box.style.backdropFilter = `blur(${this.settings.blur}px)`;
      this.box.style.webkitBackdropFilter = `blur(${this.settings.blur}px)`;
      this.box.style.background = `rgba(255, 255, 255, ${this.settings.opacity})`;
      this.box.style.borderColor = `rgba(255, 255, 255, ${this.settings.borderGlow})`;
      this.box.style.borderRadius = `${this.settings.borderRadius}px`;
    }
    if (this.titleEl) this.titleEl.textContent = this.settings.customTitle || '💎 Glassmorphism UI';
    if (this.subEl) this.subEl.textContent = this.settings.customSubtitle || 'Luxe matglas element met live aanpasbare backdrop filtering.';
  },
  destroy() {},
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>${s.customTitle || 'Frosted Glass Effect'}</title>
  <style>
    body {
      margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
      background: radial-gradient(circle at 30% 30%, #3b82f6, #090d16 70%); font-family: sans-serif;
    }
    .glass {
      padding: 40px 60px;
      backdrop-filter: blur(${s.blur}px);
      -webkit-backdrop-filter: blur(${s.blur}px);
      background: rgba(255, 255, 255, ${s.opacity});
      border: 1px solid rgba(255, 255, 255, ${s.borderGlow});
      border-radius: ${s.borderRadius}px;
      color: white; text-align: center;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
      max-width: 440px;
    }
  </style>
</head>
<body>
  <div class="glass">
    <h2>${s.customTitle || '💎 Frosted Glass'}</h2>
    <p>${s.customSubtitle || 'Modern ultra-crisp glassmorphism element.'}</p>
  </div>
</body>
</html>`;
  }
};

