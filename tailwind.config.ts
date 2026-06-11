import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── Colors ──────────────────────────────────────────────────────────
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        // Project-specific amber ramp
        amber: {
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
      },

      // ── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        sans:     ["var(--font-inter)", "var(--font-georgian)", "system-ui", "sans-serif"],
        georgian: ["var(--font-georgian)", "sans-serif"],
      },

      // ── Animation ────────────────────────────────────────────────────────
      transitionDuration: {
        "400": "400ms",
        "1400": "1400ms",
      },
      transitionTimingFunction: {
        "globe": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      keyframes: {
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "0.4" },
          "50%":      { opacity: "1"   },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease forwards",
        "fade-in":    "fade-in 0.4s ease forwards",
        "pulse-dot":  "pulse-dot 2s ease-in-out infinite",
      },

      // ── Border radius (shadcn compatible) ────────────────────────────────
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // ── Backdrop blur ─────────────────────────────────────────────────────
      backdropBlur: {
        xl: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
