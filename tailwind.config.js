/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#e2cf61",

          secondary: "#f192f4",

          accent: "#8d6bff",

          neutral: "#1D1523",

          "base-100": "#352A3C",

          info: "#3FA3D5",

          success: "#2AC6B1",

          warning: "#E89230",

          error: "#F11E36",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
