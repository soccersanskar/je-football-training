"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { experience, smoothstep } from "@/lib/experience";
import { introState } from "@/lib/intro";
import { BALL_RADIUS, GOAL_Z } from "@/lib/choreography";

/**
 * Ball flight trajectory — a SOLID tube arcing from the ball at midfield up
 * into the goal mouth. Colour runs from faded white at the start to solid
 * blue toward the goal, with a travelling energy pulse for life. Visible in
 * the hero, fading out as the ball actually begins its journey.
 */

const START = new THREE.Vector3(0, BALL_RADIUS, 0);
const CONTROL = new THREE.Vector3(0, 4.6, GOAL_Z * 0.5);
const END = new THREE.Vector3(0, 1.05, GOAL_Z + 1.4); // goal mouth

const tubeVertex = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const tubeFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uOpacity;
  uniform float uTime;
  uniform vec3 uStart;  // faded white
  uniform vec3 uEnd;    // solid blue
  void main(){
    float x = vUv.x;                       // along the length (0 ball → 1 goal)
    vec3 col = mix(uStart, uEnd, smoothstep(0.0, 1.0, x));
    float a = mix(0.10, 0.95, x);          // faded start → solid end
    // travelling energy pulse toward the goal
    float head = fract(uTime * 0.22);
    float pulse = exp(-pow((x - head) * 7.0, 2.0));
    col += pulse * 0.7;
    a += pulse * 0.35;
    gl_FragColor = vec4(col, clamp(a, 0.0, 1.0) * uOpacity);
  }
`;

export default function TrajectoryArc() {
  const curve = useMemo(
    () => new THREE.QuadraticBezierCurve3(START, CONTROL, END),
    []
  );
  const geom = useMemo(
    () => new THREE.TubeGeometry(curve, 180, 0.05, 10, false),
    [curve]
  );
  const glowGeom = useMemo(
    () => new THREE.TubeGeometry(curve, 180, 0.13, 10, false),
    [curve]
  );

  const coreMat = useRef<THREE.ShaderMaterial>(null);
  const glowMat = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uOpacity: { value: 0 },
      uTime: { value: 0 },
      uStart: { value: new THREE.Color("#f4f8ff") }, // faded white
      uEnd: { value: new THREE.Color("#1f63ff") }, // solid blue
    }),
    []
  );
  const glowUniforms = useMemo(
    () => ({
      uOpacity: { value: 0 },
      uTime: { value: 0 },
      uStart: { value: new THREE.Color("#bcd2ff") },
      uEnd: { value: new THREE.Color("#2f6bff") },
    }),
    []
  );

  useFrame((_, dt) => {
    const p = experience.progress;
    // Fade in after the reveal; fade out as the ball starts travelling.
    const vis = introState.reveal * (1 - smoothstep(0.16, 0.42, p));
    uniforms.uTime.value += dt;
    glowUniforms.uTime.value += dt;
    uniforms.uOpacity.value = vis;
    glowUniforms.uOpacity.value = vis * 0.4;
  });

  return (
    <group>
      {/* glow halo */}
      <mesh geometry={glowGeom} renderOrder={1}>
        <shaderMaterial
          ref={glowMat}
          vertexShader={tubeVertex}
          fragmentShader={tubeFragment}
          uniforms={glowUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* solid core line */}
      <mesh geometry={geom} renderOrder={2}>
        <shaderMaterial
          ref={coreMat}
          vertexShader={tubeVertex}
          fragmentShader={tubeFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
