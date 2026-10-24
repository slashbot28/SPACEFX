// ========================================================
// CODEPEN COMMUNITY MASTERPIECES COLLECTION (14 EFFECTS)
// Integrated with universal Google Fonts & custom controls
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// --------------------------------------------------------
// 1. Vertical Fan — Text Loop Timeline
// Author: JP Belley (@jpbelley) (https://codepen.io/jpbelley/pen/JobwWaP)
// --------------------------------------------------------

// --------------------------------------------------------
// 1. Vertical Fan — Text Loop Timeline
// Author: JP Belley (@jpbelley) (https://codepen.io/jpbelley/pen/JobwWaP)
// Enhanced with Word Cycling, Motion Fan Rotation, Scroll Parallax & Glow
// --------------------------------------------------------

// --------------------------------------------------------
// 1. Vertical Fan — Text Loop Timeline
// Author: JP Belley (@jpbelley) (https://codepen.io/jpbelley/pen/JobwWaP)
// Enhanced with Word Cycling, Motion Fan Rotation, Scroll Parallax & Glow
// --------------------------------------------------------
window.EffectRegistry['jpbelley-vertical-fan'] = {
  id: 'jpbelley-vertical-fan',
  title: "Vertical Fan — Text Loop Timeline",
  category: 'Special / Experimental',
  tech: 'Typography Timeline & Dynamic Fan',
  github: 'https://codepen.io/jpbelley/pen/JobwWaP',
  description: "Typografische verticale waaier met automatische woordenwissel, boogrotaties, interactieve scroll/parallax en neon glow.",
  defaultSettings: {
    fontFamily: "'Recursive', sans-serif",
    customWords: "DESIGN, MOTION, CODE, FUTURE, VISION",
    speed: 1.0,
    fanMotion: "fan-arc",
    glowColor: "#6366f1",
    textColor: "#e8eaf0",
    bgColor: "#080710"
  },
  controls: [
    {
      type: "select", key: "fontFamily", label: "Lettertype (Font)",
      options: [
        { value: "'Recursive', sans-serif", label: "Recursive (Modern Variable)" },
        { value: "'Montserrat', sans-serif", label: "Montserrat (Geometric Bold)" },
        { value: "'Orbitron', sans-serif", label: "Orbitron (Futuristic Sci-Fi)" },
        { value: "'Cinzel', serif", label: "Cinzel (Classical Elegant)" },
        { value: "'Fira Code', monospace", label: "Fira Code (Cyber Monospace)" },
        { value: "'Pacifico', cursive", label: "Pacifico (Retro Script)" },
        { value: "'Space Grotesk', sans-serif", label: "Space Grotesk" }
      ]
    },
    { type: "text", key: "customWords", label: "Woordenlijst (komma gescheiden)" },
    {
      type: "select", key: "fanMotion", label: "Waaier Animatie Stijl",
      options: [
        { value: "fan-arc", label: "Waaier Boog & Hoek Rotatie" },
        { value: "wave-pulse", label: "Sinusgolf Puls & Uitschuiven" },
        { value: "spiral-tilt", label: "3D Spiraal & Diepte Tilt" }
      ]
    },
    { type: "range", key: "speed", label: "Animatie Snelheid", min: 0.2, max: 3.0, step: 0.1 },
    { type: "color", key: "glowColor", label: "Neon Gloed Tint" },
    { type: "color", key: "textColor", label: "Tekstkleur" },
    { type: "color", key: "bgColor", label: "Achtergrondkleur" }
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
    this.iframe.setAttribute('title', "Vertical Fan — Text Loop Timeline");

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
    if (this.container) this.container.innerHTML = '';
    this.iframe = null;
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    const rawWords = (s.customWords || "DESIGN, MOTION, CODE, FUTURE, VISION")
      .split(',')
      .map(w => w.trim())
      .filter(Boolean);
    const wordsJson = JSON.stringify(rawWords.length ? rawWords : ["DESIGN", "MOTION", "CODE"]);

    return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>Vertical Fan | Text Loop Timeline</title>\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
'  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
'  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">\n' +
'  <style>\n' +
'    * { box-sizing: border-box; margin: 0; padding: 0; }\n' +
'    body {\n' +
'      background: ' + (s.bgColor || '#080710') + ';\n' +
'      min-height: 100vh;\n' +
'      display: flex;\n' +
'      align-items: center;\n' +
'      justify-content: center;\n' +
'      overflow: hidden;\n' +
'      perspective: 800px;\n' +
'      font-family: ' + (s.fontFamily || "'Recursive', sans-serif") + ';\n' +
'    }\n' +
'    #stage-wrap {\n' +
'      position: relative;\n' +
'      display: flex;\n' +
'      align-items: center;\n' +
'      justify-content: center;\n' +
'      transition: transform 0.15s ease-out;\n' +
'      transform-style: preserve-3d;\n' +
'    }\n' +
'    .text {\n' +
'      font-family: inherit;\n' +
'      font-size: clamp(48px, 9vw, 110px);\n' +
'      font-weight: 800;\n' +
'      color: ' + (s.textColor || '#e8eaf0') + ';\n' +
'      letter-spacing: -0.02em;\n' +
'      line-height: 1;\n' +
'      display: flex;\n' +
'      text-shadow: 0 0 20px ' + (s.glowColor || '#6366f1') + '88, 0 0 40px ' + (s.glowColor || '#6366f1') + '44;\n' +
'    }\n' +
'    .ghost-layer {\n' +
'      opacity: 0.18;\n' +
'      user-select: none;\n' +
'      pointer-events: none;\n' +
'      filter: blur(1px);\n' +
'    }\n' +
'    .char {\n' +
'      display: inline-block;\n' +
'      white-space: pre;\n' +
'      will-change: transform, opacity, filter;\n' +
'      transition: text-shadow 0.3s;\n' +
'    }\n' +
'    .char:hover {\n' +
'      color: #ffffff;\n' +
'      text-shadow: 0 0 30px ' + (s.glowColor || '#6366f1') + ', 0 0 60px ' + (s.glowColor || '#6366f1') + ';\n' +
'    }\n' +
'    #scroll-hint {\n' +
'      position: fixed;\n' +
'      bottom: 24px;\n' +
'      left: 50%;\n' +
'      transform: translateX(-50%);\n' +
'      font-size: 0.78rem;\n' +
'      color: rgba(255, 255, 255, 0.45);\n' +
'      letter-spacing: 0.15em;\n' +
'      text-transform: uppercase;\n' +
'      display: flex;\n' +
'      align-items: center;\n' +
'      gap: 8px;\n' +
'    }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div id="stage-wrap">\n' +
'    <div id="stage"></div>\n' +
'  </div>\n' +
'  <div id="scroll-hint">✦ Scroll of beweeg muis voor waaier-reactie ✦</div>\n' +
'  <script>\n' +
'    const WORDS = ' + wordsJson + ';\n' +
'    const SPEED_SCALE = ' + (s.speed || 1.0) + ';\n' +
'    const FAN_STYLE = "' + (s.fanMotion || 'fan-arc') + '";\n' +
'    const STAGE = document.getElementById("stage");\n' +
'    const STAGE_WRAP = document.getElementById("stage-wrap");\n' +
'\n' +
'    let wordIndex = 0;\n' +
'    let chars = [];\n' +
'    let scrollBoost = 0;\n' +
'    let mouseX = 0, mouseY = 0;\n' +
'\n' +
'    const ease = {\n' +
'      out: t => 1 - Math.pow(1 - t, 3),\n' +
'      in: t => Math.pow(t, 3),\n' +
'      inOut: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2\n' +
'    };\n' +
'\n' +
'    function cyc(f, offset, enter, hold, exit, pause) {\n' +
'      if (f < offset) return 0;\n' +
'      const total = enter + hold + exit + pause;\n' +
'      const t = (f - offset) % total;\n' +
'      if (t < enter) return ease.out(t / enter);\n' +
'      if (t < enter + hold) return 1;\n' +
'      if (t < enter + hold + exit) return 1 - ease.in((t - enter - hold) / exit);\n' +
'      return 0;\n' +
'    }\n' +
'\n' +
'    function setupWord(word) {\n' +
'      STAGE.innerHTML = "";\n' +
'      const wrap = document.createElement("div");\n' +
'      wrap.style.cssText = "position:relative; display:inline-flex; align-items:center; justify-content:center;";\n' +
'      STAGE.appendChild(wrap);\n' +
'\n' +
'      const ghostEl = document.createElement("div");\n' +
'      ghostEl.className = "text ghost-layer";\n' +
'      ghostEl.setAttribute("aria-hidden", "true");\n' +
'\n' +
'      const liveEl = document.createElement("div");\n' +
'      liveEl.className = "text";\n' +
'      liveEl.style.cssText = "position:absolute; top:0; left:0; display:flex; pointer-events:auto;";\n' +
'\n' +
'      chars = word.split("").map(ch => {\n' +
'        const gc = ch === " " ? "\u00a0" : ch;\n' +
'        const g = document.createElement("span");\n' +
'        g.className = "char";\n' +
'        g.textContent = gc;\n' +
'        ghostEl.appendChild(g);\n' +
'\n' +
'        const l = document.createElement("span");\n' +
'        l.className = "char";\n' +
'        l.textContent = gc;\n' +
'        liveEl.appendChild(l);\n' +
'        return l;\n' +
'      });\n' +
'\n' +
'      wrap.appendChild(ghostEl);\n' +
'      wrap.appendChild(liveEl);\n' +
'    }\n' +
'\n' +
'    setupWord(WORDS[0]);\n' +
'\n' +
'    // Scroll / Wheel interaction\n' +
'    window.addEventListener("wheel", (e) => {\n' +
'      scrollBoost = Math.max(-50, Math.min(50, scrollBoost + e.deltaY * 0.15));\n' +
'    }, { passive: true });\n' +
'\n' +
'    // Mouse parallax tilt\n' +
'    window.addEventListener("pointermove", (e) => {\n' +
'      mouseX = (e.clientX / window.innerWidth - 0.5) * 30;\n' +
'      mouseY = (e.clientY / window.innerHeight - 0.5) * 20;\n' +
'    });\n' +
'\n' +
'    let frame = 0;\n' +
'    const cycleLength = 160;\n' +
'\n' +
'    function tick() {\n' +
'      frame += SPEED_SCALE;\n' +
'      scrollBoost *= 0.94; // smooth damping\n' +
'\n' +
'      const N = chars.length;\n' +
'      const center = (N - 1) / 2;\n' +
'\n' +
'      // Parallax on stage\n' +
'      STAGE_WRAP.style.transform = "rotateX(" + (-mouseY) + "deg) rotateY(" + mouseX + "deg)";\n' +
'\n' +
'      chars.forEach((ch, i) => {\n' +
'        const p = cyc(frame, i * 6, 36, 40, 36, 48);\n' +
'        const dist = Math.abs(i - center) * 34 + 24 + Math.abs(scrollBoost);\n' +
'        const dir = i % 2 === 0 ? -1 : 1;\n' +
'\n' +
'        let transformStr = "";\n' +
'        if (FAN_STYLE === "fan-arc") {\n' +
'          const rotAngle = dir * (dist / 22) * p * 6;\n' +
'          transformStr = "translateY(" + (dir * dist * p) + "px) rotate(" + rotAngle + "deg) scale(" + (1 + p * 0.12) + ")";\n' +
'        } else if (FAN_STYLE === "wave-pulse") {\n' +
'          const wave = Math.sin(frame * 0.08 + i * 0.7) * 45 * p;\n' +
'          transformStr = "translateY(" + wave + "px) scale(" + (1 + p * 0.2) + ")";\n' +
'        } else {\n' +
'          const zDist = Math.sin(p * Math.PI) * 80;\n' +
'          transformStr = "translateY(" + (dir * dist * p * 0.8) + "px) translateZ(" + zDist + "px) rotateX(" + (dir * p * 25) + "deg)";\n' +
'        }\n' +
'\n' +
'        ch.style.transform = transformStr;\n' +
'        ch.style.opacity = (0.2 + p * 0.8).toFixed(2);\n' +
'      });\n' +
'\n' +
'      // Auto cycle through words when a full wave concludes\n' +
'      if (WORDS.length > 1 && frame > cycleLength) {\n' +
'        frame = 0;\n' +
'        wordIndex = (wordIndex + 1) % WORDS.length;\n' +
'        setupWord(WORDS[wordIndex]);\n' +
'      }\n' +
'\n' +
'      requestAnimationFrame(tick);\n' +
'    }\n' +
'\n' +
'    requestAnimationFrame(tick);\n' +
'  <\/script>\n' +
'</body>\n' +
'</html>';
  }
};

// --------------------------------------------------------
// 2. Two Sides — Dual Split SVG Mask & 3D Frame
// Author: Chris Bolson (@cbolson) (https://codepen.io/editor/cbolson/pen/019faec6-938b-73ab-bd3e-71ba9d1d053e)
// Enhanced with Dual-Text (Left/Right), Decorative Framing & Interactive Tilt
// --------------------------------------------------------
window.EffectRegistry['cbolson-two-sides'] = {
  id: 'cbolson-two-sides',
  title: "Two Sides — Dual Split 3D Frames",
  category: 'Css 3D Effect',
  tech: 'SVG Dual Split & 3D Perspective',
  github: 'https://codepen.io/editor/cbolson/pen/019faec6-938b-73ab-bd3e-71ba9d1d053e',
  description: "Gesplitste dual-layer 3D presentatie met afzonderlijke tekst per zijde, decoratieve kaders en 3D muistilt.",
  defaultSettings: {
    fontFamily: "'Montserrat', sans-serif",
    frontText: "SPACE",
    backText: "FX 2.0",
    frameStyle: "corners",
    primaryColor: "#00d2ff",
    accentColor: "#ff2d55",
    bgColor: "#08080c"
  },
  controls: [
    {
      type: "select", key: "fontFamily", label: "Lettertype (Font)",
      options: [
        { value: "'Montserrat', sans-serif", label: "Montserrat (Bold Sans)" },
        { value: "'Orbitron', sans-serif", label: "Orbitron (Sci-Fi)" },
        { value: "'Cinzel', serif", label: "Cinzel (Serif Classic)" },
        { value: "'Fira Code', monospace", label: "Fira Code (Code)" },
        { value: "'Space Grotesk', sans-serif", label: "Space Grotesk" }
      ]
    },
    { type: "text", key: "frontText", label: "Tekst Zijde 1 (Links/Voor)" },
    { type: "text", key: "backText", label: "Tekst Zijde 2 (Rechts/Achter)" },
    {
      type: "select", key: "frameStyle", label: "Kader & Frame Stijl",
      options: [
        { value: "corners", label: "Cyberpunk Hoekaccenten (Notches)" },
        { value: "double", label: "Dubbele Neon Rand (Layered Glow)" },
        { value: "glass", label: "Frosted Glassmorphism Binnenrand" }
      ]
    },
    { type: "color", key: "primaryColor", label: "Kleur Zijde 1 (Neon A)" },
    { type: "color", key: "accentColor", label: "Kleur Zijde 2 (Neon B)" },
    { type: "color", key: "bgColor", label: "Achtergrondkleur" }
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
    this.iframe.setAttribute('title', "Two Sides — Dual Split 3D Frames");

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
    if (this.container) this.container.innerHTML = '';
    this.iframe = null;
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    const fText = s.frontText || "SPACE";
    const bText = s.backText || "FX 2.0";
    const fStyle = s.frameStyle || "corners";

    return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>Two Sides 3D</title>\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
'  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
'  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Fira+Code:wght@700&family=Montserrat:wght@800&family=Orbitron:wght@800;900&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">\n' +
'  <style>\n' +
'    * { box-sizing: border-box; margin: 0; padding: 0; }\n' +
'    body {\n' +
'      min-height: 100vh;\n' +
'      background: ' + (s.bgColor || '#08080c') + ';\n' +
'      display: grid;\n' +
'      place-content: center;\n' +
'      perspective: 900px;\n' +
'      overflow: hidden;\n' +
'      font-family: ' + (s.fontFamily || "'Montserrat', sans-serif") + ';\n' +
'    }\n' +
'    .card-container {\n' +
'      width: min(90vw, 460px);\n' +
'      height: 280px;\n' +
'      position: relative;\n' +
'      transform-style: preserve-3d;\n' +
'      transition: transform 0.12s ease-out;\n' +
'    }\n' +
'    .spin-rig {\n' +
'      width: 100%;\n' +
'      height: 100%;\n' +
'      position: absolute;\n' +
'      transform-style: preserve-3d;\n' +
'      animation: autoSpin 14s infinite linear;\n' +
'    }\n' +
'    @keyframes autoSpin {\n' +
'      0% { transform: rotateY(0deg); }\n' +
'      100% { transform: rotateY(360deg); }\n' +
'    }\n' +
'    .side {\n' +
'      position: absolute;\n' +
'      inset: 0;\n' +
'      border-radius: 18px;\n' +
'      display: flex;\n' +
'      flex-direction: column;\n' +
'      align-items: center;\n' +
'      justify-content: center;\n' +
'      backface-visibility: hidden;\n' +
'      box-shadow: 0 20px 50px rgba(0,0,0,0.6);\n' +
'      overflow: hidden;\n' +
'    }\n' +
'    .side.front {\n' +
'      background: linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(30,41,59,0.95) 100%);\n' +
'      border: 2px solid ' + (s.primaryColor || '#00d2ff') + ';\n' +
'      color: ' + (s.primaryColor || '#00d2ff') + ';\n' +
'      transform: translateZ(40px);\n' +
'    }\n' +
'    .side.back {\n' +
'      background: linear-gradient(135deg, rgba(30,10,20,0.92) 0%, rgba(20,5,15,0.95) 100%);\n' +
'      border: 2px solid ' + (s.accentColor || '#ff2d55') + ';\n' +
'      color: ' + (s.accentColor || '#ff2d55') + ';\n' +
'      transform: rotateY(180deg) translateZ(40px);\n' +
'    }\n' +
'    /* Decorative Frame Styles */\n' +
'    .frame-corners::before, .frame-corners::after {\n' +
'      content: "";\n' +
'      position: absolute;\n' +
'      width: 24px;\n' +
'      height: 24px;\n' +
'      border: 3px solid currentColor;\n' +
'      pointer-events: none;\n' +
'    }\n' +
'    .frame-corners::before { top: 12px; left: 12px; border-right: none; border-bottom: none; }\n' +
'    .frame-corners::after { bottom: 12px; right: 12px; border-left: none; border-top: none; }\n' +
'    .frame-double {\n' +
'      outline: 2px dashed currentColor;\n' +
'      outline-offset: -10px;\n' +
'    }\n' +
'    .frame-glass {\n' +
'      backdrop-filter: blur(12px);\n' +
'      box-shadow: inset 0 0 25px rgba(255,255,255,0.1), 0 0 30px currentColor;\n' +
'    }\n' +
'    .text-title {\n' +
'      font-size: clamp(2.4rem, 6vw, 3.8rem);\n' +
'      font-weight: 800;\n' +
'      letter-spacing: 0.08em;\n' +
'      text-transform: uppercase;\n' +
'      text-shadow: 0 0 20px currentColor, 0 0 40px currentColor;\n' +
'    }\n' +
'    .text-sub {\n' +
'      font-size: 0.85rem;\n' +
'      letter-spacing: 0.25em;\n' +
'      opacity: 0.75;\n' +
'      margin-top: 8px;\n' +
'      text-transform: uppercase;\n' +
'    }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div class="card-container" id="cardContainer">\n' +
'    <div class="spin-rig">\n' +
'      <div class="side front frame-' + fStyle + '">\n' +
'        <div class="text-title">' + fText + '</div>\n' +
'        <div class="text-sub">SIDE A • PRIMARY</div>\n' +
'      </div>\n' +
'      <div class="side back frame-' + fStyle + '">\n' +
'        <div class="text-title">' + bText + '</div>\n' +
'        <div class="text-sub">SIDE B • CONTRAST</div>\n' +
'      </div>\n' +
'    </div>\n' +
'  </div>\n' +
'  <script>\n' +
'    const container = document.getElementById("cardContainer");\n' +
'    window.addEventListener("pointermove", (e) => {\n' +
'      const x = (e.clientX / window.innerWidth - 0.5) * 40;\n' +
'      const y = (e.clientY / window.innerHeight - 0.5) * -30;\n' +
'      container.style.transform = "rotateX(" + y + "deg) rotateZ(" + (x * 0.2) + "deg)";\n' +
'    });\n' +
'  <\/script>\n' +
'</body>\n' +
'</html>';
  }
};

