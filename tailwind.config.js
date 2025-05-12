/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Ubuntu", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        wabmBlue: "#3390FF",
        wabmGreen: "#25D366",
        wabmAiBlue: "#010526",
        infokeyYellow: "#FFD200",
        whatsAppColor1: "#075E54",
        whatsAppColor2: "#dcf8c6",
        whatsAppColor3: "#32CD30",
      },
    },
  },
  plugins: [],
};
