import {
  Fetcher,
  FetcherErrorResponseInterceptor,
  FetcherRequest,
  FetcherRequestInterceptor,
  FetcherResponse,
  HTTP_STATUS_CODES,
} from '@distributedlab/fetcher'

import { i18n } from '@/localization'

export const bearerAttachInterceptor: FetcherRequestInterceptor = async (
  request: FetcherRequest,
) => {
  // Some authentication store in the client app
  const authStore = useAuthStore()
  if (!authStore.accessToken) return request

  if (!request.headers) request.headers = {}
  // Attach bearer token to every request
  request.headers.Authorization = `Bearer ${authStore.accessToken}`
  return request
}

export const refreshTokenInterceptor: FetcherErrorResponseInterceptor = async (
  response: FetcherResponse<unknown>,
) => {
  const config = response?.request
  const isUnauthorized = response.status === HTTP_STATUS_CODES.UNAUTHORIZED

  // If error isn't unauthorized - return error
  if (
    !isUnauthorized
    // Add if you use a refresh token (as 'refresh_token_url' there should be refresh token endpoint)
    // && config.url !== 'refresh_token_url'
  )
    return Promise.reject(response)

  // Some authentication store in the client app
  const authStore = useAuthStore()
  const { t } = i18n.global

  try {
    // Executes some refresh token logic in the client app
    await authStore.refreshToken()

    const url = new URL(config.url)

    return new Fetcher({ baseUrl: url.origin }).request({
      endpoint: url.pathname,
      method: config.method,
      body: config.data,
      headers: {
        ...config.headers,
        // Reset default authorization header with new token
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    })
  } catch (error) {
    /** Example of handling refresh token error in the client app
     *
     * Implementation may differ from example
     *
     * We can logout user and redirect him to the login page and
     * emit bus error event to show user that session expired
     */
    authStore.logout()
    router.push({ name: ROUTE_NAMES.login })
    Bus.error({
      title: t('api-errors.session-expired-title'),
      message: t('api-errors.session-expired-desc'),
    })
    return Promise.reject(_error)
  }
}
