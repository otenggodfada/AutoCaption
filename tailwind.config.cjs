/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF2E63",
        secondary: "#08D9D6",
        dark: "#252A34",
        light: "#EAEAEA",
      },
    },
  },
  plugins: [],
};
