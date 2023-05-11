import { api } from '@/globals'
import { sleep } from '@/helpers'

export class StorageUtil {
  id?: string
  file?: File
  name?: string
  mimeType?: string

  link?: string

  constructor(opts: { id?: string; file?: File }) {
    this.id = opts.id
    this.file = opts.file
    this.name = opts?.file?.name
    this.mimeType = opts?.file?.type
  }

  async uploadSelf() {
    if (!this.file) return

    const formData = new FormData()

    const blob = new Blob([await this.file.arrayBuffer()], {
      type: this.mimeType,
    })

    formData.append('Document', blob)
    formData.append(
      'Metadata',
      JSON.stringify({
        data: {
          mime_type: this.mimeType,
          name: this.name,
        },
      }),
    )
    const { data } = await api.post<{ id: string }>(
      '/integrations/storage/documents',
      { body: formData },
    )
    this.id = data.id
  }

  async load() {
    const { data } = await api.get<{
      type: 'document'
      id: string
      link: string
      mime_type: string
      name: string
      owner: string
    }>(`/integrations/storage/documents/${this.id}`)

    this.link = data.link
    this.name = data.name
    this.mimeType = data.mime_type

    await sleep(500)

    return this
  }
}
