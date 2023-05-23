import { HTTP_METHODS } from '@distributedlab/fetcher'

import { api } from '@/globals'
import { AuthToken, LoginResponse, RefreshTokenResponse } from '@/types'

export const getAuthNonce = async (message: string) => {
  const { data } = await api.post<{ message: string }>(
    '/integrations/nonce-auth-svc/nonce',
    {
      body: {
        data: {
          type: 'auth_nonce_request',
          attributes: {
            address: message,
          },
        },
      },
    },
  )

  /**
   * we are using split('\n')... instead of just authNonce message
   * because authNonce has format of
   * 'user-friendly part'\n'message we need'
   * so we have to use split to take that last part
   * with message for signing
   */
  return data.message.split('\n')[data.message.split('\n').length - 1]
}

export const login = async (
  providerAddress: string,
  signedMessage: string,
): Promise<{
  accessToken: AuthToken
  refreshToken: AuthToken
}> => {
  const { data } = await api.post<LoginResponse>(
    '/integrations/nonce-auth-svc/login',
    {
      body: {
        data: {
          type: 'login_request',
          attributes: {
            auth_pair: {
              address: providerAddress,
              signed_message: signedMessage,
            },
          },
        },
      },
    },
  )

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  }
}

export const refreshToken = async (
  refreshTokenId: string,
): Promise<{
  accessToken: AuthToken
  refreshToken: AuthToken
}> => {
  const { data } = await api.request<RefreshTokenResponse>({
    endpoint: '/integrations/nonce-auth-svc/refresh_token',
    method: HTTP_METHODS.GET,
    headers: {
      Authorization: `Bearer ${refreshTokenId}`,
    },
  })

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  }
}
