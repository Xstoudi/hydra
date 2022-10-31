import './utils/wdyr'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import './utils/i18n'

import './index.css'
import 'leaflet/dist/leaflet.css'
import PositionProvider from './contexts/PositionContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PositionProvider>
          <App />
        </PositionProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
