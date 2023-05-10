import {
  BaseEVMProvider,
  type ProviderProxy,
  type RawProvider,
} from '@distributedlab/w3p'

import { EXTERNAL_PROVIDERS } from '@/enums'

export class TokenEProvider extends BaseEVMProvider implements ProviderProxy {
  constructor(provider: RawProvider) {
    super(provider)
  }

  static get providerType() {
    return EXTERNAL_PROVIDERS.TokenE
  }
}
