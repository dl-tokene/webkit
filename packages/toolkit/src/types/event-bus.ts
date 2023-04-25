import { DEFAULT_BUS_EVENTS } from '@/enums'
import type { NotificationPayload } from '@/types/notifications'

export type DefaultBusEventMap = {
  [DEFAULT_BUS_EVENTS.success]: NotificationPayload
  [DEFAULT_BUS_EVENTS.error]: NotificationPayload
  [DEFAULT_BUS_EVENTS.warning]: NotificationPayload
  [DEFAULT_BUS_EVENTS.info]: NotificationPayload

  [DEFAULT_BUS_EVENTS.refreshToken]: void
  [DEFAULT_BUS_EVENTS.logout]: () => void
}
