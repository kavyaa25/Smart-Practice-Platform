// import React, { useState, useContext } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import AuthContext from '../context/AuthContext'
// import Loader from '../components/Loader'

// export default function Register() {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const { login } = useContext(AuthContext)
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')

//     if (!name || !email || !password || !confirmPassword) {
//       setError('Please fill all fields')
//       return
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match')
//       return
//     }

//     if (password.length < 6) {
//       setError('Password must be at least 6 characters')
//       return
//     }

//     setLoading(true)

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       })

//       const data = await response.json()

//       if (data.success) {
//         login(data.user, data.token)
//         navigate('/dashboard')
//       } else {
//         setError(data.message || 'Registration failed')
//       }
//     } catch (err) {
//       setError('Network error. Is the backend running on port 5000?')
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-2xl p-8">
//           <div className="flex justify-center mb-8">
//             <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//               <span className="text-white font-bold text-2xl">SP</span>
//             </div>
//           </div>

//           <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">SmartPractice</h1>
//           <p className="text-center text-slate-600 mb-8">Create your account</p>

//           {error && (
//             <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                 placeholder="John Doe"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                 placeholder="you@example.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                 placeholder="••••••••"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                 placeholder="••••••••"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center"
//             >
//               {loading ? <Loader /> : 'Register'}
//             </button>
//           </form>

//           <p className="text-center text-slate-600 mt-6">
//             Already have an account?{' '}
//             <Link to="/login" className="text-blue-500 hover:text-blue-600 font-semibold">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }



import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Loader from '../components/Loader'
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  // Validation
  const isNameValid = name.length >= 2
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isPasswordValid = password.length >= 6
  const passwordsMatch = password === confirmPassword && password.length > 0
  const isFormValid = isNameValid && isEmailValid && isPasswordValid && passwordsMatch

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill all fields')
      return
    }

    if (!isNameValid) {
      setError('Name must be at least 2 characters')
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

    if (!passwordsMatch) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (data.success) {
        login(data.user, data.token)
        navigate('/dashboard')
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('Network error. Is the backend running on port 5000?')
      console.error('Register error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">SP</span>
            </div>
          </div>

          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">
            Create Account
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
            Join SmartPractice today
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
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition ${
                    name && !isNameValid
                      ? 'border-red-400 focus:ring-2 focus:ring-red-500'
                      : 'border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500'
                  } dark:bg-slate-700 dark:text-white`}
                  placeholder="John Doe"
                />
                {name && isNameValid && (
                  <CheckCircleIcon className="absolute right-3 top-3.5 w-5 h-5 text-green-500" />
                )}
              </div>
            </div>

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
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition pr-12 ${
                    confirmPassword && !passwordsMatch
                      ? 'border-red-400 focus:ring-2 focus:ring-red-500'
                      : 'border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500'
                  } dark:bg-slate-700 dark:text-white`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
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
                  <span>Creating account...</span>
                </>
              ) : (
                'Register'
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}