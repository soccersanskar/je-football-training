"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

/**
 * CHAPTER III — THE TRANSFORMATION.
 * In the 3D scene a player silhouette emerges and completes. Here, the
 * athlete's attributes visibly "level up" as they scroll into view — the
 * transformation made tangible.
 */
const ATTRIBUTES = [
  { label: "Speed", value: 94 },
  { label: "Technique", value: 91 },
  { label: "Confidence", value: 96 },
  { label: "Decision Making", value: 89 },
  { label: "Agility", value: 92 },
  { label: "Ball Mastery", value: 95 },
];

export default function TransformationChapter() {
  return (
    <section className="relative flex min-h-[160vh] items-center px-6 py-32 sm:px-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-je-ink/70 via-je-ink/10 to-transparent" />

      <div className="relative z-10 w-full max-w-xl">
        <Reveal>
          <p className="eyebrow mb-4">Chapter III — The Transformation</p>
          <h2 className="font-display text-4xl leading-[0.95] sm:text-6xl">
            WATCH A PLAYER
            <br />
            <span className="text-je-green">BECOME COMPLETE</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">
            Speed, technique and confidence don't arrive at once — they
            compound. Session after session, the attributes that define an
            elite footballer rise together until a complete player stands on
            the pitch.
          </p>
        </Reveal>

        <div className="mt-12 space-y-6">
          {ATTRIBUTES.map((attr, i) => (
            <motion.div
              key={attr.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-20%" }}
              variants={{
                hidden: {},
                show: { transition: { delayChildren: i * 0.1 } },
              }}
            >
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-sm uppercase tracking-[0.22em] text-white/80">
                  {attr.label}
                </span>
                <motion.span
                  className="font-display text-lg text-je-green"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { duration: 0.8 } },
                  }}
                >
                  {attr.value}
                </motion.span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-je-green-deep to-je-green-glow"
                  variants={{
                    hidden: { width: "0%" },
                    show: {
                      width: `${attr.value}%`,
                      transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-xs uppercase tracking-[0.3em] text-white/40">
            Attribute levels are illustrative of the development arc.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
