"use client";

import { motion } from "framer-motion";
import { useIntro } from "@/components/intro/IntroProvider";
import { mission, brand } from "@/lib/content";

/**
 * CHAPTER 0 — THE REVEAL.
 * The headline is withheld until the intro cinematic resolves, so it feels
 * earned. Until then the viewport is pure stadium: darkness giving way to
 * floodlights, fog and the lone ball at midfield.
 */
export default function HeroChapter() {
  const { phase } = useIntro();
  const show = phase === "revealed" || phase === "done";

  return (
    <section className="relative flex h-screen flex-col items-center justify-center px-6 text-center">
      {/* readability scrims over the moving fluid backdrop */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-je-ink/70 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-[26%] h-[42vh] w-[min(900px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-je-ink/45 blur-3xl" />

      <motion.div
        initial="hidden"
        animate={show ? "show" : "hidden"}
        variants={{ show: { transition: { staggerChildren: 0.18 } } }}
        className="relative z-10 max-w-4xl -translate-y-[18vh] sm:-translate-y-[20vh]"
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="eyebrow mb-6"
        >
          {brand.positioning}
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="font-display text-5xl leading-[0.92] tracking-tight sm:text-7xl md:text-8xl"
        >
          EVERY GREAT PLAYER
          <br />
          <span className="text-je-green">STARTS SOMEWHERE</span>
        </motion.h1>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.9 } },
          }}
          className="mx-auto mt-8 flex max-w-md flex-col gap-1 text-sm uppercase tracking-[0.32em] text-white/70 sm:flex-row sm:justify-center sm:gap-6"
        >
          <span>One dream.</span>
          <span>One ball.</span>
          <span>One opportunity.</span>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        >
          <span className="mb-2 block text-center text-[10px] uppercase tracking-[0.4em] text-white/40">
            Begin the journey
          </span>
          <div className="mx-auto h-10 w-6 rounded-full border border-white/20 p-1">
            <motion.span
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="mx-auto block h-1.5 w-1 rounded-full bg-je-green"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
