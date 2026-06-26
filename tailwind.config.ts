import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05060A",
        ink: "#F8FAFC",
        violet: "#7C5CFF",
        cyan: "#00D9FF",
        aura: "#A855F7"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"]
      },
      boxShadow: {
        glow: "0 0 80px rgba(124, 92, 255, 0.35)",
        cyan: "0 0 60px rgba(0, 217, 255, 0.25)"
      }
    }
  },
  plugins: []
} satisfies Config;
