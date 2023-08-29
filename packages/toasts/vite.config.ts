import typescript from '@rollup/plugin-typescript'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
// import svgLoader from 'vite-svg-loader'
import { PluginPure } from 'rollup-plugin-pure'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    cssCodeSplit: false,
    cssMinify: 'esbuild',
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'index',
      formats: ['es'],
      fileName: (format, entryName) => {
        console.log(format, entryName)
        return format === 'iife' ? 'index.js' : `${format}/index.js`
      },
    },
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.ts'),
      },
      external: ['vue', '@vueuse/core'],
      output: {
        assetFileNames: assetInfo => assetInfo.name!,
        exports: 'named',
        globals: {
          vue: 'vue',
        },
        // inlineDynamicImports: false,
        // esModule: true,
        preserveModules: true,
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
    PluginPure({
      functions: ['defineComponent'],
      include: [/(?<!im)pure\.js$/],
      // exclude: [],
      // sourcemap: true,
    }),
  ],
})
