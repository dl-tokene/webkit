<template>
  <div v-if="isShowPagination" class="pagination">
    <app-button
      class="pagination__item"
      scheme="default"
      type="button"
      :icon-right="ICON_NAMES.angleLeft"
      @click="handlePrevStep"
      :disabled="isPrevBtnDisabled"
    />
    <template v-if="type !== 'graph'">
      <button
        class="pagination__item"
        :class="{
          'pagination__item--active': currentPage === FIRST_PAGE_NUMBER,
        }"
        type="button"
        @click="handleSpecificPage(FIRST_PAGE_NUMBER)"
      >
        {{ FIRST_PAGE_NUMBER + 1 }}
      </button>
      <template v-if="isShowFirstDivider">
        <div class="pagination__divider" />
      </template>
      <button
        v-for="item in range"
        :key="item"
        class="pagination__item"
        :class="{ 'pagination__item--active': currentPage === item }"
        type="button"
        @click="handleSpecificPage(item)"
      >
        {{ item }}
      </button>
      <template v-if="isShowLastDivider">
        <div class="pagination__divider" />
      </template>
      <button
        class="pagination__item"
        :class="{ 'pagination__item--active': currentPage === totalPages }"
        type="button"
        @click="handleSpecificPage(totalPages)"
      >
        {{ totalPages }}
      </button>
    </template>
    <app-button
      class="pagination__item"
      scheme="default"
      type="button"
      :icon-right="ICON_NAMES.angleRight"
      @click="handleNextPage"
      :disabled="isNextBtnDisabled"
    />
  </div>
</template>

<script lang="ts" setup>
import type { JsonApiResponse } from '@distributedlab/jac'
import { WINDOW_BREAKPOINTS } from '@tokene/toolkit'
import { useWindowSize } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

import { AppButton } from '@/common'
import { ICON_NAMES } from '@/enums'

const FIRST_PAGE_NUMBER = 0

const ELEMENTS_OFFSET_LEFT = 2
const DEFAULT_ELEMENTS_TO_DISPLAY = 5

const props = withDefaults(
  defineProps<{
    type?: 'graph' | 'rest-api'
    pageLimit?: number
    list?: unknown[]
    fetchCb: (
      pageNumber: number,
      limit: number,
    ) => Promise<JsonApiResponse<unknown[]>> | Promise<void> | void
    totalItems?: number
  }>(),
  {
    type: 'graph',
    pageLimit: 15,
    list: () => [],
    totalItems: 0,
  },
)

const emit = defineEmits<{
  (e: 'update:list', value: unknown[]): void
}>()

const { width: windowWith } = useWindowSize()

const elementsToDisplay = computed(() => {
  return windowWith.value >= WINDOW_BREAKPOINTS.xSmall
    ? DEFAULT_ELEMENTS_TO_DISPLAY
    : DEFAULT_ELEMENTS_TO_DISPLAY - 3
})

const isLoaded = ref(false)

const totalItems = ref(props.totalItems)

const currentPage = ref(FIRST_PAGE_NUMBER)

const totalPages = computed(() => totalItems.value / props.pageLimit)

const isFirstPage = computed(() => currentPage.value === FIRST_PAGE_NUMBER)

const isLastPage = computed(() => currentPage.value === totalPages.value)

const range = computed<number[]>(() => {
  try {
    const supportedRange = Array.from(
      Array(totalPages.value - 2),
      (_, i) => i + 2,
    )

    const suggestedRangeFrom = currentPage.value - ELEMENTS_OFFSET_LEFT
    const rangeFrom = !supportedRange.includes(suggestedRangeFrom)
      ? supportedRange[0]
      : suggestedRangeFrom >
        supportedRange[supportedRange.length - elementsToDisplay.value]
      ? supportedRange[supportedRange.length - elementsToDisplay.value]
      : suggestedRangeFrom

    return supportedRange.slice(
      supportedRange.indexOf(rangeFrom),
      supportedRange.indexOf(rangeFrom + elementsToDisplay.value - 1) + 1,
    )
  } catch (error) {
    return []
  }
})

const isShowFirstDivider = computed(() => !range.value.includes(2))

const isShowLastDivider = computed(
  () => !range.value.includes(totalPages.value - 1),
)

watch(currentPage, () => {
  init()
})

const handleNextPage = () => {
  if (isNextBtnDisabled.value) return

  currentPage.value += 1
}

const handlePrevStep = () => {
  if (isFirstPage.value) return

  currentPage.value -= 1
}

const handleSpecificPage = (pageNumber: number) => {
  currentPage.value = pageNumber
}

const isPrevBtnDisabled = computed(() => isFirstPage.value)

const isNextBtnDisabled = computed(
  () =>
    (props.type !== 'graph' && isLastPage.value) ||
    props.list.length < props.pageLimit,
)

const isShowPagination = computed(
  () =>
    (isLoaded.value && props.type === 'graph') ||
    totalItems.value !== currentPage.value ||
    totalPages.value > 1,
)

const init = async () => {
  if (props.type === 'rest-api') {
    const response = await props.fetchCb(currentPage.value, props.pageLimit)

    if (!response) return

    totalItems.value = Number(response?.meta?.total_pages) * props.pageLimit

    currentPage.value = Number(response?.meta?.current_page)

    emit('update:list', response.data)
  } else if (props.type === 'graph') {
    await props.fetchCb(currentPage.value, props.pageLimit)
  }
  isLoaded.value = true
}

init()
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: toRem(8);
}

.pagination__item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: toRem(42);
  height: toRem(42);
  max-width: toRem(42);
  max-height: toRem(42);
  min-width: toRem(42);
  min-height: toRem(42);
  border-radius: 50%;
  font-size: toRem(14);
  line-height: 1.4;
  font-weight: 500;

  &--active {
    background: var(--primary-main);
    color: var(--text-primary-invert-main);
  }
}

.pagination__divider {
  &:after {
    content: '...';
  }
}
</style>
