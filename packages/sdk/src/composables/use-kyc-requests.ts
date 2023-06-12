import { BlobUtil, StorageUtil } from '@tokene/toolkit'
import { reactive, ref } from 'vue'

import { coreApolloClient } from '@/api'
import { coreContracts, extensionsManager } from '@/globals'
import { Kyc, RequestDescriptionKyc } from '@/types'
import {
  GetKycRequestById,
  GetKycRequestByIdQuery,
  GetKycRequests,
  GetKycRequestsQuery,
} from '@/types'

export const useKycRequests = (queryParams?: {
  id?: string
  offset?: number
  limit?: number
}) => {
  const filters = reactive({
    id: queryParams?.id || '',
    offset: queryParams?.offset || 0,
    limit: queryParams?.limit || 10,
  })

  const {
    acceptRequest: _acceptRequest,
    dropRequest: _dropRequest,
    rejectRequest: _rejectRequest,
  } = coreContracts.getReviewableRequestsContract()

  /**
   * FIXME
   */
  const kycExtension = extensionsManager.getExtensionById('KYC_REQUESTS')

  const kycList = ref<Kyc[]>([])
  const selectedKyc = ref<Kyc>()

  const isSubmitting = ref(false)
  const isLoaded = ref(false)
  const isLoadFailed = ref(false)

  const loadKycRequests = async () => {
    const { data } = await coreApolloClient.query<GetKycRequestsQuery>({
      query: GetKycRequests,
      fetchPolicy: 'network-only',
      variables: {
        creator: String(kycExtension?.contract_address).toLowerCase(),
        id: filters.id,
        offset: filters.offset,
        limit: filters.limit,
      },
    })

    if (!data.requests?.length) return

    kycList.value = await Promise.all(
      data!.requests!.map(async el => ({
        ...(await parseRequestKyc(el.description)),
        id: el.id,
        address: el.misc,
        status: el.status,
        rejectReason: el.rejectReason,
        timestamp: Number(el.timestamp),
      })),
    )
  }

  const loadKycRequestById = async () => {
    const { data } = await coreApolloClient.query<GetKycRequestByIdQuery>({
      query: GetKycRequestById,
      fetchPolicy: 'network-only',
      variables: {
        creator: String(kycExtension?.contract_address).toLowerCase(),
        id: queryParams?.id,
      },
    })

    if (!data?.request) return

    selectedKyc.value = {
      ...(await parseRequestKyc(data.request.description)),
      id: data.request.id,
      address: data.request.misc,
      status: data.request.status,
      timestamp: Number(data.request.timestamp),
      rejectReason: data.request.rejectReason,
    }
  }

  const parseRequestKyc = async (storageId: string) => {
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

  const acceptRequest = async (requestId: string) => {
    isSubmitting.value = true
    await _acceptRequest(requestId)
    isSubmitting.value = false
  }

  const dropRequest = async (requestId: string) => {
    isSubmitting.value = true
    await _dropRequest(requestId)
    isSubmitting.value = false
  }

  const rejectRequest = async (requestId: string, reason: string) => {
    isSubmitting.value = true
    await _rejectRequest(requestId, reason)
    isSubmitting.value = false
  }

  return {
    isSubmitting,
    isLoaded,
    isLoadFailed,

    filters,

    kycList,
    selectedKyc,

    loadKycRequests,
    loadKycRequestById,

    acceptRequest,
    dropRequest,
    rejectRequest,
  }
}
