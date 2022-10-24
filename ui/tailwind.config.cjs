module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "public"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-background": "url('/hero-background.jpg')",
      }
    },
  },
  plugins: [],
}