// Nuxt 3 configuration for Jie Blog
const baseURL = process.env.NUXT_APP_BASE_URL || process.env.BASE_URL || '/'
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/css/tailwind.css'],
  routeRules: {
    '/**': { prerender: true }
  },
  compatibilityDate: '2025-08-30',
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    }
  },
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      titleTemplate: (titleChunk?: string) => {
        return titleChunk ? `${titleChunk} - Jie Blog` : 'Jie Blog'
      }
    }
  },
  devtools: { enabled: true }
})


