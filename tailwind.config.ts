import type { Config } from 'tailwindcss';
import colors from './src/core/color/colors.json';

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         colors: {
            primary: colors.primary,
            secondary: colors.secondary,
            tertiary: colors.tertiary,
            text_color: colors.text,
            danger: colors.danger,
            danger_hover: colors.danger_hover,
            success: colors.success,
            success_light: colors.success_light,
            header_sidebar_color: colors.header_sidebar_color,
            warning_light: colors.warning_light,
         },
      },
   },
   plugins: [],
};
export default config;
