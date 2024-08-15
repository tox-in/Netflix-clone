import tailwindScrollbarHide from "tailwind-scrollbar-hide";
export default {
content: [
  "./index.html",
  "./src/**/*.{html,js,jsx,ts,tsx}"
],
theme: {
  extend: {},
},
plugins: [tailwindScrollbarHide],
}