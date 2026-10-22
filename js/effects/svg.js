// ========================================================
// SVG ANIMATIONS
// Source: lindelof/awesome-web-effect
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// 1. DRAW SVG PATH ANIMATION (WITH CUSTOM NAME & TEXT SUPPORT)
window.EffectRegistry['draw-svg'] = {
  id: 'draw-svg',
  title: 'SVG Path Stroke Drawing (Eigen Naam / Tekst)',
  category: 'SVG Animations',
  tech: 'SVG Stroke Dashoffset Animation',
  github: 'https://github.com/lcdsantos/jquery-drawsvg',
  description: 'Zichzelf tekenende vectorillustratie of typografische naam met vloeiende stroke-dashoffset interpolatie.',
  defaultSettings: {
    mode: 'custom-text', // 'custom-text' of 'geometric-icon'
    customText: 'Geert',
    fontFamily: 'Great Vibes', // 'Great Vibes', 'Pacifico', 'Cinzel', 'Montserrat', 'Fira Code'
    fontSize: 80,
    strokeWidth: 2.5,
    duration: 3.5,
    strokeColor: '#38bdf8',
    fillAfterDraw: true
  },
  controls: [
    { type: 'text', key: 'customText', label: '✍️ Jouw Naam / Tekst', placeholder: 'Typ je naam...' },
    { type: 'select', key: 'fontFamily', label: 'Lettertype Stijl', options: ['Great Vibes', 'Pacifico', 'Cinzel', 'Montserrat', 'Fira Code'] },
    { type: 'range', key: 'fontSize', label: 'Lettergrootte (px)', min: 32, max: 130, step: 2 },
    { type: 'range', key: 'strokeWidth', label: 'Lijndikte (px)', min: 1, max: 6, step: 0.5 },
    { type: 'range', key: 'duration', label: 'Tekenduur (sec)', min: 1.5, max: 8, step: 0.5 },
    { type: 'color', key: 'strokeColor', label: 'Lijnkleur & Gloed' },
    { type: 'switch', key: 'fillAfterDraw', label: 'Opvullen Na Tekenen' },
    { type: 'select', key: 'mode', label: 'Teken Modus', options: ['custom-text', 'geometric-icon'] },
    { type: 'trigger', key: 'triggerRedraw', label: '✏️ Teken Opnieuw Af' }
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
    this.wrapper.style.gap = '16px';

    this.active = true;
    this.render();
    container.innerHTML = '';
    container.appendChild(this.wrapper);
    this.animateStroke();
  },
  render() {
    const s = this.settings;
    const isText = s.mode === 'custom-text';

    this.wrapper.innerHTML = `
      <!-- Quick on-stage name input -->
      <div style="display: flex; gap: 8px; align-items: center; max-width: 500px; width: 90%; z-index: 5;">
        <input type="text" id="svg-live-name" value="${s.customText || 'Geert'}" placeholder="Typ hier jouw naam..."
          style="flex: 1; height: 42px; background: #1e293b; border: 2px solid ${s.strokeColor}; border-radius: 10px; color: #fff; padding: 0 16px; font-size: 1.05rem; font-weight: 700; outline: none; box-shadow: 0 0 15px ${s.strokeColor}33;">
        <button id="btn-draw-now" class="btn-action btn-primary" style="height: 42px; padding: 0 18px; font-weight: 700; white-space: nowrap;">
          ✍️ Teken Naam
        </button>
      </div>

      <div style="position: relative; width: 680px; max-width: 95%; height: 320px; display: flex; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.4); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
        ${isText ? `
          <svg id="draw-svg-elem" viewBox="0 0 700 280" width="100%" height="100%" style="overflow: visible;">
            <!-- Outer decorative corner strokes -->
            <path d="M 40 60 L 40 40 L 60 40" stroke="${s.strokeColor}" stroke-width="2" fill="none" opacity="0.6"/>
            <path d="M 640 40 L 660 40 L 660 60" stroke="${s.strokeColor}" stroke-width="2" fill="none" opacity="0.6"/>
            <path d="M 40 220 L 40 240 L 60 240" stroke="${s.strokeColor}" stroke-width="2" fill="none" opacity="0.6"/>
            <path d="M 640 240 L 660 240 L 660 220" stroke="${s.strokeColor}" stroke-width="2" fill="none" opacity="0.6"/>

            <!-- The animated stroked text element -->
            <text id="draw-target-text" x="50%" y="54%" text-anchor="middle" dominant-baseline="central"
              font-family="'${s.fontFamily}', cursive, sans-serif" font-size="${s.fontSize}px" font-weight="bold"
              fill="transparent" stroke="${s.strokeColor}" stroke-width="${s.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"
              style="filter: drop-shadow(0 0 15px ${s.strokeColor}); letter-spacing: 2px;">
              ${s.customText || 'Geert'}
            </text>
          </svg>
        ` : `
          <svg id="draw-svg-elem" viewBox="0 0 400 400" width="300" height="300">
            <path id="draw-target-path" d="M 100 200 C 100 120, 180 120, 200 200 C 220 280, 300 280, 300 200 C 300 120, 220 120, 200 200 C 180 280, 100 280, 100 200 Z"
              fill="none" stroke="${s.strokeColor}" stroke-width="${s.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"
              style="filter: drop-shadow(0 0 15px ${s.strokeColor});" />
            <circle cx="200" cy="200" r="140" fill="none" stroke="${s.strokeColor}" stroke-width="${s.strokeWidth / 2}" stroke-dasharray="8 8" opacity="0.7"/>
          </svg>
        `}
      </div>
    `;

    this.textElem = this.wrapper.querySelector('#draw-target-text');
    this.pathElem = this.wrapper.querySelector('#draw-target-path');

    // Wire live name input
    const liveInput = this.wrapper.querySelector('#svg-live-name');
    const btnDrawNow = this.wrapper.querySelector('#btn-draw-now');

    liveInput.addEventListener('input', (e) => {
      this.settings.customText = e.target.value;
      if (this.textElem) this.textElem.textContent = e.target.value;
      this.animateStroke();
    });

    btnDrawNow.addEventListener('click', () => {
      this.animateStroke();
    });
  },
  animateStroke() {
    clearTimeout(this.loopTimeout);
    clearTimeout(this.fillTimeout);

    const s = this.settings;
    const target = this.textElem || this.pathElem;
    if (!target) return;

    let len = 2500;
    try {
      if (target.getTotalLength) {
        len = Math.max(800, target.getTotalLength());
      } else if (target.getComputedTextLength) {
        len = Math.max(1200, target.getComputedTextLength() * 4.5);
      }
    } catch (e) {
      len = 2500;
    }

    target.style.transition = 'none';
    target.style.strokeDasharray = `${len}`;
    target.style.strokeDashoffset = `${len}`;
    target.style.fill = 'transparent';

    requestAnimationFrame(() => {
      target.style.transition = `stroke-dashoffset ${s.duration}s cubic-bezier(0.4, 0, 0.2, 1)`;
      target.style.strokeDashoffset = '0';

      // Soft fill-in glow after line drawing is finished
      if (s.fillAfterDraw && this.textElem) {
        this.fillTimeout = setTimeout(() => {
          if (!this.active || !this.textElem) return;
          this.textElem.style.transition = 'fill 0.8s ease-in-out';
          this.textElem.style.fill = s.strokeColor;
        }, (s.duration - 0.4) * 1000);
      }

      // Loop drawing animation with pause
      this.loopTimeout = setTimeout(() => {
        if (this.active) this.animateStroke();
      }, (s.duration + 2.5) * 1000);
    });
  },
  triggerRedraw() {
    this.animateStroke();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    this.render();
    this.animateStroke();
  },
  destroy() {
    this.active = false;
    clearTimeout(this.loopTimeout);
    clearTimeout(this.fillTimeout);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    const isText = s.mode === 'custom-text';
    const text = s.customText || 'Geert';

    if (isText) {
      return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>SVG Stroke Name Drawing: ${text}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(s.fontFamily)}&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0; min-height: 100vh; background: #080b12; display: flex;
      flex-direction: column; align-items: center; justify-content: center;
      font-family: sans-serif; overflow: hidden;
    }
    .name-svg {
      width: 700px; max-width: 90vw; height: 300px;
    }
    .drawn-text {
      font-family: '${s.fontFamily}', cursive, sans-serif;
      font-size: ${s.fontSize}px;
      font-weight: bold;
      fill: transparent;
      stroke: ${s.strokeColor};
      stroke-width: ${s.strokeWidth}px;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 2000;
      stroke-dashoffset: 2000;
      animation: drawName ${s.duration}s cubic-bezier(0.4, 0, 0.2, 1) forwards, fillName 0.8s ease-in-out ${s.duration - 0.4}s forwards;
      filter: drop-shadow(0 0 15px ${s.strokeColor});
    }
    @keyframes drawName {
      to { stroke-dashoffset: 0; }
    }
    @keyframes fillName {
      to { fill: ${s.strokeColor}; }
    }
  </style>
</head>
<body>
  <svg class="name-svg" viewBox="0 0 700 280">
    <text class="drawn-text" x="50%" y="54%" text-anchor="middle" dominant-baseline="central">
      ${text}
    </text>
  </svg>
</body>
</html>`;
    }

    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>SVG Stroke Draw</title>
  <style>
    body { margin: 0; background: #080b12; display: flex; align-items: center; justify-content: center; height: 100vh; }
    path {
      stroke: ${s.strokeColor}; stroke-width: ${s.strokeWidth}; fill: none;
      stroke-dasharray: 1000; stroke-dashoffset: 1000;
      animation: draw ${s.duration}s forwards ease-in-out infinite alternate;
      filter: drop-shadow(0 0 12px ${s.strokeColor});
    }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
</head>
<body>
  <svg viewBox="0 0 400 400" width="320" height="320">
    <path d="M 100 200 C 100 120, 180 120, 200 200 C 220 280, 300 280, 300 200 C 300 120, 220 120, 200 200 C 180 280, 100 280, 100 200 Z" />
  </svg>
</body>
</html>`;
  }
};

