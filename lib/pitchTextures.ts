/**
 * Pitch texture configuration (PBR-on-drop).
 * ------------------------------------------------------------------
 * The pitch renders a high-quality PROCEDURAL surface by default (grass +
 * mowing stripes + regulation line markings — zero binary assets). When you
 * add a real CC0 grass set, point this config at the files and flip
 * `enabled: true` — the pitch swaps to full PBR (diffuse + normal + roughness
 * + displacement) with NO other code changes.
 *
 * WHERE TO PUT FILES:  /public/textures/pitch/
 *
 * Rename your downloaded files to match `files` below (or edit the names to
 * match your downloads). The example names follow the common CC0 convention
 * (e.g. ambientCG / Poly Haven "grass" sets):
 *
 *   /public/textures/pitch/grass_diff.jpg   (colour / albedo)
 *   /public/textures/pitch/grass_nor.jpg    (normal — OpenGL / +Y)
 *   /public/textures/pitch/grass_rough.jpg  (roughness)
 *   /public/textures/pitch/grass_disp.jpg   (height / displacement)
 *
 * Then set `enabled: true`. Done.
 */
export const PITCH_TEXTURES = {
  enabled: false,
  dir: "/textures/pitch/",
  files: {
    map: "grass_diff.jpg",
    normal: "grass_nor.jpg",
    roughness: "grass_rough.jpg",
    displacement: "grass_disp.jpg",
  },
  /** How many times the set tiles across the pitch — higher = finer blades. */
  repeat: 16,
  /** Keep subtle so the field reads flat-ish but not dead-flat. */
  displacementScale: 0.05,
} as const;
