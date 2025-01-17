import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['var(--font-rubik)']
      }
    }
  },
  plugins: []
} satisfies Config
