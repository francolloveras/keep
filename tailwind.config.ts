import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)']
      },
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)',
        background: 'rgb(var(--background) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        outline: 'rgb(var(--outline) / <alpha-value>)'
      },
      backgroundColor: {
        'current-shadow': 'color-mix(in srgb, currentColor 5%, transparent)'
      }
    }
  },
  plugins: []
} satisfies Config
