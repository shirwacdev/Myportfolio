const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/apiError')
const User = require('../models/User')
const { ALL_PERMISSIONS } = require('../utils/permissions')

const ADMIN_DEFAULT_USERNAME = 'admin'
const ADMIN_DEFAULT_EMAIL = 'admin@shirwac.dev'
const ADMIN_DEFAULT_PASSWORD = '12345'

const getBootstrapIdentity = () => ({
  username: (process.env.ADMIN_USERNAME || ADMIN_DEFAULT_USERNAME).toLowerCase().trim(),
  email: (process.env.ADMIN_EMAIL || ADMIN_DEFAULT_EMAIL).toLowerCase().trim(),
  password: process.env.ADMIN_PASSWORD || ADMIN_DEFAULT_PASSWORD,
})

const issueToken = (user) => {
  const secret = process.env.JWT_SECRET || 'dev-only-secret-change-me'
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d'

  return jwt.sign(
    {
      sub: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      permissions: user.permissions || [],
    },
    secret,
    { expiresIn },
  )
}

const sanitizeUser = (user) => ({
  _id: user._id,
  username: user.username,
  email: user.email,
  role: user.role,
  permissions: user.permissions || [],
  isActive: user.isActive,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
})

const ensureBootstrapAdmin = async () => {
  const usersCount = await User.countDocuments()
  if (usersCount > 0) return

  const admin = getBootstrapIdentity()
  const passwordHash = await bcrypt.hash(admin.password, 12)

  await User.create({
    username: admin.username,
    email: admin.email,
    passwordHash,
    role: 'super_admin',
    permissions: [...ALL_PERMISSIONS],
    isActive: true,
  })
}

const findUserByIdentity = async ({ username, email }) => {
  const normalizedUsername = String(username || '').trim().toLowerCase()
  const normalizedEmail = String(email || '').trim().toLowerCase()

  if (!normalizedUsername && !normalizedEmail) {
    return null
  }

  const query = normalizedUsername
    ? { username: normalizedUsername }
    : { email: normalizedEmail }

  return User.findOne(query)
}

const login = asyncHandler(async (req, res) => {
  await ensureBootstrapAdmin()

  const { username, email, password } = req.body
  const user = await findUserByIdentity({ username, email })

  if (!user || !user.isActive) {
    throw new ApiError('Invalid username/email or password', 401)
  }

  const matches = await bcrypt.compare(String(password || ''), user.passwordHash)
  if (!matches) {
    throw new ApiError('Invalid username/email or password', 401)
  }

  user.lastLoginAt = new Date()
  await user.save()

  const token = issueToken(user)

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: sanitizeUser(user),
    },
  })
})

const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId)

  if (!user || !user.isActive) {
    throw new ApiError('Unauthorized', 401)
  }

  res.json({
    success: true,
    data: sanitizeUser(user),
  })
})

const changeCredentials = asyncHandler(async (req, res) => {
  const { currentPassword, newUsername, newPassword } = req.body

  if (!newUsername && !newPassword) {
    throw new ApiError('Provide new username or new password', 400)
  }

  const user = await User.findById(req.user.userId)
  if (!user) {
    throw new ApiError('User not found', 404)
  }

  const passwordMatches = await bcrypt.compare(String(currentPassword || ''), user.passwordHash)
  if (!passwordMatches) {
    throw new ApiError('Current password is incorrect', 401)
  }

  if (newUsername) {
    const normalizedUsername = String(newUsername).trim().toLowerCase()

    if (normalizedUsername.length < 3) {
      throw new ApiError('New username must be at least 3 characters', 422)
    }

    const existingUsername = await User.findOne({
      username: normalizedUsername,
      _id: { $ne: user._id },
    })

    if (existingUsername) {
      throw new ApiError('Username is already in use', 409)
    }

    user.username = normalizedUsername
  }

  if (newPassword) {
    if (String(newPassword).length < 5) {
      throw new ApiError('New password must be at least 5 characters', 422)
    }

    user.passwordHash = await bcrypt.hash(String(newPassword), 12)
  }

  await user.save()

  const token = issueToken(user)

  res.json({
    success: true,
    message: 'Credentials updated successfully',
    data: {
      token,
      user: sanitizeUser(user),
    },
  })
})

module.exports = {
  login,
  me,
  changeCredentials,
  ensureBootstrapAdmin,
  sanitizeUser,
}
