import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // JE Football Training brand system
        je: {
          green: "#00E676", // primary JE green (electric pitch green)
          "green-deep": "#00A857",
          "green-glow": "#3BFF9E",
          "green-bright": "#5CFFA8",
          black: "#000000",
          charcoal: "#0B0E0C", // deep charcoal with a green-black undertone
          pitch: "#0C2E1A", // desaturated pitch green
          "pitch-deep": "#06180F", // deep pitch green (fog/far fade)
          base: "#02080A",
          ink: "#010604",
          white: "#F4F8F6",
          muted: "#8FA39A",
          fog: "#9FB3A8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        cinematic: "0.35em",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "41%": { opacity: "1" },
          "42%": { opacity: "0.4" },
          "43%": { opacity: "1" },
          "45%": { opacity: "0.2" },
          "46%": { opacity: "1" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        "scan-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        flicker: "flicker 4s linear infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
        "scan-down": "scan-down 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
