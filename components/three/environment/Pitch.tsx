"use client";

import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { palette } from "@/lib/palette";
import { PITCH_TEXTURES } from "@/lib/pitchTextures";

/**
 * The pitch.
 *
 * Default = a high-quality PROCEDURAL turf: a non-tiled colour pass carrying
 * the mowing stripes, a finely-tiled grass normal map so blades catch the
 * light, and a separate, crisp line-markings overlay (penalty + six-yard
 * boxes, spots, arcs, halfway line, centre circle). Tinted toward the dark JE
 * pitch-green, lit by the key spotlight, dissolving into fog at the far end.
 *
 * Drop a real CC0 grass set in /public/textures/pitch and flip
 * PITCH_TEXTURES.enabled → full PBR (diffuse + normal + roughness +
 * displacement). See lib/pitchTextures.ts.
 */

const PITCH_W = 120; // X — touchline to touchline
const PITCH_L = 160; // Z — length
const PITCH_CZ = -18; // plane centre in Z

// ---- world → pitch helpers (metric: goal at z = -40, goal width 7.32m) ----

/** Big, non-tiled colour pass: base green + soft mowing stripes. */
function grassColorCanvas(): THREE.CanvasTexture {
  const S = 1024;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;

  // base pitch green with a gentle far-end darkening
  const grad = ctx.createLinearGradient(0, 0, 0, S);
  grad.addColorStop(0, "#0e2917");
  grad.addColorStop(0.5, palette.grassTint);
  grad.addColorStop(1, "#0e2c19");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, S, S);

  // mowing stripes — wide horizontal bands, subtle brightness flip
  const bands = 14;
  for (let i = 0; i < bands; i++) {
    ctx.fillStyle =
      i % 2 === 0 ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.05)";
    ctx.fillRect(0, (i / bands) * S, S, S / bands + 1);
  }

  // coarse mottling for life
  for (let i = 0; i < 1400; i++) {
    const x = Math.random() * S;
    const y = Math.random() * S;
    const r = 4 + Math.random() * 14;
    ctx.fillStyle = `rgba(${10 + Math.random() * 20},${40 + Math.random() * 30},${
      24 + Math.random() * 20
    },0.06)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Finely-tiled grass blade NORMAL map (high-freq detail that catches light). */
function grassNormalCanvas(): THREE.CanvasTexture {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(S, S);
  for (let i = 0; i < S * S; i++) {
    // vertical-ish blade streaks → tilt normals mostly along one axis
    const streak = Math.sin((i % S) * 1.7) * 0.5 + (Math.random() - 0.5);
    const nx = streak * 0.5;
    const ny = (Math.random() - 0.5) * 0.5;
    const nz = 1;
    const inv = 1 / Math.hypot(nx, ny, nz);
    img.data[i * 4] = (nx * inv * 0.5 + 0.5) * 255;
    img.data[i * 4 + 1] = (ny * inv * 0.5 + 0.5) * 255;
    img.data[i * 4 + 2] = (nz * inv * 0.5 + 0.5) * 255;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(34, 46);
  t.colorSpace = THREE.NoColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Crisp, slightly-worn regulation line markings on a transparent overlay. */
function MarkingsOverlay() {
  const tex = useMemo(() => {
    // overlay plane covers this world region
    const Wp = 88; // X: -44..44
    const Lp = 78; // Z
    const Cz = -16; // overlay centre Z  → covers z ∈ [-55, 23]
    const CW = 1408;
    const CH = Math.round((CW * Lp) / Wp);
    const c = document.createElement("canvas");
    c.width = CW;
    c.height = CH;
    const ctx = c.getContext("2d")!;

    const toPx = (xw: number, zw: number): [number, number] => {
      const u = (xw + Wp / 2) / Wp;
      const v = (Cz + Lp / 2 - zw) / Lp; // v=1 → most negative z (goal side)
      return [u * CW, (1 - v) * CH];
    };
    const lw = Math.max(2, (0.14 / Wp) * CW);
    ctx.strokeStyle = "rgba(232,245,238,0.82)";
    ctx.fillStyle = "rgba(232,245,238,0.82)";
    ctx.lineWidth = lw;
    ctx.lineCap = "round";

    const line = (x1: number, z1: number, x2: number, z2: number) => {
      const a = toPx(x1, z1);
      const b = toPx(x2, z2);
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.stroke();
    };
    const rect = (xMin: number, zMin: number, xMax: number, zMax: number) => {
      line(xMin, zMin, xMax, zMin);
      line(xMax, zMin, xMax, zMax);
      line(xMax, zMax, xMin, zMax);
      line(xMin, zMax, xMin, zMin);
    };
    const spot = (xw: number, zw: number, rm = 0.3) => {
      const [px, py] = toPx(xw, zw);
      ctx.beginPath();
      ctx.arc(px, py, (rm / Wp) * CW, 0, Math.PI * 2);
      ctx.fill();
    };
    const arc = (
      xw: number,
      zw: number,
      rm: number,
      a0: number,
      a1: number
    ) => {
      const [px, py] = toPx(xw, zw);
      ctx.beginPath();
      ctx.arc(px, py, (rm / Wp) * CW, a0, a1);
      ctx.stroke();
    };

    // Goal line & touch framing (subtle)
    line(-34, -40, 34, -40); // goal line
    // Penalty area: 16.5m deep, 40.3m wide
    rect(-20.15, -40, 20.15, -23.5);
    // Six-yard box: 5.5m deep, 18.32m wide
    rect(-9.16, -40, 9.16, -34.5);
    // Penalty spot (11m) + D-arc (r 9.15 around it)
    spot(0, -29, 0.34);
    arc(0, -29, 9.15, Math.PI * 1.18, Math.PI * 1.82);
    // Halfway line + centre circle + centre spot
    line(-40, 0, 40, 0);
    arc(0, 0, 9.15, 0, Math.PI * 2);
    spot(0, 0, 0.34);

    // faint wear: erase speckle so paint looks used
    ctx.globalCompositeOperation = "destination-out";
    for (let i = 0; i < 2600; i++) {
      ctx.globalAlpha = Math.random() * 0.4;
      ctx.beginPath();
      ctx.arc(Math.random() * CW, Math.random() * CH, Math.random() * 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return { tex: t, Wp, Lp, Cz };
  }, []);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.013, tex.Cz]}
      receiveShadow={false}
    >
      <planeGeometry args={[tex.Wp, tex.Lp]} />
      <meshStandardMaterial
        map={tex.tex}
        transparent
        opacity={0.9}
        roughness={0.6}
        metalness={0}
        polygonOffset
        polygonOffsetFactor={-2}
        depthWrite={false}
      />
    </mesh>
  );
}

function ProceduralPitch() {
  const map = useMemo(() => grassColorCanvas(), []);
  const normal = useMemo(() => grassNormalCanvas(), []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, PITCH_CZ]} receiveShadow>
      <planeGeometry args={[PITCH_W, PITCH_L, 1, 1]} />
      <meshStandardMaterial
        map={map}
        normalMap={normal}
        normalScale={new THREE.Vector2(0.45, 0.45)}
        roughness={0.92}
        metalness={0}
        color="#7f8f86"
      />
    </mesh>
  );
}

function PbrPitch() {
  const { gl } = useThree();
  const maxAniso = gl.capabilities.getMaxAnisotropy();
  const { dir, files, repeat, displacementScale } = PITCH_TEXTURES;
  const textures = useTexture({
    map: dir + files.map,
    normalMap: dir + files.normal,
    roughnessMap: dir + files.roughness,
    displacementMap: dir + files.displacement,
  });

  useMemo(() => {
    Object.entries(textures).forEach(([key, t]) => {
      const tex = t as THREE.Texture;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(repeat, repeat * (PITCH_L / PITCH_W));
      tex.anisotropy = maxAniso;
      tex.colorSpace = key === "map" ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      tex.needsUpdate = true;
    });
  }, [textures, repeat, maxAniso]);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, PITCH_CZ]}
      receiveShadow
    >
      <planeGeometry args={[PITCH_W, PITCH_L, 220, 220]} />
      <meshStandardMaterial
        {...textures}
        displacementScale={displacementScale}
        roughness={1}
        metalness={0}
        color={palette.pitch}
      />
    </mesh>
  );
}

export default function Pitch() {
  return (
    <group>
      {PITCH_TEXTURES.enabled ? <PbrPitch /> : <ProceduralPitch />}
      <MarkingsOverlay />
    </group>
  );
}
