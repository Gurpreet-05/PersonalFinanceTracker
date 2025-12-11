/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Here are your custom colors!
        navy: {
          100: '#F1F5F9',
          500: '#64748B',
          700: '#334155',
          900: '#0F172A', 
        },
      },
    },
  },
  plugins: [],
}