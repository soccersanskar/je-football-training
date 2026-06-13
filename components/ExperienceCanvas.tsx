"use client";

import dynamic from "next/dynamic";

/**
 * Fixed, full-viewport 3D stage that lives behind the scrolling story.
 * Loaded client-only (R3F has no meaningful SSR) so the rest of the page —
 * and Lighthouse — isn't blocked on WebGL.
 */
const StadiumScene = dynamic(() => import("@/components/three/StadiumScene"), {
  ssr: false,
  loading: () => null,
});

export default function ExperienceCanvas() {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
      {/* Background layer: layered gradient + breathing floodlit glow */}
      <div className="stage-bg pointer-events-none absolute inset-0" />
      {/* Transparent WebGL stage composites over the gradient */}
      <StadiumScene />
      {/* filmic vignette over the whole stage */}
      <div className="vignette pointer-events-none absolute inset-0" />
    </div>
  );
}
