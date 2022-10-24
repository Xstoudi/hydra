/// <reference types="vite/client" />

import 'react-i18next'

import enHome from './assets/locales/en/home.json'

type TranslationMap = { home: typeof enHome }

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      fr: TranslationMap
      en: TranslationMap
    }
  }
}