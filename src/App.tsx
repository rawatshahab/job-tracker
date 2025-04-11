import { useState } from 'react'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Addjob from './pages/Addjob'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addjob" element={<Addjob />} />
      </Routes>
    </div>
  )
}

export default App
