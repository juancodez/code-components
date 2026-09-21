import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    emptyOutDir: false,
    assetsInlineLimit: 4 * 1024 * 1024,
    rollupOptions: {
      input: resolve(import.meta.dirname, 'post.html'),
    },
  },
})
