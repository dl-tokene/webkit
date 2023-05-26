<template>
  <modal
    v-model:is-shown="isModalShown"
    :key="String(isModalShown)"
    :is-close-by-click-outside="isCloseByClickOutside"
  >
    <template #default="{ modal }">
      <div class="basic-modal__pane" v-bind="$attrs">
        <div class="basic-modal__header">
          <div class="basic-modal__header-titles">
            <h5 v-if="title" class="basic-modal__title">
              {{ title }}
            </h5>
            <span v-if="subtitle" class="basic-modal__subtitle">
              {{ subtitle }}
            </span>
          </div>
          <app-button
            class="basic-modal__close-btn"
            scheme="none"
            :icon-right="ICON_NAMES.x"
            @click="modal.close"
          />
        </div>
        <slot />
      </div>
    </template>
  </modal>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

import { AppButton, Modal } from '@/common'
import { ICON_NAMES } from '@/enums'

const props = withDefaults(
  defineProps<{
    isShown: boolean
    isCloseByClickOutside?: boolean
    title?: string
    subtitle?: string
  }>(),
  {
    title: '',
    subtitle: '',
    isCloseByClickOutside: true,
  },
)

const emit = defineEmits<{
  (e: 'update:is-shown', v: boolean): void
}>()

const isModalShown = ref(false)

watch(
  () => props.isShown,
  value => {
    isModalShown.value = value
  },
)

watch(isModalShown, value => {
  emit('update:is-shown', value)
})
</script>

<style lang="scss" scoped>
.basic-modal__pane {
  background: var(--background-primary-light);
  padding: toRem(24);
  border-radius: toRem(28);
}

.basic-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: toRem(32);
}

.basic-modal__header-titles {
  display: flex;
  flex-direction: column;
  gap: toRem(8);
}

.basic-modal__title {
  font-size: toRem(28);
  line-height: 1.3;
  color: var(--text-primary-main);
}

.basic-modal__subtitle {
  font-size: toRem(14);
  line-height: 1.45;
  color: var(--text-secondary-main);
}

.basic-modal__close-btn {
  color: var(--primary-main);
}
</style>
