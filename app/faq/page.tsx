import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/ui/PageShell";
import Reveal from "@/components/ui/Reveal";
import FaqAccordion from "@/components/ui/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about JE Football Training — who it's for, session formats, what's covered, location and booking.",
};

export default function FaqPage() {
  return (
    <PageShell
      eyebrow="Good To Know"
      title={
        <>
          QUESTIONS,
          <br />
          <span className="text-je-green">ANSWERED</span>
        </>
      }
      intro="Everything you need before your first session. Still unsure? Reach out — we're happy to help you find the right path."
    >
      <Reveal>
        <FaqAccordion />
      </Reveal>

      <Reveal className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-je-green/20 bg-je-green/[0.04] p-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base text-white/70">
          Still have a question? We'll get you an answer.
        </p>
        <Link
          href="/contact"
          className="rounded-full bg-je-green px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-je-ink transition hover:bg-je-green-glow"
        >
          Contact Us
        </Link>
      </Reveal>
    </PageShell>
  );
}
