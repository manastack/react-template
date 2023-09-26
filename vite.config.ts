import react from '@vitejs/plugin-react'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => ({
  build: {
    minify: true,
    outDir: 'build',
    sourcemap: mode !== 'production',
    target: 'esnext',
  },
  esbuild: {
    define: {
      this: 'window',
    },
  },
  plugins: [react(), tsconfigPaths(), splitVendorChunkPlugin()],
  test: {
    coverage: {
      all: true,
      include: ['src/**/*.tsx', 'src/**/*.ts'],
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/shared/lib/test/setup.ts',
  },
}))