// --------------------------------------------------------
// 3. Melty Liquid SVG Text Filter
// Author: Luke Murphy (@lurkmoophy) (https://codepen.io/editor/lurkmoophy/pen/019facf7-7d5c-7a2d-8e36-f50cf065a874)
// Fixed: Slider value reactivity & continuous organic dripping melt loop
// --------------------------------------------------------
window.EffectRegistry['lurkmoophy-melty-text'] = {
  id: 'lurkmoophy-melty-text',
  title: "Melty Liquid SVG Text Filter",
  category: 'Special / Experimental',
  tech: 'SVG feTurbulence & feDisplacementMap',
  github: 'https://codepen.io/editor/lurkmoophy/pen/019facf7-7d5c-7a2d-8e36-f50cf065a874',
  description: "Vloeiende smeltende en druipende vloeistoftekst via dynamische SVG displacement- en turbulentiefilters.",
  defaultSettings: {
    fontFamily: "'Archivo Black', sans-serif",
    customText: "IT'S TOO HOT",
    meltIntensity: 25,
    textColor: "#e84005",
    bgColor: "#160a06"
  },
  controls: [
    {
      type: "select", key: "fontFamily", label: "Lettertype (Font)",
      options: [
        { value: "'Archivo Black', sans-serif", label: "Archivo Black (Ultra Heavy)" },
        { value: "'Montserrat', sans-serif", label: "Montserrat (Geometric)" },
        { value: "'Orbitron', sans-serif", label: "Orbitron (Sci-Fi)" },
        { value: "'Cinzel', serif", label: "Cinzel (Serif)" },
        { value: "'Great Vibes', cursive", label: "Great Vibes (Flowing)" }
      ]
    },
    { type: "text", key: "customText", label: "Smelt Tekst" },
    {
      type: "range", key: "meltIntensity", label: "Druip / Smeltkracht",
      min: 5, max: 60, step: 1
    },
    { type: "color", key: "textColor", label: "Tekstkleur" },
    { type: "color", key: "bgColor", label: "Achtergrond" }
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
    this.iframe.setAttribute('title', "Melty Liquid SVG Text Filter");

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
    if (this.container) this.container.innerHTML = '';
    this.iframe = null;
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    const textVal = s.customText || "IT'S TOO HOT";
    const intensity = Number(s.meltIntensity || 25);

    return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>Melty Liquid Text</title>\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
'  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
'  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&display=swap" rel="stylesheet">\n' +
'  <style>\n' +
'    * { box-sizing: border-box; margin: 0; padding: 0; }\n' +
'    body {\n' +
'      min-height: 100vh;\n' +
'      display: grid;\n' +
'      place-items: center;\n' +
'      background: ' + (s.bgColor || '#160a06') + ';\n' +
'      overflow: hidden;\n' +
'      user-select: none;\n' +
'    }\n' +
'    .melt-wrap {\n' +
'      display: grid;\n' +
'      font-size: clamp(2.8rem, 11vw, 8.5rem);\n' +
'      text-align: center;\n' +
'      text-transform: uppercase;\n' +
'      padding: 3rem 2rem 10rem;\n' +
'      cursor: pointer;\n' +
'      --line: 50%;\n' +
'      --feather: ' + intensity + '%;\n' +
'    }\n' +
'    .melt-squish {\n' +
'      display: grid;\n' +
'      transform-origin: 50% 100%;\n' +
'      will-change: transform;\n' +
'    }\n' +
'    .melt-text {\n' +
'      grid-area: 1 / 1;\n' +
'      font-family: ' + (s.fontFamily || "'Archivo Black', sans-serif") + ';\n' +
'      font-size: 1em;\n' +
'      line-height: 1;\n' +
'      letter-spacing: -0.05em;\n' +
'      color: ' + (s.textColor || '#e84005') + ';\n' +
'    }\n' +
'    .melt-crisp {\n' +
'      mask-image: linear-gradient(to bottom, transparent 0%, transparent var(--line), black calc(var(--line) + var(--feather)));\n' +
'      -webkit-mask-image: linear-gradient(to bottom, transparent 0%, transparent var(--line), black calc(var(--line) + var(--feather)));\n' +
'    }\n' +
'    .melt-ice {\n' +
'      filter: url(#melt) drop-shadow(0 0 35px ' + (s.textColor || '#e84005') + '66);\n' +
'      transform-origin: 50% 0%;\n' +
'      will-change: transform;\n' +
'      mask-image: linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.95) var(--line), transparent calc(var(--line) + var(--feather)));\n' +
'      -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.95) var(--line), transparent calc(var(--line) + var(--feather)));\n' +
'    }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute;">\n' +
'    <filter id="melt" x="-30%" y="-40%" width="160%" height="340%" color-interpolation-filters="sRGB">\n' +
'      <feTurbulence id="melt-noise" type="fractalNoise" baseFrequency="0.025 0.008" numOctaves="2" seed="4" result="noise"/>\n' +
'      <feColorMatrix in="noise" type="matrix"\n' +
'        values="0.3 0 0 0 0.35\n' +
'                0   3 0 0 -0.6\n' +
'                0   0 1 0 0\n' +
'                0   0 0 1 0" result="drip-noise"/>\n' +
'      <feDisplacementMap id="melt-disp" in="SourceGraphic" in2="drip-noise" scale="' + (intensity * 1.2) + '" xChannelSelector="R" yChannelSelector="G" result="displaced"/>\n' +
'      <feGaussianBlur id="melt-blur" in="displaced" stdDeviation="' + (intensity * 0.35) + '" result="smeared"/>\n' +
'      <feColorMatrix id="melt-goo" in="smeared" type="matrix"\n' +
'        values="1 0 0 0 0\n' +
'                0 1 0 0 0\n' +
'                0 0 1 0 0\n' +
'                0 0 0 18 -7"/>\n' +
'    </filter>\n' +
'  </svg>\n' +
'\n' +
'  <main class="scene">\n' +
'    <div class="melt-wrap" id="wrap">\n' +
'      <div class="melt-squish" id="squish">\n' +
'        <h1 class="melt-text melt-crisp">' + textVal + '</h1>\n' +
'        <h1 class="melt-text melt-ice" id="ice" aria-hidden="true">' + textVal + '</h1>\n' +
'      </div>\n' +
'    </div>\n' +
'  </main>\n' +
'\n' +
'  <script>\n' +
'    console.log("[MeltyText] Initialized with intensity:", ' + intensity + ');\n' +
'    const wrap = document.getElementById("wrap");\n' +
'    const ice = document.getElementById("ice");\n' +
'    const squish = document.getElementById("squish");\n' +
'    const disp = document.getElementById("melt-disp");\n' +
'    const blur = document.getElementById("melt-blur");\n' +
'    const noise = document.getElementById("melt-noise");\n' +
'    const goo = document.getElementById("melt-goo");\n' +
'\n' +
'    const INTENSITY = ' + intensity + ';\n' +
'    const MAX_SCALE = 12 + INTENSITY * 0.9;\n' +
'    const MAX_BLUR = 3 + INTENSITY * 0.38;\n' +
'    const ICE_STRETCH = 0.2 + (INTENSITY / 60) * 0.6;\n' +
'\n' +
'    let hoverBoost = 0;\n' +
'    wrap.addEventListener("pointerenter", () => { hoverBoost = 0.4; });\n' +
'    wrap.addEventListener("pointerleave", () => { hoverBoost = 0.0; });\n' +
'\n' +
'    let time = 0;\n' +
'    function tick() {\n' +
'      time += 0.016;\n' +
'      // Organic cyclic breathing melt that is ALWAYS visually active\n' +
'      const cycle = 0.65 + 0.35 * Math.sin(time * 1.5) + hoverBoost;\n' +
'      const currentMelt = Math.min(1.2, cycle);\n' +
'\n' +
'      // Writhing hot surface ripples\n' +
'      const wobble = Math.sin(time * 2.2) * 0.008;\n' +
'      noise.setAttribute("baseFrequency", (0.025 + wobble).toFixed(4) + " 0.008");\n' +
'\n' +
'      const scaleVal = (MAX_SCALE * currentMelt).toFixed(1);\n' +
'      const blurVal = (MAX_BLUR * currentMelt).toFixed(1);\n' +
'      disp.setAttribute("scale", scaleVal);\n' +
'      blur.setAttribute("stdDeviation", blurVal);\n' +
'\n' +
'      // Elongate dripping liquefied layer\n' +
'      ice.style.transform = "scaleY(" + (1 + ICE_STRETCH * currentMelt).toFixed(3) + ")";\n' +
'      squish.style.transform = "scaleY(" + (1 - 0.15 * currentMelt).toFixed(3) + ")";\n' +
'\n' +
'      wrap.style.setProperty("--line", (currentMelt * 65).toFixed(1) + "%");\n' +
'      wrap.style.setProperty("--feather", (INTENSITY + Math.sin(time) * 5).toFixed(1) + "%");\n' +
'\n' +
'      requestAnimationFrame(tick);\n' +
'    }\n' +
'    requestAnimationFrame(tick);\n' +
'  <\/script>\n' +
'</body>\n' +
'</html>';
  }
};

// --------------------------------------------------------
// 4. Colorful Spiky Sphere 3D (Pure CSS)
// Author: Amit Sheen (@amit_sheen) (https://codepen.io/editor/amit_sheen/pen/019f95cf-c90e-761d-8b37-e0e823a8d611)
// Enhanced with Editable 3D Holographic Typography Overlay
// --------------------------------------------------------
window.EffectRegistry['amit-spiky-sphere'] = {
  id: 'amit-spiky-sphere',
  title: "Colorful Spiky Sphere 3D (Pure CSS)",
  category: 'Css 3D Effect',
  tech: 'Pure CSS 3D Transforms & Interactive Typography',
  github: 'https://codepen.io/editor/amit_sheen/pen/019f95cf-c90e-761d-8b37-e0e823a8d611',
  description: "Geometrische pulserende stekelbol volledig opgebouwd uit pure CSS 3D elementen met interactieve 3D typografie overlay.",
  defaultSettings: {
    customText: "SUPERDUPER FX 3D",
    fontFamily: "'Orbitron', sans-serif",
    speed: 1.0,
    scale: 1.0,
    spikeColor: "#00ffff",
    textColor: "#ffffff",
    bgColor: "#050508"
  },
  controls: [
    { type: "text", key: "customText", label: "Tekst op Sphere (Klikbaar/Typbaar)" },
    {
      type: "select", key: "fontFamily", label: "Lettertype (Font)",
      options: [
        { value: "'Orbitron', sans-serif", label: "Orbitron (Futuristic)" },
        { value: "'Montserrat', sans-serif", label: "Montserrat (Bold)" },
        { value: "'Fira Code', monospace", label: "Fira Code (Cyber)" },
        { value: "'Cinzel', serif", label: "Cinzel (Classic)" }
      ]
    },
    { type: "range", key: "speed", label: "Rotatiesnelheid", min: 0.2, max: 3.0, step: 0.1 },
    { type: "range", key: "scale", label: "Grootte Schaal", min: 0.5, max: 2.0, step: 0.1 },
    { type: "color", key: "spikeColor", label: "Stekel Glow Tint" },
    { type: "color", key: "textColor", label: "Tekstkleur" },
    { type: "color", key: "bgColor", label: "Achtergrond" }
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
    this.iframe.setAttribute('title', "Colorful Spiky Sphere 3D (Pure CSS)");

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
    if (this.container) this.container.innerHTML = '';
    this.iframe = null;
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    const textVal = s.customText || "SUPERDUPER FX 3D";
    const speedVal = (24 / (s.speed || 1.0)).toFixed(1);

    return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>Colorful Spiky Sphere 3D</title>\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
'  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
'  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Fira+Code:wght@700&family=Montserrat:wght@800&family=Orbitron:wght@800;900&display=swap" rel="stylesheet">\n' +
'  <style>\n' +
'    * { margin: 0; padding: 0; box-sizing: border-box; }\n' +
'    body {\n' +
'      background-color: ' + (s.bgColor || '#050508') + ';\n' +
'      color: #fff;\n' +
'      min-height: 100vh;\n' +
'      display: grid;\n' +
'      place-items: center;\n' +
'      perspective: 750px;\n' +
'      overflow: hidden;\n' +
'      font-family: ' + (s.fontFamily || "'Orbitron', sans-serif") + ';\n' +
'    }\n' +
'    body * { transform-style: preserve-3d; }\n' +
'    .scene-wrap {\n' +
'      transform: scale(' + (s.scale || 1.0) + ');\n' +
'      position: relative;\n' +
'    }\n' +
'    .scene {\n' +
'      position: relative;\n' +
'      animation: scene ' + speedVal + 's infinite linear;\n' +
'    }\n' +
'    .scene * { position: absolute; }\n' +
'    @keyframes scene {\n' +
'      from { transform: rotateX(0deg) rotateZ(0deg); }\n' +
'      to { transform: rotateX(360deg) rotateZ(360deg); }\n' +
'    }\n' +
'    .spike {\n' +
'      inset: -3em;\n' +
'      animation: spike calc(sin(var(--s) * 137.5deg) * 0.5s + 2s) calc(sin(var(--s) * 222.5deg) * 6s - 6s) infinite ease-in-out alternate;\n' +
'    }\n' +
'    .spike:has(i:nth-child(6)) {\n' +
'      --side-angle-z: 60deg;\n' +
'      --side-angle-x: -49deg;\n' +
'      --bottom-size: 2.6em;\n' +
'    }\n' +
'    .spike {\n' +
'      --color1: hsl(calc(var(--s) * 11.25) 100% 12%);\n' +
'      --color2: hsl(calc(var(--s) * 11.25) 100% 6%);\n' +
'      --border: ' + (s.spikeColor || '#00ffff') + ';\n' +
'    }\n' +
'    .spike i {\n' +
'      left: 50%; bottom: 50%;\n' +
'      width: 3em; height: 4em;\n' +
'      transform-origin: bottom;\n' +
'      transform: translateX(-50%) rotateZ(calc(var(--i) * var(--side-angle-z, 72deg))) translateY(var(--bottom-size, 2.1em)) rotateX(var(--side-angle-x, -58deg));\n' +
'      opacity: 0.92;\n' +
'      background-image: linear-gradient(0deg, var(--border) 1px, transparent 0), conic-gradient(from 159deg at 50% 3px, var(--color1), var(--color2) 42deg, transparent 0), conic-gradient(from 159deg at top, var(--border) 42deg, transparent 0);\n' +
'    }\n' +
'    .spike.a { --transform: translateZ(7.5em) rotateZ(37.5deg); }\n' +
'    .spike.b { --transform: rotate(calc(var(--s) * 72deg)) rotateX(37.5deg) translateZ(7.3em); }\n' +
'    .spike.c { --transform: rotate(calc(var(--s) * 72deg + 36deg)) rotateX(64deg) translateZ(7.5em) rotateZ(180deg); }\n' +
'    .spike.d { --transform: rotate(calc(var(--s) * 72deg)) rotateX(79deg) translateZ(7.3em); }\n' +
'    .spike.e { --transform: rotate(calc(var(--s) * 72deg + 36deg)) rotateX(101deg) translateZ(7.3em); }\n' +
'    .spike.f { --transform: rotate(calc(var(--s) * 72deg)) rotateX(116deg) translateZ(7.5em); }\n' +
'    .spike.g { --transform: rotate(calc(var(--s) * 72deg + 36deg)) rotateX(142.5deg) translateZ(7.3em); }\n' +
'    .spike.h { --transform: rotateX(180deg) translateZ(7.5em) rotateZ(37.5deg); }\n' +
'    @keyframes spike {\n' +
'      from { transform: var(--transform) scaleZ(0.25); }\n' +
'      to { transform: var(--transform) scaleZ(2.5); }\n' +
'    }\n' +
'    /* 3D Holographic Typography Overlay */\n' +
'    .holo-text-ring {\n' +
'      position: absolute;\n' +
'      top: 50%; left: 50%;\n' +
'      transform: translate(-50%, -50%) translateZ(12em);\n' +
'      background: rgba(10, 15, 30, 0.75);\n' +
'      backdrop-filter: blur(8px);\n' +
'      border: 1.5px solid ' + (s.spikeColor || '#00ffff') + ';\n' +
'      box-shadow: 0 0 25px ' + (s.spikeColor || '#00ffff') + '66;\n' +
'      padding: 12px 28px;\n' +
'      border-radius: 999px;\n' +
'      font-size: 1.15rem;\n' +
'      font-weight: 800;\n' +
'      color: ' + (s.textColor || '#ffffff') + ';\n' +
'      white-space: nowrap;\n' +
'      letter-spacing: 0.15em;\n' +
'      text-transform: uppercase;\n' +
'      cursor: text;\n' +
'      outline: none;\n' +
'      z-index: 100;\n' +
'    }\n' +
'    .holo-text-ring:focus {\n' +
'      border-color: #ffffff;\n' +
'      box-shadow: 0 0 35px #ffffff, 0 0 50px ' + (s.spikeColor || '#00ffff') + ';\n' +
'    }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div class="scene-wrap">\n' +
'    <div class="scene">\n' +
'      <div class="spike a" style="--s: 0;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></div>\n' +
'      <div class="spike b" style="--s: 1;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike b" style="--s: 2;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike b" style="--s: 3;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike b" style="--s: 4;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike b" style="--s: 5;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike c" style="--s: 6;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></div>\n' +
'      <div class="spike c" style="--s: 7;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></div>\n' +
'      <div class="spike c" style="--s: 8;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></div>\n' +
'      <div class="spike c" style="--s: 9;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></div>\n' +
'      <div class="spike c" style="--s: 10;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></div>\n' +
'      <div class="spike d" style="--s: 11;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike d" style="--s: 12;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike d" style="--s: 13;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike d" style="--s: 14;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike d" style="--s: 15;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike e" style="--s: 16;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike e" style="--s: 17;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike e" style="--s: 18;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike e" style="--s: 19;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike e" style="--s: 20;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike f" style="--s: 21;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></div>\n' +
'      <div class="spike f" style="--s: 22;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></div>\n' +
'      <div class="spike f" style="--s: 23;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></div>\n' +
'      <div class="spike f" style="--s: 24;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></div>\n' +
'      <div class="spike f" style="--s: 25;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></div>\n' +
'      <div class="spike g" style="--s: 26;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike g" style="--s: 27;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike g" style="--s: 28;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike g" style="--s: 29;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike g" style="--s: 30;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></div>\n' +
'      <div class="spike h" style="--s: 31;"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></div>\n' +
'\n' +
'      <div class="holo-text-ring" contenteditable="true" spellcheck="false" title="Klik om direct tekst te typen">' + textVal + '</div>\n' +
'    </div>\n' +
'  </div>\n' +
'</body>\n' +
'</html>';
  }
};
// --------------------------------------------------------
// 5. Customizable Wave Text Path (SVG Motion)
// Author: BlackStar1991 (@BlackStar1991) (https://codepen.io/editor/BlackStar1991/pen/019fb71f-d611-798d-92e8-a877f4ebd6ff)
// --------------------------------------------------------
window.EffectRegistry['blackstar-wave-text'] = {
  id: 'blackstar-wave-text',
  title: "Customizable Wave Text Path (SVG Motion)",
  category: 'SVG Animations',
  tech: 'SVG TextPath & Math Curves',
  github: 'https://codepen.io/editor/BlackStar1991/pen/019fb71f-d611-798d-92e8-a877f4ebd6ff',
  description: "Golvende tekst die dynamisch over een aanpasbaar sinusoïdaal SVG-pad beweegt met configureerbare frequentie.",
  defaultSettings: {
  "fontFamily": "'Space Grotesk', sans-serif",
  "customText": "SUPERDUPER FX • WAVE TEXT PATH • CREATIVE MOTION • ",
  "speed": 1,
  "fontSize": 24,
  "textColor": "#ffffff",
  "bgColor": "#07070a"
},
  controls: [
  {
    "type": "select",
    "key": "fontFamily",
    "label": "Lettertype (Font)",
    "options": [
      {
        "value": "'Space Grotesk', sans-serif",
        "label": "Space Grotesk (Modern)"
      },
      {
        "value": "'Cinzel', serif",
        "label": "Cinzel (Classical Serif)"
      },
      {
        "value": "'Montserrat', sans-serif",
        "label": "Montserrat (Geometric)"
      },
      {
        "value": "'Fira Code', monospace",
        "label": "Fira Code (Monospace)"
      },
      {
        "value": "'Orbitron', sans-serif",
        "label": "Orbitron (Sci-Fi)"
      },
      {
        "value": "'Pacifico', cursive",
        "label": "Pacifico (Retro Script)"
      }
    ]
  },
  {
    "type": "text",
    "key": "customText",
    "label": "Loopende Golftekst"
  },
  {
    "type": "range",
    "key": "fontSize",
    "label": "Lettergrootte (px)",
    "min": 14,
    "max": 48,
    "step": 1
  },
  {
    "type": "range",
    "key": "speed",
    "label": "Golf Snelheid",
    "min": 0.2,
    "max": 3,
    "step": 0.1
  },
  {
    "type": "color",
    "key": "textColor",
    "label": "Tekstkleur"
  },
  {
    "type": "color",
    "key": "bgColor",
    "label": "Achtergrond"
  }
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
    this.iframe.setAttribute('title', "Customizable Wave Text Path (SVG Motion)");

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

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    let base = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap\" rel=\"stylesheet\">\n\n<meta property=\"og:description\" content=\"Adjust every component parameter, then copy the generated HTML into your project.\">\n<meta property=\"og:image\" content=\"https://019fb71f-d611-798d-92e8-a877f4ebd6ff.codepen.dev/.codepen/screenshots/ed84416f445518d4fee894044bbce62be5d04ce466e2d643f2075b0fc9b96d4d/1280.jpg\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<link rel=\"icon\" href=\"https://public.codepenassets.com/favicon/favicon.ico\">\n\n    <meta charset=\"UTF-8\">\n    <style>\n:root {\n  color-scheme: dark;\n  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;\n  background: #07070a;\n  color: #fff;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  min-width: 320px;\n  min-height: 100vh;\n  margin: 0;\n  background:\n    radial-gradient(circle at 20% 0%, rgb(119 77 255 / 18%), transparent 35%),\n    radial-gradient(circle at 90% 100%, rgb(0 210 255 / 14%), transparent 32%),\n    #07070a;\n}\n\nbutton,\ninput {\n  font: inherit;\n}\n\n.demo {\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  padding: 32px 20px;\n}\n\n.demo__panel {\n  width: min(1000px, 100%);\n  padding: clamp(20px, 4vw, 42px);\n  border: 1px solid rgb(255 255 255 / 12%);\n  border-radius: 28px;\n  background: rgb(16 16 22 / 84%);\n  box-shadow: 0 30px 90px rgb(0 0 0 / 45%);\n  backdrop-filter: blur(16px);\n}\n\n.demo__heading {\n  margin-bottom: 24px;\n}\n\n.demo h1,\n.demo h2 {\n  margin: 0;\n  line-height: 1.1;\n}\n\n.demo h1 {\n  font-size: clamp(28px, 5vw, 56px);\n}\n\n.demo h2 {\n  font-size: 22px;\n}\n\n.demo__description {\n  max-width: 680px;\n  margin: 14px 0 0;\n  color: #aaaaba;\n  line-height: 1.6;\n}\n\n/* Required component styles */\n.text-path {\n  position: relative;\n  width: 100%;\n  height: clamp(180px, 26vw, 260px);\n  overflow: hidden;\n  border-radius: 20px;\n  background: linear-gradient(135deg, rgb(255 255 255 / 5%), rgb(255 255 255 / 1%));\n}\n\n.text-path svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n.text-path text {\n  user-select: none;\n}\n\n/* Demo configurator styles */\n.controls {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 18px;\n  margin-top: 24px;\n}\n\n.controls__field {\n  display: grid;\n  gap: 8px;\n  min-width: 0;\n  color: #d9d9e3;\n  font-size: 14px;\n}\n\n.controls__field--wide {\n  grid-column: 1 / -1;\n}\n\n.controls input[type=\"text\"] {\n  width: 100%;\n  min-width: 0;\n  padding: 12px 14px;\n  border: 1px solid rgb(255 255 255 / 14%);\n  border-radius: 12px;\n  outline: none;\n  background: #101017;\n  color: #fff;\n}\n\n.controls input[type=\"text\"]:focus {\n  border-color: #8e76ff;\n  box-shadow: 0 0 0 3px rgb(142 118 255 / 18%);\n}\n\n.controls input[type=\"range\"] {\n  width: 100%;\n}\n\n.controls__checkbox {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  align-self: end;\n  min-height: 42px;\n}\n\n.controls__color-row {\n  display: grid;\n  grid-template-columns: 48px 1fr;\n  gap: 10px;\n}\n\n.controls input[type=\"color\"] {\n  width: 48px;\n  height: 44px;\n  padding: 3px;\n  border: 1px solid rgb(255 255 255 / 14%);\n  border-radius: 10px;\n  background: #101017;\n  cursor: pointer;\n}\n\noutput {\n  color: #a995ff;\n  font-variant-numeric: tabular-nums;\n}\n\n.code-panel {\n  margin-top: 28px;\n  padding: 20px;\n  border: 1px solid rgb(255 255 255 / 12%);\n  border-radius: 18px;\n  background: rgb(0 0 0 / 22%);\n}\n\n.code-panel__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n\n.copy-button {\n  flex: 0 0 auto;\n  padding: 11px 16px;\n  border: 0;\n  border-radius: 12px;\n  background: #8e76ff;\n  color: #fff;\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms ease, background-color 160ms ease;\n}\n\n.copy-button:hover {\n  background: #a18eff;\n  transform: translateY(-1px);\n}\n\n.copy-button:active {\n  transform: translateY(0);\n}\n\n.code-panel__code {\n  max-height: 390px;\n  margin: 0;\n  padding: 18px;\n  overflow: auto;\n  border-radius: 14px;\n  background: #08080c;\n  color: #e7e3ff;\n  font: 13px/1.65 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;\n  white-space: pre;\n}\n\n.copy-status {\n  min-height: 1.4em;\n  margin: 10px 0 0;\n  color: #aaaaba;\n  font-size: 13px;\n}\n\n@media (max-width: 760px) {\n  .controls {\n    grid-template-columns: 1fr;\n  }\n\n  .controls__field--wide {\n    grid-column: auto;\n  }\n\n  .code-panel__header {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .copy-button {\n    width: 100%;\n  }\n}\n\n</style>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Customizable Wave Text Path</title>\n  </head>\n  <body>\n<main class=\"demo\">\n    <section class=\"demo__panel\" aria-labelledby=\"demo-title\">\n      <div class=\"demo__heading\">\n        <h1 id=\"demo-title\">Text Path Configurator</h1>\n        <p class=\"demo__description\">\n          Adjust every component parameter, then copy the generated HTML into your project.\n        </p>\n      </div>\n\n      <div\n        class=\"text-path\"\n        data-preview\n        data-text-path\n        data-text=\"TEXT PATH\"\n        data-separator=\"•\"\n        data-gap=\"2\"\n        data-speed=\"30\"\n        data-reversed=\"true\"\n        data-wave-frequency=\"3\"\n        data-wave-height=\"100\"\n        data-text-color=\"#ffffff\"\n        data-font-size=\"30\"\n        data-letter-spacing=\"1\"\n      ></div>\n\n      <form class=\"controls\" data-controls>\n        <label class=\"controls__field controls__field--wide\">\n          <span>Text</span>\n          <input name=\"text\" type=\"text\" value=\"TEXT PATH\">\n        </label>\n\n        <label class=\"controls__field\">\n          <span>Separator</span>\n          <input name=\"separator\" type=\"text\" value=\"•\" maxlength=\"20\">\n        </label>\n\n        <label class=\"controls__field\">\n          <span>Gap <output data-output=\"gap\">2</output></span>\n          <input name=\"gap\" type=\"range\" min=\"0\" max=\"20\" step=\"1\" value=\"2\">\n        </label>\n\n        <label class=\"controls__field\">\n          <span>Speed <output data-output=\"speed\">30</output></span>\n          <input name=\"speed\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" value=\"30\">\n        </label>\n\n        <label class=\"controls__field\">\n          <span>Wave frequency <output data-output=\"waveFrequency\">3</output></span>\n          <input name=\"waveFrequency\" type=\"range\" min=\"1\" max=\"10\" step=\"1\" value=\"3\">\n        </label>\n\n        <label class=\"controls__field\">\n          <span>Wave height <output data-output=\"waveHeight\">100</output> px</span>\n          <input name=\"waveHeight\" type=\"range\" min=\"0\" max=\"180\" step=\"1\" value=\"100\">\n        </label>\n\n        <label class=\"controls__field\">\n          <span>Text color</span>\n          <div class=\"controls__color-row\">\n            <input name=\"textColor\" type=\"color\" value=\"#ffffff\" aria-label=\"Text color picker\">\n            <input name=\"textColorText\" type=\"text\" value=\"#ffffff\" pattern=\"^#[0-9a-fA-F]{6}$\" aria-label=\"Text color hexadecimal value\">\n          </div>\n        </label>\n\n        <label class=\"controls__field\">\n          <span>Font size <output data-output=\"fontSize\">30</output> px</span>\n          <input name=\"fontSize\" type=\"range\" min=\"8\" max=\"96\" step=\"1\" value=\"30\">\n        </label>\n\n        <label class=\"controls__field\">\n          <span>Letter spacing <output data-output=\"letterSpacing\">1</output> px</span>\n          <input name=\"letterSpacing\" type=\"range\" min=\"-3\" max=\"20\" step=\"0.5\" value=\"1\">\n        </label>\n\n        <label class=\"controls__field controls__checkbox\">\n          <input name=\"reversed\" type=\"checkbox\" checked>\n          <span>Reverse direction</span>\n        </label>\n      </form>\n\n      <section class=\"code-panel\" aria-labelledby=\"code-title\">\n        <div class=\"code-panel__header\">\n          <div>\n            <p class=\"demo__eyebrow\">Generated component</p>\n            <h2 id=\"code-title\">HTML markup</h2>\n          </div>\n          <button class=\"copy-button\" type=\"button\" data-copy-button>\n            Copy HTML\n          </button>\n        </div>\n\n        <pre class=\"code-panel__code\"><code data-code-output></code></pre>\n        <p class=\"copy-status\" data-copy-status aria-live=\"polite\"></p>\n      </section>\n    </section>\n  </main>\n  <script>\n(() => {\n  \"use strict\";\n\n  const SVG_NS = \"http://www.w3.org/2000/svg\";\n  const instances = new WeakMap();\n  let instanceCounter = 0;\n\n  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));\n\n  const toNumber = (value, fallback) => {\n    const parsed = Number.parseFloat(value);\n    return Number.isFinite(parsed) ? parsed : fallback;\n  };\n\n  const toBoolean = (value, fallback = false) => {\n    if (typeof value === \"boolean\") return value;\n    if (value == null) return fallback;\n    return String(value).toLowerCase() === \"true\";\n  };\n\n  class TextPathMarquee {\n    constructor(element, options = {}) {\n      if (!(element instanceof HTMLElement)) {\n        throw new TypeError(\"TextPathMarquee expects an HTML element.\");\n      }\n\n      this.element = element;\n      this.id = `text-path-${++instanceCounter}`;\n      this.options = this.readOptions(options);\n      this.size = { width: 800, height: 200 };\n      this.unitWidth = 0;\n      this.offset = 0;\n      this.lastTime = null;\n      this.animationFrame = 0;\n      this.resizeObserver = null;\n      this.handleWindowResize = null;\n\n      this.build();\n      this.measureAndRender(true);\n      this.observeResize();\n      this.start();\n    }\n\n    readOptions(overrides = {}) {\n      const data = this.element.dataset;\n\n      return {\n        text: overrides.text ?? data.text ?? \"TEXT PATH\",\n        separator: overrides.separator ?? data.separator ?? \"•\",\n        gap: toNumber(overrides.gap ?? data.gap, 2),\n        speed: toNumber(overrides.speed ?? data.speed, 30),\n        reversed: toBoolean(overrides.reversed ?? data.reversed, true),\n        waveFrequency: toNumber(overrides.waveFrequency ?? data.waveFrequency, 3),\n        waveHeight: toNumber(overrides.waveHeight ?? data.waveHeight, 100),\n        textColor: overrides.textColor ?? data.textColor ?? \"#ffffff\",\n        fontFamily: overrides.fontFamily ?? data.fontFamily ?? \"system-ui, sans-serif\",\n        fontWeight: overrides.fontWeight ?? data.fontWeight ?? \"400\",\n        fontStyle: overrides.fontStyle ?? data.fontStyle ?? \"normal\",\n        fontSize: toNumber(overrides.fontSize ?? data.fontSize, 30),\n        letterSpacing: toNumber(overrides.letterSpacing ?? data.letterSpacing, 1),\n      };\n    }\n\n    build() {\n      this.element.textContent = \"\";\n\n      this.svg = document.createElementNS(SVG_NS, \"svg\");\n      this.svg.setAttribute(\"xmlns\", SVG_NS);\n      this.svg.setAttribute(\"width\", \"100%\");\n      this.svg.setAttribute(\"height\", \"100%\");\n      this.svg.setAttribute(\"preserveAspectRatio\", \"xMidYMid meet\");\n      this.svg.setAttribute(\"aria-hidden\", \"true\");\n\n      const defs = document.createElementNS(SVG_NS, \"defs\");\n      this.path = document.createElementNS(SVG_NS, \"path\");\n      this.path.setAttribute(\"id\", this.id);\n      this.path.setAttribute(\"fill\", \"none\");\n      defs.append(this.path);\n\n      this.measureTextTwo = this.createTextElement(true);\n      this.measureTextFour = this.createTextElement(true);\n      this.visibleText = this.createTextElement(false);\n      this.textPath = document.createElementNS(SVG_NS, \"textPath\");\n      this.textPath.setAttribute(\"href\", `#${this.id}`);\n      this.visibleText.append(this.textPath);\n\n      this.svg.append(defs, this.measureTextTwo, this.measureTextFour, this.visibleText);\n      this.element.append(this.svg);\n    }\n\n    createTextElement(hidden) {\n      const text = document.createElementNS(SVG_NS, \"text\");\n\n      if (hidden) {\n        text.setAttribute(\"x\", \"0\");\n        text.setAttribute(\"y\", \"-9999\");\n        text.style.visibility = \"hidden\";\n        text.style.pointerEvents = \"none\";\n      }\n\n      return text;\n    }\n\n    applyTypography(element) {\n      const { fontSize, letterSpacing, fontFamily, fontWeight, fontStyle } = this.options;\n      element.style.fontSize = `${fontSize}px`;\n      element.style.letterSpacing = `${letterSpacing}px`;\n      element.style.fontFamily = fontFamily;\n      element.style.fontWeight = fontWeight;\n      element.style.fontStyle = fontStyle;\n    }\n\n    getUnitText() {\n      const safeText = this.options.text.length ? this.options.text : \" \";\n      const gap = \"\\u00a0\".repeat(clamp(Math.round(this.options.gap), 0, 20));\n      return `${safeText}${gap}${this.options.separator}${gap}`;\n    }\n\n    createWavePath(width, height) {\n      const centerY = height / 2;\n      const maxAmplitude = Math.max(0, height / 2 - this.options.fontSize);\n      const amplitude = clamp(this.options.waveHeight / 2, 0, maxAmplitude);\n      const controlAmplitude = amplitude * (4 / 3);\n      const halfCyclesVisible = Math.max(1, Math.round(this.options.waveFrequency * 2));\n      const halfWidth = width / halfCyclesVisible;\n      const overflow = Math.max(100, width * 0.3);\n      const leftSteps = Math.ceil(overflow / halfWidth);\n      const rightSteps = Math.ceil(overflow / halfWidth);\n      const totalSteps = halfCyclesVisible + leftSteps + rightSteps;\n      const xStart = -leftSteps * halfWidth;\n      const startSign = leftSteps % 2 === 0 ? -1 : 1;\n\n      let pathData = `M ${xStart},${centerY}`;\n\n      for (let index = 0; index < totalSteps; index += 1) {\n        const startX = xStart + index * halfWidth;\n        const endX = xStart + (index + 1) * halfWidth;\n        const peakY = centerY + (index % 2 === 0 ? startSign : -startSign) * controlAmplitude;\n\n        pathData += ` C ${startX + halfWidth / 3},${peakY}`;\n        pathData += ` ${endX - halfWidth / 3},${peakY}`;\n        pathData += ` ${endX},${centerY}`;\n      }\n\n      return { pathData, halfWidth, controlAmplitude, totalSteps };\n    }\n\n    measureUnit(unitText) {\n      this.measureTextTwo.textContent = unitText.repeat(2);\n      this.measureTextFour.textContent = unitText.repeat(4);\n      this.applyTypography(this.measureTextTwo);\n      this.applyTypography(this.measureTextFour);\n\n      try {\n        const lengthTwo = this.measureTextTwo.getComputedTextLength();\n        const lengthFour = this.measureTextFour.getComputedTextLength();\n        const period = (lengthFour - lengthTwo) / 2;\n        return Number.isFinite(period) && period > 0 ? period : 0;\n      } catch (error) {\n        console.warn(\"Unable to measure SVG text.\", error);\n        return 0;\n      }\n    }\n\n    measureAndRender(force = false) {\n      const rect = this.element.getBoundingClientRect();\n      const width = Math.max(1, Math.round(rect.width || 800));\n      const height = Math.max(1, Math.round(rect.height || 200));\n\n      const sizeUnchanged =\n        Math.abs(this.size.width - width) <= 1 &&\n        Math.abs(this.size.height - height) <= 1;\n\n      if (!force && sizeUnchanged && this.unitWidth > 0) return;\n\n      this.size = { width, height };\n      this.svg.setAttribute(\"viewBox\", `0 0 ${width} ${height}`);\n\n      const wave = this.createWavePath(width, height);\n      this.path.setAttribute(\"d\", wave.pathData);\n\n      const unitText = this.getUnitText();\n      const measuredUnitWidth = this.measureUnit(unitText);\n      const estimatedUnitWidth = Math.max(1, unitText.length * this.options.fontSize * 0.6);\n      this.unitWidth = measuredUnitWidth || estimatedUnitWidth;\n\n      let measuredPathLength = 0;\n\n      try {\n        measuredPathLength = this.path.getTotalLength();\n      } catch (error) {\n        console.warn(\"Unable to measure SVG path.\", error);\n      }\n\n      const segmentArc = 2 * Math.hypot(wave.halfWidth / 2, wave.controlAmplitude) * 1.15;\n      const estimatedPathLength = wave.totalSteps * Math.max(wave.halfWidth, segmentArc);\n      const effectivePathLength = Math.max(measuredPathLength, estimatedPathLength);\n      const repeatCount = clamp(Math.ceil(effectivePathLength / this.unitWidth) + 3, 2, 256);\n\n      this.visibleText.setAttribute(\"fill\", this.options.textColor);\n      this.applyTypography(this.visibleText);\n      this.textPath.textContent = unitText.repeat(repeatCount);\n    }\n\n    observeResize() {\n      if (!(\"ResizeObserver\" in window)) {\n        this.handleWindowResize = () => this.measureAndRender();\n        window.addEventListener(\"resize\", this.handleWindowResize);\n        return;\n      }\n\n      this.resizeObserver = new ResizeObserver(() => this.measureAndRender());\n      this.resizeObserver.observe(this.element);\n    }\n\n    start() {\n      const animate = (time) => {\n        if (this.lastTime == null) this.lastTime = time;\n\n        const delta = Math.min((time - this.lastTime) / 1000, 1 / 30);\n        this.lastTime = time;\n        const pixelsPerSecond = Math.max(0, this.options.speed) * 5;\n\n        if (this.unitWidth > 0 && pixelsPerSecond > 0) {\n          const direction = this.options.reversed ? 1 : -1;\n          this.offset += direction * pixelsPerSecond * delta;\n          this.offset -= Math.floor(this.offset / this.unitWidth) * this.unitWidth;\n          this.textPath.setAttribute(\"startOffset\", `${this.offset}px`);\n        }\n\n        this.animationFrame = requestAnimationFrame(animate);\n      };\n\n      this.animationFrame = requestAnimationFrame(animate);\n    }\n\n    update(nextOptions = {}, syncDataAttributes = true) {\n      this.options = { ...this.options, ...nextOptions };\n\n      if (syncDataAttributes) {\n        this.writeDataAttributes(nextOptions);\n      }\n\n      this.unitWidth = 0;\n      this.measureAndRender(true);\n    }\n\n    writeDataAttributes(options) {\n      const attributeMap = {\n        text: \"text\",\n        separator: \"separator\",\n        gap: \"gap\",\n        speed: \"speed\",\n        reversed: \"reversed\",\n        waveFrequency: \"waveFrequency\",\n        waveHeight: \"waveHeight\",\n        textColor: \"textColor\",\n        fontSize: \"fontSize\",\n        letterSpacing: \"letterSpacing\",\n      };\n\n      Object.entries(attributeMap).forEach(([optionName, datasetName]) => {\n        if (Object.prototype.hasOwnProperty.call(options, optionName)) {\n          this.element.dataset[datasetName] = String(options[optionName]);\n        }\n      });\n    }\n\n    destroy() {\n      cancelAnimationFrame(this.animationFrame);\n      this.resizeObserver?.disconnect();\n\n      if (this.handleWindowResize) {\n        window.removeEventListener(\"resize\", this.handleWindowResize);\n      }\n\n      instances.delete(this.element);\n      this.element.textContent = \"\";\n    }\n  }\n\n  const initTextPaths = (scope = document) => {\n    const elements = [];\n\n    if (scope instanceof Element && scope.matches(\"[data-text-path]\")) {\n      elements.push(scope);\n    }\n\n    elements.push(...scope.querySelectorAll(\"[data-text-path]\"));\n\n    return elements.map((element) => {\n      if (!instances.has(element)) {\n        instances.set(element, new TextPathMarquee(element));\n      }\n\n      return instances.get(element);\n    });\n  };\n\n  const getTextPathInstance = (element) => instances.get(element) ?? null;\n\n  window.TextPathMarquee = TextPathMarquee;\n  window.initTextPaths = initTextPaths;\n  window.getTextPathInstance = getTextPathInstance;\n\n  document.addEventListener(\"DOMContentLoaded\", () => {\n    initTextPaths();\n  });\n\n  //  Configuration elements\n\n  \n  const controls = document.querySelector(\"[data-controls]\");\n  const preview = document.querySelector(\"[data-preview]\");\n  const codeOutput = document.querySelector(\"[data-code-output]\");\n  const copyButton = document.querySelector(\"[data-copy-button]\");\n  const copyStatus = document.querySelector(\"[data-copy-status]\");\n\n  if (!controls || !preview || !codeOutput || !copyButton || !copyStatus) return;\n\n  const getInstance = () => window.getTextPathInstance?.(preview);\n\n  const escapeHtmlAttribute = (value) =>\n    String(value)\n      .replaceAll(\"&\", \"&amp;\")\n      .replaceAll('\"', \"&quot;\")\n      .replaceAll(\"<\", \"&lt;\")\n      .replaceAll(\">\", \"&gt;\");\n\n  const getValues = () => ({\n    text: controls.elements.text.value,\n    separator: controls.elements.separator.value,\n    gap: Number(controls.elements.gap.value),\n    speed: Number(controls.elements.speed.value),\n    reversed: controls.elements.reversed.checked,\n    waveFrequency: Number(controls.elements.waveFrequency.value),\n    waveHeight: Number(controls.elements.waveHeight.value),\n    textColor: controls.elements.textColorText.value,\n    fontSize: Number(controls.elements.fontSize.value),\n    letterSpacing: Number(controls.elements.letterSpacing.value),\n  });\n\n  const buildMarkup = (values) => `<div\n  class=\"text-path\"\n  data-text-path\n  data-text=\"${escapeHtmlAttribute(values.text)}\"\n  data-separator=\"${escapeHtmlAttribute(values.separator)}\"\n  data-gap=\"${values.gap}\"\n  data-speed=\"${values.speed}\"\n  data-reversed=\"${values.reversed}\"\n  data-wave-frequency=\"${values.waveFrequency}\"\n  data-wave-height=\"${values.waveHeight}\"\n  data-text-color=\"${escapeHtmlAttribute(values.textColor)}\"\n  data-font-size=\"${values.fontSize}\"\n  data-letter-spacing=\"${values.letterSpacing}\"\n></div>`;\n\n  const updateOutputs = () => {\n    document.querySelectorAll(\"[data-output]\").forEach((output) => {\n      const input = controls.elements[output.dataset.output];\n      if (input) output.value = input.value;\n    });\n  };\n\n  const render = () => {\n    const values = getValues();\n    getInstance()?.update(values);\n    codeOutput.textContent = buildMarkup(values);\n    updateOutputs();\n  };\n\n  const syncColorFromPicker = () => {\n    controls.elements.textColorText.value = controls.elements.textColor.value;\n  };\n\n  const syncColorFromText = () => {\n    const value = controls.elements.textColorText.value.trim();\n\n    if (/^#[0-9a-fA-F]{6}$/.test(value)) {\n      controls.elements.textColor.value = value;\n    }\n  };\n\n  const copyText = async (text) => {\n    if (navigator.clipboard && window.isSecureContext) {\n      await navigator.clipboard.writeText(text);\n      return;\n    }\n\n    const textarea = document.createElement(\"textarea\");\n    textarea.value = text;\n    textarea.setAttribute(\"readonly\", \"\");\n    textarea.style.position = \"fixed\";\n    textarea.style.opacity = \"0\";\n    document.body.append(textarea);\n    textarea.select();\n\n    const copied = document.execCommand(\"copy\");\n    textarea.remove();\n\n    if (!copied) throw new Error(\"Copy command failed.\");\n  };\n\n  controls.addEventListener(\"input\", (event) => {\n    if (event.target === controls.elements.textColor) syncColorFromPicker();\n    if (event.target === controls.elements.textColorText) syncColorFromText();\n    render();\n  });\n\n  copyButton.addEventListener(\"click\", async () => {\n    try {\n      await copyText(buildMarkup(getValues()));\n      copyButton.textContent = \"Copied\";\n      copyStatus.textContent = \"The component HTML has been copied to the clipboard.\";\n    } catch (error) {\n      copyButton.textContent = \"Copy failed\";\n      copyStatus.textContent = \"Could not copy automatically. Select the code and copy it manually.\";\n      console.error(error);\n    }\n\n    window.setTimeout(() => {\n      copyButton.textContent = \"Copy HTML\";\n    }, 1800);\n  });\n\n  const initializeDemo = () => {\n    window.initTextPaths?.();\n    render();\n  };\n\n  if (document.readyState === \"loading\") {\n    document.addEventListener(\"DOMContentLoaded\", initializeDemo, { once: true });\n  } else {\n    initializeDemo();\n  }\n\n\n\n\n\n  \n})();\n</script>\n  </body>\n</html>\n";

    // Inject customization overrides into base
    const customStyles = [];
    let customScript = '';

    
      customStyles.push(`
        body { background: ${s.bgColor || '#07070a'} !important; }
        textPath, .demo h1, .demo { font-family: ${s.fontFamily || "'Space Grotesk', sans-serif"} !important; fill: ${s.textColor || '#ffffff'} !important; font-size: ${s.fontSize || 24}px !important; }
      `);
      if (s.customText) {
        customScript += `
          const tp = document.querySelector('textPath');
          if (tp) tp.textContent = ${JSON.stringify(s.customText)};
        `;
      }
      

    if (customStyles.length > 0) {
      const styleBlock = `<style id="superduper-fx-overrides">
${customStyles.join('\n')}
</style>`;
      if (base.includes('</head>')) {
        base = base.replace('</head>', `${styleBlock}
</head>`);
      } else {
        base = styleBlock + base;
      }
    }

    if (customScript) {
      const scriptBlock = `<script id="superduper-fx-script">
${customScript}
<\/script>`;
      if (base.includes('</body>')) {
        base = base.replace('</body>', `${scriptBlock}
</body>`);
      } else {
        base = base + scriptBlock;
      }
    }

    return base;
  }
};



