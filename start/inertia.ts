/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia'

Inertia.version(() => Inertia.manifestFile('public/assets/manifest.json'))

Inertia.share({
  errors: ({ session }) => {
    return session.flashMessages.get('errors')
  },
  locale: ({ i18n }) => {
    return i18n.locale
  },
}).version(() => Inertia.manifestFile('public/assets/manifest.json'))
