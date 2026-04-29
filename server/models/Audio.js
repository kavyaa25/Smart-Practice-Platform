import mongoose from 'mongoose'

const audioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    correctTranscript: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Audio', audioSchema)