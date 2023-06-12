import { Provider } from '@distributedlab/w3p'
import { BigNumberish } from 'ethers'

import { coreContracts } from '@/globals'
import { TERC721__factory } from '@/types'

export const useTerc721 = (
  contractAddress: string,
  provider: Provider = coreContracts.provider,
) => {
  const contractInterface = TERC721__factory.createInterface()

  const mintTo = async (
    receiver_: string,
    tokenId_: BigNumberish,
    tokenURI_: string,
  ) => {
    if (!contractAddress) return

    const data = contractInterface.encodeFunctionData('mintTo', [
      receiver_,
      tokenId_,
      tokenURI_,
    ])

    return provider.signAndSendTx({
      to: contractAddress,
      data,
    })
  }

  return {
    mintTo,
  }
}
