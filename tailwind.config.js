/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fredoka': ['"Fredoka"', 'sans-serif'],
      },
      colors: {
        'fun-orange': '#FF8C00',
        'fun-yellow': '#FFD700',
        'fun-blue': '#4169E1',
        'fun-green': '#32CD32',
        'fun-pink': '#FF69B4',
        'fun-purple': '#9370DB',
        'paper-white': '#FDFBF7',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'fun': '4px 4px 0px 0px rgba(0,0,0,0.1)',
        'fun-hover': '6px 6px 0px 0px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}
