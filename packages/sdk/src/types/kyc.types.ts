import { type StorageUtil } from '@tokene/toolkit'

import { type REQUEST_STATUSES } from '@/enums'

export type RequestDescriptionKyc = {
  avatarStorageId: string
  firstName: string
  lastName: string
  documentsStorageIds: string[]
}

export type Kyc = {
  id: string
  status: REQUEST_STATUSES
  address: string
  timestamp: number
  rejectReason?: string
  avatar?: StorageUtil
  firstName?: string
  lastName?: string
  documents?: StorageUtil[]
}
