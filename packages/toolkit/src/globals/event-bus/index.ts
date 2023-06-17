import {
  EventEmitter,
  type EventHandler,
  type EventMapKey,
} from '@distributedlab/tools'

import type { DefaultBusEventMap } from '@/types'

export const toolkitBus = new EventEmitter<DefaultBusEventMap>()

export class EventBus<T extends Record<string, unknown>> {
  #emitter = toolkitBus as EventEmitter<DefaultBusEventMap & T>

  constructor() {
    /* empty */
  }

  on(
    eventName: EventMapKey<DefaultBusEventMap & T>,
    handlerFn: (payload: unknown) => void,
  ): void {
    this.#emitter.on(eventName, handlerFn)
  }

  emit(
    eventName: EventMapKey<DefaultBusEventMap & T>,
    payload?: (DefaultBusEventMap & T)[EventMapKey<DefaultBusEventMap & T>],
  ): void {
    this.#emitter.emit(eventName, payload)
  }

  off(
    eventName: EventMapKey<DefaultBusEventMap & T>,
    handlerFn: EventHandler<
      (DefaultBusEventMap & T)[EventMapKey<DefaultBusEventMap & T>]
    >,
  ): void {
    this.#emitter.off(eventName, handlerFn)
  }
}
