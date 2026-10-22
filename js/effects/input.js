// ========================================================
// INPUT EFFECTS
// Source: lindelof/awesome-web-effect
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// 1. POWER MODE INPUT (EXPLODING PARTICLES & SCREEN SHAKE)
window.EffectRegistry['power-mode-input'] = {
  id: 'power-mode-input',
  title: 'Power Mode Input (Combo & Sparks)',
  category: 'Input Effect',
  tech: 'DOM Particles & Canvas Explosions',
  github: 'https://github.com/lindelof/power-mode-input',
  description: 'Typing met exploderende vonken, combo streaks en scherm-schokken bij elke toetsaanslag!',
  defaultSettings: {
    particleCount: 8,
    shakeIntensity: 4,
    sparkColor: '#f59e0b',
    enableShake: true
  },
  controls: [
    { type: 'range', key: 'particleCount', label: 'Vonken per toets', min: 3, max: 20, step: 1 },
    { type: 'range', key: 'shakeIntensity', label: 'Schok Intensiteit (px)', min: 1, max: 12, step: 1 },
    { type: 'color', key: 'sparkColor', label: 'Vonken Kleur' },
    { type: 'switch', key: 'enableShake', label: 'Scherm Schudden' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.combo = 0;
    this.comboTimer = null;

    this.wrapper = document.createElement('div');
    this.wrapper.className = 'input-demo-box';

    this.wrapper.innerHTML = `
      <div style="text-align: center; margin-bottom: 8px;">
        <h3 style="color: #fff; font-size: 1.3rem; font-weight: 800;">🔥 Power Mode Typing</h3>
        <p style="color: #94a3b8; font-size: 0.85rem;">Typ in het veld of klik op de knop om vonken en combo-schokken te zien!</p>
      </div>

      <div class="power-input-wrapper" id="power-wrapper">
        <span class="combo-streak-badge" id="combo-badge">COMBO x0</span>
        <input type="text" id="power-field" class="power-input" placeholder="Type hier een woord..." autofocus autocomplete="off">
      </div>
      <div style="display: flex; gap: 10px; margin-top: 14px;">
        <button id="btn-auto-type-demo" class="btn-action btn-primary" style="font-size: 0.82rem; padding: 6px 16px;">
          ⚡ Typ Automatisch Voorbeeld (Demo)
        </button>
      </div>
      <canvas id="spark-canvas" style="position: fixed; inset: 0; pointer-events: none; z-index: 9999;"></canvas>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.input = this.wrapper.querySelector('#power-field');
    this.badge = this.wrapper.querySelector('#combo-badge');
    this.powerWrapper = this.wrapper.querySelector('#power-wrapper');
    this.btnAuto = this.wrapper.querySelector('#btn-auto-type-demo');
    this.canvas = this.wrapper.querySelector('#spark-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.particles = [];

    this.onResize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', this.onResize);

    this.triggerTyping = () => {
      this.combo++;
      this.badge.textContent = `COMBO x${this.combo}`;
      this.badge.classList.add('active');

      clearTimeout(this.comboTimer);
      this.comboTimer = setTimeout(() => {
        this.combo = 0;
        this.badge.classList.remove('active');
      }, 1500);

      // Screen shake
      if (this.settings.enableShake) {
        const shake = this.settings.shakeIntensity;
        const sx = (Math.random() - 0.5) * shake;
        const sy = (Math.random() - 0.5) * shake;
        this.powerWrapper.style.transform = `translate(${sx}px, ${sy}px)`;
        setTimeout(() => { this.powerWrapper.style.transform = 'translate(0, 0)'; }, 50);
      }

      // Spawn sparks at input position
      const rect = this.input.getBoundingClientRect();
      const x = rect.left + rect.width * 0.5 + (Math.random() - 0.5) * 60;
      const y = rect.top + rect.height * 0.5;

      const colors = [this.settings.sparkColor, '#ef4444', '#fbbf24', '#38bdf8', '#ec4899'];
      for (let i = 0; i < this.settings.particleCount; i++) {
        this.particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.8) * 10,
          size: Math.random() * 5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          gravity: 0.35
        });
      }
    };

    this.input.addEventListener('input', this.triggerTyping);

    // Auto-type sample text
    const sampleText = 'AWESOME POWER MODE!';
    let autoIdx = 0;
    this.btnAuto.addEventListener('click', () => {
      this.input.value = '';
      autoIdx = 0;
      const timer = setInterval(() => {
        if (autoIdx < sampleText.length) {
          this.input.value += sampleText[autoIdx];
          this.triggerTyping();
          autoIdx++;
        } else {
          clearInterval(timer);
        }
      }, 100);
    });

    // Run auto demo once on load
    setTimeout(() => {
      if (this.active && this.input.value === '') {
        this.btnAuto.click();
      }
    }, 600);
    this.active = true;
    this.loop();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
  },
  loop() {
    if (!this.active) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= 0.03;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }

    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    if (this.input) this.input.removeEventListener('input', this.onInput);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Power Mode Input</title>
  <style>
    body { margin: 0; background: #0b0f19; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
    .box { position: relative; width: 340px; }
    input { width: 100%; height: 50px; background: #1e293b; border: 2px solid #3b82f6; border-radius: 8px; color: white; padding: 0 16px; font-size: 1.1rem; outline: none; }
    canvas { position: fixed; inset: 0; pointer-events: none; }
  </style>
</head>
<body>
  <div class="box" id="box"><input type="text" id="inp" placeholder="Type hier..." autofocus></div>
  <canvas id="c"></canvas>
  <script>
    const inp = document.getElementById('inp'), box = document.getElementById('box'), c = document.getElementById('c'), ctx = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    const parts = [];
    inp.addEventListener('input', () => {
      const r = inp.getBoundingClientRect();
      const x = r.left + r.width/2, y = r.top + r.height/2;
      box.style.transform = 'translate(' + (Math.random()-0.5)*${s.shakeIntensity} + 'px, ' + (Math.random()-0.5)*${s.shakeIntensity} + 'px)';
      setTimeout(() => box.style.transform = 'translate(0,0)', 50);
      for (let i = 0; i < ${s.particleCount}; i++) {
        parts.push({ x, y, vx: (Math.random()-0.5)*8, vy: (Math.random()-0.8)*8, a: 1 });
      }
    });
    function loop() {
      ctx.clearRect(0,0,c.width,c.height);
      for (let i = parts.length-1; i >= 0; i--) {
        const p = parts[i]; p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.a -= 0.03;
        if (p.a <= 0) { parts.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
        ctx.fillStyle = '${s.sparkColor}'; ctx.globalAlpha = p.a; ctx.fill(); ctx.globalAlpha = 1;
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`;
  }
};

// 2. SHUFFLE / SCRAMBLER TEXT (WITH CUSTOM TEXT SUPPORT)
window.EffectRegistry['shuffle-text'] = {
  id: 'shuffle-text',
  title: 'Hacker Text Scrambler (Eigen Tekst)',
  category: 'Input Effect',
  tech: 'Matrix Glyph Decryption',
  github: 'https://github.com/ics-ikeda/shuffle-text',
  description: 'Cyberpunk tekst-decoder die willekeurige tekens scrambled en onthult. Ondersteunt je eigen naam of codewoord!',
  defaultSettings: {
    duration: 1000,
    glyphs: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&*<>[]{}',
    textColor: '#06b6d4',
    phrase: 'GEERT_ACCESS_GRANTED'
  },
  controls: [
    { type: 'text', key: 'phrase', label: '✍️ Eigen Woord / Bericht', placeholder: 'Typ je codewoord...' },
    { type: 'range', key: 'duration', label: 'Decodeer Duur (ms)', min: 300, max: 2500, step: 100 },
    { type: 'color', key: 'textColor', label: 'Tekst Gloed Kleur' },
    { type: 'trigger', key: 'triggerScramble', label: '⚡ Speel Scramble Opnieuw Af' }
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

    this.wrapper.innerHTML = `
      <div style="display: flex; gap: 8px; align-items: center; max-width: 440px; width: 90%;">
        <input type="text" id="scramble-live-input" value="${this.settings.phrase || 'GEERT_ACCESS_GRANTED'}" placeholder="Typ hier jouw naam of woord..."
          style="flex: 1; height: 38px; background: #111827; border: 1px solid ${this.settings.textColor}; border-radius: 8px; color: ${this.settings.textColor}; padding: 0 14px; font-size: 0.95rem; font-family: var(--font-mono); font-weight: 700; outline: none;">
      </div>

      <div class="scramble-text-display" id="scramble-display" style="color: ${this.settings.textColor}; text-shadow: 0 0 15px ${this.settings.textColor}; cursor: pointer; text-align: center; padding: 10px;">
        INITIALIZING...
      </div>
      <p style="color: #64748b; font-size: 0.82rem;">Klik op de tekst of typ in het veld hierboven om opnieuw te decoderen!</p>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.display = this.wrapper.querySelector('#scramble-display');
    this.liveInp = this.wrapper.querySelector('#scramble-live-input');

    this.liveInp.addEventListener('input', (e) => {
      this.settings.phrase = e.target.value || 'GEERT';
      this.scramble();
    });

    this.display.addEventListener('click', () => this.scramble());
    this.display.addEventListener('mouseenter', () => this.scramble());
    this.scramble();

    // Auto cycle phrases if left alone
    this.autoInterval = setInterval(() => {
      this.scramble();
    }, 3500);
  },
  scramble() {
    const text = this.settings.phrase;
    const glyphs = this.settings.glyphs;
    const dur = this.settings.duration;
    const start = performance.now();

    const frame = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / dur);
      const charsSolved = Math.floor(progress * text.length);

      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (i < charsSolved) {
          result += text[i];
        } else {
          result += glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      }
      this.display.textContent = result;

      if (progress < 1) requestAnimationFrame(frame);
      else this.display.textContent = text;
    };
    requestAnimationFrame(frame);
  },
  triggerScramble() {
    this.scramble();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.display) {
      this.display.style.color = this.settings.textColor;
      this.display.style.textShadow = `0 0 15px ${this.settings.textColor}`;
    }
  },
  destroy() {
    clearInterval(this.autoInterval);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Hacker Text Scrambler</title>
  <style>
    body { margin: 0; background: #06090e; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: monospace; }
    h1 { font-size: 2.2rem; color: ${s.textColor}; text-shadow: 0 0 15px ${s.textColor}; cursor: pointer; }
  </style>
</head>
<body>
  <h1 id="txt" onclick="scramble()">CLICK TO DECODE</h1>
  <script>
    const el = document.getElementById('txt');
    const phrase = '${s.phrase}', glyphs = '${s.glyphs}';
    function scramble() {
      const start = performance.now();
      function f(now) {
        const prog = Math.min(1, (now - start) / ${s.duration});
        const solved = Math.floor(prog * phrase.length);
        let s = '';
        for (let i = 0; i < phrase.length; i++) {
          s += (i < solved) ? phrase[i] : glyphs[Math.floor(Math.random() * glyphs.length)];
        }
        el.textContent = s;
        if (prog < 1) requestAnimationFrame(f); else el.textContent = phrase;
      }
      requestAnimationFrame(f);
    }
    scramble();
  </script>
</body>
</html>`;
  }
};

// 3. RETRO TYPEWRITER (WITH CUSTOM TEXT)
window.EffectRegistry['typewriter-js'] = {
  id: 'typewriter-js',
  title: 'Retro Typewriter Effect',
  category: 'Input Effect',
  tech: 'Animated Text & Blinking Caret',
  github: 'https://github.com/tameemsafi/typewriterjs',
  description: 'Natuurlijke typemachine simulatie met instelbare typesnelheid en eigen aangepaste tekst.',
  defaultSettings: {
    customSentence: 'Hallo Geert, welkom bij Awesome Web Effects!',
    speed: 70,
    textColor: '#f8fafc',
    caretColor: '#38bdf8'
  },
  controls: [
    { type: 'text', key: 'customSentence', label: '✍️ Eigen Zin / Boodschap', placeholder: 'Typ je zin...' },
    { type: 'range', key: 'speed', label: 'Typ vertraging (ms)', min: 20, max: 200, step: 10 },
    { type: 'color', key: 'textColor', label: 'Tekst Kleur' },
    { type: 'color', key: 'caretColor', label: 'Cursor Kleur' },
    { type: 'trigger', key: 'triggerRestart', label: '🔁 Typ Opnieuw' }
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

    this.wrapper.innerHTML = `
      <div style="display: flex; gap: 8px; align-items: center; max-width: 500px; width: 90%;">
        <input type="text" id="type-live-input" value="${this.settings.customSentence || ''}" placeholder="Typ hier jouw eigen zin om te typen..."
          style="flex: 1; height: 38px; background: #111827; border: 1px solid ${this.settings.caretColor}; border-radius: 8px; color: #fff; padding: 0 14px; font-size: 0.95rem; font-family: var(--font-mono); outline: none;">
      </div>

      <div style="font-family: var(--font-mono); font-size: 1.8rem; font-weight: 600; color: ${this.settings.textColor}; text-align: center; max-width: 90%; min-height: 2.4rem;">
        <span id="type-content"></span><span id="type-caret" style="border-right: 3px solid ${this.settings.caretColor}; animation: caretBlink 0.8s infinite;"></span>
      </div>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.contentEl = this.wrapper.querySelector('#type-content');
    this.liveInp = this.wrapper.querySelector('#type-live-input');

    this.liveInp.addEventListener('input', (e) => {
      this.settings.customSentence = e.target.value;
      this.triggerRestart();
    });

    this.charIdx = 0;
    this.isDeleting = false;
    this.active = true;
    this.tick();
  },
  tick() {
    if (!this.active) return;
    const curSentence = this.settings.customSentence || 'Hallo Geert, welkom!';

    if (!this.isDeleting) {
      this.charIdx++;
      this.contentEl.textContent = curSentence.substring(0, this.charIdx);
      if (this.charIdx >= curSentence.length) {
        this.timeout = setTimeout(() => {
          this.isDeleting = true;
          this.tick();
        }, 1800);
        return;
      }
    } else {
      this.charIdx--;
      this.contentEl.textContent = curSentence.substring(0, this.charIdx);
      if (this.charIdx <= 0) {
        this.isDeleting = false;
      }
    }

    const delay = this.isDeleting ? this.settings.speed / 2 : this.settings.speed;
    this.timeout = setTimeout(() => this.tick(), delay);
  },
  triggerRestart() {
    clearTimeout(this.timeout);
    this.charIdx = 0;
    this.isDeleting = false;
    this.tick();
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
  },
  destroy() {
    this.active = false;
    clearTimeout(this.timeout);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Typewriter Effect</title>
  <style>
    body { margin: 0; background: #0c0f17; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: monospace; }
    .txt { font-size: 2rem; color: ${s.textColor}; }
    .caret { border-right: 3px solid ${s.caretColor}; animation: blink 0.8s infinite; }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  </style>
</head>
<body>
  <div class="txt"><span id="t"></span><span class="caret"></span></div>
  <script>
    const el = document.getElementById('t');
    const texts = ['Awesome Web Effects.', 'Pure HTML, CSS and JS.', 'Drop-in ready!'];
    let idx = 0, char = 0, del = false;
    function type() {
      const cur = texts[idx];
      if (!del) {
        char++; el.textContent = cur.substring(0, char);
        if (char >= cur.length) { setTimeout(() => { del = true; type(); }, 1500); return; }
      } else {
        char--; el.textContent = cur.substring(0, char);
        if (char <= 0) { del = false; idx = (idx + 1) % texts.length; }
      }
      setTimeout(type, del ? ${s.speed / 2} : ${s.speed});
    }
    type();
  </script>
</body>
</html>`;
  }
};
