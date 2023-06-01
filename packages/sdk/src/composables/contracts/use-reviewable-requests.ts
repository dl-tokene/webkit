import { Provider } from '@distributedlab/w3p'
import { BigNumberish, BytesLike } from 'ethers'

import { ReviewableRequests__factory } from '@/types'

export const useReviewableRequests = (
  contractAddress: string,
  provider: Provider,
) => {
  const contractInterface = ReviewableRequests__factory.createInterface()

  const acceptRequest = async (requestId: string) => {
    const data = contractInterface.encodeFunctionData('acceptRequest', [
      requestId,
    ])

    return provider.signAndSendTx({
      to: contractAddress,
      data,
    })
  }

  const createRequest = async (
    executor: string,
    acceptData: BytesLike,
    rejectData: BytesLike,
    misc: string,
    description: string,
  ) => {
    const data = contractInterface.encodeFunctionData('createRequest', [
      executor,
      acceptData,
      rejectData,
      misc,
      description,
    ])

    return provider.signAndSendTx({
      to: contractAddress,
      data,
    })
  }

  const dropRequest = async (requestId: BigNumberish) => {
    const data = contractInterface.encodeFunctionData('dropRequest', [
      requestId,
    ])

    return provider.signAndSendTx({
      to: contractAddress,
      data,
    })
  }

  const rejectRequest = async (requestId: BigNumberish, reason: string) => {
    const data = contractInterface.encodeFunctionData('rejectRequest', [
      requestId,
      reason,
    ])

    return provider.signAndSendTx({
      to: contractAddress,
      data,
    })
  }

  const updateRequest = async (
    requestId: BigNumberish,
    executor: string,
    acceptData: BytesLike,
    rejectData: BytesLike,
    misc: string,
    description: string,
  ) => {
    const data = contractInterface.encodeFunctionData('updateRequest', [
      requestId,
      executor,
      acceptData,
      rejectData,
      misc,
      description,
    ])

    return provider.signAndSendTx({
      to: contractAddress,
      data,
    })
  }

  return {
    acceptRequest,
    createRequest,
    dropRequest,
    rejectRequest,
    updateRequest,
  }
}
