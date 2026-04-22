// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image', '@vueuse/nuxt', '@nuxtjs/supabase'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'ScholarHub',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', id: 'favicon' }
      ],
      meta: [
        { property: 'image', content: '/bannerAuth.png' },
        { property: 'og:image', content: '/bannerAuth.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
      ],
    }
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  ui: {
    colorMode: false
  },
  supabase: {
    redirect: false
  }
})