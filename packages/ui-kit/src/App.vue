<template>
  <div class="app">
    <div class="app__buttons">
      <app-button size="small" :text="'button'" />
      <app-button size="small" :text="'button'" scheme="flat" />
      <app-button size="small" :text="'button'" scheme="none" />

      <app-button size="small" :text="'button'" color="success" />
      <app-button size="small" :text="'button'" scheme="flat" color="success" />
      <app-button size="small" :text="'button'" scheme="none" color="success" />

      <app-button size="small" :text="'button'" color="error" />
      <app-button size="small" :text="'button'" scheme="flat" color="error" />
      <app-button size="small" :text="'button'" scheme="none" color="error" />

      <app-button size="small" :text="'button'" color="warning" />
      <app-button size="small" :text="'button'" scheme="flat" color="warning" />
      <app-button size="small" :text="'button'" scheme="none" color="warning" />

      <app-button size="small" :text="'button'" color="warning" />
      <app-button size="small" :text="'button'" scheme="flat" color="warning" />
      <app-button size="small" :text="'button'" scheme="none" color="warning" />

      <app-button size="small" :text="'button'" color="info" />
      <app-button size="small" :text="'button'" scheme="flat" color="info" />
      <app-button size="small" :text="'button'" scheme="none" color="info" />
    </div>
    <div class="app__buttons">
      <app-button :text="'button'" />
      <app-button :text="'button'" scheme="flat" />
      <app-button :text="'button'" scheme="none" />

      <app-button :text="'button'" modification="border-circle" />
      <app-button :text="'button'" scheme="flat" modification="border-circle" />
      <app-button :text="'button'" scheme="none" modification="border-circle" />

      <app-button :text="'button'" modification="border-rounded" />
      <app-button
        :text="'button'"
        scheme="flat"
        modification="border-rounded"
      />
      <app-button
        :text="'button'"
        scheme="none"
        modification="border-rounded"
      />

      <app-button :text="'button'" modification="none" />
      <app-button :text="'button'" scheme="flat" modification="none" />
      <app-button :text="'button'" scheme="none" modification="none" />
    </div>
    <div class="app__buttons">
      <app-button size="large" :text="'button'" />
      <app-button size="large" :text="'button'" scheme="flat" />
      <app-button size="large" :text="'button'" scheme="none" />
    </div>
    <div class="app__inputs">
      <input-field v-model="form.input" />
      <input-field v-model="form.input" :label="'label'" />
      <input-field
        v-model="form.input"
        :label="'label'"
        :placeholder="'placeholder'"
      />
      <input-field
        v-model="form.input"
        :label="'label'"
        :placeholder="'placeholder'"
        :error-message="'error message'"
      />
      <input-field
        v-model="form.input"
        :label="'label'"
        :placeholder="'placeholder'"
      >
        <template #nodeLeft>
          <icon class="input__icon" :name="ICON_NAMES.search" />
        </template>
      </input-field>
      <input-field
        v-model="form.input"
        :label="'label'"
        :placeholder="'placeholder'"
      >
        <template #nodeLeft>
          <icon class="input__icon" :name="ICON_NAMES.search" />
        </template>
        <template #nodeRight>
          <icon class="input__icon" :name="ICON_NAMES.plus" />
        </template>
      </input-field>
      <input-field
        v-model="form.input"
        :label="'label'"
        :placeholder="'placeholder'"
        :note="'lorem ipsum dolor sit amet concestetur!'"
      >
        <template #nodeLeft>
          <icon class="input__icon" :name="ICON_NAMES.search" />
        </template>
        <template #nodeRight>
          <icon class="input__icon" :name="ICON_NAMES.plus" />
        </template>
      </input-field>
      <input-field
        v-model="form.input"
        :label="'label'"
        :placeholder="'placeholder'"
        :note="'lorem ipsum dolor sit amet concestetur!'"
        disabled
      >
        <template #nodeLeft>
          <icon class="input__icon" :name="ICON_NAMES.search" />
        </template>
        <template #nodeRight>
          <icon class="input__icon" :name="ICON_NAMES.plus" />
        </template>
      </input-field>
    </div>
    <div class="app__select-fields">
      <select-field v-model="form.select" :value-options="SELECT_OPTIONS" />
      <select-field
        label="Label"
        v-model="form.select"
        :value-options="SELECT_OPTIONS"
      />
      <select-field
        label="Label"
        v-model="form.select"
        :value-options="SELECT_OPTIONS"
        error-message="error message"
      />
      <select-field
        label="Label"
        v-model="form.select"
        :value-options="SELECT_OPTIONS"
        note="Note message"
      />
      <basic-select-field
        label="Label"
        v-model="form.select"
        :value-options="
          SELECT_OPTIONS.map(el => ({
            title: String(el).concat('++'),
            value: el,
          }))
        "
      />
      <select-field
        label="Label"
        v-model="form.select"
        :value-options="SELECT_OPTIONS"
        disabled
      />
      <basic-select-field
        label="Label"
        v-model="form.select"
        :value-options="
          SELECT_OPTIONS.map(el => ({
            title: String(el).concat('++'),
            value: el,
          }))
        "
        disabled
      />

      <textarea-field v-model="form.textarea" />
      <textarea-field v-model="form.textarea" label="Label" />
      <textarea-field
        v-model="form.textarea"
        label="Label"
        error-message="Error message"
      />

      <checkbox-field v-model="form.checkbox" />
      <checkbox-field v-model="form.checkbox" label="Label" />
      <checkbox-field v-model="form.checkbox" label="Label" disabled />

      <switch-field v-model="form.switch" :value="String(form.switch)" />
      <switch-field
        v-model="form.switch"
        :value="String(form.switch)"
        label="Label"
      />
      <switch-field
        v-model="form.switch"
        :value="String(form.switch)"
        disabled
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { ICON_NAMES } from '@/enums'

import { AppButton, Icon } from './common'
import {
  BasicSelectField,
  CheckboxField,
  InputField,
  SelectField,
  SwitchField,
  TextareaField,
} from './fields'

const SELECT_OPTIONS = [1, 2, 3, 4, 5]

const form = reactive({
  input: '',
  select: '',
  textarea: '',
  checkbox: false,
  switch: false,
})
</script>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  gap: toRem(24);
  padding: toRem(24);
}

.app__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: toRem(12);
}

.app__inputs,
.app__select-fields {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fill, #{toRem(210)});
  grid-gap: toRem(36);
}

.input__icon {
  width: toRem(24);
  height: toRem(24);
}
</style>
