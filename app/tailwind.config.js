/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Graphite/navy base — deeper and calmer than the old neon-navy.
        graphite: {
          DEFAULT: '#0F1420',
          deep: '#0B0F18',
          surface: '#161C2B',
          raised: '#1E2740',
        },
        // Kept for backward-compatible class names; mapped onto the graphite base.
        navy: {
          DEFAULT: '#0F1420',
          deep: '#0F1420',
          surface: '#161C2B',
          rich: '#1E2740',
        },
        // Cyan is a *signal* color: links, active state, data emphasis — used sparingly.
        cyan: {
          DEFAULT: '#00E5FF',
          deep: '#00B8D4',
        },
        // Restrained warm secondary — hairline rules, section numerals, marks only.
        brass: {
          DEFAULT: '#B99A6B',
          deep: '#8C7350',
        },
        cream: {
          DEFAULT: '#F0F0E6',
        },
        stone: {
          muted: '#8C8C99',
        },
      },
      fontFamily: {
        // Editorial serif for display statements; grotesque sans for everything;
        // mono reserved for data + labels.
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      maxWidth: {
        prose: '68ch',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
