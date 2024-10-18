module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-up": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-100px)" },
        },
      },
      animation: {
        "slide-up": "slide-up 3s forwards",
      },
    },
  },
  plugins: [],
};
