import { JsonApiClient, type JsonApiClientConfig } from '@distributedlab/jac'

import {
  bearerAttachInterceptor,
  refreshTokenInterceptor,
} from './api-interceptors'

export let api: JsonApiClient

export const initApi = (
  baseUrl: string,
  isWithAuthInterceptors = true,
  config?: JsonApiClientConfig,
) => {
  api = new JsonApiClient(
    {
      baseUrl: baseUrl,
      ...(config ? { config } : {}),
    },
    [
      ...(isWithAuthInterceptors
        ? [{ request: bearerAttachInterceptor, error: refreshTokenInterceptor }]
        : []),
    ],
  )
}
