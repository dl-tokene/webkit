<template>
  <button class="copy-btn" @click="handleCopy">
    <slot />
    <icon
      class="copy-btn__icon"
      :name="isCopied ? ICON_NAMES.check : ICON_NAMES.copyFilled"
    />
  </button>
</template>

<script lang="ts" setup>
import { copyToClipboard, sleep } from '@tokene/toolkit'
import { ref } from 'vue'

import { Icon } from '@/common'
import { ICON_NAMES } from '@/enums'

const props = defineProps<{ value: string | number }>()

const isCopied = ref(false)

const handleCopy = async () => {
  await copyToClipboard(String(props.value))
  isCopied.value = true
  await sleep(1000)
  isCopied.value = false
}
</script>

<style lang="scss" scoped>
.copy-btn {
  display: flex;
  align-items: center;
  gap: toRem(8);
  font: inherit;
  color: inherit;
  border: none;
  background: none;
}

.copy-btn__icon {
  width: 1.2em;
  height: 1.2em;
}
</style>
