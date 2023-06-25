# @tokene/sdk
These packages aim to provide developers with a set of commonly used functions and features to interact with TokenE graph and core contracts.

![version (scoped package)](https://badgen.net/npm/v/@tokene/sdk)
![types](https://badgen.net/npm/types/@tokene/sdk)
![tree-shaking](https://badgen.net/bundlephobia/tree-shaking/@tokene/sdk)
![checks](https://badgen.net/github/checks/dl-tokene/webkit/main)

<!-- TOC -->
* [@tokene/sdk](#tokenesdk)
  * [Getting Started](#getting-started)
    * [Installing](#installing)
    * [Setup](#setup)
  * [Here's the list of available features you can use in your app](#heres-the-list-of-available-features-you-can-use-in-your-app)
    * [Constants](#constants)
    * [Roles](#roles)
    * [Users](#users)
    * [Kyc](#kyc)
      * [Request statuses](#request-statuses)
      * [Management as Admin](#management-as-admin)
      * [Management as user](#management-as-user)
    * [Tokens](#tokens)
    * [Custom implementations](#custom-implementations)
      * [Core contracts](#core-contracts)
    * [Example](#example)
  * [Running the tests](#running-the-tests)
  * [Contribute](#contribute)
    * [New contracts interaction](#new-contracts-interaction)
    * [New graphql queries](#new-graphql-queries)
    * [New subgraphs](#new-subgraphs)
  * [License](#license)
<!-- TOC -->

## Getting Started

### Installing

```
yarn add @tokene/sdk
```

### Setup

To let the SDK work properly, you need to initialize:
- `sdkConfig` - to initialize the SDK graphQlClients and coreContracts
- `graphQlClients` - to provide the SDK utils and helpers know what graphQL clients it should work with
- `coreContracts` - to provide the SDK utils and helpers know what contracts it should work with
- `ExtensionsManager` - some of the SDK utils and helpers require to have access to the ExtensionsManager, so you need to provide it as well

```typescript
import {
  initSdkConfig,
  initGraphQlClients,
  initCoreContracts,
  extensionsManager
} from '@tokene/sdk'

import { config } from '@/config'

const init = async () => {
  /**
   * initSdkConfig - should be done at the very beginning of the app
   */
  initSdkConfig({
    CORE_GRAPH_URL: config.CORE_GRAPH_URL,
    TOKEN_FACTORY_GRAPH_URL: config.TOKEN_FACTORY_GRAPH_URL,

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

  /**
   * some of composables, helpers and utils require to have access to the ExtensionsManager,
   but if you ain't use them, you can skip this initialize, but you will not able to use some of sdk features
   */
  await extensionsManager.init()
}
```

## Here's the list of available features you can use in your app

### Constants
```ts
import { useConstants } from '@tokene/sdk'

const {
  loadConstants,
  addConstant,
  removeConstant,

  // Flag, which indicates if adding or removing constant is in progress
  isSubmitting,

  // reactive object, which you can modify before call loadConstants
  filters,

  // Flag, which indicates if constants are loaded
  isLoaded,
  // Flag, which indicates if loading constants was failed
  isLoadFailed,

  // List of loaded constants
  constants,
} = useConstants()
```

### Roles
```ts
import { useRoles } from '@tokene/sdk'

const {
  loadRoles,
  createRole,
  removeRolePermission,
  updateRole,
  grantRoles,
  revokeRoles,
  grantMasterRole,

  // list of roles from subgraph
  rolesWithResources,
  // parsed and flatten roles from subgraph
  roles,

  masterRoleId,
  bannedRoleId,
} = useRoles()
```

### Users
```ts
import { useUsers } from '@tokene/sdk'

const {
  filters,

  isLoaded,
  isLoadFailed,

  users,

  loadUsers,
  loadUser,
} = useUsers()
```

### Kyc

#### Request statuses

| Status      | value |
|-------------|-------|
| `NONE`      | 0     |
| `PENDING`   | 1     |
| `ACCEPTED`  | 2     |
| `REJECTED`  | 3     |
| `DROPPED`   | 4     |


#### Management as Admin
```ts
import { useKycManagement } from '@tokene/sdk'

const {
  isSubmitting,
  isLoaded,
  isLoadFailed,

  filters,

  kycList,
  selectedKyc,

  loadKycRequests,
  loadKycRequestById,

  acceptRequest,
  dropRequest,
  rejectRequest,
} = useKycManagement()
```

```ts
import { useUserDetails } from '@tokene/sdk'

const {
  isLoaded,
  isLoadFailed,
  isSubmitting,

  kyc,
  user,

  isUserBlocked,
  fullName,
  isRequestPending,

  preloadDetails,

  loadPendingKycRequest,
  loadAcceptedKycRequest,
  loadUser,
  loadAll,

  acceptRequest,
  dropRequest,
  rejectRequest,

  blockUser,
  unblockUser,
  revokeRole,
  assignRole,
} = useUserDetails('0x123...')
```

#### Management as user
```ts
import { useKycUser } from '@tokene/sdk'

const {
  isSubmitting,
  isLoaded,
  isLoadFailed,

  actualKyc,
  pendingKyc,
  rejectedKyc,

  init,

  loadAllKyc,

  dropKYCRequest,
  requestKYCRole,
  usersRequestInfo,
} = useKycUser()
```

### Tokens
```ts
import { useTokensManagement } from '@tokene/sdk'

const {
  init,

  deployTERC20,
  deployTERC721,
} = useTokensManagement()
```

### Custom implementations
If you have specific logic to develop, here's a list of necessary things you need to know to do it:

First of all - globals:
- [coreContracts](./src/globals/core-contracts.ts) - provide a list of methods and getter, which allow you to get access to core contracts or any other contracts listed on core graph
- [extensions-manager](./src/globals/extensions-manager.ts) - as while as TokenE is modular system, bunch of modules can be enabled or disabled, this provider will helps you to check if some of them are enabled or not

#### Core contracts
Core contracts - is a global provider to use for accessing to contracts registry, access management, constants registry and reviewable request contracts.

To get access them, you can, follow code below:

```ts
import { coreContracts } from '@tokene/sdk'

const {
  getMasterAccessManagement,
  getConstantsRegistry,
  getReviewableRequests,

  getContractAddressByName,
} = coreContracts.getMasterContractsRegistryContract()
```

```ts
import { coreContracts } from '@tokene/sdk'

const {
  addCombinedPermissionsToRole,
  removePermissionsFromRole,
  updateRolePermissions,
  grantRoles,
  revokeRoles,

  getMasterRoleId,
  getBannedRoleId,
} = coreContracts.getMasterAccessManagementContract()
```

```ts
import { coreContracts } from '@tokene/sdk'

const {
  addConstant,
  removeConstant,
} = coreContracts.getConstantsRegistryContract()
```

```ts
import { coreContracts } from '@tokene/sdk'

const {
  acceptRequest,
  createRequest,
  dropRequest,
  rejectRequest,
  updateRequest,
} = coreContracts.getReviewableRequestsContract()
```

```ts
import { coreContracts, useKycRequests } from '@tokene/sdk'

/**
 * You can get extension name by query in core subgraph
 * {
 *   contracts {
 *     id
 *     address
 *   }
 * }
 *
 * id will be your extensionName
 */
const contractAddress = await coreContracts.getContractAddressByName(extensionName)

const {
  dropKYCRequest,
  requestKYC,
  usersRequestInfo,
} = useKycRequests(
  contractAddress,
  coreContracts.provider,
  coreContracts.rawProvider,
)
```

```ts
import { coreContracts, useTokenFactory } from '@tokene/sdk'

const contractAddress = await coreContracts.getContractAddressByName(extensionName)

const {
  deployTERC20,
  deployTERC721,
} = useTokenFactory(
  contractAddress,
  coreContracts.provider,
)
```

```ts
import { coreContracts, useTokenRegistry } from '@tokene/sdk'

const contractAddress = await coreContracts.getContractAddressByName(extensionName)

const {
  countPools,
  listPools,
} = useTokenRegistry(
  contractAddress,
  coreContracts.provider,
  coreContracts.rawProvider,
)
```

```ts
import { coreContracts, useTerc20 } from '@tokene/sdk'

const contractAddress = '0x...'

const { mintTo } = useTerc20(
  contractAddress,
  coreContracts.provider,
)
```

```ts
import { coreContracts, useTerc721 } from '@tokene/sdk'

const contractAddress = '0x...'

const { mintTo } = useTerc721(
  contractAddress,
  coreContracts.provider,
)
```

Also you can use apollo clients, defined in this sdk to query necessary data from core, tokens and other subgraphs in TokenE environment

- [coreGraphClient](./src/api/core.graphql.ts)
- [tokenFactoryGraphClient](./src/api/token-factory.graphql.ts)

### Example
```ts
import {
  tokenFactoryApolloClient,
  type GetTerc20SByNamePaginatedQuery,
  GetTerc20SByNamePaginated
} from '@tokene/sdk'

/**
 * GetTerc20SByNamePaginatedQuery and GetTerc20SByNamePaginated was created by @graphql-codegen/cli
 * If you want to use your own custom query, you can use gql instead
 */
const { data } =
  await tokenFactoryApolloClient.query<GetTerc20SByNamePaginatedQuery>({
    query: GetTerc20SByNamePaginated,
    fetchPolicy: 'network-only',
    variables: {
      name: searchInput.value,
      offset: filters.offset,
      limit: filters.limit,
    },
  })
```

## Running the tests

```
yarn test
```

## Contribute
By adding new feature to this SDK, here's a few moments developer should follow:

### New contracts interaction
- Place new contract ABI json file to [abi](./abi)
- run `yarn workspace @tokene/sdk generate-ether-types`

### New graphql queries
- Define and place new graphql file to specific directory in [graphql](./graphql)
- run `yarn workspace @tokene/sdk generate-graphql-types`

### New subgraphs
- Define new ApolloClient in [api](./src/api)

## License

This project is licensed under the MIT License - see the [LICENSE.md](../../LICENSE) file for details
