import type { EthProviderRpcError } from '@distributedlab/w3p'
import get from 'lodash/get'
import log from 'loglevel'

import { DEFAULT_BUS_EVENTS } from '@/enums'
import { errors } from '@/errors'
import { toolkitBus } from '@/globals'
import { handleEthereumProviderInternalError } from '@/helpers'
import { i18next } from '@/localization'

export class ErrorHandler {
  static getCustomErrorMessage?: (err: Error) => string

  static setCustomErrorMessageGetter(
    getCustomErrorMessage: (err: Error) => string,
  ) {
    this.getCustomErrorMessage = getCustomErrorMessage
  }

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
    let errorMessage = ''

    if (error instanceof Error) {
      switch (error.constructor) {
        case errors.ProviderChainNotFoundError:
          errorMessage = i18next.t('errors.provider-chain-not-found-error')
          break
        case errors.ProviderInjectedInstanceNotFoundError:
          errorMessage = i18next.t('errors.provider-not-supported-error')
          break
        case errors.ProviderUserRejectedRequest:
          break
        case errors.ProviderUnauthorized:
          errorMessage = i18next.t('errors.provider-unauthorized')
          break
        case errors.ProviderUnsupportedMethod:
          errorMessage = i18next.t('errors.provider-unsupported-method')
          break
        case errors.ProviderDisconnected:
          errorMessage = i18next.t('errors.provider-disconnected')
          break
        case errors.ProviderChainDisconnected:
          errorMessage = i18next.t('errors.provider-chain-disconnected')
          break
        case errors.ProviderParseError:
          errorMessage = i18next.t('errors.provider-parse-error')
          break
        case errors.ProviderInvalidRequest:
          errorMessage = i18next.t('errors.provider-invalid-request')
          break
        case errors.ProviderMethodNotFound:
          errorMessage = i18next.t('errors.provider-method-not-found')
          break
        case errors.ProviderInvalidParams:
          errorMessage = i18next.t('errors.provider-invalid-params')
          break
        case errors.ProviderInternalError:
          errorMessage = handleEthereumProviderInternalError(
            (error.cause as EthProviderRpcError & { reason: string })?.reason ||
              '',
          )
          break
        case errors.ProviderInvalidInput:
          errorMessage = i18next.t('errors.provider-invalid-input')
          break
        case errors.ProviderResourceNotFound:
          errorMessage = i18next.t('errors.provider-resource-not-found')
          break
        case errors.ProviderResourceUnavailable:
          errorMessage = i18next.t('errors.provider-resource-unavailable')
          break
        case errors.ProviderTransactionRejected:
          errorMessage = i18next.t('errors.provider-transaction-rejected')
          break
        case errors.ProviderMethodNotSupported:
          errorMessage = i18next.t('errors.provider-method-not-supported')
          break
        case errors.ProviderLimitExceeded:
          errorMessage = i18next.t('errors.provider-limit-exceeded')
          break
        case errors.ProviderJsonRpcVersionNotSupported:
          errorMessage = i18next.t(
            'errors.provider-json-rpc-version-not-supported',
          )
          break
        case errors.BadRequestError:
          errorMessage = get(
            { admin_not_found: i18next.t('errors.admin-not-found') },
            get(error, 'code', '') ||
              get(error, 'originalError.response.data.errors[0].code', ''),
            '',
          )
          break
        default: {
          errorMessage =
            this.getCustomErrorMessage?.(error) ?? i18next.t('errors.default')
        }
      }
    }

    return errorMessage
  }
}
