const jwt = require('jsonwebtoken')
const ApiError = require('../utils/apiError')
const User = require('../models/User')

const resolveToken = (req) => {
  const header = req.headers.authorization || ''

  if (header.startsWith('Bearer ')) {
    return header.slice(7).trim()
  }

  return req.headers['x-auth-token'] || null
}

const requireAuth = async (req, res, next) => {
  const token = resolveToken(req)

  if (!token) {
    return next(new ApiError('Unauthorized', 401))
  }

  try {
    const secret = process.env.JWT_SECRET || 'dev-only-secret-change-me'
    const decoded = jwt.verify(token, secret)
    const userId = decoded.sub || decoded.userId

    if (!userId) {
      return next(new ApiError('Invalid token payload', 401))
    }

    const user = await User.findById(userId).lean()

    if (!user || !user.isActive) {
      return next(new ApiError('Unauthorized', 401))
    }

    req.user = {
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      permissions: user.permissions || [],
      isActive: user.isActive,
    }

    return next()
  } catch (error) {
    return next(new ApiError('Invalid or expired token', 401))
  }
}

module.exports = requireAuth
