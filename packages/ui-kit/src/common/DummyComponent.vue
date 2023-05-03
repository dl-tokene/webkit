<template>
  <div class="dummy-component">
    {{ text }}
    {{ symbol }}
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'

export default {
  name: 'dummy-component',
  props: {
    text: {
      type: String as PropType<string>,
      required: true,
    },
    symbol: {
      type: String as PropType<string>,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss"></style>
