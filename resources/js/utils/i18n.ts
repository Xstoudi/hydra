import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from '../../locale/en/common.json'
import enHome from '../../locale/en/home.json'
import enStations from '../../locale/en/stations.json'
import frCommon from '../../locale/fr/common.json'
import frHome from '../../locale/fr/home.json'
import frStations from '../../locale/fr/stations.json'

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

export default use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: resources,
})
