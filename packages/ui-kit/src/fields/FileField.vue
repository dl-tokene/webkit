<template>
  <div :class="classes">
    <div class="file-field__container">
      <template v-if="modelValue?.name">
        <div class="file-field__file-info">
          <template v-if="isImage">
            <img
              class="file-field__image-preview"
              :src="fileUrl"
              :alt="modelValue.name"
            />
          </template>
          <div class="file-field__file-info__general">
            <p class="file-field__file-name">
              {{ modelValue?.name }}
            </p>
            <p class="file-field__file-size">
              {{ formatBytes(modelValue?.size) }}
            </p>
          </div>
          <template v-if="mode === 'edit'">
            <app-button
              v-if="!disabled"
              class="file-field__reset-btn"
              scheme="none"
              size="none"
              :icon-right="ICON_NAMES.trashCan"
              @click="emit('update:modelValue', undefined)"
            />
          </template>
          <template v-else-if="mode === 'view'">
            <app-button
              class="file-field__reset-btn"
              scheme="none"
              size="none"
              :icon-right="ICON_NAMES.download"
              @click="openDocument"
            />
          </template>
        </div>
      </template>
      <template v-else>
        <button
          type="button"
          class="file-field__open-btn"
          @click="openfileDialog"
        >
          <span ref="dropZoneRef" class="file-field__drop-zone" />

          <span class="file-field__label">
            {{ label }}
          </span>
          <span v-if="note" class="file-field__note">
            {{ note }}
          </span>
        </button>
      </template>
    </div>

    <transition
      name="file-field__err-msg-transition"
      @enter="setHeightCSSVar"
      @before-leave="setHeightCSSVar"
    >
      <span v-if="errorMessage" class="file-field__err-msg">
        {{ errorMessage }}
      </span>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ErrorHandler, i18next } from '@tokene/toolkit'
import { useDropZone, useFileDialog } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

import { AppButton } from '@/common'
import { ICON_NAMES } from '@/enums'

