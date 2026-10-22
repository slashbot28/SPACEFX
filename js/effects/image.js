// ========================================================
// IMAGE EFFECTS
// Source: lindelof/awesome-web-effect
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// 1. IMAGE MAGNIFYING GLASS
window.EffectRegistry['magnifier-glass'] = {
  id: 'magnifier-glass',
  title: 'Image Magnifying Glass',
  category: 'Image Effect',
  tech: 'DOM & Loupe Zoom',
  github: 'https://github.com/mark-rolich/Magnifier.js',
  description: 'Vergrootglas loupe die details van een afbeelding uitvergroot bij hover.',
  defaultSettings: {
    zoom: 2.5,
    lensSize: 150,
    borderColor: '#38bdf8'
  },
  controls: [
    { type: 'range', key: 'zoom', label: 'Vergrotingsfactor', min: 1.5, max: 5, step: 0.5 },
    { type: 'range', key: 'lensSize', label: 'Loupe Diameter (px)', min: 80, max: 240, step: 10 },
    { type: 'color', key: 'borderColor', label: 'Rand Kleur' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.imgUrl = 'banner.jpg';

    this.wrapper = document.createElement('div');
    this.wrapper.style.display = 'flex';
    this.wrapper.style.alignItems = 'center';
    this.wrapper.style.justifyContent = 'center';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';

    this.wrapper.innerHTML = `
      <div class="image-stage-wrap" id="mag-wrap">
        <img id="mag-target" src="${this.imgUrl}" alt="Effect Demo">
        <div id="mag-lens" class="magnifier-lens" style="
          width: ${this.settings.lensSize}px;
          height: ${this.settings.lensSize}px;
          border-color: ${this.settings.borderColor};
          background-image: url('${this.imgUrl}');
        "></div>
      </div>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.target = this.wrapper.querySelector('#mag-target');
    this.lens = this.wrapper.querySelector('#mag-lens');

    this.onMouseMove = (e) => {
      const rect = this.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        this.lens.style.display = 'none';
        return;
      }

      this.lens.style.display = 'block';
      const lensHalf = this.settings.lensSize / 2;
      this.lens.style.left = `${x - lensHalf}px`;
      this.lens.style.top = `${y - lensHalf}px`;

      const zoom = this.settings.zoom;
      this.lens.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
      this.lens.style.backgroundPosition = `-${x * zoom - lensHalf}px -${y * zoom - lensHalf}px`;
    };

    this.onMouseLeave = () => {
      this.lens.style.display = 'none';
    };

    this.target.addEventListener('mousemove', this.onMouseMove);
    this.target.addEventListener('mouseleave', this.onMouseLeave);
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.lens) {
      this.lens.style.width = `${this.settings.lensSize}px`;
      this.lens.style.height = `${this.settings.lensSize}px`;
      this.lens.style.borderColor = this.settings.borderColor;
    }
  },
  destroy() {},
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Magnifying Glass Effect</title>
  <style>
    body { margin: 0; background: #0c0f18; display: flex; align-items: center; justify-content: center; height: 100vh; }
    .wrap { position: relative; max-width: 500px; border-radius: 12px; overflow: hidden; cursor: none; }
    .wrap img { display: block; width: 100%; height: auto; }
    .lens {
      position: absolute; width: ${s.lensSize}px; height: ${s.lensSize}px; border-radius: 50%;
      border: 3px solid ${s.borderColor}; pointer-events: none; display: none;
      box-shadow: 0 0 25px rgba(0,0,0,0.6);
    }
  </style>
</head>
<body>
  <div class="wrap" id="wrap">
    <img id="img" src="banner.jpg" alt="demo">
    <div id="lens" class="lens" style="background-image: url('banner.jpg');"></div>
  </div>
  <script>
    const img = document.getElementById('img'), lens = document.getElementById('lens');
    const zoom = ${s.zoom}, size = ${s.lensSize};
    img.addEventListener('mousemove', e => {
      const r = img.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      lens.style.display = 'block';
      lens.style.left = (x - size/2) + 'px';
      lens.style.top = (y - size/2) + 'px';
      lens.style.backgroundSize = (r.width * zoom) + 'px ' + (r.height * zoom) + 'px';
      lens.style.backgroundPosition = '-' + (x * zoom - size/2) + 'px -' + (y * zoom - size/2) + 'px';
    });
    img.addEventListener('mouseleave', () => lens.style.display = 'none');
  </script>
</body>
</html>`;
  }
};

// 2. HEAT DISTORTION HAZE
window.EffectRegistry['heat-distortion'] = {
  id: 'heat-distortion',
  title: 'Heat Distortion Wave Haze (Eigen Tekst)',
  category: 'Image Effect',
  tech: 'Canvas 2D Wave Refraction Shimmer',
  github: 'https://github.com/lbebber/HeatDistortionEffect',
  description: 'Atmosferische hittegolf breking over een sfeervol woestijnlandschap met aanpasbare hitte-trilling en eigen titel.',
  defaultSettings: {
    customTitle: 'HOT DESERT MIRAGE',
    intensity: 14,
    speed: 1.8,
    frequency: 0.05
  },
  controls: [
    { type: 'text', key: 'customTitle', label: 'Mirage Landschap Titel', placeholder: 'HOT DESERT MIRAGE' },
    { type: 'range', key: 'intensity', label: 'Hitte Trilling Kracht (px)', min: 2, max: 40, step: 2 },
    { type: 'range', key: 'speed', label: 'Haze Snelheid', min: 0.5, max: 4, step: 0.2 },
    { type: 'range', key: 'frequency', label: 'Golf Frequentie', min: 0.01, max: 0.1, step: 0.01 }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.wrapper = document.createElement('div');
    this.wrapper.style.display = 'flex';
    this.wrapper.style.flexDirection = 'column';
    this.wrapper.style.alignItems = 'center';
    this.wrapper.style.justifyContent = 'center';
    this.wrapper.style.gap = '14px';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';

    this.canvas = document.createElement('canvas');
    this.canvas.width = 560;
    this.canvas.height = 350;
    this.canvas.style.maxWidth = '90%';
    this.canvas.style.maxHeight = '75%';
    this.canvas.style.borderRadius = '14px';
    this.canvas.style.boxShadow = '0 20px 45px rgba(249, 115, 22, 0.35)';
    this.canvas.style.border = '1px solid rgba(249, 115, 22, 0.4)';

    const label = document.createElement('div');
    label.style.color = '#f97316';
    label.style.fontWeight = '600';
    label.style.fontSize = '0.88rem';
    label.textContent = '🔥 Real-Time Atmosferische Hittegolf Simulatie';

    this.wrapper.appendChild(label);
    this.wrapper.appendChild(this.canvas);
    container.innerHTML = '';
    container.appendChild(this.wrapper);
    this.ctx = this.canvas.getContext('2d');

    // Create self-contained high-detail offscreen source artwork
    this.offscreen = document.createElement('canvas');
    this.offscreen.width = 560;
    this.offscreen.height = 350;
    this.offCtx = this.offscreen.getContext('2d');
    this.renderSourceGraphic();

    this.time = 0;
    this.active = true;
    this.loop();
  },
  renderSourceGraphic() {
    const ctx = this.offCtx;
    const w = 560, h = 350;

    // Sunset gradient sky
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.7);
    sky.addColorStop(0, '#090d16');
    sky.addColorStop(0.3, '#31104b');
    sky.addColorStop(0.7, '#831843');
    sky.addColorStop(1, '#ea580c');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Glowing Desert Sun
    const sunGrad = ctx.createRadialGradient(280, 160, 10, 280, 160, 95);
    sunGrad.addColorStop(0, '#fef08a');
    sunGrad.addColorStop(0.4, '#f97316');
    sunGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(280, 160, 95, 0, Math.PI * 2);
    ctx.fill();

    // Pyramid / Desert Dunes
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.moveTo(80, 230);
    ctx.lineTo(210, 120);
    ctx.lineTo(340, 230);
    ctx.fill();

    ctx.fillStyle = '#292524';
    ctx.beginPath();
    ctx.moveTo(250, 240);
    ctx.lineTo(380, 130);
    ctx.lineTo(510, 240);
    ctx.fill();

    // Hot desert ground
    const ground = ctx.createLinearGradient(0, 220, 0, h);
    ground.addColorStop(0, '#c2410c');
    ground.addColorStop(0.5, '#7c2d12');
    ground.addColorStop(1, '#0c0a09');
    ctx.fillStyle = ground;
    ctx.fillRect(0, 220, w, h - 220);

    // Horizon glowing mirage line
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#f97316';
    ctx.beginPath();
    ctx.moveTo(0, 220);
    ctx.lineTo(w, 220);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Palm silhouettes
    ctx.fillStyle = '#0c0a09';
    ctx.fillRect(430, 170, 8, 55);
    ctx.beginPath();
    ctx.arc(434, 170, 26, Math.PI, Math.PI * 2);
    ctx.fill();

    // Title text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 26px sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#000';
    ctx.fillText(this.settings.customTitle || 'HOT DESERT MIRAGE', 280, 60);
    ctx.shadowBlur = 0;
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    this.renderSourceGraphic();
  },
  loop() {
    if (!this.active) return;
    this.time += 0.05 * this.settings.speed;

    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    const amp = this.settings.intensity;
    const freq = this.settings.frequency;

    // Fast, ultra-smooth slice-based displacement wave rendering (60 FPS, no cross-origin taints)
    const sliceHeight = 2;
    for (let y = 0; y < h; y += sliceHeight) {
      // Stronger heat haze closer to the ground
      const heatFactor = Math.pow(y / h, 1.4);
      const shiftX = Math.sin(y * freq + this.time) * amp * heatFactor +
                     Math.cos(y * freq * 2.3 - this.time * 0.8) * (amp * 0.4) * heatFactor;
      const shiftY = Math.sin(this.time * 2 + y * 0.05) * 1.5 * heatFactor;

      ctx.drawImage(
        this.offscreen,
        0, y, w, sliceHeight,
        shiftX, y + shiftY, w, sliceHeight
      );
    }

    // Atmospheric warm shimmer overlay
    const shimmerAlpha = Math.sin(this.time * 3) * 0.04 + 0.06;
    ctx.fillStyle = `rgba(249, 115, 22, ${shimmerAlpha})`;
    ctx.fillRect(0, 0, w, h);

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
  <title>Heat Distortion Haze</title>
  <style>
    body { margin: 0; background: #0c0a14; display: flex; align-items: center; justify-content: center; height: 100vh; }
    canvas { max-width: 90vw; border-radius: 14px; box-shadow: 0 15px 35px rgba(249,115,22,0.4); }
  </style>
</head>
<body>
  <canvas id="heat" width="560" height="350"></canvas>
  <script>
    const canvas = document.getElementById('heat');
    const ctx = canvas.getContext('2d');
    const off = document.createElement('canvas');
    off.width = 560; off.height = 350;
    const offCtx = off.getContext('2d');

    // Draw desert sunset
    const sky = offCtx.createLinearGradient(0,0,0,250);
    sky.addColorStop(0, '#090d16'); sky.addColorStop(0.7, '#831843'); sky.addColorStop(1, '#ea580c');
    offCtx.fillStyle = sky; offCtx.fillRect(0,0,560,350);
    offCtx.fillStyle = '#f97316'; offCtx.beginPath(); offCtx.arc(280, 160, 80, 0, Math.PI*2); offCtx.fill();
    offCtx.fillStyle = '#1c1917';
    offCtx.beginPath(); offCtx.moveTo(80, 230); offCtx.lineTo(210, 130); offCtx.lineTo(340, 230); offCtx.fill();
    offCtx.fillStyle = '#7c2d12'; offCtx.fillRect(0, 220, 560, 130);

    let t = 0;
    function render() {
      t += 0.05 * ${s.speed};
      ctx.clearRect(0, 0, 560, 350);
      for (let y = 0; y < 350; y += 2) {
        const factor = Math.pow(y / 350, 1.4);
        const shiftX = Math.sin(y * ${s.frequency} + t) * ${s.intensity} * factor;
        ctx.drawImage(off, 0, y, 560, 2, shiftX, y, 560, 2);
      }
      requestAnimationFrame(render);
    }
    render();
  </script>
</body>
</html>`;
  }
};

// 3. KEN BURNS CINEMATIC SLIDESHOW
window.EffectRegistry['ken-burns'] = {
  id: 'ken-burns',
  title: 'Ken Burns Cinematic Motion (Eigen Tekst)',
  category: 'Image Effect',
  tech: 'CSS Keyframe Camera Pan & Zoom',
  github: 'https://github.com/nHiRanZ/react-native-kenburns-view',
  description: 'Dynamische cinematografische documentaireregio pan & zoom over meerdere scènes met eigen ondertitel.',
  defaultSettings: {
    customOverlayText: 'Cinematic Documentary Experience',
    duration: 5,
    maxZoom: 1.35
  },
  controls: [
    { type: 'text', key: 'customOverlayText', label: 'Cinematic Ondertitel / Naam', placeholder: 'Cinematic Documentary Experience' },
    { type: 'range', key: 'duration', label: 'Scène Wisseltijd (sec)', min: 3, max: 12, step: 1 },
    { type: 'range', key: 'maxZoom', label: 'Max Zoom Schaal', min: 1.15, max: 1.6, step: 0.05 },
    { type: 'trigger', key: 'triggerNextScene', label: '⏭ Volgende Scène' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.currentSceneIdx = 0;

    this.scenes = [
      {
        title: '🌌 Cosmic Nebula Deep Space',
        bg: 'radial-gradient(circle at 30% 40%, #7c3aed 0%, #1e1b4b 50%, #030712 100%)',
        icon: '🛸',
        subtitle: 'Exploring the outer Perseus arm'
      },
      {
        title: '🌅 Synthwave Neon Horizon',
        bg: 'linear-gradient(180deg, #31104b 0%, #831843 40%, #f97316 75%, #0f172a 100%)',
        icon: '🌆',
        subtitle: 'Digital grid sunset over Cyber City'
      },
      {
        title: '🏔️ Alpine Aurora Glaciers',
        bg: 'linear-gradient(135deg, #064e3b 0%, #065f46 30%, #0284c7 70%, #0f172a 100%)',
        icon: '❄️',
        subtitle: 'Pristine frozen peaks under celestial lights'
      },
      {
        title: '🔥 Solar Prominence Core',
        bg: 'radial-gradient(circle at 70% 60%, #ea580c 0%, #991b1b 50%, #09090b 100%)',
        icon: '☀️',
        subtitle: 'Surface temperature 5,500 Kelvin'
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
    this.startSlideshow();
  },
  render() {
    const cur = this.scenes[this.currentSceneIdx];
    const s = this.settings;

    this.wrapper.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; width: 520px; max-width: 90%;">
        <span id="kb-scene-title" style="color: var(--accent-cyan); font-weight: 700; font-size: 0.95rem;">${cur.title}</span>
        <span style="font-size: 0.78rem; color: #94a3b8; background: rgba(255,255,255,0.06); padding: 3px 8px; border-radius: 999px;">
          Scène ${this.currentSceneIdx + 1} / ${this.scenes.length}
        </span>
      </div>

      <div class="kenburns-container" id="kb-viewport" style="width: 520px; max-width: 90%; height: 320px; position: relative; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 45px rgba(0,0,0,0.7); border: 1px solid rgba(255,255,255,0.12);">
        <div id="kb-layer" style="
          width: 100%; height: 100%; position: absolute; inset: 0;
          background: ${cur.bg}; display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: transform ${s.duration}s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease;
          transform: scale(1) translate(0, 0);
        ">
          <div style="font-size: 4rem; filter: drop-shadow(0 0 20px rgba(255,255,255,0.4));">${cur.icon}</div>
          <div style="color: #fff; font-size: 1.4rem; font-weight: 800; margin-top: 10px; text-shadow: 0 2px 10px rgba(0,0,0,0.8);">${cur.title}</div>
          <div style="color: rgba(255,255,255,0.8); font-size: 0.85rem; margin-top: 4px;">${cur.subtitle}</div>
          <div id="kb-custom-overlay" style="margin-top: 10px; font-size: 0.78rem; font-weight: 700; letter-spacing: 1px; color: var(--accent-cyan); background: rgba(0,0,0,0.5); padding: 4px 12px; border-radius: 999px; border: 1px solid rgba(6,182,212,0.4); text-transform: uppercase;">
            ${s.customOverlayText || 'Cinematic Experience'}
          </div>
        </div>

        <!-- Vignette overlay -->
        <div style="position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle, transparent 60%, rgba(0,0,0,0.7) 100%);"></div>

        <!-- Progress bar -->
        <div style="position: absolute; bottom: 0; left: 0; height: 3px; background: var(--accent-cyan); width: 0%;" id="kb-prog"></div>
      </div>

      <div style="display: flex; gap: 12px;">
        <button id="kb-btn-prev" class="btn-action" style="padding: 6px 14px; font-size: 0.82rem;">◀ Vorige</button>
        <button id="kb-btn-next" class="btn-action btn-primary" style="padding: 6px 16px; font-size: 0.82rem;">Volgende Scène ▶</button>
      </div>
    `;

    this.layer = this.wrapper.querySelector('#kb-layer');
    this.prog = this.wrapper.querySelector('#kb-prog');

    this.wrapper.querySelector('#kb-btn-prev').addEventListener('click', () => {
      this.currentSceneIdx = (this.currentSceneIdx - 1 + this.scenes.length) % this.scenes.length;
      this.showCurrentScene();
    });

    this.wrapper.querySelector('#kb-btn-next').addEventListener('click', () => {
      this.currentSceneIdx = (this.currentSceneIdx + 1) % this.scenes.length;
      this.showCurrentScene();
    });

    this.triggerMotion();
  },
  triggerMotion() {
    if (!this.layer) return;
    const s = this.settings;
    // Animate scale and pan
    const panX = (Math.random() - 0.5) * 8;
    const panY = (Math.random() - 0.5) * 6;
    this.layer.style.transition = `transform ${s.duration}s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease`;
    this.layer.style.transform = `scale(${s.maxZoom}) translate(${panX}%, ${panY}%)`;

    if (this.prog) {
      this.prog.style.transition = 'none';
      this.prog.style.width = '0%';
      requestAnimationFrame(() => {
        this.prog.style.transition = `width ${s.duration}s linear`;
        this.prog.style.width = '100%';
      });
    }
  },
  showCurrentScene() {
    const cur = this.scenes[this.currentSceneIdx];
    this.layer.style.opacity = '0';
    setTimeout(() => {
      this.render();
      this.layer.style.opacity = '1';
    }, 400);
  },
  startSlideshow() {
    clearInterval(this.slideTimer);
    this.slideTimer = setInterval(() => {
      this.currentSceneIdx = (this.currentSceneIdx + 1) % this.scenes.length;
      this.showCurrentScene();
    }, this.settings.duration * 1000);
  },
  triggerNextScene() {
    this.currentSceneIdx = (this.currentSceneIdx + 1) % this.scenes.length;
    this.showCurrentScene();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    const ov = this.wrapper ? this.wrapper.querySelector('#kb-custom-overlay') : null;
    if (ov) ov.textContent = this.settings.customOverlayText || 'Cinematic Experience';
    this.startSlideshow();
  },
  destroy() {
    clearInterval(this.slideTimer);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Ken Burns Cinematic Slideshow</title>
  <style>
    body { margin: 0; background: #000; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
    .box { width: 520px; height: 320px; border-radius: 16px; overflow: hidden; position: relative; }
    .slide {
      position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white;
      animation: kenburns ${s.duration}s infinite alternate ease-in-out;
    }
    @keyframes kenburns {
      0% { transform: scale(1) translate(0, 0); }
      50% { transform: scale(${s.maxZoom}) translate(-3%, 2%); }
      100% { transform: scale(${s.maxZoom * 0.95}) translate(2%, -3%); }
    }
  </style>
</head>
<body>
  <div class="box">
    <div class="slide" style="background: radial-gradient(circle at 30% 40%, #7c3aed, #1e1b4b, #030712);">
      <h2 style="font-size: 2rem;">🌌 Deep Space Nebula</h2>
      <p>Continuous Ken Burns Pan & Zoom</p>
    </div>
  </div>
</body>
</html>`;
  }
};

