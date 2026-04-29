import Submission from '../models/Submission.js'

/**
 * Get user dashboard stats
 */
export const getStats = async (req, res, next) => {
  try {
    const submissions = await Submission.find({ userId: req.userId })

    const totalAttempts = submissions.length
    const avgScore =
      submissions.length > 0
        ? Math.round(submissions.reduce((sum, sub) => sum + sub.score, 0) / submissions.length)
        : 0
    const highestScore = submissions.length > 0 ? Math.max(...submissions.map(s => s.score)) : 0

    // Calculate streak
    const sortedByDate = submissions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    let streak = 0

    for (const sub of sortedByDate) {
      if (sub.score >= 70) {
        streak++
      } else {
        break
      }
    }

    res.json({
      success: true,
      stats: {
        totalAttempts,
        avgScore,
        highestScore,
        streak,
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get user submissions
 */
export const getSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find({ userId: req.userId })
      .sort({ timestamp: -1 })
      .limit(10)

    res.json({
      success: true,
      submissions,
    })
  } catch (error) {
    next(error)
  }
}