import {
  Fetcher,
  type FetcherErrorResponseInterceptor,
  type FetcherRequest,
  type FetcherRequestInterceptor,
  type FetcherResponse,
  type HTTP_METHODS,
  HTTP_STATUS_CODES,
} from '@distributedlab/fetcher'

export const createBearerAttachInterceptorHandler: (
  getAccessTokenFn: () => string,
) => FetcherRequestInterceptor = (getAccessTokenFn: () => string) => {
  return async (request: FetcherRequest) => {
    const accessToken = getAccessTokenFn()

    if (!accessToken) return request

    if (!request.headers) request.headers = {}

    // Attach bearer token to every request
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${accessToken}`,
    }

    return request
  }
}

export const createRefreshTokenInterceptorHandler: (
  getAccessTokenFn: () => string,
  refreshTokenFn: () => Promise<void>,
  logoutFn: () => Promise<void>,
  errorHandlerFn?: (error: unknown) => Promise<void>,
) => FetcherErrorResponseInterceptor = (
  getAccessTokenFn: () => string,
  refreshTokenFn: () => Promise<void>,
  logoutFn: () => Promise<void>,
  errorHandlerFn?: (error: unknown) => Promise<void>,
) => {
  return async (response: FetcherResponse<unknown>) => {
    const config = response?.request
    const isUnauthorized = response.status === HTTP_STATUS_CODES.UNAUTHORIZED

    // If error isn't unauthorized - return error
    if (
      !isUnauthorized &&
      // Add if you use a refresh token (as 'refresh_token_url' there should be refresh token endpoint)
      !config.url.includes('refresh_token')
    )
      return Promise.reject(response)

    try {
      // Executes some refresh token logic in the client app
      await refreshTokenFn()

      const accessToken = getAccessTokenFn()

      const url = new URL(config.url)

      return new Fetcher({ baseUrl: url.origin }).request({
        endpoint: url.pathname,
        method: config.method as HTTP_METHODS,
        ...(config.body ? { body: config.body } : {}),
        headers: {
          ...config.headers,
          // Reset default authorization header with new token
          Authorization: `Bearer ${accessToken}`,
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

      await logoutFn()

      await errorHandlerFn?.(error)

      return Promise.reject(error)
    }
  }
}
