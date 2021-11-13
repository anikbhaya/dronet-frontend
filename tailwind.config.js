module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary' : '#4CADFC',
        'primary-dark' : '#2275EF',
        'secondary' : '#273190',
        'secondary-dark' : '#121854'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
