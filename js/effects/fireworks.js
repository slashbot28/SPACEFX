// ========================================================
// FIREWORKS SPECTACLE
// Source: lindelof/awesome-web-effect
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// SPECTACULAR FIREWORKS
window.EffectRegistry['fireworks'] = {
  id: 'fireworks',
  title: 'Spectacular Canvas Fireworks',
  category: 'Fireworks',
  tech: 'Canvas 2D Physics & Particle Bursts',
  github: 'https://github.com/jeromeetienne/fireworks.js',
  description: 'Adembenemend vuurwerkspektakel met raketten, vonksporen en explosies.',
  defaultSettings: {
    rocketFrequency: 30, // frames between auto rockets
    sparksPerBurst: 80,
    gravity: 0.12,
    sparkFriction: 0.96,
    sound: true
  },
  controls: [
    { type: 'range', key: 'sparksPerBurst', label: 'Vonken per Pijl', min: 30, max: 200, step: 10 },
    { type: 'range', key: 'gravity', label: 'Zwaartekracht', min: 0.05, max: 0.3, step: 0.02 },
    { type: 'range', key: 'sparkFriction', label: 'Wrijving / Bereik', min: 0.90, max: 0.99, step: 0.01 },
    { type: 'switch', key: 'sound', label: 'Web Audio Knal Geluid' },
    { type: 'trigger', key: 'triggerManualRocket', label: '🚀 Schiet Extra Pijl Af' }
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

    this.resize();
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);

    this.rockets = [];
    this.sparks = [];
    this.frameCount = 0;

    this.initSound();

    this.onClick = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const targetX = e.clientX - rect.left;
      const targetY = e.clientY - rect.top;
      this.launchRocket(targetX, targetY);
    };

    this.canvas.addEventListener('click', this.onClick);
    this.active = true;
    this.loop();
  },
  initSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!this.audioCtx) this.audioCtx = new AudioContext();
    } catch (e) {}
  },
  playBoom() {
    if (!this.settings.sound || !this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    const now = this.audioCtx.currentTime;
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.3);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  },
  resize() {
    if (!this.canvas) return;
    const rect = this.container ? this.container.getBoundingClientRect() : null;
    this.width = this.canvas.width = Math.floor((rect && rect.width) || this.canvas.offsetWidth || window.innerWidth);
    this.height = this.canvas.height = Math.floor((rect && rect.height) || this.canvas.offsetHeight || window.innerHeight);
  },
  launchRocket(targetX, targetY) {
    const startX = Math.random() * (this.width - 200) + 100;
    const startY = this.height;
    const tX = targetX !== undefined ? targetX : Math.random() * (this.width - 200) + 100;
    const tY = targetY !== undefined ? targetY : Math.random() * (this.height * 0.5) + 80;

    const angle = Math.atan2(tY - startY, tX - startX);
    const dist = Math.hypot(tX - startX, tY - startY);
    const speed = 14;

    this.rockets.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      targetX: tX,
      targetY: tY,
      hue: Math.random() * 360
    });
  },
  triggerManualRocket() {
    this.launchRocket();
  },
  explode(x, y, hue) {
    this.playBoom();
    const count = this.settings.sparksPerBurst;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 1;
      this.sparks.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.015,
        color: `hsl(${hue + (Math.random() * 40 - 20)}, 100%, ${Math.random() * 30 + 50}%)`,
        radius: Math.random() * 2.5 + 1.5
      });
    }
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
  },
  loop() {
    if (!this.active) return;
    this.frameCount++;

    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(5, 7, 12, 0.2)';
    ctx.fillRect(0, 0, this.width, this.height);

    // Auto launch
    if (this.frameCount % this.settings.rocketFrequency === 0) {
      this.launchRocket();
    }

    // Update rockets
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.x += r.vx;
      r.y += r.vy;

      ctx.beginPath();
      ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${r.hue}, 100%, 75%)`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = ctx.fillStyle;
      ctx.fill();

      if (r.y <= r.targetY) {
        this.explode(r.x, r.y, r.hue);
        this.rockets.splice(i, 1);
      }
    }

    // Update sparks
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= this.settings.sparkFriction;
      s.vy *= this.settings.sparkFriction;
      s.vy += this.settings.gravity;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        this.sparks.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.alpha;
      ctx.shadowBlur = 6;
      ctx.shadowColor = s.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    if (this.canvas) this.canvas.removeEventListener('click', this.onClick);
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
  <title>Canvas Fireworks</title>
  <style>
    body { margin: 0; background: #05070c; overflow: hidden; height: 100vh; }
    canvas { display: block; width: 100vw; height: 100vh; cursor: crosshair; }
  </style>
</head>
<body>
  <canvas id="fw"></canvas>
  <script>
    const c = document.getElementById('fw'), ctx = c.getContext('2d');
    let w = c.width = window.innerWidth, h = c.height = window.innerHeight;
    const rockets = [], sparks = [];
    function launch(tx, ty) {
      rockets.push({ x: w/2, y: h, vx: (tx - w/2)/25, vy: (ty - h)/25, ty, hue: Math.random()*360 });
    }
    c.addEventListener('click', e => launch(e.clientX, e.clientY));
    setInterval(() => launch(Math.random()*w, Math.random()*h*0.5), 1000);

    function loop() {
      ctx.fillStyle = 'rgba(5, 7, 12, 0.2)'; ctx.fillRect(0, 0, w, h);
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]; r.x += r.vx; r.y += r.vy;
        ctx.fillStyle = 'hsl(' + r.hue + ', 100%, 75%)'; ctx.fillRect(r.x, r.y, 4, 4);
        if (r.y <= r.ty) {
          for (let j = 0; j < ${s.sparksPerBurst}; j++) {
            const a = Math.random()*6.28, sp = Math.random()*6+1;
            sparks.push({ x: r.x, y: r.y, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp, a: 1, c: 'hsl('+r.hue+', 100%, 60%)' });
          }
          rockets.splice(i, 1);
        }
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i]; p.x += p.vx; p.y += p.vy; p.vy += ${s.gravity}; p.vx *= ${s.sparkFriction}; p.a -= 0.02;
        if (p.a <= 0) { sparks.splice(i, 1); continue; }
        ctx.fillStyle = p.c; ctx.globalAlpha = p.a; ctx.fillRect(p.x, p.y, 3, 3); ctx.globalAlpha = 1;
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`;
  }
};

