import { DEFAULT_BUS_EVENTS } from '@/enums'

export type DefaultBusEventMap = {
  [DEFAULT_BUS_EVENTS.success]: unknown
  [DEFAULT_BUS_EVENTS.error]: unknown
  [DEFAULT_BUS_EVENTS.warning]: unknown
  [DEFAULT_BUS_EVENTS.info]: unknown

  [DEFAULT_BUS_EVENTS.refreshToken]: void
  [DEFAULT_BUS_EVENTS.logout]: () => void
}
