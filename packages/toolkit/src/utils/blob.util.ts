import { api } from '@/globals'

export class BlobUtil<T> {
  #id?: string
  #rawData?: T
  #owner?: string

  constructor(opts: { id?: string; rawData?: T; owner?: string }) {
    this.#id = opts.id
    this.#rawData = opts.rawData
    this.#owner = opts.owner
  }

  get id() {
    return this.#id
  }

  get rawData() {
    return this.#rawData
  }

  async create() {
    const { data } = await api.post<{
      type: 'blob'
      id: string
      owner: {
        type: string
        id: string
      }
      purpose: string
    }>('/integrations/storage/blobs', {
      body: {
        blob: this.#rawData,
        purpose: 'KYC',
        owner: this.#owner,
      },
    })

    this.#id = data.id

    return this
  }

  async load() {
    const { data } = await api.get<{
      type: 'blob'
      id: string
      blob: T
      purpose: string
      owner: {
        type: string
        id: string
      }
    }>(`/integrations/storage/blobs/${this.#id}`)

    this.#rawData = data.blob

    return this
  }
}
