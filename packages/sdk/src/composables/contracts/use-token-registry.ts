import { Provider, PROVIDERS, RawProvider } from '@distributedlab/w3p'
import { BigNumberish, providers } from 'ethers'
import { computed } from 'vue'

import { TokenRegistry__factory } from '@/types'

export const useTokenRegistry = (
  contractAddress: string,
  provider: Provider,
  rawProvider: RawProvider,
) => {
  const providerInstance = computed(() =>
    provider.providerType !== PROVIDERS.Fallback
      ? new providers.Web3Provider(
          rawProvider as providers.ExternalProvider,
          'any',
        )
      : (rawProvider as unknown as providers.JsonRpcProvider),
  )

  const contractInstance = computed(
    () =>
      (!!providerInstance.value! &&
        TokenRegistry__factory.connect(
          contractAddress,
          providerInstance.value!,
        )) ||
      undefined,
  )

  const countPools = async (name: string) => {
    return contractInstance.value?.countPools(name)
  }

  const listPools = async (
    name: string,
    offset: BigNumberish,
    limit: BigNumberish,
  ) => {
    return contractInstance.value?.listPools(name, offset, limit)
  }

  return {
    countPools,
    listPools,
  }
}
