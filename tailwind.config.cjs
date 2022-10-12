/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // primary colors
      'primary-1': '#3B71FE',
      'primary-2': '#8BC5E5',
      'primary-3': '#92A5EF',
      'primary-4': '#58C27D',
      // secondary colors
      'secondary-1': '#A4CDE3',
      'secondary-2': '#E4D7CF',
      'secondary-3': '#FFD166',
      'secondary-4': '#FA8F54',
      // neutral colors
      'neutral-1': '#141416',
      'neutral-2': '#23262F',
      'neutral-3': '#353945',
      'neutral-4': '#777E91',
      'neutral-5': '#B1B5C4',
      'neutral-6': '#E6E8EC',
      'neutral-7': '#F4F5F6',
      'neutral-8': '#FCFCFD',

      
    },
    extend: {

    },
  },
  plugins: [],
}
