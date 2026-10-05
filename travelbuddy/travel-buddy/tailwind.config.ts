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
        primary: {
          DEFAULT: "#FFD233",
          dark: "#F5A623",
          light: "#FFF3CC",
        },
        surface: "#FFFFFF",
        background: "#F5F3FF",
        black: "#1A1A1A",
        gray: {
          900: "#2D2D2D",
          600: "#6B6B6B",
          400: "#8E8E93",
          200: "#E5E5EA",
          100: "#F2F2F7",
        },
      },
      borderRadius: {
        "2xl": "24px",
        "xl": "20px",
        "lg": "16px",
        "md": "12px",
      },
      boxShadow: {
        card: "0 2px 16px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 4px 24px rgba(0, 0, 0, 0.10)",
        elevated: "0 8px 32px rgba(0, 0, 0, 0.12)",
      },
      fontFamily: {
        sans: ["Raleway", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
