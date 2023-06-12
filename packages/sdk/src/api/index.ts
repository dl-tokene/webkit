import { init as initCoreClient } from './core.graphql'
import { init as initTokensClient } from './token-factory.graphql'

export function initGraphQlClients() {
  initCoreClient()
  initTokensClient()
}

export { coreApolloClient } from './core.graphql'
export { tokenFactoryApolloClient } from './token-factory.graphql'
export { api } from '@tokene/toolkit'
