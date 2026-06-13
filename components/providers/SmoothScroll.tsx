"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { experience } from "@/lib/experience";

/**
 * Wraps the app in Lenis smooth scrolling and continuously publishes scroll
 * progress / velocity and pointer position into the `experience` singleton,
 * which the 3D canvas reads each frame. Honours prefers-reduced-motion.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    experience.reducedMotion = prefersReduced;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      syncTouch: false,
      touchMultiplier: 1.2,
    });

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      experience.progress = max > 0 ? window.scrollY / max : 0;
    };

    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      experience.velocity = velocity;
      updateProgress();
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onPointer = (e: PointerEvent) => {
      experience.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      experience.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    // Expose for nav anchor scrolling.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", updateProgress);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
