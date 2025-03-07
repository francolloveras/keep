import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)']
      },
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        info: 'rgb(var(--info) / <alpha-value>)',
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
