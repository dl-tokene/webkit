import {
  EventEmitter,
  EventHandler,
  EventHandlersMap,
  EventMap,
  EventMapKey,
} from '@distributedlab/tools'

import { DEFAULT_BUS_EVENTS } from '@/enums'
import type {
  DefaultBusEventCallback,
  DefaultBusEventMap,
  DefaultBusSubscriber,
  NotificationPayload,
} from '@/types'

const _eventEmitter = new EventEmitter()

_eventEmitter.emit(DEFAULT_BUS_EVENTS.success, 'asdfsadf')
_eventEmitter.emit('DEFAULT_BUS_EVENTS.success', 'asdfsadf')

export class EventBus<T extends EventMap> implements DefaultBusSubscriber {
  #emitter = _eventEmitter

  get handlers(): EventHandlersMap<DefaultBusEventMap & T> {
    return this.#emitter.handlers
  }

  public on<K extends EventMapKey<DefaultBusEventMap & T>>(
    key: K,
    fn: EventHandler<T[K]>,
  ): void {
    this.#emitter.on(key, fn)
  }

  public once<K extends EventMapKey<DefaultBusEventMap & T>>(
    key: K,
    fn: EventHandler<T[K]>,
  ): void {
    this.#emitter.once(key, fn)
  }

  public off<K extends EventMapKey<DefaultBusEventMap & T>>(
    key: K,
    fn: EventHandler<T[K]>,
  ): void {
    this.#emitter.off(key, fn)
  }

  public emit<K extends EventMapKey<DefaultBusEventMap & T>>(
    key: K,
    data: (DefaultBusEventMap & T)[K],
  ): void | never {
    this.#emitter.emit(key, data)
  }

  public clear(): void {
    this.#emitter.clear()
  }

  public onSuccess(cb: DefaultBusEventCallback) {
    this.on(DEFAULT_BUS_EVENTS.success, cb)
  }

  public onError(cb: DefaultBusEventCallback) {
    this.on(DEFAULT_BUS_EVENTS.success, cb)
  }

  public onWarning(cb: DefaultBusEventCallback) {
    this.on(DEFAULT_BUS_EVENTS.success, cb)
  }

  public onInfo(cb: DefaultBusEventCallback) {
    this.on(DEFAULT_BUS_EVENTS.success, cb)
  }

  public emitSuccess(payload: NotificationPayload) {
    this.emit(DEFAULT_BUS_EVENTS.success, payload)
  }

  public emitError(payload: NotificationPayload) {
    this.emit(DEFAULT_BUS_EVENTS.success, payload)
  }

  public emitWarning(payload: NotificationPayload) {
    this.emit(DEFAULT_BUS_EVENTS.success, payload)
  }

  public emitInfo(payload: NotificationPayload) {
    this.emit(DEFAULT_BUS_EVENTS.success, payload)
  }
}

export const bus = new EventBus()

// client

const clientBus = new EventBus<{
  action1: () => {}
  action2: () => {}
  action3: () => {}
}>()

clientBus.emit('action1', '')
clientBus.emit(DEFAULT_BUS_EVENTS.success, '')
