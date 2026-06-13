# JE Football Training — Cinematic Experience

An interactive, story-driven rebuild of [jefootballtraining.com](https://jefootballtraining.com)
that plays like a sports film: the screen opens in darkness, stadium
floodlights ignite one by one, and a lone match ball at midfield carries the
visitor through a footballer's development journey —
**Dream → Train → Transform → Perform** — before resolving into a focused
booking moment.

> _"Maximize Your Full Potential."_

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** (brand design system)
- **React Three Fiber** + **drei** (procedural 3D stadium, ball, player, goal)
- **GSAP** (the floodlight ignition / intro timeline)
- **Framer Motion** (scroll-reveal choreography, UI motion)
- **Lenis** (smooth scrolling, drives the scene)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## How the experience works

The homepage is a **single fixed 3D stage** (`components/three/StadiumScene.tsx`)
with the story scrolling over it as HTML chapters. The whole "film" is driven
by **scroll progress (0 → 1)**:

- `lib/experience.ts` — a non-React singleton bridging Lenis scroll + pointer
  into the canvas every frame (the key to steady 60fps).
- `lib/choreography.ts` — the entire timeline as pure math: camera path, ball
  trajectory (midfield → strike → net), player growth, lighting and fog. Tune
  the film here.
- `lib/intro.ts` + `components/intro/IntroProvider.tsx` — the GSAP opening
  sequence (black → 4 floodlights ignite → world revealed → headline earned).
  Honours `prefers-reduced-motion` and offers a Skip control.

Chapters live in `components/story/` (Hero, Dream, Training, Transformation,
Results, Performance, Conversion).

## Content accuracy

`lib/content.ts` is the **single source of truth**, derived from the live site
and verified public profiles. Facts are preserved; **nothing is invented**:

- ✅ **Real:** coach (Jesus Enriquez), tagline, mission language, the four
  development pillars (technical / tactical / physical / mental), audience,
  club affiliations, booking via UpperHand, social links, Bay Area location.
- ⚠️ **Marked placeholders:** testimonials (the live site publishes none) carry
  a visible `Sample` badge and `placeholder: true`. Pricing is intentionally
  routed to the booking platform rather than guessed. Drop real values into
  `lib/content.ts` — no component changes needed.

## 3D assets (procedural now, GLB-ready)

The scene runs with **zero binary assets** using procedural placeholders. To
upgrade, add real models to `public/models/` and flip one flag in
`lib/models.ts` — the camera rig, choreography and animation timeline are
untouched. See [`public/models/README.md`](public/models/README.md).

## Performance

- The three.js bundle is **client-only** (`dynamic(..., { ssr: false })`), so
  SSR/initial HTML stays lean.
- Adaptive DPR, capped pixel ratio, a single shadow-casting light, instanced
  particles, and procedural reflections (no external HDR) keep it at 60fps.
- Fully responsive; reduced-motion users get an instant, calm reveal.

## Pages

`/` · `/programs` · `/about` · `/testimonials` · `/faq` · `/contact` · `/booking`
