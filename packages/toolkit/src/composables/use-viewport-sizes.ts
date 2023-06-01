import { useWindowSize } from '@vueuse/core'
import debounce from 'lodash/debounce'
import { onBeforeUnmount } from 'vue'

export const useViewportSizes = (): { assignVhCssVariable(): void } => {
  const { height: windowHeight } = useWindowSize()

  const assignVhCssVariable = () => {
    const vh = windowHeight.value * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  const assignVhCssVariableDebounced = debounce(assignVhCssVariable, 300)

  window.addEventListener('resize', assignVhCssVariableDebounced)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', assignVhCssVariableDebounced)
  })

  return { assignVhCssVariable }
}
