"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { experience, CHAPTERS } from "@/lib/experience";
import { useIntro } from "@/components/intro/IntroProvider";
import { cn } from "@/lib/cn";

/**
 * Fixed left rail marking the four acts (Dream → Train → Transform → Perform).
 * A connecting track fills with scroll progress; the active marker pulses;
 * hover reveals the label; clicking scrolls smoothly to that chapter.
 */
const MARKERS: { id: string; label: string; at: number }[] = [
  { id: "dream", label: "Dream", at: CHAPTERS.dream[0] },
  { id: "train", label: "Train", at: CHAPTERS.training[0] },
  { id: "transform", label: "Transform", at: CHAPTERS.transformation[0] },
  { id: "perform", label: "Perform", at: CHAPTERS.performance[0] },
];

const FIRST = MARKERS[0].at;

export default function StoryProgress() {
  const { phase } = useIntro();
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setP(experience.progress);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (phase !== "done") return null;

  const scrollTo = (at: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = at * max;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } })
      .__lenis;
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Track fill across [FIRST .. 1]
  const fill = Math.max(0, Math.min(1, (p - FIRST) / (1 - FIRST)));

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="fixed left-7 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative flex flex-col gap-9">
        {/* track */}
        <span className="absolute left-[5px] top-1 bottom-1 w-px bg-white/12" />
        <motion.span
          className="absolute left-[5px] top-1 w-px origin-top bg-gradient-to-b from-je-green to-je-green-deep shadow-[0_0_10px_rgba(0,230,118,0.6)]"
          style={{ height: `calc(${fill * 100}% - 0px)` }}
        />

        {MARKERS.map((m, i) => {
          const next = MARKERS[i + 1]?.at ?? 1;
          const active = p >= m.at && p < next;
          const done = p >= next;
          return (
            <button
              key={m.id}
              onClick={() => scrollTo(m.at + 0.001)}
              className="group relative flex items-center gap-4"
              aria-label={`Go to ${m.label}`}
            >
              <span className="relative grid h-[11px] w-[11px] place-items-center">
                {active && (
                  <motion.span
                    layoutId="story-pulse"
                    className="absolute inset-0 rounded-full bg-je-green/30"
                    animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span
                  className={cn(
                    "relative h-[9px] w-[9px] rounded-full transition-all duration-500",
                    active
                      ? "scale-125 bg-je-green shadow-[0_0_12px_2px_rgba(0,230,118,0.7)]"
                      : done
                      ? "bg-je-green/70"
                      : "bg-white/25 group-hover:bg-white/60"
                  )}
                />
              </span>
              <span
                className={cn(
                  "whitespace-nowrap text-[10px] uppercase tracking-[0.3em] transition-all duration-300",
                  active
                    ? "translate-x-0 text-white opacity-100"
                    : "-translate-x-2 text-white/45 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                )}
              >
                {m.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
