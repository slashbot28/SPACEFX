// ========================================================
// BUTTON EFFECTS
// Source: lindelof/awesome-web-effect
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// 1. PARTICLE BURST BUTTON
window.EffectRegistry['particle-buttons'] = {
  id: 'particle-buttons',
  title: 'Particle Burst Exploding Button (Eigen Tekst)',
  category: 'Button Effect',
  tech: 'Canvas 2D Confetti Explosion',
  github: 'https://github.com/codrops/ParticleEffectsButtons',
  description: 'Knop met jouw eigen tekst die bij een klik een krachtige explosie van kleurrijke deeltjes afvuurt.',
  defaultSettings: {
    buttonText: '💥 Klik voor Deeltjes Explosie!',
    particleCount: 45,
    explosionRadius: 80,
    burstColor: '#3b82f6',
    particleShape: 'circle' // circle, square, star
  },
  controls: [
    { type: 'text', key: 'buttonText', label: 'Knop Tekst', placeholder: '💥 Klik Mij!' },
    { type: 'range', key: 'particleCount', label: 'Aantal deeltjes', min: 15, max: 120, step: 5 },
    { type: 'range', key: 'explosionRadius', label: 'Explosie Kracht', min: 40, max: 160, step: 10 },
    { type: 'color', key: 'burstColor', label: 'Deeltjes Kleur' },
    { type: 'select', key: 'particleShape', label: 'Vorm', options: ['circle', 'square', 'star'] },
    { type: 'trigger', key: 'triggerBurst', label: '💥 Activeer Deeltjes Explosie' }
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
    this.wrapper.style.position = 'relative';

    this.wrapper.innerHTML = `
      <canvas id="btn-burst-canvas" style="position: absolute; inset: 0; pointer-events: none; width: 100%; height: 100%;"></canvas>
      <button id="burst-btn" class="btn-action btn-primary" style="padding: 16px 36px; font-size: 1.1rem; border-radius: 12px; z-index: 2; cursor: pointer;">
        ${this.settings.buttonText || '💥 Klik voor Deeltjes Explosie!'}
      </button>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.btn = this.wrapper.querySelector('#burst-btn');
    this.canvas = this.wrapper.querySelector('#btn-burst-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];

    this.resize = () => {
      this.canvas.width = this.canvas.offsetWidth || 800;
      this.canvas.height = this.canvas.offsetHeight || 500;
    };
    this.resize();
    window.addEventListener('resize', this.resize);

    this.onClick = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const originX = e.clientX - rect.left;
      const originY = e.clientY - rect.top;
      this.explode(originX, originY);
    };

    this.btn.addEventListener('click', this.onClick);
    this.active = true;
    this.loop();

    // Fire sample burst on load so the user immediately sees it
    setTimeout(() => {
      if (this.active) {
        const rect = this.canvas.getBoundingClientRect();
        this.explode(rect.width / 2, rect.height / 2);
      }
    }, 400);
  },
  triggerBurst() {
    const rect = this.canvas.getBoundingClientRect();
    this.explode(rect.width / 2, rect.height / 2);
  },
  explode(x, y) {
    const count = this.settings.particleCount;
    const force = this.settings.explosionRadius;
    const colors = [this.settings.burstColor, '#ec4899', '#f59e0b', '#06b6d4', '#10b981'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 0.7 + 0.3) * (force / 10);
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 30 + 35
      });
    }
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.btn) this.btn.textContent = this.settings.buttonText || '💥 Klik voor Deeltjes Explosie!';
  },
  loop() {
    if (!this.active) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15; // Gravity
      p.vx *= 0.98; // Friction
      p.life++;

      const progress = p.life / p.maxLife;
      if (progress >= 1) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      if (this.settings.particleShape === 'square') {
        this.ctx.rect(p.x, p.y, p.size, p.size);
      } else {
        this.ctx.arc(p.x, p.y, p.size * (1 - progress * 0.4), 0, Math.PI * 2);
      }
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = 1 - progress;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }

    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.resize);
    if (this.btn) this.btn.removeEventListener('click', this.onClick);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Particle Burst Button</title>
  <style>
    body { margin: 0; background: #0b0f19; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
    button { padding: 16px 36px; font-size: 1.1rem; background: #2563eb; color: white; border: none; border-radius: 12px; cursor: pointer; z-index: 2; }
    canvas { position: fixed; inset: 0; pointer-events: none; }
  </style>
</head>
<body>
  <button id="b">💥 Klik Hier!</button>
  <canvas id="c"></canvas>
  <script>
    const b = document.getElementById('b'), c = document.getElementById('c'), ctx = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    const parts = [];
    b.addEventListener('click', e => {
      for (let i = 0; i < ${s.particleCount}; i++) {
        const a = Math.random() * Math.PI * 2, sp = Math.random() * 8 + 2;
        parts.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp, a: 1, c: '${s.burstColor}' });
      }
    });
    function loop() {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.a -= 0.02;
        if (p.a <= 0) { parts.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI*2);
        ctx.fillStyle = p.c; ctx.globalAlpha = p.a; ctx.fill(); ctx.globalAlpha = 1;
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`;
  }
};

