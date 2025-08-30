// Nuxt 3 configuration for Jie Blog
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/css/tailwind.css'],
  routeRules: {
    '/**': { prerender: true }
  },
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      titleTemplate: (titleChunk?: string) => {
        return titleChunk ? `${titleChunk} - Jie Blog` : 'Jie Blog'
      }
    }
  },
  devtools: { enabled: true }
})


