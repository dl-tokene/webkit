<template>
  <transition name="drawer__transition">
    <div v-if="isShown" class="drawer">
      <div class="drawer__aside" ref="drawerAside">
        <div class="drawer__header">
          <slot name="heading" />

          <app-button
            class="drawer__close-btn"
            scheme="none"
            size="medium"
            modification="border-circle"
            :icon-right="ICON_NAMES.x"
            @click="closeDrawer"
          />
        </div>

        <div class="drawer__content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { onMounted, ref } from 'vue'

import { AppButton } from '@/common'
import { ICON_NAMES } from '@/enums'

const drawerAside = ref<HTMLElement | undefined>()

const props = withDefaults(
  defineProps<{
    isShown: boolean
    isCloseByClickOutside?: boolean
  }>(),
  {
    isCloseByClickOutside: true,
  },
)

const emit = defineEmits<{
  (e: 'update:is-shown', value: boolean): void
}>()

onMounted(() => {
  if (drawerAside.value && props.isCloseByClickOutside) {
    onClickOutside(drawerAside, () => {
      closeDrawer()
    })
  }
})

const closeDrawer = () => {
  emit('update:is-shown', false)
}
</script>

<style lang="scss" scoped>
$drawer-padding-horizontal: toRem(12);
$drawer-padding-vertical: toRem(12);
$z-drawer: 100;

.drawer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: $z-drawer;
  background: rgba(var(--black-rgb), 0.5);
}

.drawer__aside {
  display: flex;
  flex-direction: column;
  background: var(--background-primary-dark);
  border-radius: toRem(16) 0 0 toRem(16);
  padding: $drawer-padding-vertical $drawer-padding-horizontal;
  height: 100%;
  max-width: toRem(360);
  margin-left: auto;
}

.drawer__content {
  overflow: auto;
}

.drawer__header {
  padding-right: toRem(12);
  margin-bottom: toRem(18);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer__transition-enter-active {
  animation: fade-unroll-right 0.5s ease-in-out;
}

.drawer__transition-leave-active {
  animation: fade-unroll-right 0.5s ease-in-out reverse;
}

@keyframes fade-unroll-right {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}
</style>
