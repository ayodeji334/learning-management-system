module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          bowen:{
            dark: "#0c2147",
            light: "#c50227"
          }
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }