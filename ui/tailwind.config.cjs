/* eslint-disable */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "public"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "hero-background": "url('/hero-background.jpg')",
      },
      animation: {
        'spinner-grow': 'spinner-grow 1s linear infinite',
      }
    },
  },
  plugins: [],
}