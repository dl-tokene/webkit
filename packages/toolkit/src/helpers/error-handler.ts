import type { EthProviderRpcError } from '@distributedlab/w3p'
import { get } from 'lodash-es'
import log from 'loglevel'

import { DEFAULT_BUS_EVENTS } from '@/enums'
import { errors } from '@/errors'
import { toolkitBus } from '@/globals'
import { handleEthereumProviderInternalError } from '@/helpers'
import { i18n } from '@/localization'

export class ErrorHandler {
  static process(error: Error | unknown, errorMessage = ''): void {
    const msgTranslation = errorMessage || ErrorHandler._getErrorMessage(error)

    if (msgTranslation) {
      toolkitBus.emit(DEFAULT_BUS_EVENTS.error, msgTranslation)
    }

    ErrorHandler.processWithoutFeedback(error)
  }

  static processWithoutFeedback(error: Error | unknown): void {
    log.error(error)
  }

  static _getErrorMessage(error: Error | unknown): string {
    const { t } = i18n.global
    let errorMessage = ''

    if (error instanceof Error) {
      switch (error.constructor) {
        case errors.ProviderChainNotFoundError:
          errorMessage = t('errors.provider-chain-not-found-error')
          break
        case errors.ProviderInjectedInstanceNotFoundError:
          errorMessage = t('errors.provider-not-supported-error')
          break
        case errors.ProviderUserRejectedRequest:
          break
        case errors.ProviderUnauthorized:
          errorMessage = t('errors.provider-unauthorized')
          break
        case errors.ProviderUnsupportedMethod:
          errorMessage = t('errors.provider-unsupported-method')
          break
        case errors.ProviderDisconnected:
          errorMessage = t('errors.provider-disconnected')
          break
        case errors.ProviderChainDisconnected:
          errorMessage = t('errors.provider-chain-disconnected')
          break
        case errors.ProviderParseError:
          errorMessage = t('errors.provider-parse-error')
          break
        case errors.ProviderInvalidRequest:
          errorMessage = t('errors.provider-invalid-request')
          break
        case errors.ProviderMethodNotFound:
          errorMessage = t('errors.provider-method-not-found')
          break
        case errors.ProviderInvalidParams:
          errorMessage = t('errors.provider-invalid-params')
          break
        case errors.ProviderInternalError:
          errorMessage = handleEthereumProviderInternalError(
            (error.cause as EthProviderRpcError & { reason: string })?.reason ||
              '',
          )
          break
        case errors.ProviderInvalidInput:
          errorMessage = t('errors.provider-invalid-input')
          break
        case errors.ProviderResourceNotFound:
          errorMessage = t('errors.provider-resource-not-found')
          break
        case errors.ProviderResourceUnavailable:
          errorMessage = t('errors.provider-resource-unavailable')
          break
        case errors.ProviderTransactionRejected:
          errorMessage = t('errors.provider-transaction-rejected')
          break
        case errors.ProviderMethodNotSupported:
          errorMessage = t('errors.provider-method-not-supported')
          break
        case errors.ProviderLimitExceeded:
          errorMessage = t('errors.provider-limit-exceeded')
          break
        case errors.ProviderJsonRpcVersionNotSupported:
          errorMessage = t('errors.provider-json-rpc-version-not-supported')
          break
        case errors.BadRequestError:
          errorMessage = get(
            { admin_not_found: t('errors.admin-not-found') },
            get(error, 'code', '') ||
              get(error, 'originalError.response.data.errors[0].code', ''),
            '',
          )
          break
        default: {
          errorMessage = t('errors.default')
        }
      }
    }

    return errorMessage
  }
}
