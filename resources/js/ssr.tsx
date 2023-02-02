import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/inertia-react'
import Wrapper from './Wrapper'

export default function render(page) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const page = require(`./pages/${name}`)
      page.layout = page.layout || Wrapper
      return page
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
