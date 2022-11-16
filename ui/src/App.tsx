import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Stations from './pages/Stations'

import 'react-toastify/dist/ReactToastify.css'
import ScrollToTop from './components/ScrollToTop'
import loadable from '@loadable/component'

const AsyncStations = loadable(() => import('./pages/Stations'))
const AsyncStation = loadable(() => import('./pages/Station'))

function App() {
  return (
    <ScrollToTop>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/stations'
          element={
            <MainLayout>
              <AsyncStations />
            </MainLayout>
          }
        />
        <Route path='/stations/:id' element={
          <MainLayout>
            <AsyncStation />
          </MainLayout>
        } />
      </Routes>
      <ToastContainer />
    </ScrollToTop>
  )
}

export default App
