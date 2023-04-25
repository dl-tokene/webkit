import { DEFAULT_BUS_EVENTS } from '@/enums'
import type { NotificationPayload } from '@/types/notifications'

export type DefaultBusEventMap = {
  [DEFAULT_BUS_EVENTS.success]: NotificationPayload
  [DEFAULT_BUS_EVENTS.error]: NotificationPayload
  [DEFAULT_BUS_EVENTS.warning]: NotificationPayload
  [DEFAULT_BUS_EVENTS.info]: NotificationPayload
}

export type DefaultBusEventCallback = (e: NotificationPayload) => void

export interface DefaultBusSubscriber {
  onSuccess(cb: DefaultBusEventCallback): void
  onError(cb: DefaultBusEventCallback): void
  onWarning(cb: DefaultBusEventCallback): void
  onInfo(cb: DefaultBusEventCallback): void
}
