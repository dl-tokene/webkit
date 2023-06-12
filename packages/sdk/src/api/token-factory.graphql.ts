import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core'

import { sdkConfig } from '@/config'

const cache = new InMemoryCache()

export let tokenFactoryApolloClient = {} as ApolloClient<NormalizedCacheObject>

export const init = () => {
  const client = new ApolloClient({
    link: createHttpLink({
      uri: sdkConfig.TOKEN_FACTORY_GRAPH_URL,
    }),
    cache,
  })
  tokenFactoryApolloClient = client
  return client
}
