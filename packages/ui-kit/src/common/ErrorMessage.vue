<template>
  <div class="error-message">
    <img class="error-message__img" :src="imageUrl()" alt="" />
    <h3 v-if="title" class="error-message__title">
      {{ title }}
    </h3>
    <p class="error-message__message">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import errorLargeImage from '@/assets/images/error-large-image.svg?url'
import errorSmallImage from '@/assets/images/error-small-image.svg?url'

const props = withDefaults(
  defineProps<{
    title?: string
    message?: string
    schema?: 'large' | 'small'
    customImageUrl?: string
  }>(),
  {
    title: '',
    message: '',
    schema: 'large',
    customImageUrl: '',
  },
)

const imageUrl = computed(() =>
  props.customImageUrl
    ? () => props.customImageUrl
    : {
        large: () => errorLargeImage,
        small: () => errorSmallImage,
      }[props.schema],
)
</script>

<style lang="scss" scoped>
.error-message {
  display: grid;
  place-items: center;
  text-align: center;
  grid-gap: toRem(12);
}

.error-message__img {
  width: 100%;
  height: auto;
}

.error-message__title {
  font-size: toRem(24);
}

.error-message__message {
  font-size: toRem(18);
}
</style>
