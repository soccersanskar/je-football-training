import Link from "next/link";
import { brand, nav } from "@/lib/content";
import Logo from "./Logo";

/** Site footer — brand, navigation, social, booking CTA. */
export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-je-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
            {brand.tagline} Individualized football development with
            professional footballer {brand.coach}. {brand.location}.
          </p>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Explore</h4>
          <ul className="space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-sm text-white/60 transition hover:text-je-green"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Connect</h4>
          <ul className="space-y-2.5">
            <li>
              <a
                href={brand.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 transition hover:text-je-green"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={brand.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 transition hover:text-je-green"
              >
                YouTube
              </a>
            </li>
            <li>
              <a
                href={brand.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 transition hover:text-je-green"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                href={brand.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 transition hover:text-je-green"
              >
                Facebook
              </a>
            </li>
          </ul>
          <Link
            href="/booking"
            className="mt-6 inline-block rounded-full bg-je-green px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-je-ink transition hover:bg-je-green-glow"
          >
            Book a Session
          </Link>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-[11px] uppercase tracking-[0.2em] text-white/30 sm:flex-row sm:px-8">
          <span>
            © {new Date().getFullYear()} {brand.name}
          </span>
          <span>{brand.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
