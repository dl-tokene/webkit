import type { Resource } from '@/types'

export type PermissionType = 'allowed' | 'disallowed'

export type Permission = {
  resource: Resource
  action: string
}

export type FlattenRole = {
  id: string
  name: string
  description: string
  resources: Resource[]
  flattenAllowedPermissions: Permission[]
  flattenDisallowedPermissions: Permission[]
}
