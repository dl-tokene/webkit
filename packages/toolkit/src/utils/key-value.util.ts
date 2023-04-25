import { api } from '@/api'

enum KEY_VALUES {
  extensions = 'extensions',
}

export class KeyValueUtil {
  public static get kvList(): Readonly<typeof KEY_VALUES> {
    return KEY_VALUES
  }

  async create(key: string, rawData: unknown) {
    const { data } = await api.post<{
      type: 'key-value'
      id: string
      key: string
      value: string
    }>(`/integrations/key-value-svc/values/${key}`, {
      value: JSON.stringify(rawData),
    })
    return data
  }

  async get(key: string) {
    const { data } = await api.get<{
      type: 'key-value'
      id: string
      key: string
      value: string
    }>(`/integrations/key-value-svc/values/${key}`)
    return data
  }
}
