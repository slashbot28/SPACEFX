// ========================================================
// CSS 3D EFFECTS
// Source: lindelof/awesome-web-effect
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// 1. QUINTESSENTIAL CSS 3D CUBE
window.EffectRegistry['css-3d-cube'] = {
  id: 'css-3d-cube',
  title: 'Quintessential 3D CSS Cube (Eigen Tekst)',
  category: 'Css 3D Effect',
  tech: 'CSS 3D Transforms',
  github: 'https://github.com/zachstronaut/quintessential-css-cube',
  description: 'Interactieve 3D kubus gerenderd met zuivere CSS transforms, muisrotatie en eigen tekst op de vlakken.',
  defaultSettings: {
    frontFaceText: 'GEERT',
    backFaceText: '2026',
    size: 200,
    speedX: 0.6,
    speedY: 0.8,
    autoRotate: true,
    faceColor: '#3b82f6',
    borderGlow: true
  },
  controls: [
    { type: 'text', key: 'frontFaceText', label: 'Tekst Voorkant (Front)', placeholder: 'Bijv. GEERT' },
    { type: 'text', key: 'backFaceText', label: 'Tekst Achterkant (Back)', placeholder: 'Bijv. 2026' },
    { type: 'range', key: 'size', label: 'Kubus Grootte (px)', min: 100, max: 320, step: 10 },
    { type: 'range', key: 'speedX', label: 'Rotatiesnelheid X', min: -3, max: 3, step: 0.2 },
    { type: 'range', key: 'speedY', label: 'Rotatiesnelheid Y', min: -3, max: 3, step: 0.2 },
    { type: 'color', key: 'faceColor', label: 'Vlak Kleur' },
    { type: 'switch', key: 'autoRotate', label: 'Automatisch Roteren' },
    { type: 'switch', key: 'borderGlow', label: 'Neon Rand Gloed' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.rotX = -25;
    this.rotY = 35;
    this.isDragging = false;
    this.lastMouse = { x: 0, y: 0 };

    this.wrapper = document.createElement('div');
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';
    this.wrapper.style.display = 'flex';
    this.wrapper.style.alignItems = 'center';
    this.wrapper.style.justifyContent = 'center';

    this.renderCube();
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    // Mouse drag to rotate
    this.onMouseDown = (e) => {
      this.isDragging = true;
      this.lastMouse = { x: e.clientX, y: e.clientY };
    };
    this.onMouseMove = (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouse.x;
      const dy = e.clientY - this.lastMouse.y;
      this.rotY += dx * 0.5;
      this.rotX -= dy * 0.5;
      this.lastMouse = { x: e.clientX, y: e.clientY };
    };
    this.onMouseUp = () => { this.isDragging = false; };

    this.wrapper.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);

    this.active = true;
    this.loop();
  },
  renderCube() {
    const s = this.settings.size;
    const half = s / 2;
    const glow = this.settings.borderGlow ? `box-shadow: inset 0 0 35px ${this.settings.faceColor}88, 0 0 20px ${this.settings.faceColor}44;` : '';

    this.wrapper.innerHTML = `
      <div class="cube-scene" style="width: ${s}px; height: ${s}px; cursor: grab;">
        <div id="cube-element" class="cube-container" style="width: ${s}px; height: ${s}px;">
          <div class="cube-face" style="width: ${s}px; height: ${s}px; transform: rotateY(0deg) translateZ(${half}px); border-color: ${this.settings.faceColor}; ${glow}">${this.settings.frontFaceText || 'VOOR'}</div>
          <div class="cube-face" style="width: ${s}px; height: ${s}px; transform: rotateY(180deg) translateZ(${half}px); border-color: ${this.settings.faceColor}; ${glow}">${this.settings.backFaceText || 'ACHTER'}</div>
          <div class="cube-face" style="width: ${s}px; height: ${s}px; transform: rotateY(90deg) translateZ(${half}px); border-color: ${this.settings.faceColor}; ${glow}">RECHTS</div>
          <div class="cube-face" style="width: ${s}px; height: ${s}px; transform: rotateY(-90deg) translateZ(${half}px); border-color: ${this.settings.faceColor}; ${glow}">LINKS</div>
          <div class="cube-face" style="width: ${s}px; height: ${s}px; transform: rotateX(90deg) translateZ(${half}px); border-color: ${this.settings.faceColor}; ${glow}">BOVEN</div>
          <div class="cube-face" style="width: ${s}px; height: ${s}px; transform: rotateX(-90deg) translateZ(${half}px); border-color: ${this.settings.faceColor}; ${glow}">ONDER</div>
        </div>
      </div>
    `;
    this.cubeEl = this.wrapper.querySelector('#cube-element');
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    this.renderCube();
  },
  loop() {
    if (!this.active) return;
    if (this.settings.autoRotate && !this.isDragging) {
      this.rotX += this.settings.speedX;
      this.rotY += this.settings.speedY;
    }
    if (this.cubeEl) {
      this.cubeEl.style.transform = `rotateX(${this.rotX}deg) rotateY(${this.rotY}deg)`;
    }
    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    this.wrapper.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    const h = s.size / 2;
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>CSS 3D Cube</title>
  <style>
    body { margin: 0; background: #07090e; display: flex; align-items: center; justify-content: center; height: 100vh; overflow: hidden; }
    .scene { width: ${s.size}px; height: ${s.size}px; perspective: 800px; cursor: grab; }
    .cube { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; }
    .face {
      position: absolute; width: ${s.size}px; height: ${s.size}px;
      border: 2px solid ${s.faceColor}; background: rgba(15, 23, 42, 0.7);
      display: flex; align-items: center; justify-content: center;
      color: white; font-family: sans-serif; font-weight: bold; font-size: 1.5rem;
      box-shadow: inset 0 0 35px ${s.faceColor}88, 0 0 20px ${s.faceColor}44;
    }
    .f-front  { transform: rotateY(0deg) translateZ(${h}px); }
    .f-back   { transform: rotateY(180deg) translateZ(${h}px); }
    .f-right  { transform: rotateY(90deg) translateZ(${h}px); }
    .f-left   { transform: rotateY(-90deg) translateZ(${h}px); }
    .f-top    { transform: rotateX(90deg) translateZ(${h}px); }
    .f-bottom { transform: rotateX(-90deg) translateZ(${h}px); }
  </style>
</head>
<body>
  <div class="scene">
    <div class="cube" id="cube">
      <div class="face f-front">VOOR</div>
      <div class="face f-back">ACHTER</div>
      <div class="face f-right">RECHTS</div>
      <div class="face f-left">LINKS</div>
      <div class="face f-top">BOVEN</div>
      <div class="face f-bottom">ONDER</div>
    </div>
  </div>
  <script>
    const cube = document.getElementById('cube');
    let rx = -25, ry = 35, dragging = false, lx = 0, ly = 0;
    window.addEventListener('mousedown', e => { dragging = true; lx = e.clientX; ly = e.clientY; });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      ry += (e.clientX - lx) * 0.5; rx -= (e.clientY - ly) * 0.5;
      lx = e.clientX; ly = e.clientY;
    });
    window.addEventListener('mouseup', () => dragging = false);
    function animate() {
      if (${s.autoRotate} && !dragging) { rx += ${s.speedX}; ry += ${s.speedY}; }
      cube.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`;
  }
};

// 2. 3D SOLAR SYSTEM
window.EffectRegistry['solar-system'] = {
  id: 'solar-system',
  title: '3D CSS Solar System',
  category: 'Css 3D Effect',
  tech: 'CSS 3D Keyframe Orbits',
  github: 'https://github.com/juliangarnier/3D-CSS-Solar-System',
  description: 'Planetenstelsel met 3D inclinatie en draaiende hemellichamen.',
  defaultSettings: {
    orbitSpeedMultiplier: 1,
    inclinationAngle: 65,
    sunGlow: '#f97316'
  },
  controls: [
    { type: 'range', key: 'orbitSpeedMultiplier', label: 'Baan Snelheid Multiplier', min: 0.2, max: 4, step: 0.2 },
    { type: 'range', key: 'inclinationAngle', label: '3D Hellingshoek (°)', min: 20, max: 85, step: 5 },
    { type: 'color', key: 'sunGlow', label: 'Zonne Gloed' }
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
      <div id="solar-system" class="solar-system" style="transform: rotateX(${this.settings.inclinationAngle}deg);">
        <div class="sun" style="box-shadow: 0 0 60px ${this.settings.sunGlow}, 0 0 100px ${this.settings.sunGlow};"></div>
        <div class="orbit orbit-1"><div class="planet planet-1"></div></div>
        <div class="orbit orbit-2"><div class="planet planet-2"></div></div>
        <div class="orbit orbit-3"><div class="planet planet-3"></div></div>
        <div class="orbit orbit-4"><div class="planet planet-4"></div></div>
      </div>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);
    this.updateSpeed();
  },
  updateSpeed() {
    const orbits = this.wrapper.querySelectorAll('.orbit');
    const baseSpeeds = [4, 8, 14, 22];
    orbits.forEach((orb, i) => {
      orb.style.animationDuration = `${baseSpeeds[i] / this.settings.orbitSpeedMultiplier}s`;
    });
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    const sys = this.wrapper.querySelector('#solar-system');
    if (sys) sys.style.transform = `rotateX(${this.settings.inclinationAngle}deg)`;
    const sun = this.wrapper.querySelector('.sun');
    if (sun) sun.style.boxShadow = `0 0 60px ${this.settings.sunGlow}, 0 0 100px ${this.settings.sunGlow}`;
    this.updateSpeed();
  },
  destroy() {},
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>3D CSS Solar System</title>
  <style>
    body { margin: 0; background: #030712; display: flex; align-items: center; justify-content: center; height: 100vh; overflow: hidden; }
    .sys { position: relative; width: 450px; height: 450px; transform-style: preserve-3d; transform: rotateX(${s.inclinationAngle}deg); }
    .sun { position: absolute; top: 50%; left: 50%; width: 50px; height: 50px; margin: -25px; border-radius: 50%; background: #fbbf24; box-shadow: 0 0 60px ${s.sunGlow}; transform: rotateX(-${s.inclinationAngle}deg); }
    .orbit { position: absolute; top: 50%; left: 50%; border: 1px dashed rgba(255,255,255,0.2); border-radius: 50%; animation: rot linear infinite; }
    .o1 { width: 120px; height: 120px; margin: -60px; animation-duration: ${4 / s.orbitSpeedMultiplier}s; }
    .o2 { width: 220px; height: 220px; margin: -110px; animation-duration: ${8 / s.orbitSpeedMultiplier}s; }
    .o3 { width: 320px; height: 320px; margin: -160px; animation-duration: ${14 / s.orbitSpeedMultiplier}s; }
    .planet { position: absolute; top: 0; left: 50%; border-radius: 50%; transform: translate(-50%, -50%) rotateX(-${s.inclinationAngle}deg); }
    .p1 { width: 12px; height: 12px; background: #60a5fa; }
    .p2 { width: 18px; height: 18px; background: #34d399; }
    .p3 { width: 24px; height: 24px; background: #f43f5e; }
    @keyframes rot { from { transform: rotateZ(0deg); } to { transform: rotateZ(360deg); } }
  </style>
</head>
<body>
  <div class="sys">
    <div class="sun"></div>
    <div class="orbit o1"><div class="planet p1"></div></div>
    <div class="orbit o2"><div class="planet p2"></div></div>
    <div class="orbit o3"><div class="planet p3"></div></div>
  </div>
</body>
</html>`;
  }
};

