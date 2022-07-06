

const withMT = require("@material-tailwind/react/utils/withMT");

const path = require('path');
// import path from 'path'

module.exports = withMT({
  content: [
    './src/shared/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
  theme: {
    extend: {},
  },
  plugins: [],
  // purge: ['./src/**/*.{js,jsx,ts,tsx}'],
})