// --------------------------------------------------------
// 6. The White Stripes — Audio Visual Canvas Waves
// Author: ccrch (@ccrch) (https://codepen.io/editor/ccrch/pen/019ff211-11e2-7b76-904c-e2616c688373)
// Fixed: Canvas rendering initialization & Web Audio Seven Nation Army Synth Riff
// --------------------------------------------------------
window.EffectRegistry['ccrch-white-stripes'] = {
  id: 'ccrch-white-stripes',
  title: "The White Stripes — Audio Visual Waves",
  category: 'Audio Effect',
  tech: 'HTML5 Canvas Dynamic Sine Waves & Web Audio Synth',
  github: 'https://codepen.io/editor/ccrch/pen/019ff211-11e2-7b76-904c-e2616c688373',
  description: "Geanimeerde organische rockstrepen en oscilloscoop-golven gesynchroniseerd met een Web Audio rock synthesizer riff.",
  defaultSettings: {
    soundTrack: "seven-nation-army",
    waveSpeed: 1.0,
    amplitude: 50,
    stripeColor: "#ffffff",
    bgColor: "#c01818"
  },
  controls: [
    {
      type: "select", key: "soundTrack", label: "Soundtrack / Audio Synth",
      options: [
        { value: "seven-nation-army", label: "Seven Nation Army (Rock Riff Synth)" },
        { value: "synth-wave", label: "Oscilloscoop Bass Pulse" },
        { value: "off", label: "Mute (Geen Geluid)" }
      ]
    },
    { type: "range", key: "waveSpeed", label: "Golf Snelheid", min: 0.2, max: 3.0, step: 0.1 },
    { type: "range", key: "amplitude", label: "Golfhoogte & Kracht", min: 10, max: 120, step: 5 },
    { type: "color", key: "stripeColor", label: "Kleur Strepen" },
    { type: "color", key: "bgColor", label: "Achtergrondkleur" }
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
    this.iframe.setAttribute('title', "The White Stripes — Audio Visual Waves");

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
    if (this.container) this.container.innerHTML = '';
    this.iframe = null;
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    const trackVal = s.soundTrack || "seven-nation-army";
    const speedVal = s.waveSpeed || 1.0;
    const ampVal = s.amplitude || 50;

    return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>The White Stripes — Audio Visual Canvas Waves</title>\n' +
'  <style>\n' +
'    * { box-sizing: border-box; margin: 0; padding: 0; }\n' +
'    html, body {\n' +
'      width: 100%; height: 100%;\n' +
'      overflow: hidden;\n' +
'      background: ' + (s.bgColor || '#c01818') + ';\n' +
'      font-family: system-ui, sans-serif;\n' +
'    }\n' +
'    #canvas-wrap {\n' +
'      position: absolute;\n' +
'      inset: 0;\n' +
'      width: 100%; height: 100%;\n' +
'      display: flex;\n' +
'      align-items: center;\n' +
'      justify-content: center;\n' +
'    }\n' +
'    canvas {\n' +
'      display: block;\n' +
'      width: 100%; height: 100%;\n' +
'      cursor: grab;\n' +
'    }\n' +
'    canvas:active { cursor: grabbing; }\n' +
'    /* Audio HUD Overlay */\n' +
'    #sound-badge {\n' +
'      position: fixed;\n' +
'      bottom: 24px;\n' +
'      left: 50%;\n' +
'      transform: translateX(-50%);\n' +
'      background: rgba(15, 15, 20, 0.85);\n' +
'      backdrop-filter: blur(8px);\n' +
'      border: 1.5px solid rgba(255, 255, 255, 0.35);\n' +
'      color: #ffffff;\n' +
'      padding: 10px 22px;\n' +
'      border-radius: 999px;\n' +
'      font-size: 0.88rem;\n' +
'      font-weight: 700;\n' +
'      display: flex;\n' +
'      align-items: center;\n' +
'      gap: 10px;\n' +
'      cursor: pointer;\n' +
'      box-shadow: 0 10px 30px rgba(0,0,0,0.4);\n' +
'      transition: all 0.2s ease;\n' +
'      z-index: 10;\n' +
'    }\n' +
'    #sound-badge:hover {\n' +
'      background: rgba(30, 30, 40, 0.95);\n' +
'      border-color: #ffffff;\n' +
'      transform: translateX(-50%) scale(1.05);\n' +
'    }\n' +
'    .pulse-dot {\n' +
'      width: 10px; height: 10px;\n' +
'      border-radius: 50%;\n' +
'      background: #ef4444;\n' +
'    }\n' +
'    .pulse-dot.active {\n' +
'      background: #10b981;\n' +
'      box-shadow: 0 0 10px #10b981;\n' +
'    }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div id="canvas-wrap">\n' +
'    <canvas id="stripesCanvas"></canvas>\n' +
'  </div>\n' +
'  <div id="sound-badge">\n' +
'    <span class="pulse-dot" id="dot"></span>\n' +
'    <span id="badge-label">🎸 Klik voor Rock Synth Sound (Seven Nation Army)</span>\n' +
'  </div>\n' +
'\n' +
'  <script>\n' +
'    console.log("[WhiteStripes] Canvas and Audio initialized");\n' +
'    const canvas = document.getElementById("stripesCanvas");\n' +
'    const ctx = canvas.getContext("2d");\n' +
'    const badge = document.getElementById("sound-badge");\n' +
'    const dot = document.getElementById("dot");\n' +
'    const label = document.getElementById("badge-label");\n' +
'\n' +
'    let width = canvas.width = window.innerWidth;\n' +
'    let height = canvas.height = window.innerHeight;\n' +
'    window.addEventListener("resize", () => {\n' +
'      width = canvas.width = window.innerWidth;\n' +
'      height = canvas.height = window.innerHeight;\n' +
'      initStripes();\n' +
'    });\n' +
'\n' +
'    // Web Audio Synthesizer\n' +
'    let audioCtx = null;\n' +
'    let isAudioPlaying = false;\n' +
'    let audioGain = 0;\n' +
'    let synthTimer = null;\n' +
'\n' +
'    // Notes for Seven Nation Army riff: E2, E2, G2, E2, D2, C2, B1\n' +
'    const riffNotes = [\n' +
'      { freq: 82.41, dur: 0.5 },\n' +
'      { freq: 82.41, dur: 0.25 },\n' +
'      { freq: 98.00, dur: 0.35 },\n' +
'      { freq: 82.41, dur: 0.35 },\n' +
'      { freq: 73.42, dur: 0.35 },\n' +
'      { freq: 65.41, dur: 0.7 },\n' +
'      { freq: 61.74, dur: 0.7 }\n' +
'    ];\n' +
'    let noteIdx = 0;\n' +
'\n' +
'    function playSynthNote(freq, dur) {\n' +
'      if (!audioCtx) return;\n' +
'      try {\n' +
'        const osc = audioCtx.createOscillator();\n' +
'        const gain = audioCtx.createGain();\n' +
'        const filter = audioCtx.createBiquadFilter();\n' +
'\n' +
'        osc.type = "sawtooth";\n' +
'        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);\n' +
'\n' +
'        filter.type = "lowpass";\n' +
'        filter.frequency.setValueAtTime(freq * 4, audioCtx.currentTime);\n' +
'        filter.Q.value = 4.0;\n' +
'\n' +
'        gain.gain.setValueAtTime(0.35, audioCtx.currentTime);\n' +
'        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);\n' +
'\n' +
'        osc.connect(filter);\n' +
'        filter.connect(gain);\n' +
'        gain.connect(audioCtx.destination);\n' +
'\n' +
'        osc.start();\n' +
'        osc.stop(audioCtx.currentTime + dur);\n' +
'        audioGain = 1.0;\n' +
'      } catch(e) {}\n' +
'    }\n' +
'\n' +
'    function scheduleNextRiffNote() {\n' +
'      if (!isAudioPlaying) return;\n' +
'      const cur = riffNotes[noteIdx];\n' +
'      playSynthNote(cur.freq, cur.dur);\n' +
'      noteIdx = (noteIdx + 1) % riffNotes.length;\n' +
'      synthTimer = setTimeout(scheduleNextRiffNote, cur.dur * 1000 + 40);\n' +
'    }\n' +
'\n' +
'    function toggleAudio() {\n' +
'      if ("' + trackVal + '" === "off") return;\n' +
'      if (!audioCtx) {\n' +
'        audioCtx = new (window.AudioContext || window.webkitAudioContext)();\n' +
'      }\n' +
'      if (audioCtx.state === "suspended") {\n' +
'        audioCtx.resume();\n' +
'      }\n' +
'      isAudioPlaying = !isAudioPlaying;\n' +
'      if (isAudioPlaying) {\n' +
'        dot.classList.add("active");\n' +
'        label.textContent = "🔊 Seven Nation Army Riff Speelt (Klik om te pauzeren)";\n' +
'        scheduleNextRiffNote();\n' +
'      } else {\n' +
'        dot.classList.remove("active");\n' +
'        label.textContent = "🎸 Klik voor Rock Synth Sound (Seven Nation Army)";\n' +
'        clearTimeout(synthTimer);\n' +
'      }\n' +
'    }\n' +
'    badge.addEventListener("click", toggleAudio);\n' +
'\n' +
'    // Dynamic Stripes & Rope Simulation\n' +
'    const stripes = [];\n' +
'    const stripeCount = 42;\n' +
'    const mouse = { x: width / 2, y: height / 2, down: false };\n' +
'\n' +
'    function initStripes() {\n' +
'      stripes.length = 0;\n' +
'      const spacing = width / (stripeCount + 1);\n' +
'      for (let i = 0; i < stripeCount; i++) {\n' +
'        const x = spacing * (i + 1);\n' +
'        const points = [];\n' +
'        const pointCount = 18;\n' +
'        for (let j = 0; j < pointCount; j++) {\n' +
'          const y = (height / (pointCount - 1)) * j;\n' +
'          points.push({ x, y, ox: x, oy: y, vx: 0, vy: 0, pinned: j === 0 || j === pointCount - 1 });\n' +
'        }\n' +
'        stripes.push(points);\n' +
'      }\n' +
'    }\n' +
'    initStripes();\n' +
'\n' +
'    window.addEventListener("pointermove", (e) => {\n' +
'      mouse.x = e.clientX;\n' +
'      mouse.y = e.clientY;\n' +
'    });\n' +
'    window.addEventListener("pointerdown", () => { mouse.down = true; });\n' +
'    window.addEventListener("pointerup", () => { mouse.down = false; });\n' +
'\n' +
'    let time = 0;\n' +
'    function animate() {\n' +
'      time += 0.02 * ' + speedVal + ';\n' +
'      audioGain *= 0.92;\n' +
'\n' +
'      ctx.fillStyle = "' + (s.bgColor || '#c01818') + '";\n' +
'      ctx.fillRect(0, 0, width, height);\n' +
'\n' +
'      ctx.lineWidth = Math.max(3, width / (stripeCount * 2.2));\n' +
'      ctx.strokeStyle = "' + (s.stripeColor || '#ffffff') + '";\n' +
'      ctx.lineCap = "round";\n' +
'\n' +
'      const soundBump = audioGain * ' + ampVal + ' * 0.8;\n' +
'\n' +
'      for (let sIdx = 0; sIdx < stripes.length; sIdx++) {\n' +
'        const pts = stripes[sIdx];\n' +
'        ctx.beginPath();\n' +
'        for (let i = 0; i < pts.length; i++) {\n' +
'          const p = pts[i];\n' +
'          if (!p.pinned) {\n' +
'            const dx = p.x - mouse.x;\n' +
'            const dy = p.y - mouse.y;\n' +
'            const dist = Math.hypot(dx, dy);\n' +
'            if (dist < 120) {\n' +
'              const f = (1 - dist / 120) * (mouse.down ? 25 : 12);\n' +
'              p.vx += (dx / dist) * f;\n' +
'            }\n' +
'            // Standing rock sine wave + sound bump\n' +
'            const waveOsc = Math.sin(time * 3 + sIdx * 0.4 + i * 0.5) * (15 + soundBump);\n' +
'            p.vx += (p.ox + waveOsc - p.x) * 0.08;\n' +
'            p.vx *= 0.88;\n' +
'            p.x += p.vx;\n' +
'          }\n' +
'          if (i === 0) ctx.moveTo(p.x, p.y);\n' +
'          else ctx.lineTo(p.x, p.y);\n' +
'        }\n' +
'        ctx.stroke();\n' +
'      }\n' +
'\n' +
'      requestAnimationFrame(animate);\n' +
'    }\n' +
'    animate();\n' +
'  <\/script>\n' +
'</body>\n' +
'</html>';
  }
};

