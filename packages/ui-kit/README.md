# @tokene/toolkit
These packages aim to provide developers with a set of commonly used components for building TokenE web applications.

![version (scoped package)](https://badgen.net/npm/v/@tokene/ui-kit)
![types](https://badgen.net/npm/types/@tokene/ui-kit)
![tree-shaking](https://badgen.net/bundlephobia/tree-shaking/@tokene/ui-kit)
![checks](https://badgen.net/github/checks/dl-tokene/webkit/main)

## Getting Started

### Installing

```
yarn add @tokene/styles @tokene/ui-kit
```

In your main style file:
```scss
@import '@tokene/styles';

@import '@tokene/ui-kit/dist/index.css';
```

### Basic usage
```vue
<template>
  <div class="some-component">
    <app-button :text="`Hello World`" @click="handleButtonClick" />
  </div>
</template>

<script lang="ts" setup>
import { AppButton } from '@tokene/ui-kit'

const handleButtonClick = () => {
  alert('Hello World')
}
</script>
```

### Icon
To use icons in your application, you need to import and register [icons](./src/assets/icons) as sprites

#### Example for `vite-plugin-svg-icons`
`vite.config.ts`
```ts
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import path from 'path'

export default defineConfig(({ command, mode }) => {

  return {
    ...,
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [
          // icons from ui-kit
          path.resolve(__dirname, 'node_modules/@tokene/ui-kit/src/assets/icons'),
          // own icons
          path.resolve(process.cwd(), 'src/assets/icons'),
        ],
        symbolId: '[name]',
      }),
    ],
  }
})
```

## Running the tests

```
yarn test
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](../../LICENSE) file for details
