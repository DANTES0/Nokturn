/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    screens: {
      mobile: '640px',
      laptop: '1024px',
      desktop: '1280px',
    },
    extend: {
      boxShadow: {
        container: '0 0 4px 2px rgba(0,0,0,0.25)',
        card: '0 0 4px 1px rgba(0,0,0,0.25)',
        cardImage: '0 4px 4px 1px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
}

// 24px, 48px
