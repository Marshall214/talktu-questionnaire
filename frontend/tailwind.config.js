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
          50: '#e6f0f5',
          100: '#cce0eb',
          200: '#99c1d7',
          300: '#66a2c3',
          400: '#3383af',
          500: '#000e25', // Main brand color - deep navy
          600: '#000b1e',
          700: '#000816',
          800: '#00060f',
          900: '#000307',
        },
        accent: {
          50: '#fef9ed',
          100: '#fef3db',
          200: '#fde7b7',
          300: '#fcdb93',
          400: '#fbcf6f',
          500: '#f8c451', // Main accent - golden yellow
          600: '#c69d41',
          700: '#957631',
          800: '#634e20',
          900: '#322710',
        },
        pink: {
          50: '#fff5f9',
          100: '#ffeaf3',
          200: '#ffd5e7',
          300: '#feb5c1', // Soft pink for small circles
          400: '#fe95a8',
          500: '#fd758f',
          600: '#ca5e72',
          700: '#974656',
          800: '#652f39',
          900: '#32171d',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        danger: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'circle-pattern': 'radial-gradient(circle at 20% 50%, #f8c451 0%, transparent 50%), radial-gradient(circle at 80% 20%, #f8c451 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}
