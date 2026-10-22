// ========================================================
// LOADING EFFECTS
// Source: lindelof/awesome-web-effect
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// 1. THREE DOTS BOUNCING WAVE
window.EffectRegistry['three-dots'] = {
  id: 'three-dots',
  title: 'Three Dots Bouncing Wave',
  category: 'Loading Effect',
  tech: 'CSS Keyframe Wave Sync',
  github: 'https://github.com/nzbin/three-dots',
  description: 'Minimalistische, elegante drie-stippen golfanimatie.',
  defaultSettings: {
    dotSize: 16,
    speed: 1.2,
    color: '#06b6d4'
  },
  controls: [
    { type: 'range', key: 'dotSize', label: 'Stip Diameter (px)', min: 8, max: 32, step: 2 },
    { type: 'range', key: 'speed', label: 'Golf Snelheid (sec)', min: 0.5, max: 2.5, step: 0.1 },
    { type: 'color', key: 'color', label: 'Stippen Kleur' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.wrapper = document.createElement('div');
    this.wrapper.style.display = 'flex';
    this.wrapper.style.alignItems = 'center';
    this.wrapper.style.justifyContent = 'center';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';

    this.render();
    container.innerHTML = '';
    container.appendChild(this.wrapper);
  },
  render() {
    const s = this.settings;
    this.wrapper.innerHTML = `
      <div class="three-dots-wave" id="dots-wave">
        <span style="width: ${s.dotSize}px; height: ${s.dotSize}px; background: ${s.color}; animation-duration: ${s.speed}s;"></span>
        <span style="width: ${s.dotSize}px; height: ${s.dotSize}px; background: ${s.color}; animation-duration: ${s.speed}s;"></span>
        <span style="width: ${s.dotSize}px; height: ${s.dotSize}px; background: ${s.color}; animation-duration: ${s.speed}s;"></span>
      </div>
    `;
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
  <title>Three Dots Wave Loader</title>
  <style>
    body { margin: 0; background: #0c0f17; display: flex; align-items: center; justify-content: center; height: 100vh; }
    .wave { display: flex; gap: 8px; }
    .wave span {
      width: ${s.dotSize}px; height: ${s.dotSize}px; border-radius: 50%; background: ${s.color};
      animation: bounce ${s.speed}s infinite ease-in-out;
    }
    .wave span:nth-child(2) { animation-delay: 0.2s; }
    .wave span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce {
      0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
      40% { transform: translateY(-16px); opacity: 1; }
    }
  </style>
</head>
<body>
  <div class="wave"><span></span><span></span><span></span></div>
</body>
</html>`;
  }
};

// 2. CYBERPUNK RADAR SCAN LOADER
window.EffectRegistry['radar-loader'] = {
  id: 'radar-loader',
  title: 'Cyberpunk Radar Scan Loader',
  category: 'Loading Effect',
  tech: 'Conic Gradient CSS Sweep',
  github: 'https://github.com/jh3y/whirl',
  description: 'Futuristische roterende radar-scanner met richtingshoek en grid.',
  defaultSettings: {
    size: 140,
    speed: 1.8,
    color: '#06b6d4'
  },
  controls: [
    { type: 'range', key: 'size', label: 'Radar Diameter (px)', min: 80, max: 260, step: 10 },
    { type: 'range', key: 'speed', label: 'Rotatieduur (sec)', min: 0.6, max: 4, step: 0.2 },
    { type: 'color', key: 'color', label: 'Radar Gloed Kleur' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.wrapper = document.createElement('div');
    this.wrapper.style.display = 'flex';
    this.wrapper.style.alignItems = 'center';
    this.wrapper.style.justifyContent = 'center';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';

    this.render();
    container.innerHTML = '';
    container.appendChild(this.wrapper);
  },
  render() {
    const s = this.settings;
    this.wrapper.innerHTML = `
      <div class="radar-loader" style="width: ${s.size}px; height: ${s.size}px; border-color: ${s.color}66; box-shadow: 0 0 25px ${s.color}33;">
        <div class="radar-sweep" style="animation-duration: ${s.speed}s; background: conic-gradient(from 0deg, transparent 0deg 270deg, ${s.color} 360deg);"></div>
      </div>
    `;
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
  <title>Cyber Radar Loader</title>
  <style>
    body { margin: 0; background: #06090e; display: flex; align-items: center; justify-content: center; height: 100vh; }
    .radar {
      position: relative; width: ${s.size}px; height: ${s.size}px; border-radius: 50%;
      border: 2px solid ${s.color}66; box-shadow: 0 0 25px ${s.color}33;
    }
    .sweep {
      position: absolute; inset: 0; border-radius: 50%;
      background: conic-gradient(from 0deg, transparent 0deg 270deg, ${s.color} 360deg);
      animation: spin ${s.speed}s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="radar"><div class="sweep"></div></div>
</body>
</html>`;
  }
};

