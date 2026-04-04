import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        laranja: {
          DEFAULT: "#FF6100",
          hover: "#E55800",
          light: "#FF7A2E",
          soft: "#FFF3EB",
        },
        preto: {
          DEFAULT: "#1A1A1A",
          soft: "#2D2D2D",
          card: "#111111",
        },
        branco: {
          DEFAULT: "#FFFFFF",
          off: "#F8F8F8",
          warm: "#FAFAFA",
        },
        cinza: {
          light: "#F2F2F2",
          DEFAULT: "#E5E5E5",
          text: "#6B7280",
          dark: "#4B5563",
        },
        amarelo: "#FFD600",
        verde: "#AAFF00",
        azul: "#00C2FF",
        roxo: "#8B00FF",
      },
      fontFamily: {
        display: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-poppins)", "sans-serif"],
      },
      fontSize: {
        "hero-desktop": ["clamp(2.5rem, 4vw, 3.5rem)", { lineHeight: "1.15", fontWeight: "700" }],
        "hero-mobile": ["clamp(1.75rem, 6vw, 2.25rem)", { lineHeight: "1.2", fontWeight: "700" }],
        "section-title": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2", fontWeight: "700" }],
      },
      boxShadow: {
        brutal: "4px 4px 0px #1A1A1A",
        "brutal-sm": "2px 2px 0px #1A1A1A",
        "brutal-lg": "6px 6px 0px #1A1A1A",
        "brutal-laranja": "4px 4px 0px #FF6100",
        soft: "0 4px 20px rgba(0,0,0,0.06)",
        "soft-lg": "0 8px 30px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        brutal: "8px",
        "brutal-lg": "12px",
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
