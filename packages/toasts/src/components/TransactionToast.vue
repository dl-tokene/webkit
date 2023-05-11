<template>
  <div class="transaction-toast__body">
    <div class="transaction-toast__icon-wrp">
      <icon class="transaction-toast__icon" :name="iconName" />
    </div>
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
import { Icon, ICON_NAMES } from '@tokene/ui-kit'
import { computed } from 'vue'

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
.Vue-Toastification__toast.transaction-toast {
  background: var(--white);
  padding: toRem(12);
}

.transaction-toast__body {
  display: flex;
  gap: toRem(12);
}

.transaction-toast__icon-wrp {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: toRem(8);
  min-width: toRem(56);
  min-height: toRem(56);
  max-width: toRem(56);
  max-height: toRem(56);
  width: toRem(56);
  height: toRem(56);

  .Vue-Toastification__toast--success & {
    background: var(--success-light);
    color: var(--success-main);
  }

  .Vue-Toastification__toast--error & {
    background: var(--error-light);
    color: var(--error-main);
  }

  .Vue-Toastification__toast--warning & {
    background: var(--warning-light);
    color: var(--warning-main);
  }

  .Vue-Toastification__toast--info & {
    background: var(--primary-light);
    color: var(--primary-main);
  }
}

.transaction-toast .transaction-toast__icon {
  max-width: toRem(24);
  max-height: toRem(24);
}

.transaction-toast__details {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: toRem(8) 0;
}

.transaction-toast__title {
  font-size: toRem(14);
  line-height: 1.5;
  font-weight: 500;
  letter-spacing: toRem(0.1);
  color: var(--text-primary-main);
}

.transaction-toast__message {
  display: inline;
  vertical-align: baseline;
  font-size: toRem(14);
  line-height: 1.5;
  letter-spacing: toRem(0.25);
  color: var(--text-secondary-main);
  width: toRem(230);

  @include respond-to(xsmall) {
    width: toRem(180);
  }

  .transaction-toast__message-icon {
    display: inline;
    vertical-align: baseline;
    width: 0.9em;
    height: 0.9em;
    transform: translateY(toRem(2));
  }
}

.Vue-Toastification__close-button {
  align-self: flex-start;
  color: var(--text-secondary-main);
  padding: 0;
  font-size: toRem(28);
  line-height: 1;
}

.Vue-Toastification__progress-bar {
  .Vue-Toastification__toast--success & {
    background: var(--success-main);
  }

  .Vue-Toastification__toast--error & {
    background: var(--error-main);
  }

  .Vue-Toastification__toast--warning & {
    background: var(--warning-main);
  }

  .Vue-Toastification__toast--info & {
    background: var(--primary-main);
  }
}
</style>
