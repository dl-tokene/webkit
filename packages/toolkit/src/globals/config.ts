export const config = {
  API_IPFS_URL: '',
}

export const initConfig = (externalConfig: typeof config) => {
  Object.assign(config, externalConfig)
}
