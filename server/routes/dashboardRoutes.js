import express from 'express'
import { getStats, getSubmissions } from '../controllers/dashboardController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/stats', authMiddleware, getStats)
router.get('/submissions', authMiddleware, getSubmissions)

export default router