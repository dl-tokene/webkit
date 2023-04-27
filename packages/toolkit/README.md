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

  await initApi(clientConfig.API_URL)

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
