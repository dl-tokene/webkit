import { init } from '@/api/graphql/core.graphql'

export function initGraphQlClients() {
  init()
}

export * from './core.graphql'
