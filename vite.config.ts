import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.config'
import unocss from 'unocss/vite'
import { virtual_alias } from 'vite-plugin-virtual-alias'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    virtual_alias({
      maps: {
        'sidepanel.html': './index.html',
        'options.html': './index.html',
      },
    }),
    crx({ manifest }), 
    unocss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'out',
    target: 'esnext',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name].[hash].js', 
        assetFileNames: `assets/[ext]/[name].[hash].[ext]`,
      },
    },
  },
  server: {
    port: 3721,
    cors: {
      origin: [/chrome-extension:\/\//],
    },
    hmr: {
      port: 3721,
    },
  },
})
