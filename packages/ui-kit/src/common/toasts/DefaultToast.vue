<template>
  <div class="notification">
    <icon v-if="toastIcon" class="notification__icon" :name="toastIcon" />
    <div class="notification__details">
      <h4 class="notification__title">
        {{ title }}
      </h4>
      <p class="notification__message">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { Icon } from '@/common'
import { ICON_NAMES } from '@/enums'

const props = withDefaults(
  defineProps<{
    title?: string
    message: string
    iconName?: ICON_NAMES
  }>(),
  {
    title: '',
    iconName: undefined,
  },
)

const toastIcon = computed(() => props.iconName || ICON_NAMES.checkFilled)
</script>

<style lang="scss">
@import 'vue-toastification/src/scss/index';

.Vue-Toastification__toast {
  &--success {
    background: var(--success-dark);
  }

  &--error {
    background: var(--error-dark);
  }

  &--warning {
    background: var(--warning-dark);
  }

  &--info {
    background: var(--primary-main);
  }
}

.notification {
  display: grid;
  place-items: flex-start;
  grid-template-columns: max-content 1fr;
  grid-gap: toRem(4);
}

.notification .notification__icon {
  max-width: toRem(18);
  max-height: toRem(18);
}

.notification__details {
  display: grid;
  grid-gap: toRem(4);
  width: 100%;
}

.notification__title {
  color: var(--text-primary-invert-main);
  margin-bottom: toRem(12);
}

.notification__message {
  color: var(--text-primary-invert-main);
  line-height: 1.2;
  max-width: toRem(200);
}
</style>
