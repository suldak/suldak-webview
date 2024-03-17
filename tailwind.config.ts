import type { Config } from 'tailwindcss';

const config: Config = {
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
      colors: {
        'suldak-gray-900': '#1e1e1e',
        'suldak-gray-700': '#646464',
        'suldak-gray-600': '#8e8e8e',
        'suldak-gray-500': '#bebebe',
        'suldak-orange-500': '#ff9300',
        'suldak-green-500': '#20bf27',
        'suldak-red-500': '#e45141',
        'suldak-mint-500': '#08beca',
        'suldak-mint-50': '#f6fdfe',
      },
    },
  },
  plugins: [],
};
export default config;
