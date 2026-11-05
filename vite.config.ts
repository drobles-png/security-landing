import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Web component del embed de Wistia — no es un componente Vue
          isCustomElement: (tag) => tag === 'wistia-player',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Solo tokens y mixins: nada que emita CSS, o se duplica en cada componente
        additionalData: `@use "@/styles/tokens.scss" as *;`,
      },
    },
  },
})
