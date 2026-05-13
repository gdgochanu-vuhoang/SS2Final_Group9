// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image', '@vueuse/nuxt', '@nuxtjs/supabase'],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'ScholarHub',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', id: 'favicon' },
      ],
      meta: [
        { property: 'image', content: '/bannerAuth.png' },
        { property: 'og:image', content: '/bannerAuth.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false,
  },
  runtimeConfig: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  supabase: {
    redirect: false,
  },
})
