export type NotificationObjectPayload = {
  title?: string
  message: string
  iconName?: string // FIXME
}

export type NotificationPayload = string | NotificationObjectPayload
