import { Provider, PROVIDERS, RawProvider } from '@distributedlab/w3p'
import { providers } from 'ethers'
import { computed } from 'vue'

import { KYCRequests__factory } from '@/types'

export const useKycRequests = (
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
        KYCRequests__factory.connect(
          contractAddress,
          providerInstance.value,
        )) ||
      undefined,
  )

  const contractInterface = KYCRequests__factory.createInterface()

  const dropKYCRequest = async () => {
    const data = contractInterface.encodeFunctionData('dropKYCRequest')

    return provider.signAndSendTx({
      to: contractAddress,
      data,
    })
  }

  /**
   * create a request
   * @param storageId storage service entity id
   */
  const requestKYC = async (storageId: string) => {
    const data = contractInterface.encodeFunctionData('requestKYC', [storageId])

    return provider.signAndSendTx({
      to: contractAddress,
      data,
    })
  }

  const usersRequestInfo = async (accountAddress: string) => {
    return contractInstance.value?.usersRequestInfo(accountAddress)
  }

  return {
    dropKYCRequest,
    requestKYC,
    usersRequestInfo,
  }
}
