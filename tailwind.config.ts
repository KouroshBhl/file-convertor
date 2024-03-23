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
      lightMode: {
        bgPrimary: '#f8fafc',
        bgSecondary: '#f1f5f9',
        sepreteLine: '#e2e8f0',
        fontPrimary: '#020617',
      },
    },
  },
  plugins: [],
};
export default config;
