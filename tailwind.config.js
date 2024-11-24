/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '5000': '5000ms',
      },
      clipPath: {
        triangle: 'polygon(50% 0%, 20% 100%, 80% 100%)',
      },
      boxShadow: {
        'wheel': '0 0 0 6px #333, 0 0 0 15px #fff, 0 0 0 16px #111',
      },
    },
  },
  plugins: [],
}
