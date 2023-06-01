import { type RemovableRef, useStorage } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
import isEmpty from 'lodash/isEmpty'
import { ref, watch } from 'vue'

import { extractRootDomain } from '@/helpers'

export function useUniversalStorage<T>(
  key: string,
  initialValue: T,
  options = {
    isLocalStorage: true,
    isSessionStorage: false,
    isCookieStorage: false,
  } as {
    isLocalStorage?: boolean
    isSessionStorage?: boolean
    isCookieStorage?: boolean
  },
) {
  const isLoaded = ref(false)
  const storageState = ref<T>() as RemovableRef<T>

  const localStorageState = useStorage<T>(key, initialValue, localStorage)

  const cookies = useCookies([key])

  const sessionStorageState = useStorage<T>(key, initialValue, sessionStorage)

  watch(
    storageState,
    value => {
      if (!isLoaded.value) {
        isLoaded.value = true

        return
      }

      if (options?.isLocalStorage) {
        localStorageState.value = value
      }

      if (options?.isSessionStorage) {
        sessionStorageState.value = value
      }

      if (options?.isCookieStorage) {
        if (isEmpty(value)) {
          cookies.remove(key)
        } else {
          cookies.set(key, JSON.stringify(value), {
            domain: extractRootDomain(window.location.href),
            path: '/',
          })
        }
      }
    },
    {
      deep: true,
    },
  )

  const init = () => {
    isLoaded.value = false

    if (options?.isSessionStorage && options?.isLocalStorage) {
      localStorageState.value = sessionStorageState.value
    }

    if (options?.isCookieStorage) {
      if (options?.isLocalStorage) {
        localStorageState.value = cookies.get(key) as T
      }

      if (options?.isSessionStorage) {
        sessionStorageState.value = cookies.get(key) as T
      }
    }

    storageState.value =
      (options?.isCookieStorage && (cookies.get(key) as T)) ||
      (options?.isSessionStorage && sessionStorageState.value) ||
      (options?.isLocalStorage && localStorageState.value) ||
      initialValue
  }

  init()

  return storageState
}
