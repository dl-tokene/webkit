import { type RemovableRef, useStorage } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
import { isEmpty } from 'lodash-es'
import { ref, watch } from 'vue'

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
  const localStorageState = useStorage<T>(key, initialValue, localStorage)

  const cookies = useCookies([key])

  const sessionStorageState = useStorage<T>(key, initialValue, sessionStorage)

  const storageState = ref<T>() as RemovableRef<T>

  watch(
    storageState,
    value => {
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
          cookies.set(key, JSON.stringify(value))
        }
      }
    },
    {
      deep: true,
    },
  )

  const init = () => {
    storageState.value =
      localStorageState.value ||
      sessionStorageState.value ||
      (cookies.get(key) as T) ||
      initialValue
  }

  init()

  return storageState
}
