# 🌌 SPACEFX — Interactive Web Visuals & Background Effects Studio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-spacefx.web.app-blueviolet?style=for-the-badge&logo=firebase)](https://spacefx.web.app)
[![GitHub stars](https://img.shields.io/github/stars/slashbot28/SPACEFX?style=for-the-badge)](https://github.com/slashbot28/SPACEFX)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> Een interactieve playground en suite van **47+ visuele webeffecten**, WebGL shaders, fysica-simulaties, audio-reactieve visualizers en dynamische animaties — direct instelbaar, met 1 klik te kopiëren naar HTML/CSS/JS, te downloaden of te openen in CodePen!

🌐 **Live Website:** [https://spacefx.web.app](https://spacefx.web.app)

---

## ✨ Highlights & Functies

### 🎨 47+ Geavanceerde Effecten in 15 Categorieën
- **Special & Experimental:** *Manifold Mandala* (non-Euclidische fractale raymarching), *Liquid Chrome* (mercury fluid blob), *Phosphorescence* (bioluminescente deeltjestekst), *ASCII Video Matrix*, en meer.
- **Physics & Simulation:** *Interactive Strings* (akoestische fysica & resonantietekst), *Tearable Cloth* (3D stof scheuren met Verlet integratie), *Boids Flocking* (zwermintelligentie), *Fluid Ripples*.
- **Background Visuals:** *Warp Drive Starfield*, *The Matrix Digital Rain*, *Doom Fire*, *Cyberpunk Neon City Grid*, *Starry Night*.
- **3D & CSS3D:** *3D Parallax Tilt Cards*, *Rubik's / Responsive CSS Cube*, *3D Sphere Tag Cloud*.
- **Audio Visualizers:** Waveform oscilloscopes, frequency bars, circular audio pulse.
- **SVG & Typografie:** *SVG Stroke Path Drawing* met eigen tekstinvoer, *Hacker Text Scrambler*, *Neon Glow Text*.
- **Camera, Mouse & Transitions:** Real-time webcam effecten, Cyber Glitch transition, Ken Burns, en interactieve muistrails.

---

### 🎵 1. Audio-Reactiviteit (Live VJ Modus)
- Koppel je **microfoon 🎙️** of activeer de **ingebouwde 128 BPM Synth Beat 🎧**.
- Visuals reageren direct in real-time op bass-kicks en frequenties:
  - *Warp Drive*: bass-kicks veroorzaken hyperspace-boosts!
  - *Manifold Mandala*: non-Euclidische vouwingen en zoom pulseren op het ritme van de beat.
  - *The Matrix Rain*: letters flitsen intenser op de drops.
  - *Doom Fire*: vlammen laaien hoger op bij geluidspieken.

---

### 🎛️ 2. Dual-Layer Composite Modus
- Combineer **2 effecten** naadloos over elkaar:
  - Achtergrondlaag (bijv. *Warp Drive Starfield* of *Matrix Rain*)
  - Voorgrondlaag (bijv. *3D Parallax Tilt Card* of *Interactive Strings*)
- Bekijk het resultaat live in de composite stage en exporteer de gecombineerde multi-layer HTML-pagina met 1 klik.

---

### 🎲 3. 1-Klik "Magic Themes" Kleurpaletten
Schakel direct tussen sfeervolle, samengestelde paletten met 1 klik of de dobbelsteen:
- 🟣 **Cyberpunk / Synthwave** (Neon Roze, Cyaan & Violet)
- 🟢 **Matrix Terminal** (Fosforgroen & Diepzwart)
- 🧛 **Dracula Dark** (Paars, Crimson Rood & Slate)
- 🌅 **Sunset Gold** (Oranje, Goud & Magenta)
- ❄️ **Nordic Frost** (IJsblauw & Poolwit)
- 🎲 **Randomize**: genereert dynamisch nieuwe harmonieuze kleurcombinaties.

---

### 📺 4. Screensaver / Showcase Modus
- **Zen / Fullscreen (`Z` toets of dubbelklik):** Verbergt alle UI-elementen voor een rustgevende, kamer-vullende weergave op een tweede monitor of tv.
- **Auto-Tour (Showreel):** Fietst automatisch elke 10 seconden naar het volgende effect met vloeiende overgangen en een voortgangsbalk.

---

### 💾 5. Directe Export & Code-generatie
- **📋 Kopieer HTML/CSS/JS:** Krijg direct een schone, zelfstandige code snippet zonder externe frameworks.
- **💾 Download .html:** Download met 1 klik een standalone `.html` bestand dat je offline direct kunt openen in elke browser.
- **🚀 Open in CodePen:** Exporteert het actieve effect automatisch als een werkende live demo in CodePen.

---

### ✍️ 6. Custom Tekst & Woorden in Effecten
Vrijwel alle toepasselijke effecten ondersteunen jouw eigen naam, teksten en quotes:
- **Manifold Mandala:** Eigen centrale mantra en meetkundige subtitel.
- **Interactive Strings:** Jouw eigen songteksten of quotes vibreren mee langs de getokkelde snaren.
- **Liquid Chrome:** Jouw tekst gegraveerd in spiegelend vloeibaar kwikzilver.
- **Phosphorescence:** Duizenden deeltjes vloeien samen om jouw woord of naam te vormen.
- **SVG Stroke Drawing:** Converteert ingetypte tekst realtime naar geanimeerde SVG vector strokes.
- **Bad TV CRT & Hacker Scrambler:** Retro storingen en matrix decryptie van jouw eigen zinnen.

---

## 🚀 Lokaal Draaien

Er zijn **geen zware dependencies of build steps** nodig. Alles is gebouwd met pure Vanilla JavaScript, WebGL, Web Audio API en HTML5 Canvas!

1. **Clone de repository:**
   ```bash
   git clone https://github.com/slashbot28/SPACEFX.git
   cd SPACEFX
   ```

2. **Start de server:**
   ```bash
   node server.js
   ```

3. **Open in je browser:**
   ```
   http://localhost:3000
   ```

---

## ☁️ Deployment (Firebase Hosting)

Dit project is geoptimaliseerd voor **Firebase Hosting**:

1. **Installeer Firebase CLI (indien nodig):**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login en deploy:**
   ```bash
   firebase login
   firebase deploy --only hosting
   ```

Het project staat live op: [https://spacefx.web.app](https://spacefx.web.app).

---

## 📁 Projectstructuur

```
SPACEFX/
├── index.html              # Hoofdapplicatie & interactieve visual studio
├── server.js               # Lokale ontwikkelingsserver
├── firebase.json           # Firebase Hosting configuratie
├── .firebaserc             # Firebase project & multi-site targets
├── css/
│   ├── styles.css          # UI interface, modalen, navigatie & theming
│   └── effects.css         # CSS-gebaseerde animaties en 3D stijlen
└── js/
    ├── app.js              # Applicatielogica, presets, tabs, export & auto-tour
    ├── audio-reactive.js   # Web Audio API engine (microfoon & beat analyser)
    └── effects/            # Effectmodules
        ├── liam_egan.js        # Manifold Mandala, Strings, Liquid Chrome, Phosphorescence
        ├── extra_legendary.js  # Tearable Cloth, ASCII Art, Synthwave Grid, Boids
        ├── backgrounds.js      # Warp Drive, Matrix Rain, Canvas Particles
        ├── mouse.js            # Interactive cursors, water ripples, mouse trails
        ├── css3d.js            # 3D transforms, Parallax tilt, 3D cubes
        ├── image.js            # Ken Burns, Heatwave Haze, Distortion
        ├── transition.js       # Cyber Glitch, Dissolve transitions
        ├── rain_snow.js        # Winter Snowstorm, Rain on Glass
        ├── audio.js            # Audio visualizer spectrums & wave circles
        ├── svg.js              # Dynamic SVG text path drawing
        ├── fireworks.js        # Sound-driven fireworks simulation
        └── special.js          # Bad TV CRT shader, Doom Fire, Hacker Text
```

---

## 📄 Licentie

Gedistribueerd onder de [MIT](LICENSE) licentie. Vrij te gebruiken voor persoonlijke en commerciële webprojecten!
