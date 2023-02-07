// DEFINE DEFAULTS
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

// MODULE EXPORTS
module.exports = {
  theme: {
    screens: {
      sm: "380px",
      md: "420px",
      lg: "680px",
    }, // close screens
    extend: {
      colors: {
        primary: "#313bac",
        secondary: "#11143c",
        accent: "#f9f871",
        success: "#198754",
        danger: "#ff5252",
        info: "#0dcaf0",
        warning: "#ffc107",
        error: "#dc3545",
        white: "#ffffff",
        black: "#000000",
        gray: "#9ca3af",
        lightDanger: "#ff8080",
        veryLightDanger: "#ffb3b3",
        lightSuccess: "#24c278",
        veryLightSuccess: "#68e3aa",
        lightGray: "#f3f4f6",
        veryLightGray: "#f4f4f4",
        lightBlack: "#333333",
        // Light primary
        lightPrimary: "#6069d2",
        veryLightPrimary: "#afb4e9",
        lightSecondary: "#1c2163",
        veryLightSecondary: "#272e8b",
      }, // close colors
      fontFamily: {
        regular: ["Montserrat-Regular", ...defaultTheme.fontFamily.sans],
        medium: ["Montserrat-Medium", ...defaultTheme.fontFamily.sans],
        light: ["Montserrat-Light", ...defaultTheme.fontFamily.sans],
        thin: ["Montserrat-Thin", ...defaultTheme.fontFamily.sans],
      }, // close font family
    }, // close extend
  }, // close theme
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        "btn-primary": `text-white p-2 rounded-lg uppercase bg-primary`,
        "btn-primary-outline": `text-primary p-2 rounded-lg uppercase bg-white border border-primary`,
        "btn-secondary": `p-2 rounded-lg uppercase bg-secondary`,
        "btn-link": `p-3 rounded-lg`,
        "btn-link-text": `text-lg font-medium uppercase underline`,
      });
    }),
  ], // close plugins
}; // close module
