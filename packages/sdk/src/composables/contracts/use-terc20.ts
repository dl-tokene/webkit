import { Provider } from '@distributedlab/w3p'
import { BigNumberish } from 'ethers'

import { coreContracts } from '@/globals'
import { TERC20__factory } from '@/types'

export const useTerc20 = (
  contractAddress: string,
  provider: Provider = coreContracts.provider,
) => {
  const contractInterface = TERC20__factory.createInterface()

  const mintTo = async (address: string, amount: BigNumberish) => {
    if (!contractAddress) return

    const data = contractInterface.encodeFunctionData('mintTo', [
      address,
      amount,
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
