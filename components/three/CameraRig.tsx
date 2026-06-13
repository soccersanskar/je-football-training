"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { experience, damp } from "@/lib/experience";
import { cameraRig } from "@/lib/choreography";
import { introState } from "@/lib/intro";

/**
 * Drives the camera along the choreographed path each frame, with damped
 * interpolation for buttery motion and a subtle pointer-driven parallax.
 * During the intro the camera holds a slow, reverent push-in toward the ball.
 */
const _target = new THREE.Vector3();

export default function CameraRig() {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 0.5, 0));

  useFrame((_, dt) => {
    const p = experience.progress;
    const { position, target } = cameraRig(p);

    // Gentle intro push-in: ease the camera forward as the scene reveals.
    const introPush = (1 - introState.reveal) * 1.5;

    const px = experience.pointer.x * 0.35 * (1 - Math.min(1, p / 0.12));
    const py = -experience.pointer.y * 0.2 * (1 - Math.min(1, p / 0.12));

    camera.position.x = damp(camera.position.x, position[0] + px, 3, dt);
    camera.position.y = damp(camera.position.y, position[1] + py, 3, dt);
    camera.position.z = damp(
      camera.position.z,
      position[2] + introPush,
      3,
      dt
    );

    _target.set(target[0], target[1], target[2]);
    look.current.x = damp(look.current.x, _target.x, 3, dt);
    look.current.y = damp(look.current.y, _target.y, 3, dt);
    look.current.z = damp(look.current.z, _target.z, 3, dt);
    camera.lookAt(look.current);
  });

  return null;
}