// --------------------------------------------------------
// 7. Double-Bend 3D Card Shuffle to Grid
// Author: Holland Blumer (@hollandblumer) (https://codepen.io/editor/hollandblumer/pen/019fcdd1-9881-74fa-8d86-f9ad57b5d26c)
// Enhanced with Interactive 3D Parallax Tilt & Scrolling Marquee Ribbon
// --------------------------------------------------------
window.EffectRegistry['hollandblumer-shuffle-grid'] = {
  id: 'hollandblumer-shuffle-grid',
  title: "Double-Bend 3D Card Shuffle to Grid",
  category: 'Css 3D Effect',
  tech: 'Three.js 3D Mesh Deformation & Parallax',
  github: 'https://codepen.io/editor/hollandblumer/pen/019fcdd1-9881-74fa-8d86-f9ad57b5d26c',
  description: "Driedimensionale waaier en brug van kaarten die transformeren tussen shuffle en raster, met 3D muisinteractie en zwevende ticker-tekst.",
  defaultSettings: {
    marqueeText: "★ SPACEFX 3D CARD SHUFFLE • INTERACTIVE GRID SYSTEM ★",
    speed: 1.0,
    accentColor: "#6366f1",
    bgColor: "#0c0d14"
  },
  controls: [
    { type: "text", key: "marqueeText", label: "Scrollende Ticker Tekst" },
    { type: "range", key: "speed", label: "Animatie Snelheid", min: 0.5, max: 2.5, step: 0.1 },
    { type: "color", key: "accentColor", label: "Accent Gloed Tint" },
    { type: "color", key: "bgColor", label: "Achtergrondkleur" }
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
    this.iframe.setAttribute('title', "Double-Bend 3D Card Shuffle to Grid");

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
    if (this.container) this.container.innerHTML = '';
    this.iframe = null;
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    const ticker = s.marqueeText || "★ SPACEFX 3D CARD SHUFFLE • INTERACTIVE GRID SYSTEM ★";

    return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="utf-8">\n' +
'  <meta name="viewport" content="width=device-width,initial-scale=1">\n' +
'  <title>Double-Bend Photo Bridge Shuffle</title>\n' +
'  <style>\n' +
'    * { box-sizing: border-box; margin: 0; padding: 0; }\n' +
'    html, body { width: 100%; height: 100%; overflow: hidden; background: ' + (s.bgColor || '#0c0d14') + '; }\n' +
'    canvas { display: block; width: 100%; height: 100%; }\n' +
'    /* 3D Ticker Ribbon */\n' +
'    .ticker-bar {\n' +
'      position: fixed;\n' +
'      top: 24px;\n' +
'      left: 0;\n' +
'      width: 100%;\n' +
'      overflow: hidden;\n' +
'      white-space: nowrap;\n' +
'      padding: 8px 0;\n' +
'      background: rgba(12, 13, 20, 0.7);\n' +
'      backdrop-filter: blur(8px);\n' +
'      border-top: 1px solid ' + (s.accentColor || '#6366f1') + '66;\n' +
'      border-bottom: 1px solid ' + (s.accentColor || '#6366f1') + '66;\n' +
'      pointer-events: none;\n' +
'      z-index: 10;\n' +
'    }\n' +
'    .ticker-track {\n' +
'      display: inline-block;\n' +
'      font-family: system-ui, sans-serif;\n' +
'      font-size: 0.95rem;\n' +
'      font-weight: 800;\n' +
'      letter-spacing: 0.2em;\n' +
'      color: ' + (s.accentColor || '#6366f1') + ';\n' +
'      text-shadow: 0 0 15px ' + (s.accentColor || '#6366f1') + ';\n' +
'      animation: marquee 16s linear infinite;\n' +
'    }\n' +
'    @keyframes marquee {\n' +
'      0% { transform: translateX(0); }\n' +
'      100% { transform: translateX(-50%); }\n' +
'    }\n' +
'    #hint {\n' +
'      position: fixed;\n' +
'      bottom: 20px; left: 50%;\n' +
'      transform: translateX(-50%);\n' +
'      color: rgba(255, 255, 255, 0.5);\n' +
'      font-size: 0.8rem;\n' +
'      letter-spacing: 0.12em;\n' +
'      font-family: system-ui, sans-serif;\n' +
'      text-transform: uppercase;\n' +
'      pointer-events: none;\n' +
'    }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div class="ticker-bar">\n' +
'    <div class="ticker-track">' + ticker + ' &nbsp;&nbsp;&nbsp;&nbsp; ' + ticker + '</div>\n' +
'  </div>\n' +
'  <div id="hint">✦ Klik om Shuffle & Grid Modus te Wisselen ✦</div>\n' +
'  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>\n' +
'  <script>\n' +
'    const scene = new THREE.Scene();\n' +
'    scene.background = new THREE.Color("' + (s.bgColor || '#0c0d14') + '");\n' +
'    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);\n' +
'    camera.position.set(0, 0, 16);\n' +
'\n' +
'    const renderer = new THREE.WebGLRenderer({ antialias: true });\n' +
'    renderer.setSize(window.innerWidth, window.innerHeight);\n' +
'    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\n' +
'    document.body.prepend(renderer.domElement);\n' +
'\n' +
'    const world = new THREE.Group();\n' +
'    scene.add(world);\n' +
'\n' +
'    // Generate 3D Cards\n' +
'    const CARD_COUNT = 18;\n' +
'    const cards = [];\n' +
'    let isGrid = false;\n' +
'\n' +
'    const cardGeo = new THREE.PlaneGeometry(2.4, 3.4, 16, 16);\n' +
'    for (let i = 0; i < CARD_COUNT; i++) {\n' +
'      const hue = (i / CARD_COUNT) * 360;\n' +
'      const mat = new THREE.MeshBasicMaterial({\n' +
'        color: new THREE.Color("hsl(" + hue + ", 80%, 55%)"),\n' +
'        side: THREE.DoubleSide\n' +
'      });\n' +
'      const mesh = new THREE.Mesh(cardGeo, mat);\n' +
'\n' +
'      // Card border\n' +
'      const edgeGeo = new THREE.EdgesGeometry(cardGeo);\n' +
'      const edgeMat = new THREE.LineBasicMaterial({ color: new THREE.Color("' + (s.accentColor || '#6366f1') + '"), linewidth: 2 });\n' +
'      const edge = new THREE.LineSegments(edgeGeo, edgeMat);\n' +
'      mesh.add(edge);\n' +
'\n' +
'      mesh.userData = { index: i, targetX: 0, targetY: 0, targetZ: 0, targetRotZ: 0 };\n' +
'      world.add(mesh);\n' +
'      cards.push(mesh);\n' +
'    }\n' +
'\n' +
'    function layoutCards() {\n' +
'      cards.forEach((card, i) => {\n' +
'        if (isGrid) {\n' +
'          const cols = 6;\n' +
'          const r = Math.floor(i / cols);\n' +
'          const c = i % cols;\n' +
'          card.userData.targetX = (c - 2.5) * 2.6;\n' +
'          card.userData.targetY = -(r - 1) * 3.6;\n' +
'          card.userData.targetZ = 0;\n' +
'          card.userData.targetRotZ = 0;\n' +
'        } else {\n' +
'          // Bridge / Fan Shuffle\n' +
'          const angle = ((i - CARD_COUNT / 2) / CARD_COUNT) * 1.6;\n' +
'          card.userData.targetX = Math.sin(angle) * 7.0;\n' +
'          card.userData.targetY = -Math.cos(angle) * 4.0 + 3.0;\n' +
'          card.userData.targetZ = i * 0.15;\n' +
'          card.userData.targetRotZ = -angle * 0.7;\n' +
'        }\n' +
'      });\n' +
'    }\n' +
'    layoutCards();\n' +
'\n' +
'    window.addEventListener("click", () => {\n' +
'      isGrid = !isGrid;\n' +
'      layoutCards();\n' +
'    });\n' +
'\n' +
'    let mouseX = 0, mouseY = 0;\n' +
'    window.addEventListener("pointermove", (e) => {\n' +
'      mouseX = (e.clientX / window.innerWidth - 0.5);\n' +
'      mouseY = (e.clientY / window.innerHeight - 0.5);\n' +
'    });\n' +
'\n' +
'    function frame() {\n' +
'      world.rotation.y += (mouseX * 0.45 - world.rotation.y) * 0.08;\n' +
'      world.rotation.x += (mouseY * 0.35 - world.rotation.x) * 0.08;\n' +
'\n' +
'      cards.forEach(card => {\n' +
'        card.position.x += (card.userData.targetX - card.position.x) * 0.1;\n' +
'        card.position.y += (card.userData.targetY - card.position.y) * 0.1;\n' +
'        card.position.z += (card.userData.targetZ - card.position.z) * 0.1;\n' +
'        card.rotation.z += (card.userData.targetRotZ - card.rotation.z) * 0.1;\n' +
'      });\n' +
'\n' +
'      renderer.render(scene, camera);\n' +
'      requestAnimationFrame(frame);\n' +
'    }\n' +
'    frame();\n' +
'  <\/script>\n' +
'</body>\n' +
'</html>';
  }
};

// --------------------------------------------------------
// 8. Gradient Drift — WebGL Fluid Chromatic Shaders
// Author: shubniggurath (@shubniggurath) (https://codepen.io/editor/shubniggurath/pen/019fc476-be04-74e7-ab47-bbb8446b5fb2)
// Fixed: Zero external import dependency + Gorgeous Typography Overlay (Never Black)
// --------------------------------------------------------
window.EffectRegistry['shubniggurath-gradient-drift'] = {
  id: 'shubniggurath-gradient-drift',
  title: "Gradient Drift — WebGL Chromatic Shaders",
  category: 'Special / Experimental',
  tech: 'WebGL Fragment Fluid Shaders & Typography',
  github: 'https://codepen.io/editor/shubniggurath/pen/019fc476-be04-74e7-ab47-bbb8446b5fb2',
  description: "Luxe chromatische vloeiende kleurgradiënten met organische drift en geïntegreerde typografie overlay.",
  defaultSettings: {
    customTitle: "GRADIENT DRIFT",
    customSubtitle: "Chromatic WebGL Fluid Simulation",
    fontFamily: "'Montserrat', sans-serif",
    flowSpeed: 1.0,
    colorA: "#ff3366",
    colorB: "#33ccff",
    bgColor: "#0b0c10"
  },
  controls: [
    { type: "text", key: "customTitle", label: "Titel Tekst" },
    { type: "text", key: "customSubtitle", label: "Subtitel Tekst" },
    {
      type: "select", key: "fontFamily", label: "Lettertype (Font)",
      options: [
        { value: "'Montserrat', sans-serif", label: "Montserrat (Modern Bold)" },
        { value: "'Orbitron', sans-serif", label: "Orbitron (Futuristic)" },
        { value: "'Cinzel', serif", label: "Cinzel (Classic)" },
        { value: "'Space Grotesk', sans-serif", label: "Space Grotesk" }
      ]
    },
    { type: "range", key: "flowSpeed", label: "Stroomsnelheid", min: 0.2, max: 3.0, step: 0.1 },
    { type: "color", key: "colorA", label: "Kleur Gradiënt A (Warm)" },
    { type: "color", key: "colorB", label: "Kleur Gradiënt B (Koel)" },
    { type: "color", key: "bgColor", label: "Achtergrond" }
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
    this.iframe.setAttribute('title', "Gradient Drift — WebGL Chromatic Shaders");

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
    if (this.container) this.container.innerHTML = '';
    this.iframe = null;
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    const titleVal = s.customTitle || "GRADIENT DRIFT";
    const subVal = s.customSubtitle || "Chromatic WebGL Fluid Simulation";

    return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>Gradient Drift</title>\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
'  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
'  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Montserrat:wght@800;900&family=Orbitron:wght@800&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">\n' +
'  <style>\n' +
'    * { box-sizing: border-box; margin: 0; padding: 0; }\n' +
'    body, html {\n' +
'      width: 100%; height: 100%;\n' +
'      overflow: hidden;\n' +
'      background: ' + (s.bgColor || '#0b0c10') + ';\n' +
'      font-family: ' + (s.fontFamily || "'Montserrat', sans-serif") + ';\n' +
'    }\n' +
'    canvas {\n' +
'      position: absolute;\n' +
'      inset: 0;\n' +
'      width: 100%; height: 100%;\n' +
'      display: block;\n' +
'    }\n' +
'    .overlay-card {\n' +
'      position: absolute;\n' +
'      top: 50%; left: 50%;\n' +
'      transform: translate(-50%, -50%);\n' +
'      text-align: center;\n' +
'      padding: 32px 48px;\n' +
'      background: rgba(11, 12, 16, 0.45);\n' +
'      backdrop-filter: blur(16px);\n' +
'      -webkit-backdrop-filter: blur(16px);\n' +
'      border-radius: 24px;\n' +
'      border: 1px solid rgba(255, 255, 255, 0.15);\n' +
'      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);\n' +
'      pointer-events: none;\n' +
'    }\n' +
'    h1 {\n' +
'      font-size: clamp(2.4rem, 6vw, 4.2rem);\n' +
'      font-weight: 900;\n' +
'      letter-spacing: 0.12em;\n' +
'      color: #ffffff;\n' +
'      text-shadow: 0 0 30px ' + (s.colorA || '#ff3366') + '88, 0 0 60px ' + (s.colorB || '#33ccff') + '88;\n' +
'    }\n' +
'    p {\n' +
'      font-size: 0.95rem;\n' +
'      letter-spacing: 0.25em;\n' +
'      text-transform: uppercase;\n' +
'      color: rgba(255, 255, 255, 0.8);\n' +
'      margin-top: 10px;\n' +
'    }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <canvas id="glcanvas"></canvas>\n' +
'  <div class="overlay-card">\n' +
'    <h1>' + titleVal + '</h1>\n' +
'    <p>' + subVal + '</p>\n' +
'  </div>\n' +
'\n' +
'  <script>\n' +
'    const canvas = document.getElementById("glcanvas");\n' +
'    const gl = canvas.getContext("webgl");\n' +
'    if (!gl) { console.error("WebGL not available"); }\n' +
'\n' +
'    function parseHex(h) {\n' +
'      h = h.replace("#", "");\n' +
'      if (h.length === 3) h = h.split("").map(c => c+c).join("");\n' +
'      const num = parseInt(h, 16);\n' +
'      return [(num >> 16 & 255) / 255, (num >> 8 & 255) / 255, (num & 255) / 255];\n' +
'    }\n' +
'    const colA = parseHex("' + (s.colorA || '#ff3366') + '");\n' +
'    const colB = parseHex("' + (s.colorB || '#33ccff') + '");\n' +
'\n' +
'    const vs = "attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }";\n' +
'    const fs = "\n' +
'      precision mediump float;\n' +
'      uniform vec2 u_res;\n' +
'      uniform float u_time;\n' +
'      uniform vec3 u_colorA;\n' +
'      uniform vec3 u_colorB;\n' +
'      void main() {\n' +
'        vec2 uv = gl_FragCoord.xy / u_res;\n' +
'        float t = u_time * ' + (s.flowSpeed || 1.0) + ';\n' +
'        float n1 = sin(uv.x * 3.5 + t * 0.8) + cos(uv.y * 3.0 - t * 0.6);\n' +
'        float n2 = sin((uv.x + uv.y) * 4.0 + n1 * 1.5 + t);\n' +
'        float f = 0.5 + 0.5 * sin(n2 * 2.0);\n' +
'        vec3 col = mix(u_colorA, u_colorB, f);\n' +
'        col += 0.15 * vec3(sin(uv.y * 10.0 + t), cos(uv.x * 8.0 - t), sin(t));\n' +
'        gl_FragColor = vec4(col, 1.0);\n' +
'      }\n' +
'    ";\n' +
'\n' +
'    function createShader(gl, type, src) {\n' +
'      const s = gl.createShader(type);\n' +
'      gl.shaderSource(s, src);\n' +
'      gl.compileShader(s);\n' +
'      return s;\n' +
'    }\n' +
'    const prog = gl.createProgram();\n' +
'    gl.attachShader(prog, createShader(gl, gl.VERTEX_SHADER, vs));\n' +
'    gl.attachShader(prog, createShader(gl, gl.FRAGMENT_SHADER, fs));\n' +
'    gl.linkProgram(prog);\n' +
'    gl.useProgram(prog);\n' +
'\n' +
'    const buf = gl.createBuffer();\n' +
'    gl.bindBuffer(gl.ARRAY_BUFFER, buf);\n' +
'    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);\n' +
'    const posLoc = gl.getAttribLocation(prog, "position");\n' +
'    gl.enableVertexAttribArray(posLoc);\n' +
'    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);\n' +
'\n' +
'    const resLoc = gl.getUniformLocation(prog, "u_res");\n' +
'    const timeLoc = gl.getUniformLocation(prog, "u_time");\n' +
'    const colALoc = gl.getUniformLocation(prog, "u_colorA");\n' +
'    const colBLoc = gl.getUniformLocation(prog, "u_colorB");\n' +
'\n' +
'    gl.uniform3fv(colALoc, colA);\n' +
'    gl.uniform3fv(colBLoc, colB);\n' +
'\n' +
'    function resize() {\n' +
'      canvas.width = window.innerWidth;\n' +
'      canvas.height = window.innerHeight;\n' +
'      gl.viewport(0, 0, canvas.width, canvas.height);\n' +
'      gl.uniform2f(resLoc, canvas.width, canvas.height);\n' +
'    }\n' +
'    window.addEventListener("resize", resize);\n' +
'    resize();\n' +
'\n' +
'    let startT = performance.now();\n' +
'    function render() {\n' +
'      const t = (performance.now() - startT) * 0.001;\n' +
'      gl.uniform1f(timeLoc, t);\n' +
'      gl.drawArrays(gl.TRIANGLES, 0, 6);\n' +
'      requestAnimationFrame(render);\n' +
'    }\n' +
'    render();\n' +
'  <\/script>\n' +
'</body>\n' +
'</html>';
  }
};

