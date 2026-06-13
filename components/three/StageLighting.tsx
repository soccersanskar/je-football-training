"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { experience } from "@/lib/experience";
import { introState } from "@/lib/intro";
import { ballPosition, lightMood } from "@/lib/choreography";
import { palette } from "@/lib/palette";

/**
 * Cinematic 3-point rig that tracks the ball down the pitch:
 *   • KEY   — cool-white spotlight from above-front. Pools light on the grass
 *             and casts the ball's soft contact shadow. (The only shadow caster.)
 *   • RIM   — green-tinted back light for edge separation / brand glow.
 *   • FILL  — handled by the hemisphere + ambient in the scene.
 * Intensities ramp with the intro reveal and breathe with the chapter mood.
 */
export default function StageLighting() {
  const key = useRef<THREE.SpotLight>(null);
  const keyTarget = useRef<THREE.Object3D>(new THREE.Object3D());
  const rim = useRef<THREE.DirectionalLight>(null);
  const rimTarget = useRef<THREE.Object3D>(new THREE.Object3D());

  useFrame(() => {
    const p = experience.progress;
    const [bx, by, bz] = ballPosition(p);
    const power = introState.reveal * lightMood(p);

    if (key.current) {
      key.current.position.set(bx + 3.2, by + 11, bz + 6.5);
      keyTarget.current.position.set(bx, 0, bz);
      keyTarget.current.updateMatrixWorld();
      key.current.target = keyTarget.current;
      key.current.intensity = power * 620;
    }
    if (rim.current) {
      rim.current.position.set(bx - 5.5, by + 5.5, bz - 8.5);
      rimTarget.current.position.set(bx, 0.4, bz);
      rimTarget.current.updateMatrixWorld();
      rim.current.target = rimTarget.current;
      rim.current.intensity = power * 2.6;
    }
  });

  return (
    <group>
      {/* KEY — cool white, soft contact shadow (only shadow caster) */}
      <spotLight
        ref={key}
        color={palette.keyLight}
        angle={0.66}
        penumbra={0.85}
        distance={70}
        decay={1.5}
        intensity={0}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.00045}
        shadow-radius={4}
        shadow-camera-near={1}
        shadow-camera-far={60}
      />
      <primitive object={keyTarget.current} />

      {/* RIM — green back light for edge separation (cheap directional) */}
      <directionalLight ref={rim} color={palette.rimLight} intensity={0} />
      <primitive object={rimTarget.current} />
    </group>
  );
}
