import { reactive, ref } from 'vue-demi'

import { coreApolloClient } from '@/api'
import {
  GetUserById,
  type GetUserByIdQuery,
  GetUsersByIdPaginated,
  GetUsersByRoleIdsPaginated,
  type UserCommonFieldsFragment,
} from '@/types'

export const useUsers = (defaultFilters?: {
  id?: string
  offset?: number
  limit?: number
  roleIds?: string[]
}) => {
  const filters = reactive({
    id: defaultFilters?.id || '',
    offset: defaultFilters?.offset || 0,
    limit: defaultFilters?.limit || 10,
    roleIds: defaultFilters?.roleIds || [],
  })

  const isLoaded = ref(false)
  const isLoadFailed = ref(false)

  const users = ref<UserCommonFieldsFragment[]>([])
  const user = ref<UserCommonFieldsFragment>()

  const loadUsers = async () => {
    const { data } = await coreApolloClient.query({
      query: filters.roleIds?.length
        ? GetUsersByRoleIdsPaginated
        : GetUsersByIdPaginated,
      fetchPolicy: 'network-only',
      variables: {
        id: filters.id,
        offset: filters.offset,
        limit: filters.limit,
        roleIds: filters.roleIds,
      },
    })

    users.value = data.users
  }

  const loadUser = async () => {
    const { data } = await coreApolloClient.query<GetUserByIdQuery>({
      query: GetUserById,
      fetchPolicy: 'network-only',
      variables: {
        id: filters.id,
      },
    })

    if (!data.user) return

    user.value = data.user
  }

  return {
    filters,

    isLoaded,
    isLoadFailed,

    users,

    loadUsers,
    loadUser,
  }
}
