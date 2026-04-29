import mongoose from 'mongoose'

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['audio', 'writing'],
      required: true,
    },
    audioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Audio',
    },
    promptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prompt',
    },
    userInput: {
      type: String,
      required: true,
    },
    correctAnswer: String,
    score: {
      type: Number,
      default: 0,
    },
    wordCount: Number,
    rating: Number,
    feedback: [String],
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Submission', submissionSchema)