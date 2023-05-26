import type { EthProviderRpcError } from '@distributedlab/w3p'
import { get } from 'lodash-es'
import log from 'loglevel'

import { DEFAULT_BUS_EVENTS } from '@/enums'
import { errors } from '@/errors'
import { toolkitBus } from '@/globals'
import { handleEthereumProviderInternalError } from '@/helpers'
import { i18next } from '@/localization'

export class ErrorHandler {
  static #customErrors: {
    error: Error
    getMessage: () => string
  }[] = []

  static setCustomErrors(
    customErrors: {
      error: Error
      getMessage: () => string
    }[],
  ) {
    this.#customErrors = customErrors
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
    let isErrorMatched = false

    if (error instanceof Error) {
      const errorsList = [
        {
          error: errors.ProviderChainNotFoundError,
          getMessage: () => i18next.t('errors.provider-chain-not-found-error'),
        },
        {
          error: errors.ProviderInjectedInstanceNotFoundError,
          getMessage: () => i18next.t('errors.provider-not-supported-error'),
        },
        {
          error: errors.ProviderUserRejectedRequest,
          getMessage: () => '',
        },
        {
          error: errors.ProviderUnauthorized,
          getMessage: () => i18next.t('errors.provider-unauthorized'),
        },
        {
          error: errors.ProviderUnsupportedMethod,
          getMessage: () => i18next.t('errors.provider-unsupported-method'),
        },
        {
          error: errors.ProviderDisconnected,
          getMessage: () => i18next.t('errors.provider-disconnected'),
        },
        {
          error: errors.ProviderChainDisconnected,
          getMessage: () => i18next.t('errors.provider-chain-disconnected'),
        },
        {
          error: errors.ProviderParseError,
          getMessage: () => i18next.t('errors.provider-parse-error'),
        },
        {
          error: errors.ProviderInvalidRequest,
          getMessage: () => i18next.t('errors.provider-invalid-request'),
        },
        {
          error: errors.ProviderMethodNotFound,
          getMessage: () => i18next.t('errors.provider-method-not-found'),
        },
        {
          error: errors.ProviderInvalidParams,
          getMessage: () => i18next.t('errors.provider-invalid-params'),
        },
        {
          error: errors.ProviderInternalError,
          getErrorMessage: () =>
            handleEthereumProviderInternalError(
              (error.cause as EthProviderRpcError & { reason: string })
                ?.reason || '',
            ),
        },
        {
          error: errors.ProviderInvalidInput,
          getMessage: () => i18next.t('errors.provider-invalid-input'),
        },
        {
          error: errors.ProviderResourceNotFound,
          getMessage: () => i18next.t('errors.provider-resource-not-found'),
        },
        {
          error: errors.ProviderResourceUnavailable,
          getMessage: () => i18next.t('errors.provider-resource-unavailable'),
        },
        {
          error: errors.ProviderTransactionRejected,
          getMessage: () => i18next.t('errors.provider-transaction-rejected'),
        },
        {
          error: errors.ProviderMethodNotSupported,
          getMessage: () => i18next.t('errors.provider-method-not-supported'),
        },
        {
          error: errors.ProviderLimitExceeded,
          getMessage: () => i18next.t('errors.provider-limit-exceeded'),
        },
        {
          error: errors.ProviderJsonRpcVersionNotSupported,
          getErrorMessage: () =>
            i18next.t('errors.provider-json-rpc-version-not-supported'),
        },
        {
          error: errors.BadRequestError,
          getErrorMessage: () =>
            get(
              { admin_not_found: i18next.t('errors.admin-not-found') },
              get(error, 'code', '') ||
                get(error, 'originalError.response.data.errors[0].code', ''),
              '',
            ),
        },
        ...this.#customErrors,
      ]

      for (const err of errorsList) {
        if (error.constructor == err.error) {
          errorMessage = err?.getMessage?.() as string
          isErrorMatched = true
          break
        }
      }

      if (!isErrorMatched) errorMessage = i18next.t('errors.default')
    }

    return errorMessage
  }
}
