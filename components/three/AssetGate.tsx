"use client";

import { useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";
import { introState } from "@/lib/intro";

/**
 * Bridges drei's global LoadingManager progress into the intro state so the
 * HTML intro can show a preload %, and so we know when the GLBs are fully
 * loaded (no pop-in after the page settles).
 */
export default function AssetGate() {
  const { progress, active, total } = useProgress();
  const started = useRef(false);

  useEffect(() => {
    if (total > 0) started.current = true;
    introState.assetsProgress = Math.round(progress);
    if (started.current && !active && progress >= 100) {
      introState.assetsReady = true;
    }
  }, [progress, active, total]);

  return null;
}
