<script lang="ts" setup>
import { computed, useAttrs, useSlots } from 'vue'
import type { LocationAsRelativeRaw } from 'vue-router'

import { Icon } from '@/common/index'
import type { ICON_NAMES } from '@/enums'

const props = withDefaults(
  defineProps<{
    text?: string
    scheme?: 'filled' | 'flat' | 'default'
    modification?: 'border-circle' | 'border-rounded' | 'default'
    color?:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'error'
      | 'warning'
      | 'info'
      | 'default'
    size?: 'large' | 'medium' | 'small' | 'x-small' | 'default'
    route?: LocationAsRelativeRaw
    href?: string
    iconLeft?: ICON_NAMES
    iconRight?: ICON_NAMES
  }>(),
  {
    text: '',
    scheme: 'filled',
    modification: 'border-rounded',
    color: 'primary',
    size: 'medium',
    route: undefined,
    href: '',
    iconLeft: undefined,
    iconRight: undefined,
  },
)

const attrs = useAttrs()
const slots = useSlots()

const isDisabled = computed((): boolean =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)

const buttonClasses = computed(() =>
  [
    'app-button',
    `app-button--${props.scheme}`,
    `app-button--${props.modification}`,
    `app-button--${props.color}`,
    `app-button--${props.size}`,
    ...(isDisabled.value ? ['app-button--disabled'] : []),
    ...((props.iconLeft || props.iconRight) && !props.text && !slots.default
      ? ['app-button--icon-only']
      : []),
  ].join(' '),
)
</script>

<template>
  <template v-if="route">
    <router-link
      class="app-button"
      :class="buttonClasses"
      v-bind="$attrs"
      :to="route"
    >
      <icon v-if="iconLeft" class="app-button__icon-left" :name="iconLeft" />
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        <span v-if="text" class="app-button__text">
          {{ text }}
        </span>
      </template>
      <icon v-if="iconRight" class="app-button__icon-right" :name="iconRight" />
    </router-link>
  </template>
  <template v-else-if="href">
    <a class="app-button" :class="buttonClasses" v-bind="$attrs" :href="href">
      <icon v-if="iconLeft" class="app-button__icon-left" :name="iconLeft" />
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        <span v-if="text" class="app-button__text">
          {{ text }}
        </span>
      </template>
      <icon v-if="iconRight" class="app-button__icon-right" :name="iconRight" />
    </a>
  </template>
  <template v-else>
    <button
      class="app-button"
      :class="buttonClasses"
      v-bind="$attrs"
      :disabled="isDisabled"
      :type="$attrs.type || 'button'"
    >
      <icon v-if="iconLeft" class="app-button__icon-left" :name="iconLeft" />
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        <span v-if="text" class="app-button__text">
          {{ text }}
        </span>
      </template>
      <icon v-if="iconRight" class="app-button__icon-right" :name="iconRight" />
    </button>
  </template>
</template>

