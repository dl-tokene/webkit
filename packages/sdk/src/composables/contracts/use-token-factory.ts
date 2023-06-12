import { Provider } from '@distributedlab/w3p'

import { TokenFactory__factory } from '@/types'
import { ITERC20, ITERC721 } from '@/types/contracts/TokenFactory'

export const useTokenFactory = (
  contractAddress: string,
  provider: Provider,
) => {
  const contractInterface = TokenFactory__factory.createInterface()

  const deployTERC20 = async (params: ITERC20.ConstructorParamsStruct) => {
    const data = contractInterface.encodeFunctionData('deployTERC20', [params])

    return provider.signAndSendTx({
      to: contractAddress,
      data,
    })
  }

  const deployTERC721 = async (params: ITERC721.ConstructorParamsStruct) => {
    const data = contractInterface.encodeFunctionData('deployTERC721', [params])

    const txBody = {
      to: contractAddress,
      data,
    }

    return provider.signAndSendTx({
      ...txBody,
    })
  }

  return {
    deployTERC20,
    deployTERC721,
  }
}
