<template>
  <div ref="progressBarEl" class="progress-bar" />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  value: number
}>()

const progressBarEl = ref<HTMLElement>()

watch(
  () => props.value,
  val => {
    if (!progressBarEl.value) return

    progressBarEl.value?.style.setProperty(
      '--progress-bar-progress-value',
      `${val}%`,
    )
  },
  {
    immediate: true,
  },
)

onMounted(() => {
  if (!progressBarEl.value) return

  progressBarEl.value?.style.setProperty(
    '--progress-bar-progress-value',
    `${props.value}%`,
  )
})
</script>

<style lang="scss" scoped>
.progress-bar {
  --progressbar-track: var(--primary-light);
  --progressbar-thumb: var(--success-main);

  overflow: hidden;
  position: relative;
  width: 100%;
  height: toRem(8);
  background: var(--progressbar-track);

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: var(--progress-bar-progress-value);
    background: var(--progressbar-thumb);
    transition: width 0.25s ease-in-out;
  }
}
</style>
