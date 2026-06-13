import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Reveal from "@/components/ui/Reveal";

/**
 * Shared shell for the non-cinematic inner pages. Navigation is forced
 * visible (these pages have no intro), with an on-brand ambient background
 * and a consistent page header.
 */
export default function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation forceVisible />

      {/* ambient brand background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-je-ink">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,230,118,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(0,200,83,0.08),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      </div>

      <main className="relative z-10 min-h-screen px-6 pb-24 pt-36 sm:px-10">
        <header className="mx-auto max-w-5xl">
          <Reveal>
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h1 className="font-display text-5xl leading-[0.95] sm:text-7xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
                {intro}
              </p>
            )}
          </Reveal>
        </header>

        <div className="mx-auto mt-16 max-w-5xl">{children}</div>
      </main>

      <Footer />
    </>
  );
}
