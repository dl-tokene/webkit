import { Provider, PROVIDERS, RawProvider } from '@distributedlab/w3p'
import { providers } from 'ethers'
import { computed } from 'vue-demi'

import { MasterContractsRegistry__factory } from '@/types'

export const useMasterContractsRegistry = (
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
      (!!providerInstance.value &&
        MasterContractsRegistry__factory.connect(
          contractAddress,
          providerInstance.value,
        )) ||
      undefined,
  )

  const getContractAddressByName = async (name: string) => {
    return contractInstance.value?.getContract(name)
  }

  const getMasterAccessManagement = async () => {
    return contractInstance.value?.getMasterAccessManagement()
  }

  const getConstantsRegistry = async () => {
    return contractInstance.value?.getConstantsRegistry()
  }

  const getReviewableRequests = async () => {
    return contractInstance.value?.getReviewableRequests()
  }

  return {
    getMasterAccessManagement,
    getConstantsRegistry,
    getReviewableRequests,

    getContractAddressByName,
  }
}
