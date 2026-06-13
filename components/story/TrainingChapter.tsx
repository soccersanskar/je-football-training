"use client";

import Reveal from "@/components/ui/Reveal";
import { pillars, sessionFormats } from "@/lib/content";

/**
 * CHAPTER II — THE TRAINING.
 * The ball rolls into a professional training environment. Rather than
 * generic cards, the four real development pillars are presented as
 * full-width immersive panels with depth: objectives, skill focus, benefits.
 */
export default function TrainingChapter() {
  return (
    <section className="relative px-6 py-32 sm:px-12">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-4">Chapter II — The Training</p>
        <h2 className="font-display text-4xl leading-[0.95] sm:text-6xl">
          INDIVIDUALIZED.
          <br />
          <span className="text-je-green">FOCUSED. RELENTLESS.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60">
          Every session is built around four pillars — weighted to the athlete
          in front of the coach. No filler. No generic drills. Only the work
          that moves you to the next level.
        </p>
      </Reveal>

      <div className="mx-auto mt-24 flex max-w-6xl flex-col gap-28">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.id}
            className={`grid items-center gap-10 md:grid-cols-2 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal>
              <span
                className="font-display text-[7rem] leading-none text-transparent sm:text-[10rem]"
                style={{ WebkitTextStroke: `1px ${pillar.accent}40` }}
              >
                {pillar.index}
              </span>
              <h3 className="-mt-6 font-display text-3xl tracking-wide sm:text-5xl">
                {pillar.name}
              </h3>
              <p
                className="mt-2 text-sm uppercase tracking-[0.25em]"
                style={{ color: pillar.accent }}
              >
                {pillar.tagline}
              </p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">
                {pillar.description}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-7 backdrop-blur-sm">
                <DetailBlock title="Development Objectives" items={pillar.objectives} accent={pillar.accent} />
                <DetailBlock title="Skill Focus" items={pillar.skillFocus} accent={pillar.accent} pills />
                <DetailBlock title="Benefits" items={pillar.benefits} accent={pillar.accent} />
                <div className="mt-5 border-t border-white/8 pt-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                    Training Outcomes
                  </p>
                  <ul className="mt-2 space-y-1">
                    {pillar.outcomes.map((o) => (
                      <li key={o} className="flex items-center gap-2 text-sm text-white/75">
                        <span style={{ color: pillar.accent }}>→</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>

      {/* Session formats */}
      <Reveal className="mx-auto mt-32 max-w-3xl text-center">
        <p className="eyebrow mb-3">The Methodology</p>
        <h3 className="font-display text-3xl sm:text-5xl">CHOOSE YOUR PATH</h3>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/55">
          The right format depends on your goals. Every path runs through the
          same four pillars — the difference is intensity, competition and
          focus.
        </p>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
        {sessionFormats.map((f, i) => (
          <Reveal key={f.id} delay={i * 0.08}>
            <div className="group h-full rounded-2xl border border-white/8 bg-white/[0.02] p-7 transition hover:border-je-green/40 hover:bg-je-green/[0.04]">
              <h4 className="font-display text-2xl tracking-wide">{f.name}</h4>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {f.summary}
              </p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-je-green">
                Best for
              </p>
              <p className="mt-1 text-sm text-white/70">{f.bestFor}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function DetailBlock({
  title,
  items,
  accent,
  pills = false,
}: {
  title: string;
  items: string[];
  accent: string;
  pills?: boolean;
}) {
  return (
    <div className="mb-5">
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
        {title}
      </p>
      {pills ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {items.map((it) => (
            <span
              key={it}
              className="rounded-full border px-3 py-1 text-xs text-white/80"
              style={{ borderColor: `${accent}40` }}
            >
              {it}
            </span>
          ))}
        </div>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {items.map((it) => (
            <li key={it} className="flex gap-2 text-sm leading-snug text-white/75">
              <span style={{ color: accent }}>•</span>
              {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
