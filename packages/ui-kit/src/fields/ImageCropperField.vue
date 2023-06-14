<template>
  <div class="image-cropper-field">
    <file-field
      :key="+Boolean(localFile?.name)"
      :file-extensions="fileExtensions"
      :model-value="modelValue!"
      @update:model-value="handleUpdateLocalFile"
      :label="label!"
      :note="note!"
      :error-message="errorMessage!"
      v-bind="$attrs"
    />

    <basic-modal
      v-model:is-shown="isCropperModalShown"
      @update:is-shown="handleCropperModalToggle"
      :title="t('image-cropper-field.modal-title') ?? ''"
    >
      <div class="image-cropper-field__modal-pane">
        <cropper
          class="image-cropper-field__cropper"
          ref="cropperEl"
          :src="localFileSrc"
          :stencil-props="{
            aspectRatio: aspectRatio,
          }"
        />

        <div class="image-cropper-field__actions">
          <app-button
            class="image-cropper-field__actions-btn"
            size="large"
            scheme="flat"
            :text="t('image-cropper-field.cancel-cropping-btn') ?? ''"
            :icon-left="ICON_NAMES.arrowLeft"
            @click="cancelCropping"
          />
          <app-button
            class="image-cropper-field__actions-btn"
            size="large"
            :text="t('image-cropper-field.crop-btn') ?? ''"
            @click="cropImage"
          />
        </div>
      </div>
    </basic-modal>
  </div>
</template>

<script setup lang="ts">
import 'vue-advanced-cropper/dist/style.css'
import 'vue-advanced-cropper/dist/theme.compact.css'

import { i18next } from '@tokene/toolkit'
import { computed, ref } from 'vue'
import { Cropper, type CropperResult } from 'vue-advanced-cropper'

import { AppButton, BasicModal } from '@/common'
import { ICON_NAMES } from '@/enums'
import { FileField } from '@/fields'

type FileExtension = 'jpg' | 'png' | 'pdf' | 'jpeg'

const props = withDefaults(
  defineProps<{
    modelValue: File | undefined
    errorMessage?: string
    isDisabled?: string | boolean
    label?: string
    note?: string
    fileExtensions?: FileExtension[]
    maxSize?: number
    aspectRatio?: number
  }>(),
  {
    errorMessage: '',
    label: '',
    note: '',
    fileExtensions: () => ['jpg', 'png', 'pdf', 'jpeg'],
    maxSize: undefined,
    isDisabled: false,
    aspectRatio: 1,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | undefined): void
}>()

const cropperEl = ref<typeof Cropper>()

const isCropperModalShown = ref(false)

const localFile = ref<File>()

const { t } = i18next

const localFileSrc = computed(() =>
  localFile.value ? URL.createObjectURL(localFile.value as Blob) : undefined,
)

const cancelCropping = () => {
  isCropperModalShown.value = false
  handleCropperModalToggle(false)
}

const handleUpdateLocalFile = (value: File | undefined) => {
  if (value) {
    openCropEditor(value)
  } else {
    localFile.value = undefined
    emit('update:modelValue', undefined)
  }
}

const handleCropperModalToggle = (value: boolean) => {
  if (value) return

  localFile.value = props.modelValue!
}

const openCropEditor = (value: File | undefined) => {
  if (!value) {
    localFile.value = undefined

    return
  }

  localFile.value = value

  isCropperModalShown.value = true
}

const cropImage = () => {
  // FIXME
  if (!cropperEl.value) return

  const { canvas } = cropperEl.value?.getResult() as CropperResult

  canvas?.toBlob(blob => {
    const file = new File([blob!], localFile.value?.name ?? '', {
      type: localFile.value?.type,
    })

    localFile.value = file

    emit('update:modelValue', localFile.value)
    isCropperModalShown.value = false
  })
}
</script>

<style scoped lang="scss">
.image-cropper-field {
  &:global(.vue-simple-handler-wrapper) {
    width: toRem(36);
    height: toRem(36);
  }

  &:global(.vue-simple-handler) {
    border-color: var(--primary-main);
    opacity: 1;
    background: none;
    width: toRem(24);
    height: toRem(24);
  }

  /* stylelint-disable no-descending-specificity */

  &:global(.vue-handler-wrapper--north) {
    transform: translate(-50%, 0);
  }

  &:global(.vue-handler-wrapper--north .vue-simple-handler) {
    border-top: toRem(2) solid var(--primary-main);
  }

  &:global(.vue-handler-wrapper--east) {
    transform: translate(-100%, -50%);
  }

  &:global(.vue-handler-wrapper--east .vue-simple-handler) {
    border-right: toRem(2) solid var(--primary-main);
  }

  &:global(.vue-handler-wrapper--south) {
    transform: translate(-50%, -100%);
  }

  &:global(.vue-handler-wrapper--south .vue-simple-handler) {
    border-bottom: toRem(2) solid var(--primary-main);
  }

  &:global(.vue-handler-wrapper--west) {
    transform: translate(0, -50%);
  }

  &:global(.vue-handler-wrapper--west .vue-simple-handler) {
    border-left: toRem(2) solid var(--primary-main);
  }

  /* stylelint-enable */
}

.image-cropper-field__modal-pane {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.image-cropper-field__cropper {
  max-width: toRem(500);
  max-height: toRem(400);
}

.image-cropper-field__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: toRem(16);
  padding-top: toRem(32);
  margin-top: auto;
}

.image-cropper-field__actions-btn {
  width: 100%;
}
</style>
