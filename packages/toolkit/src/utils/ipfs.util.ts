import axios from 'axios'
import type { ImportCandidate } from 'ipfs-core-types/src/utils'
import { create, type IPFSHTTPClient } from 'ipfs-http-client'

import { toolkitConfig } from '@/globals'

const PREFIX = 'ipfs://'

export class IpfsUtil<T> {
  private _rawData?: T
  private _path?: string
  private _paths = [] as string[]
  private _ipfsApi: IPFSHTTPClient

  constructor(options: { rawData?: T; path?: string }) {
    const { rawData, path } = options

    this._rawData = rawData
    this._path = path
    this._ipfsApi = create({
      url: `${toolkitConfig.API_IPFS_URL}/api/api/v0`,
    })
  }

  async uploadSelf(): Promise<void> {
    if (!this._rawData) throw new Error('No data provided to upload')

    if (Array.isArray(this._rawData)) {
      for await (const { path } of this._ipfsApi.addAll(
        this._rawData as ImportCandidate[],
      )) {
        this._paths.push(path)
      }
    } else {
      const { path } = await this._ipfsApi.add(this._rawData as ImportCandidate)
      this._path = path
    }
  }

  async loadSelf(): Promise<T> {
    if (!this._path) throw new Error('No path provided to load')

    const { data } = await axios.get(this.publicUrl)

    return data as T
  }

  get publicUrl() {
    return this._path
      ? `${toolkitConfig.API_IPFS_URL}/ipfs/ipfs/${this._path.replace(
          PREFIX,
          '',
        )}`
      : ''
  }

  get path() {
    return `${PREFIX}${this._path}`
  }

  get paths() {
    return this._paths.map(el => `${PREFIX}${el}`)
  }

  get ipfsApi() {
    return this._ipfsApi
  }
}
