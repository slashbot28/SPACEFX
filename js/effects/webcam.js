// ========================================================
// WEBCAM EFFECTS
// Source: lindelof/awesome-web-effect
// ========================================================

window.EffectRegistry = window.EffectRegistry || {};

// 1. WEBCAM LIVE IMAGE PROCESSING & FILTERS
window.EffectRegistry['webcam-effects'] = {
  id: 'webcam-effects',
  title: 'WebCam Live Image Processing',
  category: 'WebCam Effect',
  tech: 'getUserMedia & Canvas Pixel Shaders',
  github: 'https://github.com/conorbuck/canvas-video-effects',
  description: 'Real-time camerabeelden bewerking met effecten zoals Matrix, ASCII, Neon Edge en Invert.',
  defaultSettings: {
    filterMode: 'cyberpunk', // cyberpunk, ascii, edges, invert
    brightness: 1.1,
    contrast: 1.2
  },
  controls: [
    { type: 'select', key: 'filterMode', label: 'Filter Effect', options: ['cyberpunk', 'ascii', 'edges', 'invert'] },
    { type: 'range', key: 'brightness', label: 'Helderheid', min: 0.5, max: 2, step: 0.1 },
    { type: 'range', key: 'contrast', label: 'Contrast', min: 0.5, max: 2.5, step: 0.1 },
    { type: 'trigger', key: 'startCamera', label: '📹 Start / Schakel Webcam In' }
  ],
  init(container, settings) {
    this.container = container;
    this.settings = { ...this.defaultSettings, ...settings };
    this.wrapper = document.createElement('div');
    this.wrapper.style.display = 'flex';
    this.wrapper.style.flexDirection = 'column';
    this.wrapper.style.alignItems = 'center';
    this.wrapper.style.justifyContent = 'center';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';
    this.wrapper.style.gap = '16px';

    this.wrapper.innerHTML = `
      <div style="position: relative; width: 480px; height: 320px; border-radius: 12px; overflow: hidden; background: #000; box-shadow: 0 15px 35px rgba(0,0,0,0.7); border: 1px solid rgba(255,255,255,0.1);">
        <video id="webcam-video" autoplay playsinline muted style="display: none;"></video>
        <canvas id="webcam-canvas" width="480" height="320" style="width: 100%; height: 100%; display: block;"></canvas>
        <div id="cam-status" style="position: absolute; bottom: 12px; left: 16px; font-family: var(--font-mono); font-size: 0.75rem; color: #22c55e; background: rgba(0,0,0,0.6); padding: 4px 8px; border-radius: 4px;">
          ● SIMULATIE TEST PATROON (Klik op 'Start Webcam' om echte camera te openen)
        </div>
      </div>
    `;
    container.innerHTML = '';
    container.appendChild(this.wrapper);

    this.video = this.wrapper.querySelector('#webcam-video');
    this.canvas = this.wrapper.querySelector('#webcam-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.statusEl = this.wrapper.querySelector('#cam-status');

    this.isCamActive = false;
    this.simTime = 0;
    this.active = true;
    this.loop();
  },
  startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { width: 480, height: 320 } })
        .then((stream) => {
          this.video.srcObject = stream;
          this.video.play();
          this.isCamActive = true;
          this.statusEl.textContent = '● LIVE WEBCAM FEED ACTIEF';
          this.statusEl.style.color = '#06b6d4';
        })
        .catch((err) => {
          alert('Webcam toegang niet toegestaan of niet gevonden: ' + err.message + '\nSimulatiemodus blijft actief.');
        });
    }
  },
  update(settings) {
    this.settings = { ...this.settings, ...settings };
  },
  loop() {
    if (!this.active) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    if (this.isCamActive && this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      ctx.drawImage(this.video, 0, 0, w, h);
    } else {
      // Draw dynamic high-tech simulated test camera feed with moving graphics
      this.simTime += 0.03;
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, w, h);

      // Cyber target grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      // Target reticle
      const cx = w / 2 + Math.sin(this.simTime) * 80;
      const cy = h / 2 + Math.cos(this.simTime * 0.8) * 50;

      ctx.beginPath();
      ctx.arc(cx, cy, 35, 0, Math.PI * 2);
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#22c55e';
      ctx.font = '12px monospace';
      ctx.fillText(`TARGET ACQUIRED [${Math.round(cx)}, ${Math.round(cy)}]`, cx - 60, cy + 55);
    }

    // Apply pixel filters
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const mode = this.settings.filterMode;

    if (mode === 'cyberpunk') {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 1.3); // Boost Red/Pink
        data[i + 1] = data[i + 1] * 0.4;        // Drop Green
        data[i + 2] = Math.min(255, data[i + 2] * 1.5); // Boost Blue/Cyan
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (mode === 'invert') {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (mode === 'edges') {
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const edge = avg > 90 && avg < 160 ? 255 : 0;
        data[i] = 0;
        data[i + 1] = edge;
        data[i + 2] = edge;
      }
      ctx.putImageData(imgData, 0, 0);
    }

    this.raf = requestAnimationFrame(() => this.loop());
  },
  destroy() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    if (this.video && this.video.srcObject) {
      this.video.srcObject.getTracks().forEach(track => track.stop());
    }
  },
  getCode(settings) {
    const s = { ...this.defaultSettings, ...settings };
    return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>WebCam Live Video Effects</title>
  <style>
    body { margin: 0; background: #07090e; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
    canvas { border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.7); }
    button { margin-top: 16px; padding: 12px 24px; background: #06b6d4; color: black; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; }
  </style>
</head>
<body>
  <video id="v" autoplay playsinline style="display: none;"></video>
  <canvas id="c" width="480" height="320"></canvas>
  <button onclick="start()">📹 Schakel Webcam In</button>
  <script>
    const v = document.getElementById('v'), c = document.getElementById('c'), ctx = c.getContext('2d');
    function start() {
      navigator.mediaDevices.getUserMedia({ video: true }).then(s => { v.srcObject = s; v.play(); draw(); });
    }
    function draw() {
      ctx.drawImage(v, 0, 0, c.width, c.height);
      const img = ctx.getImageData(0, 0, c.width, c.height);
      for (let i = 0; i < img.data.length; i += 4) {
        img.data[i] = Math.min(255, img.data[i] * 1.3);
        img.data[i+1] = img.data[i+1] * 0.4;
        img.data[i+2] = Math.min(255, img.data[i+2] * 1.5);
      }
      ctx.putImageData(img, 0, 0);
      requestAnimationFrame(draw);
    }
  </script>
</body>
</html>`;
  }
};

