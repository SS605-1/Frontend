/** @type {import('tailwindcss').Config} */

module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'wink-blue': '#3A70FF',
        'wink-gray': '#D9D9D9'
      }
    }
  },
  plugins: []
};
