import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "suldak-gray-900": "#1e1e1e",
        "suldak-gray-700": "#646464",
        "suldak-gray-600": "#8e8e8e",
        "suldak-gray-500": "#bebebe",
        "suldak-gray-400": "#e1e1e1",
        "suldak-gray-300": "#e8e8e8",
        "suldak-gray-200": "#f6f6f6",
        "suldak-gray-100": "#f9f9f9",
        "suldak-orange-500": "#ff9300",
        "suldak-green-500": "#20bf27",
        "suldak-red-500": "#e45141",
        "suldak-mint-500": "#08beca",
        "suldak-mint-50": "#f6fdfe",
        "suldak-mint-100": "#CEF2F4",
        "suldak-mint-200": "#9CE5EA",
        "suldak-mint-600": "#0698A2",
      },
      boxShadow: {
        "suldak-card": "2px 2px 20px -3px rgba(0, 0, 0, 0.13)",
      },
      padding: {
        "18px": "18px",
        "50px": "50px",
      },
      margin: {
        "18px": "18px",
      },
      height: {
        card: "140px",
        "card-image": "90px",
      },
      width: {
        "card-image": "90px",
      },
      minWidth: {
        "card-image": "90px",
      },
      gap: {
        "5px": "5px",
      },
      borderRadius: {
        "30px": "30px",
      },
      fontSize: {
        "2xs": "10px",
        "22px": "22px",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        GMarket: ["GMarket", "sans-serif"],
      },
      screens: {
        xs: { max: "376px" },
        mobile: { max: "639px" },
        tablet: { min: "640px", max: "1023px" },
        pc: { min: "1024px" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
