"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { introState } from "@/lib/intro";
import { experience } from "@/lib/experience";
import { lightMood } from "@/lib/choreography";

/**
 * Four corner floodlight towers. Each has a tall pole, a lamp bank, an
 * emissive glow, and a real SpotLight whose intensity is driven by the
 * intro sequence (`introState.lights[i]`) and the per-chapter light mood.
 * The first tower's spotlight casts the ball's shadow; the others light the
 * environment without the shadow-map cost.
 */

type TowerProps = {
  index: number;
  position: [number, number, number];
  castShadow?: boolean;
};

const TARGET = new THREE.Vector3(0, 0, -16);

function Tower({ index, position, castShadow }: TowerProps) {
  const spot = useRef<THREE.SpotLight>(null);
  const lamp = useRef<THREE.MeshStandardMaterial>(null);
  const glow = useRef<THREE.Mesh>(null);
  const target = useRef<THREE.Object3D>(new THREE.Object3D());

  useFrame(() => {
    const power = introState.lights[index] ?? 0;
    const mood = lightMood(experience.progress);
    const intensity = power * mood;
    if (spot.current) {
      spot.current.intensity = intensity * 340;
      spot.current.target.position.copy(TARGET);
      spot.current.target.updateMatrixWorld();
    }
    if (lamp.current) lamp.current.emissiveIntensity = power * 3;
    if (glow.current) {
      const s = 0.6 + power * 0.8;
      glow.current.scale.setScalar(s);
      (glow.current.material as THREE.MeshBasicMaterial).opacity =
        power * 0.5;
    }
  });

  const lampDir = new THREE.Vector3(0, 14, 0).sub(
    new THREE.Vector3(...TARGET.toArray())
  );

  return (
    <group position={position}>
      {/* pole */}
      <mesh position={[0, 7, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.26, 14, 12]} />
        <meshStandardMaterial color="#1b211e" roughness={0.7} metalness={0.5} />
      </mesh>
      {/* lamp bank, tilted toward the pitch */}
      <group position={[0, 14, 0]} rotation={[0.5, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[3.2, 1.6, 0.5]} />
          <meshStandardMaterial color="#0d1411" roughness={0.6} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.3]}>
          <boxGeometry args={[3.0, 1.4, 0.1]} />
          <meshStandardMaterial
            ref={lamp}
            color="#cfe9dc"
            emissive="#eafff4"
            emissiveIntensity={0}
            toneMapped={false}
          />
        </mesh>
        {/* soft halo */}
        <mesh ref={glow} position={[0, 0, 0.5]}>
          <circleGeometry args={[2.6, 24]} />
          <meshBasicMaterial
            color="#d8fff0"
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      <spotLight
        ref={spot}
        position={[0, 14, 0]}
        angle={0.62}
        penumbra={0.65}
        distance={140}
        decay={1.4}
        intensity={0}
        color="#eafff6"
        castShadow={castShadow}
        shadow-mapSize-width={castShadow ? 2048 : 512}
        shadow-mapSize-height={castShadow ? 2048 : 512}
        shadow-bias={-0.0004}
        shadow-camera-near={1}
        shadow-camera-far={120}
      />
      <primitive object={target.current} />
    </group>
  );
}

export default function Floodlights() {
  return (
    <group>
      <Tower index={0} position={[-26, 0, 6]} />
      <Tower index={1} position={[26, 0, 6]} />
      <Tower index={2} position={[-26, 0, -42]} />
      <Tower index={3} position={[26, 0, -42]} />
    </group>
  );
}
