import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'


import enHome from '../assets/locales/en/home.json'
import enStations from '../assets/locales/en/stations.json'
import frHome from '../assets/locales/fr/home.json'
import frStations from '../assets/locales/fr/stations.json'

export const resources = {
  en: {
    home: enHome,
    stations: enStations,

  },
  fr: {
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
