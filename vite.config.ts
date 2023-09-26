import react from '@vitejs/plugin-react'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => ({
  build: {
    minify: mode === 'production',
    outDir: 'build',
    sourcemap: mode !== 'production',
    target: 'esnext',
  },
  esbuild: {
    define: {
      this: 'window',
    },
    jsxInject: "import * as React from 'react'",
    logOverride: { 'this-is-undefined-in-esm': 'silent' }, // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'babel-plugin-macros',
          [
            '@emotion/babel-plugin-jsx-pragmatic',
            {
              export: 'jsx',
              import: '__cssprop',
              module: '@emotion/react',
            },
          ],
          [
            '@babel/plugin-transform-react-jsx',
            { pragma: '__cssprop' },
            'twin.macro',
          ],
        ],
      },
      // jsxRuntime: 'classic',
    }),
    tsconfigPaths(),
    splitVendorChunkPlugin(),
  ],
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
