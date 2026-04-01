import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cosmos: {
          950: "#020205",
          900: "#070912",
          800: "#111527"
        }
      },
      boxShadow: {
        glow: "0 0 60px rgba(97, 90, 255, 0.25)",
        card: "0 8px 35px rgba(6, 8, 19, 0.45)"
      },
      backgroundImage: {
        grain:
          "radial-gradient(rgba(255,255,255,0.08) 0.5px, transparent 0.5px), radial-gradient(rgba(255,255,255,0.06) 0.5px, transparent 0.5px)"
      }
    }
  },
  plugins: []
};

export default config;
