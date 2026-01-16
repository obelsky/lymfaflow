import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dalí Color Palette
        'dali-gold': '#B8860B',
        'dali-copper': '#CD853F',
        'dali-flesh': '#DEB887',
        'dali-lavender': '#9370DB',
        'dali-azure': '#87CEEB',
        'dali-sage': '#9DC183',
        'dali-cream': '#FFF8F0',
        'dali-dark': '#2C1810',
        'dali-text': '#3D2914',
        'dali-text-light': '#8B7355',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      },
      boxShadow: {
        'dali': '0 4px 20px rgba(44, 24, 16, 0.1)',
        'dali-strong': '0 8px 32px rgba(44, 24, 16, 0.15)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
