/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
  
    extend: {
      screens: {
        tab: "668px",
        midi: "820px",

      },
      colors: {
        header: "#031d38",
        bodyBg: "#001a33",
        color: "#f2f2f2",
        darkBlue: "hsl(235, 21%, 11%)",
        textCol: "hsl(350, 90%, 50%)"

      },
      fontFamily: {
        bodyFont: ["YsaBeau", "sans-serif"],
      },
    },
  },
  plugins: [],
};
