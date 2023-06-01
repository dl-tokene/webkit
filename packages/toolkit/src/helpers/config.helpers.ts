import mapKeys from 'lodash/mapKeys'
import pickBy from 'lodash/pickBy'

import type { EnvConfig } from '@/types'
import { KeyValueUtil } from '@/utils'

function _mapEnvCfg(env: EnvConfig): {
  [k: string]: string | boolean | undefined
} {
  return mapKeys(
    pickBy(env, (_, k) => k.startsWith('VITE_APP_')),
    (_, k) => k.replace(/^VITE_APP_/, ''),
  )
}

export async function getConfigFromService<T extends EnvConfig>(
  configKeys: string[],
): Promise<T> {
  const serviceKeyValues = await Promise.all(
    configKeys.map(async i => {
      try {
        return await new KeyValueUtil().get(String(i))
      } catch (error) {
        return undefined
      }
    }),
  )

  return serviceKeyValues.reduce(
    (acc, cur) => ({
      ...acc,
      ...(cur?.key && cur?.value ? { [cur.key]: cur.value } : {}),
    }),
    {},
  ) as T
}

export function getConfigFromEnv<T extends EnvConfig>(
  rawConfig: T,
  importMetaEnv: EnvConfig,
  documentEnv: EnvConfig,
): T {
  const configKeys = Object.keys(rawConfig) as string[]

  const config = configKeys.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: importMetaEnv?.[`VITE_${curr}`] || rawConfig[curr],
    }),
    {},
  ) as T

  Object.assign(config, _mapEnvCfg(documentEnv))

  Object.assign(rawConfig, config)

  return config
}

export async function fetchAndParseConfig<T extends EnvConfig>(
  config: T,
  importMetaEnv: EnvConfig,
  documentEnv: EnvConfig,
) {
  const configKeys = Object.keys(config) as string[]

  Object.assign(config, getConfigFromService<T>(configKeys))

  Object.assign(config, getConfigFromEnv(config, importMetaEnv, documentEnv))
}
