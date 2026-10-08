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
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        messGold: '#f59e0b',
        messEmerald: '#10b981',
        messRose: '#f43f5e',
        /* Semantic surface tokens */
        surface: {
          /* light */
          'light-base':    '#f0f2f8',
          'light-card':    '#ffffff',
          'light-nav':     '#1a3a8f',   /* dark-navy sidebar – matches reference */
          'light-border':  '#dde2f0',
          'light-muted':   '#6b7a9e',
          /* dark */
          'dark-base':     '#0d1117',
          'dark-card':     '#161b2e',
          'dark-nav':      '#0f1729',
          'dark-border':   '#1e2d4d',
          'dark-muted':    '#4a5a7d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}
