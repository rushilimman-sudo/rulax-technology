/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rulax: {
          bg: '#FFFFFF',
          blue: '#1769FF',         // Primary blue
          electric: '#00A3FF',     // Electric blue
          navy: '#07152E',         // Deep navy
          'light-blue': '#EAF3FF', // Light blue
          text: '#101828',         // Primary text
          muted: '#667085',        // Secondary text
          'electric-glow': 'rgba(0, 163, 255, 0.4)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'electric': '0 0 25px rgba(0, 163, 255, 0.35)',
        'electric-lg': '0 10px 40px -10px rgba(0, 163, 255, 0.4)',
        'card-3d': '0 20px 50px -12px rgba(7, 21, 46, 0.08), 0 0 1px 1px rgba(234, 243, 255, 0.9)',
        'card-3d-hover': '0 30px 60px -15px rgba(23, 105, 255, 0.18), 0 0 25px rgba(0, 163, 255, 0.25)',
        'floating': '0 30px 60px -15px rgba(7, 21, 46, 0.12)',
        'glass': '0 8px 32px 0 rgba(23, 105, 255, 0.08)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
