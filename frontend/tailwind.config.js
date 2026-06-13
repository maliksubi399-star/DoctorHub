/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Blue-600
          hover: '#1d4ed8', // Blue-700
          dark: '#38bdf8', // Light cyan for dark mode
        },
        secondary: {
          DEFAULT: '#475569', // Slate-600
          dark: '#cbd5e1', // Slate-300 for dark mode
        },
        background: '#f8fafc', // Slate-50
        surface: '#ffffff',
        'dark-bg': '#0f172a', // Deep navy/charcoal background
        'dark-surface': '#1e293b', // Card background
        'dark-text': '#e2e8f0', // Light text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