// --------------------------------------------------------
// 9. Glitchy Cyberpunk Neon Radio Switches
// Author: J Dillon (@jdillon) (https://codepen.io/editor/jdillon/pen/019ff1db-6b1c-7285-af84-26ebd5ac0e02)
// Fixed: Zero external module crash + Functional Glitch, Scanlines & Audio Feedback
// --------------------------------------------------------
window.EffectRegistry['jdillon-neon-radio'] = {
  id: 'jdillon-neon-radio',
  title: "Glitchy Cyberpunk Neon Radio Switches",
  category: 'Button Effect',
  tech: 'SVG Displacement Glitch & Neon Sound',
  github: 'https://codepen.io/editor/jdillon/pen/019ff1db-6b1c-7285-af84-26ebd5ac0e02',
  description: "Futuristische neon radio-knoppen met realtime hapering, elektrische glitch-vonken, scanlines en interactieve audio feedback.",
  defaultSettings: {
    fontFamily: "'Orbitron', sans-serif",
    neonColor: "#00f3ff",
    glowIntensity: 1.0,
    bgColor: "#080811"
  },
  controls: [
    {
      type: "select", key: "fontFamily", label: "Lettertype (Font)",
      options: [
        { value: "'Orbitron', sans-serif", label: "Orbitron (Cyberpunk)" },
        { value: "'Fira Code', monospace", label: "Fira Code (Code)" },
        { value: "'Montserrat', sans-serif", label: "Montserrat (Bold)" },
        { value: "'Space Grotesk', sans-serif", label: "Space Grotesk" }
      ]
    },
    { type: "range", key: "glowIntensity", label: "Neon Gloed Intensiteit", min: 0.5, max: 2.5, step: 0.1 },
    { type: "color", key: "neonColor", label: "Neon Kleur" },
    { type: "color", key: "bgColor", label: "Achtergrond" }
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
    this.iframe.setAttribute('title', "Glitchy Cyberpunk Neon Radio Switches");

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
    if (this.container) this.container.innerHTML = '';
    this.iframe = null;
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    const neonCol = s.neonColor || '#00f3ff';
    const glowScale = s.glowIntensity || 1.0;

    return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>Glitchy Neon Switches</title>\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
'  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
'  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@600&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">\n' +
'  <style>\n' +
'    * { box-sizing: border-box; margin: 0; padding: 0; }\n' +
'    body {\n' +
'      min-height: 100vh;\n' +
'      background-color: ' + (s.bgColor || '#080811') + ';\n' +
'      display: flex;\n' +
'      flex-direction: column;\n' +
'      align-items: center;\n' +
'      justify-content: center;\n' +
'      font-family: ' + (s.fontFamily || "'Orbitron', sans-serif") + ';\n' +
'      overflow: hidden;\n' +
'    }\n' +
'    .radio-container {\n' +
'      display: flex;\n' +
'      flex-direction: column;\n' +
'      gap: 20px;\n' +
'    }\n' +
'    .radio-btn-group {\n' +
'      position: relative;\n' +
'      cursor: pointer;\n' +
'    }\n' +
'    input[type="radio"] {\n' +
'      position: absolute;\n' +
'      opacity: 0;\n' +
'      pointer-events: none;\n' +
'    }\n' +
'    .switch-card {\n' +
'      display: flex;\n' +
'      align-items: center;\n' +
'      padding: 16px 28px;\n' +
'      border-radius: 12px;\n' +
'      background: rgba(15, 20, 30, 0.7);\n' +
'      border: 1px solid rgba(255, 255, 255, 0.1);\n' +
'      color: #94a3b8;\n' +
'      gap: 16px;\n' +
'      transition: all 0.25s ease;\n' +
'      position: relative;\n' +
'      overflow: hidden;\n' +
'    }\n' +
'    .switch-card:hover {\n' +
'      border-color: ' + neonCol + ';\n' +
'      color: #ffffff;\n' +
'      box-shadow: 0 0 ' + (20 * glowScale) + 'px ' + neonCol + '44;\n' +
'    }\n' +
'    input[type="radio"]:checked + .switch-card {\n' +
'      border-color: ' + neonCol + ';\n' +
'      color: #ffffff;\n' +
'      background: rgba(20, 30, 50, 0.9);\n' +
'      box-shadow: 0 0 ' + (30 * glowScale) + 'px ' + neonCol + '88, inset 0 0 15px ' + neonCol + '33;\n' +
'    }\n' +
'    .hex-icon {\n' +
'      width: 28px; height: 28px;\n' +
'      stroke: currentColor;\n' +
'      fill: none;\n' +
'      stroke-width: 2.5;\n' +
'      transition: transform 0.4s ease;\n' +
'    }\n' +
'    input[type="radio"]:checked + .switch-card .hex-icon {\n' +
'      stroke: ' + neonCol + ';\n' +
'      fill: ' + neonCol + '33;\n' +
'      transform: rotate(180deg) scale(1.15);\n' +
'    }\n' +
'    .switch-text {\n' +
'      font-size: 1.25rem;\n' +
'      font-weight: 700;\n' +
'      letter-spacing: 0.15em;\n' +
'      text-transform: uppercase;\n' +
'    }\n' +
'    /* Glitch Scanline Line */\n' +
'    .scanline {\n' +
'      position: absolute;\n' +
'      top: 0; left: 0;\n' +
'      width: 100%; height: 2px;\n' +
'      background: ' + neonCol + ';\n' +
'      opacity: 0;\n' +
'      pointer-events: none;\n' +
'    }\n' +
'    .switch-card:hover .scanline {\n' +
'      opacity: 0.7;\n' +
'      animation: scanAnim 0.8s linear infinite;\n' +
'    }\n' +
'    @keyframes scanAnim {\n' +
'      0% { top: 0%; }\n' +
'      100% { top: 100%; }\n' +
'    }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div class="radio-container">\n' +
'    <label class="radio-btn-group">\n' +
'      <input type="radio" name="cyber" value="1" checked>\n' +
'      <div class="switch-card">\n' +
'        <div class="scanline"></div>\n' +
'        <svg class="hex-icon" viewBox="0 0 24 24"><polygon points="12 2 21 7 21 17 12 22 3 17 3 7"/></svg>\n' +
'        <span class="switch-text">NEBULA CHANNEL 01</span>\n' +
'      </div>\n' +
'    </label>\n' +
'    <label class="radio-btn-group">\n' +
'      <input type="radio" name="cyber" value="2">\n' +
'      <div class="switch-card">\n' +
'        <div class="scanline"></div>\n' +
'        <svg class="hex-icon" viewBox="0 0 24 24"><polygon points="12 2 21 7 21 17 12 22 3 17 3 7"/></svg>\n' +
'        <span class="switch-text">QUASAR MATRIX 02</span>\n' +
'      </div>\n' +
'    </label>\n' +
'    <label class="radio-btn-group">\n' +
'      <input type="radio" name="cyber" value="3">\n' +
'      <div class="switch-card">\n' +
'        <div class="scanline"></div>\n' +
'        <svg class="hex-icon" viewBox="0 0 24 24"><polygon points="12 2 21 7 21 17 12 22 3 17 3 7"/></svg>\n' +
'        <span class="switch-text">PULSAR REACTOR 03</span>\n' +
'      </div>\n' +
'    </label>\n' +
'  </div>\n' +
'  <script>\n' +
'    // Cyberpunk Mechanical Audio Feedback\n' +
'    let audioCtx = null;\n' +
'    function playClick() {\n' +
'      try {\n' +
'        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();\n' +
'        const osc = audioCtx.createOscillator();\n' +
'        const gain = audioCtx.createGain();\n' +
'        osc.type = "sine";\n' +
'        osc.frequency.setValueAtTime(800, audioCtx.currentTime);\n' +
'        osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.08);\n' +
'        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);\n' +
'        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);\n' +
'        osc.connect(gain); gain.connect(audioCtx.destination);\n' +
'        osc.start(); osc.stop(audioCtx.currentTime + 0.08);\n' +
'      } catch(e) {}\n' +
'    }\n' +
'    document.querySelectorAll("input[type=radio]").forEach(r => {\n' +
'      r.addEventListener("change", playClick);\n' +
'    });\n' +
'  <\/script>\n' +
'</body>\n' +
'</html>';
  }
};
// --------------------------------------------------------
// 10. Ephemeral Flower #2 — Three.js Vertex Shader
// Author: Paul West / prisoner849 (@prisoner849) (https://codepen.io/editor/prisoner849/pen/019fff34-dce9-769c-98ce-6bd8c954b2e1)
// --------------------------------------------------------
window.EffectRegistry['prisoner849-ephemeral-flower'] = {
  id: 'prisoner849-ephemeral-flower',
  title: "Ephemeral Flower #2 — Three.js Vertex Shader",
  category: 'Physics & Simulation',
  tech: 'Three.js & Custom GLSL Vertex Shader',
  github: 'https://codepen.io/editor/prisoner849/pen/019fff34-dce9-769c-98ce-6bd8c954b2e1',
  description: "Wiskundig gegenereerde driedimensionale procedurale bloem met dynamisch golvende bloembladen in WebGL.",
  defaultSettings: {
  "bloomSpeed": 1,
  "petalColor": "#ff2d55",
  "centerColor": "#ffcc00",
  "bgColor": "#050508"
},
  controls: [
  {
    "type": "range",
    "key": "bloomSpeed",
    "label": "Bloeisnelheid",
    "min": 0.2,
    "max": 3,
    "step": 0.1
  },
  {
    "type": "color",
    "key": "petalColor",
    "label": "Bloemblad Kleur"
  },
  {
    "type": "color",
    "key": "centerColor",
    "label": "Centrum Kleur"
  },
  {
    "type": "color",
    "key": "bgColor",
    "label": "Achtergrond"
  }
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
    this.iframe.setAttribute('title', "Ephemeral Flower #2 — Three.js Vertex Shader");

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

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    let base = "<!doctype html>\n<html lang=\"en\">\n  <head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap\" rel=\"stylesheet\">\n\n<meta property=\"og:description\" content=\"Made on CodePen by Paul\">\n<meta property=\"og:image\" content=\"https://019fff34-dce9-769c-98ce-6bd8c954b2e1.codepen.dev/.codepen/screenshots/693825342413fde08ee0a83f378a61337edf8e1bb387d1f3437010a24d3b4f9f/1280.jpg\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<link rel=\"icon\" href=\"https://public.codepenassets.com/favicon/favicon.ico\">\n\n<script type=\"importmap\">\n{\n  \"imports\": {\n    \"three\": \"https://unpkg.com/three@0.185.0/build/three.module.js\",\n    \"three/\": \"https://esm.sh/three@^0.185.1/\",\n    \"three/addons/\": \"https://unpkg.com/three@0.185.0/examples/jsm/\"\n  }\n}\n</script>\n\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Pen</title>\n    <style>\n      body {\n        overflow: hidden;\n        margin: 0;\n      }\n    </style>\n  </head>\n  <body>\n    \n    <script>\n      const noise3d = `\n      //\tSimplex 3D Noise \n//\tby Ian McEwan, Stefan Gustavson (https://github.com/stegu/webgl-noise)\n//\nvec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\nvec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\n\nfloat snoise(vec3 v){ \n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //  x0 = x0 - 0. + 0.0 * C \n  vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n  vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n  vec3 x3 = x0 - 1. + 3.0 * C.xxx;\n\n// Permutations\n  i = mod(i, 289.0 ); \n  vec4 p = permute( permute( permute( \n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients\n// ( N*N points uniformly over a square, mapped onto an octahedron.)\n  float n_ = 1.0/7.0; // N=7\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), \n                                dot(p2,x2), dot(p3,x3) ) );\n}\n`;\n    </script>\n    <script type=\"module\">\n      import * as THREE from \"three\";\n      import { OrbitControls } from \"three/addons/controls/OrbitControls.js\";\n\n      import { MeshSurfaceSampler } from \"three/addons/math/MeshSurfaceSampler.js\";\n\n      import { mergeGeometries } from \"three/addons/utils/BufferGeometryUtils.js\";\n\n      console.clear();\n\n      console.log(THREE.MathUtils.DEG2RAD)\n\n      const gu = {\n        time: {value: 0},\n        timeDelta: {value: 0}\n      }\n      \n      const baseColor = new THREE.Color(\"#01eeff\");\n\n      class PointFlower extends THREE.Points{\n        constructor(amount = 50000){\n\n          const petalAmount = 51;\n          const basePetal = mergeGeometries([\n            new THREE.RingGeometry(1, 0.75, 64, 4),\n            new THREE.RingGeometry(0.5, 0.3, 64, 4),\n            new THREE.PlaneGeometry(0.2, 2, 1, 20)\n          ]).translate(0, 1, 0).scale(0.5, 1, 1);\n          const petalGeometry = (w, h, flatRatio) => {\n            const g = basePetal.clone();\n            const pos = g.attributes.position;\n            for(let i = 0; i < pos.count; i++){\n      \t\t\t  const xVal = pos.getX(i);\n      \t\t\t  const zVal = (1. - Math.sqrt(1. - (THREE.MathUtils.clamp(xVal / 0.5, -1, 1) ** 2))) * 0.25;\n              const yVal = pos.getY(i);\n              const curve = Math.pow(THREE.MathUtils.smoothstep(yVal, 0, 2), 3);\n      \t\t\t  const z = zVal + curve * flatRatio;\n              pos.setZ(i, z);\n            }\n            return g.scale(w, h, 1);\n          };\n\n          const goldenAngle = Math.PI * (3 - Math.sqrt(5));\n          const baseGeometry = mergeGeometries(\n            Array.from({length: petalAmount}, (_, petalIdx) => {\n              const ratio = petalIdx / (petalAmount);\n              const inclination = (0.1 + 0.5 * THREE.MathUtils.smootherstep(ratio, 0, 1)) * Math.PI;\n              const w = ratio * 0.25 + 0.75;\n              const h = ratio * 0.25 + 0.75;\n              const flattening = 0.1 + 0.9 * ratio;\n              return petalGeometry(w, h, flattening).rotateX(-inclination).rotateY(goldenAngle * petalIdx);\n            })\n          );\n\n          const mss = new MeshSurfaceSampler(new THREE.Mesh(baseGeometry)).build();\n\n          const g = new THREE.BufferGeometry().setFromPoints(\n            Array.from({length: amount}, () => {\n              const v = new THREE.Vector3();\n              mss.sample(v);\n              return v;\n            })\n          ).setAttribute(\"phase\", new THREE.Float32BufferAttribute(\n            Array.from({length: amount}, () => {return [Math.random(), Math.random()]}).flat(),\n            2\n          ));\n\n          const m = new THREE.PointsMaterial({\n            color: \"#0088ff\",\n            map: (() => {\n              const c = document.createElement(\"canvas\");\n              c.width = c.height = 256;\n              const half = c.width * 0.5;\n              const ctx = c.getContext(\"2d\");\n              const grd = ctx.createRadialGradient(half, half, half * 0.5, half, half, half);\n              grd.addColorStop(0, \"rgba(255, 255, 255, 0.75\");\n              grd.addColorStop(1, \"rgba(255, 255, 255, 0\");\n              ctx.fillStyle = grd;\n              ctx.fillRect(0, 0, c.width, c.height);\n\n              const tex = new THREE.CanvasTexture(c);\n              tex.colorSpace = \"srgb\";\n              tex.anisotropy = 16;\n              return tex;\n            })(),\n            size: 0.15,\n            transparent: true,\n            depthWrite: false,\n            blending: THREE.CustomBlending,\n            blendSrc: THREE.SrcAlphaFactor,\n            blendDst: THREE.OneFactor,\n            onBeforeCompile: shader => {\n              shader.uniforms.time = gu.time;\n              shader.vertexShader = `\n                uniform float time;\n                attribute vec2 phase;\n                ${shader.vertexShader}\n              `.replace(\n                `#include <begin_vertex>`,\n                `#include <begin_vertex>\n                \n                  float shift = fract(time * 0.1 + phase.y);\n                  float shiftSize = sin((1. - (shift - 0.5) * 2.) * PI);\n                  transformed.y += shift * 0.75;\n                `\n              ).replace(\n                `gl_PointSize = size;`,\n                `\n                float sizePhase = sin((time * 0.25 + phase.x) * PI2) * 1. + 0.;\n                gl_PointSize = size * sizePhase * shiftSize;`\n              );\n            }\n          });\n\n          super(g, m);\n          \n          this.add(\n            new THREE.Mesh(\n              baseGeometry, \n              new THREE.MeshBasicMaterial({\n                wireframe:true, \n                color: \"#fef\",\n                transparent: true,\n                opacity: 0.05,\n                blending: THREE.AdditiveBlending,\n                depthWrite: false\n              })\n            )\n          );\n          this.children[0].position.y = 0.01;\n        }\n      }\n      \n      class PointField extends THREE.Points{\n        constructor(amount = 25000){\n          \n          const g = new THREE.BufferGeometry().setFromPoints(\n            Array.from({length: amount}, () => {\n              const r = (1. - Math.sqrt(1. - (Math.random() ** 0.75))) * 10;\n              const a = Math.random() * Math.PI * 2;\n              return new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r);\n            })\n          ).setAttribute(\"phaseBlink\", new THREE.Float32BufferAttribute(\n            Array.from({length: amount}, () => {return Math.random()}),\n            1\n          ));\n          \n\n          const m = new THREE.PointsMaterial({\n            color: baseColor.clone().multiplyScalar(0.1),\n            size: 0.25,\n            blending: THREE.AdditiveBlending,\n            transparent: true,\n            depthWrite: false,\n            map: (() => {\n              const c = document.createElement(\"canvas\");\n              c.width = c.height = 256;\n              const half = c.width * 0.5;\n              const ctx = c.getContext(\"2d\");\n              const grd = ctx.createRadialGradient(half, half, half * 0.01, half, half, half);\n              grd.addColorStop(0, \"rgba(255, 255, 255, 1\");\n              grd.addColorStop(1, \"rgba(255, 255, 255, 0\");\n              ctx.fillStyle = grd;\n              ctx.fillRect(0, 0, c.width, c.height);\n\n              const tex = new THREE.CanvasTexture(c);\n              tex.colorSpace = \"srgb\";\n              tex.anisotropy = 16;\n              return tex;\n            })(),\n            onBeforeCompile: shader => {\n              shader.uniforms.time = gu.time;\n              shader.vertexShader = `\n                uniform float time;\n                attribute float phaseBlink;\n\n                ${noise3d}\n                \n                ${shader.vertexShader}\n              `.replace(\n                `#include <color_vertex>`,\n                `\n                float noiseVal = snoise(vec3(position.xz * 0.25, time * 0.1));\n                #include <color_vertex>`\n              ).replace(\n                `#include <begin_vertex>`,\n                `#include <begin_vertex>\n                  float calmVal = smoothstep(0., 2.5, length(position.xz));\n                  transformed.y = noiseVal * 0.5 * calmVal;\n                `\n              ).replace(\n                `gl_PointSize = size;`,\n                `\n                float sizePhase = sin((time * 0.25 + phaseBlink) * PI2) * 0.5 + 0.5;\n                gl_PointSize = size * sizePhase;`\n              );\n            }\n          });\n\n          super(g, m);\n        }\n      }\n\n      const scene = new THREE.Scene();\n      const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 100);\n      camera.position.set(0, 0.3, 1).setLength(5);\n      const renderer = new THREE.WebGLRenderer({antialias: true});\n      renderer.setPixelRatio(devicePixelRatio);\n      renderer.setSize(innerWidth, innerHeight);\n      document.body.appendChild(renderer.domElement);\n\n      addEventListener(\"resize\", () => {\n        camera.aspect = innerWidth / innerHeight;\n        camera.updateProjectionMatrix();\n        renderer.setSize(innerWidth, innerHeight);\n      });\n\n      const camShift = new THREE.Vector3(0, 0.5, 0);\n      const controls = new OrbitControls(camera, renderer.domElement);\n      controls.enableDamping = true;\n      controls.minPolarAngle = Math.PI * 0.1;\n      controls.maxPolarAngle = Math.PI * 0.45;\n      controls.target.add(camShift);\n      controls.object.position.add(camShift);\n      \n      const pointField = new PointField();\n      scene.add(pointField);\n      const pointFlower = new PointFlower();\n      scene.add(pointFlower);\n      \n      const clock = new THREE.Timer();\n      clock.connect(document);\n      let t = 0;\n      \n      renderer.setAnimationLoop(() => {\n        clock.update();\n        const dt = clock.getDelta();\n        t += dt;\n        gu.time.value = t;\n        gu.timeDelta.value = dt;\n        controls.update();\n        renderer.render(scene, camera);\n      });\n    </script>\n  </body>\n</html>\n";

    // Inject customization overrides into base
    const customStyles = [];
    let customScript = '';

    
      customStyles.push(`
        body, html { background: ${s.bgColor || '#050508'} !important; }
      `);
      

    if (customStyles.length > 0) {
      const styleBlock = `<style id="superduper-fx-overrides">
${customStyles.join('\n')}
</style>`;
      if (base.includes('</head>')) {
        base = base.replace('</head>', `${styleBlock}
</head>`);
      } else {
        base = styleBlock + base;
      }
    }

    if (customScript) {
      const scriptBlock = `<script id="superduper-fx-script">
${customScript}
<\/script>`;
      if (base.includes('</body>')) {
        base = base.replace('</body>', `${scriptBlock}
</body>`);
      } else {
        base = base + scriptBlock;
      }
    }

    return base;
  }
};

