<template>
  <div class="no-data-message">
    <img class="no-data-message__img" :src="imageUrl" alt="" />
    <span v-if="message" class="no-data-message__message">
      {{ message }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    message?: string
    customImageUrl?: string
  }>(),
  { message: '', customImageUrl: '' },
)

const imageUrl = computed(
  () => props.customImageUrl || '/images/empty-image.svg',
)
</script>

<style lang="scss" scoped>
.no-data-message {
  display: grid;
  place-items: center;
  text-align: center;
  grid-gap: toRem(12);
}

.no-data-message__img {
  width: 100%;
  height: auto;
}

.no-data-message__message {
  font-size: toRem(18);
}
</style>
