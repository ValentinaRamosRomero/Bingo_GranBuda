import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TarjetaUsuario } from './components/TarjetaUsuario'
import { Route, Router, Routes, Navigate } from 'react-router-dom'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Protected } from './components/Protected'

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Register />} />
        <Route
          path="/protected"
          element={isAuthenticated ? <Protected/> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  )
}

export default App
