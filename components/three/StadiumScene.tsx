"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

import CameraRig from "./CameraRig";
import StageLighting from "./StageLighting";
import AssetGate from "./AssetGate";
import FluidBackground from "./environment/FluidBackground";
import Floodlights from "./environment/Floodlights";
import Atmosphere from "./environment/Atmosphere";
import SoccerBall from "./objects/SoccerBall";
import Goal from "./objects/Goal";
import TrajectoryArc from "./objects/TrajectoryArc";
import { palette } from "@/lib/palette";

/**
 * The whole 3D stage. A single fixed, full-viewport, TRANSPARENT canvas.
 * The backdrop is now a flowing GLSL fluid gradient (FluidBackground); the
 * ball is grounded by a soft contact-shadow sprite (no ground plane), so we
 * run without realtime shadow maps. Ball-tracking 3-point rig (StageLighting),
 * atmospheric floodlight towers, fog depth-fade, and procedural reflections.
 */
export default function StadiumScene() {
  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.5]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      camera={{ position: [0, 2, 9], fov: 38, near: 0.1, far: 200 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0); // transparent fallback (fluid quad fills)
      }}
    >
      <Suspense fallback={null}>
        {/* soft fills — never let anything go pure black once lit */}
        <hemisphereLight args={["#1c4530", palette.pitchDeep, 0.32]} />
        <ambientLight intensity={0.06} />

        <CameraRig />
        <StageLighting />
        <AssetGate />

        <FluidBackground />
        <Floodlights />
        <Atmosphere />
        <TrajectoryArc />

        {/* GLB models load in their own Suspense so the floodlit reveal
            isn't blocked waiting on them (no full-scene stall). */}
        <Suspense fallback={null}>
          <SoccerBall />
          <Goal />
        </Suspense>

        {/* Procedural reflections for the ball + posts (no external HDR). */}
        <Environment resolution={128} frames={1}>
          <Lightformer
            intensity={2.2}
            position={[0, 12, 6]}
            scale={[12, 5, 1]}
            color="#eafff4"
          />
          <Lightformer
            intensity={1.1}
            position={[-12, 6, -10]}
            scale={[6, 6, 1]}
            color={palette.green}
          />
          <Lightformer
            intensity={1.1}
            position={[12, 6, -10]}
            scale={[6, 6, 1]}
            color={palette.green}
          />
          <Lightformer
            intensity={0.6}
            position={[0, 2, 12]}
            scale={[10, 6, 1]}
            color="#0a2a1a"
          />
        </Environment>

        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
}
