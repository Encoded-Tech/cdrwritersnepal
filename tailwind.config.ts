import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: "#dc2626",
        customRedDark: "#991b1b",
        customGreen: "#16a34a",
        customGreenDark: "#14532d",
      },
      fontFamily: {
        sans: ["var(--font-sora)", "sans-serif"],
        serif: ["var(--font-lora)", "serif"],
      },
      clipPath: {
        diagonal: "polygon(0 0, 93% 0, 100% 50%, 93% 100%, 0 100%)",
      },
    },
  },
  plugins: [],
};

export default config;