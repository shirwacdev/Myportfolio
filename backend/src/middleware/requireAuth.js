const jwt = require('jsonwebtoken')
const ApiError = require('../utils/apiError')

const resolveToken = (req) => {
  const header = req.headers.authorization || ''

  if (header.startsWith('Bearer ')) {
    return header.slice(7).trim()
  }

  return req.headers['x-auth-token'] || null
}

const requireAuth = (req, res, next) => {
  const token = resolveToken(req)

  if (!token) {
    return next(new ApiError('Unauthorized', 401))
  }

  try {
    const secret = process.env.JWT_SECRET || 'dev-only-secret-change-me'
    const decoded = jwt.verify(token, secret)
    req.user = decoded
    return next()
  } catch (error) {
    return next(new ApiError('Invalid or expired token', 401))
  }
}

module.exports = requireAuth
