// ========================================================
// LIAM EGAN (@shubniggurath) INSPIRED SIGNATURE EFFECTS:
// 1. Manifold Mandala (Non-Euclidean Kaleidoscopic Shader)
// 2. Interactive Strings (Acoustic Pluck & Resonant Text)
// 3. Liquid Chrome Mercury Blob (Raymarched Specular Fluid)
// 4. Phosphorescence Bioluminescent Particle Text Stream
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// ========================================================
// 1. MANIFOLD MANDALA (NON-EUCLIDEAN KALEIDOSCOPIC SHADER)
// Inspired by Manifold Garden by Liam Egan (@shubniggurath)
// ========================================================
window.EffectRegistry['manifold-mandala'] = {
  id: 'manifold-mandala',
  title: 'Manifold Mandala',
  category: 'Special / Experimental',
  tech: 'WebGL Fragment Raymarching & Kaleidoscopic Folding',
  github: 'https://codepen.io/shubniggurath/pen/01a10e01-ac64-7d4c-a9d3-f08a20497a99',
  description: 'Oneindige non-Euclidische fractale mandala geïnspireerd door Manifold Garden van Liam Egan (@shubniggurath). Met interactieve 3D rotatie en jouw eigen mantra / tekst in het centrum.',
  defaultSettings: {
    mantraText: 'MANIFOLD GARDEN // GEERT',
    subText: 'INFINITE NON-EUCLIDEAN ARCHITECTURE',
    symmetry: 8,
    iterations: 6,
    speed: 1.0,
    zoom: 1.2,
    glowColor: '#38bdf8',
    coreColor: '#ec4899'
  },
  controls: [
    { type: 'text', key: 'mantraText', label: 'Mandala Mantra / Tekst', placeholder: 'MANIFOLD GARDEN // GEERT' },
    { type: 'text', key: 'subText', label: 'Ondertitel / Geometrie Code', placeholder: 'NON-EUCLIDEAN ARCHITECTURE' },
    { type: 'range', key: 'symmetry', label: 'Symmetrie Vouwen (Petals)', min: 4, max: 16, step: 1 },
    { type: 'range', key: 'iterations', label: 'Fractale Diepte', min: 3, max: 9, step: 1 },
    { type: 'range', key: 'zoom', label: 'Zoom Niveau', min: 0.5, max: 3.0, step: 0.1 },
    { type: 'range', key: 'speed', label: 'Rotatiesnelheid', min: 0.2, max: 3.0, step: 0.1 },
    { type: 'color', key: 'glowColor', label: 'Buitenste Gloed Kleur' },
    { type: 'color', key: 'coreColor', label: 'Centrum Kern Kleur' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.wrapper = document.createElement('div');
    this.wrapper.style.position = 'relative';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';
    this.wrapper.style.overflow = 'hidden';
    this.wrapper.style.background = '#020408';

    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';

    // Center Holographic Mantra Badge
    this.badge = document.createElement('div');
    this.badge.id = 'mandala-badge';
    this.badge.style.position = 'absolute';
    this.badge.style.top = '50%';
    this.badge.style.left = '50%';
    this.badge.style.transform = 'translate(-50%, -50%)';
    this.badge.style.textAlign = 'center';
    this.badge.style.pointerEvents = 'none';
    this.badge.style.zIndex = '5';
    this.badge.style.padding = '18px 28px';
    this.badge.style.background = 'radial-gradient(circle, rgba(2, 6, 23, 0.8) 0%, rgba(2, 6, 23, 0.4) 60%, transparent 100%)';
    this.badge.style.borderRadius = '50%';
    this.badge.style.backdropFilter = 'blur(4px)';

    this.updateBadge();

    this.wrapper.appendChild(this.canvas);
    this.wrapper.appendChild(this.badge);
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.initGL();
    this.active = true;
    this.time = 0;
    this.mouse = { x: 0.5, y: 0.5, down: false };

    this.onMouseMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = (e.clientX - rect.left) / rect.width;
      this.mouse.y = (e.clientY - rect.top) / rect.height;
    };
    this.canvas.addEventListener('mousemove', this.onMouseMove);

    this.loop();
  },
  updateBadge() {
    const s = this.settings;
    this.badge.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; letter-spacing: 3px; color: #fff; text-shadow: 0 0 15px ${s.glowColor}, 0 0 30px ${s.coreColor}; margin-bottom: 6px;">
        ${s.mantraText || 'MANIFOLD GARDEN'}
      </div>
      <div style="font-family: var(--font-mono); font-size: 0.74rem; font-weight: 600; letter-spacing: 2px; color: ${s.glowColor}; opacity: 0.9;">
        ${s.subText || 'NON-EUCLIDEAN ARCHITECTURE'}
      </div>
    `;
  },
  initGL() {
    const gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    if (!gl) return;
    this.gl = gl;

    const vsSource = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    // Non-Euclidean recursive folding fragment shader inspired by Manifold Garden & Liam Egan
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_symmetry;
      uniform float u_zoom;
      uniform float u_iterations;
      uniform vec3 u_col1;
      uniform vec3 u_col2;
      uniform float u_bass;

      #define PI 3.14159265359

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - u_res) / min(u_res.x, u_res.y);
        p /= u_zoom;

        // Mouse rotation
        float angM = (u_mouse.x - 0.5) * PI;
        mat2 rotM = mat2(cos(angM), -sin(angM), sin(angM), cos(angM));
        p = rotM * p;

        float t = u_time * 0.25;

        // Polar folding (Kaleidoscope)
        float r = length(p);
        float a = atan(p.y, p.x);
        float tau = 2.0 * PI / u_symmetry;
        a = abs(mod(a, tau) - tau * 0.5);
        p = vec2(cos(a), sin(a)) * r;

        // Recursive non-Euclidean manifold fold
        float accum = 0.0;
        float iter = u_iterations;
        for (float i = 0.0; i < 9.0; i++) {
          if (i >= iter) break;
          p = abs(p) - vec2(0.5, 0.35 + sin(t + i*0.4)*0.15);
          float d = dot(p, p);
          d = max(d, 0.06);
          p = p / d - vec2(0.8 + u_bass*0.3, 0.6);
          accum += exp(-abs(length(p) - 1.0) * 4.0);
        }

        // Color blending
        float glow = accum * 0.18;
        vec3 col = mix(u_col1, u_col2, sin(accum * 0.8 + t)*0.5 + 0.5) * glow;
        col += vec3(0.1, 0.15, 0.25) * (1.0 / (r*r + 0.1)) * 0.15;

        // Vignette
        col *= clamp(1.6 - r * 0.8, 0.0, 1.0);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const createShader = (type, src) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    this.program = program;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1
    ]), gl.STATIC_DRAW);

    this.posAttr = gl.getAttribLocation(program, 'a_pos');
    this.uRes = gl.getUniformLocation(program, 'u_res');
    this.uTime = gl.getUniformLocation(program, 'u_time');
    this.uMouse = gl.getUniformLocation(program, 'u_mouse');
    this.uSymmetry = gl.getUniformLocation(program, 'u_symmetry');
    this.uZoom = gl.getUniformLocation(program, 'u_zoom');
    this.uIter = gl.getUniformLocation(program, 'u_iterations');
    this.uCol1 = gl.getUniformLocation(program, 'u_col1');
    this.uCol2 = gl.getUniformLocation(program, 'u_col2');
    this.uBass = gl.getUniformLocation(program, 'u_bass');
  },
  hexToRgb(hex) {
    const c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '#38bdf8');
    return c ? [parseInt(c[1], 16) / 255, parseInt(c[2], 16) / 255, parseInt(c[3], 16) / 255] : [0.2, 0.7, 1.0];
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    this.updateBadge();
  },
  loop() {
    if (!this.active) return;
    const gl = this.gl;
    if (gl && this.program) {
      const w = this.canvas.width = this.canvas.offsetWidth || 800;
      const h = this.canvas.height = this.canvas.offsetHeight || 500;
      gl.viewport(0, 0, w, h);

      gl.useProgram(this.program);
      gl.enableVertexAttribArray(this.posAttr);
      gl.vertexAttribPointer(this.posAttr, 2, gl.FLOAT, false, 0, 0);

      this.time += 0.02 * this.settings.speed;

      const audio = (window.AudioReactive && window.AudioReactive.active) ? window.AudioReactive.getLevels() : null;
      const bass = audio ? audio.bass : 0;

      const rgb1 = this.hexToRgb(this.settings.glowColor);
      const rgb2 = this.hexToRgb(this.settings.coreColor);

      gl.uniform2f(this.uRes, w, h);
      gl.uniform1f(this.uTime, this.time);
      gl.uniform2f(this.uMouse, this.mouse.x, this.mouse.y);
      gl.uniform1f(this.uSymmetry, this.settings.symmetry);
      gl.uniform1f(this.uZoom, this.settings.zoom * (1 + bass * 0.3));
      gl.uniform1f(this.uIter, this.settings.iterations);
      gl.uniform3f(this.uCol1, rgb1[0], rgb1[1], rgb1[2]);
      gl.uniform3f(this.uCol2, rgb2[0], rgb2[1], rgb2[2]);
      gl.uniform1f(this.uBass, bass);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Manifold Mandala: ${s.mantraText || 'Manifold Garden'}</title>
  <style>
    body { margin: 0; background: #000; overflow: hidden; height: 100vh; font-family: monospace; }
    canvas { display: block; width: 100vw; height: 100vh; }
    .badge {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      text-align: center; pointer-events: none; padding: 20px 30px;
      background: radial-gradient(circle, rgba(2,6,23,0.8) 0%, transparent 80%);
      border-radius: 50%; backdrop-filter: blur(4px);
    }
  </style>
</head>
<body>
  <div class="badge">
    <h1 style="color: #fff; font-size: 1.4rem; letter-spacing: 4px; margin: 0 0 6px 0; text-shadow: 0 0 20px ${s.glowColor};">${s.mantraText || 'MANIFOLD MANDALA'}</h1>
    <p style="color: ${s.glowColor}; letter-spacing: 2px; margin: 0; font-size: 0.8rem;">${s.subText || 'NON-EUCLIDEAN ARCHITECTURE'}</p>
  </div>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c'), gl = canvas.getContext('webgl');
    let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; gl.viewport(0,0,w,h); });

    const vs = 'attribute vec2 p; void main(){ gl_Position=vec4(p,0,1); }';
    const fs = \`precision highp float;
      uniform vec2 r; uniform float t; uniform vec2 m;
      #define PI 3.14159265
      void main(){
        vec2 p = (gl_FragCoord.xy*2.0 - r)/min(r.x,r.y)/${s.zoom};
        float aM = (m.x-0.5)*PI; p = mat2(cos(aM),-sin(aM),sin(aM),cos(aM))*p;
        float rad = length(p), a = atan(p.y, p.x), tau = 2.0*PI/${s.symmetry}.0;
        a = abs(mod(a, tau) - tau*0.5); p = vec2(cos(a),sin(a))*rad;
        float acc = 0.0;
        for(float i=0.0; i<${s.iterations}.0; i++){
          p = abs(p) - vec2(0.5, 0.35 + sin(t*0.25 + i*0.4)*0.15);
          p = p/max(dot(p,p), 0.06) - vec2(0.8, 0.6);
          acc += exp(-abs(length(p)-1.0)*4.0);
        }
        vec3 c = mix(vec3(0.2,0.7,1.0), vec3(0.9,0.2,0.6), sin(acc*0.8 + t*0.25)*0.5+0.5) * acc*0.18;
        gl_FragColor = vec4(c * clamp(1.6-rad*0.8,0.0,1.0), 1.0);
      }\`;

    function sh(t,s){ const x=gl.createShader(t); gl.shaderSource(x,s); gl.compileShader(x); return x; }
    const prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    let mouse = { x: 0.5, y: 0.5 };
    window.addEventListener('mousemove', e => { mouse.x = e.clientX/w; mouse.y = e.clientY/h; });

    let t = 0;
    function draw() {
      t += 0.02 * ${s.speed};
      gl.uniform2f(gl.getUniformLocation(prog, 'r'), w, h);
      gl.uniform1f(gl.getUniformLocation(prog, 't'), t);
      gl.uniform2f(gl.getUniformLocation(prog, 'm'), mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`;
  }
};

