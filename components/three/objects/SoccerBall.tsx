"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { experience, damp } from "@/lib/experience";
import { ballPosition, ballRoll, BALL_RADIUS } from "@/lib/choreography";
import { introState } from "@/lib/intro";
import { MODELS } from "@/lib/models";

/**
 * The hero object — a detailed match ball inspired by the WC2026 "Trionda".
 *
 * Rather than the classic 32-panel pattern, this builds the Trionda's
 * signature look: FOUR large curved panels that swirl around the ball
 * (a domain-warped 4-cell Voronoi in direction space), deep curved seams,
 * green-blade accents running along those seams, and a finely pebbled /
 * "debossed" surface texture baked into the normal map. Coherent diffuse +
 * normal + roughness maps are generated in a single pass.
 *
 * Swaps to /models/soccer-ball.glb when MODELS.ball.available is set.
 */

const TEX_W = 1280;
const TEX_H = 640;

function normalize(v: number[]): [number, number, number] {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

/** Cheap value-noise fbm for the surface pebbling. */
function vnoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const h = (a: number, b: number) => {
    const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return s - Math.floor(s);
  };
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = h(xi, yi);
  const b = h(xi + 1, yi);
  const c = h(xi, yi + 1);
  const d = h(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

type BallMaps = {
  map: THREE.CanvasTexture;
  normalMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
};

function buildBallMaps(): BallMaps {
  // 4 panel centres = tetrahedron vertices.
  const centers = [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
  ].map(normalize);

  const W = TEX_W;
  const H = TEX_H;
  const color = new Uint8ClampedArray(W * H * 4);
  const rough = new Uint8ClampedArray(W * H * 4);
  const height = new Float32Array(W * H);

  // Accent palette for the swirled blades (brand-green, on a white ball).
  const accents: [number, number, number][] = [
    [0, 230, 118], // electric JE green
    [10, 120, 70], // deep emerald
    [70, 255, 190], // mint highlight
  ];
  const WHITE = [243, 246, 242];
  const GROOVE = [9, 14, 12];

  const swirl = 1.15; // how much the panels twist (Trionda flow)

  for (let y = 0; y < H; y++) {
    const theta = (y / (H - 1)) * Math.PI;
    const st = Math.sin(theta);
    const ct = Math.cos(theta);
    for (let x = 0; x < W; x++) {
      const phi = (x / W) * Math.PI * 2;
      let dx = st * Math.cos(phi);
      const dy = ct;
      let dz = st * Math.sin(phi);

      // Swirl warp about Y by latitude → curved, flowing seams.
      const a = swirl * dy;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      const wx = dx * ca - dz * sa;
      const wz = dx * sa + dz * ca;
      dx = wx;
      dz = wz;

      // Nearest + 2nd-nearest panel centre.
      let best = -2;
      let second = -2;
      let bestIdx = 0;
      for (let i = 0; i < 4; i++) {
        const c = centers[i];
        const dot = dx * c[0] + dy * c[1] + dz * c[2];
        if (dot > best) {
          second = best;
          best = dot;
          bestIdx = i;
        } else if (dot > second) {
          second = dot;
        }
      }
      const gap = best - second;

      // Surface pebble texture (fine fbm) for the whole skin.
      const nf =
        vnoise(x * 0.09, y * 0.09) * 0.6 +
        vnoise(x * 0.22, y * 0.22) * 0.3 +
        vnoise(x * 0.5, y * 0.5) * 0.1;

      const groove = Math.min(1, gap / 0.014); // 0 at seam line
      const grooveS = groove * groove * (3 - 2 * groove);
      const bladeMask = 1 - Math.min(1, Math.max(0, (gap - 0.02) / 0.06)); // near seam

      // blade colour: swirl through the accent set by panel + angle
      const acc = accents[bestIdx % accents.length];
      const swirlMix = 0.5 + 0.5 * Math.sin(phi * 2.0 + dy * 4.0);
      const acc2 = accents[(bestIdx + 1) % accents.length];
      const bladeR = acc[0] + (acc2[0] - acc[0]) * swirlMix;
      const bladeG = acc[1] + (acc2[1] - acc[1]) * swirlMix;
      const bladeB = acc[2] + (acc2[2] - acc[2]) * swirlMix;

      // base white with pebble shading
      const shade = 0.9 + nf * 0.12;
      let r = WHITE[0] * shade;
      let g = WHITE[1] * shade;
      let b = WHITE[2] * shade;

      // paint blade near seam
      const paint = bladeMask * 0.85;
      r = r + (bladeR - r) * paint;
      g = g + (bladeG - g) * paint;
      b = b + (bladeB - b) * paint;

      // carve the dark groove at the seam itself
      r = GROOVE[0] + (r - GROOVE[0]) * grooveS;
      g = GROOVE[1] + (g - GROOVE[1]) * grooveS;
      b = GROOVE[2] + (b - GROOVE[2]) * grooveS;

      const o = (y * W + x) * 4;
      color[o] = r;
      color[o + 1] = g;
      color[o + 2] = b;
      color[o + 3] = 255;

      // height: panels domed, seam grooves deep, fine pebble bumps
      height[y * W + x] = grooveS * (0.7 + nf * 0.3);

      // roughness: matte-textured skin, glossier blades, rough seams
      const rv = (0.62 - 0.18 * grooveS + bladeMask * -0.12 - nf * 0.06) * 255;
      rough[o] = rv;
      rough[o + 1] = rv;
      rough[o + 2] = rv;
      rough[o + 3] = 255;
    }
  }

  // Normal map from the height field (Sobel, wrapping in X).
  const normal = new Uint8ClampedArray(W * H * 4);
  const at = (x: number, y: number) => {
    const xx = (x + W) % W;
    const yy = Math.max(0, Math.min(H - 1, y));
    return height[yy * W + xx];
  };
  const strength = 2.6;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const gx =
        at(x - 1, y - 1) + 2 * at(x - 1, y) + at(x - 1, y + 1) -
        at(x + 1, y - 1) - 2 * at(x + 1, y) - at(x + 1, y + 1);
      const gy =
        at(x - 1, y - 1) + 2 * at(x, y - 1) + at(x + 1, y - 1) -
        at(x - 1, y + 1) - 2 * at(x, y + 1) - at(x + 1, y + 1);
      const nx = gx * strength;
      const ny = gy * strength;
      const nz = 1;
      const inv = 1 / Math.hypot(nx, ny, nz);
      const o = (y * W + x) * 4;
      normal[o] = (nx * inv * 0.5 + 0.5) * 255;
      normal[o + 1] = (ny * inv * 0.5 + 0.5) * 255;
      normal[o + 2] = (nz * inv * 0.5 + 0.5) * 255;
      normal[o + 3] = 255;
    }
  }

  const toTex = (data: Uint8ClampedArray, srgb: boolean) => {
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d")!;
    const img = ctx.createImageData(W, H);
    img.data.set(data);
    ctx.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    t.anisotropy = 8;
    t.needsUpdate = true;
    return t;
  };

  return {
    map: toTex(color, true),
    normalMap: toTex(normal, false),
    roughnessMap: toTex(rough, false),
  };
}

