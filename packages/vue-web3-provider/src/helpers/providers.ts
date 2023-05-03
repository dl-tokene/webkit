import type { CHAIN_TYPES, PROVIDERS } from '@distributedlab/w3p'

import { PROVIDERS_BY_CHAINS_TYPES } from '@/consts'

export function getSupportedProvidersInstances(
  providers: PROVIDERS[],
  chainType: CHAIN_TYPES,
): PROVIDERS[] {
  return Object.keys(providers).filter(el =>
    PROVIDERS_BY_CHAINS_TYPES[chainType].includes(el as PROVIDERS),
  ) as PROVIDERS[]
}
