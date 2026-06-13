"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { experience, smoothstep } from "@/lib/experience";
import { GOAL_Z, BALL_RADIUS } from "@/lib/choreography";
import { introState } from "@/lib/intro";
import { MODELS } from "@/lib/models";

/**
 * The goal. Loads /models/goal.glb (transform tunable in lib/models.ts) and
 * plants it with a soft radial contact shadow on the invisible ground so it
 * doesn't float in the fluid backdrop. Falls back to a procedural posts+net
 * goal (with an impact ripple) when no GLB is available.
 */

const GOAL_W = 7.32; // regulation width (m)
const GOAL_H = 2.44; // regulation height (m)
const DEPTH = 2.0;

/** Soft radial dark texture for the ground contact shadow. */
function shadowTexture(): THREE.CanvasTexture {
  const s = 256;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(0,0,0,0.55)");
  g.addColorStop(0.5, "rgba(0,0,0,0.28)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

/** Flat ground shadow plane (grounds a tall object like the goal). */
function GroundShadow({
  width,
  depth,
}: {
  width: number;
  depth: number;
}) {
  const tex = useMemo(() => shadowTexture(), []);
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current)
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        introState.reveal * 0.7;
  });
  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.02, -DEPTH * 0.4]}
    >
      <planeGeometry args={[width, depth]} />
      <meshBasicMaterial
        map={tex}
        transparent
        opacity={0}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function Net() {
  const ref = useRef<THREE.LineSegments>(null);
  const cols = 24;
  const rows = 10;

  const { geometry, base } = useMemo(() => {
    const points: number[] = [];
    const rest: THREE.Vector3[] = [];
    const halfW = GOAL_W / 2;
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x1 = -halfW + (c / cols) * GOAL_W;
        const x2 = -halfW + ((c + 1) / cols) * GOAL_W;
        const y = (r / rows) * GOAL_H;
        points.push(x1, y, -DEPTH, x2, y, -DEPTH);
      }
    }
    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = -halfW + (c / cols) * GOAL_W;
        const y1 = (r / rows) * GOAL_H;
        const y2 = ((r + 1) / rows) * GOAL_H;
        points.push(x, y1, -DEPTH, x, y2, -DEPTH);
      }
    }
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(points);
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    for (let i = 0; i < arr.length; i += 3)
      rest.push(new THREE.Vector3(arr[i], arr[i + 1], arr[i + 2]));
    return { geometry: geo, base: rest };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const p = experience.progress;
    const impact = smoothstep(0.9, 0.96, p);
    const attr = ref.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const t = performance.now() / 1000;
    for (let i = 0; i < base.length; i++) {
      const b = base[i];
      const dist = Math.hypot(b.x, b.y - GOAL_H * 0.45);
      const wave =
        impact *
        Math.exp(-dist * 0.5) *
        (0.6 + 0.4 * Math.sin(t * 9 - dist * 2)) *
        (1 - smoothstep(0.96, 1, p) * 0.5);
      attr.setZ(i, b.z - wave);
    }
    attr.needsUpdate = true;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#dfeee7" transparent opacity={0.32} />
    </lineSegments>
  );
}

function Posts() {
  const halfW = GOAL_W / 2;
  const post = (
    <meshStandardMaterial
      color="#f2f5f4"
      roughness={0.3}
      metalness={0.6}
      emissive="#0a3d24"
      emissiveIntensity={0.15}
    />
  );
  const R = 0.09;
  return (
    <group>
      <mesh position={[-halfW, GOAL_H / 2, 0]} castShadow>
        <cylinderGeometry args={[R, R, GOAL_H, 16]} />
        {post}
      </mesh>
      <mesh position={[halfW, GOAL_H / 2, 0]} castShadow>
        <cylinderGeometry args={[R, R, GOAL_H, 16]} />
        {post}
      </mesh>
      <mesh position={[0, GOAL_H, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[R, R, GOAL_W, 16]} />
        {post}
      </mesh>
    </group>
  );
}

function GltfGoal() {
  const { scene } = useGLTF(MODELS.goal.url);
  const cfg = MODELS.goal;
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) m.castShadow = true;
    });
    return c;
  }, [scene]);
  return (
    <primitive
      object={cloned}
      scale={cfg.scale}
      position={cfg.position}
      rotation={cfg.rotation}
    />
  );
}

export default function Goal() {
  return (
    <group position={[0, 0, GOAL_Z]}>
      {MODELS.goal.available ? (
        <GltfGoal />
      ) : (
        <>
          <Posts />
          <Net />
        </>
      )}
      <GroundShadow width={GOAL_W * 1.7} depth={DEPTH * 2.6} />
    </group>
  );
}

if (MODELS.goal.available) useGLTF.preload(MODELS.goal.url);

export { BALL_RADIUS };
