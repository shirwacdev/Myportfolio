const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/apiError')

const ADMIN_DEFAULT_USERNAME = 'admin'
const ADMIN_DEFAULT_EMAIL = 'admin@shirwac.dev'
const ADMIN_DEFAULT_PASSWORD = '12345'

const issueToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'dev-only-secret-change-me'
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d'
  return jwt.sign(payload, secret, { expiresIn })
}

const getAdminIdentity = () => ({
  username: process.env.ADMIN_USERNAME || ADMIN_DEFAULT_USERNAME,
  email: process.env.ADMIN_EMAIL || ADMIN_DEFAULT_EMAIL,
  password: process.env.ADMIN_PASSWORD || ADMIN_DEFAULT_PASSWORD,
})

const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  const admin = getAdminIdentity()

  const normalizedUsername = String(username || '').trim().toLowerCase()
  const normalizedEmail = String(email || '').trim().toLowerCase()
  const validIdentity =
    normalizedUsername === admin.username.toLowerCase() || normalizedEmail === admin.email.toLowerCase()

  if (!validIdentity || password !== admin.password) {
    throw new ApiError('Invalid username/email or password', 401)
  }

  const token = issueToken({
    role: 'admin',
    username: admin.username,
    email: admin.email,
  })

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        username: admin.username,
        email: admin.email,
        role: 'admin',
      },
    },
  })
})

const me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    },
  })
})

module.exports = {
  login,
  me,
}