// --------------------------------------------------------
// 11. Infinite Cylinder Media Gallery (Three.js)
// Author: Daniel Muñoz (@daniel-mu-oz) (https://codepen.io/editor/daniel-mu-oz/pen/019ff149-8cea-7d08-bc76-29a54cd08f79)
// --------------------------------------------------------
window.EffectRegistry['daniel-munoz-infinite-gallery'] = {
  id: 'daniel-munoz-infinite-gallery',
  title: "Infinite Cylinder Media Gallery (Three.js)",
  category: 'Image Effect',
  tech: 'Three.js 3D Cylindrical Texture Mapping',
  github: 'https://codepen.io/editor/daniel-mu-oz/pen/019ff149-8cea-7d08-bc76-29a54cd08f79',
  description: "Doorlopende roterende cilindrische fotogalerij in Three.js met soepele inertia-scroll en lensvervorming.",
  defaultSettings: {
  "fontFamily": "'Space Grotesk', sans-serif",
  "customLabel": "IG—2026 / INFINITE_GALLERY",
  "rollSpeed": 1,
  "tintColor": "#00d2ff",
  "bgColor": "#0a0a0e"
},
  controls: [
  {
    "type": "select",
    "key": "fontFamily",
    "label": "Lettertype (Font)",
    "options": [
      {
        "value": "'Space Grotesk', sans-serif",
        "label": "Space Grotesk (Brutalist)"
      },
      {
        "value": "'Montserrat', sans-serif",
        "label": "Montserrat (Modern)"
      },
      {
        "value": "'Cinzel', serif",
        "label": "Cinzel (Serif)"
      },
      {
        "value": "'Fira Code', monospace",
        "label": "Fira Code (Code)"
      }
    ]
  },
  {
    "type": "text",
    "key": "customLabel",
    "label": "Galerij Badge Label"
  },
  {
    "type": "range",
    "key": "rollSpeed",
    "label": "Rolsnelheid",
    "min": 0.2,
    "max": 3,
    "step": 0.1
  },
  {
    "type": "color",
    "key": "tintColor",
    "label": "Accent Tint"
  },
  {
    "type": "color",
    "key": "bgColor",
    "label": "Achtergrond"
  }
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
    this.iframe.setAttribute('title', "Infinite Cylinder Media Gallery (Three.js)");

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

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    let base = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap\" rel=\"stylesheet\">\n\n<meta property=\"og:description\" content=\"Made on CodePen by Daniel Muñoz\">\n<meta property=\"og:image\" content=\"https://019ff149-8cea-7d08-bc76-29a54cd08f79.codepen.dev/.codepen/screenshots/609af37ce3d708e09940c7d01362cd4a1acc3ded1a6a1d206ff3677d2bf2f5cb/1280.jpg\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<link rel=\"icon\" href=\"https://public.codepenassets.com/favicon/favicon.ico\">\n\n<script type=\"importmap\">\n{\n  \"imports\": {\n    \"gsap\": \"https://cdn.jsdelivr.net/npm/gsap@3.13.0/+esm\",\n    \"three\": \"https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js\"\n  }\n}\n</script>\n\n    <meta charset=\"UTF-8\">\n    <style>\n*,\n*::before,\n*::after {\n\tbox-sizing: border-box;\n\tmargin: 0;\n\tpadding: 0;\n}\n\n:root {\n\t--ice: #8fa6c8;\n\t--accent: #6fd4ff;\n\t--bg: #000000;\n\t--mono: \"Courier New\", Courier, monospace;\n}\n\nhtml,\nbody {\n\theight: 100%;\n}\n\nbody {\n\tbackground: var(--bg);\n\tcolor: var(--ice);\n\toverflow: hidden;\n\tcursor: crosshair;\n\tfont-family: var(--mono);\n}\n\n.webgl {\n\tposition: fixed;\n\tinset: 0;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 0;\n\tdisplay: block;\n\ttouch-action: none;\n}\n\n.vignette {\n\tposition: fixed;\n\tinset: 0;\n\tz-index: 2;\n\tpointer-events: none;\n\tbackground: radial-gradient(\n\t\tellipse at center,\n\t\ttransparent 42%,\n\t\trgba(0, 0, 0, 0.7) 100%\n\t);\n}\n\n.logo {\n\tposition: fixed;\n\ttop: 1.6rem;\n\tleft: 2.2rem;\n\tz-index: 10;\n\tfont-size: 0.66rem;\n\tletter-spacing: 0.34em;\n\topacity: 0.5;\n}\n\n.brand {\n\tposition: fixed;\n\ttop: 1.5rem;\n\tright: 2.2rem;\n\tz-index: 10;\n\ttext-align: right;\n\tline-height: 1.8;\n}\n.brand .b1 {\n\tfont-size: 0.72rem;\n\tletter-spacing: 0.18em;\n\tcolor: #e8eef8;\n\tfont-weight: 700;\n}\n.brand .b2 {\n\tfont-size: 0.56rem;\n\tletter-spacing: 0.26em;\n\tcolor: var(--accent);\n\topacity: 0.8;\n}\n.brand .b3 {\n\tfont-size: 0.56rem;\n\tletter-spacing: 0.26em;\n\topacity: 0.42;\n}\n\n.counter {\n\tposition: fixed;\n\tbottom: 1.6rem;\n\tleft: 2.2rem;\n\tz-index: 10;\n\tfont-size: 0.6rem;\n\tletter-spacing: 0.2em;\n\tline-height: 2.1;\n\tcolor: rgba(143, 166, 200, 0.55);\n}\n.counter .n {\n\tcolor: #e8eef8;\n}\n.counter .hint {\n\topacity: 0.45;\n\tfont-size: 0.54rem;\n\tletter-spacing: 0.24em;\n}\n\n.card {\n\tposition: fixed;\n\tleft: 50%;\n\tbottom: 2.4rem;\n\ttransform: translate(-50%, 1.2rem);\n\tz-index: 12;\n\tmin-width: 300px;\n\tpadding: 0.9rem 1.4rem;\n\tborder: 1px solid rgba(143, 166, 200, 0.22);\n\tbackground: rgba(4, 6, 12, 0.72);\n\tbackdrop-filter: blur(6px);\n\topacity: 0;\n\tpointer-events: none;\n\ttransition:\n\t\topacity 0.45s ease,\n\t\ttransform 0.45s ease;\n}\n.card.on {\n\topacity: 1;\n\ttransform: translate(-50%, 0);\n\tpointer-events: auto;\n}\n.card .t {\n\tfont-size: 0.78rem;\n\tletter-spacing: 0.16em;\n\tcolor: #e8eef8;\n}\n.card .m {\n\tmargin-top: 0.35rem;\n\tfont-size: 0.55rem;\n\tletter-spacing: 0.24em;\n\tcolor: var(--accent);\n\topacity: 0.75;\n}\n.card .esc {\n\tmargin-top: 0.55rem;\n\tfont-size: 0.5rem;\n\tletter-spacing: 0.24em;\n\topacity: 0.4;\n}\n\n@media (max-width: 940px) {\n\t.logo,\n\t.brand {\n\t\ttop: 1rem;\n\t}\n\t.logo {\n\t\tleft: 1.1rem;\n\t}\n\t.brand {\n\t\tright: 1.1rem;\n\t}\n\t.counter {\n\t\tleft: 1.1rem;\n\t\tbottom: 1.1rem;\n\t}\n\t.card {\n\t\tmin-width: 0;\n\t\twidth: calc(100% - 2.2rem);\n\t}\n}\n\n</style>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Infinite Gallery</title>\n  </head>\n  <body>\n\n\t\t<canvas class=\"webgl\"></canvas>\n    <div class=\"vignette\"></div>\n\n    <div class=\"logo\">IG—2026 / INFINITE_GALLERY</div>\n\n    <div class=\"brand\">\n      <div class=\"b1\">WEBPROGRAMO CREATIVE LABS</div>\n      <div class=\"b2\">ROLL_MEDIA_GALLERY</div>\n      <div class=\"b3\">VOL. 01 · CORRIDOR</div>\n    </div>\n\n    <div class=\"counter\">\n      OBRA <span class=\"n\">01</span> / <span class=\"tot\">18</span><br />\n      <span class=\"hint\">CLICK PARA ABRIR · ESC PARA VOLVER</span>\n    </div>\n\n    <div class=\"card\">\n      <div class=\"t\">—</div>\n      <div class=\"m\">—</div>\n      <div class=\"esc\">ESC O CLICK PARA VOLVER AL TÚNEL</div>\n    </div>\n\n    \n\n    <script>\nimport * as THREE from \"three\";\nimport gsap from \"gsap\";\n\n// Config\nconst SEG = 420;\nconst HW = 3.2;\nconst HH = 3.2;\nconst GAP = 0;\nconst STATIONS = 110;\nconst RING_RADIUS = 92;\n\nconst params = {\n\tspeed: 0.0075,\n\tcell: 0.8,\n\tgridIntensity: 0.5,\n\tfloorReflect: 0.32,\n\tmouseAmp: 0.12,\n\tfadeFar: 58,\n\tpanelFar: 64,\n};\n\n// Scene\nconst scene = new THREE.Scene();\nscene.background = new THREE.Color(0x000000);\n\nconst camera = new THREE.PerspectiveCamera(\n\t70,\n\twindow.innerWidth / window.innerHeight,\n\t0.1,\n\t160,\n);\n\nconst renderer = new THREE.WebGLRenderer({\n\tcanvas: document.querySelector(\".webgl\"),\n\tantialias: true,\n});\nrenderer.setSize(window.innerWidth, window.innerHeight);\nrenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));\nrenderer.toneMapping = THREE.ACESFilmicToneMapping;\nrenderer.toneMappingExposure = 1.0;\n\nlet seed = 20260725;\nfunction rand() {\n\tseed = (seed * 1664525 + 1013904223) % 4294967296;\n\treturn seed / 4294967296;\n}\n\n// Camino\nconst pathPoints = [];\nconst RING_POINTS = 24;\nfor (let i = 0; i < RING_POINTS; i++) {\n\tconst a = (i / RING_POINTS) * Math.PI * 2;\n\tconst r =\n\t\tRING_RADIUS * (1 + Math.sin(a * 3) * 0.14 + (rand() - 0.5) * 0.06);\n\tpathPoints.push(\n\t\tnew THREE.Vector3(\n\t\t\tMath.cos(a) * r,\n\t\t\tMath.sin(a * 2) * 7 + Math.sin(a * 5) * 2.5,\n\t\t\tMath.sin(a) * r,\n\t\t),\n\t);\n}\nconst curve = new THREE.CatmullRomCurve3(\n\tpathPoints,\n\ttrue,\n\t\"catmullrom\",\n\t0.5,\n);\ncurve.arcLengthDivisions = 4000;\nconst totalLength = curve.getLength();\nconst frames = curve.computeFrenetFrames(SEG, true);\nconst ringPoints = [];\nfor (let i = 0; i <= SEG; i++)\n\tringPoints.push(curve.getPointAt((i % SEG) / SEG));\n\nconst cellV = totalLength / Math.round(totalLength / params.cell);\n\n// Tunel\nconst HWi = HW * (1 - GAP);\nconst HHi = HH * (1 - GAP);\nconst FACES = [\n\t{ off: [HW, 0], a: [0, -HHi], b: [0, HHi] }, // derecha (+B)\n\t{ off: [-HW, 0], a: [0, -HHi], b: [0, HHi] }, // izquierda (-B)\n\t{ off: [0, HH], a: [-HWi, 0], b: [HWi, 0] }, // techo (+N)\n\t{ off: [0, -HH], a: [-HWi, 0], b: [HWi, 0] }, // suelo (-N)\n];\n\nfunction buildTunnel() {\n\tconst pos = [];\n\tconst uv = [];\n\tconst edge = [];\n\tconst idx = [];\n\tconst tmp = new THREE.Vector3();\n\n\tFACES.forEach((face) => {\n\t\tconst base = pos.length / 3;\n\t\tconst span = Math.hypot(face.b[0] - face.a[0], face.b[1] - face.a[1]);\n\n\t\tfor (let i = 0; i <= SEG; i++) {\n\t\t\tconst p = ringPoints[i];\n\t\t\tconst N = frames.normals[i % SEG];\n\t\t\tconst B = frames.binormals[i % SEG];\n\t\t\tconst v = (i / SEG) * totalLength;\n\n\t\t\tfor (let k = 0; k < 2; k++) {\n\t\t\t\tconst c = k === 0 ? face.a : face.b;\n\t\t\t\ttmp\n\t\t\t\t\t.copy(p)\n\t\t\t\t\t.addScaledVector(B, face.off[0] + c[0])\n\t\t\t\t\t.addScaledVector(N, face.off[1] + c[1]);\n\t\t\t\tpos.push(tmp.x, tmp.y, tmp.z);\n\t\t\t\tuv.push(k * span, v);\n\t\t\t\tedge.push(k);\n\t\t\t}\n\t\t}\n\n\t\tfor (let i = 0; i < SEG; i++) {\n\t\t\tconst a = base + i * 2;\n\t\t\tidx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);\n\t\t}\n\t});\n\n\tconst geo = new THREE.BufferGeometry();\n\tgeo.setAttribute(\"position\", new THREE.Float32BufferAttribute(pos, 3));\n\tgeo.setAttribute(\"uv\", new THREE.Float32BufferAttribute(uv, 2));\n\tgeo.setAttribute(\"aEdge\", new THREE.Float32BufferAttribute(edge, 1));\n\tgeo.setIndex(idx);\n\treturn geo;\n}\n\nconst gridMaterial = new THREE.ShaderMaterial({\n\tuniforms: {\n\t\tuCellU: { value: params.cell },\n\t\tuCellV: { value: cellV },\n\t\tuColor: { value: new THREE.Color(0x8fa6c8) },\n\t\tuAccent: { value: new THREE.Color(0x6fd4ff) },\n\t\tuIntensity: { value: params.gridIntensity },\n\t\tuTime: { value: 0 },\n\t\tuFar: { value: params.fadeFar },\n\t\tuHeadV: { value: 0 },\n\t\tuLoop: { value: totalLength },\n\t},\n\tvertexShader: /* glsl */ `\n\t\tattribute float aEdge;\n\t\tvarying vec2 vUv;\n\t\tvarying float vEdge;\n\t\tvarying float vDist;\n\n\t\tvoid main() {\n\t\t\tvUv = uv;\n\t\t\tvEdge = aEdge;\n\t\t\tvec4 mv = modelViewMatrix * vec4(position, 1.0);\n\t\t\tvDist = -mv.z;\n\t\t\tgl_Position = projectionMatrix * mv;\n\t\t}\n\t`,\n\tfragmentShader: /* glsl */ `\n\t\tuniform float uCellU;\n\t\tuniform float uCellV;\n\t\tuniform vec3 uColor;\n\t\tuniform vec3 uAccent;\n\t\tuniform float uIntensity;\n\t\tuniform float uTime;\n\t\tuniform float uFar;\n\t\tuniform float uHeadV;\n\t\tuniform float uLoop;\n\n\t\tvarying vec2 vUv;\n\t\tvarying float vEdge;\n\t\tvarying float vDist;\n\n\t\tfloat gridLine(float x, float cell) {\n\t\t\tfloat c = x / cell;\n\t\t\tfloat d = abs(fract(c - 0.5) - 0.5) / max(fwidth(c), 1e-5);\n\t\t\treturn 1.0 - clamp(d, 0.0, 1.0);\n\t\t}\n\n\t\tvoid main() {\n\t\t\tfloat lu = gridLine(vUv.x, uCellU);\n\t\t\tfloat lv = gridLine(vUv.y, uCellV);\n\t\t\tfloat line = max(lu, lv);\n\n\t\t\tfloat e = min(vEdge, 1.0 - vEdge);\n\t\t\tfloat rim = 1.0 - clamp(e / max(fwidth(vEdge), 1e-5), 0.0, 1.0);\n\n\t\t\tfloat wave = 0.5 + 0.5 * sin(vUv.y * 0.055 - uTime * 0.35);\n\n\t\t\tfloat dv = mod(vUv.y - uHeadV + uLoop * 0.5, uLoop) - uLoop * 0.5;\n\t\t\tfloat win =\n\t\t\t\tsmoothstep(-16.0, -7.0, dv) * (1.0 - smoothstep(uFar * 0.3, uFar, dv));\n\n\t\t\tfloat fadeNear = smoothstep(0.6, 7.0, vDist);\n\t\t\tfloat fade = win * fadeNear;\n\n\t\t\tfloat a = (line * 0.8 + rim * 0.95) * uIntensity * fade;\n\t\t\ta *= mix(0.78, 1.12, wave);\n\t\t\tif (a < 0.002) discard;\n\n\t\t\tvec3 col = mix(uColor, uAccent, rim * 0.5 + wave * 0.12);\n\t\t\tgl_FragColor = vec4(col, a);\n\t\t}\n\t`,\n\ttransparent: true,\n\tdepthWrite: false,\n\tside: THREE.DoubleSide,\n\tblending: THREE.AdditiveBlending,\n});\n\nconst tunnel = new THREE.Mesh(buildTunnel(), gridMaterial);\ntunnel.frustumCulled = false;\nscene.add(tunnel);\n\n// Medios\nconst IMG = (seed, w, h) =>\n\t`https://picsum.photos/seed/${seed}/${w}/${h}`;\n\nconst MEDIA = [\n\t{ type: \"image\", src: IMG(\"ig-a1\", 900, 1200), title: \"PRISM STATE\" },\n\t{ type: \"image\", src: IMG(\"ig-a2\", 1400, 900), title: \"SOFT MACHINE\" },\n\t{ type: \"image\", src: IMG(\"ig-a3\", 1000, 1000), title: \"NULL PORTRAIT\" },\n\t{ type: \"image\", src: IMG(\"ig-a4\", 1200, 800), title: \"COLD BLOOM\" },\n\t{ type: \"image\", src: IMG(\"ig-a5\", 800, 1200), title: \"SILENT INDEX\" },\n\t{ type: \"image\", src: IMG(\"ig-a6\", 1400, 1000), title: \"GHOST FRAME\" },\n\t{ type: \"image\", src: IMG(\"ig-a7\", 1100, 900), title: \"LATE SIGNAL\" },\n\t{ type: \"image\", src: IMG(\"ig-a8\", 900, 1400), title: \"PAPER SUN\" },\n\t{ type: \"loop\", src: \"gen:deep\", title: \"DEEP SET\" },\n\t{ type: \"loop\", src: \"gen:cells\", title: \"CELL DRIFT\" },\n\t{ type: \"loop\", src: \"gen:flux\", title: \"FLUX FIELD\" },\n\t{ type: \"loop\", src: \"gen:scan\", title: \"SCAN LINES\" },\n\t{ type: \"loop\", src: \"gen:moire\", title: \"MOIRE 07\" },\n];\n\n// Patrones procedurales\nconst INK = \"#04070d\";\n\nfunction bg(ctx, w, h) {\n\tctx.fillStyle = INK;\n\tctx.fillRect(0, 0, w, h);\n\tconst g = ctx.createRadialGradient(\n\t\tw / 2,\n\t\th * 0.45,\n\t\t0,\n\t\tw / 2,\n\t\th * 0.45,\n\t\tMath.hypot(w, h) * 0.55,\n\t);\n\tg.addColorStop(0, \"rgba(111,212,255,0.10)\");\n\tg.addColorStop(1, \"rgba(111,212,255,0)\");\n\tctx.fillStyle = g;\n\tctx.fillRect(0, 0, w, h);\n}\n\nconst PATTERNS = {\n\tdeep(ctx, w, h, t) {\n\t\tbg(ctx, w, h);\n\t\tconst cx = w / 2;\n\t\tconst cy = h / 2;\n\t\tconst R = Math.hypot(w, h) * 0.62;\n\t\tfor (let i = 0; i < 26; i++) {\n\t\t\tconst p = ((i / 26 + t * 0.06) % 1 + 1) % 1;\n\t\t\tctx.beginPath();\n\t\t\tctx.arc(cx, cy, p * R, 0, Math.PI * 2);\n\t\t\tctx.strokeStyle = `rgba(111,212,255,${0.55 * (1 - p)})`;\n\t\t\tctx.lineWidth = 1 + (1 - p) * 2.6;\n\t\t\tctx.stroke();\n\t\t}\n\t},\n\tcells(ctx, w, h, t) {\n\t\tbg(ctx, w, h);\n\t\tconst n = 16;\n\t\tconst cw = w / n;\n\t\tconst ch = h / n;\n\t\tconst m = cw * 0.16;\n\t\tfor (let y = 0; y < n; y++) {\n\t\t\tfor (let x = 0; x < n; x++) {\n\t\t\t\tconst v =\n\t\t\t\t\t0.5 +\n\t\t\t\t\t0.5 *\n\t\t\t\t\t\tMath.sin(\n\t\t\t\t\t\t\tx * 0.9 + y * 0.6 + t * 1.3 + Math.sin(y * 1.7 - t * 0.6) * 1.2,\n\t\t\t\t\t\t);\n\t\t\t\tif (v < 0.5) continue;\n\t\t\t\tctx.fillStyle = `rgba(143,166,200,${((v - 0.5) / 0.5) * 0.72})`;\n\t\t\t\tctx.fillRect(x * cw + m, y * ch + m, cw - m * 2, ch - m * 2);\n\t\t\t}\n\t\t}\n\t},\n\tflux(ctx, w, h, t) {\n\t\tbg(ctx, w, h);\n\t\tctx.lineWidth = 2;\n\t\tfor (let i = 0; i < 44; i++) {\n\t\t\tconst y0 = (i / 44) * h;\n\t\t\tctx.beginPath();\n\t\t\tfor (let x = 0; x <= w; x += 16) {\n\t\t\t\tconst y =\n\t\t\t\t\ty0 +\n\t\t\t\t\tMath.sin(x * 0.012 + t * 0.9 + i * 0.32) * 14 +\n\t\t\t\t\tMath.sin(x * 0.03 - t * 0.5) * 6;\n\t\t\t\tif (x === 0) ctx.moveTo(x, y);\n\t\t\t\telse ctx.lineTo(x, y);\n\t\t\t}\n\t\t\tctx.strokeStyle = `rgba(111,212,255,${\n\t\t\t\t0.16 + 0.26 * (0.5 + 0.5 * Math.sin(i * 0.5 + t))\n\t\t\t})`;\n\t\t\tctx.stroke();\n\t\t}\n\t},\n\tscan(ctx, w, h, t) {\n\t\tbg(ctx, w, h);\n\t\tconst sweep = ((((t * 0.18) % 1) + 1) % 1) * h;\n\t\tfor (let y = 0; y < h; y += 4) {\n\t\t\tconst d = Math.abs(y - sweep) / (h * 0.28);\n\t\t\tctx.fillStyle = `rgba(143,166,200,${0.1 + 0.6 * Math.max(0, 1 - d)})`;\n\t\t\tctx.fillRect(0, y, w, 1.6);\n\t\t}\n\t\tctx.fillStyle = \"rgba(111,212,255,0.14)\";\n\t\tctx.fillRect(0, sweep - 2, w, 4);\n\t},\n\tmoire(ctx, w, h, t) {\n\t\tbg(ctx, w, h);\n\t\tctx.globalCompositeOperation = \"lighter\";\n\t\tconst R = Math.hypot(w, h);\n\t\tfor (let k = 0; k < 2; k++) {\n\t\t\tctx.save();\n\t\t\tctx.translate(w / 2, h / 2);\n\t\t\tctx.rotate((k ? -1 : 1) * (0.06 + 0.05 * Math.sin(t * 0.35 + k)));\n\t\t\tctx.strokeStyle = k\n\t\t\t\t? \"rgba(111,212,255,0.34)\"\n\t\t\t\t: \"rgba(143,166,200,0.34)\";\n\t\t\tctx.lineWidth = 2;\n\t\t\tfor (let x = -R / 2; x < R / 2; x += 9) {\n\t\t\t\tctx.beginPath();\n\t\t\t\tctx.moveTo(x, -R / 2);\n\t\t\t\tctx.lineTo(x, R / 2);\n\t\t\t\tctx.stroke();\n\t\t\t}\n\t\t\tctx.restore();\n\t\t}\n\t\tctx.globalCompositeOperation = \"source-over\";\n\t},\n};\n\n// Carga de texturas\nconst textureLoader = new THREE.TextureLoader();\ntextureLoader.setCrossOrigin(\"anonymous\");\nconst maxAniso = renderer.capabilities.getMaxAnisotropy();\n\nconst imageSlots = new Map();\nconst loopSlots = new Map();\nconst loopEntries = [];\n\nfunction loadMedia(entry, onAspect) {\n\tif (entry.type === \"image\") {\n\t\tlet slot = imageSlots.get(entry.src);\n\t\tif (!slot) {\n\t\t\tslot = { aspect: 1, ready: false, waiting: [] };\n\t\t\tslot.texture = textureLoader.load(entry.src, (t) => {\n\t\t\t\tslot.aspect = t.image.width / t.image.height;\n\t\t\t\tslot.ready = true;\n\t\t\t\tslot.waiting.forEach((fn) => fn(slot.aspect));\n\t\t\t\tslot.waiting.length = 0;\n\t\t\t});\n\t\t\tslot.texture.colorSpace = THREE.SRGBColorSpace;\n\t\t\tslot.texture.anisotropy = maxAniso;\n\t\t\timageSlots.set(entry.src, slot);\n\t\t}\n\t\tif (slot.ready) onAspect(slot.aspect);\n\t\telse slot.waiting.push(onAspect);\n\t\treturn { texture: slot.texture };\n\t}\n\n\tlet slot = loopSlots.get(entry.src);\n\tif (!slot) {\n\t\tconst canvas = document.createElement(\"canvas\");\n\t\tcanvas.width = 512;\n\t\tcanvas.height = 640;\n\t\tconst ctx = canvas.getContext(\"2d\");\n\t\tconst tex = new THREE.CanvasTexture(canvas);\n\t\ttex.colorSpace = THREE.SRGBColorSpace;\n\t\ttex.minFilter = THREE.LinearFilter;\n\t\ttex.magFilter = THREE.LinearFilter;\n\t\ttex.generateMipmaps = false;\n\t\tslot = {\n\t\t\tsrc: entry.src,\n\t\t\tcanvas,\n\t\t\tctx,\n\t\t\ttexture: tex,\n\t\t\taspect: canvas.width / canvas.height,\n\t\t\tdraw: PATTERNS[entry.src.slice(4)],\n\t\t\tactive: true,\n\t\t\tpanels: [],\n\t\t};\n\t\tslot.draw(ctx, canvas.width, canvas.height, 0);\n\t\tloopSlots.set(entry.src, slot);\n\t\tloopEntries.push(slot);\n\t}\n\tonAspect(slot.aspect);\n\treturn { texture: slot.texture, loopSlot: slot };\n}\n\n// Material de panel\nconst panelVertex = /* glsl */ `\n\tvarying vec2 vUv;\n\tvarying float vDist;\n\n\tvoid main() {\n\t\tvUv = uv;\n\t\tvec4 mv = modelViewMatrix * vec4(position, 1.0);\n\t\tvDist = -mv.z;\n\t\tgl_Position = projectionMatrix * mv;\n\t}\n`;\n\nconst panelFragment = /* glsl */ `\n\tuniform sampler2D uMap;\n\tuniform vec2 uCrop;\n\tuniform vec3 uFrame;\n\tuniform float uHover;\n\tuniform float uReflect;\n\tuniform float uFar;\n\tuniform float uOpacity;\n\n\tvarying vec2 vUv;\n\tvarying float vDist;\n\n\tvoid main() {\n\t\tvec2 uv = 0.5 + (vUv - 0.5) * uCrop;\n\t\tvec3 col = texture2D(uMap, uv).rgb;\n\n\t\tvec2 d = min(vUv, 1.0 - vUv);\n\t\tfloat edge = 1.0 - smoothstep(0.0, 0.012, min(d.x, d.y));\n\t\tfloat halo = 1.0 - smoothstep(0.012, 0.06, min(d.x, d.y));\n\n\t\tcol *= mix(1.0, 1.16, uHover);\n\t\tcol += uFrame * edge * mix(0.22, 0.85, uHover);\n\t\tcol += uFrame * halo * mix(0.03, 0.16, uHover);\n\n\t\tfloat fade = 1.0 - smoothstep(uFar * 0.55, uFar, vDist);\n\n\t\tif (uReflect > 0.5) {\n\t\t\tfloat a = uOpacity * fade * (1.0 - smoothstep(0.0, 0.8, vUv.y));\n\t\t\tif (a < 0.004) discard;\n\t\t\tgl_FragColor = vec4(col * 0.72, a);\n\t\t} else {\n\t\t\tgl_FragColor = vec4(col * fade, 1.0);\n\t\t}\n\t}\n`;\n\nconst raycaster = new THREE.Raycaster();\nconst panels = [];\n\n// Paneles\nconst WALL_FOOTPRINTS = [\n\t[3, 5],\n\t[4, 6],\n\t[6, 4],\n\t[2, 3],\n\t[5, 5],\n\t[3, 4],\n\t[7, 4],\n];\nconst CAP_FOOTPRINTS = [\n\t[5, 3],\n\t[4, 4],\n\t[6, 4],\n\t[3, 2],\n];\n\nconst FACE_ORDER = [\n\t0, 1, 2, 0, 1, 3, 0, 1, 2, 0, 1, 0, 1, 3, 0, 1, 2, 0, 1, 0, 3, 1, 0, 2,\n\t1, 0,\n];\n\nconst IMAGES = MEDIA.filter((m) => m.type === \"image\");\nconst LOOPS = MEDIA.filter((m) => m.type === \"loop\");\n\nfunction mediaFor(i) {\n\treturn i % 3 === 2\n\t\t? LOOPS[Math.floor(i / 3) % LOOPS.length]\n\t\t: IMAGES[(i - Math.floor(i / 3)) % IMAGES.length];\n}\n\nconst CELLS_ACROSS = Math.round((2 * HW) / params.cell);\nlet vSlot = 0;\n\nconst _p = new THREE.Vector3();\nconst _n = new THREE.Vector3();\nconst _b = new THREE.Vector3();\nconst _v = new THREE.Vector3();\n\nfunction frameAt(t, outP, outN, outB) {\n\tconst tt = ((t % 1) + 1) % 1;\n\tconst f = tt * SEG;\n\tconst i0 = Math.floor(f) % SEG;\n\tconst i1 = (i0 + 1) % SEG;\n\tconst k = f - Math.floor(f);\n\toutP.copy(curve.getPointAt(tt));\n\toutN.copy(frames.normals[i0]).lerp(frames.normals[i1], k).normalize();\n\toutB.copy(frames.binormals[i0]).lerp(frames.binormals[i1], k).normalize();\n}\n\nfunction surfacePoint(faceId, v, across, out) {\n\tframeAt(v / totalLength, _p, _n, _b);\n\tout.copy(_p);\n\tif (faceId === 0)\n\t\tout.addScaledVector(_b, HW - 0.03).addScaledVector(_n, across);\n\telse if (faceId === 1)\n\t\tout.addScaledVector(_b, -(HW - 0.03)).addScaledVector(_n, across);\n\telse if (faceId === 2)\n\t\tout.addScaledVector(_n, HH - 0.03).addScaledVector(_b, across);\n\telse out.addScaledVector(_n, -(HH - 0.03)).addScaledVector(_b, across);\n\treturn out;\n}\n\nfunction buildPanelGeometry(faceId, v0, v1, a0, a1) {\n\tconst wall = faceId < 2;\n\tconst steps = Math.max(\n\t\t2,\n\t\tMath.ceil(Math.abs(v1 - v0) / (cellV * 0.34)),\n\t);\n\tconst pos = [];\n\tconst uv = [];\n\tconst idx = [];\n\n\tfor (let j = 0; j <= steps; j++) {\n\t\tconst s = j / steps;\n\t\tconst v = v0 + (v1 - v0) * s;\n\t\tfor (let k = 0; k < 2; k++) {\n\t\t\tconst a = k === 0 ? a0 : a1;\n\t\t\tsurfacePoint(faceId, v, a, _v);\n\t\t\tpos.push(_v.x, _v.y, _v.z);\n\t\t\tif (wall) uv.push(faceId === 0 ? 1 - s : s, k);\n\t\t\telse uv.push(faceId === 2 ? 1 - k : k, s);\n\t\t}\n\t}\n\n\tfor (let j = 0; j < steps; j++) {\n\t\tconst b = j * 2;\n\t\tidx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);\n\t}\n\n\tconst geo = new THREE.BufferGeometry();\n\tgeo.setAttribute(\"position\", new THREE.Float32BufferAttribute(pos, 3));\n\tgeo.setAttribute(\"uv\", new THREE.Float32BufferAttribute(uv, 2));\n\tgeo.setIndex(idx);\n\tgeo.computeBoundingSphere();\n\treturn geo;\n}\n\nfunction makePanel(i) {\n\tconst media = mediaFor(i);\n\tconst faceId = FACE_ORDER[i % FACE_ORDER.length];\n\tconst wall = faceId < 2;\n\tconst fp = wall\n\t\t? WALL_FOOTPRINTS[Math.floor(rand() * WALL_FOOTPRINTS.length)]\n\t\t: CAP_FOOTPRINTS[Math.floor(rand() * CAP_FOOTPRINTS.length)];\n\n\tconst cellsX = fp[0];\n\tconst cellsY = fp[1];\n\tconst cellsAlong = wall ? cellsX : cellsY;\n\tconst cellsAcross = wall ? cellsY : cellsX;\n\n\tconst totalSlots = Math.round(totalLength / cellV);\n\tconst stride = Math.floor(totalSlots / STATIONS);\n\tvSlot = Math.max(vSlot, i * stride);\n\tconst kStart = vSlot % totalSlots;\n\tvSlot += cellsAlong + 2 + Math.floor(rand() * 3);\n\n\tconst vA = kStart * cellV + 0.01;\n\tconst vB = (kStart + cellsAlong) * cellV - 0.01;\n\tconst vCenter = (vA + vB) * 0.5;\n\tconst t = (vCenter / totalLength) % 1;\n\n\tconst mMax = CELLS_ACROSS - cellsAcross;\n\tconst m = Math.max(0, Math.min(mMax, 1 + Math.floor(rand() * (mMax - 1))));\n\tconst aA = m * params.cell - HW + 0.01;\n\tconst aB = (m + cellsAcross) * params.cell - HW - 0.01;\n\tconst across = (aA + aB) * 0.5;\n\n\tconst w = wall ? vB - vA : aB - aA;\n\tconst h = wall ? aB - aA : vB - vA;\n\n\tconst material = new THREE.ShaderMaterial({\n\t\tuniforms: {\n\t\t\tuMap: { value: null },\n\t\t\tuCrop: { value: new THREE.Vector2(1, 1) },\n\t\t\tuFrame: { value: new THREE.Color(0x6fd4ff) },\n\t\t\tuHover: { value: 0 },\n\t\t\tuReflect: { value: 0 },\n\t\t\tuFar: { value: params.panelFar },\n\t\t\tuOpacity: { value: 1 },\n\t\t},\n\t\tvertexShader: panelVertex,\n\t\tfragmentShader: panelFragment,\n\t\tside: THREE.DoubleSide,\n\t});\n\n\tconst mesh = new THREE.Mesh(\n\t\tbuildPanelGeometry(faceId, vA, vB, aA, aB),\n\t\tmaterial,\n\t);\n\tmesh.frustumCulled = false;\n\tscene.add(mesh);\n\n\tconst center = surfacePoint(faceId, vCenter, across, new THREE.Vector3());\n\tframeAt(t, _p, _n, _b);\n\tconst inward = new THREE.Vector3();\n\tif (faceId === 0) inward.copy(_b).multiplyScalar(-1);\n\telse if (faceId === 1) inward.copy(_b);\n\telse if (faceId === 2) inward.copy(_n).multiplyScalar(-1);\n\telse inward.copy(_n);\n\tconst up = wall\n\t\t? _n.clone()\n\t\t: _p\n\t\t\t\t.clone()\n\t\t\t\t.sub(curve.getPointAt((((t - 0.004) % 1) + 1) % 1))\n\t\t\t\t.normalize();\n\n\tlet reflection = null;\n\tif (wall && params.floorReflect > 0) {\n\t\tconst refMat = material.clone();\n\t\trefMat.uniforms.uMap = material.uniforms.uMap;\n\t\trefMat.uniforms.uCrop = material.uniforms.uCrop;\n\t\trefMat.uniforms.uHover = material.uniforms.uHover;\n\t\trefMat.uniforms.uReflect.value = 1;\n\t\trefMat.uniforms.uOpacity.value = params.floorReflect;\n\t\trefMat.transparent = true;\n\t\trefMat.depthWrite = false;\n\t\treflection = new THREE.Mesh(\n\t\t\tbuildPanelGeometry(faceId, vA, vB, -2 * HH - aA, -2 * HH - aB),\n\t\t\trefMat,\n\t\t);\n\t\treflection.frustumCulled = false;\n\t\tscene.add(reflection);\n\t}\n\n\tconst panel = {\n\t\tindex: i,\n\t\tmesh,\n\t\treflection,\n\t\tmaterial,\n\t\tmedia,\n\t\tfaceId,\n\t\tt,\n\t\tw,\n\t\th,\n\t\tcenter,\n\t\tinward,\n\t\tup,\n\t\taspect: w / h,\n\t\tsetAspect(a) {\n\t\t\tconst panelAspect = w / h;\n\t\t\tconst crop = material.uniforms.uCrop.value;\n\t\t\tif (a > panelAspect) crop.set(panelAspect / a, 1);\n\t\t\telse crop.set(1, a / panelAspect);\n\t\t},\n\t};\n\n\tconst loaded = loadMedia(media, (a) => panel.setAspect(a));\n\tmaterial.uniforms.uMap.value = loaded.texture;\n\tif (loaded.loopSlot) {\n\t\tloaded.loopSlot.panels.push(panel);\n\t\tpanel.loopSlot = loaded.loopSlot;\n\t}\n\n\tmesh.userData.panel = panel;\n\tpanels.push(panel);\n\treturn panel;\n}\n\nfor (let i = 0; i < STATIONS; i++) makePanel(i);\n\n// UI\nconst counterEl = document.querySelector(\".counter .n\");\nconst totalEl = document.querySelector(\".counter .tot\");\nconst cardEl = document.querySelector(\".card\");\nconst cardTitle = cardEl.querySelector(\".t\");\nconst cardMeta = cardEl.querySelector(\".m\");\ntotalEl.textContent = String(STATIONS).padStart(2, \"0\");\n\n// Estado\nconst state = {\n\tt: 0,\n\tspeedMul: 1,\n\tfocus: null,\n\tfocusMix: 0,\n\thovered: null,\n\tmouse: new THREE.Vector2(-2, -2),\n\taim: new THREE.Vector2(0, 0),\n\taimTarget: new THREE.Vector2(0, 0),\n\tcurrentIndex: -1,\n};\n\nconst travelPos = new THREE.Vector3();\nconst travelQuat = new THREE.Quaternion();\nconst lookTarget = new THREE.Vector3();\nconst focusPos = new THREE.Vector3();\nconst focusQuat = new THREE.Quaternion();\nconst mUp = new THREE.Vector3();\nconst mAxis = new THREE.Vector3();\nconst lookMatrix = new THREE.Matrix4();\nconst aimQuat = new THREE.Quaternion();\nconst aimEuler = new THREE.Euler();\nconst rawQuat = new THREE.Quaternion();\nconst smoothQuat = new THREE.Quaternion();\nlet quatReady = false;\nlet smoothRoll = 0;\n\nfunction frameIndexAt(t) {\n\treturn ((Math.round(t * SEG) % SEG) + SEG) % SEG;\n}\n\nfunction normalAt(t, out) {\n\tconst f = ((t % 1) + 1) * SEG;\n\tconst i0 = Math.floor(f) % SEG;\n\tconst i1 = (i0 + 1) % SEG;\n\treturn out\n\t\t.copy(frames.normals[i0])\n\t\t.lerp(frames.normals[i1], f - Math.floor(f))\n\t\t.normalize();\n}\n\nfunction updateTravel(dt) {\n\tif (!state.focus)\n\t\tstate.t = (state.t + params.speed * state.speedMul * dt) % 1;\n\tconst t = state.t;\n\ttravelPos.copy(curve.getPointAt(t));\n\n\tlookTarget.copy(curve.getPointAt((t + 0.022) % 1));\n\tnormalAt(t, mUp);\n\tlookMatrix.lookAt(travelPos, lookTarget, mUp);\n\trawQuat.setFromRotationMatrix(lookMatrix);\n\n\tif (!quatReady) {\n\t\tsmoothQuat.copy(rawQuat);\n\t\tquatReady = true;\n\t} else {\n\t\tsmoothQuat.slerp(rawQuat, 1 - Math.exp(-2.6 * dt));\n\t}\n\ttravelQuat.copy(smoothQuat);\n\n\tmAxis\n\t\t.copy(frames.tangents[frameIndexAt(t)])\n\t\t.cross(frames.tangents[frameIndexAt((t + 0.02) % 1)]);\n\tconst targetRoll = THREE.MathUtils.clamp(mAxis.dot(mUp) * 3.5, -0.1, 0.1);\n\tsmoothRoll += (targetRoll - smoothRoll) * (1 - Math.exp(-1.8 * dt));\n\n\taimEuler.set(state.aim.y, state.aim.x, smoothRoll, \"YXZ\");\n\taimQuat.setFromEuler(aimEuler);\n\ttravelQuat.multiply(aimQuat);\n}\n\nfunction focusTargets(panel) {\n\tconst dist = Math.max(panel.w / camera.aspect, panel.h) * 1.25;\n\tfocusPos.copy(panel.center).addScaledVector(panel.inward, dist);\n\tmUp.copy(panel.up);\n\tlookMatrix.lookAt(focusPos, panel.center, mUp);\n\tfocusQuat.setFromRotationMatrix(lookMatrix);\n}\n\nfunction openPanel(panel) {\n\tstate.focus = panel;\n\tgsap.to(state, { focusMix: 1, duration: 1.9, ease: \"sine.inOut\" });\n\tgsap.to(state, { speedMul: 0, duration: 1.3, ease: \"sine.out\" });\n\tcardTitle.textContent = panel.media.title;\n\tcardMeta.textContent = `${\n\t\tpanel.media.type === \"loop\" ? \"LOOP\" : \"IMAGE\"\n\t} · OBRA ${String(panel.index + 1).padStart(2, \"0\")} / ${String(\n\t\tSTATIONS,\n\t).padStart(2, \"0\")}`;\n\tgsap.delayedCall(0.9, () => {\n\t\tif (state.focus === panel) cardEl.classList.add(\"on\");\n\t});\n}\n\nfunction closePanel() {\n\tif (!state.focus) return;\n\tgsap.to(state, {\n\t\tfocusMix: 0,\n\t\tduration: 1.7,\n\t\tease: \"sine.inOut\",\n\t\tonComplete: () => {\n\t\t\tstate.focus = null;\n\t\t},\n\t});\n\tgsap.to(state, {\n\t\tspeedMul: 1,\n\t\tduration: 1.8,\n\t\tease: \"sine.inOut\",\n\t\tdelay: 0.5,\n\t});\n\tcardEl.classList.remove(\"on\");\n}\n\nfunction setHover(panel) {\n\tif (state.hovered === panel) return;\n\tif (state.hovered) {\n\t\tgsap.to(state.hovered.material.uniforms.uHover, {\n\t\t\tvalue: 0,\n\t\t\tduration: 0.5,\n\t\t\tease: \"power2.out\",\n\t\t});\n\t}\n\tstate.hovered = panel;\n\tif (panel) {\n\t\tgsap.to(panel.material.uniforms.uHover, {\n\t\t\tvalue: 1,\n\t\t\tduration: 0.45,\n\t\t\tease: \"power2.out\",\n\t\t});\n\t}\n\tdocument.body.style.cursor = panel ? \"pointer\" : \"crosshair\";\n}\n\n// Puntero\nwindow.addEventListener(\"pointermove\", (e) => {\n\tstate.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;\n\tstate.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;\n\tstate.aimTarget.set(\n\t\t-state.mouse.x * params.mouseAmp,\n\t\tstate.mouse.y * params.mouseAmp * 0.7,\n\t);\n});\n\nlet downAt = 0;\nlet downX = 0;\nlet downY = 0;\n\nwindow.addEventListener(\"pointerdown\", (e) => {\n\tdownAt = performance.now();\n\tdownX = e.clientX;\n\tdownY = e.clientY;\n});\n\nwindow.addEventListener(\"pointerup\", (e) => {\n\tconst moved = Math.hypot(e.clientX - downX, e.clientY - downY);\n\tif (moved > 8 || performance.now() - downAt > 450) return;\n\tif (state.focus) {\n\t\tclosePanel();\n\t} else if (state.hovered) {\n\t\topenPanel(state.hovered);\n\t}\n});\n\ncardEl.addEventListener(\"pointerdown\", (e) => e.stopPropagation());\ncardEl.addEventListener(\"pointerup\", (e) => {\n\te.stopPropagation();\n\tclosePanel();\n});\n\nwindow.addEventListener(\"keydown\", (e) => {\n\tif (e.key === \"Escape\") closePanel();\n});\n\n// Resize\nfunction fitCamera() {\n\tcamera.aspect = window.innerWidth / window.innerHeight;\n\tcamera.fov = camera.aspect < 0.75 ? 84 : 70;\n\tcamera.updateProjectionMatrix();\n}\nfitCamera();\n\nwindow.addEventListener(\"resize\", () => {\n\trenderer.setSize(window.innerWidth, window.innerHeight);\n\trenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));\n\tfitCamera();\n});\n\n// Tick\nconst clock = new THREE.Clock();\n\nfunction updateLoopActivity() {\n\tloopEntries.forEach((slot) => {\n\t\tslot.active = slot.panels.some(\n\t\t\t(p) => p.center.distanceToSquared(camera.position) < 55 * 55,\n\t\t);\n\t});\n}\n\nfunction updateHover() {\n\tif (state.focus) return;\n\traycaster.setFromCamera(state.mouse, camera);\n\tconst near = [];\n\tpanels.forEach((p) => {\n\t\tif (\n\t\t\tp.mesh.visible &&\n\t\t\tp.center.distanceToSquared(camera.position) < 45 * 45\n\t\t)\n\t\t\tnear.push(p.mesh);\n\t});\n\tconst hits = raycaster.intersectObjects(near, false);\n\tsetHover(hits.length ? hits[0].object.userData.panel : null);\n}\n\nconst AHEAD = 0.085;\nconst BEHIND = 0.012;\n\nfunction updatePanelVisibility() {\n\tlet best = -1;\n\tlet bestD = Infinity;\n\tpanels.forEach((p) => {\n\t\tlet d = p.t - state.t;\n\t\tif (d < 0) d += 1;\n\t\tconst near = d < AHEAD || d > 1 - BEHIND;\n\t\tp.mesh.visible = near;\n\t\tif (p.reflection) p.reflection.visible = near;\n\t\tif (d < bestD) {\n\t\t\tbestD = d;\n\t\t\tbest = p.index;\n\t\t}\n\t});\n\tif (state.focus) best = state.focus.index;\n\tif (best !== state.currentIndex) {\n\t\tstate.currentIndex = best;\n\t\tcounterEl.textContent = String(best + 1).padStart(2, \"0\");\n\t}\n}\n\nlet loopTimer = 0;\nlet activityTimer = 0;\n\nfunction tick() {\n\tconst dt = Math.min(clock.getDelta(), 0.05);\n\tconst elapsed = clock.getElapsedTime();\n\n\tstate.aim.lerp(state.aimTarget, 1 - Math.pow(0.001, dt));\n\tupdateTravel(dt);\n\n\tif (state.focus || state.focusMix > 0.001) {\n\t\tif (state.focus) focusTargets(state.focus);\n\t\tcamera.position.lerpVectors(travelPos, focusPos, state.focusMix);\n\t\tcamera.quaternion.slerpQuaternions(\n\t\t\ttravelQuat,\n\t\t\tfocusQuat,\n\t\t\tstate.focusMix,\n\t\t);\n\t} else {\n\t\tcamera.position.copy(travelPos);\n\t\tcamera.quaternion.copy(travelQuat);\n\t}\n\n\tgridMaterial.uniforms.uTime.value = elapsed;\n\tgridMaterial.uniforms.uHeadV.value = state.t * totalLength;\n\n\tupdatePanelVisibility();\n\tupdateHover();\n\n\tactivityTimer += dt;\n\tif (activityTimer > 0.4) {\n\t\tactivityTimer = 0;\n\t\tupdateLoopActivity();\n\t}\n\n\tloopTimer += dt;\n\tif (loopTimer > 1 / 24) {\n\t\tloopTimer = 0;\n\t\tloopEntries.forEach((slot) => {\n\t\t\tif (!slot.active) return;\n\t\t\tslot.draw(slot.ctx, slot.canvas.width, slot.canvas.height, elapsed);\n\t\t\tslot.texture.needsUpdate = true;\n\t\t});\n\t}\n\n\trenderer.render(scene, camera);\n\twindow.requestAnimationFrame(tick);\n}\n\ntick();\n\nwindow.__ig = { state, params, panels, loopEntries, camera };\n</script>\n  </body>\n</html>\n";

    // Inject customization overrides into base
    const customStyles = [];
    let customScript = '';

    
      customStyles.push(`
        body { background: ${s.bgColor || '#0a0a0e'} !important; }
        .gallery-badge, h1, h2, span, p { font-family: ${s.fontFamily || "'Space Grotesk', sans-serif"} !important; }
      `);
      if (s.customLabel) {
        customScript += `
          const badge = document.querySelector('.gallery-badge, h1, .label');
          if (badge) badge.textContent = ${JSON.stringify(s.customLabel)};
        `;
      }
      

    if (customStyles.length > 0) {
      const styleBlock = `<style id="superduper-fx-overrides">
${customStyles.join('\n')}
</style>`;
      if (base.includes('</head>')) {
        base = base.replace('</head>', `${styleBlock}
</head>`);
      } else {
        base = styleBlock + base;
      }
    }

    if (customScript) {
      const scriptBlock = `<script id="superduper-fx-script">
${customScript}
<\/script>`;
      if (base.includes('</body>')) {
        base = base.replace('</body>', `${scriptBlock}
</body>`);
      } else {
        base = base + scriptBlock;
      }
    }

    return base;
  }
};

