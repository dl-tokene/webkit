import { mapKeys, pickBy } from 'lodash-es'

import type { EnvConfig } from '@/types'
import { KeyValueUtil } from '@/utils'

export async function fetchAndParseConfig<T extends EnvConfig>(
  config: T,
  importMetaEnv: EnvConfig,
  documentEnv: EnvConfig,
) {
  const configKeys = Object.keys(config) as string[]

  const serviceKeyValues = await Promise.all(
    configKeys.map(async i => {
      try {
        return await new KeyValueUtil().get(String(i))
      } catch (error) {
        return undefined
      }
    }),
  )

  const configFromService = serviceKeyValues.reduce(
    (acc, cur) => ({
      ...acc,
      ...(cur?.key && cur?.value ? { [cur.key]: cur.value } : {}),
    }),
    {},
  )

  Object.assign(config, configFromService)

  const envKeyValues = configKeys.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: importMetaEnv?.[`VITE_${curr}`] || config[curr],
    }
  }, {})

  Object.assign(config, envKeyValues)

  Object.assign(config, _mapEnvCfg(documentEnv))
}

function _mapEnvCfg(env: EnvConfig): {
  [k: string]: string | boolean | undefined
} {
  return mapKeys(
    pickBy(env, (_, k) => k.startsWith('VITE_APP_')),
    (_, k) => k.replace(/^VITE_APP_/, ''),
  )
}