// 2. LIQUID RIPPLE BUTTON
window.EffectRegistry['ripple-button'] = {
  id: 'ripple-button',
  title: 'Material Liquid Ripple Button (Eigen Tekst)',
  category: 'Button Effect',
  tech: 'CSS Expanding Radial Coordinates',
  github: 'https://github.com/mig82/RippleButton',
  description: 'Vloeibare cirkelgolf die exact vanaf het klikpunt uitwaaiert over jouw eigen knoptekst.',
  defaultSettings: {
    buttonText: '🌊 Klik voor Liquid Ripple',
    buttonColor: '#2563eb',
    rippleDuration: 0.6
  },
  controls: [
    { type: 'text', key: 'buttonText', label: 'Knop Tekst', placeholder: '🌊 Klik Hier' },
    { type: 'color', key: 'buttonColor', label: 'Knop Kleur' },
    { type: 'range', key: 'rippleDuration', label: 'Rimpel Duur (sec)', min: 0.3, max: 1.5, step: 0.1 }
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
      <button id="ripple-btn" class="btn-ripple" style="background: ${this.settings.buttonColor};">
        <span id="ripple-txt">${this.settings.buttonText || '🌊 Klik voor Liquid Ripple'}</span>
      </button>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.btn = this.wrapper.querySelector('#ripple-btn');
    this.txt = this.wrapper.querySelector('#ripple-txt');
    this.btn.addEventListener('click', (e) => {
      const rect = this.btn.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-circle');
      circle.style.animationDuration = `${this.settings.rippleDuration}s`;

      const old = this.btn.getElementsByClassName('ripple-circle')[0];
      if (old) old.remove();

      this.btn.appendChild(circle);
    });
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.btn) this.btn.style.background = this.settings.buttonColor;
    if (this.txt) this.txt.textContent = this.settings.buttonText || '🌊 Klik voor Liquid Ripple';
  },
  destroy() {},
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Material Ripple Button</title>
  <style>
    body { margin: 0; background: #0f172a; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
    .btn {
      position: relative; overflow: hidden; padding: 16px 36px; border-radius: 10px;
      background: ${s.buttonColor}; color: white; font-weight: bold; font-size: 1rem; border: none; cursor: pointer;
    }
    .ripple {
      position: absolute; border-radius: 50%; background: rgba(255,255,255,0.4);
      transform: scale(0); animation: r ${s.rippleDuration}s linear; pointer-events: none;
    }
    @keyframes r { to { transform: scale(4); opacity: 0; } }
  </style>
</head>
<body>
  <button class="btn" onclick="
    const r = this.getBoundingClientRect();
    const c = document.createElement('span');
    const d = Math.max(r.width, r.height);
    c.style.width = c.style.height = d + 'px';
    c.style.left = (event.clientX - r.left - d/2) + 'px';
    c.style.top = (event.clientY - r.top - d/2) + 'px';
    c.className = 'ripple';
    this.appendChild(c);
    setTimeout(() => c.remove(), ${s.rippleDuration * 1000});
  ">${s.buttonText || '🌊 Klik Mij'}</button>
</body>
</html>`;
  }
};

// 3. MAGNETIC HOVER BUTTON
window.EffectRegistry['magnetic-button'] = {
  id: 'magnetic-button',
  title: 'Magnetic Spring Button (Eigen Tekst)',
  category: 'Button Effect',
  tech: 'Magnetic Cursor Attraction Physics',
  github: 'https://github.com/codrops/MagneticButtons',
  description: 'Knop die magnetisch naar de muiscursor toe wordt getrokken met aanpasbare tekst.',
  defaultSettings: {
    buttonText: '🧲 Beweeg je muis dichtbij mij!',
    magneticRadius: 120,
    pullStrength: 0.35,
    glowColor: '#06b6d4'
  },
  controls: [
    { type: 'text', key: 'buttonText', label: 'Knop Tekst', placeholder: '🧲 Jouw Knop' },
    { type: 'range', key: 'magneticRadius', label: 'Magneet Bereik (px)', min: 60, max: 200, step: 10 },
    { type: 'range', key: 'pullStrength', label: 'Aantrekkingskracht', min: 0.1, max: 0.8, step: 0.05 },
    { type: 'color', key: 'glowColor', label: 'Rand Neon Gloed' }
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
      <button id="mag-btn" class="btn-magnetic" style="border-color: ${this.settings.glowColor}; color: ${this.settings.glowColor};">
        ${this.settings.buttonText || '🧲 Beweeg je muis dichtbij mij!'}
      </button>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.btn = this.wrapper.querySelector('#mag-btn');

    this.onMouseMove = (e) => {
      const rect = this.btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - btnCenterX;
      const dy = e.clientY - btnCenterY;
      const dist = Math.hypot(dx, dy);

      if (dist < this.settings.magneticRadius) {
        const pull = this.settings.pullStrength;
        this.btn.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
      } else {
        this.btn.style.transform = 'translate(0, 0)';
      }
    };

    window.addEventListener('mousemove', this.onMouseMove);
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.btn) {
      this.btn.style.borderColor = this.settings.glowColor;
      this.btn.style.color = this.settings.glowColor;
      this.btn.textContent = this.settings.buttonText || '🧲 Beweeg je muis dichtbij mij!';
    }
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
  <title>Magnetic Button</title>
  <style>
    body { margin: 0; background: #0c0f18; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
    .btn {
      padding: 18px 40px; background: #111827; border: 2px solid ${s.glowColor}; color: ${s.glowColor};
      border-radius: 12px; font-weight: bold; font-size: 1.1rem; cursor: pointer; transition: transform 0.15s ease-out;
      box-shadow: 0 0 20px ${s.glowColor}44;
    }
  </style>
</head>
<body>
  <button class="btn" id="b">${s.buttonText || '🧲 Magnetic Button'}</button>
  <script>
    const b = document.getElementById('b');
    window.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy, dist = Math.hypot(dx, dy);
      if (dist < ${s.magneticRadius}) {
        b.style.transform = 'translate(' + (dx * ${s.pullStrength}) + 'px, ' + (dy * ${s.pullStrength}) + 'px)';
      } else {
        b.style.transform = 'translate(0, 0)';
      }
    });
  </script>
</body>
</html>`;
  }
};

