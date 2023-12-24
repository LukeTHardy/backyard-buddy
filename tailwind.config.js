/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["VCR Mono", "sans-serif"],
        mono: ["Retro Mono", "serif"],
        arcade: ["Retro Arcade", "mono"],
        vcr: ["VCR Mono", "sans-serif"],
        thick: ["Retro Thick", "sans-serif"],
        pixel: ["Pixel7", "sans-serif"],
        pixeboy: ["Pixeboy", "sans-serif"],
        svthin: ["SV Thin", "sans-serif"],
        svbold: ["SV Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
