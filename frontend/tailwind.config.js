/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Base */
        'background': 'var(--color-background)',
        'text': 'var(--color-text)',

        /* Primary UI */
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'accent': 'var(--color-accent)',

        /* Cards */
        'card': 'var(--color-card)',
        'card-border': 'var(--color-card-border)',

        /* Buttons */
        'button-primary': 'var(--color-button-primary)',
        'button-secondary': 'var(--color-button-secondary)',
        'button-hover-primary': 'var(--color-button-hover-primary)',
        'button-hover-secondary': 'var(--color-button-hover-secondary)',
        'button-border-primary': 'var(--color-button-border-primary)',
        'button-border-secondary': 'var(--color-button-border-secondary)',
        'button-text': 'var(--color-button-text)',

        /* Forms */
        'input-background': 'var(--color-input-background)',
        'input-border': 'var(--color-input-border)',
        'input-focus': 'var(--color-input-focus)',

        /* Borders */
        'border': 'var(--color-border)',

        /* Links */
        'link': 'var(--color-link)',
        'link-hover': 'var(--color-link-hover)',

        /* Status */
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'error': 'var(--color-error)',
        'info': 'var(--color-info)',
      },
    },
  },
  plugins: [],
}
