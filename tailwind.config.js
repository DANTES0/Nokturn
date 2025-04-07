/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    screens: {
      mobile: '640px',
      laptop: '1024px',
      desktop: '1920px',
    },
    extend: {
      boxShadow: {
        container: '0 0 4px 2px rgba(0,0,0,0.25)',
        containerDark: '0 0 1px 1px rgba(255,255,255,0.25)',
        card: '0 0 4px 1px rgba(0,0,0,0.25)',
        cardDark: '0 0 0 1px rgba(204,204,204,0.25)',
        cardImage: '0 4px 4px 1px rgba(0,0,0,0.25)',
        cardImageDark: '0 4px 4px 1px rgba(100,100,100,0.25)',
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
}

// 24px, 48px
