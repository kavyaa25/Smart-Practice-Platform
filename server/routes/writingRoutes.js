import express from 'express'
import { getPrompts, submitWriting } from '../controllers/writingController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/prompts', authMiddleware, getPrompts)
router.post('/submit', authMiddleware, submitWriting)

export default router