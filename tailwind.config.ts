import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        audit: {
          bg: "#F5F7FB",
          surface: "#EEF2F8",
          card: "#FFFFFF",
          text: "#182033",
          subtle: "#4C5873",
          muted: "#7E889D",
          blue: "#2F4BB8",
          "blue-hover": "#3D63E8",
          halo: "#DCE5FF",
          border: "#D9E0EC",
          "border-subtle": "#E6EBF3",
          success: "#DFF4EA",
          "success-text": "#2E7D5B"
        }
      },
      boxShadow: {
        "audit-soft": "0 10px 30px rgba(24,32,51,0.06)",
        "audit-elevated": "0 18px 60px rgba(24,32,51,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
