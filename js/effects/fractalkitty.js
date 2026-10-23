// ========================================================
// FRACTALKITTY - MATHEMATICAL CLOCK EFFECT
// "there is – such that: A Visual Language for Composing Animated Clocks"
// Creator: Sophia (@fractalkitty)
// Source: https://codepen.io/fractalkitty/pen/rajeXGM
// Tech: p5.js Generative Vector Grammar
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

window.EffectRegistry['fractalkitty-clock'] = {
  id: 'fractalkitty-clock',
  title: 'there is – such that (Mathematical Clock)',
  category: 'Special / Experimental',
  tech: 'p5.js Generative Vector Grammar',
  github: 'https://codepen.io/fractalkitty/pen/rajeXGM',
  description: 'Een poëtische generatieve wiskundige klok van Sophia (@fractalkitty), gebouwd als een visuele compositietaal in p5.js met roterende raven-, kraaien- en magpie-vectoren.',
  defaultSettings: {
    timeSpeed: 1,
    cyclesPerDay: 2,
    hoursPerCycle: 12,
    lineWeight: 0.35,
    shapeWeight: 1.0,
    bgColor: '#3C4B5F'
  },
  controls: [
    { type: 'range', key: 'timeSpeed', label: 'Tijdversneller (Snelheid)', min: 1, max: 360, step: 1 },
    { type: 'range', key: 'cyclesPerDay', label: 'Cycli per Dag (Raven)', min: 1, max: 6, step: 1 },
    { type: 'range', key: 'hoursPerCycle', label: 'Uren per Cyclus (Kraai)', min: 4, max: 24, step: 2 },
    { type: 'range', key: 'lineWeight', label: 'Lijndikte (Vectors)', min: 0.1, max: 1.5, step: 0.05 },
    { type: 'range', key: 'shapeWeight', label: 'Vormdikte (Glyphs)', min: 0.2, max: 2.5, step: 0.1 },
    { type: 'color', key: 'bgColor', label: 'Achtergrondkleur' }
  ],

  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    container.innerHTML = '';

    this.iframe = document.createElement('iframe');
    this.iframe.style.width = '100%';
    this.iframe.style.height = '100%';
    this.iframe.style.border = 'none';
    this.iframe.style.display = 'block';
    this.iframe.style.borderRadius = '8px';
    this.iframe.setAttribute('title', 'Fractalkitty Mathematical Clock');

    container.appendChild(this.iframe);
    this.renderIframe();
  },

  update(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this.renderIframe();
  },

  renderIframe() {
    if (!this.iframe) return;
    this.iframe.srcdoc = this.getCode(this.settings);
  },

  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.iframe = null;
  },

  hexToRgb(hex) {
    let clean = (hex || '#3C4B5F').replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    const rgb = this.hexToRgb(s.bgColor);
    const bgR = rgb.r;
    const bgG = rgb.g;
    const bgB = rgb.b;
    const bgHex = s.bgColor || '#3C4B5F';

    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>there is – such that: Animated Mathematical Clock (by fractalkitty)</title>
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: ${bgHex};
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      font-family: system-ui, -apple-system, sans-serif;
    }
    canvas {
      display: block;
      margin: 0;
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.4);
      border-radius: 8px;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.10.0/lib/p5.min.js"><\/script>
