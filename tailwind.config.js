/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    'node_modules/@splidejs/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    colors: {
      // Using modern `rgb`
      "primary-light": 'rgb(var(--color-primary-light) / <alpha-value>)',
      "primary-dark": 'rgb(var(--color-primary-dark) / <alpha-value>)',
      "secondary-light": 'rgb(var(--color-secondary-light) / <alpha-value>)',
      "secondary-dark": 'rgb(var(--color-secondary-dark) / <alpha-value>)',
      "tertiary-light": 'rgb(var(--color-tertiary-light) / <alpha-value>)',
      "tertiary-very-light": 'rgb(var(--color-tertiary-very-light) / <alpha-value>)',
      "white-alt": 'rgb(var(--color-white-alt) / <alpha-value>)',
      purple: '#801A86'
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