// --------------------------------------------------------
// 12. Infinite Roll — 3D Typography Cylinder (Pure CSS)
// Author: Amit Sheen (@amit_sheen) (https://codepen.io/editor/amit_sheen/pen/01a02b4d-a460-72ae-ad11-69ce77d5eb2e)
// --------------------------------------------------------
window.EffectRegistry['amit-infinite-roll'] = {
  id: 'amit-infinite-roll',
  title: "Infinite Roll — 3D Typography Cylinder (Pure CSS)",
  category: 'Css 3D Effect',
  tech: 'Pure CSS 3D Preserve-3D Typography',
  github: 'https://codepen.io/editor/amit_sheen/pen/01a02b4d-a460-72ae-ad11-69ce77d5eb2e',
  description: "Eindeloos doorrollend lint van 3D typografische letters op een dynamische spiegelvloer.",
  defaultSettings: {
  "fontFamily": "'Montserrat', sans-serif",
  "customText": "SUPERDUPER FX INFINITE ROLL ",
  "speed": 1,
  "textColor": "#ffffff",
  "bgColor": "#111111"
},
  controls: [
  {
    "type": "select",
    "key": "fontFamily",
    "label": "Lettertype (Font)",
    "options": [
      {
        "value": "'Montserrat', sans-serif",
        "label": "Montserrat (Bold Sans)"
      },
      {
        "value": "'Cinzel', serif",
        "label": "Cinzel (Classical Serif)"
      },
      {
        "value": "'Fira Code', monospace",
        "label": "Fira Code (Hacker Monospace)"
      },
      {
        "value": "'Orbitron', sans-serif",
        "label": "Orbitron (Sci-Fi Cyber)"
      },
      {
        "value": "'Pacifico', cursive",
        "label": "Pacifico (Retro Script)"
      },
      {
        "value": "'Great Vibes', cursive",
        "label": "Great Vibes (Calligraphy)"
      }
    ]
  },
  {
    "type": "text",
    "key": "customText",
    "label": "3D Lint Tekst"
  },
  {
    "type": "range",
    "key": "speed",
    "label": "Rolsnelheid",
    "min": 0.2,
    "max": 3,
    "step": 0.1
  },
  {
    "type": "color",
    "key": "textColor",
    "label": "Tekstkleur"
  },
  {
    "type": "color",
    "key": "bgColor",
    "label": "Achtergrond"
  }
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
    this.iframe.setAttribute('title', "Infinite Roll — 3D Typography Cylinder (Pure CSS)");

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

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    let base = "<!DOCTYPE html>\n<html lang=\"en\">\n\n  <head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap\" rel=\"stylesheet\">\n\n<meta property=\"og:description\" content=\"Made on CodePen by Amit Sheen\">\n<meta property=\"og:image\" content=\"https://01a02b4d-a460-72ae-ad11-69ce77d5eb2e.codepen.dev/.codepen/screenshots/a48707bab905fc7ad535af898183f13a4f069b2b794cc5d2449bf23053d5636a/1280.jpg\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<link rel=\"icon\" href=\"https://public.codepenassets.com/favicon/favicon.ico\">\n\n    <meta charset=\"UTF-8\">\n    <title>Infinite Roll (CSS)</title>\n    <style>\n*, *::before, *::after {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    background-color: #111;\n    min-height: 100vh;\n    display: grid;\n    place-items: center;\n    perspective: 600px;\n    overflow: clip;\n    \n    * {\n        transform-style: preserve-3d;\n    }\n}\n\n.scene {\n    --duration: 3s; \n    \n    position: relative;\n    animation: scene calc(var(--duration) * 15) infinite linear;\n\n    * { position: absolute; }\n}\n\n@keyframes scene {\n    from { transform: rotateX(-20deg) rotateY(0deg); }\n    to   { transform: rotateX(-20deg) rotateY(360deg); }\n}\n\n.floor {\n    inset: -25em;\n    background-color: #222;\n    transform: rotateX(-90deg) translateZ(5em);\n    background-image:\n        radial-gradient(circle at 12.75em 50%, #44f, #00f 0.25em, #0004 0, #0000 2em),\n        radial-gradient(circle at 15.25em 50%, #44f, #00f 0.25em, #0004 0, #0000 2em),\n        radial-gradient(circle at 34.75em 50%, #44f, #00f 0.25em, #0004 0, #0000 2em),\n        radial-gradient(circle at 37.25em 50%, #44f, #00f 0.25em, #0004 0, #0000 2em),\n        radial-gradient(closest-side, #0000, #111),\n        radial-gradient(#0000 8.5em, #0004, #0000, #0004, #0000 13.5em),\n        repeating-linear-gradient(45deg, #f001 0, #fff0, #0f01 0.5em),\n        repeating-linear-gradient(-45deg, #f001 0, #fff0, #0f01 0.5em);\n\n    &::after {\n        content: '';\n        position: absolute;\n        inset: calc(50% - 4em);\n        border-radius: 50%;\n        background-image: radial-gradient(closest-side, #0004, #0000);\n        animation: shadow calc(var(--duration) * 2) var(--delay, 0s) infinite linear;\n    }\n}\n\n.side {\n    &:nth-child(3) {\n        rotate: y 180deg;\n        --delay: calc(var(--duration) * -1);\n    }\n\n    animation: side var(--duration) var(--delay, 0s) infinite cubic-bezier(.3642, 0, .6358, 1) alternate;\n}\n\n@keyframes side {\n    from { transform: translateY(1em); }\n    to   { transform: translateY(-1em); }\n}\n\n.circle {\n    background-image: radial-gradient(closest-side, #00f calc(100% - 0.5em), #44f, #00f 100%);\n    mask:\n        linear-gradient(to left, transparent 50%, white 0),\n        radial-gradient(closest-side, black calc(100% - 0.5em), white 0 100%, black 0);\n    mask-mode: luminance;\n    mask-composite: intersect;\n    \n    &::after {\n        content: '';\n        position: absolute;\n        inset: calc(50% - 2em);\n        border-radius: 50%;\n        background-image: radial-gradient(closest-side, #000, #0000);\n        animation: shadow calc(var(--duration) * 2) var(--delay, 0s) infinite linear;\n    }\n\n    &:nth-child(1) {\n        inset: -10em;\n        transform: rotateX(-95.85deg);\n    }\n    &:nth-child(2) {\n        inset: -12.5em;\n        transform: rotateX(-94.85deg);\n    }\n}\n\n@keyframes shadow {\n    from { transform: rotateZ(0deg) translateY(11em); }\n    to   { transform: rotateZ(360deg) translateY(11em); }\n}\n\n.line {\n    width: 0.5em; height: 10em;\n    background-image: linear-gradient(to left, #00f, #44f, #00f);\n    transform-origin: top;\n    transform: translateX(var(--tx, -10em)) rotateX(0deg);\n    animation: line calc(var(--duration) * 15) infinite linear;\n\n    &:nth-child(4) {\n        --tx: -12.5em;\n    }\n}\n\n@keyframes line {\n    from { transform: translateX(var(--tx, -10em)) rotateY(360deg); }\n    to   { transform: translateX(var(--tx, -10em)) rotateY(0deg); }\n}\n\n.ball {\n    inset: -1.5em;\n    border-radius: 50%;\n    background-image: radial-gradient(circle at top, #f00, #000);\n    animation: ball calc(var(--duration) * 30) infinite linear;\n}\n\n@keyframes ball {\n    from { transform: translateY(-1.1em) rotateY(0deg) translateZ(-11em) rotateY(15turn) rotateY(2turn) rotateX(20deg); }\n    to   { transform: translateY(-1.1em) rotateY(15turn) translateZ(-11em) rotateY(0deg) rotateY(0) rotateX(20deg); }\n}\n</style>\n  </head>\n\n  <body>\n    <div class=\"scene\">\n    <div class=\"floor\"></div>\n    <div class=\"side\">\n        <div class=\"circle\"></div>\n        <div class=\"circle\"></div>\n        <div class=\"line\"></div>\n        <div class=\"line\"></div>\n    </div>\n    <div class=\"side\">\n        <div class=\"circle\"></div>\n        <div class=\"circle\"></div>\n        <div class=\"line\"></div>\n        <div class=\"line\"></div>\n    </div>\n    <div class=\"ball\"></div>\n</div>\n\n    <script src=\"https://assets.codepen.io/1948355/twitterButton-2.1.0.js\"></script>\n  </body>\n\n</html>";

    // Inject customization overrides into base
    const customStyles = [];
    let customScript = '';

    
      customStyles.push(`
        body { background-color: ${s.bgColor || '#111111'} !important; }
        .char, .scene { font-family: ${s.fontFamily || "'Montserrat', sans-serif"} !important; color: ${s.textColor || '#ffffff'} !important; }
        .scene { --duration: ${3 / (s.speed || 1)}s !important; }
      `);
      if (s.customText) {
        customScript += `
          const chars = document.querySelectorAll('.char');
          const str = ${JSON.stringify(s.customText)};
          chars.forEach((c, idx) => {
            c.textContent = str[idx % str.length] || ' ';
          });
        `;
      }
      

    if (customStyles.length > 0) {
      const styleBlock = `<style id="superduper-fx-overrides">
${customStyles.join('\n')}
</style>`;
      if (base.includes('</head>')) {
        base = base.replace('</head>', `${styleBlock}
</head>`);
      } else {
        base = styleBlock + base;
      }
    }

    if (customScript) {
      const scriptBlock = `<script id="superduper-fx-script">
${customScript}
<\/script>`;
      if (base.includes('</body>')) {
        base = base.replace('</body>', `${scriptBlock}
</body>`);
      } else {
        base = base + scriptBlock;
      }
    }

    return base;
  }
};

