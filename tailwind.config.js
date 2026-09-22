/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#e50914',
          600: '#c80812',
          700: '#a3070f',
          900: '#520307',
        },
        salla: {
          DEFAULT: '#004956',
          light: '#00b4a4',
          accent: '#00e5c9',
          gold: '#f5a623',
        },
        cinema: {
          bg: '#0a0d14',
          card: '#121722',
          cardHover: '#1a2232',
          surface: '#161c2b',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        arabic: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
        english: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 25px -5px rgba(229, 9, 20, 0.5)',
        'glow-salla': '0 0 25px -5px rgba(0, 180, 164, 0.4)',
        'cinema': '0 20px 40px -15px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.35s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
