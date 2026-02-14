/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zamstay: {
          blue: '#1e40af',
          green: '#10b981',
        }
      }
    },
  },
  plugins: [],
}
