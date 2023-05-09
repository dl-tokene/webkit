import {
  BaseEVMProvider,
  type ProviderProxy,
  PROVIDERS,
  type RawProvider,
} from '@distributedlab/w3p'

export class TokenEProvider extends BaseEVMProvider implements ProviderProxy {
  constructor(provider: RawProvider) {
    super(provider)
  }

  static get providerType(): PROVIDERS {
    return 'tokene' as PROVIDERS
  }
}
