<template>
  <div class="user-badge">
    <div class="user-badge__img-wrp">
      <template v-if="imgUrl">
        <img class="user-badge__img" :src="imgUrl" :alt="fullName || address" />
      </template>
      <template v-else-if="address">
        <identicon class="user-badge__img" :seed="address.toLowerCase()" />
      </template>
    </div>
    <template v-if="!isImgOnly">
      <div class="user-badge__details">
        <span v-if="fullName" class="user-badge__full-name">
          {{ fullName }}
        </span>
        <span v-else-if="address" class="user-badge__address">
          {{ isShowFullAddress ? address : abbrCenter(address, 4) }}
        </span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { abbrCenter } from '@tokene/toolkit'
import { computed } from 'vue'

import { Identicon } from '@/common'

const props = withDefaults(
  defineProps<{
    imgUrl?: string
    address?: string
    firstName?: string
    lastName?: string
    isImgOnly?: boolean
    isShowFullAddress?: boolean
  }>(),
  {
    imgUrl: '',
    address: '',
    firstName: '',
    lastName: '',
    isImgOnly: false,
    isShowFullAddress: false,
  },
)

const fullName = computed(() =>
  props.firstName && props.lastName
    ? `${props.firstName} ${props.lastName}`
    : '',
)
</script>

<style lang="scss" scoped>
.user-badge {
  display: flex;
  align-items: center;
  gap: toRem(16);
}

.user-badge__img-wrp {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: toRem(40);
  height: toRem(40);
  max-width: toRem(40);
  max-height: toRem(40);
  min-width: toRem(40);
  min-height: toRem(40);
  border-radius: 50%;
  background: var(--background-secondary-main);
}

.user-badge__img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
}

.user-badge__details {
  display: flex;
  flex-direction: column;
}

.user-badge__full-name,
.user-badge__address {
  font-size: toRem(16);
  line-height: 1.5;
  font-weight: 500;
  letter-spacing: toRem(0.1);
  color: var(--text-primary-main);
}
</style>
