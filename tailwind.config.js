/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'page': 'var(--tle-bg-home)',
        'tle': {
          DEFAULT: '#EF4444',
          'soft': 'var(--tle-semantic-red-bg)',
          'home': 'var(--tle-bg-home)',
          'primary': 'var(--tle-bg-primary)',
          'secondary': 'var(--tle-bg-secondary)',
          'tertiary': 'var(--tle-bg-tertiary)',
          'hover': 'var(--tle-bg-hover)',
          'card': 'var(--tle-bg-card-primary)',
          'input': 'var(--tle-bg-input)',
          'footer': 'var(--tle-bg-footer)',
        },
        't': {
          'primary': 'var(--tle-text-primary)',
          'secondary': 'var(--tle-text-secondary)',
          'tertiary': 'var(--tle-text-tertiary)',
          'inverse': 'var(--tle-text-inverse)',
        },
        'b': {
          'primary': 'var(--tle-border-primary)',
          'secondary': 'var(--tle-border-secondary)',
          'tertiary': 'var(--tle-border-tertiary)',
        },
        'surface': {
          DEFAULT: 'var(--tle-bg-primary)',
          'alt': 'var(--tle-bg-secondary)',
          'hover': 'var(--tle-bg-hover)',
          'border': 'var(--tle-border-secondary)',
          'card': 'var(--tle-bg-card-primary)',
        },
        'heading': 'var(--tle-text-primary)',
        'body': 'var(--tle-text-secondary)',
        'muted': 'var(--tle-text-tertiary)',
        'gold': {
          DEFAULT: 'rgb(var(--tle-nav-gold-rgb) / <alpha-value>)',
          'solid': 'var(--tle-nav-gold)',
          'hover': 'var(--tle-gradient-end)',
        },
        'ac': {
          DEFAULT: '#22C55E',
          'soft': 'var(--tle-semantic-green-bg)',
        },
        'sky': {
          DEFAULT: 'rgb(var(--tle-blue-rgb) / <alpha-value>)',
        },
        'amber': {
          DEFAULT: '#EAB308',
          'soft': 'var(--tle-semantic-yellow-bg)',
        },
        'semantic': {
          'green': '#22C55E',
          'green-bg': 'var(--tle-semantic-green-bg)',
          'red': '#EF4444',
          'red-bg': 'var(--tle-semantic-red-bg)',
          'yellow': '#EAB308',
          'yellow-bg': 'var(--tle-semantic-yellow-bg)',
          'orange': '#F97316',
          'orange-bg': 'var(--tle-semantic-orange-bg)',
          'purple': '#8D38F0',
          'blue': 'rgb(var(--tle-blue-rgb) / <alpha-value>)',
        },
        'code-bg': 'var(--tle-code-bg)',
        'icon': 'var(--tle-icon-color)',
        'brand-blue': {
          DEFAULT: '#236AF2',
          'hover': '#0052C3',
          'soft': 'var(--tle-blue-soft)',
          'navy': '#041434',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
      },
      borderRadius: {
        'tle': '12px',
        'tle-lg': '16px',
      },
      boxShadow: {
        'card': '0 1px 3px var(--tle-shadow-card)',
        'card-hover': '0 4px 12px var(--tle-shadow-card)',
        'tle-card': '0 1px 3px var(--tle-shadow-card)',
        'tle-hover': '0 4px 12px var(--tle-shadow-card)',
      },
    },
  },
  plugins: [],
}