// 4. SHINY METALLIC FOIL BUTTON
window.EffectRegistry['shine-button'] = {
  id: 'shine-button',
  title: 'Metallic Shine Foil Button (Eigen Tekst)',
  category: 'Button Effect',
  tech: 'CSS Keyframe Light Sheen',
  github: 'https://github.com/hamdiwanis/nativescript-shine-button',
  description: 'Glinsterende lichtbundel die over het knopoppervlak en jouw eigen tekst glijdt.',
  defaultSettings: {
    buttonText: '✨ Holographic Shine Button',
    speed: 3,
    buttonColor: '#7c3aed'
  },
  controls: [
    { type: 'text', key: 'buttonText', label: 'Knop Tekst', placeholder: '✨ Knop Tekst' },
    { type: 'range', key: 'speed', label: 'Glans Cyclus (sec)', min: 1, max: 6, step: 0.5 },
    { type: 'color', key: 'buttonColor', label: 'Knop Kleur' }
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
      <button class="btn-shine" id="btn-shine-elem" style="background: ${this.settings.buttonColor};">
        <span id="btn-shine-txt">${this.settings.buttonText || '✨ Holographic Shine Button'}</span>
      </button>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    const btn = this.wrapper.querySelector('#btn-shine-elem');
    const txt = this.wrapper.querySelector('#btn-shine-txt');
    if (btn) btn.style.background = this.settings.buttonColor;
    if (txt) txt.textContent = this.settings.buttonText || '✨ Holographic Shine Button';
  },
  destroy() {},
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Shine Foil Button</title>
  <style>
    body { margin: 0; background: #0c0f18; display: flex; align-items: center; justify-content: center; height: 100vh; }
    .btn {
      position: relative; overflow: hidden; padding: 18px 40px; border-radius: 12px;
      background: ${s.buttonColor}; color: white; font-weight: bold; font-size: 1.1rem; border: none; cursor: pointer;
    }
    .btn::after {
      content: ""; position: absolute; top: -50%; left: -60%; width: 40%; height: 200%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
      transform: rotate(25deg); animation: shine ${s.speed}s infinite ease-in-out;
    }
    @keyframes shine { 0% { left: -60%; } 35%, 100% { left: 140%; } }
  </style>
</head>
<body>
  <button class="btn">${s.buttonText || '✨ Shine Button'}</button>
</body>
</html>`;
  }
};

// 5. ELASTIC PROGRESS BUTTON
window.EffectRegistry['elastic-progress'] = {
  id: 'elastic-progress',
  title: 'Elastic Progress Morph Button (Eigen Tekst)',
  category: 'Button Effect',
  tech: 'CSS Transform & Border Spinner',
  github: 'https://github.com/codrops/ElasticProgress',
  description: 'Knop die bij klik elastisch transformeert naar een ronde laadanimatie met instelbare knoptekst.',
  defaultSettings: {
    buttonText: 'Verstuur Data',
    duration: 2.5,
    color: '#10b981'
  },
  controls: [
    { type: 'text', key: 'buttonText', label: 'Knop Tekst', placeholder: 'Verstuur Data' },
    { type: 'range', key: 'duration', label: 'Laadduur (sec)', min: 1, max: 6, step: 0.5 },
    { type: 'color', key: 'color', label: 'Knop Kleur' },
    { type: 'trigger', key: 'triggerClick', label: '▶ Activeer Transformatie' }
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
      <button class="btn-elastic" id="elastic-btn" style="background: ${this.settings.color};">
        ${this.settings.buttonText || 'Verstuur Data'}
      </button>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);
    this.btn = this.wrapper.querySelector('#elastic-btn');

    this.btn.addEventListener('click', () => this.morph());
  },
  morph() {
    this.btn.classList.add('loading');
    setTimeout(() => {
      this.btn.classList.remove('loading');
      this.btn.textContent = '✓ Voltooid!';
      setTimeout(() => { this.btn.textContent = this.settings.buttonText || 'Verstuur Data'; }, 1500);
    }, this.settings.duration * 1000);
  },
  triggerClick() {
    this.morph();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.btn && !this.btn.classList.contains('loading')) {
      this.btn.style.background = this.settings.color;
      this.btn.textContent = this.settings.buttonText || 'Verstuur Data';
    }
  },
  destroy() {},
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Elastic Progress Button</title>
  <style>
    body { margin: 0; background: #0c0f18; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
    .btn {
      width: 180px; height: 50px; border-radius: 25px; background: ${s.color}; color: white;
      font-weight: bold; border: none; cursor: pointer; transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    .btn.loading {
      width: 50px; border-radius: 50%; background: transparent !important;
      border: 4px solid rgba(16, 185, 129, 0.2); border-top-color: ${s.color};
      animation: spin 0.8s linear infinite; color: transparent;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <button class="btn">${s.buttonText || 'Verstuur Data'}</button>
</body>
</html>`;
  }
};

