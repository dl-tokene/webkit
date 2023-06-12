import typescript from '@rollup/plugin-typescript'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { defineConfig } from 'vite'
// import svgLoader from 'vite-svg-loader'

export default defineConfig({
  build: {
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'index',
      formats: ['es', 'cjs', 'iife'],
      fileName: format =>
        format === 'iife' ? 'index.js' : `${format}/index.js`,
    },
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.ts'),
      },
      external: ['vue', '@vueuse/core'],
      output: {
        assetFileNames: assetInfo => {
          return assetInfo.name!
        },
        exports: 'named',
        globals: {
          vue: 'vue',
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          '@import "@tokene/styles/src/functions.scss";',
          '@import "@tokene/styles/src/mixins.scss";',
        ].join(''),
      },
    },
  },
  resolve: {
    dedupe: [
      'vue',
      '@distributedlab/w3p',
      '@tokene/styles',
      '@tokene/toolkit',
      '@tokene/ui-kit',
      'lodash',
    ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    typescript({
      include: [`${__dirname}/src/**/*.vue`],
      declaration: true,
      declarationDir: path.resolve(__dirname, 'dist/types'),
      rootDir: path.resolve(__dirname, 'src'),
      compilerOptions: {
        noEmit: false,
      },
    }),
    vue(),
    // svgLoader(),
  ],
})
