import typescript from '@rollup/plugin-typescript'
import vue from '@vitejs/plugin-vue'
import * as fs from 'fs'
import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'

const getAllNestedComponentsPaths = (
  dir = path.resolve(__dirname, 'src'),
): string[] => {
  const componentsPaths = []
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      componentsPaths.push(...getAllNestedComponentsPaths(fullPath))
    } else if (stat.isFile() && file.endsWith('.vue')) {
      componentsPaths.push(fullPath)
    }
  }

  return componentsPaths
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const isDevelopment = env.VITE_APP_ENVIRONMENT === 'development'

  return {
    build: {
      cssCodeSplit: true,
      cssMinify: 'esbuild',
      sourcemap: true,
      rollupOptions: {
        input: [
          ...getAllNestedComponentsPaths(),
          path.resolve(__dirname, 'src/enums/index.ts'),
        ],
        output: {
          chunkFileNames: '[name].js',
          entryFileNames: '[name].js',
          assetFileNames: '[name].[ext]',

          exports: 'named',
          globals: {
            vue: 'vue',
          },
          inlineDynamicImports: false,
          preserveModules: false,
        },
        external: [
          'vue',
          'vue-router',
          '@tokene/toolkit',
          '@tokene/styles',
          '@tokene/vue-web3-provider',
          '@distributedlab/tools',
          '@distributedlab/w3p',
          '@distributedlab/jac',
          '@vuelidate/core',
          '@vuelidate/validators',
          'vueuse/core',
        ],
      },
      lib: {
        entry: [
          ...getAllNestedComponentsPaths(),
          path.resolve(__dirname, 'src/enums/index.ts'),
        ],
        name: 'index',
        formats: ['es'],
        fileName: (format, entryName) => `${format}/${entryName}.js`,
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
        '@tokene/toolkit',
        '@tokene/styles',
        '@tokene/vue-web3-provider',
        '@distributedlab/tools',
        '@distributedlab/w3p',
        '@distributedlab/jac',
        '@vuelidate/core',
        '@vuelidate/validators',
        'vueuse/core',
      ],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      typescript({
        include: [
          path.resolve(__dirname, 'src/**/*.ts'),
          path.resolve(__dirname, 'src/**/*.vue'),
        ],
        exclude: [path.resolve(__dirname, '/node_modules/**')],

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
      viteStaticCopy({
        targets: [
          {
            src: 'src/assets',
            dest: '',
          },
        ],
      }),
      svgLoader(),
    ],
  }
})
