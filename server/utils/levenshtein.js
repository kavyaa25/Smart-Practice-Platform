export function levenshteinDistance(str1, str2) {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(0))

  for (let i = 0; i <= str1.length; i++) {
    track[0][i] = i
  }

  for (let j = 0; j <= str2.length; j++) {
    track[j][0] = j
  }

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      )
    }
  }

  return track[str2.length][str1.length]
}

export function calculateSimilarity(str1, str2) {
  const maxLength = Math.max(str1.length, str2.length)

  if (maxLength === 0) return 100

  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase())
  const similarity = ((maxLength - distance) / maxLength) * 100

  return Math.max(0, Math.round(similarity))
}

export function calculateEnhancedSimilarity(userText, correctText) {
  const userWords = userText.toLowerCase().split(/\s+/).filter(w => w.length > 0)
  const correctWords = correctText.toLowerCase().split(/\s+/).filter(w => w.length > 0)

  const levenshteinScore = calculateSimilarity(userText, correctText)

  let matchedWords = 0
  userWords.forEach(word => {
    if (correctWords.includes(word)) {
      matchedWords++
    }
  })

  const wordMatchPercentage = (matchedWords / Math.max(userWords.length, correctWords.length)) * 100

  const combined = Math.round(levenshteinScore * 0.7 + wordMatchPercentage * 0.3)

  return combined
}