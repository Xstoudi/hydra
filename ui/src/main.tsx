import './utils/wdyr'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

import App from './App'
import './utils/i18n'

import './index.css'
import 'leaflet/dist/leaflet.css'
import PositionProvider from './contexts/PositionContext'
import BreadcrumbProvider from './contexts/BreadcrumbContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    }
  }
})

if(process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0
  })
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PositionProvider>
          <BreadcrumbProvider>
            <App />
          </BreadcrumbProvider>
        </PositionProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
