import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' produces relative asset paths so the build works from any
// subdirectory on cPanel (public_html or a subfolder) without extra config.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
