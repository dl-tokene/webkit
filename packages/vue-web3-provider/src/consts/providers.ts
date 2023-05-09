import { CHAIN_TYPES, PROVIDERS } from '@distributedlab/w3p'

export const PROVIDERS_BY_CHAINS_TYPES = {
  [CHAIN_TYPES.EVM]: [PROVIDERS.Metamask, PROVIDERS.Coinbase, 'tokene'],
} as Record<CHAIN_TYPES, PROVIDERS[] & 'tokene'>
