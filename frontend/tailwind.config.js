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
        /* Sidebar */
        'sidebar-bg': 'var(--color-sidebar-bg)',
        'sidebar-border': 'var(--color-sidebar-border)',
        'sidebar-hover': 'var(--color-sidebar-hover)',
        'sidebar-active': 'var(--color-sidebar-active)',
        'sidebar-icon': 'var(--color-sidebar-icon)',
        'sidebar-text': 'var(--color-sidebar-text)',
        /* Navbar */
        'navbar-background': 'var(--color-navbar-background)',
        'navbar-text': 'var(--color-navbar-text)',
        'navbar-link-hover': 'var(--color-navbar-link-hover)',
        'navbar-card': 'var(--color-navbar-card)',
        'navbar-card-border': 'var(--color-navbar-card-border)',
        'navbar-border': 'var(--color-navbar-border)',
        'navbar-secondary': 'var(--color-navbar-secondary)',
      },
    },
  },
  plugins: [],
}
