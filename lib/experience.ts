/**
 * Shared experience state.
 * ------------------------------------------------------------------
 * A module-level singleton that bridges smooth-scroll (Lenis) and the
 * 3D scene (R3F `useFrame`). We deliberately avoid React state here so
 * the canvas can read scroll/pointer every frame without triggering
 * re-renders — the key to a steady 60fps.
 */

export type ExperienceState = {
  /** Global scroll progress, 0 → 1 across the whole story. */
  progress: number;
  /** Scroll velocity (for motion blur / reactive intensity). */
  velocity: number;
  /** Normalised pointer position, -1 → 1 on each axis. */
  pointer: { x: number; y: number };
  /** Whether the cinematic intro has finished (lights up, ball revealed). */
  introComplete: boolean;
  /** Reduced-motion preference — scene degrades gracefully. */
  reducedMotion: boolean;
};

export const experience: ExperienceState = {
  progress: 0,
  velocity: 0,
  pointer: { x: 0, y: 0 },
  introComplete: false,
  reducedMotion: false,
};

/**
 * Story chapters mapped onto the global scroll timeline. The 3D scene and
 * the HTML overlays both read from these boundaries so they stay in sync.
 */
export const CHAPTERS = {
  hero: [0.0, 0.12],
  dream: [0.12, 0.32],
  training: [0.32, 0.52],
  transformation: [0.52, 0.72],
  results: [0.72, 0.86],
  performance: [0.86, 0.96],
  conversion: [0.96, 1.0],
} as const;

export type ChapterKey = keyof typeof CHAPTERS;

/** Linear 0→1 progress within a chapter window, clamped. */
export function chapterProgress(p: number, key: ChapterKey): number {
  const [start, end] = CHAPTERS[key];
  if (p <= start) return 0;
  if (p >= end) return 1;
  return (p - start) / (end - start);
}

export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Smoothstep easing for organic transitions. */
export const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

/** Frame-rate-independent damping toward a target. */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));
