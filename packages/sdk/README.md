# @tokene/sdk
These packages aim to provide developers with a set of commonly used functions and features to interact with TokenE graph and core contracts.

![version (scoped package)](https://badgen.net/npm/v/@tokene/sdk)
![types](https://badgen.net/npm/types/@tokene/sdk)
![tree-shaking](https://badgen.net/bundlephobia/tree-shaking/@tokene/sdk)
![checks](https://badgen.net/github/checks/dl-tokene/webkit/main)

## Getting Started

### Installing

```
yarn add @tokene/sdk
```

### Setup

To let the SDK work properly, you need to initialize:
- sdkConfig - to initialize the SDK graphQlClients and coreContracts
- graphQlClients - to provide the SDK utils and helpers know what graphQL clients it should work with
- coreContracts - to provide the SDK utils and helpers know what contracts it should work with
- ExtensionsManager - some of the SDK utils and helpers require to have access to the ExtensionsManager, so you need to provide it as well

```typescript
import {
  initSdkConfig,
  initGraphQlClients,
  initCoreContracts,
  extensionsManager
} from '@tokene/sdk'

const init = async () => {
  /**
   * initSdkConfig - should be done at the very beginning of the app
   */
  initSdkConfig({
    CORE_GRAPH_URL: config.CORE_GRAPH_URL,
    MASTER_CONTRACTS_REGISTRY_CONTRACT_ADDRESS: config.MASTER_CONTRACTS_REGISTRY_CONTRACT_ADDRESS,
  })

  /**
   * initGraphQlClients - should be done at the very beginning of the app, rigiht after initSdkConfig
   */
  initGraphQlClients()

  /**
   * initCoreContracts - should be done after user connected to the wallet, or after Fallback provider initialized if you use so
   */
  await initCoreContracts(
    web3ProvidersStore.provider.getProvider()!,
    web3ProvidersStore.provider.rawProvider!,
  )

  await extensionsManager.init()
}
```

To get access to core contracts as like as constants-registry or master access management, [...etc](./abi):

```ts
import { coreContracts } from '@tokene/sdk'

const masterContractsRegistryContract = coreContracts.getMasterContractsRegistryContract()
const masterAccessManagementContract = coreContracts.getMasterAccessManagementContract()
const constantsRegistryContract = coreContracts.getConstantsRegistryContract()
const reviewableRequestsContract = coreContracts.getReviewableRequestsContract()
```

some of composables, helpers and utils require to have access to the ExtensionsManager,
but if you ain't use them, you can skip `extensionsManager.init()` but you will not able to use some of sdk features, for example:

- [use-kyc-requests.ts](src/composables/use-kyc-requests.ts)

Usage of this contracts you can check in [composables](./src/composables)

Furthermore, here's some prepared composables you can use in your app, if you haven't some specific needs:

- [use-constants.ts](./src/composables/use-constants.ts)
- [use-kyc-requests.ts](./src/composables/use-kyc-requests.ts)
- [use-roles.ts](./src/composables/use-roles.ts)
- [use-user-details.ts](./src/composables/use-user-details.ts)
- [use-users.ts](./src/composables/use-users.ts)
## Running the tests

```
yarn test
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](../../LICENSE) file for details
