/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'small-screen': {'min': '280px', 'max': '767px'},
        'smartphone': {'min': '300px', 'max': '640px'},
        'small-tablet': {'min': '641px', 'max': '968px'},
        'tablet': {'min': '641px', 'max': '992px'},
        'medium-screen': {'min': '969px', 'max': '1030px'},
        'monitor': {'min': '992px', 'max': '1480px'},
        'header-space': {'min': '992px', 'max': '1200px'},
        'showcase': {'min': '1481px', 'max': '1919px'},
        'desktop': '1920px',
      },
    },
  },
  plugins: [],
}
