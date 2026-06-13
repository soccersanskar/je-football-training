import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

/** Official JE Football Training logo (mirrored locally to /public/brand). */
export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label="JE Football Training — home"
    >
      <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full ring-1 ring-white/10 transition group-hover:ring-je-green/50">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,230,118,0.18),transparent_70%)]" />
        <Image
          src="/brand/je-logo.png"
          alt="JE Football Training"
          width={48}
          height={45}
          priority
          className="relative h-9 w-auto object-contain drop-shadow-[0_0_8px_rgba(0,230,118,0.25)]"
        />
      </span>
      <span className="hidden flex-col leading-none sm:flex">
        <span className="font-display text-base tracking-[0.18em] text-white">
          JE FOOTBALL
        </span>
        <span className="text-[9px] uppercase tracking-[0.42em] text-white/50">
          Training
        </span>
      </span>
    </Link>
  );
}
