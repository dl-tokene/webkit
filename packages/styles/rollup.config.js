import sassPlugin from 'rollup-plugin-sass'
import sass from 'sass'
import { writeFileSync } from 'fs'
import cleanCSS from 'clean-css'


const packageDirName = __dirname.split('/').pop()

export default [
  {
    input: `${__dirname}/src/index.ts`,
    output: {
      file: `dist/${packageDirName}.js`,
      format: 'es',
    },
    plugins: [
      sassPlugin({
        output: true,
        options: {
          implementation: sass, // Use Dart Sass
        },
      }),
    ],
  },
  {
    input: `${__dirname}/src/index.ts`,
    output: {
      file: `dist/${packageDirName}.js`,
      format: 'es',
    },
    plugins: [
      sassPlugin({
        output: (styles) => {
          const minified = new cleanCSS().minify(styles)
          writeFileSync(`dist/${packageDirName}.min.css`, minified.styles)
        },
        options: {
          implementation: sass, // Use Dart Sass
        },
      }),
    ],
  },
]
