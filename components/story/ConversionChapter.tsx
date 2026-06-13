"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { brand } from "@/lib/content";

/**
 * FINAL CONVERSION MOMENT.
 * After the goal, the experience resolves into its single most important
 * job: turning an inspired visitor into a booked session.
 */
export default function ConversionChapter() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* radial green wash to lift the CTA off the pitch */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(0,230,118,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-je-ink to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl"
      >
        <p className="eyebrow mb-5">Your Turn</p>
        <h2 className="font-display text-5xl leading-[0.92] sm:text-7xl md:text-8xl">
          START YOUR
          <br />
          <span className="text-je-green">DEVELOPMENT JOURNEY</span>
        </h2>
        <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-white/65">
          Every great player started somewhere. Train with professional
          footballer {brand.coach} and find out how far focused, individualized
          work can take you.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/booking"
            className="group relative w-full overflow-hidden rounded-full bg-je-green px-9 py-4 text-sm font-bold uppercase tracking-[0.18em] text-je-ink transition hover:bg-je-green-glow sm:w-auto"
          >
            <span className="relative z-10">Book a Session</span>
          </Link>
          <Link
            href="/programs"
            className="w-full rounded-full border border-white/20 px-9 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:border-je-green hover:text-je-green sm:w-auto"
          >
            View Programs
          </Link>
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-white/40">
          {brand.location} · {brand.tagline}
        </p>
      </motion.div>
    </section>
  );
}
