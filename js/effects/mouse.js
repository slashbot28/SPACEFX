// ========================================================
// MOUSE & CURSOR EFFECTS
// Source: lindelof/awesome-web-effect
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// 1. MOUSE PARTICLES BURST
window.EffectRegistry['mouse-particles'] = {
  id: 'mouse-particles',
  title: 'Mouse Particles Trail',
  category: 'Mouse Effect',
  tech: 'Canvas 2D / Particles',
  github: 'https://github.com/lindelof/react-mouse-particles',
  description: 'Sierlijk spoor van kleurrijke, oplichtende deeltjes die je muiscursor volgen.',
  defaultSettings: {
    spawnRate: 4,
    lifespan: 60,
    size: 4,
    colorScheme: 'rainbow', // rainbow, neon, fire, ice
    gravity: 0.1
  },
  controls: [
    { type: 'range', key: 'spawnRate', label: 'Deeltjes per beweging', min: 1, max: 10, step: 1 },
    { type: 'range', key: 'lifespan', label: 'Levensduur deeltjes', min: 20, max: 120, step: 5 },
    { type: 'range', key: 'size', label: 'Deeltjesgrootte', min: 1, max: 10, step: 1 },
    { type: 'select', key: 'colorScheme', label: 'Kleurenpalet', options: ['rainbow', 'neon', 'fire', 'ice'] },
    { type: 'range', key: 'gravity', label: 'Zwaartekracht', min: -0.2, max: 0.4, step: 0.05 }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    container.innerHTML = '';
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.particles = [];
    this.resize();
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);

    this.hue = 0;
    this.lastMouseMoveTime = 0;
    this.idleAngle = 0;

    this.spawnAt = (x, y) => {
      for (let i = 0; i < this.settings.spawnRate; i++) {
        let color = '#fff';
        if (this.settings.colorScheme === 'rainbow') color = `hsl(${this.hue}, 90%, 60%)`;
        else if (this.settings.colorScheme === 'neon') color = ['#3b82f6', '#ec4899', '#06b6d4', '#8b5cf6'][Math.floor(Math.random() * 4)];
        else if (this.settings.colorScheme === 'fire') color = ['#f59e0b', '#ef4444', '#fbbf24'][Math.floor(Math.random() * 3)];
        else if (this.settings.colorScheme === 'ice') color = ['#38bdf8', '#e0f2fe', '#0284c7'][Math.floor(Math.random() * 3)];

        this.particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          life: 0,
          maxLife: this.settings.lifespan,
          size: Math.random() * this.settings.size + 2,
          color
        });
      }
      this.hue = (this.hue + 4) % 360;
    };

    this.onMouseMove = (e) => {
      this.lastMouseMoveTime = Date.now();
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.spawnAt(x, y);
    };

    window.addEventListener('mousemove', this.onMouseMove);
    this.active = true;
    this.loop();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
  },
  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.width = this.canvas.offsetWidth || window.innerWidth;
    this.height = this.canvas.height = this.canvas.offsetHeight || window.innerHeight;
  },
  loop() {
    if (!this.active) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Continuous idle animation if mouse hasn't moved
    if (Date.now() - this.lastMouseMoveTime > 400) {
      this.idleAngle += 0.04;
      const cx = this.width / 2 + Math.cos(this.idleAngle) * (Math.min(this.width, 400) * 0.35);
      const cy = this.height / 2 + Math.sin(this.idleAngle * 2) * (Math.min(this.height, 300) * 0.3);
      this.spawnAt(cx, cy);
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += this.settings.gravity;
      p.life++;

      const progress = p.life / p.maxLife;
      if (progress >= 1) {
        this.particles.splice(i, 1);
        continue;
      }

      const alpha = 1 - progress;
      const currentSize = p.size * (1 - progress * 0.5);

      ctx.beginPath();
      ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Mouse Particles Trail</title>
  <style>
    body { margin: 0; background: #0a0c10; overflow: hidden; height: 100vh; }
    canvas { display: block; width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <canvas id="mouse-trail"></canvas>
  <script>
    const canvas = document.getElementById('mouse-trail');
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });

    const particles = [];
    let hue = 0;
    window.addEventListener('mousemove', e => {
      for (let i = 0; i < ${s.spawnRate}; i++) {
        particles.push({
          x: e.clientX, y: e.clientY,
          vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4,
          life: 0, maxLife: ${s.lifespan},
          size: Math.random() * ${s.size} + 2,
          color: 'hsl(' + hue + ', 90%, 60%)'
        });
      }
      hue = (hue + 4) % 360;
    });

    function loop() {
      ctx.clearRect(0, 0, w, h);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += ${s.gravity}; p.life++;
        if (p.life >= p.maxLife) { particles.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - p.life / p.maxLife), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10; ctx.shadowColor = p.color;
        ctx.globalAlpha = 1 - p.life / p.maxLife;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`;
  }
};

// 2. PARALLAX 3D TILT CARD (REACT-TILT STYLE)
window.EffectRegistry['react-tilt'] = {
  id: 'react-tilt',
  title: '3D Parallax Tilt Card (Eigen Tekst)',
  category: 'Mouse Effect',
  tech: 'CSS 3D / JS Physics',
  github: 'https://github.com/jonathandion/react-tilt',
  description: 'Vloeiend 3D kantelend interactiepaneel met dynamische lichtreflectie en jouw eigen titel & tekst.',
  defaultSettings: {
    cardIcon: '🛸',
    cardTitle: '3D Tilt Universe',
    cardSubtitle: 'Beweeg je cursor over deze kaart om een vloeiende diepte-illusie en parallax gloed te ervaren.',
    maxTilt: 25,
    perspective: 1000,
    scale: 1.05,
    glareOpacity: 0.4
  },
  controls: [
    { type: 'text', key: 'cardIcon', label: 'Icoon of Emoji', placeholder: '🛸' },
    { type: 'text', key: 'cardTitle', label: 'Kaart Titel', placeholder: 'Bijv. Geert Dev Studio' },
    { type: 'text', key: 'cardSubtitle', label: 'Kaart Beschrijving', placeholder: 'Typ je tekst...' },
    { type: 'range', key: 'maxTilt', label: 'Max Kantelhoek (°)', min: 5, max: 45, step: 1 },
    { type: 'range', key: 'perspective', label: 'Perspectief (px)', min: 500, max: 2000, step: 50 },
    { type: 'range', key: 'scale', label: 'Hover Schaal', min: 1, max: 1.2, step: 0.02 },
    { type: 'range', key: 'glareOpacity', label: 'Glans Reflectie', min: 0, max: 0.8, step: 0.05 }
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
      <div id="tilt-card" class="tilt-card-pop" style="perspective: ${this.settings.perspective}px;">
        <div id="tilt-glare" style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(255,255,255,${this.settings.glareOpacity}), transparent 70%); pointer-events: none; opacity: 0; transition: opacity 0.2s;"></div>
        <div class="tilt-inner-layer">
          <div id="tilt-icon" style="font-size: 3rem; margin-bottom: 12px;">${this.settings.cardIcon || '🛸'}</div>
          <h3 id="tilt-title" style="font-size: 1.4rem; font-weight: 800; margin-bottom: 8px;">${this.settings.cardTitle || '3D Tilt Universe'}</h3>
          <p id="tilt-sub" style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5;">${this.settings.cardSubtitle || 'Beweeg je cursor over deze kaart om een vloeiende diepte-illusie en parallax gloed te ervaren.'}</p>
        </div>
      </div>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.card = this.wrapper.querySelector('#tilt-card');
    this.glare = this.wrapper.querySelector('#tilt-glare');
    this.iconEl = this.wrapper.querySelector('#tilt-icon');
    this.titleEl = this.wrapper.querySelector('#tilt-title');
    this.subEl = this.wrapper.querySelector('#tilt-sub');

    this.onMouseMove = (e) => {
      const rect = this.card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;

      const tiltX = ((y - midY) / midY) * -this.settings.maxTilt;
      const tiltY = ((x - midX) / midX) * this.settings.maxTilt;

      this.card.style.transform = `perspective(${this.settings.perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${this.settings.scale})`;
      this.glare.style.opacity = '1';
      this.glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,${this.settings.glareOpacity}), transparent 70%)`;
    };

    this.onMouseLeave = () => {
      this.card.style.transform = `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
      this.glare.style.opacity = '0';
    };

    this.card.addEventListener('mousemove', this.onMouseMove);
    this.card.addEventListener('mouseleave', this.onMouseLeave);
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.iconEl) this.iconEl.textContent = this.settings.cardIcon || '🛸';
    if (this.titleEl) this.titleEl.textContent = this.settings.cardTitle || '3D Tilt Universe';
    if (this.subEl) this.subEl.textContent = this.settings.cardSubtitle || 'Beweeg je cursor over deze kaart.';
  },
  destroy() {
    if (this.card) {
      this.card.removeEventListener('mousemove', this.onMouseMove);
      this.card.removeEventListener('mouseleave', this.onMouseLeave);
    }
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>${s.cardTitle || 'Parallax 3D Tilt Card'}</title>
  <style>
    body { margin: 0; background: #0b0f19; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
    .card {
      width: 320px; height: 420px; background: #111827; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px; position: relative; transform-style: preserve-3d; cursor: pointer;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      transition: transform 0.1s ease-out; box-shadow: 0 25px 50px rgba(0,0,0,0.6);
      padding: 24px; text-align: center; box-sizing: border-box;
    }
    .glare { position: absolute; inset: 0; pointer-events: none; opacity: 0; border-radius: 16px; }
  </style>
</head>
<body>
  <div class="card" id="card">
    <div class="glare" id="glare"></div>
    <div style="font-size: 3rem; margin-bottom: 12px;">${s.cardIcon || '🛸'}</div>
    <h2 style="color: white; margin: 0 0 10px 0;">${s.cardTitle || '3D Tilt Universe'}</h2>
    <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin: 0;">${s.cardSubtitle || 'Interactieve 3D tilt kaart.'}</p>
  </div>
  <script>
    const card = document.getElementById('card'), glare = document.getElementById('glare');
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y - r.height/2) / (r.height/2)) * -${s.maxTilt};
      const ry = ((x - r.width/2) / (r.width/2)) * ${s.maxTilt};
      card.style.transform = 'perspective(${s.perspective}px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale(${s.scale})';
      glare.style.opacity = '1';
      glare.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,${s.glareOpacity}), transparent 70%)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(${s.perspective}px) rotateX(0deg) rotateY(0deg) scale(1)';
      glare.style.opacity = '0';
    });
  </script>
</body>
</html>`;
  }
};

// 3. RETRO 90s CURSOR (SPARKLES)
window.EffectRegistry['cursor-effects'] = {
  id: 'cursor-effects',
  title: '90s Nostalgic Cursor Sparkles',
  category: 'Mouse Effect',
  tech: 'DOM Sprites & Keyframes',
  github: 'https://github.com/tholman/cursor-effects',
  description: 'Klassiek nostalgisch internet sterrenstofspoor dat je muispijl siert.',
  defaultSettings: {
    sparkleColor: '#fde047',
    sparkleSize: 18,
    count: 3
  },
  controls: [
    { type: 'color', key: 'sparkleColor', label: 'Sterren Kleur' },
    { type: 'range', key: 'sparkleSize', label: 'Ster Grootte (px)', min: 10, max: 40, step: 2 },
    { type: 'range', key: 'count', label: 'Sterren per puls', min: 1, max: 6, step: 1 }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #94a3b8; pointer-events: none;">
        <span style="font-size: 3.5rem; margin-bottom: 12px;">✨</span>
        <h3 style="font-size: 1.2rem; color: #fff; font-weight: 700;">90s Fairy Dust Trail</h3>
        <p style="font-size: 0.85rem; margin-top: 6px;">Beweeg je muis over het venster om de nostalgische sterrenregens te zien glinsteren!</p>
      </div>
    `;

    this.onMouseMove = (e) => {
      for (let i = 0; i < this.settings.count; i++) {
        const span = document.createElement('span');
        span.textContent = '✦';
        span.style.position = 'fixed';
        span.style.left = (e.clientX + (Math.random() - 0.5) * 20) + 'px';
        span.style.top = (e.clientY + (Math.random() - 0.5) * 20) + 'px';
        span.style.color = this.settings.sparkleColor;
        span.style.fontSize = this.settings.sparkleSize + 'px';
        span.style.pointerEvents = 'none';
        span.style.zIndex = '9999';
        span.style.transition = 'all 0.6s ease-out';
        span.style.transform = `scale(1) rotate(${Math.random() * 360}deg)`;
        span.style.textShadow = `0 0 8px ${this.settings.sparkleColor}`;
        document.body.appendChild(span);

        requestAnimationFrame(() => {
          span.style.transform = `translateY(${Math.random() * 30 + 10}px) scale(0) rotate(${Math.random() * 720}deg)`;
          span.style.opacity = '0';
        });

        setTimeout(() => {
          if (span.parentNode) span.parentNode.removeChild(span);
        }, 650);
      }
    };

    window.addEventListener('mousemove', this.onMouseMove);
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
  },
  destroy() {
    window.removeEventListener('mousemove', this.onMouseMove);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>90s Cursor Sparkles</title>
  <style>
    body { margin: 0; background: #0c0a1a; height: 100vh; overflow: hidden; }
  </style>
</head>
<body>
  <script>
    window.addEventListener('mousemove', e => {
      for (let i = 0; i < ${s.count}; i++) {
        const star = document.createElement('span');
        star.textContent = '✦';
        star.style.position = 'fixed';
        star.style.left = (e.clientX + (Math.random() - 0.5) * 20) + 'px';
        star.style.top = (e.clientY + (Math.random() - 0.5) * 20) + 'px';
        star.style.color = '${s.sparkleColor}';
        star.style.fontSize = '${s.sparkleSize}px';
        star.style.pointerEvents = 'none';
        star.style.transition = 'all 0.6s ease-out';
        star.style.textShadow = '0 0 8px ${s.sparkleColor}';
        document.body.appendChild(star);

        requestAnimationFrame(() => {
          star.style.transform = 'translateY(' + (Math.random() * 30 + 10) + 'px) scale(0) rotate(180deg)';
          star.style.opacity = '0';
        });
        setTimeout(() => star.remove(), 650);
      }
    });
  </script>
</body>
</html>`;
  }
};

// 4. MOUSE IMAGE TRAIL (CODROPS STYLE)
window.EffectRegistry['image-trail'] = {
  id: 'image-trail',
  title: 'Mouse Following Image Trail',
  category: 'Mouse Effect',
  tech: 'DOM Image Trail & Threshold Trigger',
  github: 'https://github.com/codrops/ImageTrailEffects',
  description: 'Een reeks afbeeldingen die dynamisch achter de muiscursor verschijnt en vervaagt.',
  defaultSettings: {
    trailLength: 6,
    distanceThreshold: 60,
    fadeDuration: 0.8
  },
  controls: [
    { type: 'range', key: 'distanceThreshold', label: 'Afstandsdrempel (px)', min: 30, max: 120, step: 5 },
    { type: 'range', key: 'fadeDuration', label: 'Vervaag Tijd (sec)', min: 0.4, max: 2, step: 0.1 }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.wrapper = document.createElement('div');
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';
    this.wrapper.style.position = 'relative';
    this.wrapper.style.overflow = 'hidden';
    this.wrapper.style.display = 'flex';
    this.wrapper.style.alignItems = 'center';
    this.wrapper.style.justifyContent = 'center';

    this.wrapper.innerHTML = `
      <div style="text-align: center; color: #94a3b8; pointer-events: none;">
        <span style="font-size: 3rem;">🖼️</span>
        <h3 style="color: #fff; font-size: 1.2rem; font-weight: bold; margin-top: 8px;">Interactive Image Trail</h3>
        <p style="font-size: 0.85rem; margin-top: 4px;">Beweeg je cursor over dit vlak om een fototrail te tekenen.</p>
      </div>
      <div id="trail-container" style="position: absolute; inset: 0; pointer-events: none;"></div>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.trailHost = this.wrapper.querySelector('#trail-container');
    this.lastPos = { x: -1000, y: -1000 };

    this.onMouseMove = (e) => {
      const rect = this.wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      const dist = Math.hypot(x - this.lastPos.x, y - this.lastPos.y);
      if (dist >= this.settings.distanceThreshold) {
        this.spawnImage(x, y);
        this.lastPos = { x, y };
      }
    };

    window.addEventListener('mousemove', this.onMouseMove);

    // Auto demo images across screen on load
    let step = 0;
    this.demoTimer = setInterval(() => {
      if (step < 5) {
        const rect = this.wrapper.getBoundingClientRect();
        const demoX = (rect.width * 0.25) + step * 70;
        const demoY = (rect.height * 0.5) + Math.sin(step) * 40;
        this.spawnImage(demoX, demoY);
        step++;
      } else {
        clearInterval(this.demoTimer);
      }
    }, 220);
  },
  spawnImage(x, y) {
    const img = document.createElement('img');
    img.src = 'banner.jpg';
    img.style.position = 'absolute';
    img.style.width = '140px';
    img.style.height = '90px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px';
    img.style.left = `${x - 70}px`;
    img.style.top = `${y - 45}px`;
    img.style.boxShadow = '0 10px 25px rgba(0,0,0,0.6)';
    img.style.transition = `all ${this.settings.fadeDuration}s cubic-bezier(0.25, 1, 0.5, 1)`;
    img.style.transform = `scale(0.8) rotate(${(Math.random() - 0.5) * 20}deg)`;
    img.style.opacity = '1';
    this.trailHost.appendChild(img);

    requestAnimationFrame(() => {
      img.style.transform = `scale(1) rotate(${(Math.random() - 0.5) * 10}deg) translateY(-10px)`;
      img.style.opacity = '0';
    });

    setTimeout(() => {
      if (img.parentNode) img.parentNode.removeChild(img);
    }, this.settings.fadeDuration * 1000);
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
  },
  destroy() {
    clearInterval(this.demoTimer);
    window.removeEventListener('mousemove', this.onMouseMove);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Mouse Image Trail</title>
  <style>
    body { margin: 0; background: #0c0f18; height: 100vh; overflow: hidden; }
  </style>
</head>
<body>
  <script>
    let lx = -1000, ly = -1000;
    window.addEventListener('mousemove', e => {
      const dist = Math.hypot(e.clientX - lx, e.clientY - ly);
      if (dist >= ${s.distanceThreshold}) {
        lx = e.clientX; ly = e.clientY;
        const img = document.createElement('img');
        img.src = 'banner.jpg';
        img.style.position = 'fixed'; img.style.width = '140px'; img.style.height = '90px';
        img.style.objectFit = 'cover'; img.style.borderRadius = '8px';
        img.style.left = (e.clientX - 70) + 'px'; img.style.top = (e.clientY - 45) + 'px';
        img.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
        img.style.transition = 'all ${s.fadeDuration}s cubic-bezier(0.25, 1, 0.5, 1)';
        img.style.pointerEvents = 'none';
        document.body.appendChild(img);
        requestAnimationFrame(() => {
          img.style.transform = 'scale(1.1) translateY(-15px)';
          img.style.opacity = '0';
        });
        setTimeout(() => img.remove(), ${s.fadeDuration * 1000});
      }
    });
  </script>
</body>
</html>`;
  }
};