/** Radial green floodlit halo behind the ball. */
function glowTexture(): THREE.CanvasTexture {
  const s = 256;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(120,255,190,0.9)");
  g.addColorStop(0.25, "rgba(0,230,118,0.35)");
  g.addColorStop(0.6, "rgba(0,230,118,0.08)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

/** Soft dark radial "contact shadow" that grounds the ball in the fluid. */
function shadowTexture(): THREE.CanvasTexture {
  const s = 256;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(0,0,0,0.6)");
  g.addColorStop(0.45, "rgba(0,0,0,0.32)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

function ProceduralBall() {
  const maps = useMemo(() => buildBallMaps(), []);
  return (
    <mesh castShadow>
      <sphereGeometry args={[BALL_RADIUS, 96, 96]} />
      <meshPhysicalMaterial
        map={maps.map}
        normalMap={maps.normalMap}
        normalScale={new THREE.Vector2(0.85, 0.85)}
        roughnessMap={maps.roughnessMap}
        roughness={1}
        metalness={0}
        clearcoat={0.35}
        clearcoatRoughness={0.45}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

function GltfBall() {
  const { scene } = useGLTF(MODELS.ball.url);
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) o.castShadow = true;
    });
    return c;
  }, [scene]);
  return (
    <primitive
      object={cloned}
      scale={BALL_RADIUS * MODELS.ball.scale}
      position={MODELS.ball.position}
      rotation={MODELS.ball.rotation}
    />
  );
}

export default function SoccerBall() {
  const group = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Sprite>(null);
  const shadow = useRef<THREE.Sprite>(null);
  const glowMap = useMemo(() => glowTexture(), []);
  const shadowMap = useMemo(() => shadowTexture(), []);

  useFrame((_, dt) => {
    if (!group.current || !spin.current || !tilt.current) return;
    const p = experience.progress;
    const [x, y, z] = ballPosition(p);
    const t = performance.now() / 1000;

    const heroInfluence = 1 - Math.min(1, p / 0.12);
    const px = experience.pointer.x * 0.4 * heroInfluence;
    const py = -experience.pointer.y * 0.2 * heroInfluence;
    const bob = Math.sin(t * 1.4) * 0.045;

    group.current.position.x = damp(group.current.position.x, x + px, 6, dt);
    group.current.position.y = damp(group.current.position.y, y + py + bob, 6, dt);
    group.current.position.z = damp(group.current.position.z, z, 6, dt);

    const tiltAmt = 0.12 + 0.12 * heroInfluence;
    tilt.current.rotation.x = damp(tilt.current.rotation.x, experience.pointer.y * tiltAmt, 4, dt);
    tilt.current.rotation.z = damp(tilt.current.rotation.z, -experience.pointer.x * tiltAmt, 4, dt);

    spin.current.rotation.x = -ballRoll(p);
    spin.current.rotation.y += dt * (0.22 + Math.abs(experience.velocity) * 0.4);

    const reveal = introState.reveal;
    if (glow.current) {
      const pulse = 0.85 + Math.sin(t * 1.6) * 0.12;
      const s = (2.4 + Math.sin(t * 1.6) * 0.18) * pulse;
      glow.current.scale.set(s, s, s);
      (glow.current.material as THREE.SpriteMaterial).opacity = 0.5 * reveal * pulse;
    }
    if (shadow.current) {
      (shadow.current.material as THREE.SpriteMaterial).opacity = 0.55 * reveal;
    }
  });

  return (
    <group ref={group}>
      {/* soft contact shadow — grounds the ball in the gradient */}
      <sprite ref={shadow} position={[0, -0.18, -0.05]} scale={[2.2, 1.4, 1]} renderOrder={-2}>
        <spriteMaterial
          map={shadowMap}
          transparent
          depthWrite={false}
          opacity={0}
          toneMapped={false}
        />
      </sprite>

      {/* floodlit halo */}
      <sprite ref={glow} renderOrder={-1}>
        <spriteMaterial
          map={glowMap}
          transparent
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
          opacity={0}
          toneMapped={false}
        />
      </sprite>

      <group ref={tilt}>
        <group ref={spin}>
          {MODELS.ball.available ? <GltfBall /> : <ProceduralBall />}
        </group>
      </group>
    </group>
  );
}

if (MODELS.ball.available) useGLTF.preload(MODELS.ball.url);
