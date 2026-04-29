import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import { SpeakerWaveIcon, PlayIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

export default function AudioPractice() {
  const [audioTasks, setAudioTasks] = useState([])
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(null)
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/audio-practice/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        console.log('📊 Audio tasks:', data) // Debug
        if (data.success && data.tasks.length > 0) {
          setAudioTasks(data.tasks)
          setCurrentTaskIndex(0)
        }
      } catch (error) {
        console.error('Error fetching audio tasks:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [token])

  const currentTask = audioTasks[currentTaskIndex]

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      alert('Please type something before submitting')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/audio-practice/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          audioId: currentTask._id,
          userInput: userInput.trim(),
        }),
      })

      const data = await response.json()
      if (data.success) {
        setScore(data.score)
        setFeedback(data.feedback || [])
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
    setUserInput('')
    setSubmitted(false)
    setScore(null)
    setFeedback([])
    
    // Move to next task
    if (audioTasks.length > 1) {
      const nextIndex = (currentTaskIndex + 1) % audioTasks.length
      setCurrentTaskIndex(nextIndex)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <Loader />
      </div>
    )
  }

  if (!currentTask || audioTasks.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">No audio tasks available</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-4">
          <SpeakerWaveIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Audio Listening Practice
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Listen to the audio and type what you hear
        </p>
        {/* Task Counter */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
          <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
            Task {currentTaskIndex + 1} of {audioTasks.length}
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Audio Player Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            {currentTask.title}
          </h2>

          {/* Difficulty Badge */}
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              currentTask.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
              currentTask.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
            }`}>
              {currentTask.difficulty.charAt(0).toUpperCase() + currentTask.difficulty.slice(1)}
            </span>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-8 mb-6">
            <audio
              id="audioPlayer"
              controls
              className="w-full mb-4 accent-blue-600"
            >
              <source src={currentTask.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            <button
              onClick={() => document.getElementById('audioPlayer').play()}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
            >
              <PlayIcon className="w-5 h-5" />
              Play Audio
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              💡 <strong>Tip:</strong> Listen carefully to the audio and type exactly what you hear in the text area below.
            </p>
          </div>
        </div>

        {/* Textarea Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
          <label className="block text-lg font-semibold text-slate-900 dark:text-white mb-4">
            What did you hear?
          </label>

          {!submitted ? (
            <>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type what you hear from the audio..."
                className="w-full h-40 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition"
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg text-white font-semibold py-3 rounded-lg transition"
                >
                  Submit Answer
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              {/* Score */}
              <div className="text-center">
                <p className="text-slate-600 dark:text-slate-400 mb-2">Your Similarity Score</p>
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  {score}%
                </div>
                {score >= 85 && <p className="text-green-600 dark:text-green-400 mt-2 font-semibold">🎉 Excellent!</p>}
                {score >= 70 && score < 85 && <p className="text-blue-600 dark:text-blue-400 mt-2 font-semibold">✅ Good job!</p>}
                {score >= 50 && score < 70 && <p className="text-yellow-600 dark:text-yellow-400 mt-2 font-semibold">📝 Fair attempt</p>}
                {score < 50 && <p className="text-orange-600 dark:text-orange-400 mt-2 font-semibold">💡 Keep practicing!</p>}
              </div>

              {/* Correct Answer */}
              <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
                <p className="font-semibold text-green-900 dark:text-green-200 mb-2">Correct Answer:</p>
                <p className="text-green-800 dark:text-green-300 text-sm">{currentTask.correctTranscript}</p>
              </div>

              {/* User Answer */}
              <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Your Answer:</p>
                <p className="text-blue-800 dark:text-blue-300 text-sm">{userInput}</p>
              </div>

              {/* Feedback */}
              {feedback.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                  <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">Feedback:</p>
                  <ul className="text-yellow-800 dark:text-yellow-300 text-sm space-y-1">
                    {feedback.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={handleNewAttempt}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:shadow-lg text-white font-semibold py-3 rounded-lg transition"
              >
                {audioTasks.length > 1 ? (
                  <>
                    Try Next Task
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