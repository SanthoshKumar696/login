/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Required for Vite + React
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff4d4d',
        secondary: '#ffcc00',
        light: '#ffffff',
      },
    },
  },
  plugins: [],
};




