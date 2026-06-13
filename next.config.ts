import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // three.js and its R3F ecosystem ship ESM that benefits from transpilation.
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["@react-three/drei", "framer-motion"],
  },
};

export default nextConfig;
