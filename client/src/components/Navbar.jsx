import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { Bars3Icon, XMarkIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

export default function Navbar({ isDark, setIsDark }) {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-lg sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition" 
            onClick={() => navigate('/dashboard')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SP</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block">
              SmartPractice
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Welcome, <strong>{user?.name || 'User'}</strong>
            </span>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <SunIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-slate-600" />
              )}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <SunIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-slate-600" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t dark:border-slate-700">
            <span className="block text-sm text-slate-600 dark:text-slate-300 py-2">
              Welcome, <strong>{user?.name || 'User'}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition mt-2"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}