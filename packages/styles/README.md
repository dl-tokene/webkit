# @tokene/styles
Default styles for every single TokenE frontend project with common utility as like as toRem, ...etc, mixins and variables

![version (scoped package)](https://badgen.net/npm/v/@tokene/styles)
![checks](https://badgen.net/github/checks/dl-tokene/webkit/main)

## Getting Started

### Installing

```
yarn add @tokene/styles
```

First of all, you need to initialize globals in the highest level of your application:

```scss
@import '@tokene/styles';

.some-class {
  color: var(--primary-main);
  background: var(--background-primary-dark);
}
```

In ts/js files

```ts
import '@tokene/styles/src/index.scss'
import '@tokene/styles/dist/styles.css'
import '@tokene/styles/dist/styles.min.css'
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](../../LICENSE) file for details
