# DEILA — DASAYO Entrepreneurship Innovation Leadership Academy

<div align="center">

![DEILA](https://img.shields.io/badge/DEILA-Leadership%20Academy-D4AF37?style=for-the-badge&labelColor=000000)
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Developing People. Building Leaders. Inspiring Innovation. Creating Impact.**

*One Vision. Many Gifts. Multiple Functions. One Movement. Limitless Impact.*

</div>

---

## 🌟 Overview

The official website for **DEILA** (DASAYO Entrepreneurship Innovation Leadership Academy) — a premium dark-themed, single-page landing site built with cutting-edge web technologies. Features immersive 3D Three.js animations, smooth Framer Motion transitions, and a bold typographic design system inspired by high-end agency websites.

---

## 🚀 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16 (App Router) | Framework |
| **TypeScript** | ^5 | Type safety |
| **Tailwind CSS** | v4 | Styling |
| **Framer Motion** | latest | Animations |
| **Three.js** | latest | 3D graphics |
| **Lucide React** | latest | Icons |

---

## 📄 Pages & Sections

The site is a fully animated single-page experience with 10 sections:

1. **Navbar** — Fixed, transparent → blur-on-scroll, responsive mobile menu
2. **Hero Section** — Full-viewport Three.js particle field + orbiting tori, mouse-parallax camera, word-by-word reveal animation
3. **Stats Bar** — Animated count-up numbers: 7 Focus Areas, 12+ Webinars, 1 Movement, 100% Commitment
4. **About Section** — Two-column layout with floating 3D wireframe octahedron
5. **What We Do** — 7 focus area cards with hover glow effects and border animations
6. **Vision & Mission** — Parallax DEILA watermark background, side-by-side cards
7. **Philosophy** — 6 pillars on a subtle grid background with animated reveal
8. **Approach** — Scrolling parallax marquee text + 7 commitment checklist
9. **Join Us** — Animated concentric rings CTA with email capture form
10. **Footer** — 4-column layout with navigation, social links, and copyright

---

## 🎨 Design System

### Colour Palette
| Token | Hex | Usage |
|---|---|---|
| `Gold` | `#D4AF37` | Primary accent, CTAs, highlights |
| `Gold Light` | `#F0D060` | Hover states |
| `Black` | `#000000` | Primary background |
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
│   ├── globals.css        # Tailwind v4 @theme config + global styles
│   ├── layout.tsx         # Root layout, Inter font, SEO metadata
│   └── page.tsx           # Main page — composes all sections
├── components/
│   ├── Navbar.tsx          # Fixed nav with scroll blur + mobile menu
│   ├── HeroSection.tsx     # Three.js canvas + animated headline
│   ├── StatsBar.tsx        # Animated count-up statistics
│   ├── AboutSection.tsx    # Two-col layout + 3D floating geometry
│   ├── WhatWeDoSection.tsx # 7 focus area cards grid
│   ├── VisionMissionSection.tsx  # Parallax vision & mission cards
│   ├── PhilosophySection.tsx     # 6 philosophy pillars
│   ├── ApproachSection.tsx       # Approach + commitments list
│   ├── JoinSection.tsx           # Email CTA with animated rings
│   └── Footer.tsx                # Footer with links & socials
├── public/                # Static assets
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
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
