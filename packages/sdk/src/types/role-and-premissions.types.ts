export type PermissionType = 'allowed' | 'disallowed'

export type Resource = {
  id: string
  name: string
  allows?: string[]
  disallows?: string[]
}

export type Permission = {
  resource: Resource
  action: string
}

export type Role = {
  id: string
  name: string
  description: string
  resources: Resource[]
  flattenAllowedPermissions: Permission[]
  flattenDisallowedPermissions: Permission[]
}
