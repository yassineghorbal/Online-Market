/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  purge: [

    './public/**/*.html',

    './src/**/*.{js,jsx,ts,tsx,vue}',

  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
