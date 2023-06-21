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

### Default example
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

## Once you need to support multiple providers

```ts
import {
  CHAIN_TYPES,
  CoinbaseProvider,
  FallbackEvmProvider,
  MetamaskProvider,
  Provider,
  ProviderDetector,
  ProviderProxyConstructor,
  PROVIDERS,
  RawProvider,
  wrapExternalEthProvider,
} from '@distributedlab/w3p'
import { TokenEProvider, useProvider } from '@tokene/vue-web3-provider'
import { providers } from 'ethers'
import { config } from '@config'
import { DECIMALS } from '@distributedlab/tools'
import { ref } from 'vue'

enum EXTERNAL_PROVIDERS {
  TokenE = 'tokene',
}

const SUPPORTED_PROVIDERS = {
  TokenE: EXTERNAL_PROVIDERS.TokenE,
  ...PROVIDERS,
}

type SUPPORTED_PROVIDER =
  (typeof SUPPORTED_PROVIDERS)[keyof typeof SUPPORTED_PROVIDERS]

const currentProviderType = ref<SUPPORTED_PROVIDER>()

const provider = useProvider()

const providerDetector = new ProviderDetector<EXTERNAL_PROVIDERS>()

async function init(providerType?: SUPPORTED_PROVIDER) {
  try {
    await providerDetector.init()

    if (window.tokene) {
      providerDetector.addProvider({
        name: EXTERNAL_PROVIDERS.TokenE,
        instance: wrapExternalEthProvider(
          window.tokene as providers.ExternalProvider,
        ) as RawProvider,
      })
    }

    Provider.setChainsDetails({
      [config.SUPPORTED_CHAIN_ID]: {
        id: config.SUPPORTED_CHAIN_ID,
        name: config.SUPPORTED_CHAIN_NAME,
        rpcUrl: config.SUPPORTED_CHAIN_RPC_URL,
        explorerUrl: config.SUPPORTED_CHAIN_EXPLORER_URL,
        token: {
          name: '',
          symbol: '',
          decimals: DECIMALS.WEI,
        },
        type: CHAIN_TYPES.EVM,
        icon: '',
      },
    })

    const supportedProviders: {
      [key in SUPPORTED_PROVIDER]?: ProviderProxyConstructor
    } = {
      [PROVIDERS.Fallback]: FallbackEvmProvider,
      [PROVIDERS.Metamask]: MetamaskProvider,
      [PROVIDERS.Coinbase]: CoinbaseProvider,
      [EXTERNAL_PROVIDERS.TokenE]: TokenEProvider as ProviderProxyConstructor,
    }

    const selectedProviderType: SUPPORTED_PROVIDER =
      providerType ?? currentProviderType.value ?? PROVIDERS.Fallback

    const providerProxyConstructor: ProviderProxyConstructor | undefined =
      currentProviderType.value
        ? supportedProviders[selectedProviderType]
        : undefined

    if (!providerProxyConstructor) return

    await provider.init<EXTERNAL_PROVIDERS>(providerProxyConstructor, {
      providerDetector: providerDetector,
      listeners: {},
    })

    if (!provider.isConnected?.value) {
      await provider.connect()
    }
  } catch (error) {
    currentProviderType.value = undefined
  }
}
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
