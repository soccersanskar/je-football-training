/**
 * Intro sequence state.
 * ------------------------------------------------------------------
 * The opening cinematic (black → floodlights power on one by one → fog,
 * grass, particles and ball revealed → headline) is driven by a GSAP
 * timeline that writes into this singleton. The 3D scene reads `lights`
 * and `reveal` every frame; the HTML hero reads `complete` to time the
 * headline. Decoupling it this way keeps the canvas free of React state.
 */
export const introState = {
  /** Per-floodlight power, 0 → 1, ramped sequentially. */
  lights: [0, 0, 0, 0],
  /** Environment reveal 0 → 1 (fog, grass, particles, ball fade-in). */
  reveal: 0,
  /** True once the headline is allowed to appear. */
  complete: false,
  /** Skip flag (reduced motion or user skip). */
  skipped: false,
  /** GLB preload progress (0–100) and readiness, fed by AssetGate. */
  assetsProgress: 0,
  assetsReady: false,
};
