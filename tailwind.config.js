import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-dim": "#dadada",
        "on-background": "#1a1c1c",
        "surface-container-low": "#f3f3f4",
        "on-tertiary-container": "#ffffff",
        "inverse-on-surface": "#f0f1f1",
        "primary": "#000000",
        "surface-bright": "#EDEBDD",
        "secondary": "#5e5e5e",
        "surface-container-lowest": "#ffffff",
        "on-primary-fixed": "#ffffff",
        "inverse-surface": "#2f3131",
        "surface-container-highest": "#e2e2e2",
        "outline-variant": "#c6c6c6",
        "surface-tint": "#5e5e5e",
        "on-surface": "#1a1c1c",
        "error": "#ba1a1a",
        "secondary-container": "#d4d4d4",
        "on-primary": "#e2e2e2",
        "on-secondary": "#ffffff",
        "error-container": "#ffdad6",
        "surface-container": "#eeeeee",
        "surface": "#EDEBDD",
        "outline": "#777777",
        "on-error-container": "#410002",
        "surface-container-high": "#e8e8e8",
        "tertiary-container": "#747474",
        "on-surface-variant": "#474747",
        "primary-container": "#3b3b3b",
        "on-tertiary-fixed-variant": "#e2e2e2",
        "on-primary-fixed-variant": "#e2e2e2",
        "background": "#EDEBDD",
        "cotton": "#EDEBDD",
        "on-primary-container": "#ffffff",
        "on-secondary-fixed": "#1b1b1b",
        "tertiary-fixed": "#5e5e5e",
        "tertiary-fixed-dim": "#474747",
        "inverse-primary": "#c6c6c6",
        "on-tertiary-fixed": "#ffffff",
        "tertiary": "#3b3b3b",
        "on-tertiary": "#e2e2e2",
        "primary-fixed": "#5e5e5e",
        "on-secondary-container": "#1b1b1b",
        "on-error": "#ffffff",
        "primary-fixed-dim": "#474747",
        "secondary-fixed-dim": "#ababab",
        "secondary-fixed": "#c6c6c6",
        "on-secondary-fixed-variant": "#3b3b3b",
        "surface-variant": "#e2e2e2"
      },
      borderRadius: {
        "DEFAULT": "0px",
        "lg": "0px",
        "xl": "0px",
        "full": "9999px"
      },
      fontFamily: {
        "sans": ["Manrope", "sans-serif"],
        "heading": ["'DM Sans'", "sans-serif"],
        "headline": ["'DM Sans'", "sans-serif"],
        "body": ["Manrope", "sans-serif"],
        "label": ["Manrope", "sans-serif"]
      }
    },
  },
  plugins: [
    forms,
    containerQueries
  ],
}
