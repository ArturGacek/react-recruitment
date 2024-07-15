import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'text-normal': 'var(--text-color)',
      'text-white': 'var(--text-white)',
      background: 'var(--background)',
      'background-white': 'var(--background-white)',
      primary: 'var(--primary)',
      'primary-hover': 'var(--primary-hover)',
      'primary-light': 'var(--primary-light)',
      secondary: 'var(--secondary)',
      'border-color': 'var(--border-color)',
      error: 'var(--error)',
      'error-light': 'var(--error-light)',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
