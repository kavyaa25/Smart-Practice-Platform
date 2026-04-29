import { calculateEnhancedSimilarity } from './levenshtein.js'

export function evaluateWriting(userAnswer, sampleAnswer, keywords = [], minWords = 100) {
  const words = userAnswer.trim().split(/\s+/).filter(w => w.length > 0)
  const wordCount = words.length

  const similarity = calculateEnhancedSimilarity(userAnswer, sampleAnswer)

  const grammarScore = checkGrammar(userAnswer)

  const keywordScore = checkKeywords(userAnswer, keywords)

  const overallScore = Math.round(
    similarity * 0.5 +
    grammarScore * 0.3 +
    keywordScore * 0.2
  )

  const rating = Math.min(10, Math.round((overallScore / 100) * 10 * 10) / 10)

  const feedback = generateFeedback(wordCount, grammarScore, keywordScore, similarity, minWords)

  return {
    wordCount,
    similarity,
    grammarScore,
    keywordScore,
    overallScore,
    rating,
    feedback,
  }
}

function checkGrammar(text) {
  let score = 100

  const issues = [
    { pattern: /\s{2,}/g, deduct: 2 },
    { pattern: /[.!?]\s[a-z]/g, deduct: 5 },
    { pattern: /\b(u|ur|ok)\b/gi, deduct: 3 },
  ]

  issues.forEach(({ pattern, deduct }) => {
    const matches = text.match(pattern)
    if (matches) {
      score -= deduct * matches.length
    }
  })

  return Math.max(0, score)
}

function checkKeywords(text, keywords) {
  if (!keywords || keywords.length === 0) return 100

  const textLower = text.toLowerCase()
  let foundKeywords = 0

  keywords.forEach(keyword => {
    if (textLower.includes(keyword.toLowerCase())) {
      foundKeywords++
    }
  })

  return Math.round((foundKeywords / keywords.length) * 100)
}

function generateFeedback(wordCount, grammarScore, keywordScore, similarity, minWords) {
  const feedback = []

  if (wordCount < minWords) {
    feedback.push(`⚠️ Word count is ${wordCount}. Try to write at least ${minWords} words.`)
  } else {
    feedback.push(`✅ Good word count: ${wordCount} words.`)
  }

  if (grammarScore < 80) {
    feedback.push(`📝 Grammar score: ${grammarScore}%. Review punctuation and capitalization.`)
  } else {
    feedback.push(`✅ Grammar looks good: ${grammarScore}%.`)
  }

  if (similarity < 50) {
    feedback.push(`🔍 Try to incorporate more key concepts from the topic.`)
  } else if (similarity < 75) {
    feedback.push(`📚 Good alignment with topic. Could include more specific examples.`)
  } else {
    feedback.push(`⭐ Excellent coverage of the topic!`)
  }

  if (keywordScore < 100) {
    feedback.push(`💡 Try including more relevant keywords for higher score.`)
  }

  return feedback
}