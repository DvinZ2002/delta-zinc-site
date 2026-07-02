/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        vilsuve: ["Lexend", "sans-serif"],
      },
    },
  },
  plugins: [],
};
