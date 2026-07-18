# Portfolio

Single-page personal portfolio. Vite + React, Tailwind CSS, Framer Motion,
lucide-react icons — glassmorphism design system.

## Getting started

```bash
npm install
npm run dev
```

Dev server prints a local URL (default `http://localhost:5173`).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
- `npm run format` — format the project with Prettier
- `npm run format:check` — check formatting without writing

## Project structure

```
src/
  components/   reusable UI: GlassCard, Button, Navbar, SectionWrapper, BlueRedPurpleReveal
  sections/     Hero, About, Skills, Projects, Contact
  assets/       images/icons
  index.css     Tailwind entry + theme tokens + global styles
```

## Design system

- Base background: dark navy `#0A0E1A`
- Accent colors (Tailwind theme, `src/index.css` `@theme` block): `accent-blue`
  `#2E6BFF`, `accent-red` `#E63946`, `accent-purple` `#A855F7`, `accent-green`
  `#39FF14` (terminal/code accents — Hero name, PixelTransition, About)
- `<GlassCard glow="blue|red|purple" hoverScale>` — the base glass surface
  used everywhere. `glow` tints the border/shadow on hover, `hoverScale`
  lifts + scales the card slightly.

To re-skin the site, edit the `@theme` block at the top of `src/index.css` —
every `accent-*` Tailwind class (`bg-accent-blue`, `border-accent-red/50`,
etc.) follows from those tokens.

## Notes

- No router — one page, sections linked via smooth-scroll anchors in `Navbar`.
- `BlueRedPurpleReveal.jsx` is an intentional stub (wired into `Hero`, no
  logic yet) reserved for a future interactive effect.
