// ========================================================
// EXTRA LEGENDARY EFFECTS:
// 1. Tearable Cloth (Verlet Physics)
// 2. ASCII Matrix Video / Art Renderer
// 3. 80s Outrun Synthwave 3D Grid
// 4. Boids Flocking Simulation
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// ========================================================
// 1. TEARABLE CLOTH SIMULATION (VERLET PHYSICS)
// ========================================================
window.EffectRegistry['tearable-cloth'] = {
  id: 'tearable-cloth',
  title: 'Tearable 3D Cloth Simulation',
  category: 'Physics & Simulation',
  tech: 'Verlet Numerical Integration & Elastic Constraints',
  github: 'https://github.com/dissimulate/Tearable-Cloth',
  description: 'Interactieve lap stof opgebouwd uit elastische fysica-punten. Trek met links om te bewegen, snijd met rechts (of Shift) om de stof te scheuren!',
  defaultSettings: {
    clothColor: '#38bdf8',
    gravity: 0.2,
    physicsAccuracy: 3,
    tearDistance: 60
  },
  controls: [
    { type: 'color', key: 'clothColor', label: 'Stof Kleur' },
    { type: 'range', key: 'gravity', label: 'Zwaartekracht', min: 0, max: 0.8, step: 0.05 },
    { type: 'range', key: 'physicsAccuracy', label: 'Fysica Precisie', min: 1, max: 6, step: 1 },
    { type: 'range', key: 'tearDistance', label: 'Scheur Gevoeligheid (px)', min: 30, max: 120, step: 5 },
    { type: 'trigger', key: 'triggerResetCloth', label: '🧵 Herstel Stof (Reset)' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    this.canvas.style.cursor = 'grab';

    this.wrapper = document.createElement('div');
    this.wrapper.style.position = 'relative';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';

    const hint = document.createElement('div');
    hint.style.position = 'absolute';
    hint.style.top = '16px';
    hint.style.left = '50%';
    hint.style.transform = 'translateX(-50%)';
    hint.style.padding = '6px 16px';
    hint.style.background = 'rgba(15, 23, 42, 0.75)';
    hint.style.border = '1px solid rgba(56, 189, 248, 0.3)';
    hint.style.borderRadius = '999px';
    hint.style.color = 'var(--accent-cyan)';
    hint.style.fontSize = '0.84rem';
    hint.style.fontWeight = '600';
    hint.style.pointerEvents = 'none';
    hint.style.zIndex = '5';
    hint.textContent = '🖱️ Linkermuisknop = Trekken | Rechtermuisknop / Shift-Sleep = Scheuren & Knippen ✂️';

    this.wrapper.appendChild(hint);
    this.wrapper.appendChild(this.canvas);
    container.innerHTML = '';
    container.appendChild(this.wrapper);
    this.ctx = this.canvas.getContext('2d');

    this.mouse = { x: 0, y: 0, px: 0, py: 0, down: false, button: 0 };
    this.initCloth();

    this.onMouseDown = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.button = e.button;
      this.mouse.px = this.mouse.x = e.clientX - rect.left;
      this.mouse.py = this.mouse.y = e.clientY - rect.top;
      this.mouse.down = true;
    };
    this.onMouseMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.px = this.mouse.x;
      this.mouse.py = this.mouse.y;
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    };
    this.onMouseUp = () => { this.mouse.down = false; };
    this.onContextMenu = (e) => e.preventDefault();

    this.canvas.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('contextmenu', this.onContextMenu);

    this.active = true;
    this.loop();
  },
  initCloth() {
    this.width = this.canvas.width = this.canvas.offsetWidth || 800;
    this.height = this.canvas.height = this.canvas.offsetHeight || 500;

    this.points = [];
    this.constraints = [];

    const cols = Math.floor(Math.min(46, this.width / 16));
    const rows = Math.floor(Math.min(28, this.height / 16));
    const startX = (this.width - cols * 14) / 2;
    const startY = 40;
    const spacing = 14;

    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        const p = {
          x: startX + x * spacing,
          y: startY + y * spacing,
          px: startX + x * spacing,
          py: startY + y * spacing,
          pinned: y === 0 && (x % 3 === 0 || x === cols)
        };
        this.points.push(p);

        if (x > 0) {
          this.constraints.push({ p1: p, p2: this.points[this.points.length - 2], length: spacing });
        }
        if (y > 0) {
          this.constraints.push({ p1: p, p2: this.points[(y - 1) * (cols + 1) + x], length: spacing });
        }
      }
    }
  },
  triggerResetCloth() {
    this.initCloth();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
  },
  loop() {
    if (!this.active) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const grav = this.settings.gravity;
    const tearDist = this.settings.tearDistance;
    const accuracy = this.settings.physicsAccuracy;

    // Update point positions (Verlet)
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      if (p.pinned) continue;

      const vx = (p.x - p.px) * 0.99;
      const vy = (p.y - p.py) * 0.99;
      p.px = p.x;
      p.py = p.y;
      p.x += vx;
      p.y += vy + grav;

      // Mouse interaction
      if (this.mouse.down) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.hypot(dx, dy);

        // Right-click or Shift-drag to slice / cut cloth
        if (this.mouse.button === 2 || window.event?.shiftKey) {
          if (dist < 28) {
            p.px = p.x;
            p.py = p.y;
          }
        } else if (dist < 25) {
          p.px = p.x - (this.mouse.x - this.mouse.px) * 1.8;
          p.py = p.y - (this.mouse.y - this.mouse.py) * 1.8;
        }
      }
    }

    // Solve constraints
    for (let iter = 0; iter < accuracy; iter++) {
      for (let i = this.constraints.length - 1; i >= 0; i--) {
        const c = this.constraints[i];
        const dx = c.p2.x - c.p1.x;
        const dy = c.p2.y - c.p1.y;
        const dist = Math.hypot(dx, dy);

        // Cut / tear constraint if stretched past tearDistance or right mouse slice
        const isCut = (this.mouse.down && (this.mouse.button === 2 || window.event?.shiftKey) &&
          Math.hypot((c.p1.x + c.p2.x) / 2 - this.mouse.x, (c.p1.y + c.p2.y) / 2 - this.mouse.y) < 18);

        if (dist > tearDist || isCut) {
          this.constraints.splice(i, 1);
          continue;
        }

        const diff = (c.length - dist) / dist;
        const offsetX = dx * diff * 0.5;
        const offsetY = dy * diff * 0.5;

        if (!c.p1.pinned) { c.p1.x -= offsetX; c.p1.y -= offsetY; }
        if (!c.p2.pinned) { c.p2.x += offsetX; c.p2.y += offsetY; }
      }
    }

    // Render cloth links
    ctx.strokeStyle = this.settings.clothColor;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (let i = 0; i < this.constraints.length; i++) {
      const c = this.constraints[i];
      ctx.moveTo(c.p1.x, c.p1.y);
      ctx.lineTo(c.p2.x, c.p2.y);
    }
    ctx.stroke();

    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Tearable Cloth Simulation</title>
  <style>
    body { margin: 0; background: #0b0f19; overflow: hidden; height: 100vh; font-family: sans-serif; }
    canvas { display: block; width: 100vw; height: 100vh; cursor: crosshair; }
    .hint { position: fixed; top: 16px; left: 50%; transform: translateX(-50%); color: #38bdf8; background: rgba(0,0,0,0.7); padding: 8px 18px; border-radius: 999px; font-size: 13px; }
  </style>
</head>
<body>
  <div class="hint">🖱️ Links = trekken | Rechts (of Shift) = snijden / scheuren ✂️</div>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c'), ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
    const points = [], constraints = [];
    const cols = 40, rows = 26, sp = 14, startX = (w - cols*sp)/2, startY = 40;
    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        const p = { x: startX + x*sp, y: startY + y*sp, px: startX + x*sp, py: startY + y*sp, pinned: y === 0 && x % 4 === 0 };
        points.push(p);
        if (x > 0) constraints.push({ p1: p, p2: points[points.length-2], len: sp });
        if (y > 0) constraints.push({ p1: p, p2: points[(y-1)*(cols+1) + x], len: sp });
      }
    }
    const mouse = { x: 0, y: 0, px: 0, py: 0, down: false, btn: 0 };
    window.addEventListener('mousedown', e => { mouse.down = true; mouse.btn = e.button; mouse.x = mouse.px = e.clientX; mouse.y = mouse.py = e.clientY; });
    window.addEventListener('mousemove', e => { mouse.px = mouse.x; mouse.py = mouse.y; mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseup', () => mouse.down = false);
    window.addEventListener('contextmenu', e => e.preventDefault());

    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (const p of points) {
        if (p.pinned) continue;
        const vx = (p.x - p.px) * 0.99, vy = (p.y - p.py) * 0.99;
        p.px = p.x; p.py = p.y; p.x += vx; p.y += vy + ${s.gravity};
        if (mouse.down && Math.hypot(p.x - mouse.x, p.y - mouse.y) < 25) {
          p.px = p.x - (mouse.x - mouse.px)*1.6; p.py = p.y - (mouse.y - mouse.py)*1.6;
        }
      }
      for (let iter = 0; iter < ${s.physicsAccuracy}; iter++) {
        for (let i = constraints.length - 1; i >= 0; i--) {
          const c = constraints[i];
          const dx = c.p2.x - c.p1.x, dy = c.p2.y - c.p1.y, dist = Math.hypot(dx, dy);
          if (dist > ${s.tearDistance} || (mouse.down && mouse.btn === 2 && Math.hypot((c.p1.x+c.p2.x)/2 - mouse.x, (c.p1.y+c.p2.y)/2 - mouse.y) < 18)) {
            constraints.splice(i, 1); continue;
          }
          const diff = (c.len - dist) / dist * 0.5;
          if (!c.p1.pinned) { c.p1.x -= dx*diff; c.p1.y -= dy*diff; }
          if (!c.p2.pinned) { c.p2.x += dx*diff; c.p2.y += dy*diff; }
        }
      }
      ctx.strokeStyle = '${s.clothColor}'; ctx.lineWidth = 1.4; ctx.beginPath();
      for (const c of constraints) { ctx.moveTo(c.p1.x, c.p1.y); ctx.lineTo(c.p2.x, c.p2.y); }
      ctx.stroke();
      requestAnimationFrame(tick);
    }
    tick();
  </script>
</body>
</html>`;
  }
};

// ========================================================
// 2. ASCII MATRIX ART & VIDEO CONVERTER
// ========================================================
window.EffectRegistry['ascii-art'] = {
  id: 'ascii-art',
  title: 'ASCII Art Matrix Real-Time Renderer',
  category: 'Special / Experimental',
  tech: 'HTML5 Canvas Pixel Luma Grayscale to Typography',
  github: 'https://github.com/idevelop/ascii-camera',
  description: 'Converteert real-time animaties of camerabeelden om in vloeiende typografische retro ASCII-tekens (@%#*+=-:. ).',
  defaultSettings: {
    textColor: '#22c55e',
    fontSize: 10,
    charSet: '@%#*+=-:. ',
    invert: false,
    speed: 1.2
  },
  controls: [
    { type: 'color', key: 'textColor', label: 'ASCII Tekstkleur' },
    { type: 'range', key: 'fontSize', label: 'Karakter Grootte (px)', min: 8, max: 18, step: 1 },
    { type: 'range', key: 'speed', label: 'Animatie Snelheid', min: 0.5, max: 3, step: 0.2 },
    { type: 'switch', key: 'invert', label: 'Inverteer Helderheid' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.pre = document.createElement('pre');
    this.pre.style.margin = '0';
    this.pre.style.padding = '12px';
    this.pre.style.fontFamily = 'monospace';
    this.pre.style.lineHeight = '0.78';
    this.pre.style.letterSpacing = '1px';
    this.pre.style.background = '#020617';
    this.pre.style.color = this.settings.textColor;
    this.pre.style.textShadow = `0 0 8px ${this.settings.textColor}`;
    this.pre.style.width = '100%';
    this.pre.style.height = '100%';
    this.pre.style.overflow = 'hidden';
    this.pre.style.display = 'flex';
    this.pre.style.alignItems = 'center';
    this.pre.style.justifyContent = 'center';
    this.pre.style.boxSizing = 'border-box';
    this.pre.style.userSelect = 'none';

    container.innerHTML = '';
    container.appendChild(this.pre);

    // Procedural source offscreen canvas
    this.sourceCanvas = document.createElement('canvas');
    this.sourceCtx = this.sourceCanvas.getContext('2d', { willReadFrequently: true });
    this.time = 0;

    this.active = true;
    this.loop();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.pre) {
      this.pre.style.color = this.settings.textColor;
      this.pre.style.textShadow = `0 0 8px ${this.settings.textColor}`;
    }
  },
  loop() {
    if (!this.active) return;
    this.time += 0.04 * this.settings.speed;

    const fs = this.settings.fontSize;
    const cols = Math.floor(this.pre.clientWidth / (fs * 0.65)) || 60;
    const rows = Math.floor(this.pre.clientHeight / (fs * 0.85)) || 35;

    this.sourceCanvas.width = cols;
    this.sourceCanvas.height = rows;
    const ctx = this.sourceCtx;

    // Draw dynamic cyber plasma / donut geometry
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, cols, rows);

    const cx = cols / 2;
    const cy = rows / 2;
    for (let r = 0; r < 3; r++) {
      const angle = this.time + r * 1.5;
      const ox = cx + Math.cos(angle) * (cols * 0.22);
      const oy = cy + Math.sin(angle * 1.3) * (rows * 0.22);

      const rad = ctx.createRadialGradient(ox, oy, 2, ox, oy, cols * 0.35);
      rad.addColorStop(0, '#ffffff');
      rad.addColorStop(0.5, '#888888');
      rad.addColorStop(1, '#000000');
      ctx.fillStyle = rad;
      ctx.beginPath();
      ctx.arc(ox, oy, cols * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }

    const imgData = ctx.getImageData(0, 0, cols, rows).data;
    const chars = this.settings.charSet;
    const invert = this.settings.invert;
    let output = '';

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const idx = (y * cols + x) * 4;
        const r = imgData[idx];
        const g = imgData[idx + 1];
        const b = imgData[idx + 2];
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        const norm = invert ? (255 - luma) / 255 : luma / 255;
        const charIdx = Math.floor(norm * (chars.length - 1));
        output += chars[charIdx];
      }
      output += '\n';
    }

    this.pre.textContent = output;
    this.pre.style.fontSize = `${fs}px`;
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
  <title>ASCII Matrix Art</title>
  <style>
    body { margin: 0; background: #000; overflow: hidden; height: 100vh; display: flex; align-items: center; justify-content: center; }
    pre { font-family: monospace; line-height: 0.78; letter-spacing: 1px; color: ${s.textColor}; text-shadow: 0 0 10px ${s.textColor}; font-size: ${s.fontSize}px; margin: 0; }
  </style>
</head>
<body>
  <pre id="ascii"></pre>
  <script>
    const pre = document.getElementById('ascii');
    const c = document.createElement('canvas'), ctx = c.getContext('2d');
    const chars = '${s.charSet}';
    let t = 0;
    function render() {
      t += 0.05 * ${s.speed};
      const cols = 90, rows = 45; c.width = cols; c.height = rows;
      ctx.fillStyle = '#000'; ctx.fillRect(0,0,cols,rows);
      for (let i = 0; i < 3; i++) {
        const x = cols/2 + Math.cos(t + i*1.4)*(cols*0.25);
        const y = rows/2 + Math.sin(t*1.2 + i*1.4)*(rows*0.25);
        const g = ctx.createRadialGradient(x,y,2,x,y,cols*0.3);
        g.addColorStop(0, '#fff'); g.addColorStop(1, '#000');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x,y,cols*0.3,0,Math.PI*2); ctx.fill();
      }
      const data = ctx.getImageData(0,0,cols,rows).data;
      let out = '';
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const p = (y*cols+x)*4;
          const luma = 0.3*data[p] + 0.59*data[p+1] + 0.11*data[p+2];
          out += chars[Math.floor((luma/255)*(chars.length-1))];
        }
        out += '\\n';
      }
      pre.textContent = out;
      requestAnimationFrame(render);
    }
    render();
  </script>
</body>
</html>`;
  }
};

