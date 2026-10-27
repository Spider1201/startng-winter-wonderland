# ❄️ Whimsical December Winter Wonderland Theme for Start.ng

> An independent, creative seasonal frontend enhancement concept inspired by the publicly accessible [start.ng](https://start.ng/) browser gaming platform and [Stefan Velikov's Christmas Wonder](https://aboutstefan.dev/work/christmas-wonder/).

---

## 🌟 Overview

**Start.ng** is Nigeria and Africa's home for free, community-created browser games (featuring beloved titles like *Danfo Defense*, *Jollof Rush*, *Agege Rush*, and *Ayo Arena*). Its signature brand identity pairs vibrant electric lime (`#d8fd71`), tactile neo-brutalist cards with offset box-shadows, and accessible play-in-browser simplicity.

This project implements a **Whimsical December Winter Wonderland Theme** that:
- Seamlessly activates each year from **December 1 through December 31** based on the user's local calendar date.
- Restores the **standard Start.ng homepage** outside December (e.g. October/November).
- Provides a **Reviewer Preview Mode** accessible via `?winterPreview=1` (or the top interactive controller banner) for testing and demonstrations any time of year.

---

## 🎄 Creative Features & Highlights

### 1. ☃️ Interactive Animated Snowman
Positioned on a sculpted snowdrift in the hero section beside the primary call-to-action:
- **Idle Breathing & Natural Sway**: Organic, subtle floating and tilt animation (`snowman-idle`) with natural eye blinking (`snowman-blink`).
- **Desktop Hover Wave**: Raises his green mitten to wave cheerfully (`snowman-wave-arm`), smiles, and emits gentle sparkles.
- **Click / Tap Delight**:
  - Triggers a playful bounce and jump animation (`snowman-bounce-jump`).
  - Emits an explosive burst of 22 multi-colored snow crystals, glowing lime stars, and sparkles.
  - Displays a comic speech bubble with randomized dialogue celebrating Start.ng games and holiday cheer (starts with: *"Ready, player one? Happy holidays! 🎮☃️"*).
  - Plays an optional synthesized bell chime (using the Web Audio API, zero audio asset dependencies, default muted, toggleable via top banner).
- **Mobile & Touch Friendly**: Features distance-checked tap recognition that never interferes with vertical page scrolling.
- **Accessible**: Full keyboard interaction (`Tab` focusable with Start.ng lime ring, triggerable via `Enter` or `Space` key, `aria-label` and `role="button"`).

### 2. 🌨️ Multi-Depth Falling Snowfall Simulation
- Ultra-performant 60fps HTML5 Canvas component (`SnowfallCanvas.tsx`).
- 3 depth tiers: large soft-focus foreground snowflakes with gentle lime luminescence, crisp midground flakes, and drifting background crystals.
- Natural sinusoidal wind drift physics.
- Strictly `pointer-events: none` — never intercepts clicks on links, game cards, or buttons.
- Fully respects `prefers-reduced-motion: reduce` by freezing animation loops.

### 3. 💡 Twinkling Festive Fairy Lights
- Draped gracefully along the top navigation bar with a natural catenary wire sag curve.
- Softly pulsing glow in curated festive hues: Start.ng electric lime (`#d8fd71`), warm gold (`#ffeaa7`), and frosted ice cyan (`#74b9ff`).
- Interactive micro-delight: clicking individual bulbs makes them gently chime and brighten!

### 4. 🌲 Evergreen Pine Garlands & Snowdrift Landscape
- Custom vector pine needles, frosted tips, and holly berries framing the hero corners.
- Sculpted snowdrift wave base (`WinterHeroMound.tsx`) with miniature pine silhouettes and a glowing warm lantern providing an organic, whimsical transition into the community games section.
- Subtle snow-dusting crest perched atop the primary "Play now" CTA button and Santa hat badge on the `start.ng` logo icon.

### 5. 🕹️ Playable Browser Mini-Game Demo
- Clicking any game card or "Play Mini-Game" opens an authentic in-browser 20-second challenge (*Holiday Catch Challenge*).
- Catch falling holiday tokens, smoky jollof pots, and coins to score points with smooth keyboard/mouse/touch controls.

---

## ⚙️ Seasonal Theme Controller

The seasonal theme logic resides in `src/hooks/useSeasonalTheme.ts`:

| Mode | Condition | Appearance |
| :--- | :--- | :--- |
| **Natural December** | Current local date is Dec 1 – Dec 31 (`month === 11`) | Automatically activates Winter Wonderland |
| **Natural Off-Season** | Current date is Jan 1 – Nov 30 | Standard Start.ng look preserved by default |
| **Reviewer Preview** | URL contains `?winterPreview=1` (or toggle set to "Winter Mode") | Forces December theme for reviews & demos |
| **Normal Force** | URL contains `?winterPreview=0` (or toggle set to "Normal") | Forces Standard theme for side-by-side comparison |

---

## 🚀 Quick Start & Development

### Prerequisites
- Node.js `v18+` or `v20+` or `v22+`
- npm `v9+` or `v10+` or `v11+`

### Installation
```bash
# Clone the repository or navigate to project root
cd startng-winter-wonderland

# Install dependencies
npm install
```

### Run Locally (Dev Server)
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) to see the default homepage.  
Open [http://localhost:5173/?winterPreview=1](http://localhost:5173/?winterPreview=1) to inspect the December Winter Wonderland theme.

### Verification & Production Build
```bash
# Type-check and production bundle build
npm run build

# Run lint checks (oxlint)
npm run lint

# Preview production build locally
npm run preview
```

---

## 📁 Project Architecture

```
startng-winter-wonderland/
├── public/
│   ├── favicon.svg              # Authentic Start.ng lime play logo
│   └── favicon-winter.svg       # Festive edition with mini Santa hat
├── src/
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces for games, themes, particles
│   ├── data/
│   │   └── games.ts             # Authentic community games catalogue and snowman quotes
│   ├── hooks/
│   │   ├── useSeasonalTheme.ts  # Automatic calendar + URL preview controller
│   │   └── useAudioEffects.ts   # Web Audio API synthesized holiday bell chimes
│   ├── components/
│   │   ├── Navigation/
│   │   │   ├── Navbar.tsx       # Brand logo, nav links, theme toggle
│   │   │   └── FairyLights.tsx  # Draped interactive glowing string lights
│   │   ├── Seasonal/
│   │   │   ├── Snowman.tsx      # Interactive SVG snowman character
│   │   │   ├── SnowfallCanvas.tsx # Canvas snowfall simulation
│   │   │   ├── WinterHeroMound.tsx # Sculpted snowdrift transition wave
│   │   │   ├── PineGarland.tsx  # Corner pine & holly berry accents
│   │   │   └── FestiveBanner.tsx # Top reviewer switcher banner
│   │   ├── Hero/
│   │   │   └── HeroSection.tsx  # Headline, CTA, integrated snowman stage
│   │   ├── Games/
│   │   │   ├── GameShelf.tsx    # Filter chips and game grid
│   │   │   ├── GameCard.tsx     # Neo-brutalist card with offset shadows
│   │   │   ├── GotwBanner.tsx   # Game of the Week spotlight banner
│   │   │   └── AzGamesList.tsx  # A-Z accordion directory
│   │   ├── Interactive/
│   │   │   └── MiniGameModal.tsx # In-browser playable arcade demo
│   │   └── Content/
│   │       ├── HowItWorks.tsx   # 4-step game creator guide
│   │       ├── AboutSection.tsx # Community FAQ accordion
│   │       └── Footer.tsx       # Standard brand footer
│   ├── styles/
│   │   ├── tokens.css           # Start.ng design tokens & winter variables
│   │   ├── animations.css       # Keyframe animations & reduced-motion queries
│   │   ├── snowman.css          # Snowman layers, scarf flutter, speech bubble
│   │   ├── hero.css             # Hero layout and button snow crest
│   │   └── games.css            # Game cards, GOTW, and category styling
│   ├── App.tsx                  # Root app orchestrating layout & state
│   ├── index.css                # Master styling & Google Fonts import
│   └── main.tsx                 # Entry point
├── index.html                   # SEO tags, preconnects, title
├── package.json                 # Dependencies & scripts
└── tsconfig.json                # TypeScript configuration
```

---

## 🌐 Deployment to Vercel

This repository is ready for immediate deployment on [Vercel](https://vercel.com/):
1. Push to your GitHub repository.
2. In the Vercel dashboard, click **"Add New Project"** and select the repository.
3. Framework Preset: **Vite** (auto-detected).
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**!
