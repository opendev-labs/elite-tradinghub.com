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
        background: '#090e13',
        foreground: '#e8edf0',
        surface: '#0e151c',
        'surface-2': '#121c24',
        border: '#26343e',
        'muted-foreground': '#83919a',
        emerald: '#26d98a',
        crimson: '#f0646b',
        blue: '#5c9cf5',
        amber: '#e0b15a',
      },
    },
  },
  plugins: [],
}
export default config
