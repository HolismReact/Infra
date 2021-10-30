const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  //mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {   
    screens: {
      'xs': '360px',
      ...defaultTheme.screens,
    }, 
    fontFamily: {
      'body': ['"Poppins"'],
    }, 
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true
}