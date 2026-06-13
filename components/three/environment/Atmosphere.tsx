"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { introState } from "@/lib/intro";
import { experience } from "@/lib/experience";
import { fogDensity } from "@/lib/choreography";
import { palette } from "@/lib/palette";

/**
 * Stadium atmosphere: exponential fog that dissolves the far pitch into the
 * background gradient (its colour matches the CSS pitch-deep so there's no
 * horizon seam), plus a field of slow floating dust motes catching the
 * floodlights. The canvas is transparent — we set fog but NOT a scene
 * background, so the 3D composites over the layered CSS stage.
 */

const COUNT = 850;

export default function Atmosphere() {
  const { scene } = useThree();
  const points = useRef<THREE.Points>(null);
  const fog = useRef(new THREE.FogExp2(new THREE.Color(palette.pitchDeep).getHex(), 0));

  useMemo(() => {
    scene.fog = fog.current;
    // No scene.background — keep the canvas transparent over the CSS gradient.
    scene.background = null;
  }, [scene]);

  const { geometry, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const spd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 1] = Math.random() * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 90 - 14;
      spd[i] = 0.2 + Math.random() * 0.6;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: geo, speeds: spd };
  }, []);

  const sprite = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(225,255,242,1)");
    g.addColorStop(0.3, "rgba(150,255,200,0.5)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame((_, dt) => {
    fog.current.density = introState.reveal * fogDensity(experience.progress);

    if (!points.current) return;
    const mat = points.current.material as THREE.PointsMaterial;
    mat.opacity = introState.reveal * 0.8;

    const pos = points.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      let y = pos.getY(i) + speeds[i] * dt * 0.55;
      if (y > 20) y = 0;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;

    points.current.position.x = experience.pointer.x * 1.1;
    points.current.rotation.y += dt * 0.01;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        map={sprite}
        size={0.12}
        sizeAttenuation
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#a6ffd0"
      />
    </points>
  );
}
