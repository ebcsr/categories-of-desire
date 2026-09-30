/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medieval: {
          vellum: "#F4EBD9",
          sandstone: "#E5D8C0",
          timber: "#2A1E17",
          brick: "#8B261D",
          "brick-hover": "#721F18",
          gold: "#B08A45",
          "gold-light": "#C5A059",
          stone: "#62584E",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
