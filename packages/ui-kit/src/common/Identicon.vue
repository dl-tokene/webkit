<template>
  <div ref="identiconImgWrpEl" class="identicon__img-wrp">
    <img class="identicon__img" :src="imgSrc" :alt="seed" />
  </div>
</template>

<script setup lang="ts">
import { identicon } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    seed: string
  }>(),
  {},
)

const identiconImgWrpEl = ref<HTMLDivElement>()
const imgSrc = ref('')

watch(
  () => props.seed,
  () => {
    init()
  },
)

const init = async () => {
  imgSrc.value = await createAvatar(identicon, {
    seed: props.seed,
    size: identiconImgWrpEl.value?.clientWidth || 40,
  }).toDataUri()
}

init()
</script>

<style scoped lang="scss">
.identicon__img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
}
</style>
