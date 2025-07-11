/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8fd18f',
          400: '#5cb55c',
          500: '#2E5A1C',
          600: '#264d17',
          700: '#1f3f13',
          800: '#1a3210',
          900: '#16290e',
        },
        earth: {
          50: '#faf7f2',
          100: '#f4ede0',
          200: '#e8d8c0',
          300: '#d9bf96',
          400: '#c8a16a',
          500: '#8B4513',
          600: '#7a3d11',
          700: '#66320e',
          800: '#52280c',
          900: '#42200a',
        },
        cream: {
          50: '#FFFDD0',
          100: '#fffcc7',
          200: '#fffab8',
          300: '#fff7a3',
          400: '#fff489',
          500: '#fff066',
          600: '#e6d85c',
          700: '#ccbf52',
          800: '#b3a647',
          900: '#998d3d',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      screens: {
        'xs': '320px',
        'sm': '768px',
        'md': '1024px',
        'lg': '1440px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}