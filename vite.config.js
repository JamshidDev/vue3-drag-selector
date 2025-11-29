import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'Vue3DragSelector',
      fileName: 'vue3-drag-selector'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
      }
    }
  }
})