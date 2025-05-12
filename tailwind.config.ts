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
      },
      fontSize: {},
      colors: {
        charcoal: "#38383A",
        grayishBlue: "#292D32",
        darkBluish: "#3E4095",
        darkIndigo: "#3B3D8F",
        crimsonRed: "#AF2E2F",
        fogSilver: "#B0B0B4",
        slateAsh: "#2C2C2E",
        midGray: "#3E3E40",
        mistGray: "#B0AFB4",
        softWhite: "#F6F6F6",
        ashGray: "#7D7E80",
        lightSilver: "#B3B3B7",
        scarletRed: "#B22D30",
      },

      keyframes: {},
      animation: {},
    },
  },
  plugins: [],
};
export default config;
