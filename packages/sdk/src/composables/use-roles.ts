import { computed, ref } from 'vue-demi'

import { coreApolloClient } from '@/api'
import { coreContracts } from '@/globals'
import { formatRoleFromGraph } from '@/helpers'
import { type FlattenRole, type Permission } from '@/types'
import {
  GetRolesWithResources,
  GetRolesWithResourcesQuery,
  type RoleWithResourcesFragment,
} from '@/types'

export const useRoles = () => {
  const rolesWithResources = ref<RoleWithResourcesFragment[]>([])

  const masterRoleId = ref('')
  const bannedRoleId = ref('')

  const roles = computed(
    () =>
      rolesWithResources.value?.map(
        el => formatRoleFromGraph(el) as FlattenRole,
      ) ?? [],
  )

  const loadRoles = async () => {
    const masterAccessManagementContract =
      coreContracts.getMasterAccessManagementContract()

    masterRoleId.value = await masterAccessManagementContract.getMasterRoleId()
    bannedRoleId.value = await masterAccessManagementContract.getBannedRoleId()

    const { data } = await coreApolloClient.query<GetRolesWithResourcesQuery>({
      query: GetRolesWithResources,
    })

    if (!data.roles) return

    rolesWithResources.value = data.roles
  }

  const createRole = async (
    name: string,
    description: string,
    allowedPermissions: Permission[],
    disallowedPermissions: Permission[],
  ) => {
    const masterAccessManagementContract =
      coreContracts.getMasterAccessManagementContract()

    await masterAccessManagementContract.addCombinedPermissionsToRole(
      name,
      JSON.stringify({ name, description }),
      allowedPermissions.map(el => ({
        resource: el.resource.name,
        permissions: [el.action],
      })),
      disallowedPermissions.map(el => ({
        resource: el.resource.name,
        permissions: [el.action],
      })),
    )
  }

  const removeRolePermission = async (
    id: string,
    permission: Permission,
    isAllowed: boolean,
  ) => {
    const masterAccessManagementContract =
      coreContracts.getMasterAccessManagementContract()

    await masterAccessManagementContract.removePermissionsFromRole(
      id,
      [
        {
          resource: permission.resource.name,
          permissions: [permission.action],
        },
      ],
      isAllowed,
    )
  }

  const updateRole = async (
    id: string,
    name: string,
    description: string,
    allowedPermissions: Permission[],
    disallowedPermissions: Permission[],
    newAllowedPermissions: Permission[],
    newDisallowedPermissions: Permission[],
  ) => {
    const masterAccessManagementContract =
      coreContracts.getMasterAccessManagementContract()

    const allowedPermissionsToRemove: Permission[] =
      allowedPermissions.filter(
        el =>
          !newAllowedPermissions.find(
            _el =>
              _el.resource.name === el.resource.name &&
              _el.action === el.action,
          ),
      ) || ([] as Permission[])

    const disallowedPermissionsToRemove: Permission[] =
      disallowedPermissions.filter(
        el =>
          !newAllowedPermissions.find(
            _el =>
              _el.resource.name === el.resource.name &&
              _el.action === el.action,
          ),
      ) || ([] as Permission[])

    await masterAccessManagementContract.updateRolePermissions(
      id,
      JSON.stringify({ name, description }),
      allowedPermissionsToRemove.map(el => ({
        resource: el.resource.name,
        permissions: [el.action],
      })),
      disallowedPermissionsToRemove.map(el => ({
        resource: el.resource.name,
        permissions: [el.action],
      })),
      newAllowedPermissions.map(el => ({
        resource: el.resource.name,
        permissions: [el.action],
      })),
      newDisallowedPermissions.map(el => ({
        resource: el.resource.name,
        permissions: [el.action],
      })),
    )
  }

  const grantRoles = async (to: string, roles: string[]) => {
    const masterAccessManagementContract =
      coreContracts.getMasterAccessManagementContract()

    await masterAccessManagementContract.grantRoles(to, roles)
  }

  const revokeRoles = async (from: string, roles: string[]) => {
    const masterAccessManagementContract =
      coreContracts.getMasterAccessManagementContract()

    await masterAccessManagementContract.revokeRoles(from, roles)
  }

  const grantMasterRole = async (to: string) => {
    await grantRoles(to, [masterRoleId.value])
  }

  return {
    rolesWithResources,
    roles,

    masterRoleId,
    bannedRoleId,

    loadRoles,
    createRole,
    removeRolePermission,
    updateRole,
    grantRoles,
    revokeRoles,
    grantMasterRole,
  }
}
