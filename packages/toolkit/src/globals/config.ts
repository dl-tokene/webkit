export const toolkitConfig = {
  API_IPFS_URL: '',
}

export const initToolkitConfig = (config: typeof toolkitConfig) => {
  Object.assign(toolkitConfig, config)
}
