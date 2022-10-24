import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Stations from './pages/Stations'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/stations' element={<MainLayout><Stations /></MainLayout>} />
      </Routes>
    </>
  )
}

export default App
