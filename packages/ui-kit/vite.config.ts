import typescript from '@rollup/plugin-typescript'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { PluginPure } from 'rollup-plugin-pure'
import { defineConfig, loadEnv } from 'vite'
import ViteComponents from 'vite-plugin-components'
// import { viteStaticCopy } from 'vite-plugin-static-copy'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const isDevelopment = env.VITE_APP_ENVIRONMENT === 'development'

  return {
    build: {
      cssCodeSplit: false,
      cssMinify: 'esbuild',
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'index',
        formats: ['es'],
        // fileName: (format, entryName) => `${format}/${entryName}.js`,
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
          // assetFileNames: assetInfo => {
          //   return assetInfo.name!
          // },
          exports: 'named',
          globals: {
            vue: 'vue',
          },
          inlineDynamicImports: false,
          preserveModules: true,
          // preserveSymlinks: false,
          // shimMissingExports: false,
          // strictDeprecations: true,
          // treeshake: 'safest',
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
      // PluginPure({
      //   functions: ['defineComponent'],
      //   include: [/(?<!im)pure\.js$/],
      //   // exclude: [],
      //   // sourcemap: true,
      // }),
      ViteComponents({
        // Configure Vite Components plugin
        // Use array of directories where your components are located
        dirs: ['src'],
        deep: true, // Allow subdirectories to be scanned
        extensions: ['vue'], // Specify file extensions to search for
      }),
    ],
  }
})
