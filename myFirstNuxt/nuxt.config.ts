// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  css: ["@/assets/css/reset.css"],
  piniaPersistedstate: {
    cookieOptions: {
      maxAge: 3600,
      sameSite: "strict",
    },
    storage: "cookies",
  },
  devServer: {
    port: 5173,
  },
});
