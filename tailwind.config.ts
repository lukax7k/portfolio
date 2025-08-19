/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        modern: ['Roboto', 'sans-serif'], // ou a fonte que preferir
      },
    },
  },
  plugins: [],
}
