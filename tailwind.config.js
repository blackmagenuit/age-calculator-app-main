/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        'primary': 'hsl(259, 100%, 65%)',
        'error': 'hsl(0, 100%, 67%)',
        'off-black': 'hsl(0, 0%, 8%)',
        'dark-gray': 'hsl(0, 0%, 20%)',
        'light-gray': 'hsl(0, 0%, 86%)',
        'bg-gray': 'hsl(0, 0%, 94%)'
      }
    }
  },
  plugins: [],
}

