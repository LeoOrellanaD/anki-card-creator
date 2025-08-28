/** @type {import('tailwindcss').Config} */
export default {
  future: {
    oxidePlugin: false, // this fix the error with electron builder
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
}
