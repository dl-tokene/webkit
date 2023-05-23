<template>
  <div :class="chipClasses">
    <template v-if="$slots.leading">
      <slot name="leading" />
    </template>
    <template v-else>
      <button
        type="button"
        v-if="leadingIcon"
        class="chip__left-icon-btn"
        @click.stop="handleLeftBtnClick"
        :disabled="isDisabled"
      >
        <icon class="chip__left-icon" :name="leadingIcon" />
      </button>
    </template>
    <span class="chip__label">
      {{ label }}
    </span>
    <template v-if="$slots.trailing">
      <slot name="trailing" />
    </template>
    <template v-else>
      <button
        type="button"
        v-if="trailingIcon"
        class="chip__right-icon-btn"
        @click.stop="handleRightBtnClick"
        :disabled="isDisabled"
      >
        <icon class="chip__right-icon" :name="trailingIcon" />
      </button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { Icon } from '@/common'
import type { ICON_NAMES } from '@/enums'

const props = withDefaults(
  defineProps<{
    scheme?: 'filled' | 'outlined'
    leadingIcon?: ICON_NAMES
    label: string
    trailingIcon?: ICON_NAMES
    isDisabled?: boolean
  }>(),
  {
    scheme: 'filled',
    leadingIcon: undefined,
    trailingIcon: undefined,
    isDisabled: false,
  },
)

const emit = defineEmits<{
  (e: 'leading-button-click'): void
  (e: 'trailing-button-click'): void
}>()

const chipClasses = computed(() => ({
  ['chip']: true,
  [`chip--${props.scheme}`]: true,
  'chip--disabled': props.isDisabled,
}))

const handleLeftBtnClick = () => {
  emit('leading-button-click')
}

const handleRightBtnClick = () => {
  emit('trailing-button-click')
}
</script>

<style lang="scss" scoped>
.chip {
  display: flex;
  align-items: center;
  gap: toRem(8);
  padding: toRem(6) toRem(12);
  border-radius: toRem(8);
  transition: all 0.25s ease-in-out;
  max-width: 100%;

  &--filled {
    background: var(--background-secondary-light);

    &:hover {
      background: var(--background-secondary-light);
    }

    &:focus {
      background: var(--background-secondary-dark);
    }
  }

  &--outlined {
    border: toRem(1) solid var(--border-primary-main);

    &:hover {
      background: var(--background-primary-dark);
      box-shadow: 0 toRem(1) toRem(2) rgba(0, 0, 0, 0.3),
        0 toRem(1) toRem(3) toRem(1) rgba(0, 0, 0, 0.15);
    }

    &:focus {
      background: var(--background-secondary-main);
    }
  }

  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}

.chip__left-icon {
  width: toRem(18);
  height: toRem(18);
  min-width: toRem(18);
  min-height: toRem(18);
  max-width: toRem(18);
  max-height: toRem(18);
  color: var(--text-primary-light);
}

.chip__label {
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  font-size: toRem(14);
  line-height: 1.3;
  font-weight: 500;
  color: var(--text-primary-light);
  letter-spacing: toRem(0.1);
  flex: 1;

  @include respond-to(xsmall) {
    word-break: break-all;
    font-size: toRem(12);
  }
}

.chip__right-icon-btn {
  margin-left: auto;
}

.chip__right-icon {
  margin-left: auto;
  color: var(--text-primary-main);
  width: toRem(18);
  height: toRem(18);
  min-width: toRem(18);
  min-height: toRem(18);
  max-width: toRem(18);
  max-height: toRem(18);
}
</style>
