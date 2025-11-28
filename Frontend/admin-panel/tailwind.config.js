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
          success: "#22C55E",
        lightBg: "#F9FAFB",

        activeBg: "#DCFCE7",
        inactiveBg: "#FEE2E2",
        activeText: "#15803D",
        inactiveText: "#B91C1C",
      },
    },
  },
  plugins: [],
};
