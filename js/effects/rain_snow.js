// ========================================================
// RAIN & SNOW EFFECTS
// Source: lindelof/awesome-web-effect
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// 1. THE MATRIX DIGITAL RAIN
window.EffectRegistry['matrix-rain'] = {
  id: 'matrix-rain',
  title: 'The Matrix Digital Rain (Eigen Tekst / Naam)',
  category: 'Rain & Snow',
  tech: 'HTML5 Canvas Katakana Glyph Stream',
  github: 'https://github.com/nojvek/matrix-rain',
  description: 'De iconische vallende groene Matrix-tekens met oplichtende koppen, waarin jouw eigen naam of codewoord verweven kan worden.',
  defaultSettings: {
    customText: 'GEERT',
    fontSize: 16,
    speed: 1,
    textColor: '#22c55e',
    headColor: '#ffffff',
    fadeOpacity: 0.05
  },
  controls: [
    { type: 'text', key: 'customText', label: 'Matrix Codewoord / Naam', placeholder: 'Bijv. GEERT' },
    { type: 'range', key: 'fontSize', label: 'Lettergrootte (px)', min: 10, max: 28, step: 2 },
    { type: 'range', key: 'speed', label: 'Valsnelheid', min: 0.5, max: 2.5, step: 0.1 },
    { type: 'color', key: 'textColor', label: 'Code Tekstkleur' },
    { type: 'color', key: 'headColor', label: 'Lichtgevende Kop' },
    { type: 'range', key: 'fadeOpacity', label: 'Spoor Vervaag-snelheid', min: 0.02, max: 0.2, step: 0.01 }
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

    this.glyphs = '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789ABCDEF:・."=*+-<>¦｜';
    this.resize();
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);

    this.active = true;
    this.lastTime = 0;
    this.loop(0);
  },
  resize() {
    if (!this.canvas) return;
    const rect = this.container ? this.container.getBoundingClientRect() : null;
    this.width = this.canvas.width = Math.floor((rect && rect.width) || this.canvas.offsetWidth || window.innerWidth);
    this.height = this.canvas.height = Math.floor((rect && rect.height) || this.canvas.offsetHeight || window.innerHeight);
    this.cols = Math.floor(this.width / this.settings.fontSize);
    this.drops = [];
    for (let i = 0; i < this.cols; i++) {
      this.drops[i] = Math.random() * -100;
    }
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    this.resize();
  },
  loop(time) {
    if (!this.active) return;

    const audio = (window.AudioReactive && window.AudioReactive.active) ? window.AudioReactive.getLevels() : null;
    const speedMult = audio ? (1 + audio.bass * 2.2) : 1;

    if (time - this.lastTime > (50 / (this.settings.speed * speedMult))) {
      this.lastTime = time;

      const ctx = this.ctx;
      ctx.fillStyle = `rgba(5, 7, 10, ${this.settings.fadeOpacity})`;
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.font = `${this.settings.fontSize}px monospace`;
      const customStr = (this.settings.customText || '').trim();

      for (let i = 0; i < this.drops.length; i++) {
        const pool = (customStr && Math.random() < 0.25) ? customStr : this.glyphs;
        const char = pool[Math.floor(Math.random() * pool.length)];
        const x = i * this.settings.fontSize;
        const y = this.drops[i] * this.settings.fontSize;

        // Glowing head
        ctx.fillStyle = (audio && audio.isBeat) ? '#ffffff' : this.settings.headColor;
        ctx.shadowBlur = audio ? 8 + audio.bass * 14 : 8;
        ctx.shadowColor = this.settings.textColor;
        ctx.fillText(char, x, y);

        // Trail text
        ctx.fillStyle = this.settings.textColor;
        ctx.shadowBlur = 4;
        const prevChar = pool[Math.floor(Math.random() * pool.length)];
        ctx.fillText(prevChar, x, y - this.settings.fontSize);

        if (y > this.height && Math.random() > 0.975) {
          this.drops[i] = 0;
        }
        this.drops[i]++;
      }
    }

    this.raf = requestAnimationFrame((t) => this.loop(t));
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
  <title>The Matrix Digital Rain</title>
  <style>
    body { margin: 0; background: #000; overflow: hidden; height: 100vh; }
    canvas { display: block; width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <canvas id="matrix"></canvas>
  <script>
    const c = document.getElementById('matrix'), ctx = c.getContext('2d');
    let w = c.width = window.innerWidth, h = c.height = window.innerHeight;
    const fs = ${s.fontSize};
    let cols = Math.floor(w / fs);
    let drops = Array.from({ length: cols }, () => Math.random() * -50);
    const chars = '${(s.customText || '0123456789ABCDEFﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ').replace(/'/g, "\\'")}';
    const baseGlyphs = '0123456789ABCDEFﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, ${s.fadeOpacity})';
      ctx.fillRect(0, 0, w, h);
      ctx.font = fs + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const pool = (chars && Math.random() < 0.25) ? chars : baseGlyphs;
        const text = pool[Math.floor(Math.random() * pool.length)];
        ctx.fillStyle = '${s.headColor}';
        ctx.fillText(text, i * fs, drops[i] * fs);
        ctx.fillStyle = '${s.textColor}';
        ctx.fillText(baseGlyphs[Math.floor(Math.random() * baseGlyphs.length)], i * fs, (drops[i] - 1) * fs);

        if (drops[i] * fs > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      setTimeout(draw, 40 / ${s.speed});
    }
    draw();
  </script>
</body>
</html>`;
  }
};

// 2. WINTER SNOWSTORM
window.EffectRegistry['snowstorm'] = {
  id: 'snowstorm',
  title: 'Winter Snowstorm Effect',
  category: 'Rain & Snow',
  tech: 'Canvas 2D Snowflake Flutter',
  github: 'https://github.com/scottschiller/Snowstorm',
  description: 'Sfeervolle winterse sneeuwbui met winddrift en dieptevlokken.',
  defaultSettings: {
    flakeCount: 150,
    fallSpeed: 1.5,
    wind: 0.5,
    maxSize: 4
  },
  controls: [
    { type: 'range', key: 'flakeCount', label: 'Aantal Vlokken', min: 40, max: 400, step: 10 },
    { type: 'range', key: 'fallSpeed', label: 'Valsnelheid', min: 0.5, max: 4, step: 0.2 },
    { type: 'range', key: 'wind', label: 'Windkracht', min: -2, max: 2, step: 0.1 },
    { type: 'range', key: 'maxSize', label: 'Max Vlokgrootte', min: 2, max: 8, step: 0.5 }
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

    this.createFlakes();
    this.active = true;
    this.loop();
  },
  resize() {
    if (!this.canvas) return;
    const rect = this.container ? this.container.getBoundingClientRect() : null;
    this.width = this.canvas.width = Math.floor((rect && rect.width) || this.canvas.offsetWidth || window.innerWidth);
    this.height = this.canvas.height = Math.floor((rect && rect.height) || this.canvas.offsetHeight || window.innerHeight);
  },
  createFlakes() {
    this.flakes = [];
    for (let i = 0; i < this.settings.flakeCount; i++) {
      this.flakes.push({
        x: Math.random() * (this.width || window.innerWidth),
        y: Math.random() * (this.height || window.innerHeight),
        radius: Math.random() * this.settings.maxSize + 1,
        speed: (Math.random() * 1 + 0.5) * this.settings.fallSpeed,
        flutter: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.7 + 0.3
      });
    }
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.flakes.length !== this.settings.flakeCount) this.createFlakes();
  },
  loop() {
    if (!this.active) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.flakes.length; i++) {
      const f = this.flakes[i];
      f.flutter += 0.02;
      f.y += f.speed;
      f.x += Math.sin(f.flutter) * 0.8 + this.settings.wind;

      if (f.y > this.height) {
        f.y = -10;
        f.x = Math.random() * this.width;
      }
      if (f.x > this.width) f.x = 0;
      if (f.x < 0) f.x = this.width;

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#fff';
      ctx.fill();
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
  <title>Winter Snowstorm</title>
  <style>
    body { margin: 0; background: #080d1a; overflow: hidden; height: 100vh; }
    canvas { display: block; width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <canvas id="snow"></canvas>
  <script>
    const c = document.getElementById('snow'), ctx = c.getContext('2d');
    let w = c.width = window.innerWidth, h = c.height = window.innerHeight;
    const count = ${s.flakeCount}, wind = ${s.wind};
    const flakes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * ${s.maxSize} + 1,
      vy: (Math.random() + 0.5) * ${s.fallSpeed},
      fl: Math.random() * 6
    }));
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.fl += 0.02; f.y += f.vy; f.x += Math.sin(f.fl)*0.8 + wind;
        if (f.y > h) { f.y = -5; f.x = Math.random() * w; }
        if (f.x > w) f.x = 0; if (f.x < 0) f.x = w;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`;
  }
};

