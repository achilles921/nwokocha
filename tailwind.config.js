/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
          "lg" : "1440px",
          "md" : "768px",
          "sm" : "360px"
      },
    },
  },
  plugins: [],
}

