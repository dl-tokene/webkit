import typescript from "@rollup/plugin-typescript";
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import alias from '@rollup/plugin-alias'
import nodePolyfills from 'rollup-plugin-polyfill-node'

const packageDirName = __dirname.split('/').pop().replaceAll('-', '_')

export default {
  input: `${__dirname}/src/index.ts`,
  output: {
    sourcemap: true,
    file: `${__dirname}/dist/index.js`,
    name: `tokene_${packageDirName}`,
    format: 'iife',
  },
  external: ['vue'],
  plugins: [
    commonjs(),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    nodePolyfills(),
    alias({
      entries: [
        {find: 'ipfs-http-client', replacement: '../../node_modules/ipfs-http-client/dist/index.min.js'},
        {find: 'ethers', replacement: '../../node_modules/ethers/dist/ethers.esm.js'},
        {find: 'near-api-js', replacement: '../../node_modules/near-api-js/dist/near-api-js.js'},
      ],
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: [`${__dirname}/src/tests`, `${__dirname}/src/*.test.ts`],
    }),
    typescript({
      tsconfig: `${__dirname}/tsconfig.json`,
    }),
    json(),
    terser(),
  ],
}
