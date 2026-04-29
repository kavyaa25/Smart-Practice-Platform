import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import { PencilSquareIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

export default function WritingPractice() {
  const [prompts, setPrompts] = useState([])
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/writing-practice/prompts', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        console.log('📝 Writing prompts:', data) // Debug
        if (data.success && data.prompts.length > 0) {
          setPrompts(data.prompts)
          setCurrentPromptIndex(0)
        }
      } catch (error) {
        console.error('Error fetching prompts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPrompts()
  }, [token])

  const currentPrompt = prompts[currentPromptIndex]
  const wordCount = userAnswer.trim().split(/\s+/).filter(w => w.length > 0).length
  const minWords = currentPrompt?.minWords || 100
  const wordCountPercentage = Math.min((wordCount / minWords) * 100, 100)

  const handleSubmit = async () => {
    if (!userAnswer.trim()) {
      alert('Please write something before submitting')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/writing-practice/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          promptId: currentPrompt._id,
          userAnswer: userAnswer.trim(),
        }),
      })

      const data = await response.json()
      if (data.success) {
        setResult(data.result)
        setSubmitted(true)
      } else {
        alert(data.message || 'Error submitting')
      }
    } catch (error) {
      console.error('Error submitting:', error)
      alert('Error submitting. Please try again.')
    }
  }

  const handleNewAttempt = () => {
    setUserAnswer('')
    setSubmitted(false)
    setResult(null)
    
    // Move to next prompt
    if (prompts.length > 1) {
      const nextIndex = (currentPromptIndex + 1) % prompts.length
      setCurrentPromptIndex(nextIndex)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <Loader />
      </div>
    )
  }

  if (!currentPrompt || prompts.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">No writing prompts available</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 mb-4">
          <PencilSquareIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Writing Practice
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Improve your writing skills with AI feedback
        </p>
        {/* Prompt Counter */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-full">
          <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
            Prompt {currentPromptIndex + 1} of {prompts.length}
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Prompt Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Prompt
            </h2>
            {/* Difficulty Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              currentPrompt.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
              currentPrompt.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
            }`}>
              {currentPrompt.difficulty.charAt(0).toUpperCase() + currentPrompt.difficulty.slice(1)}
            </span>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border border-purple-200 dark:border-purple-700 rounded-lg p-6">
            <p className="text-slate-900 dark:text-white text-lg leading-relaxed">
              {currentPrompt.prompt}
            </p>
          </div>
          {/* Minimum Words Info */}
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            <p>📝 Minimum recommended: <strong>{minWords} words</strong></p>
          </div>
        </div>

        {/* Answer Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-lg font-semibold text-slate-900 dark:text-white">
              Your Answer
            </label>
            <span className={`text-sm font-semibold ${
              wordCount >= minWords ? 'text-green-600 dark:text-green-400' :
              wordCount >= minWords * 0.7 ? 'text-yellow-600 dark:text-yellow-400' :
              'text-slate-600 dark:text-slate-400'
            }`}>
              <strong>{wordCount}</strong> / {minWords} words
            </span>
          </div>

          {/* Word Count Progress Bar */}
          <div className="mb-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                wordCount >= minWords ? 'bg-green-500' :
                wordCount >= minWords * 0.7 ? 'bg-yellow-500' :
                'bg-purple-500'
              }`}
              style={{ width: `${wordCountPercentage}%` }}
            />
          </div>

          {!submitted ? (
            <>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={`Write your answer here... (aim for at least ${minWords} words)`}
                className="w-full h-64 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition"
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={wordCount === 0}
                  className={`flex-1 font-semibold py-3 rounded-lg transition ${
                    wordCount === 0
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:shadow-lg text-white'
                  }`}
                >
                  Evaluate Answer
                </button>
              </div>
            </>
          ) : result && (
            <div className="space-y-6">
              {/* Rating */}
              <div className="text-center">
                <p className="text-slate-600 dark:text-slate-400 mb-2">Overall Rating</p>
                <div className="flex justify-center gap-2 mb-2">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        i < Math.round(result.rating)
                          ? 'bg-yellow-400 text-yellow-900 scale-110'
                          : 'bg-slate-300 dark:bg-slate-600 text-slate-600'
                      }`}
                    >
                      ★
                    </div>
                  ))}
                </div>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                  {result.rating.toFixed(1)}/10
                </div>
                {result.rating >= 8 && <p className="text-green-600 dark:text-green-400 mt-2 font-semibold">🎉 Excellent work!</p>}
                {result.rating >= 6 && result.rating < 8 && <p className="text-blue-600 dark:text-blue-400 mt-2 font-semibold">✅ Great effort!</p>}
                {result.rating >= 4 && result.rating < 6 && <p className="text-yellow-600 dark:text-yellow-400 mt-2 font-semibold">📝 Good start</p>}
                {result.rating < 4 && <p className="text-orange-600 dark:text-orange-400 mt-2 font-semibold">💡 Keep improving!</p>}
              </div>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center border border-blue-200 dark:border-blue-700">
                  <p className="text-sm text-blue-600 dark:text-blue-300 font-medium">Word Count</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-200">{result.wordCount}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">{result.wordCount >= minWords ? '✓ Met' : '✗ Below'}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 text-center border border-green-200 dark:border-green-700">
                  <p className="text-sm text-green-600 dark:text-green-300 font-medium">Similarity</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-200">{result.similarity}%</p>
                  <p className="text-xs text-green-600 dark:text-green-300 mt-1">Content match</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4 text-center border border-purple-200 dark:border-purple-700">
                  <p className="text-sm text-purple-600 dark:text-purple-300 font-medium">Grammar</p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-200">{result.grammarScore}%</p>
                  <p className="text-xs text-purple-600 dark:text-purple-300 mt-1">Accuracy</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4 text-center border border-orange-200 dark:border-orange-700">
                  <p className="text-sm text-orange-600 dark:text-orange-300 font-medium">Overall</p>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-200">{result.overallScore}%</p>
                  <p className="text-xs text-orange-600 dark:text-orange-300 mt-1">Final score</p>
                </div>
              </div>

              {/* Feedback */}
              {result.feedback && result.feedback.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                  <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-3">💬 Feedback & Suggestions:</p>
                  <ul className="text-yellow-800 dark:text-yellow-300 text-sm space-y-2">
                    {result.feedback.map((item, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Your Answer Review */}
              <div className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                <p className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Your Response:</p>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{userAnswer}</p>
              </div>

              <button
                onClick={handleNewAttempt}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg text-white font-semibold py-3 rounded-lg transition"
              >
                {prompts.length > 1 ? (
                  <>
                    Try Next Prompt
                    <ChevronRightIcon className="w-5 h-5" />
                  </>
                ) : (
                  'Try Again'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}