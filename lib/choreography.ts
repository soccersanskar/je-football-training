/**
 * CHOREOGRAPHY — the cinematic timeline as pure math.
 * ------------------------------------------------------------------
 * Every motion in the 3D scene (camera, ball, player, lighting, fog) is a
 * function of global scroll progress `p` (0 → 1). Keeping it here — separate
 * from the rendering components — makes the "film" tunable in one place and
 * lets components stay declarative.
 *
 * World convention: pitch on the XZ plane, +Y up. Midfield at z = 0,
 * goal mouth at z = -40, camera generally behind looking toward -Z.
 */
import { clamp, lerp, smoothstep } from "./experience";

export type Vec3 = [number, number, number];

const v = (x: number, y: number, z: number): Vec3 => [x, y, z];

function lerpVec(a: Vec3, b: Vec3, t: number): Vec3 {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/** Sample a set of progress-keyed keyframes with smooth easing between them. */
function sampleKeyframes(
  p: number,
  frames: { at: number; value: Vec3 }[]
): Vec3 {
  if (p <= frames[0].at) return frames[0].value;
  const last = frames[frames.length - 1];
  if (p >= last.at) return last.value;
  for (let i = 0; i < frames.length - 1; i++) {
    const a = frames[i];
    const b = frames[i + 1];
    if (p >= a.at && p <= b.at) {
      const t = smoothstep(a.at, b.at, p);
      return lerpVec(a.value, b.value, t);
    }
  }
  return last.value;
}

export const BALL_RADIUS = 0.42;
export const GOAL_Z = -40;

/** Ball world position as it travels the story: midfield → goal → net. */
export function ballPosition(p: number): Vec3 {
  // Travel down the pitch from midfield toward the goal area.
  const travel = sampleKeyframes(p, [
    { at: 0.0, value: v(0, BALL_RADIUS, 0) },
    { at: 0.12, value: v(0, BALL_RADIUS, 0) },
    { at: 0.32, value: v(-0.6, BALL_RADIUS, -6) },
    { at: 0.52, value: v(0.5, BALL_RADIUS, -16) },
    { at: 0.72, value: v(-0.4, BALL_RADIUS, -26) },
    { at: 0.86, value: v(0, BALL_RADIUS, -33) },
  ]);

  // The strike: ball accelerates and arcs into the net.
  if (p > 0.86) {
    const shot = smoothstep(0.86, 0.95, p);
    const z = lerp(-33, GOAL_Z - 1.6, shot);
    const arc = Math.sin(shot * Math.PI) * 2.4; // rise then fall
    const x = lerp(0, 0.4, shot);
    return [x, BALL_RADIUS + arc, z];
  }
  return travel;
}

/**
 * Ball scale across the story. The ball is the hero up close (full size in the
 * dream), then recedes to a realistic size relative to the goal as it travels
 * down the pitch — so it doesn't look like a beach ball at the net. Measured
 * GLB ball ≈ 3.05u, goal ≈ 6.24×2.4u, so ~0.2 lands near real proportion.
 */
export function ballScale(p: number): number {
  return lerp(1, 0.2, smoothstep(0.32, 0.9, p));
}

/** Accumulated roll angle (radians) so the ball spins as it travels. */
export function ballRoll(p: number): number {
  // Distance roughly proportional to progress * pitch length.
  const distance = clamp(p, 0, 0.95) * 44;
  return distance / BALL_RADIUS;
}

/** Camera position + look-at target, blended across chapters. */
export function cameraRig(p: number): { position: Vec3; target: Vec3 } {
  const position = sampleKeyframes(p, [
    { at: 0.0, value: v(0, 1.75, 8.6) }, // hero — low, intimate, beside the ball
    { at: 0.12, value: v(0.8, 3.4, 10) }, // dream — lift, open the space
    { at: 0.32, value: v(5.5, 3.0, 2) }, // training — side tracking
    { at: 0.52, value: v(-5.0, 3.2, -10) }, // transformation — swing to player
    { at: 0.72, value: v(0, 4.2, -16) }, // results — wide, elevated
    { at: 0.86, value: v(0, 1.6, -26) }, // performance — behind the ball, low
    { at: 0.95, value: v(2.5, 2.2, -34) }, // the strike — chase toward goal
    { at: 1.0, value: v(0, 5.5, -30) }, // conversion — triumphant pull-back
  ]);

  const target = sampleKeyframes(p, [
    { at: 0.0, value: v(0, 0.3, -3) },
    { at: 0.32, value: v(0, 0.6, -8) },
    { at: 0.52, value: v(-0.4, 1.2, -16) },
    { at: 0.72, value: v(0, 1.2, -28) },
    { at: 0.86, value: v(0, 1.0, -36) },
    { at: 1.0, value: v(0, 1.2, GOAL_Z) },
  ]);

  return { position, target };
}

/**
 * Player development — emerges and "completes" through the transformation
 * chapter. Returns 0 (no player) → 1 (fully formed elite athlete).
 */
export function playerGrowth(p: number): number {
  return smoothstep(0.5, 0.72, p);
}

/** Player world position — stands just off the ball's path. */
export function playerPosition(p: number): Vec3 {
  return [2.4, 0, -22];
}

/**
 * Stadium light intensity envelope. The intro (handled in JS, see IntroScene)
 * powers lights on sequentially; from there the floods stay lit, dimming
 * slightly for intimate chapters and blazing for the performance finale.
 */
export function lightMood(p: number): number {
  // Slightly moodier mid-story, brightest at the climax.
  const dip = 1 - 0.18 * smoothstep(0.12, 0.4, p) * (1 - smoothstep(0.7, 0.9, p));
  const climax = 1 + 0.5 * smoothstep(0.86, 0.96, p);
  return dip * climax;
}

/** Fog density across the story — thick at dawn, clearing as we perform. */
export function fogDensity(p: number): number {
  return lerp(0.055, 0.022, smoothstep(0.1, 0.9, p));
}
