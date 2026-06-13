/**
 * Model loading strategy.
 * ------------------------------------------------------------------
 * GLB assets live in /public/models. Each 3D object component reads its
 * MODELS entry and, when `available`, loads the GLB (else draws a procedural
 * fallback). The transform fields below let you tune scale / position /
 * rotation WITHOUT touching component code — the usual reason a freshly
 * dropped-in model looks too big, too small, or faces the wrong way.
 */

export type ModelKey = "ball" | "goal" | "stadium";

export type ModelConfig = {
  url: string;
  available: boolean;
  /** Uniform scale multiplier applied on top of the component's base scale. */
  scale: number;
  /** Extra world offset (added to the component's placement). */
  position: [number, number, number];
  /** Euler rotation in radians. */
  rotation: [number, number, number];
};

export const MODELS: Record<ModelKey, ModelConfig> = {
  // Hero match ball — component scales by BALL_RADIUS, so `scale` is a fine-tune.
  ball: {
    url: "/models/soccer-ball.glb",
    available: true,
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  // Goal — sits at GOAL_Z (−40), mouth toward +Z (the ball). If yours faces
  // away, set rotation [0, Math.PI, 0]. Tune `scale` to ~7.3m wide.
  goal: {
    url: "/models/goal.glb",
    available: true,
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  stadium: {
    url: "/models/stadium.glb",
    available: false,
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
};
