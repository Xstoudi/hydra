import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import adonis from '@91codes/adonis-vite/build/plugins/adonis'

export default defineConfig({
  base: '/',
  plugins: [react({ jsxRuntime: 'classic' }), adonis({ input: 'resources/js/app.tsx' })],
  build: {
    manifest: true,
    outDir: 'build/inertia',
    watch: {},
    ssr: 'resources/js/ssr.tsx',
    ssrManifest: true,
    ssrEmitAssets: true,
  },
  ssr: {
    format: 'cjs',
  },
})
