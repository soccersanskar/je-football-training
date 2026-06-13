/**
 * JE FOOTBALL — central palette / theme object.
 * ------------------------------------------------------------------
 * One source of truth for colour, shared by CSS (via globals.css variables),
 * Tailwind (tailwind.config.ts), and the 3D scene (Three.js materials/lights).
 * The green is an *accent* — used deliberately, never as a flood fill.
 */
export const palette = {
  // Greens
  green: "#00E676", // primary electric green (accent)
  greenBright: "#3BFF9E", // hotter green for glows / highlights
  greenDeep: "#00A857", // darker pitch-tinted green
  // Pitch + base
  pitch: "#0C2E1A", // desaturated pitch green (gradient bottom)
  pitchDeep: "#06180F", // deep pitch green (fog / far fade)
  base: "#02080A", // near-black base (gradient top)
  ink: "#010604", // deepest shadow
  // Text
  white: "#F4F8F6", // off-white headings
  muted: "#8FA39A", // muted gray body copy
  // 3D lighting
  keyLight: "#EAF3FF", // cool white key spotlight
  rimLight: "#00E676", // green rim / edge separation
  grassTint: "#16361F", // base grass colour (photoreal, not neon)
} as const;

export type Palette = typeof palette;
