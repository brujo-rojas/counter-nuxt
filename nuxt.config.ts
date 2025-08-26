export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: [
    '~/scss/main.scss'
  ],

  typescript: {
    strict: true,
    typeCheck: true,
  },

  modules: ["@nuxt/icon"],

  vite: {
    define: {
      "process.env.DEBUG": "false",
    },
  },

  build: {
    transpile: ['vuex'],
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});