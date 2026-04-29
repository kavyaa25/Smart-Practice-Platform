import Prompt from '../models/Prompt.js'
import Submission from '../models/Submission.js'
import { evaluateWriting } from '../utils/writingEvaluator.js'

export const getPrompts = async (req, res, next) => {
  try {
    const prompts = await Prompt.find()
    res.json({
      success: true,
      prompts,
    })
  } catch (error) {
    next(error)
  }
}

export const submitWriting = async (req, res, next) => {
  try {
    const { promptId, userAnswer } = req.body

    if (!promptId || !userAnswer) {
      return res.status(400).json({
        success: false,
        message: 'promptId and userAnswer are required',
      })
    }

    const prompt = await Prompt.findById(promptId)
    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: 'Prompt not found',
      })
    }

    const evaluation = evaluateWriting(
      userAnswer,
      prompt.sampleAnswer || '',
      prompt.keywords || [],
      prompt.minWords || 100
    )

    const submission = await Submission.create({
      userId: req.userId,
      type: 'writing',
      promptId,
      userInput: userAnswer,
      score: evaluation.overallScore,
      wordCount: evaluation.wordCount,
      rating: evaluation.rating,
      feedback: evaluation.feedback,
    })

    res.json({
      success: true,
      result: {
        wordCount: evaluation.wordCount,
        similarity: evaluation.similarity,
        grammarScore: evaluation.grammarScore,
        keywordScore: evaluation.keywordScore,
        overallScore: evaluation.overallScore,
        rating: evaluation.rating,
        feedback: evaluation.feedback,
      },
      submission: submission._id,
    })
  } catch (error) {
    next(error)
  }
}