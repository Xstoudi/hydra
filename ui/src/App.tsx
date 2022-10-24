import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Stations from "./pages/Stations"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stations" element={<Stations />} />
      </Routes>
    </>
  )
}

export default App
