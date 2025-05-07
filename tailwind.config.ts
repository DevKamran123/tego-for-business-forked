import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Updated to include all files in the src directory
  ],
  theme: {
    extend: {
      screens: {},

      backgroundImage: {
        "bg-lines": "url(/images/bg-line.svg)",
      },
      fontSize: {},
      colors: {
        purple: "#7923B2",
      },

      keyframes: {},
      animation: {},
    },
  },
  plugins: [],
};
export default config;
