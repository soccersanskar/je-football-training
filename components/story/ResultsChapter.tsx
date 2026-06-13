"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { outcomes, testimonials, affiliations } from "@/lib/content";

/**
 * CHAPTER IV — THE RESULTS.
 * The player is fully formed. We present development outcomes and an
 * immersive testimonial stage. NOTE: testimonials are clearly-marked
 * placeholders — the live site publishes none, so real quotes drop in here
 * without touching layout. Affiliations are real (shown on the live site).
 */
export default function ResultsChapter() {
  return (
    <section className="relative px-6 py-32 sm:px-12">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-4">Chapter IV — The Results</p>
        <h2 className="font-display text-4xl leading-[0.95] sm:text-6xl">
          DEVELOPMENT YOU
          <br />
          <span className="text-je-green">CAN SEE ON THE PITCH</span>
        </h2>
      </Reveal>

      {/* Outcome categories (framed around the real pillars) */}
      <div className="mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
        {outcomes.map((o, i) => (
          <Reveal key={o.label} delay={i * 0.06}>
            <div className="h-full bg-je-ink p-7">
              <p className="font-display text-2xl text-je-green">{o.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {o.metric}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Immersive testimonial stage */}
      <div className="mx-auto mt-24 max-w-5xl">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow">In Their Words</p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.1}>
              <figure className="relative h-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent p-8">
                <span className="font-display text-6xl leading-none text-je-green/30">
                  “
                </span>
                <blockquote className="-mt-4 text-base leading-relaxed text-white/80">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-white/8 pt-4">
                  <p className="font-display text-lg tracking-wide">{t.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                    {t.role}
                  </p>
                </figcaption>
                {t.placeholder && (
                  <span className="absolute right-4 top-4 rounded-full border border-je-green/30 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-je-green/70">
                    Sample
                  </span>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Affiliations — real club crests shown on the live site */}
      <Reveal className="mx-auto mt-24 max-w-5xl text-center">
        <p className="eyebrow mb-8">Experience Across The Game</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {affiliations.map((club) => (
            <div key={club.name} className="group flex flex-col items-center gap-2">
              <Image
                src={club.logo}
                alt={club.name}
                width={88}
                height={88}
                className="h-14 w-auto object-contain opacity-60 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 transition group-hover:text-white/60">
                {club.name}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs leading-relaxed text-white/35">
          Clubs reflect coach Jesus Enriquez's professional playing experience.
        </p>
      </Reveal>
    </section>
  );
}
