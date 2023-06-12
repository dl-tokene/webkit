import { BlobUtil, StorageUtil } from '@tokene/toolkit'
import { computed, ref } from 'vue-demi'

import { coreApolloClient } from '@/api'
import { useRoles } from '@/composables'
import { REQUEST_STATUSES } from '@/enums'
import { coreContracts } from '@/globals'
import { Kyc, RequestDescriptionKyc } from '@/types'
import {
  GetKycRequestsByAddressAndStatus,
  GetKycRequestsByAddressAndStatusQuery,
  GetUserById,
  GetUserByIdQuery,
  UserCommonFieldsFragment,
} from '@/types'

export const useUserDetails = (address: string) => {
  const {
    acceptRequest: _acceptRequest,
    dropRequest: _dropRequest,
    rejectRequest: _rejectRequest,
  } = coreContracts.getReviewableRequestsContract()

  const { bannedRoleId, loadRoles, grantRoles, revokeRoles } = useRoles()

  const acceptedKyc = ref<Kyc>()
  const pendingKyc = ref<Kyc>()

  const isSubmitting = ref(false)

  const isLoaded = ref(false)
  const isLoadFailed = ref(false)

  const user = ref<UserCommonFieldsFragment>()
  const kyc = computed(() => acceptedKyc.value || pendingKyc.value)

  const userRoles = computed(() => user.value?.roles || [])

  const isUserBlocked = computed(() =>
    userRoles.value?.find(el => el.id === bannedRoleId.value),
  )

  const fullName = computed(() =>
    kyc.value?.firstName && kyc.value?.lastName
      ? `${kyc.value?.firstName} ${kyc.value?.lastName}`
      : '',
  )

  const isRequestPending = computed(
    () => kyc.value?.status === REQUEST_STATUSES.PENDING,
  )

  const preloadDetails = async () => {
    await loadRoles()
  }

  const loadAcceptedKycRequest = async () => {
    const { data } =
      await coreApolloClient.query<GetKycRequestsByAddressAndStatusQuery>({
        query: GetKycRequestsByAddressAndStatus,
        fetchPolicy: 'network-only',
        variables: {
          address: address.toLowerCase(),
          status: REQUEST_STATUSES.ACCEPTED,
        },
      })

    if (!data.requests?.[0]) return

    acceptedKyc.value = {
      ...(await parseRequestKyc(data.requests[0].description)),
      id: data.requests[0].id,
      address: data.requests[0].misc,
      status: data.requests[0].status,
      timestamp: Number(data.requests[0].timestamp),
      rejectReason: data.requests[0].rejectReason,
    }
  }

  const loadPendingKycRequest = async () => {
    const { data } =
      await coreApolloClient.query<GetKycRequestsByAddressAndStatusQuery>({
        query: GetKycRequestsByAddressAndStatus,
        fetchPolicy: 'network-only',
        variables: {
          address: address.toLowerCase(),
          status: REQUEST_STATUSES.PENDING,
        },
      })

    if (!data.requests?.[0]) return

    pendingKyc.value = {
      ...(await parseRequestKyc(data.requests[0].description)),
      id: data.requests[0].id,
      address: data.requests[0].misc,
      status: data.requests[0].status,
      timestamp: Number(data.requests[0].timestamp),
      rejectReason: data.requests[0].rejectReason,
    }
  }

  const loadUser = async () => {
    const { data } = await coreApolloClient.query<GetUserByIdQuery>({
      query: GetUserById,
      fetchPolicy: 'network-only',
      variables: {
        id: address.toLowerCase(),
      },
    })

    if (!data.user) return

    user.value = data.user
  }

  const parseRequestKyc = async (storageId: string) => {
    try {
      if (!storageId) throw new Error('storageId is not exist')

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

  const loadAll = async () => {
    await Promise.all([
      loadAcceptedKycRequest(),
      loadPendingKycRequest(),
      loadUser(),
    ])
  }

  const acceptRequest = async () => {
    await _acceptRequest(pendingKyc.value!.id)
  }

  const dropRequest = async () => {
    await _dropRequest(pendingKyc.value!.id)
  }

  const rejectRequest = async (reason: string) => {
    await _rejectRequest(pendingKyc.value!.id, reason)
  }

  const blockUser = async () => {
    if (!user.value) return

    await grantRoles(user.value.id, [bannedRoleId.value])
    await loadAll()
  }

  const unblockUser = async () => {
    if (!user.value) return

    await revokeRoles(user.value.id, [bannedRoleId.value])
    await loadAll()
  }

  const revokeRole = async (roleId: string) => {
    if (!user.value) return

    await revokeRoles(user.value.id, [roleId])
    await loadAll()
  }

  const assignRole = async (roleId: string) => {
    if (!user.value) return

    await grantRoles(user.value.id, [roleId])
    await loadAll()
  }

  return {
    isLoaded,
    isLoadFailed,
    isSubmitting,

    kyc,
    user,

    isUserBlocked,
    fullName,
    isRequestPending,

    preloadDetails,

    loadPendingKycRequest,
    loadAcceptedKycRequest,
    loadUser,
    loadAll,

    acceptRequest,
    dropRequest,
    rejectRequest,

    blockUser,
    unblockUser,
    revokeRole,
    assignRole,
  }
}
