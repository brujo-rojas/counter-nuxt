export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  modules: [
    // No es necesario importar Vuex explícitamente en Nuxt 3/4
  ],

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
