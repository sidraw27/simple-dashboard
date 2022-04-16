import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  ssr: false,
  css: ['~/assets/css/tailwind.css'],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  typescript: {
    strict: true,
  },
  buildModules: [
    '@pinia/nuxt',
  ],
  devtools: process.env.NODE_ENV === 'development',
});
