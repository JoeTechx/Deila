# DEILA — DASAYO Entrepreneurship Innovation Leadership Academy

<div align="center">

![DEILA](https://img.shields.io/badge/DEILA-Leadership%20Academy-D4AF37?style=for-the-badge&labelColor=000000)
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)

**Developing People. Building Leaders. Inspiring Innovation. Creating Impact.**

*One Vision. Many Gifts. Multiple Functions. One Movement. Limitless Impact.*

</div>

---

## 🌟 Overview

The official website for **DEILA** (DASAYO Entrepreneurship Innovation Leadership Academy) — a high-performance, dark-themed, single-page landing site built with cutting-edge web technologies. Features an interactive 3D Three.js experience, dynamic camera poses tied to scroll depth, Framer Motion choreography, and a bold typographic design system inspired by top-tier modern agency platforms.

---

## 🚀 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16 (App Router + Turbopack) | React Framework & SSR/SSG |
| **TypeScript** | ^5 | Strict type safety |
| **Tailwind CSS** | v4 | Modern utility-first styling |
| **Framer Motion** | latest | Fluid scroll & entrance choreographies |
| **Three.js** | r160+ | Interactive 3D logo & background scene |
| **Lucide React** | latest | Clean SVG iconography |

---

## 💫 Interactive & 3D Features (v2 Update)

The website features an integrated 3D logo centerpiece and continuous scroll choreography:

- **Preloader:** Synchronized initial reveal that signals the 3D scene to fly in once ready.
- **SceneBackground (Three.js):** 3D extruded DEILA emblem rendered with realistic gold materials, metallic reflections (PMREM Environment), dual lighting, floating particle halos, and section-specific camera poses (`POSES` mapped to `data-scene` elements).
- **Navbar:** Drops in post-preloader, auto-hides on downward scroll, reveals on upward scroll, includes an interactive sliding gold indicator tracking the active section, and displays a top scroll-progress bar.
- **Hero Section:** Masked word-by-word staggered reveal animation with 3D logo positioning.
- **Stats Bar:** Tilted gold marquee ribbon with animated count-up metrics.
- **About Section:** Dynamic slide-in headlines paired with 3D-tilt glassmorphism cards.
- **What We Do (Horizontal Scroll):** Pinned section where vertical page scroll drives horizontal card track exploration with 3D entrance rotations.
- **Vision & Mission:** Progressive word illumination matching scroll progress, with closing text streams sliding in opposing directions.
- **Philosophy:** Sticky stacked deck card presentation with subtle depth-layering.
- **Approach:** Interactive timeline where a drawing gold beam illuminates each core commitment.
- **Join Us:** Interactive cursor spotlight, 3D character flips, magnetic CTA button, and celebratory gold burst upon submission.
- **Footer (Curtain Reveal):** Pin-reveal transition where the footer rises over the scene, featuring cascading links, an illuminated giant wordmark, and smooth back-to-top navigation.

---

## 🎨 Design System

### Colour Palette
| Token | Hex | Usage |
|---|---|---|
| `Gold` | `#D4AF37` | Primary accent, CTAs, metallic highlights |
| `Gold Light` | `#F0D060` | Hover states, glowing gradients |
| `Black` | `#000000` | Primary dark background |
| `Dark 100` | `#0a0a0a` | Section backgrounds |
| `Dark 200` | `#111111` | Card backgrounds |
| `White` | `#ffffff` | Primary text |

### Typography
- **Font:** Inter (Google Fonts) with variable font support
- **Headline style:** Ultra-bold (`font-black`), tight tracking (`tracking-tighter`)
- **Text gradient:** Gold `#D4AF37` → `#F0D060` → `#D4AF37` on key headings

---

## 🏗️ Project Structure

```
Deila/
├── app/
│   ├── favicon.ico        # Academy brand favicon
│   ├── globals.css        # Tailwind v4 configuration & base styles
│   ├── layout.tsx         # Root layout, Inter font, SEO metadata
│   └── page.tsx           # Main page orchestrating 3D scene & sections
├── components/
│   ├── AboutSection.tsx         # About narrative with 3D-tilt card
│   ├── ApproachSection.tsx      # Interactive progress timeline
│   ├── Footer.tsx               # Curtain-reveal footer & back-to-top
│   ├── HeroSection.tsx          # Hero header & word reveal
│   ├── JoinSection.tsx          # Spotlight CTA & interactive form
│   ├── Navbar.tsx               # Dynamic floating navbar with active pills
│   ├── PhilosophySection.tsx    # Stacked deck card layout
│   ├── Preloader.tsx            # Initial load choreography & scene trigger
│   ├── Reveal.tsx               # Reusable directional motion wrapper
│   ├── SceneBackground.tsx      # Three.js 3D emblem scene & pose controller
│   ├── StatsBar.tsx             # Marquee ribbon & animated counters
│   ├── TiltCard.tsx             # Interactive 3D tilt hover effect
│   ├── VisionMissionSection.tsx # Word-by-word scroll highlighting
│   └── WhatWeDoSection.tsx      # Pinned horizontal focus area cards
├── lib/
│   └── logoPaths.ts             # SVG path geometry definitions for 3D extrusion
├── public/                      # Static assets & brand graphics
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── package.json
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/JoeTechx/Deila.git
cd Deila

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🌍 About DEILA

**DEILA** is the DASAYO Entrepreneurship Innovation Leadership Academy — an institution dedicated to bridging the gap between knowledge and practical application.

### Vision
> *"To become a leading institution for entrepreneurship, innovation, leadership development, and human-capacity building, raising individuals and leaders who transform ideas, businesses, communities, and society."*

### Mission
> *"To provide accessible learning platforms, practical training, mentorship, networking opportunities, and developmental initiatives that equip individuals with the knowledge, skills, values, and capacity to achieve personal excellence, entrepreneurial success, effective leadership, and meaningful societal impact."*

### 7 Focus Areas
1. 🎯 Leadership Development and Capacity Building
2. 💼 Entrepreneurship and Business Development
3. 💡 Innovation, Research and Knowledge Development
4. 📚 Professional and Personal Development
5. 🤝 Mentorship, Networking and Collaboration
6. ❤️ Community Development and Humanitarian Impact
7. 🌐 Digital Learning and Knowledge Sharing

### Philosophy Pillars
- **Knowledge** should produce *Competence*
- **Leadership** should produce *Service*
- **Entrepreneurship** should create *Opportunities*
- **Innovation** should solve *Problems*
- **Collaboration** should multiply *Results*
- **Development** should produce *Measurable Impact*

---

## 📜 License

© 2026 DEILA — DASAYO Entrepreneurship Innovation Leadership Academy. All rights reserved.
