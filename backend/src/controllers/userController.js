const bcrypt = require('bcryptjs')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/apiError')
const User = require('../models/User')
const {
  ALL_PERMISSIONS,
  USER_ROLES,
  resolvePermissions,
  normalizePermissions,
  ROLE_DEFAULT_PERMISSIONS,
} = require('../utils/permissions')
const { sanitizeUser } = require('./authController')

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 })

  res.json({
    success: true,
    data: users.map((user) => sanitizeUser(user)),
  })
})

const getUsersMeta = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      roles: USER_ROLES,
      permissions: ALL_PERMISSIONS,
      roleDefaults: ROLE_DEFAULT_PERMISSIONS,
    },
  })
})

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role, permissions, isActive } = req.body

  const normalizedUsername = String(username || '').trim().toLowerCase()
  const normalizedEmail = String(email || '').trim().toLowerCase()

  const existing = await User.findOne({
    $or: [{ username: normalizedUsername }, { email: normalizedEmail }],
  })

  if (existing) {
    throw new ApiError('Username or email already exists', 409)
  }

  const passwordHash = await bcrypt.hash(String(password), 12)
  const resolvedPermissions = resolvePermissions({ role, permissions })

  const user = await User.create({
    username: normalizedUsername,
    email: normalizedEmail,
    passwordHash,
    role,
    permissions: resolvedPermissions,
    isActive: typeof isActive === 'boolean' ? isActive : true,
    createdBy: req.user.userId,
  })

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: sanitizeUser(user),
  })
})

const ensureSuperAdminSafety = async (targetUser, updates = {}) => {
  const nextRole = updates.role ?? targetUser.role
  const nextActive = typeof updates.isActive === 'boolean' ? updates.isActive : targetUser.isActive

  const isDemotingOrDisabling =
    targetUser.role === 'super_admin' &&
    targetUser.isActive &&
    (nextRole !== 'super_admin' || nextActive === false)

  if (!isDemotingOrDisabling) return

  const activeSuperAdmins = await User.countDocuments({ role: 'super_admin', isActive: true })
  if (activeSuperAdmins <= 1) {
    throw new ApiError('At least one active super_admin is required', 400)
  }
}

const updateUser = asyncHandler(async (req, res) => {
  const { username, email, role, permissions, isActive } = req.body
  const user = await User.findById(req.params.id)

  if (!user) {
    throw new ApiError('User not found', 404)
  }

  const normalizedUsername = String(username || '').trim().toLowerCase()
  const normalizedEmail = String(email || '').trim().toLowerCase()

  await ensureSuperAdminSafety(user, { role, isActive })

  const duplicate = await User.findOne({
    _id: { $ne: user._id },
    $or: [{ username: normalizedUsername }, { email: normalizedEmail }],
  })

  if (duplicate) {
    throw new ApiError('Username or email already exists', 409)
  }

  user.username = normalizedUsername
  user.email = normalizedEmail
  user.role = role
  user.isActive = Boolean(isActive)

  if (role === 'super_admin') {
    user.permissions = [...ALL_PERMISSIONS]
  } else if (Array.isArray(permissions)) {
    user.permissions = normalizePermissions(permissions)
  } else {
    user.permissions = resolvePermissions({ role })
  }

  await user.save()

  res.json({
    success: true,
    message: 'User updated successfully',
    data: sanitizeUser(user),
  })
})

const updateUserPassword = asyncHandler(async (req, res) => {
  const { password } = req.body
  const user = await User.findById(req.params.id)

  if (!user) {
    throw new ApiError('User not found', 404)
  }

  user.passwordHash = await bcrypt.hash(String(password), 12)
  await user.save()

  res.json({
    success: true,
    message: 'User password updated successfully',
    data: sanitizeUser(user),
  })
})

const deleteUser = asyncHandler(async (req, res) => {
  const targetId = String(req.params.id)
  const currentUserId = String(req.user.userId)

  if (targetId === currentUserId) {
    throw new ApiError('You cannot delete your own account', 400)
  }

  const user = await User.findById(targetId)

  if (!user) {
    throw new ApiError('User not found', 404)
  }

  await ensureSuperAdminSafety(user, { role: 'viewer', isActive: false })
  await User.findByIdAndDelete(targetId)

  res.json({
    success: true,
    message: 'User deleted successfully',
  })
})

module.exports = {
  getUsers,
  getUsersMeta,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
}
