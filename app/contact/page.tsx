import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ui/ContactForm";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with JE Football Training in the Bay Area. Reach out about individualized sessions or follow along on social.",
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Get In Touch"
      title={
        <>
          LET'S BUILD YOUR
          <br />
          <span className="text-je-green">NEXT LEVEL</span>
        </>
      }
      intro="Tell us about the player and your goals, and we'll help you find the right path. Based in the Bay Area, California."
    >
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-7">
              <p className="eyebrow mb-3">Location</p>
              <p className="font-display text-2xl">{brand.location}</p>
              <p className="mt-2 text-sm text-white/55">
                Contact us for current training locations and availability.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-7">
              <p className="eyebrow mb-3">Follow</p>
              <ul className="space-y-2.5">
                {[
                  ["Instagram", brand.social.instagram],
                  ["YouTube", brand.social.youtube],
                  ["TikTok", brand.social.tiktok],
                  ["Facebook", brand.social.facebook],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between text-sm text-white/70 transition hover:text-je-green"
                    >
                      {label}
                      <span className="text-je-green opacity-0 transition group-hover:opacity-100">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-je-green/20 bg-je-green/[0.05] p-7 transition hover:bg-je-green/[0.09]"
            >
              <p className="font-display text-2xl">Book Directly →</p>
              <p className="mt-2 text-sm text-white/60">
                See live availability and reserve a session on our scheduling
                platform.
              </p>
            </a>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
