const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const apiRoutes = require('./routes')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

const app = express()

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim())
  : '*'

app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api', apiRoutes)
app.use(notFound)
app.use(errorHandler)

module.exports = app
