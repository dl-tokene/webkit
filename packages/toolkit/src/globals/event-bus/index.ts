import { EventEmitter } from '@distributedlab/tools'

import type { DefaultBusEventMap } from '@/types'

export const toolkitBus = new EventEmitter<DefaultBusEventMap>()
