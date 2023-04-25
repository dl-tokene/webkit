import { JsonApiClient } from '@distributedlab/jac'

import {
  bearerAttachInterceptor,
  refreshTokenInterceptor,
} from './api-interceptors'

export let api: JsonApiClient

export const initApi = (baseUrl: string) => {
  api = new JsonApiClient(
    {
      baseUrl: baseUrl,
    },
    [{ request: bearerAttachInterceptor, error: refreshTokenInterceptor }],
  )
}
