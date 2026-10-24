# 🌌 SPACEFX — Interactive Web Visuals & Background Effects Studio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-spacefx.web.app-blueviolet?style=for-the-badge&logo=firebase)](https://spacefx.web.app)
[![GitHub stars](https://img.shields.io/github/stars/slashbot28/SPACEFX?style=for-the-badge)](https://github.com/slashbot28/SPACEFX)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **SPACEFX** is an interactive studio and curated library of **72+ visual web effects**, WebGL fragment shaders, physics simulations, audio-reactive visualizers, procedural Web Audio music synthesizers, and dynamic animations.
> Everything runs on pure **Vanilla JavaScript** (zero external frameworks or npm runtime dependencies) and can be customized live, exported as standalone HTML, downloaded offline, or opened directly in CodePen with a single click.

* 🌐 **Live Production URL:** [https://spacefx.web.app](https://spacefx.web.app) *(or [https://spacefx.firebaseapp.com](https://spacefx.firebaseapp.com))*
* 🐙 **GitHub Repository:** [https://github.com/slashbot28/SPACEFX](https://github.com/slashbot28/SPACEFX)
* 💻 **Local Server:** `http://localhost:3000`

---

## 📖 Table of Contents

1. [Quick Start](#-quick-start)
2. [Interface & Navigation](#-interface--navigation)
3. [Custom Text, Names & Typography](#-custom-text-names--typography)
4. [Core Features & User Guide](#-core-features--user-guide)
   - [1. 🎵 Audio-Reactivity (Live VJ Mode)](#1--audio-reactivity-live-vj-mode)
   - [2. 🎛️ Dual-Layer Composite Studio](#2-️-dual-layer-composite-studio)
   - [3. 🎲 1-Click "Magic Themes" & Randomizer](#3--1-click-magic-themes--randomizer)
   - [4. 📺 Zen Screensaver & Auto-Tour Showreel](#4--zen-screensaver--auto-tour-showreel)
   - [5. 💾 1-Click Export, HTML Download & CodePen](#5--1-click-export-html-download--codepen)
5. [Complete Catalog of All 72 Effects](#-complete-catalog-of-all-72-effects)
   - [ShaderToy Audio-Reactive Visualizers (With Real Web Audio Music)](#-shadertoy-audio-reactive-visualizers-with-real-web-audio-music)
   - [Liam Egan Signature Series](#-liam-egan-signature-series)
   - [Legendary Physics & Shaders](#-legendary-physics--shaders)
   - [Background Visuals](#-background-visuals)
   - [Mouse & Cursor Effects](#-mouse--cursor-effects)
   - [CSS 3D Transforms](#-css-3d-transforms)
   - [Images & Transitions](#-images--transitions)
   - [Rain, Snow & Weather](#-rain-snow--weather)
   - [Audio & Waveform Visualizers](#-audio--waveform-visualizers)
   - [SVG & Typography](#-svg--typography)
   - [Special & Retro Shaders](#-special--retro-shaders)
6. [Keyboard Shortcuts & Interactions](#-keyboard-shortcuts--interactions)
7. [Local Installation & Development](#-local-installation--development)
8. [Firebase Hosting & Deployment](#-firebase-hosting--deployment)
9. [License](#-license)

---

## ⚡ Quick Start

Try the application live in your browser right now:
👉 **[https://spacefx.web.app](https://spacefx.web.app)**

Want to run the project locally on your machine?
```bash
# 1. Clone the repository
git clone https://github.com/slashbot28/SPACEFX.git

# 2. Navigate to project directory
cd SPACEFX

# 3. Start the built-in HTTP server (no npm install required!)
node server.js

# 4. Open in your browser:
# http://localhost:3000
```

---

## 🖥️ Interface & Navigation

The SPACEFX interface is organized into three intuitive areas:

```
┌─────────────────┬───────────────────────────────────┬─────────────────┐
│  EFFECTS LIST   │        INTERACTIVE STAGE          │    SETTINGS     │
│ (Left Sidebar)  │         (Central Canvas)          │  (Right Panel)  │
│                 │                                   │                 │
│ • 15 Categories │ • Live WebGL / Canvas Rendering   │ • Sliders       │
│ • Live Search   │ • Full mouse/touch interactivity  │ • Text Inputs   │
│ • 47 Effects    │ • Audio-reactive shockwaves       │ • Color Pickers │
│ • Quick Filters │ • Double-click = Zen / Fullscreen │ • 🎲 Themes     │
│                 │                                   │ • 💾 Exporters  │
└─────────────────┴───────────────────────────────────┴─────────────────┘
```

1. **Left Sidebar:** Browse through 15 categories or use the instant search filter to locate any effect in milliseconds.
2. **Central Stage:** The interactive live viewport. Drag your cursor to orbit 3D cameras, pluck acoustic strings, tear cloth, or displace fluid particles.
3. **Right Settings Panel:**
   - **Color Palettes Bar (Top):** Switch entire color schemes with one click.
   - **Dynamic Sliders & Controls:** Fine-tune speed, symmetry, petal count, damping, particle count, and glow colors.
   - **Text Inputs:** Customize headlines, subtitles, mantras, and quotes rendered directly inside the animations.
   - **Export Buttons:** Instant copy-paste code snippets, file downloads, or CodePen links.

---

## ✍️ Custom Text, Names & Typography

Several centerpiece effects allow you to insert custom words, sentences, mantras, or quotes:

| Effect | Settings Field | Visual Behavior |
| :--- | :--- | :--- |
| **Manifold Mandala** | `Mandala Mantra / Text`<br>`Subtitle / Geometry Code` | Floats in the center of non-Euclidean folding geometry with dynamic neon bloom matching your theme colors. |
| **Interactive Strings** | `Text along strings`<br>*(separate with `//`)* | Each vibrating string carries your custom phrase and ripples organically when plucked by the cursor. |
| **Liquid Chrome** | `Engraved Text` | Engraves your text directly into the specular, reflective surface of the metallic mercury fluid sphere. |
| **Phosphorescence** | `Target Word / Name` | Thousands of bioluminescent particles navigate a vector curl field and coalesce into your exact word or name. |
| **SVG Stroke Drawing** | `Custom Text Input` | Real-time stroke path animation that traces your typed text with glowing vector strokes. |
| **Bad TV CRT Distortion**| `CRT Text / Warning` | Distorts and renders your custom retro warning message across cathode-ray scanlines. |
| **Hacker Scrambler** | `Secret Hacker Code` | Matrix-style sequential character decryption that reveals your custom phrase. |

---

## 🎛️ Core Features & User Guide

### 1. 🎵 Audio-Reactivity (Live VJ Mode)
Click the audio icon in the top header to turn SPACEFX into a real-time audio visualizer for parties, DJ sets, or background streams.

* **Option A: Microphone (🎙️):** Click *Enable Microphone* and allow browser audio permissions. Visuals instantly react to your voice, ambient sounds, or music from external speakers.
* **Option B: Built-in 128 BPM Synth Beat (🎧):** No microphone? Activate the built-in electronic synthesizer beat.
* **Audio-Reactive Behavior:**
  - *Warp Drive:* Bass-kicks trigger intense hyperspace speed boosts.
  - *Manifold Mandala:* Kaleidoscopic fold iterations and camera zoom pulse to the kick drum rhythm.
  - *Doom Fire:* Flame heights flare up on volume spikes.
  - *The Matrix Rain:* Digital glyphs flash brighter on high-frequency beats.

### 2. 🎛️ Dual-Layer Composite Studio
Combine two independent effects into a unified layered experience:
1. Click **"🎛️ Dual Layer"** in the top navigation bar.
2. Select a **Background Layer** (e.g., *Warp Drive Starfield* or *The Matrix Digital Rain*).
3. Select a **Foreground Layer** (e.g., *3D Parallax Tilt Card*, *Interactive Strings*, or *Phosphorescence*).
4. Click **"Apply Composite"** to preview them merged in real time.
5. Click **"💾 Download Combined HTML"** to export an all-in-one standalone HTML file containing both layers!

### 3. 🎲 1-Click "Magic Themes" & Randomizer
Located at the top of the settings panel:
- 🟣 **Cyberpunk:** Neon Pink (`#ec4899`), Electric Cyan (`#06b6d4`), Vivid Violet (`#8b5cf6`).
- 🟢 **Matrix:** Phosphor Green (`#22c55e`), Deep Terminal Black.
- 🧛 **Dracula:** Deep Purple, Crimson Red, and Slate Gray.
- 🌅 **Sunset:** Warm Amber, Radiant Gold, and Sunset Orange.
- ❄️ **Nordic:** Ice Blue, Arctic Cyan, and Crisp White.
- 🎲 **Dice Button (Randomizer):** Generates endless mathematically balanced, harmonious color combinations.

### 4. 📺 Zen Screensaver & Auto-Tour Showreel
- **Zen Mode (Fullscreen):** Press the **`Z`** key or double-click the central canvas. All sidebars, navigation bars, and buttons fade out. Perfect for secondary monitor ambient backdrops or living room TV displays. Press `Esc` or `Z` to exit.
- **Auto-Tour (Showreel):** Click the **"Auto-Tour"** button. The studio automatically cycles to the next effect every 10 seconds with smooth crossfades and a sleek progress timer at the top of the screen.

### 5. 💾 1-Click Export, HTML Download & CodePen
Click **"Code & Export"** on any effect to open the export dialog:
- **📋 Copy HTML/CSS/JS:** Copies clean, self-contained source code to your clipboard without external runtime bloat.
- **💾 Download .html:** Immediately downloads a ready-to-run file (e.g., `manifold-mandala.html`) that works offline by simply double-clicking it.
- **🚀 Open in CodePen:** Automatically opens CodePen with your active effect, customized settings, and styling pre-filled and running live!

---

## 🌟 Complete Catalog of All 72 Effects

### 🎵 ShaderToy Audio-Reactive Visualizers (With Real Web Audio Music)
These 10 effects feature native WebGL GLSL fragment raymarching powered by our built-in **Web Audio API procedural music synthesizer** (playing multi-track Synthwave, Ambient, Chillout Lofi, Hypnotic Acid Techno, Ocean Drones, or Live Microphone Input) with an interactive floating canvas HUD:

* **`shadertoy-lunchbreak` — Lunchbreak (Audio-Reactive Raymarching):** Hypnotic raymarched organic architecture and reflective metallic surfaces undulating to bass frequencies (based on nabr's `flGyWc`).
* **`shadertoy-sound-flower` — Sound Flower (Audio Mandala):** Kaleidoscopic sacred geometry mandala with harmonic frequency rings blooming on audio peaks (based on `Xs3GWj`).
* **`shadertoy-neon-tunnel` — Neon Hyperspace Sound Tunnel:** High-speed infinite wireframe neon warp drive tunnel responding to audio energy (based on `MdVXzw`).
* **`shadertoy-tetris-dimension` — The Tetris Dimension (Voxel Glitch Beat):** Surreal cybernetic dimension of falling voxel blocks, grid pulses, and audio-reactive scanlines (based on Hyeve's `NtByzD`).
* **`shadertoy-happy-glow-cruise` — Happy Glow Cruise (Vaporwave Synth Horizon):** Retrowave sun, glowing wireframe grid terrain, and atmospheric mountain ridges with pulsating beats (based on diatribes' `3ccyD7`).
* **`shadertoy-glass-origin` — Glass Origin (Refractive Crystal Core):** Complex internal light caustics, chromatic dispersion, and prismatic refraction inside a floating crystal (based on Frostbyte_'s `scS3Wy`).
* **`shadertoy-fibonacci-zoom` — Extruded Fibonacci Zoom (Golden Spiral Fractal):** Infinite logarithmic spiral architecture zooming smoothly with frequency spectrum feedback (based on Shane's `sfVGDG`).
* **`shadertoy-cave-diving` — Cave Diving (Bioluminescent Sub-surface):** Volumetric organic cave system illuminated by glowing bioluminescent deep-sea flora responding to sub-bass drones (based on Elsio's `XcVyWD`).
* **`shadertoy-grid-attractor` — Grid Attractor (Cybernetic Sound Matrix):** Kinetic dot grid warped by gravity attractors and sound waves with interactive mouse physics (based on takumifukasawa's `43cBzn`).
* **`shadertoy-quantum-pulse` — Quantum Pulse (Plasma Fusion Core):** Blazing plasma energy reactor with solar flares and harmonic shockwaves bursting on bass transients (based on `tfBXzD`).

### 🌌 Liam Egan Signature Series
1. **`manifold-mandala` — Manifold Mandala**
   * *Tech:* WebGL Fragment Raymarching & Non-Euclidean Kaleidoscopic Folding.
   * *Description:* Infinite non-Euclidean fractal mandala inspired by *Manifold Garden* by Liam Egan. Features 3D mouse orbit rotation, 4–16 symmetry petal folding, fractal recursion depth, audio-reactive dimension pulsing, and custom central mantra text.
2. **`interactive-strings` — Strings (Acoustic Pluck & Resonant Text)**
   * *Tech:* Physical Wave Equations & Web Audio API Synthesis.
   * *Description:* Resonant virtual guitar strings. Sweeping your cursor across strings plucks them, producing synthesized acoustic pitches while waving your custom lyric phrases along the vibration path.
3. **`liquid-chrome` — Liquid Chrome (Mercury Fluid)**
   * *Tech:* WebGL Raymarched Metallic Fresnel Specular Sphere.
   * *Description:* A fluid sphere of molten mercury with specular Fresnel reflections, procedural noise distortion, and your custom text engraved onto its metallic surface.
4. **`phosphorescence-flow` — Phosphorescence (Bioluminescent Particle Text)**
   * *Tech:* Vector Field Curl Noise & Typography Coalescence.
   * *Description:* Thousands of luminous bioluminescent particles floating through a curl noise vector field that coalesce to spell your chosen word or name. Includes a scatter & reform trigger button.

---

### 🕹️ Legendary Physics & Shaders
5. **`tearable-cloth` — Tearable Cloth (Verlet Physics)**
   * *Interaction:* **Left-click and drag** to tug and stretch the cloth fabric. **Right-click and drag** (or Shift + drag) to slice and cut the cloth into shreds!
6. **`ascii-art` — ASCII Video / Matrix Shader**
   * *Description:* Converts live 3D geometry and motion into real-time monospace ASCII characters (`@%#*+=-:. `).
7. **`synthwave-grid` — 80s Outrun Synthwave Grid**
   * *Description:* An endless retro 3D neon floor grid moving toward a glowing horizon sun with vintage vector blinders.
8. **`boids-flock` — Boids Flocking Physics**
   * *Description:* Craig Reynolds autonomous flocking simulation governed by separation, alignment, and cohesion physics with predator mouse avoidance.

---

### 🌌 Background Visuals
9. **`warp-drive` — Warp Drive Starfield:** Hyperspace star travel simulation with adjustable star density, acceleration, and bass-kick hyperspace bursts.
10. **`particles-bg` — Floating Particles Mesh:** Connected vector nodes with interactive cursor repulsion and dynamic links.
11. **`sparticles` — Sparticles Floating Shapes:** Floating geometric particles, bokeh discs, and ambient confetti.
12. **`jquery-ripples` — WebGL Water Ripples:** Interactive water surface with realistic light refraction and mouse drop disturbances.
13. **`morphing-svg` — Morphing SVG Blobs:** Smooth organic morphing gradient blobs.
14. **`fixed-bg` — Parallax Background Sections:** Multi-depth layout scrolling simulation.

---

### 🖱️ Mouse & Cursor Effects
15. **`mouse-particles` — Mouse Particle Sparkles:** Sparkling particle trails trailing the user's cursor.
16. **`image-trail` — Mouse Image Trail:** A floating sequence of images that follows mouse velocity.
17. **`cursor-trail` — Neon Fairy Cursor Trail:** Fluid neon cursor trails with glow falloff.
18. **`magnetic-hover` — Magnetic Button Attraction:** Interactive UI elements magnetically drawn toward the mouse.

---

### 🎲 CSS 3D Transforms
19. **`react-tilt` — 3D Parallax Tilt Card:** Photorealistic 3D tilt with specular glare and custom card typography.
20. **`css-cube` — Interactive 3D CSS Cube:** Smooth 3D rotating isometric cube.
21. **`3d-sphere-tags` — 3D Sphere Tag Cloud:** Spherical rotating tag cloud in 3D coordinate space.
22. **`makisu-dropdown` — 3D Origami Unfold:** Dimensional folding 3D banner animations.

---

### 🖼️ Images & Transitions
23. **`ken-burns` — Ken Burns Cinema Zoom:** Cinematic pan and slow-zoom camera motion over photography.
24. **`heatwave-haze` — Heatwave Distortion Haze:** High-temperature atmospheric mirage distortion shader.
25. **`cyber-glitch` — Cyber Glitch Transition:** RGB chromatic aberration and digital noise slicing.
26. **`dissolve-transition` — Canvas Dissolve Wipe:** 2D pixel dissolve screen transition.

---

### 🌧️ Rain, Snow & Weather
27. **`rain-canvas` — Realistic Rain Storm:** Downward rain particle vectors with surface splash physics.
28. **`snow-canvas` — Winter Snowstorm:** Ambient snowflakes drifting with dynamic horizontal wind currents.
29. **`rain-on-glass` — Raindrops on Window Glass:** Condensation droplets merging and sliding down glass panes.

---

### 🔊 Audio & Waveform Visualizers
30. **`audio-spectrum` — Audio Spectrum Bars:** Multi-band frequency visualizer bars.
31. **`audio-waveform` — Oscilloscope Waveform:** Smooth real-time audio oscilloscope curve.
32. **`audio-circle` — Circular Audio Pulse:** Radial frequency burst visualizer.

---

### 📐 SVG & Typography
33. **`svg-path-draw` — Dynamic SVG Stroke Path:** Real-time path tracing of custom typed text.
34. **`svg-letter-animation` — Fancy Letter Waves:** Playful typographic letter ripple animations.
35. **`hacker-scrambler` — Hacker Text Scrambler:** Character-by-character decryption scrambler for custom messages.

---

### 👾 Special & Retro Shaders
36. **`matrix-rain` — The Matrix Digital Rain:** Falling phosphor-green Katakana and hexadecimal code streams.
37. **`doom-fire` — Classic PSX Doom Fire:** The legendary 1993 Doom fire algorithm ported to JavaScript.
38. **`bad-tv-crt` — Bad TV CRT Distortion:** CRT scanlines, horizontal distortion, and customizable screen warnings.
39. **`fireworks-sound` — Sound-Driven Fireworks:** Particle explosions accompanied by synthesized firework pops.
40. **`frosted-glass` — Frosted Glass Acrylic:** Modern macOS/iOS glassmorphism acrylic blur.
41. **`starry-night` — Starry Night Canvas:** Calm twilight night sky with twinkling distant stars.
42. **`webcam-mesh` — Real-Time Webcam Visualizer:** Interactive mesh rendering from your webcam stream.
43. **`loading-effects` — Modern CSS Spinners:** Futuristic sci-fi loaders.
44. **`button-effects` — Liquid Ripple Buttons:** Fluid ripple interactive button triggers.
45. **`water-ripples-2d` — 2D Surface Ripples:** Mathematical surface damping wave grid.
46. **`super-mario` — Pure CSS 8-bit Animation:** Nostalgic retro pixel art animation.
47. **`eye-candy` — Ambient Chromatic Flow:** Calming chromatic ambient color gradients.
48. **`fractalkitty-clock` — there is – such that (Mathematical Clock):** Sophia's (@fractalkitty) poetic animated clock composed via generative vector grammar in p5.js with raven, crow, and magpie time hands.
49. **`jpbelley-vertical-fan` — Vertical Fan (Text Loop Timeline):** JP Belley's rhythmic vertical typography fan with custom word lists and fonts.
50. **`cbolson-two-sides` — Two Sides (Split Screen Mask):** Chris Bolson's bold dual-mask diagonal split typography & icon presentation.
51. **`lurkmoophy-melty-text` — Melty Liquid SVG Text Filter:** Luke Murphy's dripping, melting typography powered by SVG `<feTurbulence>` and `<feDisplacementMap>`.
52. **`amit-spiky-sphere` — Colorful Spiky Sphere 3D:** Amit Sheen's mathematical 3D pulsating spiky sphere built with pure CSS keyframes.
53. **`blackstar-wave-text` — Customizable Wave Text Path:** BlackStar1991's undulating sine-wave typography along an animated SVG path.
54. **`ccrch-white-stripes` — The White Stripes Canvas Waves:** ccrch's dynamic oscilloscope-style rock aesthetic canvas sine wave flow.
55. **`hollandblumer-shuffle-grid` — 3D Double-Bend Card Shuffle:** Holland Blumer's dynamic card deck bridge shuffling seamlessly into a photo grid.
56. **`shubniggurath-gradient-drift` — Gradient Drift (WebGL Fluid):** shubniggurath's luxurious chromatic fluid gradient simulation on GPU.
57. **`jdillon-neon-radio` — Glitchy Cyberpunk Neon Radio Switches:** J Dillon's glowing neon radio controls with electric sparks and GSAP micro-glitches.
58. **`prisoner849-ephemeral-flower` — Ephemeral Flower #2 (Three.js):** Paul West's procedural parametric flower with custom vertex shader displacement.
59. **`daniel-munoz-infinite-gallery` — Infinite Cylinder Media Gallery:** Daniel Muñoz's 3D rotating cylinder roll gallery with smooth inertia scroll in Three.js.
60. **`amit-infinite-roll` — Infinite Roll (Pure CSS 3D Typography):** Amit Sheen's continuous 3D rolling letter ribbon over a specular mirror floor.
61. **`yukiloz7-glsl-sample027` — GLSL Sample027 (Shader Raymarch):** Yuki's Signed Distance Function (SDF) raymarching shader with chromatic bloom.
62. **`yukiloz7-threejs-generative` — Three.js Generative Art:** Yuki's parametric 3D wireframe geometric crystal lattice.

---

## ⌨️ Keyboard Shortcuts & Interactions

| Key / Action | Result |
| :--- | :--- |
| **`Z`** | Toggle **Zen Mode (Fullscreen)** on/off. |
| **Double-click Canvas** | Toggle Zen Mode on/off. |
| **`Esc`** | Close open modals or exit Zen Mode. |
| **Left Click + Drag** | Rotate 3D scenes, pluck strings, or displace particles. |
| **Right Click + Drag** | **Cut and slice cloth fabric** in *Tearable Cloth*. |
| **Move Mouse over Strings**| **Pluck acoustic strings** and generate synthesizer tones in *Interactive Strings*. |

---

## 💻 Local Installation & Development

### Prerequisites
- [Node.js](https://nodejs.org/) (version 14 or later).
- Any modern web browser with WebGL and Web Audio API support (Chrome, Edge, Firefox, Safari, Brave).

### Project Architecture
```
SPACEFX/
├── index.html              # Main application shell & interactive studio
├── server.js               # Zero-dependency local Node.js static server
├── firebase.json           # Firebase Hosting configuration
├── .firebaserc             # Firebase multi-site targets & project ID
├── css/
│   ├── styles.css          # Studio interface, modals, navigation & theming
│   └── effects.css         # CSS-based animations & 3D styling
└── js/
    ├── app.js              # Core UI logic, search, themes, export & showreel
    ├── audio-reactive.js   # Web Audio analyser engine (microphone & synth beat)
    └── effects/            # Modular effect registries
        ├── liam_egan.js        # Manifold Mandala, Strings, Liquid Chrome, Phosphorescence
        ├── extra_legendary.js  # Tearable Cloth, ASCII Art, Synthwave Grid, Boids
        ├── backgrounds.js      # Warp Drive, Matrix Rain, Canvas Particles
        ├── mouse.js            # Interactive cursors, ripples, trails
        ├── css3d.js            # 3D transforms, Parallax tilt, 3D cubes
        ├── image.js            # Ken Burns, Heatwave Haze, Distortion
        ├── transition.js       # Cyber Glitch, Dissolve transitions
        ├── rain_snow.js        # Winter Snowstorm, Rain on Glass
        ├── audio.js            # Audio visualizer spectrums & wave circles
        ├── svg.js              # Dynamic SVG text path drawing
        ├── fireworks.js        # Sound-driven fireworks simulation
        ├── special.js          # Bad TV CRT shader, Doom Fire, Hacker Text
        ├── liam_egan.js        # Liam Egan shaders, Fluid raymarch, Aurora
        └── fractalkitty.js     # Sophia's "there is – such that" generative clock
```

---

## ☁️ Firebase Hosting & Deployment

The application is deployed to **Google Firebase Hosting**.

To deploy updates yourself:
```bash
# 1. Install Firebase CLI globally (one time)
npm install -g firebase-tools

# 2. Log in with your Google account
firebase login

# 3. Deploy hosting assets
firebase deploy --only hosting
```

Live hosting endpoint: [https://spacefx.web.app](https://spacefx.web.app).

---

## 📄 License

This project is licensed under the **[MIT License](LICENSE)**.
You are free to use, modify, and integrate these effects into your own personal and commercial projects!
