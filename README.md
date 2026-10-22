# 🌌 SPACEFX — Volledige Handleiding & Web Visuals Studio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-spacefx.web.app-blueviolet?style=for-the-badge&logo=firebase)](https://spacefx.web.app)
[![GitHub stars](https://img.shields.io/github/stars/slashbot28/SPACEFX?style=for-the-badge)](https://github.com/slashbot28/SPACEFX)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **SPACEFX** is een interactieve studio en bibliotheek van **47+ visuele webeffecten**, WebGL fragment shaders, fysica-simulaties, audio-reactieve visualizers en dynamische animaties. 
> Alles draait op pure Vanilla JavaScript (geen frameworks of npm runtime dependencies) en kan met één klik worden aangepast, geëxporteerd als standalone HTML, gedownload of geopend in CodePen.

* 🌐 **Live Productie URL:** [https://spacefx.web.app](https://spacefx.web.app) *(of [https://spacefx.firebaseapp.com](https://spacefx.firebaseapp.com))*
* 🐙 **GitHub Repository:** [https://github.com/slashbot28/SPACEFX](https://github.com/slashbot28/SPACEFX)
* 💻 **Lokale Server:** `http://localhost:3000`

---

## 📖 Inhoudsopgave

1. [Snelstart](#-snelstart)
2. [Interface & Navigatie](#-interface--navigatie)
3. [Tekst- & Mantra-Aanpassing](#-tekst--en-mantra-aanpassing)
4. [Handleiding: De 5 Hoofdfuncties](#-handleiding-de-5-hoofdfuncties)
   - [1. 🎵 Audio-Reactiviteit (Live VJ Mode)](#1--audio-reactiviteit-live-vj-mode)
   - [2. 🎛️ Dual-Layer Composite Studio](#2-️-dual-layer-composite-studio)
   - [3. 🎲 1-Klik Kleurpaletten & Randomizer](#3--1-klik-kleurpaletten--randomizer)
   - [4. 📺 Zen Screensaver & Auto-Tour Showreel](#4--zen-screensaver--auto-tour-showreel)
   - [5. 💾 Export, HTML Download & CodePen](#5--export-html-download--codepen)
5. [Overzicht van alle 47 Effecten](#-overzicht-van-alle-47-effecten)
   - [Liam Egan Signature Serie](#-liam-egan-signature-serie)
   - [Legendarische Fysica & Shaders](#-legendarische-fysica--shaders)
   - [Achtergrond Decoratie](#-achtergrond-decoratie)
   - [Muis & Cursor Effecten](#-muis--cursor-effecten)
   - [CSS 3D Effecten](#-css-3d-effecten)
   - [Afbeelding & Transities](#-afbeelding--transities)
   - [Regen, Sneeuw & Natuur](#-regen-sneeuw--natuur)
   - [Audio & Visualizers](#-audio--visualizers)
   - [SVG & Typografie](#-svg--typografie)
   - [Special & Retro Shaders](#-special--retro-shaders)
6. [Sneltoetsen & Interactietips](#-sneltoetsen--interactietips)
7. [Lokale Installatie & Development](#-lokale-installatie--development)
8. [Firebase Hosting & Deployment](#-firebase-hosting--deployment)
9. [Licentie](#-licentie)

---

## ⚡ Snelstart

Open direct de live webapplicatie via:
👉 **[https://spacefx.web.app](https://spacefx.web.app)**

Wil je het project liever lokaal op je computer draaien?
```bash
# 1. Clone de repository
git clone https://github.com/slashbot28/SPACEFX.git

# 2. Ga naar de projectmap
cd SPACEFX

# 3. Start de lokale server (geen npm install vereist!)
node server.js

# 4. Open in je browser:
# http://localhost:3000
```

---

## 🖥️ Interface & Navigatie

De interface van SPACEFX is opgebouwd uit drie zones:

```
┌─────────────────┬───────────────────────────────────┬─────────────────┐
│  EFFECTEN LIJST │        INTERACTIEVE STAGE         │  INSTELLINGEN   │
│  (Sidebar Links)│         (Centraal Canvas)         │  (Paneel Rechts)│
│                 │                                   │                 │
│  • 15 Categorieën│  • Live WebGL / Canvas weergave   │  • Sliders      │
│  • Zoekbalk     │  • Volledig interactief met muis  │  • Tekstvelden  │
│  • 47 Effecten  │  • Audio reactieve schokgolven    │  • Kleurkiezers │
│  • Quick filter │  • Dubbelklik = Zen / Fullscreen  │  • 🎲 Paletten  │
│                 │                                   │  • 💾 Exporteer │
└─────────────────┴───────────────────────────────────┴─────────────────┘
```

1. **Sidebar (Links):** Blader door de 15 categorieën of gebruik het zoekveld om binnen milliseconden een effect te vinden.
2. **Stage (Midden):** De live rendering-omgeving. Hier kun je met je cursor slepen, snaren tokkelen, vloeistoffen manipuleren of stoffen scheuren.
3. **Instellingenpaneel (Rechts):**
   - **Kleurpaletten balk (bovenaan):** Pas met 1 klik het hele kleurenschema aan.
   - **Dynamische controls:** Parameters zoals snelheid, symmetrie, deeltjesdichtheid en demping.
   - **Tekstinputs:** Wijzig teksten, namen en mantra's die in de animaties zijn verwerkt.
   - **Export-knoppen:** Krijg direct toegang tot de HTML/CSS/JS broncode.

---

## ✍️ Tekst- en Mantra-Aanpassing

Verschillende effecten in SPACEFX laten je eigen woorden, zinnen en quotes integreren:

| Effect | Invoerveld in Instellingen | Wat er gebeurt |
| :--- | :--- | :--- |
| **Manifold Mandala** | `Mandala Mantra / Tekst`<br>`Ondertitel / Geometrie Code` | Zweeft in het non-Euclidische centrum met dynamische neon bloom en spiegeling. |
| **Interactive Strings** | `Tekst langs de snaren`<br>*(scheid met `//`)* | De tekst beweegt en buigt realistisch mee met elke snaar die je met de muis tokkelt. |
| **Liquid Chrome** | `Gegraveerde Tekst` | De letters worden gegraveerd in het reflecterende vloeibare kwikzilver. |
| **Phosphorescence** | `Woord / Naam in Deeltjes` | Duizenden bioluminescente deeltjes stromen samen om jouw woord te vormen. |
| **SVG Stroke Drawing** | `Aangepaste Tekst Invoer` | Tekent jouw naam of quote live als vloeiende geanimeerde vectorlijnen. |
| **Bad TV CRT Distortion**| `CRT Tekst / Waarschuwing` | Geeft retro televisielijnen en scanline-vervormingen aan jouw eigen waarschuwing. |
| **Hacker Scrambler** | `Secret Hacker Code` | Matrix-achtige karakterdecryptie die jouw zin letter voor letter decodeert. |

---

## 🎛️ Handleiding: De 5 Hoofdfuncties

### 1. 🎵 Audio-Reactiviteit (Live VJ Mode)
Met de audio-knop in de navigatiebalk verander je SPACEFX in een dynamische visualizer voor feesten, livestreams of presentaties.

* **Optie A: Microfoon (🎙️):** Klik op *Microfoon Inschakelen* en geef de browser toestemming. De visuals reageren op je stem, omgevingsgeluid of muziek uit je speakers.
* **Optie B: Ingebouwde Synth Beat (🎧):** Geen microfoon bij de hand? Activeer de ingebouwde 128 BPM elektronische synthesizer beat.
* **Hoe effecten reageren:**
  - *Warp Drive:* Bass-kicks ontketenen een hyperdrive acceleratie.
  - *Manifold Mandala:* De non-Euclidische vouwingen en zoom pulseren op het ritme van de kick.
  - *Doom Fire:* Vlammen schieten hoger op bij volumepieken.
  - *The Matrix Rain:* Symbolen flitsen feller op bij hoge frequenties.

### 2. 🎛️ Dual-Layer Composite Studio
Combineer twee effecten tot één gelaagde compositie:
1. Klik rechtsboven op **"🎛️ Dual Layer"**.
2. Selecteer een **Achtergrondeffect** (bijv. *Warp Drive Starfield* of *Matrix Digital Rain*).
3. Selecteer een **Voorgrondeffect** (bijv. *3D Parallax Tilt Card*, *Interactive Strings* of *Phosphorescence*).
4. Klik op **"Compositie Toepassen"**.
5. Klik op **"💾 Download Gecombineerde HTML"** om een zelfstandig bestand te genereren waarin beide effecten gecombineerd zijn!

### 3. 🎲 1-Klik Kleurpaletten & Randomizer
Bovenaan het instellingenpaneel vind je de themaknoppen:
- 🟣 **Cyberpunk:** Neonroze (`#ec4899`), cyaan (`#06b6d4`), violet (`#8b5cf6`).
- 🟢 **Matrix:** Fosforgroen (`#22c55e`), diepzwart terminal design.
- 🧛 **Dracula:** Dieppaars, crimson rood en slate gray.
- 🌅 **Sunset:** Warm amber, goud en zonsondergang oranje.
- ❄️ **Nordic:** IJsblauw, poolcyaan en fris wit.
- 🎲 **Dobbelsteen (Randomizer):** Genereert onbeperkt nieuwe harmonische kleurenpaletten.

### 4. 📺 Zen Screensaver & Auto-Tour Showreel
- **Zen Modus (Fullscreen):** Druk op de toets **`Z`** of dubbelklik op het canvas. Alle menu's, knoppen en zijpanelen vervagen. Ideaal als screensaver op een tweede scherm. Druk op `Esc` of `Z` om terug te keren.
- **Auto-Tour (Showreel):** Klik op de **"Auto-Tour"** knop. De app fietst automatisch elke 10 seconden naar het volgende effect met een vloeiende overgang en toont een subtiele timerbalk bovenaan.

### 5. 💾 Export, HTML Download & CodePen
Klik op **"Code & Export"** om de export-modal te openen:
- **📋 Kopieer HTML/CSS/JS:** Krijg de schone source code direct op je klembord.
- **💾 Download .html:** Downloadt direct een gereed bestand (bijv. `manifold-mandala.html`) dat je zonder installatie offline kunt dubbelklikken.
- **🚀 Open in CodePen:** Opent een nieuw venster op CodePen met jouw geselecteerde effect en instellingen kant-en-klaar ingevuld!

---

## 🌟 Overzicht van alle 47 Effecten

### 🌌 Liam Egan Signature Serie
1. **`manifold-mandala` — Manifold Mandala**
   * *Technologie:* WebGL Fragment Raymarching & Kaleidoscopic Folding.
   * *Beschrijving:* Oneindige non-Euclidische fractale mandala geïnspireerd op Manifold Garden. Met interactieve 3D camerahoek, instelbare symmetrie (4–16 petals), fractale iteratiediepte en jouw eigen mantra in het oplichtende centrum.
2. **`interactive-strings` — Strings (Acoustic Pluck & Resonant Text)**
   * *Technologie:* Fysische golfvergelijkingen & Web Audio API synthese.
   * *Beschrijving:* Virtuele gitaarsnaren die vibreren wanneer je eroverheen veegt met de cursor. Brengt echte harmonische akoestische tonen voort en laat jouw eigen tekstgolven over de snaren dansen.
3. **`liquid-chrome` — Liquid Chrome (Mercury Fluid)**
   * *Technologie:* WebGL Raymarched Metallic Fresnel Specular Sphere.
   * *Beschrijving:* Een vloeibare bol van reflecterend kwikzilver met Fresnel-reflecties en jouw gegraveerde tekst in het metaaloppervlak.
4. **`phosphorescence-flow` — Phosphorescence (Bioluminescent Particle Text)**
   * *Technologie:* Vector Field Curl Noise & Typography Coalescence.
   * *Beschrijving:* Duizenden bioluminescente deeltjes zweven door een vectorveld en smelten samen om jouw eigen woord of naam te vormen. Bevat een knop om de deeltjes te verstrooien en opnieuw te laten samensmelten.

---

### 🕹️ Legendarische Fysica & Shaders
5. **`tearable-cloth` — Tearable Cloth (3D Doek Scheuren)**
   * *Interactie:* Sleep met de **linkermuisknop** om aan de stof te trekken. Sleep met de **rechtermuisknop** (of Shift + sleep) om de stof in stukken te snijden!
6. **`ascii-art` — ASCII Video / Matrix Shader**
   * *Beschrijving:* Zet live 3D geometrie en beelden realtime om naar monospace ASCII-karakters (`@%#*+=-:. `).
7. **`synthwave-grid` — 80s Outrun Synthwave Grid**
   * *Beschrijving:* Een oneindig rollende 3D neon rastervloer met een ondergaande vectorzon en retro horizonlijnen.
8. **`boids-flock` — Boids Flocking Physics**
   * *Beschrijving:* Craig Reynolds autonome zwermintelligentie van honderden deeltjes die elkaar volgen en je muis ontwijken.

---

### 🌌 Achtergrond Decoratie
9. **`warp-drive` — Warp Drive Starfield:** Hyperspace sterrenveld met instelbare snelheid, diepte en audio-reactieve hyperspace bursts.
10. **`particles-bg` — Floating Particles Mesh:** Verbindende vectordeeltjes met interactieve muis-afstoting.
11. **`sparticles` — Sparticles Floating Shapes:** Kleurrijke zwevende vormen en confettistromen.
12. **`jquery-ripples` — WebGL Water Ripples:** Realistische waterrimpels die reageren op muisbewegingen en klikken.
13. **`morphing-svg` — Morphing SVG Blobs:** Vloeiende organische SVG-vormen met kleurverlopen.
14. **`fixed-bg` — Parallax Background Sections:** Diepte-effecten voor webpagina achtergronden.

---

### 🖱️ Muis & Cursor Effecten
15. **`mouse-particles` — Mouse Particle Sparkles:** Fonkelende deeltjessporen die de muiscursor volgen.
16. **`image-trail` — Mouse Image Trail:** Een reeks afbeeldingen die dynamisch achter de cursor aan zweeft.
17. **`cursor-trail` — Neon Fairy Cursor Trail:** Elegante neon lichtsporen.
18. **`magnetic-hover` — Magnetic Button Attraction:** Knoppen die fysiek naar de muis toe trekken.

---

### 🎲 CSS 3D Effecten
19. **`react-tilt` — 3D Parallax Tilt Card:** Realistische 3D dieptekaart met instelbare glans en jouw eigen tekst.
20. **`css-cube` — Interactive 3D CSS Cube:** 3D kubus die soepel roteert met de muis.
21. **`3d-sphere-tags` — 3D Sphere Tag Cloud:** Een draaiende 3D wereldbol van interactieve tags.
22. **`makisu-dropdown` — 3D Origami Unfold:** 3D uitvouwende banners en menu's.

---

### 🖼️ Afbeelding & Transities
23. **`ken-burns` — Ken Burns Cinema Zoom:** Filmische slow zoom en pan over landschapsbeelden.
24. **`heatwave-haze` — Heatwave Distortion Haze:** Hittegolf-luchtvervorming via WebGL shaders.
25. **`cyber-glitch` — Cyber Glitch Transition:** RGB split en digitale storingen.
26. **`dissolve-transition` — Canvas Dissolve Wipe:** 2D pixel-dissolve effect.

---

### 🌧️ Regen, Sneeuw & Natuur
27. **`rain-canvas` — Realistic Rain Storm:** Neervallende regendruppels met spatten en plassen.
28. **`snow-canvas` — Winter Snowstorm:** Zachte dwarrelende sneeuwvlokken met winddynamica.
29. **`rain-on-glass` — Raindrops on Window Glass:** Condensatie en omlaag glijdende waterdruppels op glas.

---

### 🔊 Audio & Visualizers
30. **`audio-spectrum` — Audio Spectrum Bars:** Klassieke frequentiebalken.
31. **`audio-waveform` — Oscilloscope Waveform:** Vloeiende oscilloscoop golflijnen.
32. **`audio-circle` — Circular Audio Pulse:** Cirkelvormige audio-bursts.

---

### 📐 SVG & Typografie
33. **`svg-path-draw` — Dynamic SVG Stroke Path:** Schrijft ingetypte tekst realtime als vloeiende lijnen.
34. **`svg-letter-animation` — Fancy Letter Waves:** Typografische letteranimaties.
35. **`hacker-scrambler` — Hacker Text Scrambler:** Matrix karakter-decryptie van jouw zinnen.

---

### 👾 Special & Retro Shaders
36. **`matrix-rain` — The Matrix Digital Rain:** Groene vallende katakana- en hex-symbolen.
37. **`doom-fire` — Classic PSX Doom Fire:** De originele vuursimulatie uit Doom (1993).
38. **`bad-tv-crt` — Bad TV CRT Distortion:** Analoge televisielijnen met ruis en vervorming.
39. **`fireworks-sound` — Sound-Driven Fireworks:** Kleurrijk siervuurwerk met knaleffecten.
40. **`frosted-glass` — Frosted Glass Acrylic:** Moderne iOS/macOS stijl glassmorphism blur.
41. **`starry-night` — Starry Night Canvas:** Een rustgevende nachtelijke sterrenhemel.
42. **`webcam-mesh` — Real-Time Webcam Visualizer:** Camerabeeld omgezet in interactieve geometrie.
43. **`loading-effects` — Modern CSS Spinners:** High-tech laadanimaties.
44. **`button-effects` — Liquid Ripple Buttons:** Moderne knopanimaties.
45. **`water-ripples-2d` — 2D Surface Ripples:** Wiskundige rimpelsimulatie.
46. **`super-mario` — Pure CSS 8-bit Animation:** Retro pixelart animaties.
47. **`eye-candy` — Ambient Chromatic Flow:** Rustgevende chromatische kleurstromen.

---

## ⌨️ Sneltoetsen & Interactietips

| Toets / Actie | Functie |
| :--- | :--- |
| **`Z`** | Schakel **Zen Mode (Volledig Scherm)** in of uit. |
| **Dubbelklik op canvas** | Schakel Zen Mode in of uit. |
| **`Esc`** | Sluit modal vensters of verlaat Zen Mode. |
| **Muis Linksklik + Slepen** | Roteer 3D werelden, manipuleer deeltjes of trek aan het doek. |
| **Muis Rechtsklik + Slepen** | **Knip/scheur het doek** in *Tearable Cloth*. |
| **Muis over snaren bewegen** | **Tokkel gitaarsnaren** en speel tonen in *Interactive Strings*. |

---

## 💻 Lokale Installatie & Development

### Vereisten
- [Node.js](https://nodejs.org/) (versie 14 of hoger).
- Een moderne webbrowser met WebGL- en Web Audio API-ondersteuning (Chrome, Edge, Firefox, Safari).

### Projectstructuur
```
SPACEFX/
├── index.html              # Hoofdapplicatie & visual studio
├── server.js               # Lokale ontwikkelingsserver (Node.js)
├── firebase.json           # Firebase Hosting configuratie
├── .firebaserc             # Firebase multi-site instellingen
├── css/
│   ├── styles.css          # Studio interface, modalen, navigatie & theming
│   └── effects.css         # CSS animaties & 3D stijlen
└── js/
    ├── app.js              # Applicatielogica, zoekbalk, presets, export & auto-tour
    ├── audio-reactive.js   # Web Audio analyser engine (microfoon & synth beat)
    └── effects/            # Modulaire effect-definities
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
        └── special.js          # Bad TV CRT shader, Doom Fire, Hacker Text
```

---

## ☁️ Firebase Hosting & Deployment

De app is live gehost via **Google Firebase Hosting**.

Wil je zelf updates deployen naar Firebase?
```bash
# 1. Installeer de Firebase CLI (eenmalig)
npm install -g firebase-tools

# 2. Login met je Google account
firebase login

# 3. Deploy de hosting bestanden
firebase deploy --only hosting
```

---

## 📄 Licentie

Dit project is gepubliceerd onder de **[MIT-licentie](LICENSE)**. 
Je bent vrij om de effecten te gebruiken, aan te passen en te integreren in je eigen persoonlijke en commerciële webprojecten!
