import i18next from 'i18next'

import resources from '@/localization/resources'

const STORAGE_KEY = 'locale'
const DEFAULT_LOCALE = 'en'

const locale = localStorage?.getItem(STORAGE_KEY) ?? DEFAULT_LOCALE

i18next.init({
  lng: locale,
  debug: false,
  ...resources,
})

export { i18next }