// 2. SVG ODOMETER / DIGIT ROLLER
window.EffectRegistry['odometer'] = {
  id: 'odometer',
  title: 'SVG Odometer Rolling Counter',
  category: 'SVG Animations',
  tech: 'DOM Smooth Numeric Roll',
  github: 'https://github.com/coderitual/bounty',
  description: 'Odometer teller met soepele animatie en motion blur effect.',
  defaultSettings: {
    targetValue: 84920,
    duration: 2,
    color: '#10b981'
  },
  controls: [
    { type: 'range', key: 'targetValue', label: 'Doel Waarde', min: 1000, max: 100000, step: 1000 },
    { type: 'range', key: 'duration', label: 'Rol Duur (sec)', min: 1, max: 4, step: 0.5 },
    { type: 'color', key: 'color', label: 'Cijfer Kleur' },
    { type: 'trigger', key: 'triggerRoll', label: '🎲 Rol Cijfers Opnieuw' }
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

    this.wrapper.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 3.5rem; font-weight: 800; color: ${this.settings.color}; text-shadow: 0 0 20px ${this.settings.color}66;" id="odometer-display">
        0
      </div>
      <p style="color: #64748b; font-size: 0.85rem; margin-top: 12px;">Precieze kilometerteller / stat tracker animatie.</p>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);
    this.display = this.wrapper.querySelector('#odometer-display');
    this.roll();

    // Auto cycle numbers continuously
    this.rollInterval = setInterval(() => {
      this.settings.targetValue = Math.floor(Math.random() * 85000 + 15000);
      this.roll();
    }, 3200);
  },
  roll() {
    const target = this.settings.targetValue;
    const dur = this.settings.duration * 1000;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / dur);
      // Ease out expo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const cur = Math.floor(ease * target);
      this.display.textContent = cur.toLocaleString();

      if (progress < 1) requestAnimationFrame(step);
      else this.display.textContent = target.toLocaleString();
    };
    requestAnimationFrame(step);
  },
  triggerRoll() {
    this.roll();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.display) {
      this.display.style.color = this.settings.color;
      this.display.style.textShadow = `0 0 20px ${this.settings.color}66`;
    }
  },
  destroy() {
    clearInterval(this.rollInterval);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Odometer Counter</title>
  <style>
    body { margin: 0; background: #07090e; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: monospace; }
    h1 { font-size: 3.5rem; color: ${s.color}; }
  </style>
</head>
<body>
  <h1 id="count">0</h1>
  <script>
    const el = document.getElementById('count'), target = ${s.targetValue}, dur = ${s.duration * 1000};
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      const ease = 1 - Math.pow(2, -10 * p);
      el.textContent = Math.floor(ease * target).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  </script>
</body>
</html>`;
  }
};

