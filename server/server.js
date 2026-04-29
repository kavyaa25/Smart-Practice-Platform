import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './config/db.js'
import errorMiddleware from './middleware/errorMiddleware.js'
import authRoutes from './routes/authRoutes.js'
import audioRoutes from './routes/audioRoutes.js'
import writingRoutes from './routes/writingRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database Connection
db()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/audio-practice', audioRoutes)
app.use('/api/writing-practice', writingRoutes)
app.use('/api/dashboard', dashboardRoutes)

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' })
})

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Error Middleware
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})