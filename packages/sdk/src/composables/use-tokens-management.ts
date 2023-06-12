import { BN, DECIMALS } from '@distributedlab/tools'
import { ref } from 'vue'

import { useTokenFactory } from '@/composables/contracts'
import { coreContracts } from '@/globals'

export const useTokensManagement = () => {
  const contractAddress = ref('')

  const deployTERC20 = async (params: {
    name: string
    symbol: string
    contractURI: string
    decimals: string
    totalSupplyCap: string
  }) => {
    const tokenFactoryContract = useTokenFactory(
      contractAddress.value,
      coreContracts.provider,
    )

    await tokenFactoryContract.deployTERC20({
      name: params.name,
      symbol: params.symbol,
      contractURI: params.contractURI,
      decimals: params.decimals || DECIMALS.WEI,
      totalSupplyCap: params.totalSupplyCap
        ? BN.fromRaw(params.totalSupplyCap!, +params.decimals).value
        : BN.MAX_UINT256.value,
    })
  }

  /**
   * Deploys TERC721 Collection
   * @param params
   */
  const deployTERC721 = async (params: {
    name: string
    symbol: string
    contractURI: string
    baseURI: string
    totalSupplyCap: string
  }) => {
    const tokenFactoryContract = useTokenFactory(
      contractAddress.value,
      coreContracts.provider,
    )

    await tokenFactoryContract.deployTERC721({
      name: params.name,
      symbol: params.symbol,
      contractURI: params.contractURI,
      baseURI: params.baseURI,
      totalSupplyCap: params.totalSupplyCap
        ? String(params.totalSupplyCap)
        : BN.MAX_UINT256.value,
    })
  }

  const init = async (extensionName?: string) => {
    contractAddress.value = await coreContracts.getContractAddressByName(
      extensionName ?? 'TOKEN_FACTORY',
    )
  }

  return {
    init,

    deployTERC20,
    deployTERC721,
  }
}
