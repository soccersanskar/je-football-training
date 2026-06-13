import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/ui/PageShell";
import Reveal from "@/components/ui/Reveal";
import { testimonials, outcomes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Player and parent experiences with JE Football Training, plus the development outcomes the program is built to deliver.",
};

export default function TestimonialsPage() {
  return (
    <PageShell
      eyebrow="In Their Words"
      title={
        <>
          BUILT ON
          <br />
          <span className="text-je-green">RESULTS</span>
        </>
      }
      intro="The outcomes below reflect the four pillars every athlete trains. Player and parent testimonials slot in here as they're collected."
    >
      {/* Outcomes */}
      <div className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Testimonials */}
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.08}>
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

      <Reveal className="mt-16 rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-sm leading-relaxed text-white/50">
        Are you a JE player or parent? We'd love to feature your story — reach
        out via the{" "}
        <Link href="/contact" className="text-je-green underline">
          contact page
        </Link>
        .
      </Reveal>
    </PageShell>
  );
}