</head>
<body>
  <script>
    const bgR = ${bgR};
    const bgG = ${bgG};
    const bgB = ${bgB};

    // Auto-generated p5 sketch from a "there is – such that" composition.
    // Drop into any HTML page that has p5.js loaded.
    const CYCLES_PER_DAY = ${s.cyclesPerDay || 2};
    const HOURS_PER_CYCLE = ${s.hoursPerCycle || 12};
    const FRAME_RATE = 30;
    const LINE_WEIGHT = ${s.lineWeight || 0.35};
    const SHAPE_WEIGHT = ${s.shapeWeight || 1};
    const TIME_SPEED = ${s.timeSpeed || 1};

    let timeOffset = 0;
    let lastRealTime = performance.now();
    // Default habitat parameters; per-node visual overrides come from the AST.
    const D = {
      grassDensity: 0.55,
      grassGust: 0.35,
      treeDepth: 5,
      eggSpeed: 0.5,
      groundWeight: 1.5,
    }
    // Per-instance caches keyed off (R, seed) so they regenerate on resize.
    const grassBladesCache = {}
    const nebulaBlobsCache = {}
    const mossPatchesCache = {}
    // Meta-trace cache. The trace is invariant for a given (habitat, R, color,
    // size) so we render it once to an off-screen p5.Graphics and blit the
    // image each frame. Per-frame cost drops from O(N vertices) to O(1).
    // The iframe reload on every loom mutation clears the cache when wiring
    // or globals change.
    const metaImageCache = {}

    function setup() {
      const side = min(windowWidth, windowHeight)
      createCanvas(side, side)
      noStroke()
      frameRate(FRAME_RATE)
    }

    function windowResized() {
      const side = min(windowWidth, windowHeight)
      resizeCanvas(side, side)
    }
    // Time helpers. All three bird angles share dayFraction so CYCLES_PER_DAY
    // and HOURS_PER_CYCLE re-scale every bird in lockstep.
    //   1 day    = 24 wall hours (anchor)
    //   1 cycle  = 24 / N wall hours       (raven covers one cycle)
    //   1 hour   = 24 / (N * M) wall hours (crow covers one hour)
    //   1 minute = 1 hour / 60             (magpi covers one minute)
    // N=2, M=12 reduces to a real clock.
    function dayFraction() {
      const now = performance.now();
      const dt = (now - lastRealTime) / 1000;
      lastRealTime = now;
      timeOffset += dt * (TIME_SPEED - 1);
      const t = new Date(Date.now() + timeOffset * 1000);
      return (t.getHours() * 3600 +
        t.getMinutes() * 60 +
        t.getSeconds() +
        t.getMilliseconds() / 1000) / 86400;
    }

    function ravenAngle() {
      // N cycles per day.
      return ((dayFraction() * CYCLES_PER_DAY) % 1) * TWO_PI - HALF_PI
    }

    function crowAngle() {
      // N*M cycles per day.
      return ((dayFraction() * CYCLES_PER_DAY * HOURS_PER_CYCLE) % 1) * TWO_PI - HALF_PI
    }

    function magpiAngle() {
      // N*M*60 cycles per day.
      return ((dayFraction() * CYCLES_PER_DAY * HOURS_PER_CYCLE * 60) % 1) * TWO_PI - HALF_PI
    }
    // Reinterpreted hour within the current cycle, 0 .. HOURS_PER_CYCLE.
    // Habitats use this for hour-driven counts.
    function currentHourInCycle() {
      return ((dayFraction() * CYCLES_PER_DAY) % 1) * HOURS_PER_CYCLE
    }
    // Stable seed from a node id so per-instance random patterns stay put.
    function seedFromId(id) {
      let h = 5381
      for (let i = 0; i < id.length; i++) {
        h = ((h << 5) + h) + id.charCodeAt(i)
      }
      return Math.abs(h | 0) || 1
    }
    // ─── Glyph visuals ────────────────────────────────────────────────────
    function drawSun(p, R, col, opacity, size, sw) {
      push()
      translate(p.x, p.y)
      if (col) stroke(col[0], col[1], col[2], col[3] * opacity)
      else stroke(220, 170, 90, 220 * opacity)
      strokeWeight(1.5 * SHAPE_WEIGHT * sw)
      noFill()
      const rays = 12
      const inner = R * 0.02 * size
      const outer = R * 0.06 * size
      for (let i = 0; i < rays; i++) {
        const a = (TWO_PI / rays) * i
        line(inner * cos(a), inner * sin(a), outer * cos(a), outer * sin(a))
      }
      pop()
    }

    function drawMoon(p, R, col, opacity, size, sw) {
      push()
      translate(p.x, p.y)
      rotate(p.angle + HALF_PI)
      if (col) stroke(col[0], col[1], col[2], col[3] * opacity)
      else stroke(190, 200, 220, 230 * opacity)
      strokeWeight(2 * SHAPE_WEIGHT * sw)
      noFill()
      const d = R * 0.10 * size
      arc(0, 0, d, d, -HALF_PI - PI / 4, HALF_PI - PI / 4)
      pop()
    }

    function drawStar(p, R, col, opacity, size, _sw) {
      noStroke()
      if (col) fill(col[0], col[1], col[2], col[3] * opacity)
      else fill(150, 140, 200, 230 * opacity)
      circle(p.x, p.y, R * 0.045 * size)
    }

    function drawLineSeg(p1, p2, col, opacity, size, sw) {
      push()
      if (col) stroke(col[0], col[1], col[2], col[3] * opacity)
      else stroke(107, 142, 127, 200 * opacity)
      strokeWeight(1.5 * size * LINE_WEIGHT * sw)
      noFill()
      line(p1.x, p1.y, p2.x, p2.y)
      pop()
    }
    // Habitat visuals (palette + math carried over from te-st.ing).
    // Pastel pick: turquoise / sage / misty blue.
    function palettePick(rnd) {
      const k = rnd()
      if (k < 0.40) return [105 + rnd() * 30, 160 + rnd() * 25, 165 + rnd() * 25]
      if (k < 0.70) return [130 + rnd() * 30, 160 + rnd() * 25, 140 + rnd() * 25]
      return [115 + rnd() * 25, 145 + rnd() * 25, 175 + rnd() * 20]
    }
    // N blades around the rim with per-blade sway/color/base/length/width.
    function getGrassBlades(R, instanceIdx, seed) {
      const key = ((R | 0) * 7919) ^ (seed | 0) ^ instanceIdx
      let blades = grassBladesCache[key]
      if (blades) return blades
      let st = (seed | 0) || 1
      const rnd = () => {
        st = (st * 1664525 + 1013904223) & 0x7fffffff;
        return st / 0x7fffffff
      }
      const startAngle = rnd() * TWO_PI
      const N = floor((280 + (instanceIdx % 3) * 100) * D.grassDensity)
      blades = new Array(N)
      for (let i = 0; i < N; i++) {
        const a = startAngle + (i / N) * TWO_PI + (rnd() - 0.5) * 0.10
        const c = palettePick(rnd)
        blades[i] = {
          angle: a,
          base: R * (0.99 - rnd() * 0.06),
          len: R * (0.04 + rnd() * 0.32),
          baseW: 1.8 + rnd() * 4.5,
          tipW: 0.3 + rnd() * 1.3,
          r: c[0],
          g: c[1],
          b: c[2],
          al: 110 + rnd() * 110,
          f1: 0.30 + rnd() * 0.85,
          f2: 0.20 + rnd() * 0.65,
          p1: rnd() * TWO_PI,
          p2: rnd() * TWO_PI,
          a1: 2 + rnd() * 5,
          a2: 1 + rnd() * 3,
        }
      }
      grassBladesCache[key] = blades
      return blades
    }

    function drawGrassBackdrop(R, t, instanceIdx, seed, vinput, tint, opacity, size, _sw) {
      const blades = getGrassBlades(R, instanceIdx, seed)
      const omega = vinput ? abs(vinput.omega) : 0
      const k = sqrt(omega)
      const windSpeed = min(0.05 + k * 25, 5)
      const gustStrength = D.grassGust * min(0.3 + k * 15, 5)
      const gust = sin(t * windSpeed) * gustStrength
      noStroke()
      for (let i = 0; i < blades.length; i++) {
        const b = blades[i]
        const gustHere = gust * cos(b.angle - t * 0.07) * 3
        const sway1 = sin(t * b.f1 + b.p1) * b.a1 + gustHere
        const sway2 = cos(t * b.f2 + b.p2) * b.a2
        push()
        rotate(b.angle)
        translate(b.base, 0)
        rotate(PI)
        // tint, when set, replaces the per-blade palette pick.
        if (tint) fill(tint[0], tint[1], tint[2], tint[3] * opacity)
        else fill(b.r, b.g, b.b, b.al * opacity)
        // size scales blade length + width; sway amplitudes are left alone so
        // wind motion stays at its natural scale regardless of blade size.
        const len = b.len * size
        const baseW = b.baseW * size
        const tipW = b.tipW * size
        beginShape()
        vertex(0, -baseW)
        bezierVertex(len * 0.30, -baseW + sway1, len * 0.70, -tipW + sway1 + sway2, len, 0)
        bezierVertex(len * 0.70, tipW + sway1 + sway2, len * 0.30, baseW + sway1, 0, baseW)
        endShape(CLOSE)
        pop()
      }
    }

    function treeBranch(len, depth, t, seed, swaySpeed, sw) {
      if (depth === 0 || len < 1) return
      strokeWeight(max(0.6, depth * 0.7) * LINE_WEIGHT * sw)
      const swayAmp = (5 - depth) * 0.045
      // swaySpeed scales the noise() time argument; faster input = faster sway.
      rotate((noise(seed * 0.31, t * 0.22 * swaySpeed) - 0.5) * swayAmp)
      line(0, 0, len, 0)
      push()
      translate(len, 0)
      const base = 0.42
      const a1 = base + (noise(seed * 0.13 + 1, t * 0.15 * swaySpeed) - 0.5) * 0.30
      const a2 = base + (noise(seed * 0.17 + 5, t * 0.15 * swaySpeed) - 0.5) * 0.30
      push();
      rotate(-a1);
      treeBranch(len * 0.72, depth - 1, t, seed * 2 + 1, swaySpeed, sw);
      pop()
      push();
      rotate(a2);
      treeBranch(len * 0.72, depth - 1, t, seed * 2 + 2, swaySpeed, sw);
      pop()
      if (depth >= 3 && noise(seed * 0.41 + 9) > 0.5) {
        push();
        rotate((a2 - a1) * 0.4);
        treeBranch(len * 0.55, depth - 1, t, seed * 2 + 3, swaySpeed, sw);
        pop()
      }
      pop()
    }

    function drawTreeBackdrop(R, t, H, instanceIdx, seed, vinput, tint, opacity, size, sw) {
      const N = max(1, floor(H || 12))
      let st = (seed | 0) || 1
      const rnd = () => {
        st = (st * 1664525 + 1013904223) & 0x7fffffff;
        return st / 0x7fffffff
      }
      const startAngle = rnd() * TWO_PI
      const omega = vinput ? abs(vinput.omega) : 0
      const swaySpeed = min(0.1 + sqrt(omega) * 20, 5)
      if (tint) stroke(tint[0], tint[1], tint[2], tint[3] * opacity)
      else stroke(110, 85, 70, 180 * opacity)
      noFill()
      for (let i = 0; i < N; i++) {
        const jitter = (rnd() - 0.5) * 0.10
        push()
        rotate(startAngle + (TWO_PI / N) * i + jitter)
        translate(R * 0.92, 0)
        rotate(PI)
        // size scales the initial branch length; depth (structure) is untouched.
        treeBranch(R * 0.14 * size, floor(D.treeDepth), t, seed + i * 11, swaySpeed, sw)
        pop()
      }
    }
    // Concentric rings of bokeh + pin-stars. Symmetry order tied to hour.
    function getNebulaBlobs(R, instanceIdx, seed, H) {
      const hour = max(1, floor(H || 12))
      const N = hour * 12
      const key = (((R | 0) * 7919) ^ (seed | 0) ^ instanceIdx) + hour * 1000003
      let blobs = nebulaBlobsCache[key]
      if (blobs) return blobs
      let st = (seed | 0) || 1
      const rnd = () => {
        st = (st * 1664525 + 1013904223) & 0x7fffffff;
        return st / 0x7fffffff
      }
      const startAngle = rnd() * TWO_PI
      const numRings = 4 + floor(rnd() * 3)
      blobs = []
      for (let r = 0; r < numRings; r++) {
        const ringRadius = R * (0.06 + r * 0.15)
        const isBokeh = rnd() < 0.55
        for (let i = 0; i < N; i++) {
          const angle = startAngle + (TWO_PI / N) * i + (rnd() - 0.5) * 0.15
          const radiusJitter = 1 + (rnd() - 0.5) * 0.15
          const x = ringRadius * radiusJitter * cos(angle)
          const y = ringRadius * radiusJitter * sin(angle)
          let size, alpha
          if (isBokeh) {
            size = R * (0.03 + pow(rnd(), 2.5) * 0.27)
            alpha = 15 + rnd() * 50
          } else {
            size = R * (0.001 + pow(rnd(), 2) * 0.022)
            alpha = 150 + rnd() * 100
          }
          const family = rnd()
          let cr, cg, cb
          if (family < 0.30) {
            cr = 150 + rnd() * 60;
            cg = 170 + rnd() * 50;
            cb = 200 + rnd() * 50
          } else if (family < 0.55) {
            cr = 180 + rnd() * 60;
            cg = 150 + rnd() * 50;
            cb = 180 + rnd() * 55
          } else if (family < 0.78) {
            cr = 220 + rnd() * 35;
            cg = 190 + rnd() * 45;
            cb = 155 + rnd() * 45
          } else {
            cr = 150 + rnd() * 55;
            cg = 185 + rnd() * 45;
            cb = 170 + rnd() * 50
          }
          blobs.push({
            x,
            y,
            size,
            alpha,
            r: cr,
            g: cg,
            b: cb,
            phase: rnd() * TWO_PI,
            driftR: 1.5 + rnd() * 2
          })
        }
      }
      nebulaBlobsCache[key] = blobs
      return blobs
    }

    function drawNebulaBackdrop(R, t, H, instanceIdx, seed, vinput, tint, opacity, size, _sw) {
      const blobs = getNebulaBlobs(R, instanceIdx, seed, H)
      const omega = vinput ? abs(vinput.omega) : 0
      const k = sqrt(omega)
      const breatheSpeed = min(0.1 + k * 10, 3)
      const breatheDepth = 0.04 + min(k * 1.5, 0.5)
      // size now scales the whole nebula uniformly: ring radii, drift, AND
      // blob diameters. Wrapping in scale() keeps the cached blob coords intact
      // (so we don't need to invalidate getNebulaBlobs on size changes).
      scale(size)
      noStroke()
      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i]
        const dx = cos(b.phase + t * 0.08) * b.driftR
        const dy = sin(b.phase + t * 0.06) * b.driftR
        const pulse = 1 + sin(t * breatheSpeed + b.phase) * breatheDepth
        if (tint) fill(tint[0], tint[1], tint[2], (tint[3] * b.alpha / 255) * opacity)
        else fill(b.r, b.g, b.b, b.alpha * opacity)
        circle(b.x + dx, b.y + dy, b.size * pulse)
      }
    }
    // Meta (ground): trace the input vector's path across one full cycle.
    // Without an input, fall back to a plum circle. The trace is rendered once
    // to an off-screen buffer and image-blitted per frame so dense epicycles
    // (e.g. Magpi+Raven, 720 lobes) don't dominate the frame budget. LINE_WEIGHT
    // intentionally NOT applied here — meta's stroke is computed per its lobe
    // count and shouldn't track the global line stroke weight.
    function drawMetaBackdrop(R, vinput, habitatId, tintColor, opacity, size, sw) {
      push()
      noFill()
      if (vinput && vinput.period > 0 && vinput.at) {
        // size and sw rounded to 0.05 so breathing-driven values reuse cache.
        const colKey = tintColor ? tintColor.join(',') : 'd'
        const sizeKey = (Math.round(size * 20) / 20).toFixed(2)
        const swKey = (Math.round(sw * 20) / 20).toFixed(2)
        const cacheKey = habitatId + ":" + (R | 0) + ":" + colKey + ":" + sizeKey + ":" + swKey
        let img = metaImageCache[cacheKey]
        if (!img) {
          img = renderMetaImage(R, vinput, tintColor, size, sw)
          metaImageCache[cacheKey] = img
        }
        // tint() multiplies the image's alpha by the per-frame opacity without
        // forcing a re-render.
        push()
        tint(255, 255, 255, 255 * opacity)
        imageMode(CENTER)
        image(img, 0, 0)
        pop()
      } else {
        if (tintColor) stroke(tintColor[0], tintColor[1], tintColor[2], tintColor[3] * opacity)
        else stroke(150, 120, 145, 150 * opacity)
        // No vector input: fall back to a sized circle.
        strokeWeight(D.groundWeight * size * sw)
        circle(0, 0, R * 0.6 * size)
      }
      pop()
    }
    // strokeMul is the per-node multiplier from emitHabitat; the local sw
    // is the lobe-derived baseline thickness. Distinct names.
    function renderMetaImage(R, vinput, tintColor, size, strokeMul) {
      const fullCycles = (vinput.period * abs(vinput.omega)) / TWO_PI
      const SAMPLES = constrain(floor(fullCycles * 20), 240, 5000)
      const sw = max(0.3, D.groundWeight / pow(fullCycles, 0.4))
      const alpha = constrain(200 / pow(fullCycles, 0.2), 60, 160)
      const buf = createGraphics(width, height)
      buf.translate(width / 2, height / 2)
      buf.noFill()
      if (tintColor) buf.stroke(tintColor[0], tintColor[1], tintColor[2], (tintColor[3] * alpha) / 255)
      else buf.stroke(150, 120, 145, alpha)
      buf.strokeWeight(sw * size * strokeMul)
      buf.beginShape()
      for (let i = 0; i < SAMPLES; i++) {
        const tOff = (i / SAMPLES) * vinput.period
        const p = vinput.at(tOff)
        buf.vertex(p.x, p.y)
      }
      buf.endShape(CLOSE)
      return buf
    }
    // Moss: dense field of small irregular patches in greens. Cached blob
    // positions + per-blob noise jitter make it feel alive without breaking
    // the budget. Vector input (if any) modulates the gentle sway speed.
    function getMossPatches(R, instanceIdx, seed) {
      const key = ((R | 0) * 7919) ^ (seed | 0) ^ instanceIdx
      let patches = mossPatchesCache[key]
      if (patches) return patches
      let st = (seed | 0) || 1
      const rnd = () => {
        st = (st * 1664525 + 1013904223) & 0x7fffffff;
        return st / 0x7fffffff
      }
      const N = floor(300 + (instanceIdx % 3) * 60)
      patches = new Array(N)
      for (let i = 0; i < N; i++) {
        const angle = rnd() * TWO_PI
        const dist = R * (0.05 + pow(rnd(), 0.6) * 0.95)
        const pick = rnd()
        let r, g, b
        if (pick < 0.45) {
          // Mid greens — the carpet base.
          r = 70 + rnd() * 50
          g = 110 + rnd() * 60
          b = 60 + rnd() * 40
        } else if (pick < 0.75) {
          // Yellow-greens — accents.
          r = 130 + rnd() * 40
          g = 150 + rnd() * 45
          b = 70 + rnd() * 30
        } else {
          // Deep shadows.
          r = 45 + rnd() * 40
          g = 75 + rnd() * 50
          b = 50 + rnd() * 30
        }
        patches[i] = {
          x: cos(angle) * dist,
          y: sin(angle) * dist,
          size: 2 + rnd() * 5,
          // Slight elongation so each patch reads as a leaf shape, not a dot.
          // Aspect in [1.0, 1.6] keeps them subtly oblong.
          aspect: 1 + rnd() * 0.6,
          r,
          g,
          b,
          alpha: 150 + rnd() * 100,
          phase: rnd() * TWO_PI,
          swayR: 0.5 + rnd() * 1.5,
          // Each blob settles to its own resting rotation, with a tiny drift.
          // Speed in roughly [-0.06, 0.06] rad/sec — slow enough that watching
          // a single blob looks still, but the field shimmers in aggregate.
          rotPhase: rnd() * TWO_PI,
          rotSpeed: (rnd() - 0.5) * 0.12,
        }
      }
      mossPatchesCache[key] = patches
      return patches
    }

    function drawMossBackdrop(R, t, instanceIdx, seed, vinput, tint, opacity, size, _sw) {
      const patches = getMossPatches(R, instanceIdx, seed)
      const omega = vinput ? abs(vinput.omega) : 0
      // Gentle sway: omega 0 = barely-still, fast input = livelier breathing.
      // Same factor scales the rotational drift so the whole field feels
      // coherent — fast vector input wakes the moss up; no input lets it
      // settle.
      const sway = min(0.05 + sqrt(omega) * 6, 1.5)
      noStroke()
      scale(size)
      for (let i = 0; i < patches.length; i++) {
        const p = patches[i]
        const jx = cos(p.phase + t * sway * 0.4) * p.swayR
        const jy = sin(p.phase + t * sway * 0.35) * p.swayR
        if (tint) fill(tint[0], tint[1], tint[2], (tint[3] * p.alpha / 255) * opacity)
        else fill(p.r, p.g, p.b, p.alpha * opacity)
        push()
        translate(p.x + jx, p.y + jy)
        rotate(p.rotPhase + t * p.rotSpeed * sway)
        ellipse(0, 0, p.size * p.aspect, p.size)
        pop()
      }
    }
    // Focus: porthole mask. Fills the area OUTSIDE a circle with the tint
    // color and draws a thin ring around the circle. A wired vector recenters
    // the porthole at its resolved position (spotlight effect).
    function drawFocusBackdrop(R, vinput, tint, opacity, size, sw) {
      const cx = vinput ? vinput.x : 0
      const cy = vinput ? vinput.y : 0
      const r = R * 0.7 * size
      const fr = tint ? tint[0] : 247
      const fg = tint ? tint[1] : 241
      const fb = tint ? tint[2] : 230
      const fa = (tint ? tint[3] : 255) * opacity
      push()
      translate(cx, cy)
      noStroke()
      fill(fr, fg, fb, fa)
      // Lower half-screen mask: arc 0..PI sweeping the bottom half of the
      // circle, then canvas corners filling the area beneath.
      const N = 90
      beginShape()
      for (let i = 0; i <= N; i++) {
        const a = (i / N) * PI
        vertex(r * cos(a), r * sin(a))
      }
      vertex(-width, 0)
      vertex(-width, height)
      vertex(width, height)
      vertex(width, 0)
      endShape(CLOSE)
      // Upper half-screen mask: arc PI..2PI sweeping the top half.
      beginShape()
      for (let i = 0; i <= N; i++) {
        const a = PI + (i / N) * PI
        vertex(r * cos(a), r * sin(a))
      }
      vertex(width, 0)
      vertex(width, -height)
      vertex(-width, -height)
      vertex(-width, 0)
      endShape(CLOSE)
      // Thin ring just outside the porthole, in the same hue.
      noFill()
      stroke(fr, fg, fb, fa)
      strokeWeight(1 * sw)
      circle(0, 0, 2 * r + R * 0.04)
      pop()
    }
    // Radially-arranged ellipses with two small orbiting circles each.
    // Vector input drives orbit speed; tint replaces the default plum.
    function drawEggBackdrop(R, t, H, instanceIdx, seed, vinput, tint, opacity, size, sw) {
      const N = max(3, floor(H || 12) * 3)
      let st = (seed | 0) || 1
      const rnd = () => {
        st = (st * 1664525 + 1013904223) & 0x7fffffff;
        return st / 0x7fffffff
      }
      const startAngle = rnd() * TWO_PI
      const sr = tint ? tint[0] : 200,
        sg = tint ? tint[1] : 180,
        sb = tint ? tint[2] : 195,
        sa = (tint ? (tint[3] * 130) / 255 : 130) * opacity
      const fr = tint ? tint[0] : 150,
        fg = tint ? tint[1] : 110,
        fb = tint ? tint[2] : 145,
        fa = (tint ? (tint[3] * 200) / 255 : 200) * opacity
      const omega = vinput ? abs(vinput.omega) : 0
      const orbitSpeed = D.eggSpeed * min(0.3 + sqrt(omega) * 15, 5)
      push()
      rotate(startAngle + instanceIdx * 0.21)
      for (let i = 0; i < N; i++) {
        push()
        rotate((TWO_PI / N) * i)
        // Scale each ellipse + its dots; ring arrangement is unchanged.
        const w = R * 0.55 * size
        const h = R * 0.13 * size
        translate(w / 2, 0)
        noFill()
        stroke(sr, sg, sb, sa)
        strokeWeight(0.8 * SHAPE_WEIGHT * sw)
        ellipse(0, 0, w, h)
        for (let k = 0; k < 2; k++) {
          const phase = t * orbitSpeed + i * 0.3 + k * PI
          const ox = (w / 2) * cos(phase)
          const oy = (h / 2) * sin(phase)
          noStroke()
          fill(fr, fg, fb, fa)
          circle(ox, oy, R * 0.014 * size)
        }
        pop()
      }
      pop()
    }
    // ─── Draw loop ────────────────────────────────────────────────────────
    function draw() {
      try {
        background(bgR, bgG, bgB)
        translate(width / 2, height / 2)
        const R = min(width, height) * 0.45
        const t = millis() / 1000
        const H = currentHourInCycle()
        // Positions for vectors + modified-vectors; values for scalars.
        const pos = {}
        const scalars = {}
        pos["1766b32f-5d50-4dc2-803b-09d49a2d3bcc"] = (function() {
          const a = ravenAngle();
          const len = 0.3 * 1 * R;
          const omega = (TWO_PI * CYCLES_PER_DAY / 86400);
          return {
            x: cos(a) * len,
            y: sin(a) * len,
            angle: a,
            omega,
            period: TWO_PI / omega,
            at: function(tOff) {
              const aOff = a + omega * tOff;
              return {
                x: cos(aOff) * len,
                y: sin(aOff) * len,
                angle: aOff
              }
            }
          }
        }())
        pos["cecca55a-2c14-4e74-a705-d91339167b39"] = (function() {
          const a = crowAngle();
          const len = 0.3 * 1.2 * R;
          const omega = (TWO_PI * CYCLES_PER_DAY * HOURS_PER_CYCLE / 86400);
          return {
            x: cos(a) * len,
            y: sin(a) * len,
            angle: a,
            omega,
            period: TWO_PI / omega,
            at: function(tOff) {
              const aOff = a + omega * tOff;
              return {
                x: cos(aOff) * len,
                y: sin(aOff) * len,
                angle: aOff
              }
            }
          }
        }())
        pos["3dd47633-5182-405f-b565-2185432d0826"] = (function() {
          const a = magpiAngle();
          const len = 0.3 * 1.5 * R;
          const omega = (TWO_PI * CYCLES_PER_DAY * HOURS_PER_CYCLE * 60 / 86400);
          return {
            x: cos(a) * len,
            y: sin(a) * len,
            angle: a,
            omega,
            period: TWO_PI / omega,
            at: function(tOff) {
              const aOff = a + omega * tOff;
              return {
                x: cos(aOff) * len,
                y: sin(aOff) * len,
                angle: aOff
              }
            }
          }
        }())
        pos["637f03ac-4d71-48e0-a756-7119798bf490"] = {
          x: 0,
          y: 0,
          angle: 0,
          omega: 0,
          period: 0,
          at: function(tOff) {
            return {
              x: 0,
              y: 0,
              angle: 0
            }
          }
        }
        pos["b403000c-84e7-4a24-abd0-45065204ee9e"] = (function() {
          const A = pos["1766b32f-5d50-4dc2-803b-09d49a2d3bcc"],
            B = pos["cecca55a-2c14-4e74-a705-d91339167b39"];
          const x = A.x + B.x,
            y = A.y + B.y;
          return {
            x,
            y,
            angle: atan2(y, x),
            omega: abs(A.omega) > abs(B.omega) ? A.omega : B.omega,
            period: max(A.period, B.period),
            at: function(tOff) {
              const Ao = A.at(tOff),
                Bo = B.at(tOff);
              return {
                x: Ao.x + Bo.x,
                y: Ao.y + Bo.y,
                angle: atan2(Ao.y + Bo.y, Ao.x + Bo.x)
              }
            }
          }
        }())
        pos["0749cf64-b62e-4595-98aa-f461f3e3a88f"] = (function() {
          const A = pos["3dd47633-5182-405f-b565-2185432d0826"],
            B = pos["b403000c-84e7-4a24-abd0-45065204ee9e"];
          const x = A.x + B.x,
            y = A.y + B.y;
          return {
            x,
            y,
            angle: atan2(y, x),
            omega: abs(A.omega) > abs(B.omega) ? A.omega : B.omega,
            period: max(A.period, B.period),
            at: function(tOff) {
              const Ao = A.at(tOff),
                Bo = B.at(tOff);
              return {
                x: Ao.x + Bo.x,
                y: Ao.y + Bo.y,
                angle: atan2(Ao.y + Bo.y, Ao.x + Bo.x)
              }
            }
          }
        }())
        pos["ccc2d37a-7785-41db-a7aa-0b59ed6836b6"] = (function() {
          const A = pos["cecca55a-2c14-4e74-a705-d91339167b39"],
            B = pos["3dd47633-5182-405f-b565-2185432d0826"];
          const x = A.x + B.x,
            y = A.y + B.y;
          return {
            x,
            y,
            angle: atan2(y, x),
            omega: abs(A.omega) > abs(B.omega) ? A.omega : B.omega,
            period: max(A.period, B.period),
            at: function(tOff) {
              const Ao = A.at(tOff),
                Bo = B.at(tOff);
              return {
                x: Ao.x + Bo.x,
                y: Ao.y + Bo.y,
                angle: atan2(Ao.y + Bo.y, Ao.x + Bo.x)
              }
            }
          }
        }())
        // Renderables in composition.nodes order. Later in array = drawn on top.
        push();
        drawMetaBackdrop(R, pos["0749cf64-b62e-4595-98aa-f461f3e3a88f"], "1f8fcb20-a3ff-43fc-b924-824edc1b8417", [55, 69, 88, 255], 0.85, 1.6, 1);
        pop()
        push();
        drawMetaBackdrop(R, pos["b403000c-84e7-4a24-abd0-45065204ee9e"], "2e23a4ed-16e0-4f71-a647-20c0a533d272", [236, 239, 243, 255], 1, 1, 1);
        pop()
        drawLineSeg(pos["0749cf64-b62e-4595-98aa-f461f3e3a88f"], pos["ccc2d37a-7785-41db-a7aa-0b59ed6836b6"], [155, 171, 192, 255], 1, 1, 1)
        drawLineSeg(pos["b403000c-84e7-4a24-abd0-45065204ee9e"], pos["0749cf64-b62e-4595-98aa-f461f3e3a88f"], [155, 171, 192, 255], 1, 1, 1)
        drawLineSeg(pos["b403000c-84e7-4a24-abd0-45065204ee9e"], pos["ccc2d37a-7785-41db-a7aa-0b59ed6836b6"], [155, 171, 192, 255], 1, 1, 1)
        drawLineSeg(pos["cecca55a-2c14-4e74-a705-d91339167b39"], pos["637f03ac-4d71-48e0-a756-7119798bf490"], [236, 239, 243, 255], 1, 3, 1)
        drawLineSeg(pos["1766b32f-5d50-4dc2-803b-09d49a2d3bcc"], pos["637f03ac-4d71-48e0-a756-7119798bf490"], [236, 239, 243, 255], 1, 3, 1)
        drawLineSeg(pos["ccc2d37a-7785-41db-a7aa-0b59ed6836b6"], pos["3dd47633-5182-405f-b565-2185432d0826"], [155, 171, 192, 255], 1, 1, 1)
        drawLineSeg(pos["cecca55a-2c14-4e74-a705-d91339167b39"], pos["ccc2d37a-7785-41db-a7aa-0b59ed6836b6"], [155, 171, 192, 255], 1, 1, 1)
        drawLineSeg(pos["637f03ac-4d71-48e0-a756-7119798bf490"], pos["3dd47633-5182-405f-b565-2185432d0826"], [236, 239, 243, 255], 1, 2.3, 1)
        drawLineSeg(pos["1766b32f-5d50-4dc2-803b-09d49a2d3bcc"], pos["b403000c-84e7-4a24-abd0-45065204ee9e"], [155, 171, 192, 255], 1, 1, 1)
        drawLineSeg(pos["1766b32f-5d50-4dc2-803b-09d49a2d3bcc"], pos["0749cf64-b62e-4595-98aa-f461f3e3a88f"], [155, 171, 192, 255], 1, 1, 1)
        drawLineSeg(pos["cecca55a-2c14-4e74-a705-d91339167b39"], pos["b403000c-84e7-4a24-abd0-45065204ee9e"], [155, 171, 192, 255], 1, 1, 1)
        drawLineSeg(pos["3dd47633-5182-405f-b565-2185432d0826"], pos["0749cf64-b62e-4595-98aa-f461f3e3a88f"], [155, 171, 192, 255], 1, 1, 1)
        drawLineSeg(pos["3dd47633-5182-405f-b565-2185432d0826"], pos["b403000c-84e7-4a24-abd0-45065204ee9e"], [155, 171, 192, 255], 1, 1, 1)
        drawLineSeg(pos["1766b32f-5d50-4dc2-803b-09d49a2d3bcc"], pos["cecca55a-2c14-4e74-a705-d91339167b39"], [155, 171, 192, 255], 1, 1, 1)
        drawLineSeg(pos["1766b32f-5d50-4dc2-803b-09d49a2d3bcc"], pos["3dd47633-5182-405f-b565-2185432d0826"], [155, 171, 192, 255], 1, 1, 1)
        drawLineSeg(pos["3dd47633-5182-405f-b565-2185432d0826"], pos["cecca55a-2c14-4e74-a705-d91339167b39"], [155, 171, 192, 255], 1, 1, 1)
        drawLineSeg(pos["637f03ac-4d71-48e0-a756-7119798bf490"], pos["b403000c-84e7-4a24-abd0-45065204ee9e"], [230, 220, 200, 255], 1, 1, 1)
        drawLineSeg(pos["637f03ac-4d71-48e0-a756-7119798bf490"], pos["0749cf64-b62e-4595-98aa-f461f3e3a88f"], [155, 171, 192, 255], 1, 1, 1)
        drawLineSeg(pos["637f03ac-4d71-48e0-a756-7119798bf490"], pos["ccc2d37a-7785-41db-a7aa-0b59ed6836b6"], [155, 171, 192, 255], 1, 1, 1)
        push();
        drawGrassBackdrop(R, t, 2, seedFromId("07c818a7-0b26-4aff-804a-7d410d2bf1e7"), pos["cecca55a-2c14-4e74-a705-d91339167b39"], [197, 221, 216, 255], (0.1 * (1 + 0.5 * sin(t * 0.314159))), (1.95 * (1 + 0.5 * sin(t * 0.314159))), 1);
        pop()
        push();
        drawTreeBackdrop(R, t, H, 3, seedFromId("9a35941d-b07a-4978-b8f5-1004e4816e56"), pos["1766b32f-5d50-4dc2-803b-09d49a2d3bcc"], [190, 200, 220, 255], 0.8, 1.1, 1);
        pop()
        push();
        drawGrassBackdrop(R, t, 4, seedFromId("eed391a8-40f9-4918-a9b7-1cbec695f405"), pos["1766b32f-5d50-4dc2-803b-09d49a2d3bcc"], [178, 210, 202, 255], 0.5, 0.45, 1);
        pop()
        push();
        drawNebulaBackdrop(R, t, H, 5, seedFromId("b83c17e9-51d2-43d6-b1e0-5da53d036119"), pos["cecca55a-2c14-4e74-a705-d91339167b39"], null, 0.25, 2.45, 1);
        pop()
        push();
        drawEggBackdrop(R, t, H, 6, seedFromId("bdb9b040-c8c8-4444-a8d4-bc5f3b3e3f21"), pos["1766b32f-5d50-4dc2-803b-09d49a2d3bcc"], [107, 168, 154, 255], 0.5, 2.05, 1);
        pop()
        push();
        drawTreeBackdrop(R, t, H, 7, seedFromId("d386ae62-e862-4834-b9aa-bfc014a821df"), pos["1766b32f-5d50-4dc2-803b-09d49a2d3bcc"], [181, 138, 158, 255], 0.5, 1, 1);
        pop()
        push();
        drawEggBackdrop(R, t, H, 8, seedFromId("2d97f498-d6a3-406c-bc1c-3e3caac0bc15"), pos["1766b32f-5d50-4dc2-803b-09d49a2d3bcc"], [230, 220, 200, 255], 0.4, 0.5, 1);
        pop()
        push();
        drawFocusBackdrop(R, pos["3dd47633-5182-405f-b565-2185432d0826"], [199, 208, 219, 255], 0.2, 0.9, 0.6);
        pop()
        // Debug overlays — only emitted when selectedIds was provided.
      } catch (_drawErr) {
        // Sketch runtime error. Log once, paint a soft terracotta overlay so
        // the user sees something is wrong without freezing the iframe. The
        // next frame retries — transient bugs (rare JS gremlins) recover.
        if (!_drawErrorLogged) {
          console.error('[clock] runtime error in draw:', _drawErr)
          _drawErrorLogged = true
        }
        _drawErrorOverlay()
      }
    }
    let _drawErrorLogged = false

    function _drawErrorOverlay() {
      push()
      resetMatrix()
      noStroke()
      fill(0, 0, 0, 80)
      rect(0, 0, width, height)
      fill(214, 122, 74, 230)
      textAlign(CENTER, CENTER)
      textSize(min(width, height) * 0.12)
      text('⊘', width / 2, height / 2)
      pop()
    }
    // Debug overlay helpers. Bright yellow so they read as "system" rather
    // than part of the composition. Pulses with millis() to draw the eye.
    function _selPulse() {
      return 0.55 + 0.45 * sin(millis() * 0.006)
    }

    function _selRing(p, R) {
      if (!p) return
      push()
      noFill()
      stroke(255, 234, 70, 200 * _selPulse())
      strokeWeight(2.5)
      circle(p.x, p.y, R * 0.10)
      pop()
    }

    function _selLabel(txt, idx, R) {
      push()
      fill(255, 234, 70, 230)
      noStroke()
      textSize(R * 0.04)
      textAlign(LEFT, TOP)
      text(txt, -R * 0.95, -R * 0.95 + idx * R * 0.055)
      pop()
    }

    function _selLine(p1, p2, R) {
      if (!p1 || !p2) return
      push()
      stroke(255, 234, 70, 220 * _selPulse())
      strokeWeight(3.5)
      noFill()
      line(p1.x, p1.y, p2.x, p2.y)
      pop()
      _selRing(p1, R)
      _selRing(p2, R)
    }

    function _selHabitatHalo(R) {
      push()
      noFill()
      stroke(255, 234, 70, 180 * _selPulse())
      strokeWeight(2)
      if (drawingContext.setLineDash) drawingContext.setLineDash([6, 8])
      circle(0, 0, R * 1.95)
      if (drawingContext.setLineDash) drawingContext.setLineDash([])
      pop()
    }
  
  <\/script>
</body>
</html>`;
  }
};
