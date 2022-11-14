import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Stations from './pages/Stations'

import 'react-toastify/dist/ReactToastify.css'
import Station from './pages/Station'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <ScrollToTop>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/stations'
          element={
            <MainLayout>
              <Stations />
            </MainLayout>
          }
        />
        <Route path='/stations/:id' element={
          <MainLayout>
            <Station />
          </MainLayout>
        } />
      </Routes>
      <ToastContainer />
    </ScrollToTop>
  )
}

export default App
