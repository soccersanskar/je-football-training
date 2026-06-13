"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { introState } from "@/lib/intro";
import { experience } from "@/lib/experience";

type Phase = "black" | "igniting" | "revealed" | "done";

const IntroCtx = createContext<{ phase: Phase; skip: () => void }>({
  phase: "black",
  skip: () => {},
});

export const useIntro = () => useContext(IntroCtx);

/**
 * Orchestrates the opening cinematic with a GSAP timeline:
 *   black → floodlight 1 ignites (with a flicker) → 2 → 3 → 4 →
 *   fog, grass, particles and ball fade up → headline earns its entrance.
 *
 * Writes light/reveal values into `introState` for the 3D scene and exposes
 * the current phase to React so the hero copy can time itself. Honours
 * prefers-reduced-motion and offers a skip control.
 */
export default function IntroProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("black");
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [loadPct, setLoadPct] = useState(0);

  const finish = () => {
    introState.lights = [1, 1, 1, 1];
    introState.reveal = 1;
    introState.complete = true;
    introState.assetsReady = true;
    experience.introComplete = true;
    if (overlay.current) overlay.current.style.opacity = "0";
    setPhase("done");
  };

  // Surface GLB preload progress during the intro.
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setLoadPct(introState.assetsProgress);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      finish();
      return;
    }

    const proxy = { l0: 0, l1: 0, l2: 0, l3: 0, reveal: 0, black: 1 };
    const apply = () => {
      introState.lights = [proxy.l0, proxy.l1, proxy.l2, proxy.l3];
      introState.reveal = proxy.reveal;
      if (overlay.current)
        overlay.current.style.opacity = String(proxy.black);
    };

    const ignite = (key: "l0" | "l1" | "l2" | "l3") =>
      gsap
        .timeline()
        // a quick stutter as the lamp strikes...
        .to(proxy, { [key]: 0.35, duration: 0.12, ease: "power1.in" })
        .to(proxy, { [key]: 0.08, duration: 0.08 })
        .to(proxy, { [key]: 0.5, duration: 0.1 })
        .to(proxy, { [key]: 0.15, duration: 0.08 })
        // ...then settles to full power.
        .to(proxy, { [key]: 1, duration: 0.8, ease: "power2.out" });

    const master = gsap.timeline({
      onUpdate: apply,
      onComplete: () => {
        introState.complete = true;
        experience.introComplete = true;
        setPhase("done");
      },
    });

    master
      .to({}, { duration: 0.8 }) // hold on darkness
      .add(ignite("l0"), 0.8)
      .add(ignite("l1"), 1.25)
      .add(ignite("l2"), 1.7)
      .add(ignite("l3"), 2.1)
      // Reveal the world as the lights build.
      .to(proxy, { reveal: 1, duration: 2.6, ease: "power2.inOut" }, 1.0)
      .to(proxy, { black: 0, duration: 1.6, ease: "power2.inOut" }, 1.2)
      .add(() => setPhase("igniting"), 0.9)
      .add(() => setPhase("revealed"), 2.6);

    tl.current = master;
    return () => {
      master.kill();
    };
  }, []);

  const skip = () => {
    tl.current?.kill();
    finish();
  };

  return (
    <IntroCtx.Provider value={{ phase, skip }}>
      {/* The darkness. Sits above the canvas, fades as the world ignites. */}
      <div
        ref={overlay}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 bg-black"
        style={{ opacity: 1 }}
      />
      {phase !== "done" && loadPct < 100 && (
        <div className="pointer-events-none fixed bottom-7 left-1/2 z-40 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white/35">
          Preparing the pitch · {loadPct}%
        </div>
      )}
      {phase !== "done" && (
        <button
          onClick={skip}
          className="fixed bottom-6 right-6 z-40 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/60 backdrop-blur transition hover:text-white"
        >
          Skip intro
        </button>
      )}
      {children}
    </IntroCtx.Provider>
  );
}
