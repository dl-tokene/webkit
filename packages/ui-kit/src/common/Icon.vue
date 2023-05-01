<template>
  <svg class="icon" aria-hidden="true">
    <use :href="`#${name}-icon`" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import type { ICON_NAMES } from '@/enums'

export default defineComponent({
  name: 'icon',
  props: {
    name: {
      type: String as PropType<ICON_NAMES>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.icon {
  display: grid;
  place-items: center;
  pointer-events: none;
  max-width: 100%;
  max-height: 100%;
}
</style>
