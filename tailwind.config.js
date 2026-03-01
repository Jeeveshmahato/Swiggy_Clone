/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'swiggy-orange': '#FC8019',
        'swiggy-orange-dark': '#E67312',
        'swiggy-orange-light': '#FFF4E8',
        'slate-title': '#282C3F',
        'slate-body': '#686B78',
        'slate-muted': '#93959F',
        'slate-border': '#E9E9EB',
        'slate-bg': '#F1F1F6',
        'green-rating': '#48C479',
        'yellow-rating': '#DB7C38',
        'red-rating': '#E1352F',
      },
      fontFamily: {
        'display': ['"Poppins"', 'sans-serif'],
        'body': ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
        'header': '0 4px 12px rgba(0,0,0,0.06)',
        'button': '0 2px 6px rgba(252,128,25,0.3)',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite linear',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
