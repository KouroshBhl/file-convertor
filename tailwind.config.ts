import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},

    colors: {
      theme: {
        purplePrimary: '#6B14FA',
        accentPurple: '#6012e1',
        purpleSecondary: '#6865FF',
        fontDark: '#01103D',
        fontGray: '#5F6168',
        fontRed: '#FF3C82',
        footerDark: '#000229',
        lightGray: '#f8fafc',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
};
export default config;
