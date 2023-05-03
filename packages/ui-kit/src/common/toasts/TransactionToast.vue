<template>
  <div class="transaction-toast">
    <icon class="transaction-toast__icon" :name="iconName" />
    <div class="transaction-toast__details">
      <h4 class="transaction-toast__title">
        {{ toastTitle }}
      </h4>
      <a
        :href="link"
        target="_blank"
        rel="noreferrer noopener"
        class="transaction-toast__message"
      >
        {{ toastMessage }}
        <icon
          class="transaction-toast__message-icon"
          :name="ICON_NAMES.linkSquareArrow"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { i18next } from '@tokene/toolkit'
import { computed } from 'vue'

import { Icon } from '@/common'
import { ICON_NAMES } from '@/enums'

const props = withDefaults(
  defineProps<{
    type: 'pending' | 'error' | 'success'
    link: string
  }>(),
  {},
)

// FIXME: useI18n not working
const { t } = i18next

const iconName = computed(() => {
  switch (props.type) {
    case 'pending':
      return ICON_NAMES.loading
    case 'success':
      return ICON_NAMES.check
    case 'error':
      return ICON_NAMES.exclamationCircleFilled
    default:
      return ICON_NAMES.loading
  }
})

const toastTitle = computed(() => {
  switch (props.type) {
    case 'pending':
      return t('notification.tx-pending-title')
    case 'success':
      return t('notification.tx-success-title')
    case 'error':
      return t('notification.tx-error-title')
    default:
      return ''
  }
})

const toastMessage = computed(() => {
  switch (props.type) {
    case 'pending':
      return t('notification.tx-pending-message')
    case 'success':
      return t('notification.tx-success-message')
    case 'error':
      return t('notification.tx-error-message')
    default:
      return ''
  }
})
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

.transaction-toast {
  display: grid;
  place-items: flex-start;
  grid-template-columns: max-content 1fr;
  grid-gap: toRem(4);
}

.transaction-toast .transaction-toast__icon {
  max-width: toRem(18);
  max-height: toRem(18);
}

.transaction-toast__details {
  display: grid;
  grid-gap: toRem(4);
  width: 100%;
}

.transaction-toast__title {
  color: var(--text-primary-invert-main);
  margin-bottom: toRem(12);
}

.transaction-toast__message {
  display: inline;
  vertical-align: baseline;
  color: var(--text-primary-invert-main);
  line-height: 1.2;
  max-width: toRem(300);

  .transaction-toast__message-icon {
    display: inline;
    vertical-align: baseline;
    width: 0.9em;
    height: 0.9em;
    transform: translatey(toRem(2));
  }
}
</style>
