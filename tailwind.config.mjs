/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './components/**/*.{js,ts,jsx,tsx}', // Add your specific folder if it's outside src!
    './**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}' // Or just scan everything (less efficient but guarantees it works)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}