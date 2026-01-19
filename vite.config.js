import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig(({ mode }) => ({
  // Use a different base for production GitHub Pages deployment
  base: mode === 'production' ? '/SecondShot/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: ['icons/icon.jpg', 'favicon.ico'],
      manifest: {
        name: 'Task List',
        short_name: 'Task List',
        theme_color: '#1976d2',
        background_color: '#fafafa',
        display: 'standalone',
        scope: './',
        start_url: './',
        icons: [
          { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ],
        screenshots: [
          {
            src: 'back.jpg',
            sizes: '1200x630',
            type: 'image/jpeg',
            label: 'Desktop preview',
            form_factor: 'wide'
          },
          {
            src: 'camera.jpg',
            sizes: '1200x900',
            type: 'image/jpeg',
            label: 'Mobile preview'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
}))
