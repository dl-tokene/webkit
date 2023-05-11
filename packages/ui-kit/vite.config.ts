import typescript from '@rollup/plugin-typescript'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
// import { viteStaticCopy } from 'vite-plugin-static-copy'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const isDevelopment = env.VITE_APP_ENVIRONMENT === 'development'

  return {
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
        external: [
          'vue',
          'vue-router',
          '@vuelidate/core',
          '@vuelidate/validators',
          '@vueuse/core',
        ],
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
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      dedupe: [
        'vue',
        '@tokene/toasts',
        '@tokene/ui-kit',
        '@tokene/toolkit',
        '@tokene/styles',
        '@tokene/vue-web3-provider',
        '@distributedlab/tools',
        '@distributedlab/w3p',
        '@distributedlab/jac',
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
      ...(isDevelopment
        ? [
            createSvgIconsPlugin({
              iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
              symbolId: '[name]',
            }),
          ]
        : []),
      // viteStaticCopy({
      //   targets: [
      //     {
      //       src: 'src/assets/**/*',
      //       dest: 'assets',
      //     },
      //   ],
      // }),
      svgLoader(),
    ],
  }
})
