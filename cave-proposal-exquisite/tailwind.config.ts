import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f7ff",
          100: "#e8ebff",
          200: "#cfd6ff",
          300: "#aab6ff",
          400: "#7d8cff",
          500: "#4f63ff",
          600: "#2f44f2",
          700: "#2032bf",
          800: "#182792",
          900: "#121d6e"
        }
      },
      boxShadow: {
        card: "0 8px 28px rgba(0,0,0,0.08)"
      },
      borderRadius: {
        '2xl': '1.25rem'
      }
    },
  },
  plugins: [],
}
export default config
