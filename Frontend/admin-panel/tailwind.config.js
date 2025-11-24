export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4b2e1f", // dark brown
        secondary: "#c2db6c", // green
        error: "#ff4d4f", // red
        text1: "white", // dark gray
        buttonHover: "#3e2618", // darker brown
      },
    },
  },
  plugins: [],
};
