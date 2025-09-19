/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryColor': 'var(--primaryColor)',
        'primaryDarkColor': 'var(--primaryDarkColor)',
        'primaryDarkBg':'var(--primaryDarkBg)',
        'secondaryDarkBg':'var(--secondaryDarkBg)',
        'cardDarkBg':'var(--cardDarkBg)',
      },
      boxShadow: {
        'shadow-pr': '0 0 10px #757575'
      },
      fontFamily: {
        poppins: 'poppins-light'
      },



      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-10px)' },
        },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
}