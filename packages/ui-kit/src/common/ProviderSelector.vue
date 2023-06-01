<template>
  <div class="provider-selector">
    <app-button
      class="provider-selector__item"
      scheme="flat"
      size="large"
      v-for="item in providerTypes"
      :key="item"
      :icon-left="getIconForCurrentDesignatedProvider(item)"
      :text="item"
      @click="selectDesignatedProvider(item)"
    />
  </div>
</template>

<script lang="ts" setup>
import { PROVIDERS } from '@distributedlab/w3p'
import get from 'lodash/get'

import { AppButton } from '@/common'
import { ICON_NAMES } from '@/enums'

defineProps<{
  providerTypes: PROVIDERS[]
}>()

const emit = defineEmits<{
  (event: 'select', providerType: PROVIDERS): void
}>()

const selectDesignatedProvider = (providerType: PROVIDERS) => {
  emit('select', providerType)
}

const getIconForCurrentDesignatedProvider = (providerType: PROVIDERS) => {
  const designatedProvidersToIconsMap = {
    [PROVIDERS.Metamask]: ICON_NAMES.metamaskHeadRight,
    [PROVIDERS.Coinbase]: ICON_NAMES.coinbase,
    ['tokene']: ICON_NAMES.tokene,
  }

  return get(
    designatedProvidersToIconsMap,
    providerType,
    ICON_NAMES.personOutline,
  ) as ICON_NAMES
}
</script>

<style lang="scss" scoped>
.provider-selector {
  display: flex;
  flex-direction: column;
  gap: toRem(24);
}

.provider-selector__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
