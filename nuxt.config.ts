import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  ssr: false,
  css: [
    '~/assets/css/tailwind.css',
    'nprogress/nprogress.css',
  ],
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
  runtimeConfig: {
    public: {
      api: {
        baseUrl: process.env.API_BASE_URL,
      },
    },
  },
  devtools: process.env.NODE_ENV === 'development',
});
