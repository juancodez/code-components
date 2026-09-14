import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

/* viteSingleFile inlines CSS + JS into index.html so the whole
   site ships as one drop-anywhere file — the point of this
   project is to be a portable portfolio artifact, not to host
   a JS app that pulls chunks over HTTP. */
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    /* Inline assets up to 4MB so images ship inside the single
       index.html instead of ending up as separate files in dist/. */
    assetsInlineLimit: 4 * 1024 * 1024,
  },
})
