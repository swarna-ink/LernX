/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F0FC',
          100: '#EBE3F8',
          200: '#D7C7F0',
          500: '#7C3AED',
          600: '#6D28D9',
          900: '#2A1B54',
        }
      }
    },
  },
  plugins: [],
}