function formatBytes(bytes: number, decimals = 2): string {
  if (!bytes) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`
}

type FileExtension = 'jpg' | 'png' | 'pdf' | 'jpeg'

const props = withDefaults(
  defineProps<{
    modelValue?: File | undefined
    errorMessage?: string
    disabled?: boolean | string
    label?: string
    note?: string
    fileExtensions?: FileExtension[]
    maxSize?: number // MB
    mode?: 'view' | 'edit'
  }>(),
  {
    modelValue: undefined,
    errorMessage: '',
    disabled: false,
    label: '',
    note: '',
    maxSize: 2,
    fileExtensions: () => ['jpg', 'png', 'jpeg'],
    mode: 'edit',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | undefined): void
  (e: 'error-message', value: string): void
}>()

const { t } = i18next

const dropZoneRef = ref<HTMLDivElement | null>(null)

const imageExtensions = computed(() => {
  const imageExtMap = ['jpg', 'png', 'jpeg']
  return props.fileExtensions
    .filter(el => imageExtMap.includes(el))
    .map(el => '.' + el)
})

const applicationExtensions = computed(() => {
  const imageExtMap = ['pdf']
  return props.fileExtensions
    .filter(el => imageExtMap.includes(el))
    .map(el => '.' + el)
})

useDropZone(dropZoneRef, onDrop)

const { open, files } = useFileDialog({
  accept: [...imageExtensions.value, ...applicationExtensions.value].join(','),
  multiple: false,
})

const maxSizeBytes = computed(() => props.maxSize * 1024 * 1024)

const classes = computed(() =>
  [
    'file-field',
    ...(props.disabled ? ['file-field--disabled'] : []),
    ...(props.errorMessage ? ['file-field--error'] : []),
  ].join(' '),
)

const isImage = computed(() => {
  if (!props.modelValue) return false

  return props.modelValue?.type.includes('image')
})

const fileUrl = computed(() => {
  if (!props.modelValue) return ''

  return URL.createObjectURL(props.modelValue)
})

const getFileExtension = (file: File): string => {
  return file.name.split('.').pop()?.toUpperCase() || ''
}

const isValidFileType = (file: File) => {
  return Boolean(
    props.fileExtensions.find(
      item => item.toUpperCase() === getFileExtension(file),
    ),
  )
}

const onChange = (file: File) => {
  if (!isValidFileType(file)) {
    const acceptedExtensions = props.fileExtensions
      .map(item => `.${item.toUpperCase()}`)
      .join(', ')

    emit(
      'error-message',
      t('file-field.incorrect-file-type-err', {
        allowedTypes: acceptedExtensions,
        type: `.${getFileExtension(file)}`,
      }) as string,
    )
    return
  }

  if (file.size > maxSizeBytes.value) {
    emit(
      'error-message',
      t('file-field.max-size-exceeded-err', {
        maxSize: props.maxSize,
      }) as string,
    )
    return
  }

  emit('update:modelValue', file)
}

function onDrop(files: File[] | null) {
  if (!files?.length) return
  onChange(files[0])
}

watch(files, val => {
  if (!val || !val.length) return

  handleOpen()
})

const handleOpen = async () => {
  try {
    if (!files.value?.[0]) return

    onChange(files.value![0])
  } catch (e) {
    ErrorHandler.processWithoutFeedback(e)
  }
}

const setHeightCSSVar = (element: Element) => {
  ;(element as HTMLElement).style.setProperty(
    '--field-error-msg-height',
    `${element.scrollHeight}px`,
  )
}

const openDocument = () => {
  if (!props.modelValue) return

  window.open(URL.createObjectURL(props.modelValue), '_blank')
}

const openfileDialog = () => {
  open()
}
</script>

<style lang="scss" scoped>
.file-field {
  position: relative;
  width: 100%;

  &--disabled {
    pointer-events: none;
  }
}

.file-field__container {
  background: var(--background-tertiary);

  .file-field--error & {
    border-color: var(--field-error);
  }
}

.file-field__open-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: toRem(1) dashed var(--field-border);
  padding: toRem(16);
  border-radius: toRem(4);
}

.file-field__drop-zone {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.file-field__upload-icon {
  color: var(--field-label);
  width: toRem(41);
  height: toRem(41);

  .file-field--error & {
    color: var(--field-error);
  }
}

.file-field__file-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: toRem(16);
  line-height: 1.5;
  font-weight: 500;
  max-width: toRem(200);
  letter-spacing: toRem(0.15);
  color: var(--text-primary-main);

  @include respond-to(xsmall) {
    max-width: toRem(100);
  }
}

.file-field__file-size {
  margin-top: toRem(5);
  font-size: toRem(14);
  line-height: 1;
  color: var(--text-secondary-main);
}

.file-field__label {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--primary-main);
  font-size: toRem(16);
  font-weight: 400;

  .file-field--error & {
    color: var(--field-error);
  }
}

.file-field__note {
  color: var(--field-label);
  font-size: toRem(14);
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;

  .file-field--error & {
    color: var(--field-error);
  }
}

.file-field__file-info {
  display: flex;
  position: relative;
  box-shadow: 0 toRem(1) toRem(2) rgba(0, 0, 0, 0.3),
    0 toRem(1) toRem(3) toRem(1) rgba(0, 0, 0, 0.15);
  padding: toRem(8) toRem(16);
  border-radius: toRem(4);
  background: var(--background-primary-dark);
}

.file-field__image-preview {
  object-fit: cover;
  object-position: center;
  width: toRem(56);
  height: toRem(56);
  border-radius: toRem(4);
  margin-right: toRem(16);
}

.file-field__file-info__general {
  display: flex;
  flex-direction: column;
}

.file-field__reset-btn {
  align-self: center;
  margin-left: auto;
  padding: toRem(8);
  color: var(--text-primary-main);
}

.file-field__err-msg {
  @include field-error;
}

.file-field__err-msg-transition-enter-active {
  animation: fade-down var(--field-transition-duration);
}

.file-field__err-msg-transition-leave-active {
  animation: fade-down var(--field-transition-duration) reverse;
}

@keyframes fade-down {
  from {
    height: 0;
  }

  to {
    height: var(--field-error-msg-height);
  }
}
</style>
