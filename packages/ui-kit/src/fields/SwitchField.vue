<template>
  <label
    class="checkbox-field"
    :class="{
      'checkbox-field--disabled': disabled,
      'checkbox-field--checked': modelValue,
    }"
  >
    <input
      v-bind="$attrs"
      class="checkbox-field__input"
      type="checkbox"
      :checked="modelValue"
      :name="($attrs.name as string) || label"
      :value="value"
      :disabled="disabled"
      @change="onChange"
    />

    <span class="checkbox-field__frame-wrp" aria-hidden="true">
      <span
        class="checkbox-field__frame"
        :class="{ 'checkbox-field__frame--checked': modelValue }"
      />
    </span>

    <span v-if="label" class="checkbox-field__label">
      {{ label }}
    </span>
  </label>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    modelValue: boolean
    value?: string | number
    label?: string
    disabled?: boolean
  }>(),
  {
    value: '',
    label: '',
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'update:model-value', value: boolean): void
}>()

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  emit('update:model-value', target.checked)
}
</script>

<style lang="scss" scoped>
.checkbox-field {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: toRem(12);
  position: relative;

  &--disabled {
    cursor: not-allowed;
    filter: grayscale(50);
    opacity: 0.5;
  }
}

.checkbox-field__input {
  position: absolute;
  width: toRem(1);
  height: toRem(1);
  margin: calc(#{toRem(1)} * -1);
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}

.checkbox-field__frame-wrp {
  position: relative;
  overflow: hidden;
  width: toRem(48);
  height: toRem(24);
  transition: var(--field-transition-duration) ease-in;
  transition-property: border-color, box-shadow, background-color;
  border-radius: toRem(50);
  box-shadow: inset 0 0 0 toRem(1) var(--field-border);

  .checkbox-field--checked & {
    background-color: var(--primary-main);
  }
}

.checkbox-field__frame {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: toRem(calc((24 - 16) / 2));
  transform: translateY(-50%);
  width: clamp(#{toRem(16)}, #{toRem(16)}, #{toRem(16)});
  height: clamp(#{toRem(16)}, #{toRem(16)}, #{toRem(16)});
  min-width: clamp(#{toRem(16)}, #{toRem(16)}, #{toRem(16)});
  min-height: clamp(#{toRem(16)}, #{toRem(16)}, #{toRem(16)});
  border-radius: 50%;
  background: var(--primary-light);
  transition: left var(--field-transition-duration) ease-in-out;

  .checkbox-field--checked & {
    left: calc(100% - #{toRem(16 + calc((24 - 16) / 2))});
  }
}

.checkbox-field__label {
  display: inline-flex;
  user-select: none;

  @include field-text;
}
</style>
