export const sdkConfig = {
  CORE_GRAPH_URL: '',

  MASTER_CONTRACTS_REGISTRY_CONTRACT_ADDRESS: '',
}

export const initSdkConfig = (config: typeof sdkConfig) => {
  Object.assign(sdkConfig, config)
}
