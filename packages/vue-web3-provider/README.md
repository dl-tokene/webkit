# @tokene/vue-web3-provider
The Vue reactive wrapper for [@distributedlab/w3p](https://github.com/distributed-lab/web-kit/tree/main/packages/w3p)

![version (scoped package)](https://badgen.net/npm/v/@tokene/vue-web3-provider)
![types](https://badgen.net/npm/types/@tokene/vue-web3-provider)
![tree-shaking](https://badgen.net/bundlephobia/tree-shaking/@tokene/vue-web3-provider)
![checks](https://badgen.net/github/checks/dl-tokene/webkit/main)

## Getting Started

### Installing

```
yarn add @tokene/vue-web3-provider
```

#### Default example
```ts
import { useProvider } from '@tokene/vue-web3-provider'
import { ProviderDetector, MetamaskProvider } from '@distributedlab/w3p'

const providerDetector = new ProviderDetector()
const provider = useProvider()

const init = async () => {
  await providerDetector.init()
  await provider.init(MetamaskProvider, {
    providerDetector: ProviderDetector,
    listeners: {},
  })
}

init()
```

## Running the tests

```
yarn test
```

## More examples
Check out more examples and use-cases:
- [Multiple providers with the current selected one](https://github.com/distributed-lab/web-kit/blob/main/packages/w3p/examples/multiple-providers.ts)

## License

This project is licensed under the MIT License - see the [LICENSE.md](../../LICENSE) file for details
