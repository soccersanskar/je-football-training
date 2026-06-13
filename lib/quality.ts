/**
 * Device quality tiering — keeps the experience smooth on weaker hardware.
 * Used to cap the renderer DPR and reduce the fluid-shader octaves on
 * mobile / low-core / low-memory devices.
 */
export type QualityTier = "low" | "high";

export function getQualityTier(): QualityTier {
  if (typeof window === "undefined") return "high";
  const ua = navigator.userAgent || "";
  const mobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua);
  const cores = navigator.hardwareConcurrency || 4;
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
  if (mobile || cores <= 4 || mem <= 4) return "low";
  return "high";
}

/** Max device-pixel-ratio cap per tier (controls render resolution). */
export function dprCap(tier: QualityTier): [number, number] {
  return tier === "low" ? [1, 1] : [1, 1.5];
}
