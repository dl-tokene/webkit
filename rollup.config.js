import fs from "fs"
import path from "path"
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import alias from "@rollup/plugin-alias"
import nodePolyfills from 'rollup-plugin-polyfill-node'

const packages = fs.readdirSync(path.resolve(__dirname, './packages'))

export default packages.map((pkg) => ({
  input: `./packages/${pkg}/src/index.ts`,
  output: {
    sourcemap: true,
    file: `./packages/${pkg}/dist/index.js`,
    name: `tokene_${pkg}`,
    format: 'iife'
  },
  plugins: [
    commonjs(),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    nodePolyfills(),
    ...(pkg === "toolkit" ? [
      alias({
        entries: [
          {find: 'ipfs-http-client', replacement: 'node_modules/ipfs-http-client/dist/index.min.js'},
          {find: 'ethers', replacement: 'node_modules/ethers/dist/ethers.esm.js'},
          {find: 'near-api-js', replacement: 'node_modules/near-api-js/dist/near-api-js.js'},
        ]
      }),
    ] : []),
    babel({
      babelHelpers: 'bundled',
      exclude: ['./packages/**/src/tests', './packages/**/src/*.test.ts']
    }),
    typescript({
      tsconfig: `./packages/${pkg}/tsconfig.json`,
    }),
    json(),
    terser(),
  ],
}))
