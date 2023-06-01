import type {
  FlattenRole,
  Permission,
  RoleWithResourcesFragment,
} from '@/types'

export const formatRoleFromGraph = (
  graphRole: RoleWithResourcesFragment,
): FlattenRole => {
  let roleName = ''
  let roleDescription = ''

  try {
    const parsedRoleDescription = JSON.parse(graphRole.description)
    roleName = parsedRoleDescription.name
  } catch (error) {
    roleName = graphRole.id // TEMP
  }

  try {
    const parsedRoleDescription = JSON.parse(graphRole.description)
    roleDescription = parsedRoleDescription.description
  } catch (error) {
    roleDescription = graphRole.id // TEMP
  }

  return {
    id: graphRole.id,
    name: roleName,
    description: roleDescription,
    resources: graphRole.resources.map(el => ({
      id: el.id,
      name: el.name,
      allows: el.allows,
      allowsCount: el.allows.length,
      disallows: el.disallows,
      disallowsCount: el.disallows.length,
    })),
    flattenAllowedPermissions: [
      ...(graphRole.resources.reduce(
        (acc, curr) => [
          ...acc,
          ...(curr?.allows?.map(el => ({
            resource: {
              id: curr.id,
              name: curr.name,
              allows: curr.allows,
              allowsCount: curr.allows.length,
              disallows: curr.disallows,
              disallowsCount: curr.disallows.length,
            },
            action: el,
          })) || []),
        ],
        [] as Permission[],
      ) || []),
    ],
    flattenDisallowedPermissions: [
      ...(graphRole.resources.reduce(
        (acc, curr) => [
          ...acc,
          ...(curr?.disallows?.map(el => ({
            resource: {
              id: curr.id,
              name: curr.name,
              allows: curr.allows,
              allowsCount: curr.allows.length,
              disallows: curr.disallows,
              disallowsCount: curr.disallows.length,
            },
            action: el,
          })) || []),
        ],
        [] as Permission[],
      ) || []),
    ],
  } as FlattenRole
}
