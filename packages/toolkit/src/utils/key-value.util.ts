import { isObject } from 'lodash-es'

import { api } from '@/globals'

export class KeyValueUtil {
  async create(key: string, rawData: unknown) {
    const { data } = await api.post<{
      type: 'key-value'
      id: string
      key: string
      value: string
    }>(`/integrations/key-value-svc/values/${key}`, {
      body: {
        value: JSON.stringify(rawData),
      },
    })
    return data
  }

  async get<T>(key: string) {
    const { data } = await api.get<{
      type: 'key-value'
      id: string
      key: string
      value: string
    }>(`/integrations/key-value-svc/values/${key}`)

    return {
      ...data,
      value: (isObject(data.value) ? JSON.parse(data.value) : data.value) as T,
    }
  }
}
