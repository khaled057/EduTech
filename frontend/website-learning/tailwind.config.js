/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1F2A44", // primary navy — headers, primary buttons
          50: "#EEF0F5",
          100: "#D6DBE7",
          400: "#4C5A7D",
          600: "#1F2A44",
          800: "#141C2E",
        },
        gold: {
          DEFAULT: "#D9A441", // accent — used sparingly (active states, highlights)
          100: "#F6E8C8",
          400: "#D9A441",
          600: "#B6842A",
        },
        paper: "#F7F5F1", // warm off-white page background
        surface: "#FFFFFF",
        line: "#E4E0D8", // borders / dividers
        muted: "#6B6459", // secondary text
        success: "#2F6846",
        danger: "#B23A2E",
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        body: ["Public Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "6px",
        control: "4px",
      },
    },
  },
  plugins: [],
};
