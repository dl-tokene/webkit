import { Buffer } from 'buffer'
import { reactive, ref } from 'vue-demi'

import { coreApolloClient } from '@/api'
import { coreContracts } from '@/globals'
import {
  type ConstantFragment,
  GetConstantsByIdPaginated,
  GetConstantsPaginated,
} from '@/types'

export const useConstants = () => {
  const { addConstant: _addConstant, removeConstant: _removeConstant } =
    coreContracts.getConstantsRegistryContract()

  const filters = reactive({
    id: '',
    offset: 0,
    limit: 10,
  })

  const isSubmitting = ref(false)

  const isLoaded = ref(false)
  const isLoadFailed = ref(false)

  const constants = ref<ConstantFragment[]>([])

  const parseHexString = (value: string) => {
    const view = new Uint8Array(value.length / 2)

    for (let i = 0; i < value.length; i += 2) {
      view[i / 2] = parseInt(value.substring(i, i + 2), 16)
    }

    return String.fromCharCode.apply(null, new Uint8Array(view.buffer) as never)
  }

  const loadConstants = async () => {
    const { data } = await coreApolloClient.query<{
      constants: ConstantFragment[]
    }>({
      query: filters.id ? GetConstantsByIdPaginated : GetConstantsPaginated,
      fetchPolicy: 'network-only',
      variables: {
        id: filters.id,
        offset: filters.offset,
        limit: filters.limit,
      },
    })

    if (!data.constants) return

    constants.value = data.constants.map(el => {
      return {
        ...el,
        value: parseHexString(el.value),
      }
    })
  }

  const addConstant = async (key: string, value: string) => {
    const encodedValue = Buffer.from(value)
    await _addConstant(key, encodedValue)
  }

  const removeConstant = async (key: string) => {
    await _removeConstant(key)
  }

  return {
    isSubmitting,

    filters,

    isLoaded,
    isLoadFailed,

    constants,

    loadConstants,
    addConstant,
    removeConstant,
  }
}