// ========================================================
// 2. INTERACTIVE ACOUSTIC STRINGS (BY LIAM EGAN)
// Pluckable resonant harmonic strings with customized lyrics
// ========================================================
window.EffectRegistry['interactive-strings'] = {
  id: 'interactive-strings',
  title: 'Strings (Acoustic Pluck & Resonant Text)',
  category: 'Physics & Simulation',
  tech: 'Acoustic Wave Physics & Web Audio Synthesis',
  github: 'https://codepen.io/shubniggurath/pen/xbwOJye',
  description: 'Gitaarsnaren simulatie van Liam Egan (@shubniggurath). Beweeg je muis over de snaren om ze in trilling te brengen, geluid af te spelen en jouw eigen zinnen te laten golven!',
  defaultSettings: {
    stringCount: 7,
    tension: 0.04,
    dampening: 0.985,
    stringColor: '#06b6d4',
    phrase: 'RESOUNDING STRINGS // GEERT HARMONICS // SOUND OF WAVES'
  },
  controls: [
    { type: 'text', key: 'phrase', label: 'Tekst langs de snaren', placeholder: 'Jouw melodie of zin...' },
    { type: 'range', key: 'stringCount', label: 'Aantal Snaren', min: 3, max: 14, step: 1 },
    { type: 'range', key: 'tension', label: 'Snaar Spanning (Tension)', min: 0.01, max: 0.09, step: 0.005 },
    { type: 'range', key: 'dampening', label: 'Demping (Trilduur)', min: 0.95, max: 0.995, step: 0.002 },
    { type: 'color', key: 'stringColor', label: 'Snaar Gloed Kleur' }
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

    this.mouse = { x: 0, y: 0, px: 0, py: 0 };
    this.onMouseMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.px = this.mouse.x;
      this.mouse.py = this.mouse.y;
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.pluckCheck();
    };
    this.canvas.addEventListener('mousemove', this.onMouseMove);

    // Audio synthesizer context
    this.initAudioSynth();
    this.initStrings();
    this.active = true;
    this.loop();
  },
  initAudioSynth() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    } catch (e) {}
  },
  playPluckSound(freq = 440) {
    if (!this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
    gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 1.2);
  },
  initStrings() {
    this.width = this.canvas.width = this.canvas.offsetWidth || 800;
    this.height = this.canvas.height = this.canvas.offsetHeight || 500;
    const count = this.settings.stringCount;
    const spacing = this.height / (count + 1);

    this.strings = [];
    const notes = [220, 246.94, 277.18, 293.66, 329.63, 369.99, 440, 493.88, 554.37, 587.33, 659.25, 739.99, 880];

    const words = (this.settings.phrase || 'STRINGS').split('//');

    for (let i = 0; i < count; i++) {
      const y = spacing * (i + 1);
      const points = [];
      const segs = 36;
      for (let j = 0; j <= segs; j++) {
        points.push({
          x: (this.width / segs) * j,
          y: y,
          vy: 0,
          baseY: y
        });
      }
      this.strings.push({
        y,
        points,
        freq: notes[i % notes.length],
        label: words[i % words.length]?.trim() || `HARMONIC #${i + 1}`
      });
    }
  },
  pluckCheck() {
    for (let i = 0; i < this.strings.length; i++) {
      const s = this.strings[i];
      // Check if mouse crossed string vertically
      if ((this.mouse.py <= s.y && this.mouse.y >= s.y) || (this.mouse.py >= s.y && this.mouse.y <= s.y)) {
        const segIdx = Math.floor((this.mouse.x / this.width) * (s.points.length - 1));
        if (segIdx >= 0 && segIdx < s.points.length) {
          const force = (this.mouse.y - this.mouse.py) * 1.5;
          s.points[segIdx].vy += Math.max(-25, Math.min(25, force));
          this.playPluckSound(s.freq);
        }
      }
    }
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    this.initStrings();
  },
  loop() {
    if (!this.active) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const tension = this.settings.tension;
    const dampening = this.settings.dampening;
    const col = this.settings.stringColor;

    for (let i = 0; i < this.strings.length; i++) {
      const s = this.strings[i];
      const pts = s.points;

      // Wave propagation physics
      for (let j = 1; j < pts.length - 1; j++) {
        const p = pts[j];
        const prev = pts[j - 1];
        const next = pts[j + 1];

        const force = (prev.y + next.y - 2 * p.y) * tension;
        p.vy += force + (p.baseY - p.y) * 0.01;
        p.vy *= dampening;
        p.y += p.vy;
      }

      // Render glowing resonant string
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let j = 1; j < pts.length; j++) {
        const xc = (pts[j - 1].x + pts[j].x) / 2;
        const yc = (pts[j - 1].y + pts[j].y) / 2;
        ctx.quadraticCurveTo(pts[j - 1].x, pts[j - 1].y, xc, yc);
      }
      ctx.strokeStyle = col;
      ctx.lineWidth = 2.2;
      ctx.shadowBlur = 12;
      ctx.shadowColor = col;
      ctx.stroke();

      // Render vibrating string label / sentence along the path
      const mid = pts[Math.floor(pts.length / 2)];
      ctx.fillStyle = '#fff';
      ctx.font = '600 12px monospace';
      ctx.textAlign = 'center';
      ctx.shadowBlur = 6;
      ctx.fillText(`♪ ${s.label}`, mid.x, mid.y - 8);
    }

    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Acoustic Strings</title>
  <style>
    body { margin: 0; background: #070a13; overflow: hidden; height: 100vh; font-family: monospace; }
    canvas { display: block; width: 100vw; height: 100vh; cursor: crosshair; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c'), ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
    const actx = new (window.AudioContext || window.webkitAudioContext)();
    function beep(f){ if(actx.state==='suspended') actx.resume(); const o=actx.createOscillator(), g=actx.createGain(); o.type='triangle'; o.frequency.value=f; g.gain.setValueAtTime(0.2, actx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime+1); o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime+1); }

    const count = ${s.stringCount}, strings = [], notes=[220,277,329,369,440,493,554,659];
    const phrase = '${s.phrase}'.split('//');
    for(let i=0; i<count; i++){
      const y = (h/(count+1))*(i+1), pts=[];
      for(let j=0; j<=32; j++) pts.push({ x: (w/32)*j, y, vy: 0, by: y });
      strings.push({ y, pts, f: notes[i%notes.length], txt: phrase[i%phrase.length]?.trim() || 'STRING' });
    }
    let mx=0, my=0, pmx=0, pmy=0;
    window.addEventListener('mousemove', e => {
      pmx=mx; pmy=my; mx=e.clientX; my=e.clientY;
      for(const s of strings){
        if((pmy<=s.y && my>=s.y) || (pmy>=s.y && my<=s.y)){
          const idx = Math.floor((mx/w)*32);
          if(idx>=0 && idx<s.pts.length){ s.pts[idx].vy += (my-pmy)*1.5; beep(s.f); }
        }
      }
    });
    function loop(){
      ctx.clearRect(0,0,w,h);
      for(const s of strings){
        for(let j=1; j<s.pts.length-1; j++){
          const p=s.pts[j]; p.vy += (s.pts[j-1].y + s.pts[j+1].y - 2*p.y)*${s.tension} + (p.by - p.y)*0.01;
          p.vy *= ${s.dampening}; p.y += p.vy;
        }
        ctx.beginPath(); ctx.moveTo(s.pts[0].x, s.pts[0].y);
        for(let j=1; j<s.pts.length; j++){
          ctx.quadraticCurveTo(s.pts[j-1].x, s.pts[j-1].y, (s.pts[j-1].x+s.pts[j].x)/2, (s.pts[j-1].y+s.pts[j].y)/2);
        }
        ctx.strokeStyle = '${s.stringColor}'; ctx.lineWidth = 2; ctx.shadowBlur = 10; ctx.shadowColor = '${s.stringColor}'; ctx.stroke();
        const m = s.pts[16]; ctx.fillStyle = '#fff'; ctx.fillText('♪ ' + s.txt, m.x, m.y - 8);
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`;
  }
};

// ========================================================
// 3. GLSL LIQUID CHROME MERCURY BLOB (BY LIAM EGAN)
// ========================================================
window.EffectRegistry['liquid-chrome'] = {
  id: 'liquid-chrome',
  title: 'Liquid Chrome (Mercury Fluid)',
  category: 'Special / Experimental',
  tech: 'WebGL Raymarched Metallic Fresnel Specular Sphere',
  github: 'https://codepen.io/shubniggurath/pen/GLSL-Chrome',
  description: 'Vloeibaar reflecterend kwikzilver / chroom blob met dynamische lichtreflecties en jouw gegraveerde tekst.',
  defaultSettings: {
    engravedText: 'GEERT // MERCURY',
    chromaRoughness: 0.15,
    metallicGlow: '#38bdf8',
    fluidSpeed: 1.2
  },
  controls: [
    { type: 'text', key: 'engravedText', label: 'Gegraveerde Tekst', placeholder: 'GEERT // MERCURY' },
    { type: 'range', key: 'chromaRoughness', label: 'Vloeibaarheid Ruis', min: 0.05, max: 0.45, step: 0.02 },
    { type: 'range', key: 'fluidSpeed', label: 'Kwikzilver Snelheid', min: 0.4, max: 3.0, step: 0.2 },
    { type: 'color', key: 'metallicGlow', label: 'Reflectie Gloed Kleur' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.wrapper = document.createElement('div');
    this.wrapper.style.position = 'relative';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';
    this.wrapper.style.overflow = 'hidden';
    this.wrapper.style.background = '#020306';

    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';

    this.textOverlay = document.createElement('div');
    this.textOverlay.style.position = 'absolute';
    this.textOverlay.style.top = '50%';
    this.textOverlay.style.left = '50%';
    this.textOverlay.style.transform = 'translate(-50%, -50%)';
    this.textOverlay.style.fontFamily = 'var(--font-mono)';
    this.textOverlay.style.fontSize = '1.6rem';
    this.textOverlay.style.fontWeight = '800';
    this.textOverlay.style.letterSpacing = '4px';
    this.textOverlay.style.color = '#ffffff';
    this.textOverlay.style.textShadow = '0 0 15px rgba(255,255,255,0.9), 0 0 30px #38bdf8';
    this.textOverlay.style.pointerEvents = 'none';
    this.textOverlay.style.zIndex = '5';
    this.textOverlay.textContent = this.settings.engravedText || 'GEERT // MERCURY';

    this.wrapper.appendChild(this.canvas);
    this.wrapper.appendChild(this.textOverlay);
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.initGL();
    this.active = true;
    this.time = 0;
    this.loop();
  },
  initGL() {
    const gl = this.canvas.getContext('webgl');
    if (!gl) return;
    this.gl = gl;

    const vs = `attribute vec2 p; void main(){ gl_Position=vec4(p,0,1); }`;
    const fs = `
      precision highp float;
      uniform vec2 r;
      uniform float t;
      uniform float u_rough;
      uniform vec3 u_glow;

      // Simplex 3D noise approximation
      float noise(vec3 p) {
        return sin(p.x*1.5 + t)*cos(p.y*1.5 + t)*sin(p.z*1.5);
      }

      float scene(vec3 p) {
        float d = length(p) - 1.15;
        d += noise(p * 2.2) * u_rough;
        return d;
      }

      vec3 calcNormal(vec3 p) {
        float e = 0.005;
        return normalize(vec3(
          scene(p + vec3(e,0,0)) - scene(p - vec3(e,0,0)),
          scene(p + vec3(0,e,0)) - scene(p - vec3(0,e,0)),
          scene(p + vec3(0,0,e)) - scene(p - vec3(0,0,e))
        ));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);
        vec3 ro = vec3(0.0, 0.0, 3.2);
        vec3 rd = normalize(vec3(uv, -1.8));

        float d = 0.0;
        vec3 p = ro;
        for (int i = 0; i < 48; i++) {
          float dist = scene(p);
          if (dist < 0.001 || d > 8.0) break;
          d += dist;
          p = ro + rd * d;
        }

        vec3 col = vec3(0.01, 0.02, 0.05);
        if (d < 8.0) {
          vec3 n = calcNormal(p);
          vec3 ref = reflect(rd, n);

          // Metallic chrome environment reflection
          float fresnel = pow(1.0 - max(0.0, dot(-rd, n)), 3.0);
          vec3 env = mix(vec3(0.9, 0.95, 1.0), u_glow, sin(ref.y * 3.0 + t)*0.5 + 0.5);
          env += pow(max(0.0, dot(ref, normalize(vec3(1.0, 1.5, 1.0)))), 16.0);
          col = mix(env, vec3(1.0), fresnel);
        }

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const createSh = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, createSh(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, createSh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    this.program = prog;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);

    this.posAttr = gl.getAttribLocation(prog, 'p');
  },
  hexToRgb(hex) {
    const c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '#38bdf8');
    return c ? [parseInt(c[1], 16) / 255, parseInt(c[2], 16) / 255, parseInt(c[3], 16) / 255] : [0.2, 0.7, 1.0];
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.textOverlay) {
      this.textOverlay.textContent = this.settings.engravedText || 'GEERT // MERCURY';
      this.textOverlay.style.textShadow = `0 0 15px rgba(255,255,255,0.9), 0 0 30px ${this.settings.metallicGlow}`;
    }
  },
  loop() {
    if (!this.active) return;
    const gl = this.gl;
    if (gl && this.program) {
      const w = this.canvas.width = this.canvas.offsetWidth || 800;
      const h = this.canvas.height = this.canvas.offsetHeight || 500;
      gl.viewport(0, 0, w, h);

      gl.useProgram(this.program);
      gl.enableVertexAttribArray(this.posAttr);
      gl.vertexAttribPointer(this.posAttr, 2, gl.FLOAT, false, 0, 0);

      this.time += 0.03 * this.settings.fluidSpeed;

      const rgb = this.hexToRgb(this.settings.metallicGlow);

      gl.uniform2f(gl.getUniformLocation(this.program, 'r'), w, h);
      gl.uniform1f(gl.getUniformLocation(this.program, 't'), this.time);
      gl.uniform1f(gl.getUniformLocation(this.program, 'u_rough'), this.settings.chromaRoughness);
      gl.uniform3f(gl.getUniformLocation(this.program, 'u_glow'), rgb[0], rgb[1], rgb[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
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
  <title>Liquid Chrome Mercury: ${s.engravedText || 'Mercury'}</title>
  <style>
    body { margin: 0; background: #000; overflow: hidden; height: 100vh; font-family: monospace; }
    canvas { display: block; width: 100vw; height: 100vh; }
    .txt {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      font-size: 2rem; font-weight: bold; letter-spacing: 4px; color: #fff;
      text-shadow: 0 0 20px #fff, 0 0 40px ${s.metallicGlow}; pointer-events: none;
    }
  </style>
</head>
<body>
  <div class="txt">${s.engravedText || 'LIQUID CHROME'}</div>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c'), gl = canvas.getContext('webgl');
    let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
    const vs = 'attribute vec2 p; void main(){ gl_Position=vec4(p,0,1); }';
    const fs = \`precision highp float; uniform vec2 r; uniform float t;
      float noise(vec3 p){ return sin(p.x*1.5+t)*cos(p.y*1.5+t)*sin(p.z*1.5); }
      float scene(vec3 p){ return length(p) - 1.15 + noise(p*2.2)*${s.chromaRoughness}; }
      vec3 norm(vec3 p){ float e=0.005; return normalize(vec3(scene(p+vec3(e,0,0))-scene(p-vec3(e,0,0)), scene(p+vec3(0,e,0))-scene(p-vec3(0,e,0)), scene(p+vec3(0,0,e))-scene(p-vec3(0,0,e)))); }
      void main(){
        vec2 uv=(gl_FragCoord.xy*2.0-r)/min(r.x,r.y); vec3 ro=vec3(0,0,3.2), rd=normalize(vec3(uv,-1.8));
        float d=0.0; vec3 p=ro; for(int i=0;i<48;i++){ float dist=scene(p); if(dist<0.001||d>8.0) break; d+=dist; p=ro+rd*d; }
        vec3 col=vec3(0.01,0.02,0.05);
        if(d<8.0){ vec3 n=norm(p), ref=reflect(rd,n); col=mix(vec3(0.9,0.95,1.0), vec3(0.2,0.7,1.0), sin(ref.y*3.0+t)*0.5+0.5) + pow(max(0.0,dot(ref,normalize(vec3(1,1.5,1)))),16.0); }
        gl_FragColor=vec4(col,1.0);
      }\`;
    function sh(t,s){ const x=gl.createShader(t); gl.shaderSource(x,s); gl.compileShader(x); return x; }
    const p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER,vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER,fs)); gl.linkProgram(p); gl.useProgram(p);
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(p,'p'); gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
    let t = 0;
    function draw(){ t += 0.03*${s.fluidSpeed}; gl.uniform2f(gl.getUniformLocation(p,'r'),w,h); gl.uniform1f(gl.getUniformLocation(p,'t'),t); gl.drawArrays(gl.TRIANGLES,0,6); requestAnimationFrame(draw); }
    draw();
  </script>
</body>
</html>`;
  }
};

// ========================================================
// 4. PHOSPHORESCENCE BIOLUMINESCENT PARTICLE TEXT STREAM
// Swirling luminous quantum fluids that form custom words
// ========================================================
window.EffectRegistry['phosphorescence-flow'] = {
  id: 'phosphorescence-flow',
  title: 'Phosphorescence Bioluminescent Particle Text',
  category: 'Special / Experimental',
  tech: 'Vector Field Curl Noise & Typography Coalescence',
  github: 'https://codepen.io/shubniggurath/pen/Phosphorescence',
  description: 'Bioluminescente deeltjesstromen van Liam Egan (@shubniggurath) die via vector-veld curl-noise vloeiend samensmelten om jouw eigen zinnen en teksten te vormen.',
  defaultSettings: {
    targetWord: 'GEERT',
    particleCount: 2200,
    flowSpeed: 1.5,
    glowColor: '#10b981',
    accentColor: '#06b6d4'
  },
  controls: [
    { type: 'text', key: 'targetWord', label: 'Woord / Naam in Deeltjes', placeholder: 'GEERT' },
    { type: 'range', key: 'particleCount', label: 'Aantal Deeltjes', min: 800, max: 4000, step: 200 },
    { type: 'range', key: 'flowSpeed', label: 'Vloeisnelheid', min: 0.5, max: 3.5, step: 0.2 },
    { type: 'color', key: 'glowColor', label: 'Bio-Luminescentie Kleur' },
    { type: 'color', key: 'accentColor', label: 'Nevel Accent Kleur' },
    { type: 'trigger', key: 'triggerScatter', label: '✨ Verstrooi & Hervorm' }
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

    this.mouse = { x: -999, y: -999 };
    this.onMouseMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    };
    this.canvas.addEventListener('mousemove', this.onMouseMove);

    this.initTextTargets();
    this.active = true;
    this.time = 0;
    this.loop();
  },
  initTextTargets() {
    this.width = this.canvas.width = this.canvas.offsetWidth || 800;
    this.height = this.canvas.height = this.canvas.offsetHeight || 500;

    // Offscreen canvas to rasterize word into target coordinates
    const off = document.createElement('canvas');
    off.width = this.width;
    off.height = this.height;
    const offCtx = off.getContext('2d');

    const word = this.settings.targetWord || 'GEERT';
    const fontSize = Math.min(130, Math.floor(this.width / (word.length * 0.75)));
    offCtx.fillStyle = '#ffffff';
    offCtx.font = `800 ${fontSize}px sans-serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText(word, this.width / 2, this.height / 2);

    const imgData = offCtx.getImageData(0, 0, this.width, this.height).data;
    const targetPoints = [];
    const step = 4;
    for (let y = 0; y < this.height; y += step) {
      for (let x = 0; x < this.width; x += step) {
        const idx = (y * this.width + x) * 4;
        if (imgData[idx + 3] > 128) {
          targetPoints.push({ x, y });
        }
      }
    }

    this.particles = [];
    const count = this.settings.particleCount;
    for (let i = 0; i < count; i++) {
      const target = targetPoints[i % targetPoints.length] || { x: this.width / 2, y: this.height / 2 };
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        tx: target.x + (Math.random() - 0.5) * 4,
        ty: target.y + (Math.random() - 0.5) * 4,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 2 + 1,
        colorMix: Math.random()
      });
    }
  },
  triggerScatter() {
    for (const p of this.particles) {
      p.vx = (Math.random() - 0.5) * 20;
      p.vy = (Math.random() - 0.5) * 20;
    }
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
    this.initTextTargets();
  },
  loop() {
    if (!this.active) return;
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(2, 6, 14, 0.2)';
    ctx.fillRect(0, 0, this.width, this.height);

    this.time += 0.02 * this.settings.flowSpeed;

    const sp = this.settings.flowSpeed;
    const col1 = this.settings.glowColor;
    const col2 = this.settings.accentColor;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Vector curl field drift
      const angle = Math.sin(p.x * 0.005 + this.time) * Math.cos(p.y * 0.005 + this.time) * Math.PI * 2;
      const curlX = Math.cos(angle) * 0.6;
      const curlY = Math.sin(angle) * 0.6;

      // Spring to text target
      const dx = p.tx - p.x;
      const dy = p.ty - p.y;
      p.vx += (dx * 0.03 + curlX) * sp;
      p.vy += (dy * 0.03 + curlY) * sp;

      // Mouse evasion
      const mdx = p.x - this.mouse.x;
      const mdy = p.y - this.mouse.y;
      const mdist = Math.hypot(mdx, mdy);
      if (mdist < 70 && mdist > 0) {
        p.vx += (mdx / mdist) * 8;
        p.vy += (mdy / mdist) * 8;
      }

      p.vx *= 0.88;
      p.vy *= 0.88;
      p.x += p.vx;
      p.y += p.vy;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.colorMix > 0.5 ? col1 : col2;
      ctx.shadowBlur = 6;
      ctx.shadowColor = col1;
      ctx.fill();
    }

    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    const safeWord = (s.targetWord || 'GEERT').replace(/'/g, "\\'");
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phosphorescence Particle Text: ${s.targetWord || 'GEERT'}</title>
  <style>
    * { box-sizing: border-box; }
    body, html { margin: 0; padding: 0; background: #010409; overflow: hidden; width: 100%; height: 100%; font-family: sans-serif; }
    canvas { display: block; width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c'), ctx = canvas.getContext('2d');
    let w, h;
    const off = document.createElement('canvas');
    const octx = off.getContext('2d');
    const word = '${safeWord}';
    const targets = [];
    const count = ${s.particleCount || 2200};
    const parts = [];

    function initTargets() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      off.width = w;
      off.height = h;
      octx.clearRect(0, 0, w, h);

      const fontSize = Math.min(140, Math.max(36, Math.floor(w / ((word.length || 1) * 0.65))));
      octx.fillStyle = '#ffffff';
      octx.font = '800 ' + fontSize + 'px sans-serif';
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillText(word, w / 2, h / 2);

      const data = octx.getImageData(0, 0, w, h).data;
      targets.length = 0;
      for (let y = 0; y < h; y += 4) {
        for (let x = 0; x < w; x += 4) {
          if (data[(y * w + x) * 4 + 3] > 120) {
            targets.push({ x, y });
          }
        }
      }

      if (targets.length === 0) {
        for (let a = 0; a < Math.PI * 2; a += 0.05) {
          targets.push({ x: w / 2 + Math.cos(a) * 120, y: h / 2 + Math.sin(a) * 60 });
        }
      }

      if (parts.length === 0) {
        for (let i = 0; i < count; i++) {
          const t = targets[i % targets.length];
          parts.push({
            x: Math.random() * w,
            y: Math.random() * h,
            tx: t.x + (Math.random() - 0.5) * 4,
            ty: t.y + (Math.random() - 0.5) * 4,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            size: Math.random() * 1.8 + 1,
            colorMix: Math.random()
          });
        }
      } else {
        for (let i = 0; i < parts.length; i++) {
          const t = targets[i % targets.length];
          parts[i].tx = t.x + (Math.random() - 0.5) * 4;
          parts[i].ty = t.y + (Math.random() - 0.5) * 4;
        }
      }
    }

    let t = 0, mx = -999, my = -999;
    window.addEventListener('resize', initTargets);
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    window.addEventListener('touchmove', e => {
      if (e.touches && e.touches[0]) {
        mx = e.touches[0].clientX;
        my = e.touches[0].clientY;
      }
    });

    initTargets();

    function tick() {
      ctx.fillStyle = 'rgba(1, 4, 9, 0.2)';
      ctx.fillRect(0, 0, w, h);
      t += 0.02 * ${s.flowSpeed || 1.5};

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const a = Math.sin(p.x * 0.005 + t) * Math.cos(p.y * 0.005 + t) * Math.PI * 2;
        p.vx += ((p.tx - p.x) * 0.03 + Math.cos(a) * 0.6) * ${s.flowSpeed || 1.5};
        p.vy += ((p.ty - p.y) * 0.03 + Math.sin(a) * 0.6) * ${s.flowSpeed || 1.5};

        const md = Math.hypot(p.x - mx, p.y - my);
        if (md < 80 && md > 0) {
          p.vx += ((p.x - mx) / md) * 8;
          p.vy += ((p.y - my) / md) * 8;
        }

        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.colorMix > 0.5 ? '${s.glowColor || '#10b981'}' : '${s.accentColor || '#06b6d4'}';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '${s.glowColor || '#10b981'}';
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  </script>
</body>
</html>`;
  }
};
