import { ICON_NAMES } from '@tokene/ui-kit'

export type CommonNotificationTypes =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'default'

export type NotificationObjectPayload = {
  title?: string
  message: string
  iconName?: ICON_NAMES // FIXME
}

export type NotificationPayload = string | NotificationObjectPayload

export type NotificationTxType = 'pending' | 'success' | 'error'
