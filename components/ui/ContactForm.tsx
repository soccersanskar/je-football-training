"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/lib/content";

/**
 * Contact form. Front-end only by design — wire `onSubmit` to your provider
 * (Formspree, Resend, an API route, etc.) when ready. Until then it captures
 * input and shows a graceful confirmation, and offers booking as the direct
 * path.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-10 text-center"
          >
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-je-green/15 text-2xl text-je-green">
              ✓
            </div>
            <h3 className="font-display text-2xl">MESSAGE READY</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm text-white/60">
              Thanks for reaching out. For the fastest response, book a session
              directly — live availability is on our scheduling platform.
            </p>
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-je-green px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-je-ink"
            >
              Book a Session
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Player / Parent Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Phone (optional)" name="phone" type="tel" />
              <Field label="Player Age / Level" name="level" />
            </div>
            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.25em] text-white/50">
                What are your goals?
              </label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-je-green"
                placeholder="Tell us about the player and what you're hoping to achieve…"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-je-green px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-je-ink transition hover:bg-je-green-glow"
            >
              Send Message
            </button>
            <p className="text-center text-[11px] text-white/35">
              Prefer to book straight away? Use the scheduling platform on the
              Booking page.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] uppercase tracking-[0.25em] text-white/50">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-je-green"
      />
    </div>
  );
}
