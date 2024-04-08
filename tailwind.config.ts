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
        fontRed_1: '#f87171',
        fontRed_2: '#ef4444',
        fontRed_3: '#dc2626',
        fontRed_4: '#b91c1c',
        footerDark: '#000229',
        lightGray: '#f8fafc',
        lightGray_1: '#f3f4f6',
        lightGray_2: '#e5e7eb',
        lightGray_3: '#d1d5db',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
};
export default config;
