// ========================================================
// BACKGROUND DECORATION EFFECTS
// Source: lindelof/awesome-web-effect
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// 1. PARTICLES BACKGROUND (CONSTELLATION)
window.EffectRegistry['particles-bg'] = {
  id: 'particles-bg',
  title: 'Particles Background (Constellation)',
  category: 'Background Decoration',
  tech: 'Canvas 2D',
  github: 'https://github.com/lindelof/particles-bg',
  description: 'Interactieve sterrenconstellatie met verbindingslijnen en muisaantrekking.',
  defaultSettings: {
    particleCount: 80,
    speed: 1.2,
    maxDistance: 130,
    color: '#3b82f6',
    particleSize: 3,
    connectParticles: true,
    mouseInteraction: true
  },
  controls: [
    { type: 'range', key: 'particleCount', label: 'Aantal Deeltjes', min: 20, max: 250, step: 5 },
    { type: 'range', key: 'speed', label: 'Snelheid', min: 0.2, max: 5, step: 0.1 },
    { type: 'range', key: 'maxDistance', label: 'Verbindingsafstand', min: 50, max: 250, step: 5 },
    { type: 'range', key: 'particleSize', label: 'Deeltjesgrootte', min: 1, max: 8, step: 0.5 },
    { type: 'color', key: 'color', label: 'Thema Kleur' },
    { type: 'switch', key: 'connectParticles', label: 'Lijnen Verbinden' },
    { type: 'switch', key: 'mouseInteraction', label: 'Muis Interactie' }
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
    this.mouse = { x: -1000, y: -1000, radius: 150 };

    this.resize();
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);

    this.onMouseMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    };
    this.onMouseLeave = () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    };

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseleave', this.onMouseLeave);

    this.createParticles();
    this.active = true;
    this.loop();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.particles.length !== this.settings.particleCount) {
      this.createParticles();
    }
  },
  resize() {
    if (!this.canvas) return;
    const rect = this.container ? this.container.getBoundingClientRect() : null;
    this.width = this.canvas.width = Math.floor((rect && rect.width) || this.canvas.offsetWidth || window.innerWidth);
    this.height = this.canvas.height = Math.floor((rect && rect.height) || this.canvas.offsetHeight || window.innerHeight);
  },
  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.settings.particleCount; i++) {
      this.particles.push({
        x: Math.random() * (this.width || window.innerWidth),
        y: Math.random() * (this.height || window.innerHeight),
        vx: (Math.random() - 0.5) * this.settings.speed,
        vy: (Math.random() - 0.5) * this.settings.speed,
        radius: (Math.random() * 0.5 + 0.8) * this.settings.particleSize
      });
    }
  },
  loop() {
    if (!this.active) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const s = this.settings;
    const color = s.color;
    const audio = (window.AudioReactive && window.AudioReactive.active) ? window.AudioReactive.getLevels() : null;
    const speedMult = audio ? (1 + audio.energy * 2) : 1;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx * s.speed * speedMult;
      p.y += p.vy * s.speed * speedMult;

      if (audio && audio.isBeat) {
        const angle = Math.atan2(p.y - (this.height / 2), p.x - (this.width / 2));
        p.x += Math.cos(angle) * (audio.bass * 6);
        p.y += Math.sin(angle) * (audio.bass * 6);
      }

      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Mouse push/pull
      if (s.mouseInteraction) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x -= (dx / dist) * force * 3;
          p.y -= (dy / dist) * force * 3;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
      ctx.fill();

      // Connect lines
      if (s.connectParticles) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < s.maxDistance) {
            const alpha = 1 - dist / s.maxDistance;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = color;
            ctx.globalAlpha = alpha * 0.5;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseleave', this.onMouseLeave);
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
  <title>Particles Background</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0c10; overflow: hidden; height: 100vh; }
    canvas { display: block; width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <canvas id="particles-bg"></canvas>
  <script>
    const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const settings = {
      count: ${s.particleCount},
      speed: ${s.speed},
      maxDist: ${s.maxDistance},
      size: ${s.particleSize},
      color: '${s.color}',
      connect: ${s.connectParticles},
      mouseInteraction: ${s.mouseInteraction}
    };
    const mouse = { x: -1000, y: -1000, radius: 150 };
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    const particles = Array.from({ length: settings.count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * settings.speed,
      vy: (Math.random() - 0.5) * settings.speed,
      radius: (Math.random() * 0.5 + 0.8) * settings.size
    }));

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * settings.speed;
        p.y += p.vy * settings.speed;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (settings.mouseInteraction) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 3;
            p.y -= (dy / dist) * force * 3;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = settings.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = settings.color;
        ctx.fill();

        if (settings.connect) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < settings.maxDist) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = settings.color;
              ctx.globalAlpha = (1 - dist / settings.maxDist) * 0.5;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`;
  }
};

// 2. WARP DRIVE / STARFIELD
window.EffectRegistry['warp-drive'] = {
  id: 'warp-drive',
  title: 'Warp Drive (Hyperspace Starfield)',
  category: 'Background Decoration',
  tech: 'Canvas 2D / 3D Projection',
  github: 'https://github.com/NiklasKnaack/jquery-warpdrive-plugin',
  description: 'Hyperspeed 3D sterrenstelsel met lichtstrepen en instelbare warpsnelheid.',
  defaultSettings: {
    starCount: 600,
    speed: 15,
    streakLength: 0.3,
    color: '#38bdf8',
    starSize: 2,
    fov: 300
  },
  controls: [
    { type: 'range', key: 'starCount', label: 'Aantal Sterren', min: 100, max: 1500, step: 50 },
    { type: 'range', key: 'speed', label: 'Warp Snelheid', min: 2, max: 50, step: 1 },
    { type: 'range', key: 'streakLength', label: 'Streep Lengte', min: 0.05, max: 1, step: 0.05 },
    { type: 'range', key: 'starSize', label: 'Ster Grootte', min: 0.5, max: 5, step: 0.5 },
    { type: 'color', key: 'color', label: 'Ster Kleur' }
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

    this.resize();
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);

    this.createStars();
    this.active = true;
    this.loop();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.stars.length !== this.settings.starCount) {
      this.createStars();
    }
  },
  resize() {
    if (!this.canvas) return;
    const rect = this.container ? this.container.getBoundingClientRect() : null;
    this.width = this.canvas.width = Math.floor((rect && rect.width) || this.canvas.offsetWidth || window.innerWidth);
    this.height = this.canvas.height = Math.floor((rect && rect.height) || this.canvas.offsetHeight || window.innerHeight);
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  },
  createStars() {
    this.stars = [];
    for (let i = 0; i < this.settings.starCount; i++) {
      this.stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1500 + 1,
        prevZ: 0
      });
    }
  },
  loop() {
    if (!this.active) return;
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(5, 7, 12, 0.4)';
    ctx.fillRect(0, 0, this.width, this.height);

    const s = this.settings;
    const fov = s.fov;
    const audio = (window.AudioReactive && window.AudioReactive.active) ? window.AudioReactive.getLevels() : null;
    const effSpeed = audio ? s.speed * (1 + audio.bass * 2.8) : s.speed;

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.prevZ = star.z;
      star.z -= effSpeed;

      if (star.z <= 0) {
        star.z = 1500;
        star.prevZ = 1500;
        star.x = (Math.random() - 0.5) * 2000;
        star.y = (Math.random() - 0.5) * 2000;
      }

      const k = fov / star.z;
      const px = star.x * k + this.centerX;
      const py = star.y * k + this.centerY;

      const prevK = fov / (star.prevZ + (star.z - star.prevZ) * s.streakLength);
      const prevPx = star.x * prevK + this.centerX;
      const prevPy = star.y * prevK + this.centerY;

      if (px >= 0 && px <= this.width && py >= 0 && py <= this.height) {
        const size = Math.max(0.5, (1 - star.z / 1500) * s.starSize * 2);
        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = s.color;
        ctx.lineWidth = size;
        ctx.shadowBlur = 6;
        ctx.shadowColor = s.color;
        ctx.stroke();
      }
    }

    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
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
  <title>Warp Drive Starfield</title>
  <style>
    body { margin: 0; background: #05070c; overflow: hidden; }
    canvas { display: block; width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <canvas id="warpdrive"></canvas>
  <script>
    const canvas = document.getElementById('warpdrive');
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
    let cx = w / 2, cy = h / 2;
    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight;
      cx = w / 2; cy = h / 2;
    });
    const count = ${s.starCount}, speed = ${s.speed}, color = '${s.color}';
    const stars = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 1500 + 1,
      prevZ: 0
    }));
    function draw() {
      ctx.fillStyle = 'rgba(5, 7, 12, 0.3)';
      ctx.fillRect(0, 0, w, h);
      for (const s of stars) {
        s.prevZ = s.z;
        s.z -= speed;
        if (s.z <= 0) { s.z = 1500; s.prevZ = 1500; s.x = (Math.random() - 0.5) * 2000; s.y = (Math.random() - 0.5) * 2000; }
        const k = 300 / s.z, px = s.x * k + cx, py = s.y * k + cy;
        const pk = 300 / (s.prevZ + (s.z - s.prevZ) * ${s.streakLength});
        const ppx = s.x * pk + cx, ppy = s.y * pk + cy;
        ctx.beginPath();
        ctx.moveTo(ppx, ppy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(0.5, (1 - s.z / 1500) * ${s.starSize * 2});
        ctx.stroke();
      }
      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`;
  }
};

