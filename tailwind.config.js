/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
    "./resources/**/*.ts",
    "./resources/**/*.tsx",
    "./resources/**/*.jsx",
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '1px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}

