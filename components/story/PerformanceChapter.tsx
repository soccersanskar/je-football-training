"use client";

import { motion } from "framer-motion";

/**
 * CHAPTER V — THE PERFORMANCE.
 * Timed with the 3D strike: the ball is struck, the net ripples, the moment
 * lands. Minimal copy, maximum impact — the screen gets out of the way of
 * the goal.
 */
export default function PerformanceChapter() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 text-center">
      <div className="text-scrim" aria-hidden />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-30%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <p className="eyebrow mb-4">Chapter V — The Performance</p>
        <h2 className="font-display text-6xl leading-[0.9] sm:text-8xl md:text-9xl">
          THIS IS THE
          <br />
          <span className="text-je-green">MOMENT</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm uppercase tracking-[0.3em] text-white/60">
          Everything earned in training — delivered when it counts.
        </p>
      </motion.div>
    </section>
  );
}
