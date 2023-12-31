/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    extend: {
      colors: {
        "logo-green": "#63c32c",
      },
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
});
