import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        aviation: {
          ink: "#070b12",
          panel: "#0d1420",
          panelSoft: "#121b2a",
          line: "#203047",
          cyan: "#39d7ff",
          mint: "#35f1b8",
          amber: "#f6c75b",
          white: "#f7fbff"
        }
      },
      boxShadow: {
        panel: "0 18px 50px rgba(0, 0, 0, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
