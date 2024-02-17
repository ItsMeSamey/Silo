/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/html/utils/withMT";
export default withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [],
});