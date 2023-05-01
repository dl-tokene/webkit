import typescript from '@rollup/plugin-typescript'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      tsConfigFilePath: `${__dirname}/tsconfig.build.json`,
      outputDir: `${__dirname}/dist/types`,
      cleanVueFileName: true,
    }),
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
