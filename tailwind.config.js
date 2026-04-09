/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cc-bg': '#FFFFFF',
        'cc-outer': '#282828',
        'cc-text': '#1A1A1A',
        'cc-border': '#1A1A1A',
        'cc-yellow': '#F4D35E',
        'cc-purple': '#C6B0F2',
        'cc-blue': '#BEE3F8',
        'cc-red': '#EB6D51',
        'cc-gray': '#F5F5F5',
        'cc-darkcard': '#333333',
        'cc-muted': '#777777',
      },
      boxShadow: {
        'neo': '2px 2px 0px 0px #1A1A1A',
        'neo-hover': '4px 4px 0px 0px #1A1A1A',
        'neo-active': '0px 0px 0px 0px #1A1A1A',
      },
      fontFamily: {
        'syne': ['Syne', 'sans-serif'],
        'dm': ['Outfit', 'DM Sans', 'sans-serif'],
        'mono': ['DM Mono', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}



