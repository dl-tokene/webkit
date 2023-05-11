<template>
  <slot
    :modal="{
      show: showModal,
      hide: hideModal,
      toggle: toggleModal,
    }"
  />
  <modal v-model:is-shown="isModalShown">
    <template #default>
      <div class="provider-selector-modal__modal-pane">
        <div class="provider-selector-modal__modal-header">
          <h3 v-if="title" class="provider-selector-modal__modal-title">
            {{ title }}
          </h3>
          <p v-if="subtitle" class="provider-selector-modal__modal-subtitle">
            {{ subtitle }}
          </p>
          <app-button
            class="provider-selector-modal__modal-close-button"
            scheme="none"
            size="small"
            modification="border-circle"
            :icon-right="ICON_NAMES.x"
            @click="hideModal"
          />
        </div>
        <div class="provider-selector-modal__modal-body">
          <provider-selector
            :provider-types="supportedProvidersInstances"
            @select="handleSelectDesignatedProvider"
          />
        </div>
      </div>
    </template>
  </modal>
</template>

<script lang="ts" setup>
import type { CHAIN_TYPES, PROVIDERS } from '@distributedlab/w3p'
import { ErrorHandler } from '@tokene/toolkit'
import { getSupportedProvidersInstances } from '@tokene/vue-web3-provider'
import { computed, ref } from 'vue'

import { AppButton, Modal, ProviderSelector } from '@/common'
import { ICON_NAMES } from '@/enums'

const props = withDefaults(
  defineProps<{
    chainType: CHAIN_TYPES
    title?: string
    subtitle?: string
    providerTypes: PROVIDERS[]
  }>(),
  {
    title: '',
    subtitle: '',
  },
)

const emit = defineEmits<{
  (event: 'selected', providerType: PROVIDERS): void
}>()

const isModalShown = ref(false)

const supportedProvidersInstances = computed<PROVIDERS[]>(() => {
  return getSupportedProvidersInstances(props.providerTypes, props.chainType)
})

const showModal = () => {
  isModalShown.value = true
}

const hideModal = () => {
  isModalShown.value = false
}

const toggleModal = () => {
  isModalShown.value ? hideModal() : showModal()
}

const handleSelectDesignatedProvider = async (providerType: PROVIDERS) => {
  try {
    emit('selected', providerType)
    hideModal()
  } catch (error) {
    ErrorHandler.process(error)
  }
}
</script>

<style lang="scss" scoped>
.provider-selector-modal__modal-pane {
  background: var(--background-primary-main);
  padding: toRem(24);
  width: clamp(#{toRem(300)}, 90vw, #{toRem(552)});
  border-radius: toRem(28);
}

.provider-selector-modal__modal-header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: toRem(6);
  margin-bottom: toRem(32);
  padding-right: toRem(48);
}

.provider-selector-modal__modal-title {
  font-size: toRem(28);
  line-height: 1.3;
}

.provider-selector-modal__modal-subtitle {
  font-size: toRem(14);
  line-height: 1.4;
  color: var(--text-secondary-main);
}

.provider-selector-modal__modal-close-button {
  margin-left: auto;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-#{calc(#{toRem(28)} * 1.3 / 2)});
}
</style>
