import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageShell from "@/components/ui/PageShell";
import Reveal from "@/components/ui/Reveal";
import { about, brand, affiliations } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "JE Football Training is led by professional footballer Jesus Enriquez, dedicated to individualized player development since 2018. Bay Area, California.",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="The Coach"
      title={
        <>
          COACHED BY A
          <br />
          <span className="text-je-green">PROFESSIONAL</span>
        </>
      }
      intro={about.headline}
    >
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-white/70">
            {about.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { k: "2018", v: "Coaching since" },
              { k: "8+ yrs", v: "Training experience" },
              { k: "Bay Area", v: "California" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-white/8 bg-white/[0.02] p-5"
              >
                <p className="font-display text-3xl text-je-green">{s.k}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-white/8 bg-gradient-to-b from-je-green/[0.06] to-transparent p-8">
            <p className="eyebrow mb-4">Coaching Philosophy</p>
            <div className="space-y-6">
              {about.philosophy.map((ph) => (
                <div key={ph.title}>
                  <h3 className="font-display text-xl tracking-wide text-white">
                    {ph.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    {ph.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Playing experience */}
      <Reveal className="mt-20">
        <p className="eyebrow mb-6">Professional Playing Experience</p>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-8">
          {affiliations.map((c) => (
            <div key={c.name} className="group flex flex-col items-center gap-2">
              <Image
                src={c.logo}
                alt={c.name}
                width={88}
                height={88}
                className="h-16 w-auto object-contain opacity-70 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-20 rounded-3xl border border-je-green/20 bg-je-green/[0.04] p-10 text-center">
        <h3 className="font-display text-3xl sm:text-4xl">
          “{brand.tagline}”
        </h3>
        <Link
          href="/booking"
          className="mt-8 inline-block rounded-full bg-je-green px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-je-ink transition hover:bg-je-green-glow"
        >
          Train With JE
        </Link>
      </Reveal>
    </PageShell>
  );
}
