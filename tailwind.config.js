/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
         'montserrat': ['montserrat', 'Georgia', 'serif'],
         'montserrat': ['Montserrat', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'cream': '#FDF6E3',
        'beige': '#F5E6D3',
        'sage': '#cc8e70',
        'sage-dark': '#db8d63',
        'brown': '#8B6B47',
        'brown-dark': '#6B4423',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        // 'bounce': 'bounce 1s infinite',
        // 'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        //  bounce: {
        //   '0%, 100%': {
        //     transform: 'translateY(-25%)',
        //     animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
        //   },
        //   '50%': {
        //     transform: 'translateY(0)',
        //     animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
        //   },
        // },
        // pulse: {
        //   '0%, 100%': { opacity: '1' },
        //   '50%': { opacity: '0.5' },
        // },
      },
    },
  },
  plugins: [
      require('@tailwindcss/line-clamp'),
  ],
};