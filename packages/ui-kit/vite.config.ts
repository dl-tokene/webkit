import typescript from '@rollup/plugin-typescript'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    typescript({
      include: [`${__dirname}/src/**/*.vue`],
      compilerOptions: {
        outDir: 'dist',
        sourceMap: true,
        declaration: true,
        declarationMap: true,
      },
      exclude: ['vite.config.js'],
    }),
  ],
  build: {
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      entry: `${__dirname}/src/index.ts`,
      name: 'index',
      formats: ['es', 'cjs', 'iife'],
      fileName: format =>
        format === 'iife' ? 'index.js' : `${format}/index.js`,
    },
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.ts'),
      },
      external: ['vue'],
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
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
