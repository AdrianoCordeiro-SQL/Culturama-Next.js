/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    fontFamily: {
      fjalla: ["Fjalla One", "sans-serif"],
      "work-sans": ["Work Sans", "sans-serif"],
    },
  },
};
export const plugins = [];
