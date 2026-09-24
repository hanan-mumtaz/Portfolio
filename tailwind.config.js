/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#050508',
          900: '#09090e',
          850: '#0e0e15',
          800: '#14141e',
          700: '#1e1e2d',
        },
        purple: {
          glow: '#c084fc',
          accent: '#9333ea',
          bright: '#a855f7',
          dark: '#581c87',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(168, 85, 247, 0.25)',
        'glow': '0 0 25px -4px rgba(168, 85, 247, 0.35)',
        'glow-lg': '0 0 40px -5px rgba(168, 85, 247, 0.45)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

