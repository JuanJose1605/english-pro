/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette sampled directly from logo.png
        primary: {
          DEFAULT: '#004088', // Pro Blue — trust / institution
          50: '#E6EEF5',
          100: '#CCDDEB',
          200: '#99BBD7',
          300: '#6699C3',
          400: '#3377AF',
          500: '#004088',
          600: '#003A7A',
          700: '#003066',
          800: '#002651',
          900: '#001C3D',
        },
        accent: {
          DEFAULT: '#D81C2B', // Pro Red — reserved for CTAs / key highlights
          50: '#FCE9EB',
          100: '#F8C8CC',
          200: '#F09199',
          300: '#E85A66',
          400: '#E03B49',
          500: '#D81C2B',
          600: '#B81523',
          700: '#94101C',
          800: '#700C15',
          900: '#4C080E',
        },
        ink: '#1A2332', // deep slate-navy body text
        muted: '#666666', // Academy gray — secondary text
        surface: '#F7F9FC', // alternating section background
        line: '#E2E8F0', // borders / dividers
        success: '#16A34A',
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(0, 64, 136, 0.10), 0 2px 8px -2px rgba(0, 64, 136, 0.06)',
        card: '0 8px 30px -6px rgba(0, 64, 136, 0.12), 0 2px 8px -2px rgba(26, 35, 50, 0.06)',
        lift: '0 18px 40px -8px rgba(0, 64, 136, 0.18), 0 6px 14px -4px rgba(26, 35, 50, 0.08)',
        glow: '0 8px 24px -4px rgba(216, 28, 43, 0.40)',
      },
      maxWidth: {
        container: '300rem', // 1280px
      },
      keyframes: {
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(216, 28, 43, 0.45)' },
          '70%': { boxShadow: '0 0 0 12px rgba(216, 28, 43, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(216, 28, 43, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