// ========================================================
// 3. 80s OUTRUN SYNTHWAVE 3D GRID
// ========================================================
window.EffectRegistry['synthwave-grid'] = {
  id: 'synthwave-grid',
  title: '80s Outrun Synthwave 3D Grid',
  category: 'Css 3D Effect',
  tech: 'CSS 3D Perspective Plane & Horizon Shader',
  github: 'https://github.com/lindelof/awesome-web-effect',
  description: 'Oneindig rollende neon rastervloer in 3D perspectief met ondergaande retro zon en sterrenhemel.',
  defaultSettings: {
    gridColor: '#ec4899',
    sunColor: '#f59e0b',
    horizonGlow: '#06b6d4',
    speed: 3
  },
  controls: [
    { type: 'color', key: 'gridColor', label: 'Neon Raster Kleur' },
    { type: 'color', key: 'sunColor', label: 'Retro Zon Kleur' },
    { type: 'color', key: 'horizonGlow', label: 'Horizon Gloed Kleur' },
    { type: 'range', key: 'speed', label: 'Rolsnelheid (sec)', min: 1, max: 8, step: 0.5 }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.wrapper = document.createElement('div');
    this.wrapper.style.position = 'relative';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';
    this.wrapper.style.overflow = 'hidden';
    this.wrapper.style.background = 'linear-gradient(180deg, #090a16 0%, #1e113a 45%, #2a0b38 70%, #000 100%)';

    this.render();
    container.innerHTML = '';
    container.appendChild(this.wrapper);
  },
  render() {
    const s = this.settings;
    this.wrapper.innerHTML = `
      <!-- Retrowave Sun -->
      <div style="
        position: absolute; top: 22%; left: 50%; transform: translateX(-50%);
        width: 220px; height: 220px; border-radius: 50%;
        background: linear-gradient(180deg, ${s.sunColor} 0%, #ea580c 45%, #ec4899 100%);
        box-shadow: 0 0 80px ${s.sunColor}aa;
        overflow: hidden;
      ">
        <!-- Horizontal blinds across sun -->
        <div style="position: absolute; inset: 0; background: repeating-linear-gradient(180deg, transparent 0px, transparent 8px, #090a16 8px, #090a16 12px); opacity: 0.85;"></div>
      </div>

      <!-- Mountains silhouette -->
      <div style="
        position: absolute; top: 46%; left: 0; right: 0; height: 90px;
        background: radial-gradient(ellipse at 50% 100%, ${s.horizonGlow}55 0%, transparent 70%);
        z-index: 2; pointer-events: none;
      "></div>

      <!-- 3D Grid Plane Perspective -->
      <div style="
        position: absolute; bottom: 0; left: -50%; width: 200%; height: 52%;
        perspective: 450px; overflow: hidden; z-index: 3;
      ">
        <div id="synth-grid-floor" style="
          width: 100%; height: 200%;
          background-image:
            linear-gradient(90deg, ${s.gridColor} 2px, transparent 2px),
            linear-gradient(0deg, ${s.gridColor} 2px, transparent 2px);
          background-size: 55px 55px;
          transform-origin: 50% 0%;
          transform: rotateX(76deg);
          box-shadow: 0 0 35px ${s.gridColor}88 inset;
          animation: moveGrid ${s.speed}s linear infinite;
        "></div>
      </div>
    `;

    // Ensure keyframe is added
    if (!document.getElementById('synthwave-keyframes')) {
      const style = document.createElement('style');
      style.id = 'synthwave-keyframes';
      style.textContent = `
        @keyframes moveGrid {
          0% { background-position: 0 0; }
          100% { background-position: 0 55px; }
        }
      `;
      document.head.appendChild(style);
    }
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    this.render();
  },
  destroy() {},
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>80s Outrun Synthwave Grid</title>
  <style>
    body { margin: 0; background: #070913; overflow: hidden; height: 100vh; position: relative; }
    .sun {
      position: absolute; top: 20%; left: 50%; transform: translateX(-50%);
      width: 220px; height: 220px; border-radius: 50%;
      background: linear-gradient(180deg, ${s.sunColor} 0%, #ea580c 45%, #ec4899 100%);
      box-shadow: 0 0 80px ${s.sunColor}aa;
    }
    .sun::after {
      content: ""; position: absolute; inset: 0;
      background: repeating-linear-gradient(180deg, transparent 0px, transparent 8px, #070913 8px, #070913 12px);
    }
    .grid-wrap {
      position: absolute; bottom: 0; left: -50%; width: 200%; height: 50%;
      perspective: 450px; overflow: hidden;
    }
    .grid {
      width: 100%; height: 200%;
      background-image: linear-gradient(90deg, ${s.gridColor} 2px, transparent 2px), linear-gradient(0deg, ${s.gridColor} 2px, transparent 2px);
      background-size: 55px 55px; transform-origin: 50% 0%; transform: rotateX(76deg);
      box-shadow: 0 0 35px ${s.gridColor}88 inset; animation: roll ${s.speed}s linear infinite;
    }
    @keyframes roll { from { background-position: 0 0; } to { background-position: 0 55px; } }
  </style>
</head>
<body>
  <div class="sun"></div>
  <div class="grid-wrap"><div class="grid"></div></div>
</body>
</html>`;
  }
};

// ========================================================
// 4. BOIDS FLOCKING SIMULATION
// ========================================================
window.EffectRegistry['boids-flock'] = {
  id: 'boids-flock',
  title: 'Boids Flocking Physics Simulation',
  category: 'Physics & Simulation',
  tech: 'Craig Reynolds Autonomous Agent Physics',
  github: 'https://github.com/lindelof/awesome-web-effect',
  description: 'Natuurkundige zwermsimulatie van honderden autonome deeltjes met regels voor cohesie, uitlijning en muisontwijking.',
  defaultSettings: {
    boidCount: 160,
    maxSpeed: 3.5,
    boidColor: '#38bdf8',
    scatterForce: 4
  },
  controls: [
    { type: 'range', key: 'boidCount', label: 'Aantal Boids', min: 50, max: 350, step: 10 },
    { type: 'range', key: 'maxSpeed', label: 'Max Vliegsnelheid', min: 1.5, max: 7, step: 0.5 },
    { type: 'color', key: 'boidColor', label: 'Boid Gloed Kleur' },
    { type: 'range', key: 'scatterForce', label: 'Muis Verstrooikracht', min: 1, max: 10, step: 1 }
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

    this.mouse = { x: -9999, y: -9999 };
    this.onMouseMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    };
    this.onMouseLeave = () => { this.mouse.x = -9999; this.mouse.y = -9999; };

    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mouseleave', this.onMouseLeave);

    this.initBoids();
    this.active = true;
    this.loop();
  },
  initBoids() {
    this.width = this.canvas.width = this.canvas.offsetWidth || 800;
    this.height = this.canvas.height = this.canvas.offsetHeight || 500;

    this.boids = [];
    for (let i = 0; i < this.settings.boidCount; i++) {
      this.boids.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4
      });
    }
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.boids.length !== this.settings.boidCount) this.initBoids();
  },
  loop() {
    if (!this.active) return;
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(10, 14, 23, 0.25)';
    ctx.fillRect(0, 0, this.width, this.height);

    const maxSp = this.settings.maxSpeed;
    const color = this.settings.boidColor;
    const scatter = this.settings.scatterForce;

    for (let i = 0; i < this.boids.length; i++) {
      const b = this.boids[i];

      // Flocking rules
      let sepX = 0, sepY = 0;
      let alignX = 0, alignY = 0;
      let cohX = 0, cohY = 0;
      let neighbors = 0;

      for (let j = 0; j < this.boids.length; j++) {
        if (i === j) continue;
        const o = this.boids[j];
        const dx = o.x - b.x;
        const dy = o.y - b.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 0 && dist < 55) {
          // Separation
          if (dist < 22) {
            sepX -= dx / dist;
            sepY -= dy / dist;
          }
          // Alignment & Cohesion
          alignX += o.vx;
          alignY += o.vy;
          cohX += o.x;
          cohY += o.y;
          neighbors++;
        }
      }

      if (neighbors > 0) {
        alignX /= neighbors;
        alignY /= neighbors;
        cohX = (cohX / neighbors - b.x) * 0.01;
        cohY = (cohY / neighbors - b.y) * 0.01;

        b.vx += sepX * 0.15 + (alignX - b.vx) * 0.05 + cohX;
        b.vy += sepY * 0.15 + (alignY - b.vy) * 0.05 + cohY;
      }

      // Mouse predator repulsion
      const mdx = b.x - this.mouse.x;
      const mdy = b.y - this.mouse.y;
      const mdist = Math.hypot(mdx, mdy);
      if (mdist < 120 && mdist > 0) {
        b.vx += (mdx / mdist) * scatter;
        b.vy += (mdy / mdist) * scatter;
      }

      // Limit speed
      const sp = Math.hypot(b.vx, b.vy);
      if (sp > maxSp) {
        b.vx = (b.vx / sp) * maxSp;
        b.vy = (b.vy / sp) * maxSp;
      }

      b.x += b.vx;
      b.y += b.vy;

      // Screen wrapping
      if (b.x < 0) b.x = this.width;
      if (b.x > this.width) b.x = 0;
      if (b.y < 0) b.y = this.height;
      if (b.y > this.height) b.y = 0;

      // Render boid triangle
      const angle = Math.atan2(b.vy, b.vx);
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(9, 0);
      ctx.lineTo(-6, -4.5);
      ctx.lineTo(-3, 0);
      ctx.lineTo(-6, 4.5);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.restore();
    }

    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.canvas.removeEventListener('mouseleave', this.onMouseLeave);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Boids Flocking Physics</title>
  <style>
    body { margin: 0; background: #070b14; overflow: hidden; height: 100vh; }
    canvas { display: block; width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c'), ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
    const boids = Array.from({ length: ${s.boidCount} }, () => ({
      x: Math.random()*w, y: Math.random()*h, vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4
    }));
    const mouse = { x: -999, y: -999 };
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    function tick() {
      ctx.fillStyle = 'rgba(7, 11, 20, 0.25)'; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < boids.length; i++) {
        const b = boids[i];
        let sx=0, sy=0, ax=0, ay=0, cx=0, cy=0, n=0;
        for (let j = 0; j < boids.length; j++) {
          if (i === j) continue;
          const o = boids[j], dx = o.x-b.x, dy = o.y-b.y, d = Math.hypot(dx,dy);
          if (d < 50 && d > 0) {
            if (d < 20) { sx -= dx/d; sy -= dy/d; }
            ax += o.vx; ay += o.vy; cx += o.x; cy += o.y; n++;
          }
        }
        if (n > 0) { b.vx += sx*0.15 + (ax/n - b.vx)*0.05 + ((cx/n - b.x)*0.01); b.vy += sy*0.15 + (ay/n - b.vy)*0.05 + ((cy/n - b.y)*0.01); }
        const mdx = b.x - mouse.x, mdy = b.y - mouse.y, md = Math.hypot(mdx, mdy);
        if (md < 110 && md > 0) { b.vx += (mdx/md)*${s.scatterForce}; b.vy += (mdy/md)*${s.scatterForce}; }
        const sp = Math.hypot(b.vx, b.vy);
        if (sp > ${s.maxSpeed}) { b.vx = (b.vx/sp)*${s.maxSpeed}; b.vy = (b.vy/sp)*${s.maxSpeed}; }
        b.x = (b.x + b.vx + w) % w; b.y = (b.y + b.vy + h) % h;

        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(Math.atan2(b.vy, b.vx));
        ctx.fillStyle = '${s.boidColor}'; ctx.beginPath();
        ctx.moveTo(8,0); ctx.lineTo(-5,-4); ctx.lineTo(-2,0); ctx.lineTo(-5,4); ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(tick);
    }
    tick();
  </script>
</body>
</html>`;
  }
};

