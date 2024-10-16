import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Fcfs from './pages/Fcfs.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/fcfs' element={<Fcfs />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
