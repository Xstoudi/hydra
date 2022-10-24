import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enHome from '../assets/locales/en/home.json'
import frHome from '../assets/locales/fr/home.json'

export default use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: { home: enHome },
      fr: { home: frHome }
    }
  })