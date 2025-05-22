import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Updated to include all files in the src directory
  ],
  theme: {
    extend: {
      screens: {},

      backgroundImage: {
        "image-startDrive": "url(/images/bg-image.webp)",
        "driver-bg-image": "url(/images/driver-hero-bg.webp)",
        "personal-ride-form": "url(/images/brBg.png)",
      },
      fontSize: {},
      colors: {
        charcoal: "#38383A",
        grayishBlue: "#292D32",
        darkBluish: "#3E4095",

        // red
        darkIndigo: "#3B3D8F",
        crimsonRed: "#AF2E2F",
        scarletRed: "#B22D30",
        vividRed: "#EA4335",

        // gray
        fogSilver: "#B0B0B4",
        midGray: "#3E3E40",
        mistGray: "#B0AFB4",
        softWhite: "#F6F6F6",
        slateAsh: "#2C2C2E",
        ashGray: "#7D7E80",
        lightSilver: "#B3B3B7",
        paleSilver: "#D9D9D9",
        pebbleGray: "#A6A6A6",
        chromeSilk: "#C4C4C4",

        deepMauve: "#49454F",
        midnightInk: "#1C1B1F",
      },

      keyframes: {},
      animation: {},
    },
  },
  plugins: [],
};
export default config;
