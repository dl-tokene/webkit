<template>
  <div v-if="isShowPagination" class="pagination">
    <app-button
      class="pagination__item pagination__item--arrow"
      scheme="none"
      type="button"
      size="none"
      :icon-right="ICON_NAMES.triangleLeft"
      @click="handleFetchPrev"
      :disabled="isPrevBtnDisabled"
    />

    <template v-if="totalPages">
      <button
        v-if="isShowFirstPageBtn"
        type="button"
        :class="[
          'pagination__item',
          {
            'pagination__item--active': currentPage === FIRST_PAGE_NUMBER,
          },
        ]"
        @click="handleFetchPage(FIRST_PAGE_NUMBER)"
      >
        {{ FIRST_PAGE_NUMBER }}
      </button>

      <div v-if="isShowFirstDivider" class="pagination__divider" />

      <button
        v-for="item in pagesRange"
        :key="item"
        type="button"
        :class="[
          'pagination__item',
          { 'pagination__item--active': currentPage === item },
        ]"
        @click="handleFetchPage(item)"
      >
        {{ item }}
      </button>

      <div v-if="isShowLastDivider" class="pagination__divider" />

      <button
        v-if="isShowLastPageBtn"
        type="button"
        :class="[
          'pagination__item',
          { 'pagination__item--active': currentPage === totalPages },
        ]"
        @click="handleFetchPage(totalPages)"
      >
        {{ totalPages }}
      </button>
    </template>

    <app-button
      class="pagination__item pagination__item--arrow"
      scheme="none"
      size="none"
      type="button"
      :icon-right="ICON_NAMES.triangleRight"
      @click="handleFetchNext"
      :disabled="isNextBtnDisabled"
    />
  </div>
</template>

<script lang="ts" setup>
import { WINDOW_BREAKPOINTS } from '@tokene/toolkit'
import { useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'

import { AppButton } from '@/common'
import { ICON_NAMES } from '@/enums'

const FIRST_PAGE_NUMBER = 1
const DEFAULT_ELEMENTS_TO_DISPLAY = 5
const MOBILE_ELEMENTS_TO_DISPLAY = 3

const props = withDefaults(
  defineProps<{
    pageLimit?: number
    list?: unknown[]
    totalPages?: number

    fetchCb: () => Promise<void>
    fetchNextCb: () => Promise<void>
    fetchPrevCb: () => Promise<void>
    fetchPageCb?: (page: number) => Promise<void>
  }>(),
  {
    pageLimit: 15,
    list: () => [],
    totalPages: undefined,

    fetchPageCb: undefined,
  },
)

const { width: windowWidth } = useWindowSize()

const isLoaded = ref(false)

const currentPage = ref(FIRST_PAGE_NUMBER)

const isFirstPage = computed(() => currentPage.value === FIRST_PAGE_NUMBER)

const isNextBtnDisabled = ref(false)

const isPrevBtnDisabled = computed(() => {
  return isFirstPage.value
})

const isShowPagination = computed(
  () => !isPrevBtnDisabled.value || !isNextBtnDisabled.value,
)

/** If totalPages provided */

const elementsToDisplay = computed(() => {
  return windowWidth.value > WINDOW_BREAKPOINTS.xSmall
    ? DEFAULT_ELEMENTS_TO_DISPLAY
    : MOBILE_ELEMENTS_TO_DISPLAY
})

const pagesRange = computed(() => {
  if (!props.totalPages) return []

  const elementsLeft = Math.trunc(elementsToDisplay.value / 2)
  const elementsRight = Math.trunc(elementsToDisplay.value / 2)

  let proposedStartPage = currentPage.value - elementsLeft
  let proposedEndPage = currentPage.value + elementsRight

  if (proposedStartPage <= FIRST_PAGE_NUMBER) {
    proposedStartPage = FIRST_PAGE_NUMBER
  }

  if (proposedEndPage >= +props.totalPages) {
    proposedEndPage = +props.totalPages
  }

  return Array(proposedEndPage - proposedStartPage + 1)
    .fill(0)
    .map((_, index) => index + proposedStartPage)
})

const isShowFirstPageBtn = computed(() => {
  if (!pagesRange.value.length) return false

  return pagesRange.value[0] > FIRST_PAGE_NUMBER
})

const isShowFirstDivider = computed(() => {
  if (!pagesRange.value.length) return false

  return pagesRange.value[0] > FIRST_PAGE_NUMBER + 1
})

const isShowLastPageBtn = computed(() => {
  if (!pagesRange.value.length || !props.totalPages) return false

  return pagesRange.value[pagesRange.value.length - 1] < +props.totalPages
})

const isShowLastDivider = computed(() => {
  if (!pagesRange.value.length || !props.totalPages) return false

  return pagesRange.value[pagesRange.value.length - 1] < +props.totalPages - 1
})

const init = async () => {
  await props.fetchCb()

  if (props.list.length < props.pageLimit) {
    isNextBtnDisabled.value = true
  }

  isLoaded.value = true
}

const handleFetchPrev = async () => {
  if (isPrevBtnDisabled.value) return

  currentPage.value -= 1

  await props.fetchPrevCb()

  isNextBtnDisabled.value = false
}

const handleFetchNext = async () => {
  if (isNextBtnDisabled.value) return

  currentPage.value += 1

  await props.fetchNextCb()

  if (props.list.length < props.pageLimit) {
    isNextBtnDisabled.value = true
  }

  if (props.list.length === 0) {
    await props.fetchPrevCb()

    isNextBtnDisabled.value = true

    currentPage.value -= 1
  }
}

const handleFetchPage = async (page: number) => {
  if (page === currentPage.value) return

  currentPage.value = page

  await props.fetchPageCb?.(page)
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
  border-radius: 50%;
  font-size: toRem(14);
  line-height: 1.4;
  font-weight: 500;

  @include square-static-size(#{toRem(36)});

  &--active {
    background: var(--primary-main);
    color: var(--text-primary-invert-main);
  }

  &--arrow {
    --button-icon-size: #{toRem(18)};

    color: var(--primary-main);
  }

  @include respond-to(xsmall) {
    font-size: toRem(8);
  }
}

.pagination__divider {
  &:after {
    content: '...';
  }
}
</style>