// 3. INTERACTIVE WATER RIPPLES
window.EffectRegistry['water-ripples'] = {
  id: 'water-ripples',
  title: 'Water Ripples Effect',
  category: 'Background Decoration',
  tech: 'HTML5 Canvas Ripple Physics',
  github: 'https://github.com/sirxemic/jquery.ripples',
  description: 'Wateroppervlak met golfverspreiding en breking bij muisklik of beweging.',
  defaultSettings: {
    damping: 0.98,
    rippleRadius: 3,
    dropIntensity: 400,
    waterColor: '#0ea5e9'
  },
  controls: [
    { type: 'range', key: 'dropIntensity', label: 'Golf Kracht', min: 100, max: 1000, step: 50 },
    { type: 'range', key: 'damping', label: 'Demping (Rimpelduur)', min: 0.90, max: 0.99, step: 0.01 },
    { type: 'range', key: 'rippleRadius', label: 'Rimpel Straal', min: 1, max: 8, step: 1 },
    { type: 'color', key: 'waterColor', label: 'Water Tint' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    this.canvas.style.cursor = 'crosshair';
    container.innerHTML = '';
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.res = 2; // Resolution divider for smooth performance
    this.resize();

    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);

    this.onPointerDown = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / this.res);
      const y = Math.floor((e.clientY - rect.top) / this.res);
      this.drop(x, y, this.settings.dropIntensity);
    };

    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    this.canvas.addEventListener('pointermove', (e) => {
      if (e.buttons === 1) this.onPointerDown(e);
    });

    // Auto drop periodically
    this.autoDropTimer = setInterval(() => {
      const rx = Math.floor(Math.random() * this.cols);
      const ry = Math.floor(Math.random() * this.rows);
      this.drop(rx, ry, this.settings.dropIntensity * 0.7);
    }, 1200);

    this.active = true;
    this.loop();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
  },
  resize() {
    if (!this.canvas) return;
    const rect = this.container ? this.container.getBoundingClientRect() : null;
    const w = (rect && rect.width) || this.canvas.offsetWidth || window.innerWidth;
    const h = (rect && rect.height) || this.canvas.offsetHeight || window.innerHeight;
    this.width = this.canvas.width = Math.floor(w / this.res);
    this.height = this.canvas.height = Math.floor(h / this.res);
    this.cols = this.width;
    this.rows = this.height;

    const size = this.cols * this.rows;
    this.buffer1 = new Float32Array(size);
    this.buffer2 = new Float32Array(size);
    this.imgData = this.ctx.createImageData(this.cols, this.rows);
  },
  drop(x, y, strength) {
    const r = this.settings.rippleRadius;
    for (let j = -r; j <= r; j++) {
      for (let i = -r; i <= r; i++) {
        if (i * i + j * j <= r * r) {
          const px = x + i, py = y + j;
          if (px >= 0 && px < this.cols && py >= 0 && py < this.rows) {
            this.buffer1[py * this.cols + px] = strength;
          }
        }
      }
    }
  },
  loop() {
    if (!this.active) return;

    const cols = this.cols;
    const rows = this.rows;
    const b1 = this.buffer1;
    const b2 = this.buffer2;
    const damping = this.settings.damping;
    const data = this.imgData.data;

    // Parse color
    let hex = this.settings.waterColor.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const baseR = parseInt(hex.substring(0, 2), 16);
    const baseG = parseInt(hex.substring(2, 4), 16);
    const baseB = parseInt(hex.substring(4, 6), 16);

    for (let y = 1; y < rows - 1; y++) {
      const rowOffset = y * cols;
      for (let x = 1; x < cols - 1; x++) {
        const idx = rowOffset + x;
        b2[idx] = ((b1[idx - 1] + b1[idx + 1] + b1[idx - cols] + b1[idx + cols]) / 2) - b2[idx];
        b2[idx] *= damping;

        // Render shading
        const val = b2[idx];
        const pixelIdx = idx * 4;
        const shade = Math.min(255, Math.max(0, val * 0.8));

        data[pixelIdx] = Math.min(255, baseR + shade);
        data[pixelIdx + 1] = Math.min(255, baseG + shade);
        data[pixelIdx + 2] = Math.min(255, baseB + shade);
        data[pixelIdx + 3] = Math.min(255, 30 + Math.abs(val) * 1.5);
      }
    }

    // Swap buffers
    const temp = this.buffer1;
    this.buffer1 = this.buffer2;
    this.buffer2 = temp;

    this.ctx.putImageData(this.imgData, 0, 0);
    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    clearInterval(this.autoDropTimer);
    window.removeEventListener('resize', this.onResize);
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
  <title>Water Ripples Effect</title>
  <style>
    body { margin: 0; background: #071018; overflow: hidden; }
    canvas { display: block; width: 100vw; height: 100vh; cursor: pointer; }
  </style>
</head>
<body>
  <canvas id="water-ripples"></canvas>
  <script>
    const canvas = document.getElementById('water-ripples');
    const ctx = canvas.getContext('2d');
    const res = 2;
    let cols = Math.floor(window.innerWidth / res);
    let rows = Math.floor(window.innerHeight / res);
    canvas.width = cols; canvas.height = rows;

    let b1 = new Float32Array(cols * rows);
    let b2 = new Float32Array(cols * rows);
    let imgData = ctx.createImageData(cols, rows);

    function drop(x, y, strength) {
      const r = ${s.rippleRadius};
      for (let j = -r; j <= r; j++) {
        for (let i = -r; i <= r; i++) {
          if (i * i + j * j <= r * r) {
            const px = x + i, py = y + j;
            if (px >= 0 && px < cols && py >= 0 && py < rows) b1[py * cols + px] = strength;
          }
        }
      }
    }
    window.addEventListener('pointerdown', e => {
      drop(Math.floor(e.clientX / res), Math.floor(e.clientY / res), ${s.dropIntensity});
    });

    function loop() {
      for (let y = 1; y < rows - 1; y++) {
        const row = y * cols;
        for (let x = 1; x < cols - 1; x++) {
          const idx = row + x;
          b2[idx] = ((b1[idx - 1] + b1[idx + 1] + b1[idx - cols] + b1[idx + cols]) / 2) - b2[idx];
          b2[idx] *= ${s.damping};
          const val = b2[idx];
          const p = idx * 4;
          imgData.data[p] = Math.min(255, 14 + val);
          imgData.data[p + 1] = Math.min(255, 165 + val);
          imgData.data[p + 2] = Math.min(255, 233 + val);
          imgData.data[p + 3] = Math.min(255, 40 + Math.abs(val) * 2);
        }
      }
      let tmp = b1; b1 = b2; b2 = tmp;
      ctx.putImageData(imgData, 0, 0);
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`;
  }
};

// 4. MORPHING BACKGROUND SHAPES
window.EffectRegistry['morphing-shapes'] = {
  id: 'morphing-shapes',
  title: 'Morphing Background Shapes',
  category: 'Background Decoration',
  tech: 'SVG Blob Animation & Gradients',
  github: 'https://github.com/codrops/MorphingBackgroundShapes',
  description: 'Vloeiende organische SVG vormen die transformeren en meebewegen.',
  defaultSettings: {
    speed: 1,
    scale: 1.2,
    gradientStart: '#ec4899',
    gradientEnd: '#8b5cf6',
    blur: 60
  },
  controls: [
    { type: 'range', key: 'speed', label: 'Morph Snelheid', min: 0.2, max: 3, step: 0.1 },
    { type: 'range', key: 'scale', label: 'Vorm Schaal', min: 0.5, max: 2, step: 0.1 },
    { type: 'range', key: 'blur', label: 'Blur / Gloed', min: 10, max: 120, step: 5 },
    { type: 'color', key: 'gradientStart', label: 'Kleur 1 (Begin)' },
    { type: 'color', key: 'gradientEnd', label: 'Kleur 2 (Eind)' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.time = 0;
    this.wrapper = document.createElement('div');
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';
    this.wrapper.style.display = 'flex';
    this.wrapper.style.alignItems = 'center';
    this.wrapper.style.justifyContent = 'center';
    this.wrapper.style.overflow = 'hidden';

    this.wrapper.innerHTML = `
      <svg id="morph-svg" viewBox="0 0 800 800" width="100%" height="100%" style="filter: blur(${this.settings.blur}px); transform: scale(${this.settings.scale});">
        <defs>
          <linearGradient id="morphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${this.settings.gradientStart}" />
            <stop offset="100%" stop-color="${this.settings.gradientEnd}" />
          </linearGradient>
        </defs>
        <path id="morphPath" fill="url(#morphGrad)" opacity="0.8" />
      </svg>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);
    this.path = this.wrapper.querySelector('#morphPath');

    this.active = true;
    this.loop();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    const svg = this.wrapper.querySelector('#morph-svg');
    if (svg) {
      svg.style.filter = `blur(${this.settings.blur}px)`;
      svg.style.transform = `scale(${this.settings.scale})`;
      const stops = svg.querySelectorAll('stop');
      if (stops[0]) stops[0].setAttribute('stop-color', this.settings.gradientStart);
      if (stops[1]) stops[1].setAttribute('stop-color', this.settings.gradientEnd);
    }
  },
  loop() {
    if (!this.active) return;
    this.time += 0.02 * this.settings.speed;

    // Generate dynamic organic blob path
    const cx = 400, cy = 400, baseR = 240;
    const numPoints = 8;
    const points = [];

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const wave = Math.sin(this.time + i * 1.2) * 55 + Math.cos(this.time * 0.7 + i * 2) * 35;
      const r = baseR + wave;
      points.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r
      });
    }

    // Smooth spline
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < numPoints; i++) {
      const p0 = points[i];
      const p1 = points[(i + 1) % numPoints];
      const midX = (p0.x + p1.x) / 2;
      const midY = (p0.y + p1.y) / 2;
      d += ` Q ${p0.x} ${p0.y}, ${midX} ${midY}`;
    }
    d += ' Z';

    if (this.path) this.path.setAttribute('d', d);

    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    if (this.wrapper && this.wrapper.parentNode) {
      this.wrapper.parentNode.removeChild(this.wrapper);
    }
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Morphing Shapes Background</title>
  <style>
    body { margin: 0; background: #080b12; overflow: hidden; display: flex; align-items: center; justify-content: center; height: 100vh; }
    svg { width: 100vw; height: 100vh; filter: blur(${s.blur}px); transform: scale(${s.scale}); }
  </style>
</head>
<body>
  <svg viewBox="0 0 800 800">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${s.gradientStart}" />
        <stop offset="100%" stop-color="${s.gradientEnd}" />
      </linearGradient>
    </defs>
    <path id="blob" fill="url(#grad)" opacity="0.8" />
  </svg>
  <script>
    const blob = document.getElementById('blob');
    let t = 0;
    function morph() {
      t += 0.02 * ${s.speed};
      const pts = [];
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const r = 240 + Math.sin(t + i * 1.2) * 55 + Math.cos(t * 0.7 + i * 2) * 35;
        pts.push({ x: 400 + Math.cos(a) * r, y: 400 + Math.sin(a) * r });
      }
      let d = 'M ' + pts[0].x + ' ' + pts[0].y;
      for (let i = 0; i < 8; i++) {
        const p0 = pts[i], p1 = pts[(i + 1) % 8];
        d += ' Q ' + p0.x + ' ' + p0.y + ', ' + ((p0.x + p1.x) / 2) + ' ' + ((p0.y + p1.y) / 2);
      }
      blob.setAttribute('d', d + ' Z');
      requestAnimationFrame(morph);
    }
    morph();
  </script>
