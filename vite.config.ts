import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    outDir: 'dist-react',
  },
  resolve: {
    alias: {
      '@': './src',
    },
  },
  server: {
    port: 5123,
    strictPort: true,
  },
})
