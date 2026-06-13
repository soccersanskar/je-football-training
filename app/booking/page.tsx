import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import Reveal from "@/components/ui/Reveal";
import { brand, sessionFormats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Reserve individualized football training with Jesus Enriquez. See live availability and book on the JE Football Training scheduling platform.",
};

const STEPS = [
  {
    n: "01",
    title: "Choose your format",
    body: "1-on-1, small group, or position-specific — pick what matches your goals.",
  },
  {
    n: "02",
    title: "Pick a time",
    body: "Open the scheduling platform to see live availability and reserve a slot.",
  },
  {
    n: "03",
    title: "Tell us your goals",
    body: "Share where you are and where you want to be so the session is built for you.",
  },
  {
    n: "04",
    title: "Train with JE",
    body: "Show up ready to work. Every rep is focused on your next level.",
  },
];

export default function BookingPage() {
  return (
    <PageShell
      eyebrow="Reserve Your Spot"
      title={
        <>
          BOOK A
          <br />
          <span className="text-je-green">SESSION</span>
        </>
      }
      intro="Booking is fast. Choose a format, see live availability on our scheduling platform, and lock in your session."
    >
      {/* Primary CTA */}
      <Reveal>
        <a
          href={brand.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-je-green/25 bg-gradient-to-br from-je-green/[0.12] to-transparent p-10 sm:flex-row sm:items-center"
        >
          <div>
            <p className="eyebrow mb-2">Live Availability</p>
            <h2 className="font-display text-4xl sm:text-5xl">
              OPEN THE BOOKING PLATFORM
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/60">
              Secure scheduling powered by UpperHand. See open times and
              reserve in a couple of taps.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-je-green px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-je-ink transition group-hover:bg-je-green-glow">
            Book Now ↗
          </span>
        </a>
      </Reveal>

      {/* Steps */}
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-7">
              <span
                className="font-display text-5xl text-transparent"
                style={{ WebkitTextStroke: "1px rgba(0,230,118,0.5)" }}
              >
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-xl tracking-wide">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Format reminder */}
      <Reveal className="mt-16">
        <h2 className="font-display text-3xl sm:text-4xl">CHOOSE A FORMAT</h2>
      </Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {sessionFormats.map((f, i) => (
          <Reveal key={f.id} delay={i * 0.08}>
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-7 transition hover:border-je-green/40 hover:bg-je-green/[0.04]"
            >
              <h3 className="font-display text-2xl tracking-wide">{f.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                {f.summary}
              </p>
              <span className="mt-5 text-xs uppercase tracking-[0.2em] text-je-green">
                Select →
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center text-xs uppercase tracking-[0.3em] text-white/40">
        {brand.location} · {brand.tagline}
      </Reveal>
    </PageShell>
  );
}