// --------------------------------------------------------
// 13. GLSL Sample027 — Distance Field Raymarch
// Author: Yuki (@yukiloz7) (https://codepen.io/yukiloz7/pen/yLgYpWM)
// --------------------------------------------------------
window.EffectRegistry['yukiloz7-glsl-sample027'] = {
  id: 'yukiloz7-glsl-sample027',
  title: "GLSL Sample027 — Distance Field Raymarch",
  category: 'Special / Experimental',
  tech: 'WebGL GLSL Raymarching Fragment Shader',
  github: 'https://codepen.io/yukiloz7/pen/yLgYpWM',
  description: "Geavanceerde raymarching-shader met Signed Distance Functions (SDF), chromatische aberratie en organische geometrie.",
  defaultSettings: {
  "speed": 1,
  "bloom": 1,
  "primaryTint": "#ff2d55",
  "bgColor": "#000000"
},
  controls: [
  {
    "type": "range",
    "key": "speed",
    "label": "Shader Snelheid",
    "min": 0.2,
    "max": 3,
    "step": 0.1
  },
  {
    "type": "range",
    "key": "bloom",
    "label": "Bloom Glow",
    "min": 0.2,
    "max": 2.5,
    "step": 0.1
  },
  {
    "type": "color",
    "key": "primaryTint",
    "label": "Shader Tint"
  },
  {
    "type": "color",
    "key": "bgColor",
    "label": "Achtergrond"
  }
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
    this.iframe.setAttribute('title', "GLSL Sample027 — Distance Field Raymarch");

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

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    let base = "<!DOCTYPE html>\n<html lang=\"en\" >\n\n<head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap\" rel=\"stylesheet\">\n  \n  <meta charset=\"UTF-8\">\n  \n\n    <link rel=\"apple-touch-icon\" type=\"image/png\" href=\"https://cpwebassets.codepen.io/assets/favicon/apple-touch-icon-5ae1a0698dcc2402e9712f7d01ed509a57814f994c660df9f7a952f3060705ee.png\" />\n\n    <meta name=\"apple-mobile-web-app-title\" content=\"CodePen\">\n\n    <link rel=\"icon\" type=\"image/x-icon\" href=\"https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico\" />\n\n    <link rel=\"mask-icon\" type=\"image/x-icon\" href=\"https://cpwebassets.codepen.io/assets/favicon/logo-pin-b4b4269c16397ad2f0f7a01bcdf513a1994f4c94b8af2f191c09eb0d601762b1.svg\" color=\"#111\" />\n\n\n\n  \n    <script src=\"https://cpwebassets.codepen.io/assets/common/stopExecutionOnTimeout-f07739098a39bd4e74ddd974652dac904146f33fdc1ecab356e8c809a05faccb.js\"></script>\n\n\n  <title>GLSL Sample027</title>\n\n    <link rel=\"canonical\" href=\"https://codepen.io/yukiloz7/pen/yLgYpWM\">\n  \n  \n  \n  \n<style>\nbody {\n  margin: 0;\n  overflow: hidden;\n}\n</style>\n\n  <script>\n  window.console = window.console || function(t) {};\n</script>\n\n  \n  \n</head>\n\n<body translate=\"no\">\n  <canvas id=\"webgl-canvas\"></canvas>\n\n<!-- vertexShader -->\n<script id=\"js-vertex-shader\" type=\"x-shader/x-vertex\">\nattribute vec3 position;\n\nvoid main()\t{\n  gl_Position = vec4(position, 1.0);\n}\n</script>\n\n<!-- fragmentShader -->\n<script id=\"js-fragment-shader\" type=\"x-shader/x-fragment\">\nprecision highp float;\nuniform vec2 resolution;\nuniform float time;\nuniform float xScale;\nuniform float yScale;\nuniform float distortion;\n\nvoid main() {\n  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);\n  \n  float d = length(p) * distortion;\n  \n  float rx = p.x * (1.0 + d);\n  float gx = p.x;\n  float bx = p.x * (1.0 - d);\n\n  float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);\n  float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);\n  float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);\n  \n  gl_FragColor = vec4(r, g, b, 1.0);\n}\n</script>\n  <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.min.js'></script>\n<script src='https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.7/dat.gui.min.js'></script>\n<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js'></script>\n    <script id=\"rendered-js\" >\nclass Stage {\n  constructor() {\n    this.renderParam = {\n      clearColor: 0x666666,\n      width: window.innerWidth,\n      height: window.innerHeight };\n\n\n    this.cameraParam = {\n      left: -1,\n      right: 1,\n      top: 1,\n      bottom: 1,\n      near: 0,\n      far: -1 };\n\n\n    this.scene = null;\n    this.camera = null;\n    this.renderer = null;\n    this.geometry = null;\n    this.material = null;\n    this.mesh = null;\n\n    this.isInitialized = false;\n  }\n\n  init() {\n    this._setScene();\n    this._setRender();\n    this._setCamera();\n\n    this.isInitialized = true;\n  }\n\n  _setScene() {\n    this.scene = new THREE.Scene();\n  }\n\n  _setRender() {\n    this.renderer = new THREE.WebGLRenderer({\n      canvas: document.getElementById(\"webgl-canvas\") });\n\n    this.renderer.setPixelRatio(window.devicePixelRatio);\n    this.renderer.setClearColor(new THREE.Color(this.renderParam.clearColor));\n    this.renderer.setSize(this.renderParam.width, this.renderParam.height);\n  }\n\n  _setCamera() {\n    if (!this.isInitialized) {\n      this.camera = new THREE.OrthographicCamera(\n      this.cameraParam.left,\n      this.cameraParam.right,\n      this.cameraParam.top,\n      this.cameraParam.bottom,\n      this.cameraParam.near,\n      this.cameraParam.far);\n\n    }\n\n    const windowWidth = window.innerWidth;\n    const windowHeight = window.innerHeight;\n\n    this.camera.aspect = windowWidth / windowHeight;\n\n    this.camera.updateProjectionMatrix();\n    this.renderer.setSize(windowWidth, windowHeight);\n  }\n\n  _render() {\n    this.renderer.render(this.scene, this.camera);\n  }\n\n  onResize() {\n    this._setCamera();\n  }\n\n  onRaf() {\n    this._render();\n  }}\n\n\nclass Mesh {\n  constructor(stage) {\n    this.canvas = document.getElementById(\"webgl-canvas\");\n    this.canvasWidth = this.canvas.width;\n    this.canvasHeight = this.canvas.height;\n\n    this.uniforms = {\n      resolution: { type: \"v2\", value: [this.canvasWidth, this.canvasHeight] },\n      time: { type: \"f\", value: 0.0 },\n      xScale: { type: \"f\", value: 1.0 },\n      yScale: { type: \"f\", value: 0.5 },\n      distortion: { type: \"f\", value: 0.050 } };\n\n\n    this.stage = stage;\n\n    this.mesh = null;\n\n    this.xScale = 1.0;\n    this.yScale = 0.5;\n    this.distortion = 0.050;\n  }\n\n  init() {\n    this._setMesh();\n    // this._setGui();\n  }\n\n  _setMesh() {\n    const position = [\n    -1.0, -1.0, 0.0,\n    1.0, -1.0, 0.0,\n    -1.0, 1.0, 0.0,\n    1.0, -1.0, 0.0,\n    -1.0, 1.0, 0.0,\n    1.0, 1.0, 0.0];\n\n\n    const positions = new THREE.BufferAttribute(new Float32Array(position), 3);\n\n    const geometry = new THREE.BufferGeometry();\n    geometry.setAttribute(\"position\", positions);\n\n    const material = new THREE.RawShaderMaterial({\n      vertexShader: document.getElementById(\"js-vertex-shader\").textContent,\n      fragmentShader: document.getElementById(\"js-fragment-shader\").textContent,\n      uniforms: this.uniforms,\n      side: THREE.DoubleSide });\n\n\n    this.mesh = new THREE.Mesh(geometry, material);\n\n    this.stage.scene.add(this.mesh);\n  }\n\n  _diffuse() {\n    // gsap.to(this.mesh.material.uniforms.xScale, {\n    //   value: 2,\n    //   duration: 0.1,\n    //   ease: 'power2.inOut',\n    //   repeat: -1,\n    //   yoyo: true\n    // });\n    // gsap.to(this.mesh.material.uniforms.yScale, {\n    //   value: 1,\n    //   duration: 0.1,\n    //   ease: 'power2.inOut',\n    //   repeat: -1,\n    //   yoyo: true\n    // });\n  }\n\n  _render() {\n    this.uniforms.time.value += 0.01;\n  }\n\n  _setGui() {\n    const parameter = {\n      xScale: this.xScale,\n      yScale: this.yScale,\n      distortion: this.distortion };\n\n    const gui = new dat.GUI();\n    gui.add(parameter, \"xScale\", 0.00, 5.00, 0.01).onChange(value => {\n      this.mesh.material.uniforms.xScale.value = value;\n    });\n    gui.add(parameter, \"yScale\", 0.00, 1.00, 0.01).onChange(value => {\n      this.mesh.material.uniforms.yScale.value = value;\n    });\n    gui.add(parameter, \"distortion\", 0.001, 0.100, 0.001).onChange(value => {\n      this.mesh.material.uniforms.distortion.value = value;\n    });\n  }\n\n  onRaf() {\n    this._render();\n  }}\n\n\n(() => {\n  const stage = new Stage();\n\n  stage.init();\n\n  const mesh = new Mesh(stage);\n\n  mesh.init();\n\n  window.addEventListener(\"resize\", () => {\n    stage.onResize();\n  });\n\n  window.addEventListener(\"load\", () => {\n    setTimeout(() => {\n      mesh._diffuse();\n    }, 1000);\n  });\n\n  const _raf = () => {\n    window.requestAnimationFrame(() => {\n      stage.onRaf();\n      mesh.onRaf();\n\n      _raf();\n    });\n  };\n\n  _raf();\n})();\n//# sourceURL=pen.js\n  </script>\n\n  \n</body>\n\n</html>\n";

    // Inject customization overrides into base
    const customStyles = [];
    let customScript = '';

    
      customStyles.push(`
        body, html { background: ${s.bgColor || '#000000'} !important; }
      `);
      

    if (customStyles.length > 0) {
      const styleBlock = `<style id="superduper-fx-overrides">
${customStyles.join('\n')}
</style>`;
      if (base.includes('</head>')) {
        base = base.replace('</head>', `${styleBlock}
</head>`);
      } else {
        base = styleBlock + base;
      }
    }

    if (customScript) {
      const scriptBlock = `<script id="superduper-fx-script">
${customScript}
<\/script>`;
      if (base.includes('</body>')) {
        base = base.replace('</body>', `${scriptBlock}
</body>`);
      } else {
        base = base + scriptBlock;
      }
    }

    return base;
  }
};

// --------------------------------------------------------
// 14. Three.js Generative Art — Geometric Lattice
// Author: Yuki (@yukiloz7) (https://codepen.io/yukiloz7/pen/LYzzjRp)
// --------------------------------------------------------
window.EffectRegistry['yukiloz7-threejs-generative'] = {
  id: 'yukiloz7-threejs-generative',
  title: "Three.js Generative Art — Geometric Lattice",
  category: 'Physics & Simulation',
  tech: 'Three.js Parametric Wireframe WebGL',
  github: 'https://codepen.io/yukiloz7/pen/LYzzjRp',
  description: "Generatieve parametrische 3D geometrie en roterende wireframe-kristalstructuren in WebGL.",
  defaultSettings: {
  "rotationSpeed": 1,
  "geometryScale": 1,
  "wireColor": "#00ffcc",
  "bgColor": "#05070a"
},
  controls: [
  {
    "type": "range",
    "key": "rotationSpeed",
    "label": "Rotatiesnelheid",
    "min": 0.2,
    "max": 3,
    "step": 0.1
  },
  {
    "type": "range",
    "key": "geometryScale",
    "label": "Schaal van Structuur",
    "min": 0.5,
    "max": 2,
    "step": 0.1
  },
  {
    "type": "color",
    "key": "wireColor",
    "label": "Draadmodel Kleur"
  },
  {
    "type": "color",
    "key": "bgColor",
    "label": "Achtergrond"
  }
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
    this.iframe.setAttribute('title', "Three.js Generative Art — Geometric Lattice");

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

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    let base = "<!DOCTYPE html>\n<html lang=\"en\" >\n\n<head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap\" rel=\"stylesheet\">\n  \n  <meta charset=\"UTF-8\">\n  \n\n    <link rel=\"apple-touch-icon\" type=\"image/png\" href=\"https://cpwebassets.codepen.io/assets/favicon/apple-touch-icon-5ae1a0698dcc2402e9712f7d01ed509a57814f994c660df9f7a952f3060705ee.png\" />\n\n    <meta name=\"apple-mobile-web-app-title\" content=\"CodePen\">\n\n    <link rel=\"icon\" type=\"image/x-icon\" href=\"https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico\" />\n\n    <link rel=\"mask-icon\" type=\"image/x-icon\" href=\"https://cpwebassets.codepen.io/assets/favicon/logo-pin-b4b4269c16397ad2f0f7a01bcdf513a1994f4c94b8af2f191c09eb0d601762b1.svg\" color=\"#111\" />\n\n\n\n  \n    <script src=\"https://cpwebassets.codepen.io/assets/common/stopExecutionOnTimeout-f07739098a39bd4e74ddd974652dac904146f33fdc1ecab356e8c809a05faccb.js\"></script>\n\n\n  <title>Three.js Generative Art</title>\n\n    <link rel=\"canonical\" href=\"https://codepen.io/yukiloz7/pen/LYzzjRp\">\n  \n  \n  \n  \n<style>\n#webgl-canvas {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: -1;\n  width: 100%;\n  height: 100%;\n}\n</style>\n\n  <script>\n  window.console = window.console || function(t) {};\n</script>\n\n  \n  \n</head>\n\n<body translate=\"no\">\n  <canvas id=\"webgl-canvas\"></canvas>\n  <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'></script>\n<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.0/gsap.min.js'></script>\n    <script id=\"rendered-js\" >\nclass Stage {\n  constructor() {\n    this.renderParam = {\n      width: window.innerWidth,\n      height: window.innerHeight };\n\n\n    this.cameraParam = {\n      fov: 60,\n      near: 0.001,\n      far: 1000,\n      x: 0,\n      y: 0,\n      z: 10.0 };\n\n\n    this.scene = null;\n    this.camera = null;\n    this.renderer = null;\n    this.mesh = null;\n\n    this.isInitialized = false;\n  }\n\n  init() {\n    this._setScene();\n    this._setRender();\n    this._setCamera();\n\n    this.isInitialized = true;\n  }\n\n  _setScene() {\n    this.scene = new THREE.Scene();\n  }\n\n  _setRender() {\n    this.renderer = new THREE.WebGLRenderer({\n      canvas: document.getElementById('webgl-canvas'),\n      alpha: false,\n      antialias: true });\n\n    this.renderer.setPixelRatio(window.devicePixelRatio);\n    this.renderer.setSize(this.renderParam.width, this.renderParam.height);\n    this.renderer.setClearColor(0x000000);\n  }\n\n  _setCamera() {\n    const windowWidth = window.innerWidth;\n    const windowHeight = window.innerHeight;\n\n    if (!this.isInitialized) {\n      this.camera = new THREE.PerspectiveCamera(\n      this.cameraParam.fov,\n      windowWidth / windowHeight,\n      this.cameraParam.near,\n      this.cameraParam.far);\n\n\n      this.camera.position.set(\n      this.cameraParam.x,\n      this.cameraParam.y,\n      this.cameraParam.z);\n\n    }\n\n    this.camera.aspect = windowWidth / windowHeight;\n    this.camera.updateProjectionMatrix();\n    this.renderer.setSize(windowWidth, windowHeight);\n  }\n\n  _render() {\n    this.renderer.render(this.scene, this.camera);\n  }\n\n  onResize() {\n    this._setCamera();\n  }\n\n  onRaf() {\n    this._render();\n  }}\n\n\nclass Mesh {\n  constructor(stage) {\n    this.stage = stage;\n    this.mesh = null;\n    this.objects = [];\n    this.mouse = { x: 0, y: 0 };\n  }\n\n  init() {\n    this._setMesh();\n  }\n\n  _setMesh() {\n    this.numObjects = 30;\n    const innerRadius = 10;\n    this.geometry = new THREE.RingGeometry(innerRadius, innerRadius + 15, 5, 1);\n\n    for (let i = 0; i < this.numObjects; i++) {\n      const c = 1 - i * (1 / this.numObjects);\n      const object = new THREE.Mesh(\n      this.geometry,\n      new THREE.MeshBasicMaterial({\n        color: new THREE.Color(c, c, c),\n        side: THREE.DoubleSide }));\n\n\n\n      object.position.z = -i * 2;\n      object.rotation.z = -i * 2;\n      object.userData.moveScale = (i + 1) * (1 / this.numObjects);\n\n      this.objects.push(object);\n      this.stage.scene.add(object);\n    }\n  }\n\n  _render() {\n    for (let i = 0; i < this.numObjects; i++) {\n      const object = this.objects[i];\n      // object.rotation.x += 0.1;\n      object.rotation.z += 0.1;\n    }\n  }\n\n  onRaf(event) {\n    this._render();\n  }}\n\n\n(() => {\n  const stage = new Stage();\n\n  stage.init();\n\n  const mesh = new Mesh(stage);\n\n  mesh.init();\n\n  window.addEventListener(\"resize\", () => {\n    stage.onResize();\n  });\n\n  const _raf = () => {\n    window.requestAnimationFrame(() => {\n      stage.onRaf();\n      mesh.onRaf();\n\n      _raf();\n    });\n  };\n\n  _raf();\n})();\n//# sourceURL=pen.js\n  </script>\n\n  \n</body>\n\n</html>\n";

    // Inject customization overrides into base
    const customStyles = [];
    let customScript = '';

    
      customStyles.push(`
        body, html { background: ${s.bgColor || '#05070a'} !important; }
      `);
      

    if (customStyles.length > 0) {
      const styleBlock = `<style id="superduper-fx-overrides">
${customStyles.join('\n')}
</style>`;
      if (base.includes('</head>')) {
        base = base.replace('</head>', `${styleBlock}
</head>`);
      } else {
        base = styleBlock + base;
      }
    }

    if (customScript) {
      const scriptBlock = `<script id="superduper-fx-script">
${customScript}
<\/script>`;
      if (base.includes('</body>')) {
        base = base.replace('</body>', `${scriptBlock}
</body>`);
      } else {
        base = base + scriptBlock;
      }
    }

    return base;
  }
};
