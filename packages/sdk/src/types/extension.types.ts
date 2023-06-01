export enum EXTENSION_STATES {
  connected = 'connected',
  frozen = 'frozen',
  notConnected = 'not-connected',
}

export type Extension = {
  id: string
  name: string
  short_description: string
  full_description: ['paragraph' | 'image', string][]
  thumbnailUrl: string
  state: EXTENSION_STATES
  contract_name?: string
  contract_address?: string
  is_can_be_frozen: boolean
}
