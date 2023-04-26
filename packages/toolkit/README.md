# @tokene/toolkit
These packages aim to provide developers with a set of commonly used functions and features for building TokenE web applications, such as handling big numbers, date manipulation, subscribing to and receiving notifications when certain events occur with EventEmitter, and more.

![version (scoped package)](https://badgen.net/npm/v/@tokene/toolkit)
![types](https://badgen.net/npm/types/@tokene/toolkit)
![tree-shaking](https://badgen.net/bundlephobia/tree-shaking/@tokene/toolkit)
![checks](https://badgen.net/github/checks/dl-tokene/webkit/main)

## Getting Started

### Installing

```
yarn add @tokene/toolkit
```

#### Work with IPFS
```ts
import { IpfsUtil } from '@tokene/toolkit'

const ipfsEntity = new IpfsUtil({
  rawData: JSON.stringify({
    someData: 'lorem ipsum dolor sit amet concestetur!',
  }),
})

await ipfsEntity.uploadSelf()
```

## Running the tests

```
yarn test
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](../../LICENSE) file for details
