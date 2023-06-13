import { BlobUtil, StorageUtil } from '@tokene/toolkit'
import { ref } from 'vue'

import { coreApolloClient } from '@/api'
import { useKycRequests } from '@/composables/contracts'
import { REQUEST_STATUSES } from '@/enums'
import { coreContracts } from '@/globals'
import {
  GetUserKycRequestsByStatus,
  type GetUserKycRequestsByStatusQuery,
  type Kyc,
  type RequestDescriptionKyc,
} from '@/types'

export const useKycUser = () => {
  const contractAddress = ref('')

  const isSubmitting = ref(false)

  const actualKyc = ref<Kyc>()
  const pendingKyc = ref<Kyc>()
  const rejectedKyc = ref<Kyc>()

  const isLoaded = ref(false)
  const isLoadFailed = ref(false)

  const loadActualKyc = async () => {
    const { data } =
      await coreApolloClient.query<GetUserKycRequestsByStatusQuery>({
        query: GetUserKycRequestsByStatus,
        fetchPolicy: 'network-only',
        variables: {
          misc: coreContracts.provider.address!.toLowerCase(),
          status: REQUEST_STATUSES.ACCEPTED,
        },
      })

    if (!data.requests?.[0]) return

    actualKyc.value = {
      ...(await parseRequestKyc(data.requests[0].description)),
      status: data.requests[0].status,
    }
  }

  const loadPendingKyc = async () => {
    const { data } =
      await coreApolloClient.query<GetUserKycRequestsByStatusQuery>({
        query: GetUserKycRequestsByStatus,
        fetchPolicy: 'network-only',
        variables: {
          misc: coreContracts.provider.address!.toLowerCase(),
          status: REQUEST_STATUSES.PENDING,
        },
      })

    if (!data.requests?.[0]) return

    pendingKyc.value = {
      ...(await parseRequestKyc(data.requests[0].description)),
      status: data.requests[0].status,
    }
  }

  const loadRejectedKyc = async () => {
    const { data } =
      await coreApolloClient.query<GetUserKycRequestsByStatusQuery>({
        query: GetUserKycRequestsByStatus,
        fetchPolicy: 'network-only',
        variables: {
          misc: coreContracts.provider.address!.toLowerCase(),
          status: REQUEST_STATUSES.REJECTED,
        },
      })

    if (!data.requests?.[0]) return

    rejectedKyc.value = {
      ...(await parseRequestKyc(data.requests[0].description)),
      status: data.requests[0].status,
    }
  }

  const loadAllKyc = async () => {
    await Promise.all([loadActualKyc(), loadPendingKyc(), loadRejectedKyc()])
  }

  const parseRequestKyc = async (storageId?: string) => {
    try {
      if (!storageId) throw new TypeError('storageId is not exist')

      const kycBlob = new BlobUtil<RequestDescriptionKyc>({
        id: storageId,
      })

      await kycBlob.load()

      const avatarStorageEntity = new StorageUtil({
        id: kycBlob.rawData?.avatarStorageId,
      })
      const documentsStorageEntities = kycBlob.rawData?.documentsStorageIds.map(
        el =>
          new StorageUtil({
            id: el,
          }),
      )

      await Promise.all([
        avatarStorageEntity.load(),
        ...(documentsStorageEntities
          ? [documentsStorageEntities.map(el => el.load())]
          : []),
      ])

      return {
        avatar: avatarStorageEntity,
        firstName: kycBlob.rawData?.firstName,
        lastName: kycBlob.rawData?.lastName,
        documents: documentsStorageEntities,
      } as Kyc
    } catch (error) {
      return {
        avatar: undefined,
        firstName: '',
        lastName: '',
        documents: [],
      } as unknown as Kyc
    }
  }

  const dropKYCRequest = async () => {
    isSubmitting.value = true

    const kycRequestsContract = useKycRequests(
      contractAddress.value,
      coreContracts.provider,
      coreContracts.rawProvider,
    )

    await kycRequestsContract.dropKYCRequest()
    isSubmitting.value = false
  }

  const requestKYCRole = async (description: string) => {
    isSubmitting.value = true

    const kycRequestsContract = useKycRequests(
      contractAddress.value,
      coreContracts.provider,
      coreContracts.rawProvider,
    )

    await kycRequestsContract.requestKYC(description)
    isSubmitting.value = false
  }

  const usersRequestInfo = async () => {
    const kycRequestsContract = useKycRequests(
      contractAddress.value,
      coreContracts.provider,
      coreContracts.rawProvider,
    )

    await kycRequestsContract.usersRequestInfo(coreContracts.provider.address!)
  }

  const init = async (extensionName?: string) => {
    contractAddress.value = await coreContracts.getContractAddressByName(
      extensionName ?? 'KYC_REQUESTS',
    )
  }

  return {
    isSubmitting,
    isLoaded,
    isLoadFailed,

    actualKyc,
    pendingKyc,
    rejectedKyc,

    init,

    loadAllKyc,

    dropKYCRequest,
    requestKYCRole,
    usersRequestInfo,
  }
}
