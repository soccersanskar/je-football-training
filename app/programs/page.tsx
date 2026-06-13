import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/ui/PageShell";
import Reveal from "@/components/ui/Reveal";
import { pillars, sessionFormats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "The four pillars of JE Football Training: technical ability, tactical awareness, physical conditioning and mental strength — plus 1-on-1, small group and position-specific formats.",
};

export default function ProgramsPage() {
  return (
    <PageShell
      eyebrow="What We Build"
      title={
        <>
          THE FOUR PILLARS OF
          <br />
          <span className="text-je-green">PLAYER DEVELOPMENT</span>
        </>
      }
      intro="Every JE session is individualized and focused — built around four pillars and weighted to the athlete in front of the coach. Below is the full development blueprint, from objectives to outcomes."
    >
      {/* Pillars in depth */}
      <div className="space-y-6">
        {pillars.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05}>
            <article className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02]">
              <div className="grid gap-0 md:grid-cols-[260px_1fr]">
                <div
                  className="flex flex-col justify-between p-8"
                  style={{
                    background: `linear-gradient(160deg, ${p.accent}14, transparent)`,
                  }}
                >
                  <span
                    className="font-display text-6xl text-transparent"
                    style={{ WebkitTextStroke: `1px ${p.accent}` }}
                  >
                    {p.index}
                  </span>
                  <div>
                    <h2 className="font-display text-3xl tracking-wide">
                      {p.name}
                    </h2>
                    <p
                      className="mt-1 text-xs uppercase tracking-[0.2em]"
                      style={{ color: p.accent }}
                    >
                      {p.tagline}
                    </p>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-base leading-relaxed text-white/70">
                    {p.description}
                  </p>

                  <div className="mt-7 grid gap-7 sm:grid-cols-2">
                    <Detail title="Development Objectives" items={p.objectives} accent={p.accent} />
                    <Detail title="Benefits" items={p.benefits} accent={p.accent} />
                  </div>

                  <div className="mt-6">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                      Skill Focus
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.skillFocus.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border px-3 py-1 text-xs text-white/80"
                          style={{ borderColor: `${p.accent}40` }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-white/8 bg-white/[0.02] p-4">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                      Training Outcomes
                    </p>
                    <ul className="mt-2 space-y-1">
                      {p.outcomes.map((o) => (
                        <li
                          key={o}
                          className="flex items-center gap-2 text-sm text-white/75"
                        >
                          <span style={{ color: p.accent }}>→</span>
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Formats */}
      <Reveal className="mt-24">
        <h2 className="font-display text-3xl sm:text-5xl">TRAINING FORMATS</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
          Choose the structure that matches your goals. Pricing and live
          availability are handled through our booking platform.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {sessionFormats.map((f, i) => (
          <Reveal key={f.id} delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-7 transition hover:border-je-green/40">
              <h3 className="font-display text-2xl tracking-wide">{f.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
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

      <Reveal className="mt-20 flex flex-col items-start gap-4 rounded-3xl border border-je-green/20 bg-je-green/[0.04] p-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-3xl">READY TO START?</h3>
          <p className="mt-2 text-sm text-white/60">
            Book a session and we'll build the right path for you.
          </p>
        </div>
        <Link
          href="/booking"
          className="rounded-full bg-je-green px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-je-ink transition hover:bg-je-green-glow"
        >
          Book a Session
        </Link>
      </Reveal>
    </PageShell>
  );
}

function Detail({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: string;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
        {title}
      </p>
      <ul className="mt-2 space-y-1.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-sm leading-snug text-white/75">
            <span style={{ color: accent }}>•</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