// 3. MAKISU 3D ORIGAMI DROPDOWN
window.EffectRegistry['makisu-dropdown'] = {
  id: 'makisu-dropdown',
  title: 'Makisu 3D Origami Dropdown (Eigen Tekst)',
  category: 'Css 3D Effect',
  tech: 'CSS 3D Cascading Origami Folds',
  github: 'https://github.com/soulwire/Makisu',
  description: 'Origami bamboe 3D uitklapmenu met eigen koptekst. Klik op de kop om in/uit te vouwen, of klik op een optie om het effect direct te starten!',
  defaultSettings: {
    menuHeader: '📂 3D Origami Menu',
    accentColor: '#3b82f6',
    folded: false
  },
  controls: [
    { type: 'text', key: 'menuHeader', label: 'Origami Menu Koptekst', placeholder: '📂 3D Origami Menu' },
    { type: 'color', key: 'accentColor', label: 'Balk Kleur' },
    { type: 'switch', key: 'folded', label: 'Ingevouwen Toestand' },
    { type: 'trigger', key: 'triggerToggle', label: '🔄 Vouw In / Uit (Animatie)' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'makisu-wrapper';

    this.wrapper.innerHTML = `
      <div class="makisu-hint-badge" id="makisu-hint">
        👇 Klik op een optie om het effect direct te openen, of klik op de bovenbalk om 3D in te vouwen!
      </div>

      <div class="makisu-menu ${this.settings.folded ? 'folded' : ''}" id="makisu-root">
        <div class="makisu-header" id="makisu-toggle" style="background: ${this.settings.accentColor};">
          <span id="makisu-header-txt">${this.settings.menuHeader || '📂 3D Origami Menu'}</span>
          <span class="chevron">▼</span>
        </div>
        <div class="makisu-list" id="makisu-list">
          <div class="makisu-item" data-action="warp-drive">
            <span>🚀 1. Warp Drive (Starfield)</span>
            <span class="item-action-badge">START</span>
          </div>
          <div class="makisu-item" data-action="matrix-rain">
            <span>🌧️ 2. Matrix Digital Rain</span>
            <span class="item-action-badge">START</span>
          </div>
          <div class="makisu-item" data-action="fireworks">
            <span>🎆 3. Vuurwerk Spektakel</span>
            <span class="item-action-badge">START</span>
          </div>
          <div class="makisu-item" data-action="doom-fire">
            <span>🔥 4. Classic Doom Fire</span>
            <span class="item-action-badge">START</span>
          </div>
          <div class="makisu-item" data-action="react-tilt">
            <span>💎 5. 3D Parallax Tilt Card</span>
            <span class="item-action-badge">START</span>
          </div>
        </div>
      </div>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.toggleBtn = this.wrapper.querySelector('#makisu-toggle');
    this.root = this.wrapper.querySelector('#makisu-root');
    this.hint = this.wrapper.querySelector('#makisu-hint');
    this.headerTxt = this.wrapper.querySelector('#makisu-header-txt');

    // Toggle folding on header click
    this.toggleBtn.addEventListener('click', () => {
      this.toggleFold();
    });

    // Handle clicks on each item
    this.wrapper.querySelectorAll('.makisu-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const targetEffectId = item.dataset.action;
        const effectName = item.querySelector('span').textContent;

        this.hint.textContent = `🚀 Gestart: ${effectName}!`;
        this.hint.style.color = '#10b981';
        this.hint.style.borderColor = '#10b981';

        // Visual flash feedback
        item.style.transform = 'translateZ(30px) scale(1.05)';
        item.style.background = '#10b981';

        setTimeout(() => {
          if (window.app && typeof window.app.loadEffect === 'function') {
            window.app.loadEffect(targetEffectId);
          }
        }, 300);
      });
    });
  },
  toggleFold() {
    const isFolded = this.root.classList.toggle('folded');
    this.settings.folded = isFolded;
    this.hint.textContent = isFolded 
      ? '📁 Menu is 3D ingevouwen. Klik op de bovenbalk om weer uit te vouwen!'
      : '👇 Menu is uitgevouwen! Klik op een optie om het effect te starten.';
    this.hint.style.color = isFolded ? '#f59e0b' : 'var(--accent-cyan)';
    this.hint.style.borderColor = isFolded ? '#f59e0b' : 'rgba(6, 182, 212, 0.35)';
  },
  triggerToggle() {
    this.toggleFold();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.root) {
      if (this.settings.folded) this.root.classList.add('folded');
      else this.root.classList.remove('folded');
    }
    if (this.toggleBtn) this.toggleBtn.style.background = this.settings.accentColor;
    if (this.headerTxt) this.headerTxt.textContent = this.settings.menuHeader || '📂 3D Origami Menu';
  },
  destroy() {},
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>${s.menuHeader || 'Makisu 3D Origami Dropdown'}</title>
  <style>
    body { margin: 0; background: #0b0f19; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
    .menu { width: 320px; perspective: 1200px; transform-style: preserve-3d; }
    .header {
      background: ${s.accentColor}; color: white; padding: 16px 20px; font-weight: bold;
      border-radius: 12px 12px 0 0; cursor: pointer; display: flex; justify-content: space-between;
    }
    .list { display: flex; flex-direction: column; transform-style: preserve-3d; }
    .item {
      background: #182234; color: white; padding: 15px 20px; font-weight: 600;
      border: 1px solid rgba(255,255,255,0.08); border-top: none; transform-origin: top center;
      cursor: pointer; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .item:last-child { border-radius: 0 0 12px 12px; }
    .item:hover { background: #2563eb; transform: translateZ(15px); }

    /* Cascading 3D folding origami delays */
    .menu.folded .item { transform: rotateX(-90deg); opacity: 0; pointer-events: none; }
    .menu.folded .item:nth-child(5) { transition-delay: 0.02s; }
    .menu.folded .item:nth-child(4) { transition-delay: 0.08s; }
    .menu.folded .item:nth-child(3) { transition-delay: 0.14s; }
    .menu.folded .item:nth-child(2) { transition-delay: 0.20s; }
    .menu.folded .item:nth-child(1) { transition-delay: 0.26s; }

    .menu:not(.folded) .item:nth-child(1) { transition-delay: 0.05s; }
    .menu:not(.folded) .item:nth-child(2) { transition-delay: 0.10s; }
    .menu:not(.folded) .item:nth-child(3) { transition-delay: 0.15s; }
    .menu:not(.folded) .item:nth-child(4) { transition-delay: 0.20s; }
    .menu:not(.folded) .item:nth-child(5) { transition-delay: 0.25s; }
  </style>
</head>
<body>
  <div class="menu" id="menu">
    <div class="header" onclick="document.getElementById('menu').classList.toggle('folded')">
      <span>${s.menuHeader || '📂 3D Origami Menu'}</span>
      <span>▼</span>
    </div>
    <div class="list">
      <div class="item" onclick="alert('Effect 1 gestart!')">🚀 1. Hyperspace</div>
      <div class="item" onclick="alert('Effect 2 gestart!')">🌧️ 2. Digital Rain</div>
      <div class="item" onclick="alert('Effect 3 gestart!')">🎆 3. Fireworks</div>
      <div class="item" onclick="alert('Effect 4 gestart!')">🔥 4. Doom Fire</div>
    </div>
  </div>
</body>
</html>`;
  }
};

// 4. TARJETAS 3D FLIP CARDS (WITH CUSTOM TEXT)
window.EffectRegistry['cards-3d'] = {
  id: 'cards-3d',
  title: '3D Interactive Flip Cards (Eigen Tekst)',
  category: 'Css 3D Effect',
  tech: 'CSS 3D perspective & backface-visibility',
  github: 'https://github.com/falconmasters/Tarjetas-3D-con-HTML5-y-CSS3',
  description: 'Prachtige 3D flippende kaarten met dubbelzijdige inhoud, diepteschaduw en je eigen teksten.',
  defaultSettings: {
    card1Title: 'Quantum Pass',
    card1BackTitle: 'Unlocked #001',
    card2Title: 'Cyber Shield',
    card2BackTitle: 'Activeer Matrix',
    cardPerspective: 1200,
    flipDuration: 0.8,
    accentGradStart: '#3b82f6',
    accentGradEnd: '#8b5cf6'
  },
  controls: [
    { type: 'text', key: 'card1Title', label: 'Kaart 1 Voorkant Titel', placeholder: 'Kaart 1 Titel' },
    { type: 'text', key: 'card1BackTitle', label: 'Kaart 1 Achterkant Titel', placeholder: 'Kaart 1 Achterkant' },
    { type: 'text', key: 'card2Title', label: 'Kaart 2 Voorkant Titel', placeholder: 'Kaart 2 Titel' },
    { type: 'text', key: 'card2BackTitle', label: 'Kaart 2 Achterkant Titel', placeholder: 'Kaart 2 Achterkant' },
    { type: 'range', key: 'cardPerspective', label: 'Perspectief (px)', min: 600, max: 2000, step: 100 },
    { type: 'range', key: 'flipDuration', label: 'Flip Duur (sec)', min: 0.4, max: 1.6, step: 0.1 },
    { type: 'color', key: 'accentGradStart', label: 'Achterkant Kleur 1' },
    { type: 'color', key: 'accentGradEnd', label: 'Achterkant Kleur 2' },
    { type: 'trigger', key: 'triggerFlip', label: '🔄 Draai Kaarten Om' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.wrapper = document.createElement('div');
    this.wrapper.style.display = 'flex';
    this.wrapper.style.flexDirection = 'column';
    this.wrapper.style.alignItems = 'center';
    this.wrapper.style.justifyContent = 'center';
    this.wrapper.style.gap = '20px';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';

    this.render();
    container.innerHTML = '';
    container.appendChild(this.wrapper);
  },
  render() {
    const s = this.settings;
    this.wrapper.innerHTML = `
      <div style="font-size: 0.88rem; color: var(--accent-cyan); font-weight: 600;">
        👆 Hover of klik op de kaarten om ze in 3D 180 graden te flippen!
      </div>
      <div class="cards-3d-wrapper" style="perspective: ${s.cardPerspective}px;">
        <div class="card-3d" id="card-1" style="transition: transform ${s.flipDuration}s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
          <div class="card-face card-face-front">
            <span style="font-size: 3rem; margin-bottom: 12px;">💎</span>
            <h3 id="card-1-front-txt" style="color: #fff; font-size: 1.2rem; font-weight: bold;">${s.card1Title || 'Quantum Pass'}</h3>
            <p style="color: #94a3b8; font-size: 0.82rem; margin-top: 8px;">Klik of hover om de 3D achterkant te ontgrendelen.</p>
          </div>
          <div class="card-face card-face-back" style="background: linear-gradient(135deg, ${s.accentGradStart}, ${s.accentGradEnd});">
            <span style="font-size: 3rem; margin-bottom: 12px;">🚀</span>
            <h3 id="card-1-back-txt" style="color: #fff; font-size: 1.2rem; font-weight: bold;">${s.card1BackTitle || 'Unlocked #001'}</h3>
            <p style="color: rgba(255,255,255,0.9); font-size: 0.82rem; margin-top: 8px;">Hardware geaccelereerde CSS 3D transform.</p>
          </div>
        </div>

        <div class="card-3d" id="card-2" style="transition: transform ${s.flipDuration}s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
          <div class="card-face card-face-front">
            <span style="font-size: 3rem; margin-bottom: 12px;">⚡</span>
            <h3 id="card-2-front-txt" style="color: #fff; font-size: 1.2rem; font-weight: bold;">${s.card2Title || 'Cyber Shield'}</h3>
            <p style="color: #94a3b8; font-size: 0.82rem; margin-top: 8px;">Klik of hover om te roteren in 3D ruimte.</p>
          </div>
          <div class="card-face card-face-back" style="background: linear-gradient(135deg, #ec4899, #f59e0b);">
            <span style="font-size: 3rem; margin-bottom: 12px;">🔮</span>
            <h3 id="card-2-back-txt" style="color: #fff; font-size: 1.2rem; font-weight: bold;">${s.card2BackTitle || 'Activeer Matrix'}</h3>
            <p style="color: rgba(255,255,255,0.9); font-size: 0.82rem; margin-top: 8px;">Met dynamische schaduwwerking.</p>
          </div>
        </div>
      </div>
      <button id="btn-flip-all" class="btn-action btn-primary" style="font-size: 0.84rem; padding: 8px 20px;">
        🔄 Draai Beide Kaarten Om
      </button>
    `;

    this.wrapper.querySelectorAll('.card-3d').forEach(c => {
      c.addEventListener('click', () => c.classList.toggle('flipped'));
    });

    this.wrapper.querySelector('#btn-flip-all').addEventListener('click', () => {
      this.triggerFlip();
    });
  },
  triggerFlip() {
    this.wrapper.querySelectorAll('.card-3d').forEach(c => c.classList.toggle('flipped'));
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    const s = this.settings;
    const c1f = this.wrapper.querySelector('#card-1-front-txt');
    const c1b = this.wrapper.querySelector('#card-1-back-txt');
    const c2f = this.wrapper.querySelector('#card-2-front-txt');
    const c2b = this.wrapper.querySelector('#card-2-back-txt');
    if (c1f) c1f.textContent = s.card1Title || 'Quantum Pass';
    if (c1b) c1b.textContent = s.card1BackTitle || 'Unlocked #001';
    if (c2f) c2f.textContent = s.card2Title || 'Cyber Shield';
    if (c2b) c2b.textContent = s.card2BackTitle || 'Activeer Matrix';
  },
  destroy() {},
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>3D Flip Cards: ${s.card1Title || 'Quantum Pass'}</title>
  <style>
    body { margin: 0; background: #0c0f18; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
    .wrap { perspective: ${s.cardPerspective}px; }
    .card {
      width: 220px; height: 320px; position: relative; transform-style: preserve-3d;
      transition: transform ${s.flipDuration}s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer;
    }
    .card:hover { transform: rotateY(180deg) scale(1.05); }
    .face {
      position: absolute; inset: 0; border-radius: 16px; backface-visibility: hidden;
      display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 20px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.5); text-align: center;
    }
    .front { background: #1e293b; }
    .back { background: linear-gradient(135deg, ${s.accentGradStart}, ${s.accentGradEnd}); transform: rotateY(180deg); }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="face front"><h3>${s.card1Title || 'Voorkant'}</h3><p>Hover me!</p></div>
      <div class="face back"><h3>${s.card1BackTitle || 'Achterkant'}</h3><p>3D CSS Magic</p></div>
    </div>
  </div>
</body>
</html>`;
  }
};

