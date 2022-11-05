import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'



import enCommon from '../assets/locales/en/common.json'
import enHome from '../assets/locales/en/home.json'
import enStations from '../assets/locales/en/stations.json'
import frCommon from '../assets/locales/fr/common.json'
import frHome from '../assets/locales/fr/home.json'
import frStations from '../assets/locales/fr/stations.json'

export const resources = {
  en: {
    common: enCommon,
    home: enHome,
    stations: enStations,
  },
  fr: {
    common: frCommon,
    home: frHome,
    stations: frStations,
  },
} as const

export default use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: resources,
  })
