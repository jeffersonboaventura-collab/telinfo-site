import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:      "#020408",
        surface: "#050d1a",
        card:    "#0a0f1e",
        cyan:    "#00f5ff",
        purple:  "#7b2fff",
        green:   "#00ff88",
        magenta: "#ff00aa",
        blue:    "#4499ff",
        yellow:  "#ffcc00",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        exo:      ["var(--font-exo)", "sans-serif"],
        mono:     ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        glitch: {
          "0%,87%,100%": { transform: "translate(0)" },
          "88%": { transform: "translate(-2px,1px)" },
          "90%": { transform: "translate(2px,-1px)" },
          "92%": { transform: "translate(-1px,2px)" },
          "94%": { transform: "translate(1px,-1px)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-8px)" },
        },
        "pulse-neon": {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.5" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        blink: { "50%": { opacity: "0" } },
      },
      animation: {
        glitch:       "glitch 9s 3s infinite",
        float:        "float 3s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "fade-up":    "fade-up 0.7s ease both",
        blink:        "blink 1s step-end infinite",
      },
      boxShadow: {
        "neon-cyan":   "0 0 20px rgba(0,245,255,0.35)",
        "neon-purple": "0 0 20px rgba(123,47,255,0.35)",
        "neon-green":  "0 0 20px rgba(0,255,136,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