// 3. RAIN DROPS ON GLASS
window.EffectRegistry['rain-glass'] = {
  id: 'rain-glass',
  title: 'Rain Drops On Glass Pane',
  category: 'Rain & Snow',
  tech: 'Canvas 2D Refraction & Dripping Physics',
  github: 'https://github.com/codrops/RainEffect',
  description: 'Regendruppels op een beslagen raam die naar beneden glijden en samenvloeien.',
  defaultSettings: {
    dropCount: 120,
    speed: 1.2,
    glassBlur: 10,
    rainColor: '#93c5fd'
  },
  controls: [
    { type: 'range', key: 'dropCount', label: 'Aantal Druppels', min: 40, max: 250, step: 10 },
    { type: 'range', key: 'speed', label: 'Valsnelheid', min: 0.5, max: 3, step: 0.1 },
    { type: 'color', key: 'rainColor', label: 'Druppel Tint' }
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

    this.createDrops();
    this.active = true;
    this.loop();
  },
  resize() {
    if (!this.canvas) return;
    const rect = this.container ? this.container.getBoundingClientRect() : null;
    this.width = this.canvas.width = Math.floor((rect && rect.width) || this.canvas.offsetWidth || window.innerWidth);
    this.height = this.canvas.height = Math.floor((rect && rect.height) || this.canvas.offsetHeight || window.innerHeight);
  },
  createDrops() {
    this.drops = [];
    for (let i = 0; i < this.settings.dropCount; i++) {
      this.drops.push({
        x: Math.random() * (this.width || window.innerWidth),
        y: Math.random() * (this.height || window.innerHeight),
        radius: Math.random() * 3 + 1.5,
        speed: (Math.random() * 2 + 1) * this.settings.speed,
        streakLen: Math.random() * 15 + 10
      });
    }
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.drops.length !== this.settings.dropCount) this.createDrops();
  },
  loop() {
    if (!this.active) return;
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(10, 14, 22, 0.3)';
    ctx.fillRect(0, 0, this.width, this.height);

    const s = this.settings;
    for (let i = 0; i < this.drops.length; i++) {
      const d = this.drops[i];
      d.y += d.speed * s.speed;

      if (d.y > this.height) {
        d.y = -20;
        d.x = Math.random() * this.width;
      }

      ctx.beginPath();
      ctx.ellipse(d.x, d.y, d.radius, d.radius * 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = s.rainColor;
      ctx.shadowBlur = 4;
      ctx.shadowColor = s.rainColor;
      ctx.fill();

      // Small streak
      ctx.beginPath();
      ctx.moveTo(d.x, d.y - d.radius * 2);
      ctx.lineTo(d.x, d.y - d.radius * 2 - d.streakLen);
      ctx.strokeStyle = s.rainColor;
      ctx.lineWidth = d.radius * 0.7;
      ctx.stroke();
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
  <title>Rain on Glass</title>
  <style>
    body { margin: 0; background: #0a0e16; overflow: hidden; height: 100vh; }
    canvas { display: block; width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <canvas id="rain"></canvas>
  <script>
    const c = document.getElementById('rain'), ctx = c.getContext('2d');
    let w = c.width = window.innerWidth, h = c.height = window.innerHeight;
    const count = ${s.dropCount}, color = '${s.rainColor}', sp = ${s.speed};
    const drops = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 3 + 1.5, vy: (Math.random() * 2 + 1) * sp
    }));
    function draw() {
      ctx.fillStyle = 'rgba(10, 14, 22, 0.3)'; ctx.fillRect(0, 0, w, h);
      for (const d of drops) {
        d.y += d.vy;
        if (d.y > h) { d.y = -20; d.x = Math.random() * w; }
        ctx.beginPath(); ctx.ellipse(d.x, d.y, d.r, d.r * 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`;
  }
};

