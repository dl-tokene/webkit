import { KEY_VALUES, KeyValueUtil } from '@tokene/toolkit'
import cloneDeep from 'lodash/cloneDeep'

import { coreApolloClient } from '@/api'
import { coreContracts } from '@/globals'
import {
  type Extension,
  EXTENSION_STATES,
  GetCoreContracts,
  type GetCoreContractsQuery,
} from '@/types'

/**
 * For now we can check module existence by checking if MasterContractRegistry
 * returns a valid contract address for the module.
 *
 * But in the future we will get enabled extensions list from the backend.
 */
export class ExtensionsManager {
  #extensions: Extension[] = []

  get extensions() {
    return cloneDeep(this.#extensions)
  }

  getExtensionById(id: string) {
    return this.#extensions.find(el => el.id === id)
  }

  async init() {
    if (!coreContracts) return

    const masterContractRegistryContract =
      coreContracts.getMasterContractsRegistryContract()

    await this.loadExtensions()

    // Getting contract addresses of supported extensions
    // is a temporary solution

    for (const extension of this.#extensions) {
      try {
        if (extension?.state !== EXTENSION_STATES.connected)
          throw new TypeError(`${extension.name} extension is not enabled`)

        if (!extension || !extension.contract_name)
          throw new TypeError(`${extension.name} extension invalid`)

        let contractAddress = ''
        try {
          const { data } = await coreApolloClient.query<GetCoreContractsQuery>({
            query: GetCoreContracts,
          })

          contractAddress =
            data?.contracts?.find(el => el.id === extension.contract_name)
              ?.address ||
            String(
              await masterContractRegistryContract.getContractAddressByName(
                extension.id,
              ),
            )
        } catch (error) {
          contractAddress = ''
        }

        extension.contract_address = contractAddress
      } catch (error) {
        /* empty */
      }
    }
  }

  async loadExtensions() {
    const data = await new KeyValueUtil().get<Extension[]>(
      KEY_VALUES.extensions,
    )

    if (!data) return

    this.#extensions = data.value
  }

  async updateExtensionStatus(extension: Extension, state: EXTENSION_STATES) {
    const extensions = cloneDeep(this.#extensions)

    await new KeyValueUtil().create(
      KEY_VALUES.extensions,
      extensions.map(el => ({
        ...el,
        state: el.id === extension.id ? state : el.state,
      })),
    )
  }
}

export const extensionsManager = new ExtensionsManager()
