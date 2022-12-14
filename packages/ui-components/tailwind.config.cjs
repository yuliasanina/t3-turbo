module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/base'),
    require('@tailwindcss/components'),
    require('@tailwindcss/utilities'),
  ],
};
