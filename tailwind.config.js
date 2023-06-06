/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        mobile: "90%",
        container_width: "80%",
      },
      colors: {
        orange: "#FF8C32",
        blue: "#0061A8",
        red: "#FF1E1E",
      },
    },
  },
  plugins: [],
};
