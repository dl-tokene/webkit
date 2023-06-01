import { i18next } from '@tokene/toolkit'
import { ICON_NAMES } from '@tokene/ui-kit'
import isObject from 'lodash/isObject'
import { TYPE, useToast } from 'vue-toastification'
import type { ToastOptions } from 'vue-toastification/dist/types/types'

import { DefaultToast, TransactionToast } from '@/components'
import {
  CommonNotificationTypes,
  NotificationObjectPayload,
  NotificationPayload,
  NotificationTxType,
} from '@/types'

const MINUTE = 60 * 1000

export const useNotifications = (options?: ToastOptions) => {
  const toast = useToast()

  // FIXME
  const { t } = i18next

  const defaultTitles = {
    [TYPE.SUCCESS]: t('notification.default-title-success'),
    [TYPE.ERROR]: t('notification.default-title-error'),
    [TYPE.WARNING]: t('notification.default-title-warning'),
    [TYPE.INFO]: t('notification.default-title-info'),
    [TYPE.DEFAULT]: t('notification.default-title-default'),
  }
  const defaultMessages = {
    [TYPE.DEFAULT]: t('notification.default-message-default'),
    [TYPE.INFO]: t('notification.default-message-info'),
    [TYPE.SUCCESS]: t('notification.default-message-success'),
    [TYPE.ERROR]: t('notification.default-message-error'),
    [TYPE.WARNING]: t('notification.default-message-warning'),
  }
  const defaultIconNames = {
    [TYPE.DEFAULT]: ICON_NAMES.exclamationCircleFilled,
    [TYPE.INFO]: ICON_NAMES.exclamationCircleFilled,
    [TYPE.SUCCESS]: ICON_NAMES.checkFilled,
    [TYPE.ERROR]: ICON_NAMES.xCircleFilled,
    [TYPE.WARNING]: ICON_NAMES.exclamationTriangleFilled,
  }

  const showToast = (
    messageType = 'default' as CommonNotificationTypes,
    payload?: NotificationPayload,
  ) => {
    let title = ''
    let message = ''
    let iconName: ICON_NAMES | undefined

    if (isObject(payload)) {
      const msgPayload = payload as NotificationObjectPayload

      title = msgPayload.title || ''
      message = msgPayload.message
      iconName = msgPayload.iconName
    } else if (payload) {
      message = payload as string
    } else {
      message = defaultMessages[messageType]
    }

    if (!title) {
      title = defaultTitles[messageType]
    }
    if (!iconName) {
      iconName = defaultIconNames[messageType]
    }

    return toast(
      {
        component: DefaultToast,
        props: {
          ...(title && { title }),
          message,
          ...(iconName && { iconName }),
        },
      },
      {
        ...(options || {}),
        icon: false,
        type: {
          default: TYPE.DEFAULT,
          info: TYPE.INFO,
          success: TYPE.SUCCESS,
          error: TYPE.ERROR,
          warning: TYPE.WARNING,
        }[messageType],
        toastClassName: 'default-toast',
        ...(options?.timeout
          ? { timeout: options.timeout }
          : { timeout: MINUTE / 2 }),
        closeOnClick: false,
      },
    )
  }

  const showTxToast = (type: NotificationTxType, link: string) => {
    return toast(
      {
        component: TransactionToast,
        props: {
          type: type,
          link: link,
        },
      },
      {
        ...(options || {}),
        icon: false,
        type: {
          pending: TYPE.INFO,
          success: TYPE.SUCCESS,
          error: TYPE.ERROR,
        }[type],
        toastClassName: 'transaction-toast',
        ...(options?.timeout
          ? { timeout: options.timeout }
          : { timeout: MINUTE / 2 }),
        closeOnClick: false,
      },
    )
  }

  const removeToast = (id: string | number) => toast.dismiss(id)

  return { showToast, showTxToast, removeToast }
}

export * from 'vue-toastification'
