const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bg: '#FCFBF0',
        text: '#075814',
      },
      fontFamily: {
        sans: ['Gentium Book Basic', ...defaultTheme.fontFamily.sans],
      },
      minHeight: {
        '0': '0',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        'full': '100%'
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
