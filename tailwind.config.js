/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './resources/**/*.{edge,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'hero-background': "url('../image/hero-background.jpg')",
      },
      animation: {
        'spinner-grow': 'spinner-grow 1s linear infinite',
      },
      minHeight: {
        'screen-wo-header': 'calc(100vh - 8rem)',
      },
    },
  },
  plugins: [],
}
