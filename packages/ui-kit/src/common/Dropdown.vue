<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

const props = withDefaults(
  defineProps<{
    isOpenedByDefault?: boolean
    isCloseByClickOutside?: boolean
  }>(),
  {
    isOpenedByDefault: false,
    isCloseByClickOutside: true,
  },
)

const rootEl = ref<HTMLElement | null>(null)
const isDropdownOpen = ref(props.isOpenedByDefault)

onBeforeRouteUpdate(() => {
  closeDropdown()
})

onMounted(() => {
  if (rootEl.value) {
    if (props.isCloseByClickOutside) {
      onClickOutside(rootEl, () => {
        closeDropdown()
      })
    }
  }
})

const toggleDropdown = () => {
  isDropdownOpen.value ? closeDropdown() : openDropdown()
}
const closeDropdown = () => {
  isDropdownOpen.value = false
}
const openDropdown = () => {
  isDropdownOpen.value = true
}

const setHeightCSSVar = (element: Element) => {
  ;(element as HTMLElement).style.setProperty(
    '--dropdown-body-height',
    `${element.scrollHeight}px`,
  )
}
</script>

<template>
  <div class="dropdown" ref="rootEl">
    <div class="dropdown__head">
      <slot
        name="head"
        :dropdown="{
          isOpen: isDropdownOpen,
          toggle: toggleDropdown,
          open: openDropdown,
          close: closeDropdown,
        }"
      />
    </div>
    <transition
      name="dropdown__body-transition"
      @enter="setHeightCSSVar"
      @before-leave="setHeightCSSVar"
    >
      <div v-show="isDropdownOpen" class="dropdown__body">
        <slot
          :dropdown="{
            isOpen: isDropdownOpen,
            toggle: toggleDropdown,
            open: openDropdown,
            close: closeDropdown,
          }"
        />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
$local-z-index: 1;
$dropdown-z-index: $local-z-index + 1;

.dropdown {
  position: relative;
}

.dropdown__head {
  width: 100%;
  z-index: $local-z-index;
}

.dropdown__body {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: $dropdown-z-index;
}

.dropdown__body-transition-enter-active {
  overflow: hidden;
  animation: dropdown-frame-keyframes 0.25s ease-in-out;
}

.dropdown__body-transition-leave-active {
  overflow: hidden;
  animation: dropdown-frame-keyframes 0.25s ease-in-out reverse;
}

@keyframes dropdown-frame-keyframes {
  from {
    height: 0;
  }

  to {
    height: var(--dropdown-body-height);
  }
}
</style>
