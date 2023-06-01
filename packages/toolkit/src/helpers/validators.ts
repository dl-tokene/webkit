import type { ValidationRule } from '@vuelidate/core'
import {
  email as _email,
  maxLength as _maxLength,
  minLength as _minLength,
  required as _required,
  requiredIf as _requiredIf,
  sameAs as _sameAs,
} from '@vuelidate/validators'
import { createI18nMessage, type MessageProps } from '@vuelidate/validators'
import get from 'lodash/get'
import type { Ref } from 'vue-demi'

import { verifyEthAddress } from '@/helpers'
import { i18next } from '@/localization'

const { t } = i18next

const messagePath = ({ $validator }: MessageProps) =>
  `validations.field-error_${$validator}`

const withI18nMessage = createI18nMessage({ t, messagePath })

export const required = <ValidationRule>withI18nMessage(_required)

export const requiredIf = (condition: Ref<boolean>): ValidationRule =>
  <ValidationRule>withI18nMessage(_requiredIf(condition))

export const email = <ValidationRule>withI18nMessage(_email)

export const minLength = (length: number): ValidationRule =>
  <ValidationRule>withI18nMessage(_minLength(length))

export const maxLength = (length: number): ValidationRule =>
  <ValidationRule>withI18nMessage(_maxLength(length))

export const sameAs = (field: Ref): ValidationRule => {
  return <ValidationRule>withI18nMessage(_sameAs(field, get(field, '_key')))
}

export const ethAddress = <ValidationRule>withI18nMessage(verifyEthAddress)
