/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'grotesk': ['"Founders Grotesk"', 'sans-serif'],
        'grotesk-mono': ['"Founders Grotesk Mono"', 'monospace'],
      },
      fontSize: {
        'xs': '11px',
        'sm': '13px',
      },
      colors: {
        'gainsboro': '#dcdcdc',
      },
      keyframes: {
        slideFadeIn: {
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        flickerPause: {
          '0%, 60%, 100%': { opacity: '0' },
          '61%, 63%, 65%': { opacity: '0.5' },
          '70%, 72%, 75%': { opacity: '0.5' },
        },
      },
      animation: {
        'slideFadeIn': 'slideFadeIn 0.8s forwards',
        'flickerPause': 'flickerPause 2s infinite',
      },
    },
  },
  plugins: [],
}
