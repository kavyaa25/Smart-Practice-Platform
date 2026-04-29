import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Loader from '../components/Loader'
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  // Form validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isPasswordValid = password.length >= 6
  const isFormValid = email && password && isEmailValid && isPasswordValid

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill all fields')
      return
    }

    if (!isEmailValid) {
      setError('Please enter a valid email address')
      return
    }

    if (!isPasswordValid) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        // Save credentials if remember me is checked
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email)
        } else {
          localStorage.removeItem('rememberedEmail')
        }

        login(data.user, data.token)
        navigate('/dashboard')
      } else {
        setError(data.message || 'Login failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Is the backend running on port 5000?')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Load remembered email
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      setEmail(rememberedEmail)
      setRememberMe(true)
    }
  }, [])

  // Demo credentials hint
  const fillDemoCredentials = () => {
    setEmail('test@example.com')
    setPassword('test123456')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">SP</span>
            </div>
          </div>

          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">
            SmartPractice
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
            Master your skills with AI-powered practice
          </p>

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg text-sm flex items-start gap-3">
              <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition ${
                    email && !isEmailValid
                      ? 'border-red-400 focus:ring-2 focus:ring-red-500'
                      : 'border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500'
                  } dark:bg-slate-700 dark:text-white`}
                  placeholder="you@example.com"
                />
                {email && isEmailValid && (
                  <CheckCircleIcon className="absolute right-3 top-3.5 w-5 h-5 text-green-500" />
                )}
              </div>
              {email && !isEmailValid && (
                <p className="text-xs text-red-500 mt-1">Please enter a valid email</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition pr-12 ${
                    password && !isPasswordValid
                      ? 'border-red-400 focus:ring-2 focus:ring-red-500'
                      : 'border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500'
                  } dark:bg-slate-700 dark:text-white`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {password && !isPasswordValid && (
                <p className="text-xs text-red-500 mt-1">Password must be at least 6 characters</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
              </label>
              {/* <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600">
                Forgot password?
              </Link> */}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className={`w-full font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 ${
                isFormValid
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg disabled:opacity-50'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <Loader />
                  <span>Logging in...</span>
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

        
          {/* Register Link */}
          <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition"
            >
              Register here
            </Link>
          </p>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-500 mt-4">
            By logging in, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  )
}