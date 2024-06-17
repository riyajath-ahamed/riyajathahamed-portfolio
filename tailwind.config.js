/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#f0f3f2",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        cardOverlay: "rgba(0,0,0,0.5)",
        whiteCardOverlay: "rgba(255,255,255,0.5)",
        wonder: "#ffc700",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.jpg')",
      },
      textShadow: {
        'custom-hover-border': '1px 1px 0 #151030, -0.04em -0.04em #ffc700, -0.08em -0.08em #ffc700, -0.12em -0.12em #ffc700, -0.16em -0.16em #ffc700, -0.2em -0.2em #ffc700',
      },
      fontFamily:{
        curve : ["paaniPuri", "cursive"]
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        'spin-slow': 'spin 4s ease-in-out infinite',
      }
    },
  },
  variants: {
    extend: {
      textShadow: ['hover'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-custom-hover': {
          textShadow: '1px 1px 0 #151030, -0.04em 0.04em #ffc700, -0.08em 0.08em #ffc700, -0.12em 0.12em #ffc700, -0.16em 0.16em #ffc700, -0.2em 0.2em #ffc700',
        },
      }, ['hover']);
    },
  ],
};