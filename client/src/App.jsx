import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import AudioPractice from './pages/AudioPractice'
import WritingPractice from './pages/WritingPractice'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthContext from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    if (token) {
      // Verify token with backend
      fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) setUser(data.user)
          setLoading(false)
        })
        .catch(() => {
          localStorage.removeItem('token')
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const login = (userData, token) => {
    setUser(userData)
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        {user ? (
          <div className={`${isDark ? 'dark' : ''} min-h-screen transition-colors duration-300`}>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
              <Navbar isDark={isDark} setIsDark={setIsDark} />
              <div className="flex">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                  <Routes>
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/audio-practice" element={<ProtectedRoute><AudioPractice /></ProtectedRoute>} />
                    <Route path="/writing-practice" element={<ProtectedRoute><WritingPractice /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </main>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Router>
    </AuthContext.Provider>
  )
}