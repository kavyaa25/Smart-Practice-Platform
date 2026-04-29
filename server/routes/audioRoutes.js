import express from 'express'
import { getTasks, submitAudio } from '../controllers/audioController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/tasks', authMiddleware, getTasks)
router.post('/submit', authMiddleware, submitAudio)

export default router