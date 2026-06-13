"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { experience, smoothstep } from "@/lib/experience";
import { introState } from "@/lib/intro";
import { BALL_RADIUS, GOAL_Z } from "@/lib/choreography";

/**
 * FIFA / EA SPORTS FC free-kick aim guide.
 *
 * A genuinely curved 3D banana arc — a vertical parabola (lifts off the ball,
 * peaks, dips into the goal) combined with a horizontal swerve (curls out
 * then bends back into the TOP-RIGHT corner). Rendered as a solid tube ribbon
 * with a white→blue length gradient and a glow, plus a glowing target reticle
 * in the corner. It animates by "drawing on" from the ball to the target,
 * holds, fades, and repeats.
 *
 * TUNE THE BEND/APEX HERE → CONTROL_POINTS below (a CatmullRom passes through
 * them). P0 is the ball; the last point is the goal's top-right corner.
 */

// Goal: width 7.32m (posts at x = ±3.66), crossbar at y = 2.44m, line at GOAL_Z.
export const CONTROL_POINTS: [number, number, number][] = [
  [0, BALL_RADIUS, 0], //  P0 — at the ball (midfield)
  [-0.9, 2.3, -9], //      P1 — lifts up, swerves OUT to the left
  [-1.35, 4.05, -20], //   P2 — apex of the parabola + max curl
  [0.7, 3.5, -30], //      P3 — bending back in, descending
  [3.25, 2.18, -38.6], //  P4 — TOP-RIGHT corner of the goal mouth
];

const END = new THREE.Vector3(...CONTROL_POINTS[CONTROL_POINTS.length - 1]);

// draw-on cycle (seconds)
const DRAW = 1.9;
const HOLD = 0.7;
const FADE = 0.6;
const GAP = 0.25;
const CYCLE = DRAW + HOLD + FADE + GAP;

const tubeVertex = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// vUv.x runs along the tube length (0 = ball, 1 = goal corner).
const tubeFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uProgress; // drawn portion 0..1
  uniform float uOpacity;  // overall alpha (reveal * fade * scene)
  uniform float uHead;     // brighten the leading edge
  uniform vec3  uStart;    // faded white (ball end)
  uniform vec3  uEnd;      // solid blue (goal end)
  void main(){
    float x = vUv.x;
    if (x > uProgress) discard;                 // the "draw-on"
    vec3 col = mix(uStart, uEnd, smoothstep(0.0, 1.0, x));
    float a = mix(0.12, 0.95, x);               // faded start → solid end
    float head = smoothstep(uProgress - 0.05, uProgress, x) * uHead;
    col += head * 0.9;
    a += head * 0.5;
    gl_FragColor = vec4(col, clamp(a, 0.0, 1.0) * uOpacity);
  }
`;

export default function TrajectoryArc() {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        CONTROL_POINTS.map((p) => new THREE.Vector3(...p)),
        false,
        "centripetal",
        0.5
      ),
    []
  );
  const tube = useMemo(
    () => new THREE.TubeGeometry(curve, 240, 0.055, 14, false),
    [curve]
  );
  const glowTube = useMemo(
    () => new THREE.TubeGeometry(curve, 240, 0.14, 14, false),
    [curve]
  );

  const core = useMemo(
    () => ({
      uProgress: { value: 0 },
      uOpacity: { value: 0 },
      uHead: { value: 1 },
      uStart: { value: new THREE.Color("#f3f7ff") },
      uEnd: { value: new THREE.Color("#1f63ff") },
    }),
    []
  );
  const glow = useMemo(
    () => ({
      uProgress: { value: 0 },
      uOpacity: { value: 0 },
      uHead: { value: 1 },
      uStart: { value: new THREE.Color("#bcd2ff") },
      uEnd: { value: new THREE.Color("#2f6bff") },
    }),
    []
  );

  // reticle in the top corner
  const reticle = useMemo(() => new THREE.Group(), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const p = experience.progress;

    // Hero element: present after reveal, fades as the ball starts travelling.
    const sceneVis = introState.reveal * (1 - smoothstep(0.16, 0.42, p));

    // draw-on → hold → fade → gap loop
    const lt = time % CYCLE;
    let prog: number;
    let fade: number;
    if (lt < DRAW) {
      prog = smoothstep(0, 1, lt / DRAW);
      fade = 1;
    } else if (lt < DRAW + HOLD) {
      prog = 1;
      fade = 1;
    } else if (lt < DRAW + HOLD + FADE) {
      prog = 1;
      fade = 1 - (lt - DRAW - HOLD) / FADE;
    } else {
      prog = 0;
      fade = 0;
    }

    const op = sceneVis * fade;
    core.uProgress.value = prog;
    core.uOpacity.value = op;
    glow.uProgress.value = prog;
    glow.uOpacity.value = op * 0.45;

    // reticle: blooms in when the arc arrives, pulses, fades with the loop
    const arrive = smoothstep(0.86, 1.0, prog);
    const pulse = 1 + Math.sin(time * 6) * 0.12;
    reticle.scale.setScalar(arrive * pulse);
    reticle.children.forEach((c) => {
      const m = (c as THREE.Mesh).material as THREE.Material & {
        opacity: number;
      };
      m.opacity = arrive * op * 1.4;
    });
  });

  return (
    <group>
      <mesh geometry={glowTube} renderOrder={1}>
        <shaderMaterial
          vertexShader={tubeVertex}
          fragmentShader={tubeFragment}
          uniforms={glow}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh geometry={tube} renderOrder={2}>
        <shaderMaterial
          vertexShader={tubeVertex}
          fragmentShader={tubeFragment}
          uniforms={core}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* target reticle — top corner of the goal, faces the camera (+Z) */}
      <primitive object={reticle} position={END.toArray()}>
        <mesh>
          <ringGeometry args={[0.26, 0.34, 40]} />
          <meshBasicMaterial
            color="#5fa0ff"
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[0.05, 0.1, 24]} />
          <meshBasicMaterial
            color="#eaf2ff"
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      </primitive>
    </group>
  );
}
