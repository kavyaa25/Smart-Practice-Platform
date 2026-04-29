import mongoose from 'mongoose'

const promptSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    sampleAnswer: String,
    keywords: [String],
    minWords: {
      type: Number,
      default: 100,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Prompt', promptSchema)