</body>
</html>`;
  }
};

// 5. SPARTICLES (FLOATING GLOWING ORBS)
window.EffectRegistry['sparticles'] = {
  id: 'sparticles',
  title: 'Sparticles Floating Glowing Orbs',
  category: 'Background Decoration',
  tech: 'Canvas 2D Glowing Spheres',
  github: 'https://github.com/simeydotme/sparticles',
  description: 'Lichtgewicht, vloeiend zwevende bollen met zachte gloed en bokeh diepte.',
  defaultSettings: {
    count: 50,
    speed: 1,
    minSize: 4,
    maxSize: 24,
    glowColor: '#38bdf8'
  },
  controls: [
    { type: 'range', key: 'count', label: 'Aantal Bollen', min: 10, max: 150, step: 5 },
    { type: 'range', key: 'speed', label: 'Zweef Snelheid', min: 0.2, max: 3, step: 0.1 },
    { type: 'range', key: 'maxSize', label: 'Max Bolgrootte', min: 10, max: 50, step: 2 },
    { type: 'color', key: 'glowColor', label: 'Gloed Kleur' }
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

    this.resize();
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);

    this.createOrbs();
    this.active = true;
    this.loop();
  },
  resize() {
    if (!this.canvas) return;
    const rect = this.container ? this.container.getBoundingClientRect() : null;
    this.width = this.canvas.width = Math.floor((rect && rect.width) || this.canvas.offsetWidth || window.innerWidth);
    this.height = this.canvas.height = Math.floor((rect && rect.height) || this.canvas.offsetHeight || window.innerHeight);
  },
  createOrbs() {
    this.orbs = [];
    for (let i = 0; i < this.settings.count; i++) {
      this.orbs.push({
        x: Math.random() * (this.width || window.innerWidth),
        y: Math.random() * (this.height || window.innerHeight),
        radius: Math.random() * (this.settings.maxSize - this.settings.minSize) + this.settings.minSize,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.orbs.length !== this.settings.count) this.createOrbs();
  },
  loop() {
    if (!this.active) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const s = this.settings;
    for (let i = 0; i < this.orbs.length; i++) {
      const orb = this.orbs[i];
      orb.x += orb.vx * s.speed;
      orb.y += orb.vy * s.speed;

      if (orb.x < -50) orb.x = this.width + 50;
      if (orb.x > this.width + 50) orb.x = -50;
      if (orb.y < -50) orb.y = this.height + 50;
      if (orb.y > this.height + 50) orb.y = -50;

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.fillStyle = s.glowColor;
      ctx.globalAlpha = orb.alpha;
      ctx.shadowBlur = orb.radius * 1.5;
      ctx.shadowColor = s.glowColor;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Sparticles Glowing Orbs</title>
  <style>
    body { margin: 0; background: #07090e; overflow: hidden; height: 100vh; }
    canvas { display: block; width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <canvas id="sparticles"></canvas>
  <script>
    const c = document.getElementById('sparticles'), ctx = c.getContext('2d');
    let w = c.width = window.innerWidth, h = c.height = window.innerHeight;
    const count = ${s.count}, color = '${s.glowColor}', sp = ${s.speed};
    const orbs = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * ${s.maxSize - s.minSize} + ${s.minSize},
      vx: (Math.random() - 0.5) * 1.5, vy: (Math.random() - 0.5) * 1.5,
      a: Math.random() * 0.5 + 0.2
    }));
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const o of orbs) {
        o.x += o.vx * sp; o.y += o.vy * sp;
        if (o.x < -50) o.x = w + 50; if (o.x > w + 50) o.x = -50;
        if (o.y < -50) o.y = h + 50; if (o.y > h + 50) o.y = -50;
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.globalAlpha = o.a;
        ctx.shadowBlur = o.r * 1.5; ctx.shadowColor = color;
        ctx.fill(); ctx.globalAlpha = 1;
      }
      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`;
  }
};