<style lang="scss" scoped>
.app-button {
  --button-transition-duration: 0.2s;
  --button-icon-size: 1.2em;

  outline: 0;
  font-family: var(--app-font-family);
  margin: 0;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  display: grid;
  width: min-content;
  grid: auto / auto-flow max-content;
  align-items: center;
  justify-content: center;
  transition: var(--button-transition-duration) ease-in;
  transition-property: background-color, color;
  text-decoration: none;
  border: var(--app-button-border);
  background-color: var(--app-button-bg);
  color: var(--app-button-text);

  &:disabled,
  &--disabled {
    cursor: not-allowed;
    pointer-events: none;
    filter: grayscale(0.75);
    opacity: 0.5;
  }

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    text-decoration: none;
    transition-timing-function: ease-out;
    color: var(--app-button-text-hover);
    background-color: var(--app-button-bg-hover);
    border-color: var(--app-button-border-hover);
    border: var(--app-button-border-hover);
  }

  &:not([disabled]):active {
    text-decoration: none;
    transition-timing-function: ease-out;
    background-color: var(--app-button-bg-active);
    border: var(--app-button-border-active);
  }

  &--filled {
    --app-button-filled-bg: var(--primary-main);
    --app-button-filled-bg-hover: var(--primary-dark);
    --app-button-filled-bg-active: var(--primary-dark);

    --app-button-filled-text: var(--text-primary-invert-main);
    --app-button-filled-text-hover: var(--text-primary-invert-main);

    --app-button-bg: var(--app-button-filled-bg);
    --app-button-bg-hover: var(--app-button-filled-bg-hover);
    --app-button-bg-active: var(--app-button-filled-bg-active);

    --app-button-text: var(--app-button-filled-text);
    --app-button-text-hover: var(--app-button-filled-text-hover);

    --app-button-border: 0;
    --app-button-border-hover: 0;
    --app-button-border-active: 0;
  }

  &--flat {
    --app-button-flat-text: var(--primary-main);
    --app-button-flat-text-hover: var(--primary-main);

    --app-button-flat-border: #{toRem(1)} solid var(--secondary-main);
    --app-button-flat-border-hover: var(--app-button-flat-border);
    --app-button-flat-border-active: var(--app-button-flat-border);

    --app-button-bg: transparent;
    --app-button-bg-hover: var(--background-primary-dark);
    --app-button-bg-active: var(--background-secondary-main);

    --app-button-text: var(--app-button-flat-text);
    --app-button-text-hover: var(--app-button-flat-text-hover);

    --app-button-border: var(--app-button-flat-border);
    --app-button-border-hover: var(--app-button-flat-border-hover);
    --app-button-border-active: var(--app-button-flat-border-active);
  }

  &--success {
    --app-button-flat-text: var(--success-light);
    --app-button-flat-text-hover: var(--success-main);
    --app-button-flat-border: #{toRem(1)} solid var(--success-light);
    --app-button-flat-border-hover: #{toRem(1)} solid var(--success-main);
    --app-button-flat-border-active: #{toRem(1)} solid var(--success-main);
    --app-button-filled-text: var(--text-primary-main);
    --app-button-filled-text-hover: var(--text-primary-main);

    --app-button-filled-bg: var(--success-light);
    --app-button-filled-bg-hover: var(--success-main);
    --app-button-filled-bg-active: var(--success-main);
  }

  &--error {
    --app-button-flat-text: var(--error-light);
    --app-button-flat-text-hover: var(--error-main);
    --app-button-flat-border: #{toRem(1)} solid var(--error-light);
    --app-button-flat-border-hover: #{toRem(1)} solid var(--error-main);
    --app-button-flat-border-active: #{toRem(1)} solid var(--error-main);
    --app-button-filled-text: var(--text-primary-main);
    --app-button-filled-text-hover: var(--text-primary-main);

    --app-button-filled-bg: var(--error-light);
    --app-button-filled-bg-hover: var(--error-main);
    --app-button-filled-bg-active: var(--error-main);
  }

  &--warning {
    --app-button-flat-text: var(--warning-main);
    --app-button-flat-text-hover: var(--warning-dark);
    --app-button-flat-border: #{toRem(1)} solid var(--warning-dark);
    --app-button-flat-border-hover: #{toRem(1)} solid var(--warning-dark);
    --app-button-flat-border-active: #{toRem(1)} solid var(--warning-dark);

    --app-button-filled-bg: var(--warning-main);
    --app-button-filled-bg-hover: var(--warning-dark);
    --app-button-filled-bg-active: var(--warning-dark);
  }

  &--info {
    --app-button-flat-text: var(--info-main);
    --app-button-flat-text-hover: var(--info-dark);
    --app-button-flat-border: #{toRem(1)} solid var(--info-main);
    --app-button-flat-border-hover: #{toRem(1)} solid var(--info-dark);
    --app-button-flat-border-active: #{toRem(1)} solid var(--info-dark);

    --app-button-filled-bg: var(--info-main);
    --app-button-filled-bg-hover: var(--info-dark);
    --app-button-filled-bg-active: var(--info-dark);
  }

  &--border-circle {
    border-radius: toRem(100);
  }

  &--border-rounded {
    border-radius: toRem(4);
  }

  &--default {
    --app-button-bg-hover: var(--background-secondary-main);
    --app-button-bg-active: var(--background-secondary-dark);
    --app-button-text: var(--primary-main);
    --app-button-text-hover: var(--primary-main);
  }

  &--large {
    --button-icon-size: #{toRem(18)};

    padding: toRem(18) toRem(36);
    grid-gap: toRem(8);
    font-size: toRem(14);
    line-height: 1.45;
    font-weight: 500;
    height: toRem(56);

    &.app-button--icon-only {
      --button-icon-size: #{toRem(20)};

      padding: toRem(18);
      height: auto;
    }
  }

  &--medium {
    --button-icon-size: #{toRem(16)};

    padding: toRem(12) toRem(24);
    font-size: toRem(12);
    line-height: 1.3;
    font-weight: 500;
    grid-gap: toRem(8);
    height: toRem(40);

    &.app-button--icon-only {
      --button-icon-size: #{toRem(20)};

      padding: toRem(12);
      height: auto;
    }
  }

  &--small {
    --button-icon-size: #{toRem(14)};

    padding: toRem(8) toRem(16);
    font-size: toRem(12);
    line-height: 1.45;
    font-weight: 500;
    grid-gap: toRem(8);
    height: toRem(32);

    &.app-button--icon-only {
      --button-icon-size: #{toRem(20)};

      padding: toRem(8);
      height: auto;
    }
  }
}

.app-button__icon-left,
.app-button__icon-right {
  height: var(--button-icon-size);
  width: var(--button-icon-size);
}

.app-button__text {
  color: inherit;
  font: inherit;
  pointer-events: none;
  word-break: break-all;
  min-width: 0;

  @include text-ellipsis;
}
</style>
