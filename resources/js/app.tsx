import { createInertiaApp } from '@inertiajs/inertia-react'
import { hydrateRoot } from 'react-dom/client'
import '../css/app.css'
import Wrapper from './Wrapper'

createInertiaApp({
  resolve: (name) => {
    const page = require(`./pages/${name}`)
    page.layout = page.layout || Wrapper
    return page
  },
  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})
