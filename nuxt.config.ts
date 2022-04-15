import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  ssr: false,
  css: [],
  typescript: {
    strict: true,
  },
  buildModules: [
    '@pinia/nuxt',
  ],
  devtools: process.env.NODE_ENV === 'development',
});
