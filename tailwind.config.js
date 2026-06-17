/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: '#1E6B5E',
          light: '#2A8F7F',
          dark: '#134940',
          50: '#F0F7F6',
          100: '#D5EBE8',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light: '#DFC08E',
          dark: '#A8874E',
        },
        cream: {
          DEFAULT: '#F5EDDC',
          dark: '#EBE0C8',
          darker: '#DFD1B0',
        },
        ink: '#1A1A1A',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      animation: {
        'spray': 'spray 2s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        spray: {
          '0%': { opacity: '0', transform: 'scale(0.5) translateY(20px)' },
          '50%': { opacity: '0.8' },
          '100%': { opacity: '0', transform: 'scale(2) translateY(-60px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A96E 0%, #DFC08E 50%, #C9A96E 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #134940 0%, #1E6B5E 50%, #2A8F7F 100%)',
        'cream-gradient': 'linear-gradient(180deg, #F5EDDC 0%, #EBE0C8 100%)',
        'shimmer-gold': 'linear-gradient(90deg, #C9A96E 0%, #F5E4BB 25%, #C9A96E 50%, #F5E4BB 75%, #C9A96E 100%)',
      },
    },
  },
  plugins: [],
}
