"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { mission } from "@/lib/content";

/**
 * CHAPTER I — THE DREAM.
 * The ball begins to move; the camera lifts. Ambition and possibility in
 * restrained, emotional copy — with a glowing green accent word, an animated
 * underline, and the mission framed as a premium frosted-glass card.
 */
export default function DreamChapter() {
  return (
    <section className="relative flex min-h-[160vh] flex-col justify-between px-6 py-32 sm:px-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-je-base/40 via-transparent to-je-base/40" />

      <Reveal className="relative z-10 max-w-xl">
        <p className="eyebrow mb-4">Chapter I — The Dream</p>
        <h2 className="font-display text-4xl leading-[0.95] sm:text-6xl">
          IT STARTS WITH A
          <br />
          <span className="text-glow-green">SINGLE TOUCH</span>
        </h2>
        {/* animated accent bar */}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-6 block h-[3px] w-40 origin-left rounded-full bg-gradient-to-r from-je-green to-transparent shadow-[0_0_16px_rgba(0,230,118,0.6)]"
        />
      </Reveal>

      <div className="relative z-10 flex justify-end">
        <Reveal delay={0.1} className="w-full max-w-md">
          <div className="glass-card p-8 text-right sm:p-9">
            <p className="mb-4 text-right text-[11px] uppercase tracking-[0.35em] text-je-green/80">
              The Mission
            </p>
            <p className="text-lg leading-relaxed text-white/85 sm:text-2xl">
              {mission.statement}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-white/50">
              Before the trophies, the academies, the floodlit nights — there is
              a player, a ball, and a decision to be better than yesterday. This
              is where that decision is honoured.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl py-10">
        <div className="text-scrim !h-[160%]" aria-hidden />
        <Reveal delay={0.2} className="relative text-center">
          <p className="font-display text-2xl leading-tight tracking-wide text-white sm:text-4xl">
            “MAXIMIZE YOUR FULL POTENTIAL.”
          </p>
          <span className="mt-3 block text-[11px] uppercase tracking-[0.4em] text-je-green">
            The JE promise
          </span>
        </Reveal>
      </div>
    </section>
  );
}
