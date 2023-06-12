export type SupportedTokenTypes = 'ERC20' | 'ERC721'

export type ERC20TokenMetadata = {
  decimals: number
  description: string
  image: string
}

export type ERC721TokenMetadata = {
  baseURI: string
  description: string
  image: string
}

export type Token = {
  id: string
  name: string
  symbol: string
  description: string
  totalSupplyCap?: string
  totalSupply?: string
  contractURI: string
} & ERC20TokenMetadata &
  ERC721TokenMetadata
