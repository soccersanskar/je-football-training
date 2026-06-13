"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { nav, brand } from "@/lib/content";
import { useIntro } from "@/components/intro/IntroProvider";
import Logo from "./Logo";
import { cn } from "@/lib/cn";

/**
 * Top navigation. On the homepage it stays hidden until the intro cinematic
 * resolves (`forceVisible={false}`), preserving the "you're not on a website"
 * illusion. On every other page it's visible immediately.
 */
export default function Navigation({
  forceVisible = false,
}: {
  forceVisible?: boolean;
}) {
  const { phase } = useIntro();
  const visible = forceVisible || phase === "done";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
            scrolled
              ? "border-b border-white/5 bg-je-ink/70 backdrop-blur-xl"
              : "bg-transparent"
          )}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
            <Logo />

            <div className="hidden items-center gap-8 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative text-xs font-medium uppercase tracking-[0.18em] text-white/70 transition hover:text-white"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-je-green transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/booking"
                className="hidden rounded-full bg-je-green px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-je-ink transition hover:bg-je-green-glow sm:inline-block"
              >
                Book a Session
              </Link>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 md:hidden"
              >
                <span className="relative block h-3 w-5">
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-px w-full bg-white transition-all",
                      open && "top-1.5 rotate-45"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-1.5 h-px w-full bg-white transition-all",
                      open && "opacity-0"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-px w-full bg-white transition-all",
                      open && "bottom-1.5 -rotate-45"
                    )}
                  />
                </span>
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-white/5 bg-je-ink/95 backdrop-blur-xl md:hidden"
              >
                <div className="flex flex-col gap-1 px-6 py-5">
                  {nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="py-2 text-sm uppercase tracking-[0.2em] text-white/80"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/booking"
                    onClick={() => setOpen(false)}
                    className="mt-3 rounded-full bg-je-green px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-je-ink"
                  >
                    Book a Session
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
