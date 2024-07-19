/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14161f",
        secondbg: "#1e1f2d",
        greyborder: "#484848",
        greytext: "#7f7f7f",
      },
    },
  },
  plugins: [],
};
