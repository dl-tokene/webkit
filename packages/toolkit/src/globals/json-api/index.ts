import { FetcherInterceptor } from '@distributedlab/fetcher'
import { JsonApiClient, type JsonApiClientConfig } from '@distributedlab/jac'

export let api: JsonApiClient

export const initApi = (
  baseUrl: string,
  interceptors?: FetcherInterceptor[],
  config?: JsonApiClientConfig,
) => {
  api = new JsonApiClient(
    {
      baseUrl: baseUrl,
      ...(config ? { config } : {}),
    },
    [...(interceptors?.length ? interceptors : [])],
  )
}

export * from './api-interceptors'
