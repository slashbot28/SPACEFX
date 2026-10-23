// ========================================================
// CODEPEN COMMUNITY MASTERPIECES COLLECTION (14 EFFECTS)
// Integrated with universal Google Fonts & custom controls
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// --------------------------------------------------------
// 1. Vertical Fan — Text Loop Timeline
// Author: JP Belley (@jpbelley) (https://codepen.io/jpbelley/pen/JobwWaP)
// --------------------------------------------------------
window.EffectRegistry['jpbelley-vertical-fan'] = {
  id: 'jpbelley-vertical-fan',
  title: "Vertical Fan — Text Loop Timeline",
  category: 'Special / Experimental',
  tech: 'GSAP Typography Timeline',
  github: 'https://codepen.io/jpbelley/pen/JobwWaP',
  description: "Typografische verticale waaier-animatie met looping tekst, instelbare lettertypen en snelheidscontrole.",
  defaultSettings: {
  "fontFamily": "'Recursive', sans-serif",
  "customWords": "DESIGN,MOTION,CODE,FUTURE,VISION",
  "speed": 1,
  "textColor": "#e8eaf0",
  "bgColor": "#080710"
},
  controls: [
  {
    "type": "select",
    "key": "fontFamily",
    "label": "Lettertype (Font)",
    "options": [
      {
        "value": "'Recursive', sans-serif",
        "label": "Recursive (Modern Variable)"
      },
      {
        "value": "'Montserrat', sans-serif",
        "label": "Montserrat (Geometric Bold)"
      },
      {
        "value": "'Cinzel', serif",
        "label": "Cinzel (Classical Elegant)"
      },
      {
        "value": "'Fira Code', monospace",
        "label": "Fira Code (Cyber Monospace)"
      },
      {
        "value": "'Orbitron', sans-serif",
        "label": "Orbitron (Futuristic Sci-Fi)"
      },
      {
        "value": "'Pacifico', cursive",
        "label": "Pacifico (Retro Script)"
      }
    ]
  },
  {
    "type": "text",
    "key": "customWords",
    "label": "Woordenlijst (komma gescheiden)"
  },
  {
    "type": "range",
    "key": "speed",
    "label": "Animatie Snelheid",
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
    "label": "Achtergrondkleur"
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
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.iframe = null;
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    let base = "<!DOCTYPE html>\n<html lang=\"en\" >\n\n<head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap\" rel=\"stylesheet\">\n  \n  <meta charset=\"UTF-8\">\n  \n\n    <link rel=\"apple-touch-icon\" type=\"image/png\" href=\"https://cpwebassets.codepen.io/assets/favicon/apple-touch-icon-5ae1a0698dcc2402e9712f7d01ed509a57814f994c660df9f7a952f3060705ee.png\" />\n\n    <meta name=\"apple-mobile-web-app-title\" content=\"CodePen\">\n\n    <link rel=\"icon\" type=\"image/x-icon\" href=\"https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico\" />\n\n    <link rel=\"mask-icon\" type=\"image/x-icon\" href=\"https://cpwebassets.codepen.io/assets/favicon/logo-pin-b4b4269c16397ad2f0f7a01bcdf513a1994f4c94b8af2f191c09eb0d601762b1.svg\" color=\"#111\" />\n\n\n\n  \n    <script src=\"https://cpwebassets.codepen.io/assets/common/stopExecutionOnTimeout-f07739098a39bd4e74ddd974652dac904146f33fdc1ecab356e8c809a05faccb.js\"></script>\n\n\n  <title>Vertical Fan | Text Loop Timeline Animation</title>\n\n    <link rel=\"canonical\" href=\"https://codepen.io/jpbelley/pen/JobwWaP\">\n  \n  \n  \n  \n<style>\n*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n\nbody {\n  background: #080710;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  overflow: hidden;\n}\n\n#stage {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.text {\n  font-family: 'Recursive', sans-serif;\n  font-size: clamp(52px, 10vw, 116px);\n  font-weight: 400;\n  color: rgba(232, 234, 240, 0.92);\n  letter-spacing: -0.02em;\n  line-height: 1;\n  display: flex;\n}\n\n.ghost-layer {\n  opacity: 0.14;\n  user-select: none;\n  pointer-events: none;\n}\n\n.char {\n  display: inline-block;\n  white-space: pre;\n  will-change: transform, opacity;\n}\n\n#credit {\n  position: fixed;\n  bottom: 20px;\n  right: 24px;\n  font-family: 'DM Mono', monospace;\n  font-size: 22px;\n  font-weight: 300;\n  letter-spacing: 0.1em;\n  color: rgba(255,255,255,0.9);\n  text-decoration: none;\n  transition: color 0.2s;\n  z-index: 10;\n}\n#credit:hover { color: rgba(255,255,255,0.55); }\n#credit span { color: rgba(255,255,255,0.4); }\n</style>\n\n  <script>\n  window.console = window.console || function(t) {};\n</script>\n\n  \n  \n</head>\n\n<body translate=\"no\">\n  <link href=\"https://fonts.googleapis.com/css2?family=Recursive:wght,CASL,MONO,slnt,CRSV@300..1000,0..1,0..1,-15..0,0..1&display=swap\" rel=\"stylesheet\">\n\n<div id=\"stage\"></div>\n\n<a href=\"https://jeanphilippebelley.com/\" target=\"_blank\" id=\"credit\">\n  JP<span>.</span>\n</a>\n  \n    <script id=\"rendered-js\" >\n// ─── Config ───────────────────────────���───────────────────────────────────────\nconst WORD = 'Always';\nconst STAGE = document.getElementById('stage');\n\n// ─── Loop & run ───────────────────────────────────────────────────────────────\nlet _raf = null;\nfunction loop(tick) {\n  cancelAnimationFrame(_raf);\n  (function frame() {tick();_raf = requestAnimationFrame(frame);})();\n}\nfunction run(fn) {fn();}\n\n// ─── Easing ────────────────────────────────────────────────────\nconst ease = {\n  out: t => 1 - (1 - t) ** 3,\n  in: t => t ** 3,\n  inOut: t => t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2,\n  outBack: t => {const c = 1.70158 + 1;return 1 + c * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2;},\n  bounce: t => {\n    const n = 7.5625,d = 2.75;\n    if (t < 1 / d) return n * t * t;\n    if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75;\n    if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375;\n    return n * (t -= 2.625 / d) * t + 0.984375;\n  } };\n\n\n// ─── Cycle progress ──────────────────────────────────���────────────────\n// Returns 0 (at home) → 1 (at target) → 0 (back home) on a fixed timing loop.\n// When p = 0: live letter is invisible — ghost shows the home position.\n// When p = 1: live letter is fully visible at its displaced position.\nfunction cyc(f, offset, enter, hold, exit, pause, eIn = ease.out, eOut = ease.in) {\n  if (f < offset) return 0;\n  const total = enter + hold + exit + pause;\n  const t = (f - offset) % total;\n  if (t < enter) return eIn(t / enter);\n  if (t < enter + hold) return 1;\n  if (t < enter + hold + exit) return 1 - eOut((t - enter - hold) / exit);\n  return 0;\n}\n\nconst lerp = (a, b, t) => a + (b - a) * t;\n\n// ─── Ghost setup ──────────────────────────────────────────────────────────────\n// Builds two overlapping layers inside #stage:\n//\n//   .ghost-layer  — static word at 14% opacity, always visible, gives natural\n//                   width/height so the wrapper holds its size.\n//   .live-layer   — absolutely positioned on top, same chars start at opacity 0.\n//                   Animations move these chars and fade them in/out with p.\n//\n// When p = 0  → live letter invisible, ghost reads as the home position.\n// When p = 1  → live letter fully visible at displaced position, ghost faint.\n// As p → 0    → live letter fades out, ghost seamlessly takes over.\n//\n// Returns an array of the live <span> elements (one per character).\nfunction setup(text = WORD) {\n  STAGE.innerHTML = '';\n\n  const wrap = document.createElement('div');\n  wrap.style.cssText = 'position:relative; display:inline-flex; align-items:center; justify-content:center;';\n  STAGE.appendChild(wrap);\n\n  const ghostEl = document.createElement('div');\n  ghostEl.className = 'text ghost-layer';\n  ghostEl.setAttribute('aria-hidden', 'true');\n\n  const liveEl = document.createElement('div');\n  liveEl.className = 'text';\n  liveEl.style.cssText = 'position:absolute; top:0; left:0; display:flex; pointer-events:none;';\n\n  const chars = text.split('').map(ch => {\n    const gc = ch === ' ' ? '\\u00a0' : ch;\n\n    const g = document.createElement('span');\n    g.className = 'char';\n    g.textContent = gc;\n    ghostEl.appendChild(g);\n\n    const l = document.createElement('span');\n    l.className = 'char';\n    l.textContent = gc;\n    l.style.opacity = '1';\n    liveEl.appendChild(l);\n\n    return l;\n  });\n\n  wrap.appendChild(ghostEl);\n  wrap.appendChild(liveEl);\n  return chars;\n}\n\n// Vertical Fan\nfunction vertical_fan() {\n  const chars = setup();\n  const N = chars.length;\n  let f = 0;\n  loop(() => {\n    const center = (N - 1) / 2;\n    chars.forEach((ch, i) => {\n      const p = cyc(f, i * 5, 40, 40, 36, 44, ease.out, ease.in);\n      const dist = Math.abs(i - center) * 32 + 22;\n      const dir = i % 2 === 0 ? -1 : 1;\n      ch.style.transform = `translateY(${dir * dist * p}px)`;\n    });\n    f++;\n  });\n}\n\nrun(vertical_fan);\n//# sourceURL=pen.js\n  </script>\n\n  \n</body>\n\n</html>\n";

    // Inject customization overrides into base
    const customStyles = [];
    let customScript = '';

    
      customStyles.push(`
        .text { font-family: ${s.fontFamily || "'Recursive', sans-serif"} !important; color: ${s.textColor || '#e8eaf0'} !important; }
        body { background: ${s.bgColor || '#080710'} !important; }
      `);
      if (s.customWords) {
        customScript += `
          const newWords = ${JSON.stringify(s.customWords)}.split(',').map(w => w.trim()).filter(Boolean);
          if (newWords.length > 0) {
            const els = document.querySelectorAll('.text, [data-word]');
            els.forEach((el, idx) => {
              el.textContent = newWords[idx % newWords.length];
            });
          }
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
// 2. Two Sides — Dual Split SVG Mask
// Author: Chris Bolson (@cbolson) (https://codepen.io/editor/cbolson/pen/019faec6-938b-73ab-bd3e-71ba9d1d053e)
// --------------------------------------------------------
window.EffectRegistry['cbolson-two-sides'] = {
  id: 'cbolson-two-sides',
  title: "Two Sides — Dual Split SVG Mask",
  category: 'Css 3D Effect',
  tech: 'SVG Dual Split & CSS',
  github: 'https://codepen.io/editor/cbolson/pen/019faec6-938b-73ab-bd3e-71ba9d1d053e',
  description: "Gesplitste dual-layer presentatie met diagonale interactie en contrasterende kleuren.",
  defaultSettings: {
  "fontFamily": "'Montserrat', sans-serif",
  "customText": "2.0",
  "primaryColor": "#00d2ff",
  "accentColor": "#ff2d55",
  "bgColor": "#08080c"
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
        "label": "Cinzel (Serif Classic)"
      },
      {
        "value": "'Fira Code', monospace",
        "label": "Fira Code (Code)"
      },
      {
        "value": "'Space Grotesk', sans-serif",
        "label": "Space Grotesk"
      }
    ]
  },
  {
    "type": "text",
    "key": "customText",
    "label": "Weergave Tekst"
  },
  {
    "type": "color",
    "key": "primaryColor",
    "label": "Kleur Links"
  },
  {
    "type": "color",
    "key": "accentColor",
    "label": "Kleur Rechts"
  },
  {
    "type": "color",
    "key": "bgColor",
    "label": "Achtergrondkleur"
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
    this.iframe.setAttribute('title', "Two Sides — Dual Split SVG Mask");

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
    let base = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap\" rel=\"stylesheet\">\n\n<meta property=\"og:description\" content=\"Made on CodePen by Chris Bolson\">\n<meta property=\"og:image\" content=\"https://019faec6-938b-73ab-bd3e-71ba9d1d053e.codepen.dev/.codepen/screenshots/eec73845d808cbac0c673434bf2cefe7caed97e0f12cfdd397f87ec822022961/1280.jpg\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<link rel=\"icon\" href=\"https://public.codepenassets.com/favicon/favicon.ico\">\n\n    <meta charset=\"UTF-8\">\n    <style>\n*,::before {\n\tbox-sizing: border-box;\n}\n\n@property --bg-angle {\n  inherits: false;\n  initial-value: 0turn;\n  syntax: '<angle>';\n}\n\n@keyframes gradient-spin {\n  to {\n    --bg-angle: 1turn;\n  }\n}\n\n:root {\n  --bg: conic-gradient(from var(--bg-angle, 0deg), rgb(255, 221, 64), rgb(71, 207, 115), rgb(14, 190, 255), rgb(174, 99, 228), rgb(255, 221, 64));\n  animation: gradient-spin 10s linear infinite;\n}\n\nbody {\n\tmin-height: 100vh;\n  background-image: linear-gradient(#FFFa, #FFFa), var(--bg);\n\t\n\tdisplay: grid;\n\tplace-content: center;\n\tperspective: 600px;\n}\n\n.two {\n  font-size: min(20vw, 60px);\n  width: 6em;\n\tdisplay: grid;\n\tplace-items: center;\n\t\n\ttransform-style: preserve-3d;\n\tanimation: --k-rotate 10s infinite reverse  linear;\n\t\n\t*,&::before{\n\t\tgrid-area: 1/1;\n\t\tborder: solid 0.25em transparent;\n\t  border-radius: 0.25em;\n\t  corner-shape: notch;\n\t}\n\t\n\t/* gradient */\n\t&::before{\n\t\tcontent: '';\n\t\twidth:100%;\n\t\theight:100%;\n\t\tbackground-image: var(--bg);\n\t  background-origin: border-box;\n\t\ttransform: translateZ(0);\n\t}\n  \n\tsvg{\n\t  background: #000a;\n\t\twidth: 80%;\n\t\theight:80%;\n\t\t&.v2{\n\t\t  padding: .5em;\n\t\t\tscale: -1 1;\n\t\t\tfill: #FFF;\n\t\t\ttransform: translateZ(-30px);\t\n\t\t}\n\t\t&.logo{\n\t\t\tcolor: white;\n\t\t\ttransform: translateZ(30px);\n\t\t}\n\t}\n}\n\n@keyframes --k-rotate{\n\tto{\n      transform: rotateY(360deg);\n\t}\n}\n</style>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>CodePen Challenge: Two</title>\n  </head>\n  <body>\n\n    <div class=\"two\">\n      <svg class=\"v2\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" viewBox=\"0 0 18 8\" shape-rendering=\"crispEdges\">\n\t      <text fill-opacity=\"0\" stroke-opacity=\"0\" x=\"18\" y=\"8\">2.0</text>\n\t      <path d=\"M7 8H0V4h1V3h4V2H0V0h6v1h1v3H6v1H3v1h4zm3 0H8V6h2zm7 0h-5V7h-1V1h1V0h5v1h1v6h-1zm-4-2h3V2h-3z\"/>\n\t    </svg>\n\n\t\t\t<svg class=\"logo\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 138 26\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M80 6h-9v14h9 M114 6h-9 v14h9 M111 13h-6 M77 13h-6 M122 20V6l11 14V6 M22 16.7L33 24l11-7.3V9.3L33 2L22 9.3V16.7z M44 16.7L33 9.3l-11 7.4 M22 9.3l11 7.3 l11-7.3 M33 2v7.3 M33 16.7V24 M88 14h6c2.2 0 4-1.8 4-4s-1.8-4-4-4h-6v14 M15 8c-1.3-1.3-3-2-5-2c-4 0-7 3-7 7s3 7 7 7 c2 0 3.7-0.8 5-2 M64 13c0 4-3 7-7 7h-5V6h5C61 6 64 9 64 13z\"/>\n</svg>\n  </div>\n    \n  </body>\n</html>\n";

    // Inject customization overrides into base
    const customStyles = [];
    let customScript = '';

    
      customStyles.push(`
        body { background: ${s.bgColor || '#08080c'} !important; }
        .two text, .v2 text { font-family: ${s.fontFamily || "'Montserrat', sans-serif"} !important; fill: ${s.primaryColor || '#00d2ff'} !important; }
        .logo { color: ${s.accentColor || '#ff2d55'} !important; }
      `);
      if (s.customText) {
        customScript += `
          const txtEl = document.querySelector('.v2 text, .two text');
          if (txtEl) txtEl.textContent = ${JSON.stringify(s.customText)};
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
// 3. Melty Liquid SVG Text Filter
// Author: Luke Murphy (@lurkmoophy) (https://codepen.io/editor/lurkmoophy/pen/019facf7-7d5c-7a2d-8e36-f50cf065a874)
// --------------------------------------------------------
window.EffectRegistry['lurkmoophy-melty-text'] = {
  id: 'lurkmoophy-melty-text',
  title: "Melty Liquid SVG Text Filter",
  category: 'Special / Experimental',
  tech: 'SVG feTurbulence & feDisplacementMap',
  github: 'https://codepen.io/editor/lurkmoophy/pen/019facf7-7d5c-7a2d-8e36-f50cf065a874',
  description: "Vloeiende smeltende en druipende vloeistoftekst via dynamische SVG displacement- en turbulentiefilters.",
  defaultSettings: {
  "fontFamily": "'Archivo Black', sans-serif",
  "customText": "IT'S TOO HOT",
  "meltIntensity": 20,
  "textColor": "#e84005",
  "bgColor": "#160a06"
},
  controls: [
  {
    "type": "select",
    "key": "fontFamily",
    "label": "Lettertype (Font)",
    "options": [
      {
        "value": "'Archivo Black', sans-serif",
        "label": "Archivo Black (Ultra Heavy)"
      },
      {
        "value": "'Montserrat', sans-serif",
        "label": "Montserrat (Geometric)"
      },
      {
        "value": "'Cinzel', serif",
        "label": "Cinzel (Serif)"
      },
      {
        "value": "'Orbitron', sans-serif",
        "label": "Orbitron (Sci-Fi)"
      },
      {
        "value": "'Great Vibes', cursive",
        "label": "Great Vibes (Flowing)"
      }
    ]
  },
  {
    "type": "text",
    "key": "customText",
    "label": "Smelt Tekst"
  },
  {
    "type": "range",
    "key": "meltIntensity",
    "label": "Druip / Smeltkracht",
    "min": 5,
    "max": 50,
    "step": 1
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
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.iframe = null;
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    let base = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap\" rel=\"stylesheet\">\n\n<meta property=\"og:description\" content=\"Made on CodePen by Luke\">\n<meta property=\"og:image\" content=\"https://019facf7-7d5c-7a2d-8e36-f50cf065a874.codepen.dev/.codepen/screenshots/81f2ac54c43be232ffbd40af9ddd30acafeec8c2929df6cffe010dc86350d53b/1280.jpg\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<link rel=\"icon\" href=\"https://public.codepenassets.com/favicon/favicon.ico\">\n\n    <meta charset=\"UTF-8\">\n    <style>\n@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');\n\n* { box-sizing: border-box; margin: 0; }\n\nbody {\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  background: radial-gradient(ellipse at 50% 120%, #3a1206 0%, #160a06 60%, #0d0605 100%);\n  overflow: hidden;\n}\n\n.melt-wrap {\n  display: grid;\n  font-size: clamp(3rem, 12vw, 9rem);\n  text-align: center;\n  text-transform: uppercase;\n  padding: 3rem 3rem 9rem; /* extra bottom room for drips to run into */\n  cursor: pointer;\n  user-select: none;\n  --line: 0%;    /* how far down the melt front has traveled */\n  --feather: 20%; /* softness of the front / length of drip trail-off */\n}\n\n.melt-squish {\n  display: grid;\n  transform-origin: 50% 100%; /* squish down onto the baseline */\n  will-change: transform;\n}\n\n.melt-text {\n  grid-area: 1 / 1;\n  font-family: 'Archivo Black', 'Arial Black', sans-serif;\n  font-size: 1em;\n  line-height: 1;\n  letter-spacing: -0.1em;\n  color: #e84005;\n}\n\n/* solid, unmelted text — hidden above the melt front, crisp below it */\n.melt-crisp {\n  mask-image: linear-gradient(to bottom,\n    transparent 0%,\n    transparent var(--line),\n    black calc(var(--line) + var(--feather)));\n  -webkit-mask-image: linear-gradient(to bottom,\n    transparent 0%,\n    transparent var(--line),\n    black calc(var(--line) + var(--feather)));\n}\n\n/* liquefied duplicate — visible only from the top down to the melt front,\n   stretched downward so the goo visibly runs past its original footprint */\n.melt-ice {\n  filter: url(#melt) drop-shadow(0 0px 40px rgba(200, 20, 0, 0.1));\n  transform-origin: 50% 0%;\n  will-change: transform;\n  mask-image: linear-gradient(to bottom,\n    rgba(0,0,0,0.9) 0%,\n    rgba(0,0,0,0.9) var(--line),\n    transparent calc(var(--line) + var(--feather)));\n  -webkit-mask-image: linear-gradient(to bottom,\n    rgba(0,0,0,0.9) 0%,\n    rgba(0,0,0,0.9) var(--line),\n    transparent calc(var(--line) + var(--feather)));\n}\n</style>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Melty Text</title>\n  </head>\n  <body>\n    <svg width=\"0\" height=\"0\" aria-hidden=\"true\" focusable=\"false\">\n      <filter id=\"melt\" x=\"-30%\" y=\"-40%\" width=\"160%\" height=\"320%\" color-interpolation-filters=\"sRGB\">\n        <feTurbulence id=\"melt-noise\" type=\"fractalNoise\" baseFrequency=\"0.025 0.006\" numOctaves=\"2\" seed=\"4\" result=\"noise\"/>\n        <!-- damp R (horizontal) so goo droops instead of shredding sideways;\n             boost G contrast and bias it below 0.5 so displacement pulls downward -->\n        <feColorMatrix in=\"noise\" type=\"matrix\"\n          values=\"0.3 0 0 0 0.35\n                  0   3 0 0 -0.6\n                  0   0 1 0 0\n                  0   0 0 0 1\" result=\"drip-noise\"/>\n        <feDisplacementMap id=\"melt-disp\" in=\"SourceGraphic\" in2=\"drip-noise\" scale=\"0\" xChannelSelector=\"R\" yChannelSelector=\"G\" result=\"displaced\"/>\n        <feGaussianBlur id=\"melt-blur\" in=\"displaced\" stdDeviation=\"0\" result=\"smeared\"/>\n        <!-- gooey pass: re-sharpen the blurred alpha so the smear solidifies into liquid blobs -->\n        <feColorMatrix id=\"melt-goo\" in=\"smeared\" type=\"matrix\"\n          values=\"1 0 0 0 0\n                  0 1 0 1 0\n                  0 0 1 0 0\n                  0 0 0 1 0\"/>\n      </filter>\n    </svg>\n    \n    <main class=\"scene\">\n      <div class=\"melt-wrap\">\n        <div class=\"melt-squish\">\n          <h1 class=\"melt-text melt-crisp\">it's too hot</h1>\n          <h1 class=\"melt-text melt-ice\" aria-hidden=\"true\">it's too hot</h1>\n        </div>\n      </div>\n    </main>\n    <script>\nconst wrap = document.querySelector('.melt-wrap');\nconst ice = document.querySelector('.melt-ice');\nconst disp = document.getElementById('melt-disp');\nconst squish = document.querySelector('.melt-squish');\nconst blur = document.getElementById('melt-blur');\nconst noise = document.getElementById('melt-noise');\nconst goo = document.getElementById('melt-goo');\n\nconst MAX_SCALE = 5;    // displacement strength at full melt\nconst MAX_BLUR = 20;      // smear that the goo pass re-solidifies into drips\nconst ICE_STRETCH = 0; // how far the liquefied layer elongates downward\nconst MELT_TAU = 5;    // seconds — melt front travels down over roughly this long\nconst FREEZE_TAU = 7;    // seconds — slow reverse when you leave\nconst SQUISH_MIN = 0.1; // the amount the text squishes down to\n\nlet target = 0;\nlet melt = 0;\nlet raf = null;\nlet last = null;\n\nwrap.addEventListener('pointerenter', () => { target = 1; start(); });\nwrap.addEventListener('pointerleave', () => { target = 0; start(); });\n\nfunction start() {\n  if (raf === null) { last = null; raf = requestAnimationFrame(tick); }\n}\n\nfunction tick(now) {\n  const dt = last === null ? 1 / 60 : Math.min((now - last) / 1000, 0.1);\n  last = now;\n\n  const tau = target > melt ? MELT_TAU : FREEZE_TAU;\n  melt += (target - melt) * (1 - Math.exp(-dt / tau));\n  if (Math.abs(target - melt) < 0.001) melt = target;\n\n  // the molten surface writhes a little while hot\n  const wobble = Math.sin(now * 0.0012) * 0.01 * melt;\n  noise.setAttribute('baseFrequency', `${(0.025 + wobble).toFixed(4)} 0.006`);\n\n  disp.setAttribute('scale', (MAX_SCALE * melt).toFixed(2));\n  blur.setAttribute('stdDeviation', (MAX_BLUR * melt).toFixed(2));\n\n  // alpha contrast: identity at rest, hard liquid threshold when molten\n  const aMul = 1 + melt * 15;\n  const aOff = -melt * 6;\n  goo.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${aMul.toFixed(2)} ${aOff.toFixed(2)}`);\n\n  // stretch the liquefied duplicate downward so goo visibly runs past the front\n  ice.style.transform = `scaleY(${(1 + ICE_STRETCH * melt).toFixed(4)})`;\n  \n  // the whole word squishes down toward the baseline as it melts\n  squish.style.transform = `scaleY(${(1 - (1 - SQUISH_MIN) * melt).toFixed(4)})`;\n\n  // the melt front travels down through the letterforms\n  wrap.style.setProperty('--line', (melt * 100).toFixed(1) + '%');\n  // drips trail off further behind the front the longer it's been melting\n  wrap.style.setProperty('--feather', (8 + 22 * melt).toFixed(1) + '%');\n\n  // stretch the liquefied duplicate downward so goo visibly runs past the front\n  ice.style.transform = `scaleY(${(1 + ICE_STRETCH * melt).toFixed(4)})`;\n\n  if (melt === 0 && target === 0) { raf = null; return; }\n  raf = requestAnimationFrame(tick);\n}\n</script>\n  </body>\n</html>\n";

    // Inject customization overrides into base
    const customStyles = [];
    let customScript = '';

    
      customStyles.push(`
        .melt-text { font-family: ${s.fontFamily || "'Archivo Black', sans-serif"} !important; color: ${s.textColor || '#e84005'} !important; }
        body { background: ${s.bgColor || '#160a06'} !important; }
        .melt-wrap { --feather: ${s.meltIntensity || 20}%; }
      `);
      if (s.customText) {
        customScript += `
          document.querySelectorAll('.melt-text').forEach(el => {
            el.textContent = ${JSON.stringify(s.customText)};
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
// 4. Colorful Spiky Sphere 3D (Pure CSS)
// Author: Amit Sheen (@amit_sheen) (https://codepen.io/editor/amit_sheen/pen/019f95cf-c90e-761d-8b37-e0e823a8d611)
// --------------------------------------------------------
window.EffectRegistry['amit-spiky-sphere'] = {
  id: 'amit-spiky-sphere',
  title: "Colorful Spiky Sphere 3D (Pure CSS)",
  category: 'Css 3D Effect',
  tech: 'Pure CSS 3D Transforms',
  github: 'https://codepen.io/editor/amit_sheen/pen/019f95cf-c90e-761d-8b37-e0e823a8d611',
  description: "Geometrische pulserende stekelbol volledig opgebouwd uit pure CSS 3D elementen en keyframe transformaties.",
  defaultSettings: {
  "speed": 1,
  "scale": 1,
  "spikeColor": "#00ffff",
  "bgColor": "#000000"
},
  controls: [
  {
    "type": "range",
    "key": "speed",
    "label": "Rotatiesnelheid",
    "min": 0.2,
    "max": 3,
    "step": 0.1
  },
  {
    "type": "range",
    "key": "scale",
    "label": "Grootte Schaal",
    "min": 0.5,
    "max": 2,
    "step": 0.1
  },
  {
    "type": "color",
    "key": "spikeColor",
    "label": "Stekel Glow Tint"
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
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.iframe = null;
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    let base = "<!DOCTYPE html>\n<html lang=\"en\">\n\n  <head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap\" rel=\"stylesheet\">\n\n<meta property=\"og:description\" content=\"Made on CodePen by Amit Sheen\">\n<meta property=\"og:image\" content=\"https://019f95cf-c90e-761d-8b37-e0e823a8d611.codepen.dev/.codepen/screenshots/419f5aeb64c5042cf15afc3bfae151302375e0071811afe845683049f40118eb/1280.jpg\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<link rel=\"icon\" href=\"https://public.codepenassets.com/favicon/favicon.ico\">\n\n    <meta charset=\"UTF-8\">\n    <title>Colorful Spiky Sphere (CSS)</title>\n    <style>\n*, *::before, *::after {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    background-color: #111;\n    color: #fff;\n    min-height: 100vh;\n    display: grid;\n    place-items: center;\n    perspective: 600px;\n    overflow: clip;\n    \n    * {\n        transform-style: preserve-3d;\n    }\n}\n\n.scene {\n    position: relative;\n    animation: scene 24s infinite linear;\n    \n    * { position: absolute; }\n}\n\n@keyframes scene {\n    from { transform: rotateX(0deg) rotateZ(0deg);}\n    to { transform: rotateX(360deg) rotateZ(360deg);}\n}\n\n.spike {\n    inset: -3em;\n    animation: spike\n        calc(sin(var(--s) * 137.5deg) * 0.5s + 2s) /* duration variation */\n        calc(sin(var(--s) * 222.5deg) * 6s - 6s) /* 'random' delay */\n        infinite ease-in-out alternate;\n\n    &:has(i:nth-child(6)) {\n        --side-angle-z: 60deg;\n        --side-angle-x: -49deg;\n        --bottom-size: 2.6em;\n    }\n    \n    --color1: hsl(calc(var(--s) * 11.25) 100% 8%);\n    --color2: hsl(calc(var(--s) * 11.25) 100% 4%);\n    --border: #fff;\n\n    i {\n        left: 50%; bottom: 50%;\n        width: 3em; height: 4em;\n        transform-origin: bottom;\n        transform:\n            translateX(-50%)\n            rotateZ(calc(var(--i) * var(--side-angle-z, 72deg)))\n            translateY(var(--bottom-size, 2.1em))\n            rotateX(var(--side-angle-x, -58deg));\n        opacity: 0.9;\n        background-image: \n            linear-gradient(0deg, var(--border) 1px, transparent 0),\n            conic-gradient(from 159deg at 50% 3px, var(--color1), var(--color2) 42deg, transparent 0),\n            conic-gradient(from 159deg at top, var(--border) 42deg, transparent 0);\n    }\n\n    &.a {\n        --transform: translateZ(7.5em) rotateZ(37.5deg);\n    }\n    &.b {\n        --transform: rotate(calc(var(--s) * 72deg)) rotateX(37.5deg) translateZ(7.3em);\n    }\n    &.c {\n        --transform: rotate(calc(var(--s) * 72deg + 36deg)) rotateX(64deg) translateZ(7.5em) rotateZ(180deg);\n    }\n    &.d {\n        --transform: rotate(calc(var(--s) * 72deg)) rotateX(79deg) translateZ(7.3em);\n    }\n    &.e {\n        --transform: rotate(calc(var(--s) * 72deg + 36deg)) rotateX(101deg) translateZ(7.3em);\n    }\n    &.f {\n        --transform: rotate(calc(var(--s) * 72deg)) rotateX(116deg) translateZ(7.5em);\n    }\n    &.g {\n        --transform: rotate(calc(var(--s) * 72deg + 36deg)) rotateX(142.5deg) translateZ(7.3em);\n    }\n    &.h {\n        --transform: rotateX(180deg) translateZ(7.5em) rotateZ(37.5deg);\n    }\n}\n\n@keyframes spike {\n    from { transform: var(--transform, ) scaleZ(0.25);}\n    to {  transform: var(--transform, ) scaleZ(2.5);}\n}\n</style>\n  </head>\n\n  <body>\n    <div class=\"scene\">\n    <div class=\"spike a\" style=\"--s: 0;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n    </div>\n    <div class=\"spike b\" style=\"--s: 1;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike b\" style=\"--s: 2;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike b\" style=\"--s: 3;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike b\" style=\"--s: 4;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike b\" style=\"--s: 5;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike c\" style=\"--s: 6;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n    </div>\n    <div class=\"spike c\" style=\"--s: 7;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n    </div>\n    <div class=\"spike c\" style=\"--s: 8;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n    </div>\n    <div class=\"spike c\" style=\"--s: 9;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n    </div>\n    <div class=\"spike c\" style=\"--s: 10;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n    </div>\n    <div class=\"spike d\" style=\"--s: 11;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike d\" style=\"--s: 12;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike d\" style=\"--s: 13;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike d\" style=\"--s: 14;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike d\" style=\"--s: 15;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike e\" style=\"--s: 16;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike e\" style=\"--s: 17;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike e\" style=\"--s: 18;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike e\" style=\"--s: 19;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike e\" style=\"--s: 20;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike f\" style=\"--s: 21;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n    </div>\n    <div class=\"spike f\" style=\"--s: 22;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n    </div>\n    <div class=\"spike f\" style=\"--s: 23;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n    </div>\n    <div class=\"spike f\" style=\"--s: 24;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n    </div>\n    <div class=\"spike f\" style=\"--s: 25;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n    </div>\n    <div class=\"spike g\" style=\"--s: 26;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike g\" style=\"--s: 27;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike g\" style=\"--s: 28;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike g\" style=\"--s: 29;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike g\" style=\"--s: 30;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n        <i style=\"--i: 5;\"></i>\n    </div>\n    <div class=\"spike h\" style=\"--s: 31;\">\n        <i style=\"--i: 0;\"></i>\n        <i style=\"--i: 1;\"></i>\n        <i style=\"--i: 2;\"></i>\n        <i style=\"--i: 3;\"></i>\n        <i style=\"--i: 4;\"></i>\n    </div>\n\n</div>\n\n    <script src=\"https://assets.codepen.io/1948355/twitterButton-2.1.0.js\"></script>\n  </body>\n\n</html>";

    // Inject customization overrides into base
    const customStyles = [];
    let customScript = '';

    
      customStyles.push(`
        body { background-color: ${s.bgColor || '#000000'} !important; }
        .scene { transform: scale(${s.scale || 1}); --duration: ${3 / (s.speed || 1)}s !important; }
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
// --------------------------------------------------------
window.EffectRegistry['ccrch-white-stripes'] = {
  id: 'ccrch-white-stripes',
  title: "The White Stripes — Audio Visual Canvas Waves",
  category: 'Physics & Simulation',
  tech: 'HTML5 Canvas Dynamic Sine Waves',
  github: 'https://codepen.io/editor/ccrch/pen/019ff211-11e2-7b76-904c-e2616c688373',
  description: "Geanimeerde organische strepen en golflijnen geïnspireerd door rockesthetiek en oscilloscoop-visualisaties.",
  defaultSettings: {
  "waveSpeed": 1,
  "amplitude": 50,
  "stripeColor": "#ffffff",
  "bgColor": "#c01818"
},
  controls: [
  {
    "type": "range",
    "key": "waveSpeed",
    "label": "Golf Snelheid",
    "min": 0.2,
    "max": 3,
    "step": 0.1
  },
  {
    "type": "range",
    "key": "amplitude",
    "label": "Golfhoogte",
    "min": 10,
    "max": 120,
    "step": 5
  },
  {
    "type": "color",
    "key": "stripeColor",
    "label": "Kleur Strepen"
  },
  {
    "type": "color",
    "key": "bgColor",
    "label": "Achtergrondkleur"
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
    this.iframe.setAttribute('title', "The White Stripes — Audio Visual Canvas Waves");

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
    let base = "<!-- \n\nMinisite prototype for https://twentyonepilots.is/7-21.\nBased on https://codepen.io/editor/ccrch/pen/019fdc2f-bce2-79e7-bbae-d0e09d7fc1d5 canvas experiment.\n\nSong:\nTwenty One Pilots Cover The White Stripes \"Seven Nation Army\" | Rock Hall 2025 Induction\nhttps://youtu.be/-D_uT0kXlRw\n\nMade with <❤/> at Vettvangur - https://vettvangur.is/\nCcrch </> playground - https://ccrch.com/playground\n \n-->\n\n<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap\" rel=\"stylesheet\">\n\n<meta property=\"og:description\" content=\"Minisite prototype for https://twentyonepilots.is/7-21. Based on https://codepen.io/editor/ccrch/pen/019fdc2f-bce2-79e7-bbae-d0e09d7fc1d5 canvas experiment…\">\n<meta property=\"og:image\" content=\"https://019ff211-11e2-7b76-904c-e2616c688373.codepen.dev/.codepen/screenshots/74388bf49b600d2105b03ecc6407a29c000e7ee0d085101b3564ba1dbf9fa6e8/1280.jpg\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<link rel=\"icon\" href=\"https://public.codepenassets.com/favicon/favicon.ico\">\n\n<script type=\"importmap\">\n{\n  \"imports\": {\n    \"gsap\": \"https://esm.sh/gsap@^3.15.0\"\n  }\n}\n</script>\n\n    <meta charset=\"UTF-8\">\n    <style>\n@import url(\"https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap\");\nhtml {\n  --playground-body-color-background: color-mix(in srgb, #212121, black 21%);\n  --playground-body-color-text: #e0e0e0;\n  scrollbar-width: thin;\n  color-scheme: dark light;\n}\n\nbody {\n  margin: 0;\n  overflow: hidden;\n  background: var(--playground-body-color-background);\n  color: var(--playground-body-color-text);\n  font-family: \"DM Sans\", sans-serif;\n}\nbody * {\n  box-sizing: border-box;\n}\n\n.top-7-21 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  z-index: 1;\n  width: 100%;\n  height: 100vh;\n  background: var(--playground-body-color-background);\n}\n.top-7-21-loader {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: fixed;\n  inset: 0;\n  z-index: 21;\n  padding: 0 79px;\n  background: var(--playground-body-color-background);\n  color: color-mix(in srgb, #fff, transparent 42%);\n  font-size: 9px;\n  font-weight: 500;\n  line-height: 2;\n  text-align: center;\n}\n.top-7-21-loader span {\n  opacity: 0;\n}\n.top-7-21-container {\n  position: relative;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n}\n.top-7-21-button {\n  position: absolute;\n  inset: 46% auto auto 50%;\n  transform: translate(-50%, -50%);\n  z-index: 3;\n  background: none;\n  width: 12vw;\n  border: none;\n  font-size: 0;\n  cursor: pointer;\n}\n@media (width < 900px) {\n  .top-7-21-button {\n    width: 21vw;\n  }\n}\n@media (width < 600px) {\n  .top-7-21-button {\n    width: 28vw;\n  }\n}\n.top-7-21-button svg path {\n  fill: var(--playground-body-color-background);\n}\n.top-7-21-stripes {\n  display: block;\n  position: absolute;\n  inset: 0;\n  z-index: 2;\n  touch-action: none;\n  pointer-events: none;\n}\n.top-7-21-video {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  inset: 50% auto auto 50%;\n  z-index: 1;\n  transform: translate(-50%, -50%);\n  width: 80vw;\n  max-height: 70vh;\n  aspect-ratio: 16/9;\n  font-size: 0;\n}\n@media (width < 900px) {\n  .top-7-21-video {\n    width: 100%;\n    aspect-ratio: 3/4;\n  }\n}\n.top-7-21-video iframe {\n  width: auto;\n  height: 100%;\n  aspect-ratio: inherit;\n}\n@media (width < 900px) {\n  .top-7-21-video iframe {\n    width: 100%;\n  }\n}\n.top-7-21-hit-zone {\n  position: absolute;\n  inset: 0 0 90px;\n  z-index: 2;\n  cursor: grab;\n  touch-action: none;\n  pointer-events: none;\n}\n.top-7-21-hit-zone-active {\n  cursor: grabbing;\n}\n\nfooter {\n  position: fixed;\n  inset: auto max(21px, 2.1vw) max(21px, 2.1vw) auto;\n  z-index: 3;\n  font-family: \"DM Sans\", sans-serif;\n  font-size: max(10px, 0.7vw);\n  font-weight: 400;\n  line-height: 1;\n}\nfooter a {\n  color: inherit;\n  text-decoration: none;\n}\nfooter a span {\n  color: #ff3d00;\n}\nfooter a:not(:has(span)) {\n  text-decoration: underline;\n  text-decoration-color: #ff3d00;\n  text-decoration-thickness: 1px;\n  text-underline-offset: max(2px, 0.21vw);\n}\n\n</style>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Pen</title>\n  </head>\n  <body>\n\n    <div class=\"top-7-21\">\n      <div class=\"top-7-21-loader\">\n        <span>Meg & Jack you've inspired us all...</span>\n      </div>\n      <div class=\"top-7-21-container\">\n        <button class=\"top-7-21-button\">Play<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -960 960 960\"><path d=\"m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z\"></path></svg></button>\n        <canvas class=\"top-7-21-stripes\"></canvas>\n        <div class=\"top-7-21-video\">\n          <div></div>\n        </div>\n        <div class=\"top-7-21-hit-zone\"></div>\n      </div>\n    </div>\n\n\n    <footer>Made with <a href=\"https://ccrch.com/playground\" rel=\"noopener noreferrer\" target=\"_blank\"><<span>❤</span>/></a> at <a href=\"https://vettvangur.is\" rel=\"noopener noreferrer\" target=\"_blank\">Vettvangur</a></footer>\n    <script>\nimport gsap from 'gsap';\nconst Component = {\n    el: {\n        button: document.querySelector('.top-7-21-button'),\n        canvas: document.querySelector('.top-7-21-stripes'),\n        container: document.querySelector('.top-7-21-container'),\n        hitZone: document.querySelector('.top-7-21-hit-zone'),\n        loader: document.querySelector('.top-7-21-loader'),\n        video: document.querySelector('.top-7-21-video'),\n        videoContainer: document.querySelector('.top-7-21-video > div'),\n    },\n    interactive: false,\n    ytPlayer: null,\n    ytPlayerReady: false,\n    init() {\n        // LenisScroll.init()\n        // gsap.registerPlugin(ScrollTrigger)\n        this.handleVideo(() => {\n            this.resizeContainer();\n            this.handleStripes();\n            gsap\n                //\n                .timeline({ defaults: { duration: 1.234 } })\n                .set(this.el.video, { autoAlpha: 0 })\n                .to(this.el.loader, { autoAlpha: 0, duration: 2.1, pointerEvents: 'none' });\n        });\n    },\n    handleStartButton() {\n        gsap.to(this.el.button, { duration: 0.5, opacity: 0, pointerEvents: 'none', scale: 1.5 });\n        this.ytPlayer?.setVolume(100);\n        this.ytPlayer?.playVideo();\n        gsap.set(this.el.hitZone, { pointerEvents: 'auto' });\n        gsap.to(this.el.video, { autoAlpha: 1, duration: 2.1 });\n    },\n    handleStripes() {\n        const { container, canvas, button, hitZone } = Component.el;\n        if (!container || !canvas || !hitZone) {\n            throw new Error('Container, canvas or hit zone not found');\n        }\n        const ctx = canvas.getContext('2d');\n        if (!ctx) {\n            throw new Error('Could not get 2D context');\n        }\n        const stripes = [];\n        const pointer = {\n            x: 0,\n            y: 0,\n            active: false,\n            down: false,\n        };\n        const gravity = 0.521;\n        const damping = 0.985;\n        // const leftOffsetPercent = 12\n        // const rightOffsetPercent = 12\n        const topOffsetPercent = 0; // 4\n        const bottomOffsetPercent = 4;\n        const segmentLengthMin = 10;\n        const segmentLengthMax = 21;\n        const segmentLengthPercent = 2.1;\n        const stripeHeightVariationMinPercent = 85;\n        const stripeHeightVariationMaxPercent = 92;\n        const lineWidthMin = 1;\n        const lineWidthMax = 210; // 3\n        const lineToSpacingRatio = 0.9;\n        const textureDotRadiusRatio = 0.25;\n        const textureSpacingRatio = 1.2;\n        const iterations = 12;\n        let stripesCount = 63; // 21\n        const getSize = () => ({\n            width: container.clientWidth,\n            height: container.clientHeight,\n        });\n        const clamp = (min, value, max) => {\n            return Math.max(min, Math.min(max, value));\n        };\n        const getSegmentLength = (height) => {\n            return clamp(segmentLengthMin, height * (segmentLengthPercent / 100), segmentLengthMax);\n        };\n        const getSpacing = (width) => {\n            return width / (stripesCount + 1);\n        };\n        const getHorizontalBounds = (width) => {\n            if (!this.el.video || !this.el.video.firstElementChild || !this.el.container)\n                return;\n            const videoPercentWidth = (this.el.video.firstElementChild.clientWidth / this.el.container.clientWidth) * 100;\n            const sideOffsetPercent = ((100 - videoPercentWidth) / 2) * 0.9;\n            // const leftOffset = width * (leftOffsetPercent / 100)\n            // const rightOffset = width * (rightOffsetPercent / 100)\n            const leftOffset = width * (sideOffsetPercent / 100);\n            const rightOffset = width * (sideOffsetPercent / 100);\n            return {\n                leftOffset,\n                rightOffset,\n                availableWidth: Math.max(0, width - leftOffset - rightOffset),\n            };\n        };\n        const getLineWidth = (width) => {\n            return clamp(lineWidthMin, getSpacing(width) * lineToSpacingRatio, lineWidthMax);\n        };\n        const setStripesCount = () => {\n            let count = 63;\n            count = window.innerWidth < 1500 ? 50 : count;\n            count = window.innerWidth < 1000 ? 42 : count;\n            count = window.innerWidth < 800 ? 30 : count;\n            count = window.innerWidth < 500 ? 21 : count;\n            return count;\n        };\n        let segmentLength = getSegmentLength(getSize().height);\n        let lineWidth = getLineWidth(getSize().width);\n        const createStripes = () => {\n            stripes.length = 0;\n            stripesCount = setStripesCount();\n            const { width, height } = getSize();\n            const topOffset = height * (topOffsetPercent / 100);\n            const bottomOffset = height * (bottomOffsetPercent / 100);\n            const availableHeight = Math.max(0, height - topOffset - bottomOffset);\n            const { leftOffset, availableWidth } = getHorizontalBounds(width);\n            const spacing = getSpacing(availableWidth);\n            for (let i = 0; i < stripesCount; i++) {\n                const x = leftOffset + spacing * (i + 1);\n                const stripeHeightVariationPercent = stripeHeightVariationMinPercent + Math.random() * (stripeHeightVariationMaxPercent - stripeHeightVariationMinPercent);\n                const stripeHeight = availableHeight * (stripeHeightVariationPercent / 100);\n                const pointsCount = Math.max(2, Math.round(stripeHeight / segmentLength) + 1);\n                const stripe = [];\n                for (let j = 0; j < pointsCount; j++) {\n                    stripe.push({\n                        x,\n                        y: topOffset + j * segmentLength,\n                        oldX: x,\n                        oldY: topOffset + j * segmentLength,\n                        pinned: j === 0,\n                    });\n                }\n                stripes.push(stripe);\n            }\n        };\n        const resize = () => {\n            const { width, height } = getSize();\n            const pixelRatio = window.devicePixelRatio || 1;\n            const { availableWidth } = getHorizontalBounds(width);\n            segmentLength = getSegmentLength(height);\n            lineWidth = getLineWidth(availableWidth);\n            canvas.width = width * pixelRatio;\n            canvas.height = height * pixelRatio;\n            canvas.style.width = `${width}px`;\n            canvas.style.height = `${height}px`;\n            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);\n            createStripes();\n        };\n        const updatePoint = (point) => {\n            if (point.pinned)\n                return;\n            const vx = (point.x - point.oldX) * damping;\n            const vy = (point.y - point.oldY) * damping;\n            point.oldX = point.x;\n            point.oldY = point.y;\n            point.x += vx;\n            point.y += vy + gravity;\n            if (!pointer.active)\n                return;\n            const dx = point.x - pointer.x;\n            const dy = point.y - pointer.y;\n            const distance = Math.hypot(dx, dy);\n            const isMobile = window.matchMedia('(pointer: coarse)').matches;\n            const mobileMultiplier = isMobile ? 0.5 : 1;\n            const radius = (pointer.down ? 120 : 60) * mobileMultiplier;\n            const strength = (pointer.down ? 15 : 12) * mobileMultiplier;\n            if (distance > 0 && distance < radius) {\n                const force = (1 - distance / radius) * strength;\n                point.x += (dx / distance) * force;\n                point.y += (dy / distance) * force;\n            }\n        };\n        const solveConstraint = (a, b) => {\n            const dx = b.x - a.x;\n            const dy = b.y - a.y;\n            const distance = Math.hypot(dx, dy) || 1;\n            const difference = segmentLength - distance;\n            const percent = difference / distance / 2;\n            const offsetX = dx * percent;\n            const offsetY = dy * percent;\n            if (!a.pinned) {\n                a.x -= offsetX;\n                a.y -= offsetY;\n            }\n            if (!b.pinned) {\n                b.x += offsetX;\n                b.y += offsetY;\n            }\n        };\n        const update = () => {\n            for (const stripe of stripes) {\n                for (const point of stripe) {\n                    updatePoint(point);\n                }\n                for (let i = 0; i < iterations; i++) {\n                    for (let j = 0; j < stripe.length - 1; j++) {\n                        solveConstraint(stripe[j], stripe[j + 1]);\n                    }\n                }\n            }\n        };\n        const drawStripeTexture = (stripe) => {\n            const dotRadius = clamp(1, lineWidth * textureDotRadiusRatio, lineWidth / 2);\n            const dotSpacing = Math.max(dotRadius * 2.5, lineWidth * textureSpacingRatio);\n            const restStripeLength = (stripe.length - 1) * segmentLength;\n            const bottomPadding = dotRadius;\n            ctx.beginPath();\n            for (let distance = 0; distance <= restStripeLength - bottomPadding; distance += dotSpacing) {\n                const segmentIndex = Math.min(Math.floor(distance / segmentLength), stripe.length - 2);\n                const segmentProgress = (distance - segmentIndex * segmentLength) / segmentLength;\n                const a = stripe[segmentIndex];\n                const b = stripe[segmentIndex + 1];\n                const dx = b.x - a.x;\n                const dy = b.y - a.y;\n                const x = a.x + dx * segmentProgress;\n                const y = a.y + dy * segmentProgress;\n                ctx.moveTo(x + dotRadius, y);\n                ctx.arc(x, y, dotRadius, 0, Math.PI * 2);\n            }\n            ctx.fill();\n        };\n        const drawTopStripe = () => {\n            const firstStripe = stripes[0];\n            const lastStripe = stripes[stripes.length - 1];\n            if (!firstStripe || !lastStripe)\n                return;\n            const left = firstStripe[0].x - lineWidth / 2;\n            const right = lastStripe[0].x + lineWidth / 2;\n            ctx.fillRect(left, 0, right - left, lineWidth);\n        };\n        const draw = () => {\n            const { width, height } = getSize();\n            const stripeColor = '#fff'; // getCssVar(null, '--playground-body-color-text') || '#fff'\n            ctx.clearRect(0, 0, width, height);\n            ctx.lineWidth = lineWidth;\n            ctx.strokeStyle = stripeColor;\n            ctx.lineCap = 'square';\n            ctx.fillStyle = stripeColor;\n            for (const stripe of stripes) {\n                ctx.beginPath();\n                for (let i = 0; i < stripe.length; i++) {\n                    const point = stripe[i];\n                    if (i === 0) {\n                        ctx.moveTo(point.x, point.y);\n                    }\n                    else {\n                        ctx.lineTo(point.x, point.y);\n                    }\n                }\n                ctx.stroke();\n                ctx.save();\n                ctx.fillStyle = '#000';\n                ctx.globalCompositeOperation = 'destination-out';\n                drawStripeTexture(stripe);\n                ctx.restore();\n            }\n            ctx.fillStyle = stripeColor;\n            drawTopStripe();\n        };\n        const tick = () => {\n            update();\n            draw();\n            requestAnimationFrame(tick);\n        };\n        const setPointerFromClientPosition = (clientX, clientY) => {\n            const rect = canvas.getBoundingClientRect();\n            pointer.x = clientX - rect.left;\n            pointer.y = clientY - rect.top;\n            pointer.active = true;\n        };\n        hitZone.addEventListener('pointermove', (event) => {\n            if (!this.interactive)\n                return;\n            setPointerFromClientPosition(event.clientX, event.clientY);\n        });\n        hitZone.addEventListener('pointerdown', (event) => {\n            if (!this.interactive)\n                return;\n            setPointerFromClientPosition(event.clientX, event.clientY);\n            pointer.down = true;\n            hitZone.setPointerCapture(event.pointerId);\n            hitZone.classList.add('top-7-21-hit-zone-active');\n        });\n        hitZone.addEventListener('pointerup', (event) => {\n            if (!this.interactive)\n                return;\n            pointer.down = false;\n            hitZone.releasePointerCapture(event.pointerId);\n            hitZone.classList.remove('top-7-21-hit-zone-active');\n        });\n        hitZone.addEventListener('pointercancel', () => {\n            if (!this.interactive)\n                return;\n            pointer.down = false;\n            pointer.active = false;\n        });\n        hitZone.addEventListener('pointerleave', () => {\n            if (!this.interactive)\n                return;\n            if (pointer.down)\n                return;\n            pointer.active = false;\n        });\n        const resizeObserver = new ResizeObserver(() => {\n            resize();\n        });\n        resizeObserver.observe(container);\n        resize();\n        tick();\n        button?.addEventListener('pointerdown', (event) => {\n            setPointerFromClientPosition(event.clientX, event.clientY);\n            pointer.down = true;\n            this.interactive = true;\n            window.setTimeout(() => {\n                pointer.down = false;\n            }, 123);\n            window.setTimeout(() => {\n                pointer.active = false;\n            }, 234);\n            this.handleStartButton();\n        });\n    },\n    handleVideo(callback) {\n        const tag = document.createElement('script');\n        tag.src = 'https://www.youtube.com/iframe_api';\n        const firstScriptTag = document.getElementsByTagName('script')[0];\n        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);\n        window.onYouTubeIframeAPIReady = () => {\n            this.ytPlayer = new YT.Player(this.el.videoContainer, {\n                height: '100%',\n                width: '100%',\n                videoId: '-D_uT0kXlRw',\n                playerVars: {\n                    start: 0,\n                    autoplay: 0,\n                    controls: 1,\n                    fs: 0,\n                    iv_load_policy: 3,\n                    loop: 1,\n                    modestbranding: 1,\n                    mute: 0,\n                    playsinline: 1,\n                    rel: 0,\n                },\n                events: {\n                    onReady: () => {\n                        if (!this.ytPlayerReady) {\n                            this.ytPlayerReady = true;\n                            callback();\n                        }\n                    },\n                },\n            });\n        };\n    },\n    resizeContainer() {\n        // Need this to reliably get the video height after it has loaded and is playing\n        // and align it well with canvas stripes that go 100vw with side paddings\n        const resize = () => {\n            // const w = this.el.video.clientWidth\n            const h = this.el.video?.clientHeight;\n            gsap.set(this.el.container, { height: h });\n        };\n        resize();\n        window.addEventListener('resize', resize);\n    },\n};\nComponent.init();\n\n</script>\n  </body>\n</html>\n";

    // Inject customization overrides into base
    const customStyles = [];
    let customScript = '';

    
      customStyles.push(`
        body { background: ${s.bgColor || '#c01818'} !important; }
        canvas { filter: drop-shadow(0 0 20px ${s.stripeColor || '#ffffff'}44); }
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
// 7. Double-Bend 3D Card Shuffle to Grid
// Author: Holland Blumer (@hollandblumer) (https://codepen.io/editor/hollandblumer/pen/019fcdd1-9881-74fa-8d86-f9ad57b5d26c)
// --------------------------------------------------------
window.EffectRegistry['hollandblumer-shuffle-grid'] = {
  id: 'hollandblumer-shuffle-grid',
  title: "Double-Bend 3D Card Shuffle to Grid",
  category: 'Css 3D Effect',
  tech: 'CSS 3D Transforms & GSAP',
  github: 'https://codepen.io/editor/hollandblumer/pen/019fcdd1-9881-74fa-8d86-f9ad57b5d26c',
  description: "Interactieve driedimensionale waaier en brug van kaarten die soepel transformeren tussen shuffle-modus en rasterweergave.",
  defaultSettings: {
  "speed": 1,
  "accentColor": "#6366f1",
  "bgColor": "#0c0d14"
},
  controls: [
  {
    "type": "range",
    "key": "speed",
    "label": "Overgang Snelheid",
    "min": 0.5,
    "max": 2.5,
    "step": 0.1
  },
  {
    "type": "color",
    "key": "accentColor",
    "label": "Accent Highlight"
  },
  {
    "type": "color",
    "key": "bgColor",
    "label": "Achtergrondkleur"
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
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.iframe = null;
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    let base = "<!doctype html>\n<html lang=\"en\">\n<head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap\" rel=\"stylesheet\">\n\n<meta property=\"og:description\" content=\"Made on CodePen by Holland Blumer\">\n<meta property=\"og:image\" content=\"https://019fcdd1-9881-74fa-8d86-f9ad57b5d26c.codepen.dev/.codepen/screenshots/54f78aee089ea29019d1b1455be7d3519b1d387e455fe5e46471f79f1851cc8a/1280.jpg\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<link rel=\"icon\" href=\"https://public.codepenassets.com/favicon/favicon.ico\">\n\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n  <title>Double-Bend Photo Bridge Shuffle — Final Grid</title>\n  <style>\n    *{box-sizing:border-box}\n    html,body{width:100%;height:100%;margin:0;overflow:hidden;background:#E7E7E7}\n    canvas{display:block;width:100%;height:100%}\n  </style>\n</head>\n<body>\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js\"></script>\n  <script>\n    const EMBEDDED=new URLSearchParams(location.search).has('embedded');\n    if(EMBEDDED){\n      document.documentElement.style.background='transparent';\n      document.body.style.background='transparent';\n    }\n\n    const scene=new THREE.Scene();\n    scene.background=EMBEDDED?null:new THREE.Color(0xe7e7e7);\n    scene.fog=new THREE.FogExp2(0xe7e7e7,.022);\n\n    const VIEW_H=9.2;\n    const viewAspect=innerWidth/innerHeight;\n    const camera=new THREE.OrthographicCamera(\n      -VIEW_H*viewAspect/2,VIEW_H*viewAspect/2,\n      VIEW_H/2,-VIEW_H/2,.1,100\n    );\n    camera.position.set(0,-.8,20);\n    camera.lookAt(0,-.8,0);\n\n    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:EMBEDDED});\n    renderer.setClearColor(0xe7e7e7,EMBEDDED?0:1);\n    renderer.setPixelRatio(Math.min(devicePixelRatio,2));\n    renderer.setSize(innerWidth,innerHeight);\n    renderer.outputEncoding=THREE.sRGBEncoding;\n    document.body.prepend(renderer.domElement);\n\n    const world=new THREE.Group();\n    world.rotation.x=.08;\n    world.rotation.y=0;\n    scene.add(world);\n\n    const HPI=Math.PI/2;\n    const CARD_W=4.9;\n    const CARD_H=3.45;\n    const CARD_COUNT=22;\n    const HALF=Math.ceil(CARD_COUNT/2);\n    const MID=(CARD_COUNT-1)/2;\n\n    const TABLE_Y=-2.10;\n    const GRID_Y=-.80;\n\n    const SHELL=.026;\n    const PACKET_SHELL=.048;\n    const PILE_X=2.62;\n    const MERGE_DUR=1.75;\n\n    const R_INNER=1.42;\n    const PHI_FULL=CARD_W/R_INNER;\n    const HAND_RISE=.45;\n\n    const cards=[];\n    let order=[];\n    let state='stack';\n    let stateTime=0;\n    let elapsed=0;\n    let busy=false;\n    let autoTimer=0;\n    let mouseX=0,mouseY=0;\n\n    const loader=new THREE.TextureLoader();\n    loader.setCrossOrigin('anonymous');\n\n    function smooth(t){return t*t*(3-2*t)}\n    function clamp01(t){return Math.max(0,Math.min(1,t))}\n    function mix(a,b,t){return a+(b-a)*t}\n    function seg(t,a,b){return smooth(clamp01((t-a)/(b-a)))}\n    function jx(){return 0}\n    function jz(){return 0}\n    function jr(){return 0}\n\n    function buildGeometry(){\n      const geometry=new THREE.PlaneBufferGeometry(CARD_W,CARD_H,48,18);\n      geometry.setAttribute('basePosition',geometry.attributes.position.clone());\n      return geometry;\n    }\n\n    function makeCard(i){\n      const texture=loader.load(`https://picsum.photos/seed/three-bridge-${i+70}/700/500`);\n      texture.minFilter=THREE.LinearFilter;\n      texture.magFilter=THREE.LinearFilter;\n\n      const material=new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide});\n      const mesh=new THREE.Mesh(buildGeometry(),material);\n\n      const edgeMaterial=new THREE.MeshBasicMaterial({color:0x484d56,side:THREE.DoubleSide});\n      const edge=new THREE.Mesh(buildGeometry(),edgeMaterial);\n      edge.scale.set(1,1,1);\n      edge.position.z=-.012;\n      edge.visible=false;\n      mesh.add(edge);\n\n      mesh.userData={index:i,edge,bend:0,targetBend:0,packet:null};\n      world.add(mesh);\n      cards.push(mesh);\n      order.push(i);\n    }\n\n    function bendOneGeometry(geometry,bend,camber=1){\n      const position=geometry.attributes.position;\n      const base=geometry.attributes.basePosition;\n      const direction=bend<0?-1:1;\n      const angle=Math.max(.0001,Math.abs(bend));\n      const radius=CARD_W/angle;\n      const widthComp=bend<0 ? angle/(2*Math.sin(angle/2)) : 1;\n\n      for(let i=0;i<position.count;i++){\n        const bx=base.getX(i);\n        const by=base.getY(i);\n        const nx=bx/CARD_W;\n        const theta=nx*angle;\n        const x=radius*Math.sin(theta)*widthComp;\n        const arch=radius*(Math.cos(theta)-1)*direction;\n        position.setXYZ(i,x,by,arch*camber);\n      }\n      position.needsUpdate=true;\n      geometry.computeVertexNormals();\n    }\n\n    function deformCard(card,bend){\n      bendOneGeometry(card.geometry,bend,1);\n      bendOneGeometry(card.userData.edge.geometry,bend,1.015);\n    }\n\n    function stackT(slot){\n      return {x:jx(slot),y:TABLE_Y+slot*SHELL,z:jz(slot),ry:0,rz:jr(slot),bend:0};\n    }\n    function pileT(side,local){\n      return {x:side*PILE_X,y:TABLE_Y+local*PACKET_SHELL,z:0,ry:0,rz:side*.05,bend:.06};\n    }\n    function firstPositionT(side,local){\n      const p=pileT(side,local);\n      return {...p,y:p.y+.30,rx:-HPI,scale:1,bend:-1.18};\n    }\n    function preBendT(side,local){\n      return {\n        x:side*PILE_X,\n        y:TABLE_Y+.30+local*PACKET_SHELL,\n        z:0,\n        ry:0,\n        rz:side*.035,\n        bend:-1.18\n      };\n    }\n    function gridT(slot){\n      const cols=6;\n      const rows=Math.ceil(CARD_COUNT/cols);\n      const row=Math.floor(slot/cols);\n      const rowStart=row*cols;\n      const rowCount=Math.min(cols,CARD_COUNT-rowStart);\n      const col=slot-rowStart;\n      const gapX=1.72;\n      const gapY=1.28;\n      return {\n        x:(col-(rowCount-1)/2)*gapX,\n        y:GRID_Y+(rows-1)*gapY*.5-row*gapY,\n        z:slot*.008,\n        rx:0,ry:0,rz:0,\n        scale:.33,\n        bend:0\n      };\n    }\n\n    function bridgeT(slot){\n      const rc=R_INNER+slot*SHELL;\n      return {\n        x:0,\n        y:TABLE_Y+HAND_RISE+rc-R_INNER*Math.cos(PHI_FULL/2),\n      z:(slot-MID)*.022,\n        ry:0,rz:0,\n        bend:CARD_W/rc\n      };\n    }\n\n    function mergePose(card,slot){\n      const p=card.userData.packet;\n      const T=clamp01(stateTime/MERGE_DUR);\n      const tB=1-Math.pow(1-clamp01(T),2.15);\n      const w=1-Math.pow(1-clamp01(T/.22),2);\n\n      const flatX=p.side*(CARD_W/2-.22);\n      const flatY=TABLE_Y+slot*PACKET_SHELL;\n\n      const buckleT=.14+.86*tB;\n      const ov=CARD_W*buckleT;\n      const S=2*CARD_W-ov;\n      const phi=PHI_FULL*buckleT;\n      const R=S/phi;\n      const rc=R+slot*SHELL;\n      const phiMid=p.side*(phi/2-CARD_W/(2*R));\n      const handY=TABLE_Y+HAND_RISE*tB;\n      const arcX=rc*Math.sin(phiMid);\n      const arcY=handY+rc*Math.cos(phiMid)-R*Math.cos(phi/2);\n\n      const reverseBend=.05;\n      const tg={\n        x:mix(flatX,arcX,w),\n        y:mix(flatY,arcY,w),\n        z:(slot-MID)*.022,\n        ry:mix(0,phiMid,w),\n        rz:p.side*.05*(1-smooth(T)),\n        bend:mix(reverseBend,CARD_W/rc,w)\n      };\n      applyTarget(card,tg,.35);\n      card.userData.bend=tg.bend;\n      card.userData.targetBend=tg.bend;\n    }\n\n    function rifflePose(card,slot){\n      const p=card.userData.packet;\n      const delay=p.local*.052+(p.side>0?.026:0);\n      const local=clamp01((stateTime-delay)/.48);\n      const fall=local*local;\n      const A=preBendT(p.side,p.local);\n      const B={\n        x:p.side*(CARD_W/2-.22),\n        y:TABLE_Y+slot*PACKET_SHELL,\n        z:(slot-MID)*.022,\n        rx:-HPI,ry:0,rz:p.side*.025,\n        scale:1,bend:.05\n      };\n      const flutter=Math.sin(local*Math.PI);\n      const tg={\n        x:mix(A.x,B.x,smooth(local)),\n        y:mix(A.y,B.y,fall)+flutter*.10,\n        z:mix(A.z,B.z,smooth(local)),\n        rx:-HPI,\n        ry:p.side*flutter*.055,\n        rz:mix(A.rz,B.rz,smooth(local)),\n        scale:1,\n        bend:mix(A.bend,B.bend,smooth(local))\n      };\n      applyTarget(card,tg,.38);\n      card.userData.bend=mix(card.userData.bend,tg.bend,.3);\n      card.userData.targetBend=tg.bend;\n    }\n\n    function cascadePose(card,slot){\n      const side=card.userData.packet.side;\n      const delay=slot*.034;\n      const local=smooth(clamp01((stateTime-delay)/.525));\n      const A=bridgeT(slot);\n      const B=stackT(slot);\n      const flick=Math.sin(local*Math.PI);\n      const tg={\n        x:mix(A.x,B.x,local)+side*flick*.25,\n        y:mix(A.y,B.y,local),\n        z:mix(A.z,B.z,local),\n        rx:-HPI,\n        ry:side*flick*.12,\n        rz:mix(A.rz,B.rz,local),\n        scale:1,\n        bend:0\n      };\n      applyTarget(card,tg,.25);\n      card.userData.bend=A.bend*(1-local);\n      card.userData.targetBend=card.userData.bend;\n    }\n\n    function gridMovePose(card,slot){\n      const delay=slot*.105;\n      const local=smooth(clamp01((stateTime-delay)/.54));\n      const A=stackT(slot);\n      const B=gridT(slot);\n      const lift=Math.sin(local*Math.PI)*.38;\n      const tg={\n        x:mix(A.x,B.x,local),\n        y:mix(A.y,B.y,local)+lift,\n        z:mix(A.z,B.z,local),\n        rx:mix(-HPI,0,local),\n        ry:0,\n        rz:mix(A.rz,0,local),\n        scale:mix(1,B.scale,local),\n        bend:0\n      };\n      applyTarget(card,tg,.28);\n    }\n\n    function splitPose(card){\n      const p=card.userData.packet;\n      const A=card.userData.splitStart;\n      const B=firstPositionT(p.side,p.local);\n      const local=smooth(clamp01(stateTime/.56));\n      const tg={\n        x:mix(A.x,B.x,local),\n        y:mix(A.y,B.y,local),\n        z:mix(A.z,B.z,local),\n        rx:mix(A.rx,-HPI,local),\n        ry:mix(A.ry,0,local),\n        rz:mix(A.rz,B.rz,local),\n        scale:mix(A.scale,1,local),\n        bend:mix(A.bend,B.bend,local)\n      };\n      applyTarget(card,tg,.46);\n    }\n\n    function applyTarget(card,tg,k){\n      card.position.x=mix(card.position.x,tg.x,k);\n      card.position.y=mix(card.position.y,tg.y,k);\n      card.position.z=mix(card.position.z,tg.z,k);\n      card.rotation.x=mix(card.rotation.x,tg.rx===undefined?-HPI:tg.rx,k);\n      card.rotation.y=mix(card.rotation.y,tg.ry||0,k);\n      card.rotation.z=mix(card.rotation.z,tg.rz,k);\n      const targetScale=tg.scale===undefined?1:tg.scale;\n      card.scale.x=mix(card.scale.x,targetScale,k);\n      card.scale.y=mix(card.scale.y,targetScale,k);\n      card.scale.z=mix(card.scale.z,targetScale,k);\n      card.userData.targetBend=tg.bend;\n    }\n\n    function assignPackets(){\n      const left=order.slice(0,HALF);\n      const right=order.slice(HALF);\n      left.forEach((id,l)=>cards[id].userData.packet={side:-1,local:l});\n      right.forEach((id,r)=>cards[id].userData.packet={side:1,local:r});\n    }\n\n    function buildInterleave(){\n      const left=[],right=[];\n      cards.forEach(c=>{\n        const p=c.userData.packet;\n        (p.side<0?left:right)[p.local]=c.userData.index;\n      });\n      const next=[];\n      while(left.length||right.length){\n        if(left.length)next.push(left.shift());\n        if(right.length)next.push(right.shift());\n      }\n      order=next;\n      order.forEach((id,slot)=>cards[id].renderOrder=slot);\n    }\n\n    function startShuffle(){\n      if(busy)return;\n      clearTimeout(autoTimer);\n      busy=true;\n      assignPackets();\n      cards.forEach(card=>{\n        card.userData.splitStart={\n          x:card.position.x,y:card.position.y,z:card.position.z,\n          rx:card.rotation.x,ry:card.rotation.y,rz:card.rotation.z,\n          scale:card.scale.x,bend:card.userData.bend\n        };\n      });\n      state='split';\n      stateTime=0;\n    }\n\n    function advanceState(){\n      stateTime=0;\n      if(state==='split'){\n        state='prebend';\n      }\n      else if(state==='prebend'){\n        buildInterleave();\n        state='riffle';\n      }\n      else if(state==='riffle')state='merge';\n      else if(state==='merge')state='hold';\n      else if(state==='hold')state='cascade';\n      else if(state==='cascade')state='gridMove';\n      else if(state==='gridMove')state='settle';\n      else if(state==='settle'){\n        state='grid';busy=false;\n      }\n    }\n\n    function updateAnimation(dt){\n      stateTime+=dt;\n      const duration={\n        split:.56,\n        prebend:1.05,\n        riffle:1.06,\n        merge:MERGE_DUR,\n        hold:.3,\n        cascade:1.35,\n        gridMove:2.82,\n        settle:.64\n      }[state]||1;\n      const t=smooth(clamp01(stateTime/duration));\n\n      order.forEach((id,slot)=>{\n        const card=cards[id];\n        const p=card.userData.packet;\n        if(state==='stack')applyTarget(card,stackT(slot),.10);\n        else if(state==='grid')applyTarget(card,gridT(slot),.18);\n        else if(state==='split')splitPose(card);\n        else if(state==='prebend'){\n          const reverse=preBendT(p.side,p.local);\n          applyTarget(card,reverse,t*.14+.05);\n          card.userData.targetBend=reverse.bend;\n        }\n        else if(state==='riffle')rifflePose(card,slot);\n        else if(state==='merge')mergePose(card,slot);\n        else if(state==='hold')applyTarget(card,bridgeT(slot),.25);\n        else if(state==='cascade')cascadePose(card,slot);\n        else if(state==='gridMove')gridMovePose(card,slot);\n        else if(state==='settle'){\n          applyTarget(card,gridT(slot),t*.14+.05);\n        }\n\n        card.userData.bend=mix(card.userData.bend,card.userData.targetBend,.14);\n        deformCard(card,card.userData.bend);\n      });\n\n      if(state!=='stack'&&state!=='grid'&&stateTime>=duration)advanceState();\n    }\n\n    for(let i=0;i<CARD_COUNT;i++)makeCard(i);\n    order.forEach((id,slot)=>{\n      const card=cards[id];\n      const s=stackT(slot);\n      card.position.set(s.x,s.y,s.z);\n      card.rotation.set(-HPI,0,s.rz);\n    });\n\n    let previous=performance.now();\n    function frame(now){\n      const dt=Math.min((now-previous)/1000,.05);\n      previous=now;\n      elapsed+=dt;\n      updateAnimation(dt);\n      world.rotation.x=EMBEDDED?0:.08;\n      world.rotation.y=0;\n      world.rotation.z=0;\n      renderer.render(scene,camera);\n      requestAnimationFrame(frame);\n    }\n    requestAnimationFrame(frame);\n\n    addEventListener('click',()=>startShuffle());\n    addEventListener('keydown',event=>{if(event.code==='Space'){event.preventDefault();startShuffle()}});\n    addEventListener('message',event=>{\n      if(event.data==='start-card-bridge')startShuffle();\n    });\n    addEventListener('resize',()=>{\n      const aspect=innerWidth/innerHeight;\n      camera.left=-VIEW_H*aspect/2;\n      camera.right=VIEW_H*aspect/2;\n      camera.top=VIEW_H/2;\n      camera.bottom=-VIEW_H/2;\n      camera.updateProjectionMatrix();\n      renderer.setSize(innerWidth,innerHeight);\n    });\n\n    if(!EMBEDDED)autoTimer=setTimeout(startShuffle,900);\n  </script>\n</body>\n</html>\n";

    // Inject customization overrides into base
    const customStyles = [];
    let customScript = '';

    
      customStyles.push(`
        body { background: ${s.bgColor || '#0c0d14'} !important; }
        :root { --accent: ${s.accentColor || '#6366f1'} !important; }
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
// 8. Gradient Drift — WebGL Fluid Chromatic Shaders
// Author: shubniggurath (@shubniggurath) (https://codepen.io/editor/shubniggurath/pen/019fc476-be04-74e7-ab47-bbb8446b5fb2)
// --------------------------------------------------------
window.EffectRegistry['shubniggurath-gradient-drift'] = {
  id: 'shubniggurath-gradient-drift',
  title: "Gradient Drift — WebGL Fluid Chromatic Shaders",
  category: 'Special / Experimental',
  tech: 'WebGL Fluid Flow Shaders',
  github: 'https://codepen.io/editor/shubniggurath/pen/019fc476-be04-74e7-ab47-bbb8446b5fb2',
  description: "Luxe WebGL chromatische vloeiende kleurgradiënten met organische drift- en brekingseffecten.",
  defaultSettings: {
  "flowSpeed": 1,
  "colorA": "#ff3366",
  "colorB": "#33ccff",
  "bgColor": "#0b0c10"
},
  controls: [
  {
    "type": "range",
    "key": "flowSpeed",
    "label": "Stroomsnelheid",
    "min": 0.2,
    "max": 3,
    "step": 0.1
  },
  {
    "type": "color",
    "key": "colorA",
    "label": "Kleur Gradiënt A"
  },
  {
    "type": "color",
    "key": "colorB",
    "label": "Kleur Gradiënt B"
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
    this.iframe.setAttribute('title', "Gradient Drift — WebGL Fluid Chromatic Shaders");

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
    let base = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap\" rel=\"stylesheet\">\n\n<meta property=\"og:description\" content=\"Made on CodePen by Liam Egan\">\n<meta property=\"og:image\" content=\"https://019fc476-be04-74e7-ab47-bbb8446b5fb2.codepen.dev/.codepen/screenshots/e39d03e965501a4682c345cd1c7b6387ff78bb17e226c52af666f8cfa1849095/1280.jpg\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<link rel=\"icon\" href=\"https://public.codepenassets.com/favicon/favicon.ico\">\n\n<script type=\"importmap\">\n{\n  \"imports\": {\n    \"@/\": \"/\",\n    \"tweakpane\": \"https://esm.sh/tweakpane@^4.0.5\",\n    \"wtc-gl\": \"https://esm.sh/wtc-gl@^1.3.0\"\n  }\n}\n</script>\n\n    <meta charset=\"UTF-8\">\n    <style>\n#app {\n  position: fixed;\n  inset: 0;\n}\n</style>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Pen</title>\n  </head>\n  <body>\n    <main id=\"app\"></main>\n    <script>\nimport { Drawable, Framebuffer, Plane } from 'wtc-gl';\nimport { BlurPass } from '/src/gl/BlurPass.dd2397d851220b559c8c.js';\nimport { PipelineFramebuffer, pickTexdepth } from '/src/gl/PipelineFramebuffer.17e5ba991f0298bbb987.js';\nimport { DistortPass } from '/src/gl/DistortPass.8bfd88cd9db3eb3c35a6.js';\nimport { Sketch } from '/src/gl/Sketch.607ff88806df056bb565.js';\nimport { hexToRgb } from '/src/utils/color.5ca5229026939468acea.js';\nimport { buildCircles, disposeCircles, setPalette, updateCircles } from '/src/circles.0bc84d6cee4439a2244d.js';\nimport { createControls } from '/src/controls.669916c3ab754b9dcb42.js';\nimport { clonePreset, randomPresetName } from '/src/presets.edc2c1036f44b4eee670.js';\n// Start somewhere different every load.\nconst initialPreset = randomPresetName();\nconst config = clonePreset(initialPreset);\nconst container = document.querySelector('#app');\nif (!container)\n    throw new Error('Missing #app container');\nlet scene;\nlet geometry;\nlet circles = [];\nlet blur;\nlet distort;\nlet fbo = null;\nlet texdepth;\n// The whole pipeline renders at physical resolution / blurDownsample.\nfunction allocFramebuffer(ctx) {\n    const width = Math.max(1, Math.round((ctx.width * ctx.dpr) / config.blurDownsample));\n    const height = Math.max(1, Math.round((ctx.height * ctx.dpr) / config.blurDownsample));\n    if (fbo) {\n        fbo.resize(width, height);\n    }\n    else {\n        fbo = new PipelineFramebuffer(ctx.gl, { width, height, dpr: 1, texdepth, depth: true });\n    }\n    blur.setResolution(width, height);\n}\nfunction rebuild(ctx) {\n    disposeCircles(scene, circles);\n    circles = buildCircles(ctx.gl, scene, geometry, config);\n}\nnew Sketch({\n    container,\n    onInit(ctx) {\n        scene = new Drawable(ctx.gl);\n        geometry = new Plane(ctx.gl, { width: 1, height: 1 });\n        texdepth = pickTexdepth(ctx.gl);\n        const dither = texdepth === Framebuffer.TEXTYPE_UNSIGNED_BYTE;\n        blur = new BlurPass(ctx.gl, { dither });\n        distort = new DistortPass(ctx.gl, { dither });\n        circles = buildCircles(ctx.gl, scene, geometry, config);\n        createControls(config, initialPreset, {\n            onRebuild: () => rebuild(ctx),\n            onPaletteChange: () => setPalette(circles, config.palette),\n            onDownsampleChange: () => allocFramebuffer(ctx)\n        });\n    },\n    onResize(ctx) {\n        allocFramebuffer(ctx);\n    },\n    onFrame(ctx, _delta, time) {\n        if (!fbo)\n            return;\n        const fb = fbo;\n        updateCircles(circles, time, config, ctx.width, ctx.height);\n        // Opaque background clear — transparent clears would bake wrong\n        // destination alpha into the texture the blur then samples.\n        const [r, g, b] = hexToRgb(config.background);\n        ctx.gl.clearColor(r, g, b, 1);\n        ctx.renderer.render({ scene, camera: ctx.camera, target: fb.write });\n        fb.swap();\n        // Blur, then both glass layers in a single pass — their refraction\n        // offsets sum into one background sample, and both ride the shared wave,\n        // which bends the ribs themselves, not the underlying texture.\n        const anyDistort = config.distort1.enabled || config.distort2.enabled;\n        const waveAmp = config.wave.enabled ? config.wave.amp : 0;\n        const wavePhase = config.wave.phase + time * config.wave.phaseSpeed;\n        const waveOffset = [time * config.wave.moveX, time * config.wave.moveY];\n        const { azimuth, elevation } = config.light;\n        const lightDir = [\n            Math.cos(azimuth) * Math.cos(elevation),\n            Math.sin(azimuth) * Math.cos(elevation),\n            Math.sin(elevation)\n        ];\n        blur.render(ctx.renderer, fb, { sigma: config.blurSigma, stayInFbo: anyDistort });\n        if (anyDistort) {\n            const shared = {\n                lightDir,\n                specIntensity: config.light.intensity,\n                specPower: config.light.gloss,\n                waveAmp,\n                waveScale: config.wave.scale,\n                wavePhase,\n                waveOffset\n            };\n            // Sequential mode only differs when both layers are on: layer 2\n            // refracts layer 1's output (exact) instead of summing offsets.\n            if (config.distortPasses === 2 && config.distort1.enabled && config.distort2.enabled) {\n                distort.render(ctx.renderer, fb, { ...shared, layer1: config.distort1, stayInFbo: true });\n                distort.render(ctx.renderer, fb, { ...shared, layer1: config.distort2 });\n            }\n            else {\n                distort.render(ctx.renderer, fb, { ...shared, layer1: config.distort1, layer2: config.distort2 });\n            }\n        }\n    }\n});\n\n</script>\n  </body>\n</html>\n";

    // Inject customization overrides into base
    const customStyles = [];
    let customScript = '';

    
      customStyles.push(`
        body, html { background: ${s.bgColor || '#0b0c10'} !important; }
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
// 9. Glitchy Cyberpunk Neon Radio Switches
// Author: J Dillon (@jdillon) (https://codepen.io/editor/jdillon/pen/019ff1db-6b1c-7285-af84-26ebd5ac0e02)
// --------------------------------------------------------
window.EffectRegistry['jdillon-neon-radio'] = {
  id: 'jdillon-neon-radio',
  title: "Glitchy Cyberpunk Neon Radio Switches",
  category: 'Button Effect',
  tech: 'GSAP SVG Glitch & Neon Glow',
  github: 'https://codepen.io/editor/jdillon/pen/019ff1db-6b1c-7285-af84-26ebd5ac0e02',
  description: "Futuristische neon radio-knoppen met realtime hapering, elektrische glitch-vonken en soundwave-gloed.",
  defaultSettings: {
  "fontFamily": "'Orbitron', sans-serif",
  "neonColor": "#00f3ff",
  "glowIntensity": 1,
  "bgColor": "#080811"
},
  controls: [
  {
    "type": "select",
    "key": "fontFamily",
    "label": "Lettertype (Font)",
    "options": [
      {
        "value": "'Orbitron', sans-serif",
        "label": "Orbitron (Cyberpunk)"
      },
      {
        "value": "'Fira Code', monospace",
        "label": "Fira Code (Code)"
      },
      {
        "value": "'Montserrat', sans-serif",
        "label": "Montserrat (Bold)"
      },
      {
        "value": "'Space Grotesk', sans-serif",
        "label": "Space Grotesk"
      }
    ]
  },
  {
    "type": "range",
    "key": "glowIntensity",
    "label": "Neon Gloed Intensiteit",
    "min": 0.5,
    "max": 2.5,
    "step": 0.1
  },
  {
    "type": "color",
    "key": "neonColor",
    "label": "Neon Kleur"
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
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.iframe = null;
  },

  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    let base = "<!DOCTYPE html>\n<html lang=\"en\">\n\n  <head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cinzel:wght@700&family=Fira+Code:wght@400;600&family=Great+Vibes&family=Montserrat:wght@800&family=Orbitron:wght@700;900&family=Pacifico&family=Recursive:wght@400;800&family=Space+Grotesk:wght@700&display=swap\" rel=\"stylesheet\">\n\n<meta property=\"og:description\" content=\"Made on CodePen by Josh Dillon\">\n<meta property=\"og:image\" content=\"https://019ff1db-6b1c-7285-af84-26ebd5ac0e02.codepen.dev/.codepen/screenshots/53c0ef7fecad35c04f79354eea54ba4cf54fc728608b88e83cbff5d000dc4a35/1280.jpg\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<link rel=\"icon\" href=\"https://public.codepenassets.com/favicon/favicon.ico\">\n\n<script type=\"importmap\">\n{\n  \"imports\": {\n    \"gsap\": \"https://esm.sh/gsap@^3.15.0\",\n    \"gsap/\": \"https://esm.sh/gsap@^3.15.0/\"\n  }\n}\n</script>\n\n    <meta charset=\"UTF-8\">\n    <title>Glitchy neon radio buttons with GSAP</title>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><style>\n@import url(\"https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400&display=swap\");\n\nhtml,\nbody {\n  height: 100%;\n}\n\nbody {\n  align-items: center;\n  background-color: #0f0b0b;\n  color: #fff;\n  display: flex;\n  justify-content: center;\n}\n\nlabel {\n  align-items: center;\n  cursor: pointer;\n  display: flex;\n  font-family: \"IBM Plex Mono\", monospace;\n  font-weight: 400;\n  font-size: 24px;\n  padding-right: 15px;\n  position: relative;\n\n  span {\n    margin-left: 5px;\n    transition:\n      text-shadow 1000ms ease,\n      color 1000ms ease;\n  }\n}\n\ninput[type=\"radio\"] {\n  opacity: 0;\n  position: absolute;\n\n  &:checked + label span {\n    color: #fcdcf3;\n    text-shadow: #e324f2 0px 0px 12px;\n  }\n}\n\ninput[type=\"radio\"]:focus-visible + label {\n  outline: 2px solid #faed76;\n  border-radius: 6px;\n}\n\npolygon {\n  &.unchecked {\n    stroke: #252630;\n  }\n\n  &.pink,\n  &.blue {\n    opacity: 0;\n  }\n\n  &.blue {\n    mix-blend-mode: plus-lighter;\n    stroke: #00ff9d;\n  }\n\n  &.pink {\n    stroke: #ff00a8;\n  }\n}\n\ntext {\n  fill: #00ff9d;\n  font-size: 24px;\n}\n\n</style>\n\n\n  </head>\n\n  <body>\n    <div class=\"container\">\n  <div class=\"radio-btn-group\">\n    <input type=\"radio\" name=\"options\" value=\"1\" id=\"option-1\" />\n    <label for=\"option-1\">\n      <svg width=\"350px\" height=\"50px\">\n        <defs>\n          <filter\n            id=\"displace\"\n            primitiveUnits=\"objectBoundingBox\"\n            color-interpolation-filters=\"sRGB\"\n          >\n            <feFlood flood-color=\"#8888FF\" y=\"0%\" height=\"7%\" result=\"s0\" />\n            <feFlood flood-color=\"#888800\" y=\"7%\" height=\"14%\" result=\"s1\" />\n            <feFlood flood-color=\"#8888FF\" y=\"21%\" height=\"6%\" result=\"s2\" />\n            <feFlood flood-color=\"#888800\" y=\"27%\" height=\"12%\" result=\"s3\" />\n            <feFlood flood-color=\"#8888FF\" y=\"39%\" height=\"8%\" result=\"s4\" />\n            <feFlood flood-color=\"#888800\" y=\"47%\" height=\"17%\" result=\"s5\" />\n            <feFlood flood-color=\"#8888FF\" y=\"64%\" height=\"5%\" result=\"s6\" />\n            <feFlood flood-color=\"#888800\" y=\"69%\" height=\"11%\" result=\"s7\" />\n            <feFlood flood-color=\"#8888FF\" y=\"80%\" height=\"9%\" result=\"s8\" />\n            <feFlood flood-color=\"#888800\" y=\"89%\" height=\"11%\" result=\"s9\" />\n\n            <feMerge result=\"bands\">\n              <feMergeNode in=\"s0\" />\n              <feMergeNode in=\"s1\" />\n              <feMergeNode in=\"s2\" />\n              <feMergeNode in=\"s3\" />\n              <feMergeNode in=\"s4\" />\n              <feMergeNode in=\"s5\" />\n              <feMergeNode in=\"s6\" />\n              <feMergeNode in=\"s7\" />\n              <feMergeNode in=\"s8\" />\n              <feMergeNode in=\"s9\" />\n            </feMerge>\n\n            <feDisplacementMap\n              class=\"displace\"\n              in=\"SourceGraphic\"\n              in2=\"bands\"\n              scale=\"0\"\n              xChannelSelector=\"R\"\n              yChannelSelector=\"B\"\n            />\n          </filter>\n\n          <pattern\n            id=\"scanline-pattern\"\n            class=\"scanline-pattern\"\n            patternUnits=\"userSpaceOnUse\"\n            width=\"5\"\n            height=\"10\"\n          >\n            <rect\n              class=\"scanline\"\n              x=\"0\"\n              y=\"0\"\n              width=\"5\"\n              height=\"1\"\n              fill=\"#131522\"\n            />\n            <rect x=\"0\" y=\"1\" width=\"5\" height=\"9\" fill=\"none\" />\n          </pattern>\n\n          <radialGradient\n            id=\"fade\"\n            gradientUnits=\"userSpaceOnUse\"\n            cx=\"175\"\n            cy=\"25\"\n            r=\"50\"\n            gradientTransform=\"translate(175 25) scale(3 1) translate(-175 -25)\"\n          >\n            <stop offset=\"0%\" stop-color=\"#0f0b0b\" stop-opacity=\"0\" />\n            <stop offset=\"60%\" stop-color=\"#0f0b0b\" stop-opacity=\"0\" />\n            <stop offset=\"100%\" stop-color=\"#0f0b0b\" stop-opacity=\"1\" />\n          </radialGradient>\n        </defs>\n\n        <g filter=\"url(#displace)\">\n          <rect\n            x=\"0\"\n            y=\"20\"\n            width=\"100%\"\n            height=\"25\"\n            fill=\"url(#scanline-pattern)\"\n          />\n\n          <polygon\n            class=\"unchecked\"\n            points=\"30,15 42.99,22.5 42.99,37.5 30,45 17.01,37.5 17.01,22.5\"\n            fill=\"none\"\n            stroke-width=\"4\"\n            stroke-linejoin=\"round\"\n            stroke-linecap=\"round\"\n            transform=\"translate(60 0)\"\n          />\n\n          <polygon\n            class=\"pink\"\n            points=\"30,15 42.99,22.5 42.99,37.5 30,45 17.01,37.5 17.01,22.5\"\n            fill=\"none\"\n            stroke-width=\"4\"\n            stroke-linejoin=\"round\"\n            stroke-linecap=\"round\"\n            transform=\"translate(78 0)\"\n          />\n\n          <polygon\n            class=\"blue\"\n            points=\"30,15 42.99,22.5 42.99,37.5 30,45 17.01,37.5 17.01,22.5\"\n            fill=\"none\"\n            stroke-width=\"4\"\n            stroke-linejoin=\"round\"\n            stroke-linecap=\"round\"\n            transform=\"translate(42 0)\"\n          />\n          <text x=\"125\" y=\"32\" dominant-baseline=\"middle\">Nebula</text>\n        </g>\n        <rect width=\"350\" height=\"50\" fill=\"url(#fade)\" />\n      </svg>\n    </label>\n  </div>\n  <div class=\"radio-btn-group\">\n    <input type=\"radio\" name=\"options\" value=\"2\" id=\"option-2\" />\n    <label for=\"option-2\">\n      <svg width=\"350px\" height=\"50px\">\n        <defs>\n          <filter\n            id=\"displace-2\"\n            primitiveUnits=\"objectBoundingBox\"\n            color-interpolation-filters=\"sRGB\"\n          >\n            <feFlood flood-color=\"#8888FF\" y=\"0%\" height=\"13%\" result=\"s0\" />\n            <feFlood flood-color=\"#888800\" y=\"13%\" height=\"5%\" result=\"s1\" />\n            <feFlood flood-color=\"#8888FF\" y=\"18%\" height=\"16%\" result=\"s2\" />\n            <feFlood flood-color=\"#888800\" y=\"34%\" height=\"7%\" result=\"s3\" />\n            <feFlood flood-color=\"#8888FF\" y=\"41%\" height=\"11%\" result=\"s4\" />\n            <feFlood flood-color=\"#888800\" y=\"52%\" height=\"4%\" result=\"s5\" />\n            <feFlood flood-color=\"#8888FF\" y=\"56%\" height=\"18%\" result=\"s6\" />\n            <feFlood flood-color=\"#888800\" y=\"74%\" height=\"6%\" result=\"s7\" />\n            <feFlood flood-color=\"#8888FF\" y=\"80%\" height=\"13%\" result=\"s8\" />\n            <feFlood flood-color=\"#888800\" y=\"93%\" height=\"7%\" result=\"s9\" />\n\n            <feMerge result=\"bands\">\n              <feMergeNode in=\"s0\" />\n              <feMergeNode in=\"s1\" />\n              <feMergeNode in=\"s2\" />\n              <feMergeNode in=\"s3\" />\n              <feMergeNode in=\"s4\" />\n              <feMergeNode in=\"s5\" />\n              <feMergeNode in=\"s6\" />\n              <feMergeNode in=\"s7\" />\n              <feMergeNode in=\"s8\" />\n              <feMergeNode in=\"s9\" />\n            </feMerge>\n\n            <feDisplacementMap\n              class=\"displace\"\n              in=\"SourceGraphic\"\n              in2=\"bands\"\n              scale=\"0\"\n              xChannelSelector=\"R\"\n              yChannelSelector=\"B\"\n            />\n          </filter>\n\n          <pattern\n            id=\"scanline-pattern-2\"\n            class=\"scanline-pattern\"\n            patternUnits=\"userSpaceOnUse\"\n            width=\"5\"\n            height=\"10\"\n          >\n            <rect\n              class=\"scanline\"\n              x=\"0\"\n              y=\"0\"\n              width=\"5\"\n              height=\"1\"\n              fill=\"#131522\"\n            />\n            <rect x=\"0\" y=\"1\" width=\"5\" height=\"9\" fill=\"none\" />\n          </pattern>\n\n          <radialGradient\n            id=\"fade-2\"\n            gradientUnits=\"userSpaceOnUse\"\n            cx=\"175\"\n            cy=\"25\"\n            r=\"50\"\n            gradientTransform=\"translate(175 25) scale(3 1) translate(-175 -25)\"\n          >\n            <stop offset=\"0%\" stop-color=\"#0f0b0b\" stop-opacity=\"0\" />\n            <stop offset=\"60%\" stop-color=\"#0f0b0b\" stop-opacity=\"0\" />\n            <stop offset=\"100%\" stop-color=\"#0f0b0b\" stop-opacity=\"1\" />\n          </radialGradient>\n        </defs>\n\n        <g filter=\"url(#displace-2)\">\n          <rect\n            x=\"0\"\n            y=\"20\"\n            width=\"100%\"\n            height=\"25\"\n            fill=\"url(#scanline-pattern-2)\"\n          />\n\n          <polygon\n            class=\"unchecked\"\n            points=\"30,15 42.99,22.5 42.99,37.5 30,45 17.01,37.5 17.01,22.5\"\n            fill=\"none\"\n            stroke-width=\"4\"\n            stroke-linejoin=\"round\"\n            stroke-linecap=\"round\"\n            transform=\"translate(60 0)\"\n          />\n\n          <polygon\n            class=\"pink\"\n            points=\"30,15 42.99,22.5 42.99,37.5 30,45 17.01,37.5 17.01,22.5\"\n            fill=\"none\"\n            stroke-width=\"4\"\n            stroke-linejoin=\"round\"\n            stroke-linecap=\"round\"\n            transform=\"translate(78 0)\"\n          />\n\n          <polygon\n            class=\"blue\"\n            points=\"30,15 42.99,22.5 42.99,37.5 30,45 17.01,37.5 17.01,22.5\"\n            fill=\"none\"\n            stroke-width=\"4\"\n            stroke-linejoin=\"round\"\n            stroke-linecap=\"round\"\n            transform=\"translate(42 0)\"\n          />\n\n          <text x=\"125\" y=\"32\" dominant-baseline=\"middle\">Quasar</text>\n        </g>\n\n        <rect width=\"350\" height=\"50\" fill=\"url(#fade-2)\" />\n      </svg>\n    </label>\n  </div>\n  <div class=\"radio-btn-group\">\n    <input type=\"radio\" name=\"options\" value=\"3\" id=\"option-3\" />\n    <label for=\"option-3\">\n      <svg width=\"350px\" height=\"50px\">\n        <defs>\n          <filter\n            id=\"displace-3\"\n            primitiveUnits=\"objectBoundingBox\"\n            color-interpolation-filters=\"sRGB\"\n          >\n            <feFlood flood-color=\"#8888FF\" y=\"0%\" height=\"9%\" result=\"s0\" />\n            <feFlood flood-color=\"#888800\" y=\"9%\" height=\"18%\" result=\"s1\" />\n            <feFlood flood-color=\"#8888FF\" y=\"27%\" height=\"5%\" result=\"s2\" />\n            <feFlood flood-color=\"#888800\" y=\"32%\" height=\"14%\" result=\"s3\" />\n            <feFlood flood-color=\"#8888FF\" y=\"46%\" height=\"8%\" result=\"s4\" />\n            <feFlood flood-color=\"#888800\" y=\"54%\" height=\"12%\" result=\"s5\" />\n            <feFlood flood-color=\"#8888FF\" y=\"66%\" height=\"6%\" result=\"s6\" />\n            <feFlood flood-color=\"#888800\" y=\"72%\" height=\"16%\" result=\"s7\" />\n            <feFlood flood-color=\"#8888FF\" y=\"88%\" height=\"4%\" result=\"s8\" />\n            <feFlood flood-color=\"#888800\" y=\"92%\" height=\"8%\" result=\"s9\" />\n\n            <feMerge result=\"bands\">\n              <feMergeNode in=\"s0\" />\n              <feMergeNode in=\"s1\" />\n              <feMergeNode in=\"s2\" />\n              <feMergeNode in=\"s3\" />\n              <feMergeNode in=\"s4\" />\n              <feMergeNode in=\"s5\" />\n              <feMergeNode in=\"s6\" />\n              <feMergeNode in=\"s7\" />\n              <feMergeNode in=\"s8\" />\n              <feMergeNode in=\"s9\" />\n            </feMerge>\n\n            <feDisplacementMap\n              class=\"displace\"\n              in=\"SourceGraphic\"\n              in2=\"bands\"\n              scale=\"0\"\n              xChannelSelector=\"R\"\n              yChannelSelector=\"B\"\n            />\n          </filter>\n\n          <pattern\n            id=\"scanline-pattern-3\"\n            class=\"scanline-pattern\"\n            patternUnits=\"userSpaceOnUse\"\n            width=\"5\"\n            height=\"10\"\n          >\n            <rect\n              class=\"scanline\"\n              x=\"0\"\n              y=\"0\"\n              width=\"5\"\n              height=\"1\"\n              fill=\"#131522\"\n            />\n            <rect x=\"0\" y=\"1\" width=\"5\" height=\"9\" fill=\"none\" />\n          </pattern>\n\n          <radialGradient\n            id=\"fade-3\"\n            gradientUnits=\"userSpaceOnUse\"\n            cx=\"175\"\n            cy=\"25\"\n            r=\"50\"\n            gradientTransform=\"translate(175 25) scale(3 1) translate(-175 -25)\"\n          >\n            <stop offset=\"0%\" stop-color=\"#0f0b0b\" stop-opacity=\"0\" />\n            <stop offset=\"60%\" stop-color=\"#0f0b0b\" stop-opacity=\"0\" />\n            <stop offset=\"100%\" stop-color=\"#0f0b0b\" stop-opacity=\"1\" />\n          </radialGradient>\n        </defs>\n\n        <g filter=\"url(#displace-3)\">\n          <rect\n            x=\"0\"\n            y=\"20\"\n            width=\"100%\"\n            height=\"25\"\n            fill=\"url(#scanline-pattern-3)\"\n          />\n\n          <polygon\n            class=\"unchecked\"\n            points=\"30,15 42.99,22.5 42.99,37.5 30,45 17.01,37.5 17.01,22.5\"\n            fill=\"none\"\n            stroke-width=\"4\"\n            stroke-linejoin=\"round\"\n            stroke-linecap=\"round\"\n            transform=\"translate(60 0)\"\n          />\n\n          <polygon\n            class=\"pink\"\n            points=\"30,15 42.99,22.5 42.99,37.5 30,45 17.01,37.5 17.01,22.5\"\n            fill=\"none\"\n            stroke-width=\"4\"\n            stroke-linejoin=\"round\"\n            stroke-linecap=\"round\"\n            transform=\"translate(78 0)\"\n          />\n\n          <polygon\n            class=\"blue\"\n            points=\"30,15 42.99,22.5 42.99,37.5 30,45 17.01,37.5 17.01,22.5\"\n            fill=\"none\"\n            stroke-width=\"4\"\n            stroke-linejoin=\"round\"\n            stroke-linecap=\"round\"\n            transform=\"translate(42 0)\"\n          />\n\n          <text x=\"125\" y=\"32\" dominant-baseline=\"middle\">Pulsar</text>\n        </g>\n\n        <rect width=\"350\" height=\"50\" fill=\"url(#fade-3)\" />\n      </svg>\n    </label>\n  </div>\n</div>\n\n    <script>\nimport { gsap } from \"gsap\";\nimport { RoughEase } from \"gsap/EasePack\";\n\nclass RadioButtonEffect {\n  constructor(radioBtnGroups, config) {\n    this.config = config;\n    this.previousGroup = null;\n    this.timelines = new WeakMap();\n\n    radioBtnGroups.forEach((group) => {\n      this.registerTimelines(group);\n      const radioBtn = gsap.utils.selector(group)(\"input[type='radio']\")[0];\n      const label = group.querySelector(\"label\");\n      const timelines = this.timelines.get(group);\n\n      label.addEventListener(\"mouseenter\", () => {\n        timelines.scanlineMotion.play();\n        timelines.scanlineFlicker.play();\n      });\n\n      label.addEventListener(\"mouseleave\", () => {\n        timelines.scanlineMotion.pause(0);\n        timelines.scanlineFlicker.pause(0);\n      });\n\n      radioBtn.addEventListener(\"change\", () => {\n        if (this.previousGroup && this.previousGroup !== group) {\n          const previousTimelines = this.timelines.get(this.previousGroup);\n          if (previousTimelines) {\n            previousTimelines.pinkOpacity.reverse();\n            previousTimelines.blueOpacity.reverse();\n            previousTimelines.scanlineFlicker.reverse();\n            previousTimelines.scanlineDisplacement.pause(0);\n          }\n        }\n\n        timelines.pinkOpacity.play();\n        timelines.blueOpacity.play();\n        timelines.scanlineFlicker.play();\n        timelines.scanlineDisplacement.play();\n\n        this.previousGroup = group;\n      });\n    });\n  }\n\n  registerTimelines(group) {\n    const { duration, ease, easeOut } = this.config;\n    const scanlinePattern = group.querySelector(\".scanline-pattern\");\n    const scanline = group.querySelector(\".scanline\");\n    const displacement = group.querySelector(\".displace\");\n    const bluePolygon = group.querySelector(\".blue\");\n    const pinkPolygon = group.querySelector(\".pink\");\n\n    const createTimeline = (options = {}) =>\n      gsap.timeline({\n        paused: true,\n        ...options\n      });\n\n    const timelines = {\n      scanlineMotion: createTimeline(),\n      scanlineFlicker: createTimeline(),\n      scanlineDisplacement: createTimeline({\n        repeat: -1,\n        repeatDelay: 1\n      }),\n      pinkOpacity: createTimeline(),\n      blueOpacity: createTimeline()\n    };\n\n    timelines.scanlineMotion.to(scanlinePattern, {\n      attr: { y: 10 },\n      duration: 0.35,\n      ease: \"none\",\n      repeat: -1\n    });\n\n    timelines.scanlineFlicker.to(scanline, {\n      fill: \"#1d3b57\",\n      duration,\n      ease,\n      repeat: -1,\n      yoyo: true\n    });\n\n    timelines.scanlineDisplacement\n      .to(displacement, {\n        attr: {\n          scale: () => gsap.utils.random(0.02, 0.15)\n        },\n        duration,\n        ease,\n        repeatRefresh: true\n      })\n      .to(displacement, {\n        attr: { scale: 0 },\n        duration,\n        ease\n      });\n\n    timelines.blueOpacity.to(bluePolygon, {\n      x: 60,\n      rotation: -1080,\n      transformOrigin: \"center center\",\n      opacity: 1,\n      ease,\n      duration,\n      easeReverse: easeOut,\n    });\n\n    timelines.pinkOpacity.to(pinkPolygon, {\n      x: 60,\n      rotation: 1080,\n      transformOrigin: \"center center\",\n      opacity: 1,\n      ease,\n      duration,\n      easeReverse: easeOut,\n    });\n\n    this.timelines.set(group, timelines);\n  }\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const config = {\n    ease: RoughEase.ease.config({ strength: 6, points: 50 }),\n    easeOut: \"power2.in\",\n    duration: 1\n  };\n\n  const radioBtnGroups = document.querySelectorAll(\".radio-btn-group\");\n  new RadioButtonEffect(radioBtnGroups, config);\n});\n\n</script>\n  </body>\n\n</html>";

    // Inject customization overrides into base
    const customStyles = [];
    let customScript = '';

    
      customStyles.push(`
        body { background: ${s.bgColor || '#080811'} !important; font-family: ${s.fontFamily || "'Orbitron', sans-serif"} !important; }
        label { font-family: ${s.fontFamily || "'Orbitron', sans-serif"} !important; color: ${s.neonColor || '#00f3ff'} !important; }
        :root { --neon-col: ${s.neonColor || '#00f3ff'}; }
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
