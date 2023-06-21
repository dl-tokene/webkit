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

First of all, you need to initialize globals in the highest level of your application:

```ts
import { initApi, fetchAndParseConfig, initToolkitConfig, getConfigFromEnv } from '@tokene/toolkit'
import { clientConfig } from '@config'

const init = async () => {
  getConfigFromEnv<typeof clientConfig>(clientConfig, import.meta.env, document.ENV)

  await initApi(clientConfig.API_URL, [
    {
      request: createBearerAttachInterceptorHandler(() => {
        return accessToken
      }),
      error: createRefreshTokenInterceptorHandler(
        () => {
          return accessToken
        },
        async () => {
          await refreshToken()
        },
        async () => {
          logout()
        },
      ),
    },
  ])

  await fetchAndParseConfig<typeof clientConfig>(clientConfig, import.meta.env, document.ENV)

  await initToolkitConfig({
    API_IPFS_URL: clientConfig.API_IPFS_URL,
  })
}

init()
```

This will make package works properly with your environment.
- `getConfigFromEnv` - get some required config from .env or env.js, if you ain't hardcoded it in your code
- `initApi` is need to initialize API fetcher for utils
- `fetchAndParseConfig` is need to fetch and parse config from API | process.env | document.ENV (mostly it's a helper for client side to fetch env variables from API or .env or env.js, you can skip this step if you just get variables from env or custom places)
- `initToolkitConfig` is need to initialize global variables which utils use

If you're using `helpers`, `errors`, `enums` only, you can skip this step.

## Composables

### useFile
```ts
import { useFile } from '@tokene/toolkit'

const { file, open } = useFile()

const loadfile = async () => {
  await open()
  console.log(file.value)
}
```

### useForm
#### API

| property                      | description                                                                                       |
|-------------------------------|---------------------------------------------------------------------------------------------------|
| `isFormDisabled`              | According to disableForm or enableForm, detect is form state is disabled now                      |
| `isFormPending`               | According to hideConfirmationAfterSubmit, detect is form state is pending now                     |
| `isConfirmationShown`         | According to ShowConfirmation or hideConfirmation, detect is form state in confirmation stage     |
| `disableForm`                 | Disable form state (make isFormDisabled true)                                                     |
| `enableForm`                  | Enable form state (make isFormDisabled true)                                                      |
| `showConfirmation`            | Go to confirmation step (make isConfirmationShown true)                                           |
| `hideConfirmation`            | Cancel or finish confirmation step (make isConfirmationShown true)                                |
| `hideConfirmationAfterSubmit` | Enable pending, call the submit fn from parameters, hide confirmation, then disable pending state |

#### Basic Example
```vue
<template>
  <form class="some-form" @submit.prevent="submit">
    <input type="text" v-model="form.email">
    <input type="text" v-model="form.password">
    <button type="submit" :disabled="isFormDisabled">submit</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { ErrorHandler, useForm } from "@tokene/toolkit"

const form = reactive({
  email: '',
  password: '',
})

const { disableForm, enableForm, isFormDisabled } = useForm()

const submit = async () => {
  disableForm()

  try {
    // POST some data
  } catch (error) {
    ErrorHandler.process(error)
  }

  enableForm()
}
</script>
```

### useFormValidation
#### API

| property               | description                                |
|------------------------|--------------------------------------------|
| `isFieldsValid`          | Check if all fields pass validators        |
| `getFieldErrorMessage`   | Get message for specific field             |
| `touchField`             | Enable `dirty` property for specific field |
| `isFormValid`            | Touch all fields to check if all is valid  |


#### Basic Example
```vue
<template>
  <form class="some-form" @submit.prevent="submit">
    <input type="text" v-model="form.email" @blur="touchField('form.email')">
    <span>{{ getFieldErrorMessage('form.email') }}</span>
    <input type="password" v-model="form.password" @blur="touchField('form.email')">
    <span>{{ getFieldErrorMessage('form.email') }}</span>
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ErrorHandler, useFormValidation, required, email } from '@tokene/toolkit'

const form = reactive({
  email: '',
  password: '',
})

const {
  getFieldErrorMessage,
  touchField,
  isFormValid
} = useFormValidation(
  form,
  {
    email: {
      required,
      email,
    },
    password: {
      required,
    }
  },
)

const submit = async () => {
  if (!isFormValid()) return

  try {
    // POST some data
  } catch (error) {
    ErrorHandler.process(error)
  }
}
</script>
```

### useUniversalStorage

```ts
import { useUniversalStorage } from '@tokene/toolkit'

const STORE_KEY = 'some-key'

const storageState = useUniversalStorage<{
  someData?: string
}>(
  STORE_KEY,
  {
    someData: 'lorem ipsum',
  },
  {
    // bassically you can use localstorage by activating it here
    isLocalStorage: true,
    // if you want to place data in session storage too
    isSessionStorage: true,
    // same for cookies
    isCookieStorage: true,
  },
)
```
If `isLocalStorage`, `isSessionStorage`, `isCookieStorage` enabled at the same time - data from cookie will duplicated and rewrited in sessionStorage and then in localStorage.

Same for case when sessionStorage and localStorage enabled, sessionStorage data will be duplicated and rewrited in localStorage

### useViewportSizes
Set `--vh` css variable to use it in your styles, e. g. for actual height of 100vh in mobile devices
```ts
import { useViewportSizes } from '@tokene/toolkit'

const { assignVhCssVariable } = useViewportSizes()

assignVhCssVariable()
```

## Globals

### EventBus
By defining this class in your client app will allow you to create typed event bus with access to default event-bus of toolkit

Some default events:
```ts
export enum DEFAULT_BUS_EVENTS {
  error = 'error',
  warning = 'warning',
  success = 'success',
  info = 'info',

  refreshToken = 'refreshToken',
  logout = 'logout',
}
```

#### Basic Example
```ts
import { EventBus } from '@tokene/toolkit'

export enum EVENTS {
  toggleSidebar = 'toggleSidebar',
  initApp = 'initApp',
}

export type AppEventMap = {
  [EVENTS.toggleSidebar]: void
  [EVENTS.initApp]: void
}

export const Bus = new EventBus<AppEventMap>()

Bus.on(EVENTS.toggleSidebar, () => {
  // do something
})

Bus.emit(EVENTS.toggleSidebar)
```

### JsonApi Client with authentication
After init config snippet at the start of this README, you can use api variable to query basic services in TokenE environment.

To better understanding how to use this client, head to [@distributedlab/jac](https://distributed-lab.github.io/web-kit/modules/_distributedlab_jac.html#distributedlabjac)

### Config
The variable, which need to be initialized at the start of your app, necessary for utils and `@tokene/sdk` to work properly

## Helpers

### Auth helpers
Few methods to auth in app

| Method          | Description                                             |
|-----------------|---------------------------------------------------------|
| `getAuthNonce`  | Get message from auth-service to sign in wallet         |
| `login`         | Get JWT token by user wallet address and signed message |
| `refreshToken`  | Refresh token after it has expired                      |

### Clipboard helpers
| Method               | Description               |
|----------------------|---------------------------|
| `copyToClipboard`    | Copy string to clipboard  |
| `readFromClipboard`  | Get string from clipboard |


### Config helpers

| Method                  | Description                                                                                 |
|-------------------------|---------------------------------------------------------------------------------------------|
| `getConfigFromService`  | Get config map from key-value service in TokenE environment                                 |
| `getConfigFromEnv`      | Get config map from .env file if it use in app                                              |
| `fetchAndParseConfig`   | Do both of previous methods, firstly fetch from service and then overrides it by env config |


### Date formatting helpers

| Method              | Description                                                                              |
|---------------------|------------------------------------------------------------------------------------------|
| `formatDateFromNow` | Get time from or to specific date                                                        |
| `formatDMY`         | Format date in `DD/MM/YYYY` format by default, but you can pass another format           |
| `formatDMYT`        | Format date in `DD.MM.YYYY, hh:mm:ss` format by default, but you can pass another format |


### Device helpers

| Method        | Description                       |
|---------------|-----------------------------------|
| `isMobile`    | Check if current device is mobile |

### ErrorHandler helpers

Return message for commonly used errors

| Method                   | Description                                                          |
|--------------------------|----------------------------------------------------------------------|
| `process`                | Emit toolkitBus error event with defined message from error instance |
| `processWithoutFeedback` | log.error error message                                              |

```ts
import { ErrorHandler } from '@tokene/toolkit'

const submit = async () => {
  try {
    // POST some data
  } catch (error) {
    ErrorHandler.process(error)
  }
}
```

By default ErrorHandlers handle this errors:

| Error instance                           |                                                                                                                               |
|------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `ProviderChainNotFoundError`             | Chain not found                                                                                                               |
| `ProviderInjectedInstanceNotFoundError`  | Provider injected instance not found                                                                                          |
| `ProviderUserRejectedRequest`            | -                                                                                                                             |
| `ProviderUnauthorized`                   | The requested method and/or account has not been authorized by the user                                                       |
| `ProviderUnsupportedMethod`              | The Provider does not support the requested method                                                                            |
| `ProviderDisconnected`                   | The Provider is disconnected from all chains                                                                                  |
| `ProviderChainDisconnected`              | The Provider is not connected to the requested chain                                                                          |
| `ProviderParseError`                     | Invalid JSON                                                                                                                  |
| `ProviderInvalidRequest`                 | JSON is not a valid request object                                                                                            |
| `ProviderMethodNotFound`                 | Method does not exist                                                                                                         |
| `ProviderInvalidParams`                  | Invalid method parameters                                                                                                     |
| `ProviderInternalError`                  | - return parsed error `cause` or `reason` from error instance using `handleEthereumProviderInternalError` method              |
| `ProviderInvalidInput`                   | Missing or invalid parameters                                                                                                 |
| `ProviderResourceNotFound`               | Requested resource not found                                                                                                  |
| `ProviderResourceUnavailable`            | Requested resource not available                                                                                              |
| `ProviderTransactionRejected`            | Transaction creation failed                                                                                                   |
| `ProviderMethodNotSupported`             | Method is not implemented                                                                                                     |
| `ProviderLimitExceeded`                  | Request exceeds defined limit                                                                                                 |
| `ProviderJsonRpcVersionNotSupported`     | Version of JSON-RPC protocol is not supported                                                                                 |
| `BadRequestError`                        | Get error message by `originalError.response.data.errors[0].code`                                                             |

Else, if no one case was found, you will receive `Oops... Something went wrong` error message.

If your app has to handle another custom errors, you can set it by:
```ts
ErrorHandler.setCustomErrorMessageGetter((error: Error) => {
  if (error instanceof Error) {
    switch (error.constructor) {
      case MyCustomError1:
        return 'custom error message 1'
      case MyCustomError2:
        return 'custom error message 2'
      default:
        return 'Oops... Something went wrong again'
    }
  }
})
```

### Ethereum helpers

| Method                                | Description                                                                                                                                                    |
|---------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `verifyEthAddress`                    | Check if following string is valid eth address                                                                                                                 |
| `handleEthereumProviderInternalError` | Commonly TokenE Core contracts return error message, which contain details within it, so this method will parse string and return more detailed message for UI |
| `increaseGasLimit`                    | Estimate and multiply necessary gas limit for transaction                                                                                                      |


### Format helpers (bignumber)

| Method                    | Description                                                                                                                                         |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `formatNumber`            | Format token by get from fraction it, e. f. with number 10 * 10**18 and decimals 18, you will receive 10                                            |
| `formatTokenAmount`       | Trim decimal zeros of result of formatNumber method                                                                                                 |
| `formatTokenBalance`      | Convert and add prefix for formatNumber method result                                                                                               |
| `formatPercentageAmount`  | Commonly in eth contracts use decimals 25 for percentage amounts, so this method do formatNumber with decimals by default, but it can be overridden |
| `trimDecimalZeros`        | Cut unnecessary zeros from decimals if it has                                                                                                       |
| `convertNumberWithPrefix` | Convert and add prefix for large numbers                                                                                                            |


### Promise helpers

| Method    | Description                                             |
|-----------|---------------------------------------------------------|
| `sleep`   | Analogue for Promise timeout but in async / await style |


### Text helpers

| Method              | Description                                                                                           |
|---------------------|-------------------------------------------------------------------------------------------------------|
| `abbrCenter`        | Crop text and place `...` between                                                                     |
| `extractRootDomain` | Do the same as new URL(url).hostname, but with few differences, mostly useful for multiple subdomains |


### Validators
Common methods for `useFormValidation` composable, check value and return error message if it's invalid

| Validator   | Description                             |
|-------------|-----------------------------------------|
| required    | Field must be not empty                 |
| requiredIf  | Field must be not empty if ...          |
| email       | Field must be valid email               |
| minLength   | Field must contain at least ... symbols |
| maxLength   | Field must contain maximum ... symbols  |
| sameAs      | Field must be same as ... field         |
| ethAddress  | Field mus be valid eth address          |

You can create your own validator in your app, e.g. maxValue from vuelidate:
```ts
import type { ValidationRule } from '@vuelidate/core'
import { createI18nMessage, type MessageProps, maxValue } from '@vuelidate/validators'
import { i18next } from '@/localization'

const { t } = i18next

const messagePath = ({ $validator }: MessageProps) =>
  `validations.field-error_${$validator}`

const withI18nMessage = createI18nMessage({ t, messagePath })

export const myMaxValue = (length: number): ValidationRule =>
  <ValidationRule>withI18nMessage(maxValue(length))
```

Then create message in your localization file:
```json
{
  "validations": {
    "field-error_myMaxValue": "Field must be less than {length}"
  }
}
```
## Utils

#### Work with IPFS
```ts
import { IpfsUtil } from '@tokene/toolkit'

const ipfsEntity = new IpfsUtil<{ someData: string }>({
  rawData: JSON.stringify({
    someData: 'lorem ipsum dolor sit amet concestetur!',
  }),
})

await ipfsEntity.uploadSelf()

const newIpfsEntity = new IpfsUtil<{ someData: string }>({
  path: ipfsEntity.path,
})

// for example: to pass to img src or link
await newIpfsEntity.publicUrl

// for example: to set data to variable
const newIpfsEntityData = await newIpfsEntity.loadSelf()
console.log(newIpfsEntityData)
```

#### Work with Blob service using BlobUtil
```ts
import { BlobUtil } from '@tokene/toolkit'

const blobEntity = new BlobUtil<{ someData: string }>({
  rawData: {
    someData: 'lorem ipsum dolor sit amet concestetur!',
  },
})

await blobEntity.create()

const newBlobEntity = new BlobUtil<{ someData: string }>({
  id: blobEntity.id,
})

await newBlobEntity.load()
console.log(newBlobEntity.rawData.someData)
```

#### Work with Storage service using StorageUtil
```ts
import { StorageUtil } from '@tokene/toolkit'

const avatarFile = new File([''], 'avatar.png', { type: 'image/png' })

const avatarStorageEntity = new StorageUtil({
  file: avatarFile,
})

await avatarStorageEntity.uploadSelf()

const newAvatarStorageEntity = new StorageUtil({
  id: avatarStorageEntity.id,
})

await newAvatarStorageEntity.load()
console.log(newAvatarStorageEntity.link)
```

#### Work with Storage service using StorageUtil
```ts
import { KeyValueUtil } from '@tokene/toolkit'

const kvUtil = new KeyValueUtil()

await kvUtil.create('SOME_KEY', 'SOME_VALUE')

const data = await kvUtil.get<string>('SOME_KEY')

console.log(data)
```

## Running the tests

```
yarn test
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](../../LICENSE) file for details
