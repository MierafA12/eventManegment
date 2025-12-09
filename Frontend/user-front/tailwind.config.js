module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4b2e1f",
        secondary: "#c2db6c",
        text1: "white",
        buttonHover: "#3e2618",
        success: "#22C55E",
        lightBg: "#F9FAFB",
        activeBg: "#DCFCE7",
        inactiveBg: "#FEE2E2",
        activeText: "#15803D",
        inactiveText: "#B91C1C",
        text1Dark: "#ffffff",
        bg: "#ffffff",
        bgDark: "#1f1f1f",
      },
    },
  },
  plugins: [],
  // ADD THIS:
  safelist: [], // optional
};
