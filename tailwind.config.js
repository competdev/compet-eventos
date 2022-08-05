/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        compet: {
          primary: "#19DD39",
          secondary: "#004266",
          accent: "#0DAB76",
          neutral: "#f5f5f5",
          "base-100": "#f3f4f6",
          info: "#3ABFF8",
          success: "#166534",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
