import Audio from '../models/Audio.js'
import Submission from '../models/Submission.js'
import { calculateEnhancedSimilarity } from '../utils/levenshtein.js'

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Audio.find().select('-correctTranscript')
    res.json({
      success: true,
      tasks,
    })
  } catch (error) {
    next(error)
  }
}

export const submitAudio = async (req, res, next) => {
  try {
    const { audioId, userInput } = req.body

    if (!audioId || !userInput) {
      return res.status(400).json({
        success: false,
        message: 'audioId and userInput are required',
      })
    }

    const audio = await Audio.findById(audioId)
    if (!audio) {
      return res.status(404).json({
        success: false,
        message: 'Audio task not found',
      })
    }

    const score = calculateEnhancedSimilarity(userInput, audio.correctTranscript)

    const feedback = generateAudioFeedback(userInput, audio.correctTranscript, score)

    const submission = await Submission.create({
      userId: req.userId,
      type: 'audio',
      audioId,
      userInput,
      correctAnswer: audio.correctTranscript,
      score,
      feedback,
    })

    res.json({
      success: true,
      score,
      feedback,
      submission: submission._id,
    })
  } catch (error) {
    next(error)
  }
}

function generateAudioFeedback(userInput, correctAnswer, score) {
  const feedback = []

  if (score >= 85) {
    feedback.push('🎉 Excellent! Your transcription is nearly perfect.')
  } else if (score >= 70) {
    feedback.push('✅ Good job! Most of your transcription is correct.')
  } else if (score >= 50) {
    feedback.push('📝 Fair attempt. Try listening more carefully to specific words.')
  } else {
    feedback.push('💡 Keep practicing! Listen again and focus on key phrases.')
  }

  return feedback
}