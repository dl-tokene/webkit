import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core'

import { sdkConfig } from '@/config'

const cache = new InMemoryCache()

export let coreApolloClient = {} as ApolloClient<NormalizedCacheObject>

export const init = () => {
  const client = new ApolloClient({
    link: createHttpLink({
      uri: sdkConfig.CORE_GRAPH_URL,
    }),
    cache,
  })
  coreApolloClient = client
  return client
}
