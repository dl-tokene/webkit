export type JsonApiRelationship = Record<string, unknown>
export type Uuid = string
export type JsonApiRelationships = Record<
  string,
  JsonApiRelationship | JsonApiRelationship[]
>

export type JsonApiRecordBase<T extends string> = {
  id: Uuid
  type: T
  relationship_names?: JsonApiRelationships
}

export type AuthToken = JsonApiRecordBase<'refresh_jwt' | 'access_jwt'> & {
  expires_in: number
}

export type LoginResponse = JsonApiRecordBase<'admin_login'> & {
  refresh_token: AuthToken
  access_token: AuthToken
}

export type AuthNonceResponse = JsonApiRecordBase<'auth_nonce_request'> & {
  address: string
  terms_hash?: string
}

export type RefreshTokenResponse = JsonApiRecordBase<'jwt_pair'> & {
  refresh_token: AuthToken
  access_token: AuthToken
}
