import axios from 'axios'
import { create, type IPFSHTTPClient } from 'kubo-rpc-client'

import { toolkitConfig } from '@/globals'

const PREFIX = 'ipfs://'

export class IpfsUtil<T> {
  private _rawData?: T
  /*
   * We get the `path` variable from the `kubo-rpc-client` library, but this is CID.
   * CID explanation: 'https://docs.ipfs.tech/concepts/content-addressing/'
   * PATH explanation: 'https://docs.ipfs.tech/how-to/address-ipfs-on-web/'
   */
  private _cid?: string
  private _cids = [] as string[]
  private _ipfsApi: IPFSHTTPClient

  constructor(options: { rawData?: T; cid?: string }) {
    const { rawData, cid } = options

    this._rawData = rawData
    this._cid = cid
    this._ipfsApi = create({
      url: `${toolkitConfig.API_IPFS_URL}/api/api/v0`,
    })
  }

  async uploadSelf(): Promise<void> {
    if (!this._rawData) throw new Error('No data provided to upload')

    if (Array.isArray(this._rawData)) {
      const dataArrayToAdd = this._rawData.map(item => ({
        content: JSON.stringify(item),
      }))
      for await (const { path } of this._ipfsApi.addAll(dataArrayToAdd)) {
        this._cids.push(path)
      }
      return
    }

    const { path } = await this._ipfsApi.add({
      content: JSON.stringify(this._rawData),
    })
    this._cid = path
  }

  async loadSelf(): Promise<T> {
    if (!this._cid) throw new Error('No path provided to load')

    const { data } = await axios.get(this.publicUrl)

    return data as T
  }

  get publicUrl() {
    return this._cid
      ? `${toolkitConfig.API_IPFS_URL}/ipfs/ipfs/${this._cid.replace(
          PREFIX,
          '',
        )}`
      : ''
  }

  get path() {
    return `${PREFIX}${this._cid}`
  }

  get paths() {
    return this._cids.map(el => `${PREFIX}${el}`)
  }

  get ipfsApi() {
    return this._ipfsApi
  }
}
