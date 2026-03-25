const express = require('express')
const { body, param } = require('express-validator')
const {
  getUsers,
  getUsersMeta,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
} = require('../controllers/userController')
const validateRequest = require('../middleware/validateRequest')
const requireAuth = require('../middleware/requireAuth')
const authorize = require('../middleware/authorize')
const { ALL_PERMISSIONS, USER_ROLES } = require('../utils/permissions')

const router = express.Router()

const userValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 40 })
    .withMessage('Username must be between 3 and 40 characters'),
  body('email').trim().isEmail().withMessage('A valid email is required'),
  body('role').isIn(USER_ROLES).withMessage('Invalid role'),
  body('permissions')
    .optional()
    .isArray()
    .withMessage('Permissions must be an array')
    .custom((value = []) => value.every((permission) => ALL_PERMISSIONS.includes(permission)))
    .withMessage('Invalid permission value found'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean'),
]

const createUserValidation = [
  ...userValidation,
  body('password')
    .isLength({ min: 5, max: 120 })
    .withMessage('Password must be between 5 and 120 characters'),
]

const passwordValidation = [
  body('password')
    .isLength({ min: 5, max: 120 })
    .withMessage('Password must be between 5 and 120 characters'),
]

const idValidation = [param('id').isMongoId().withMessage('Invalid id')]

router.use(requireAuth, authorize('manage_users'))

router.get('/meta', getUsersMeta)
router.get('/', getUsers)
router.post('/', [...createUserValidation, validateRequest], createUser)
router.put('/:id', [...idValidation, ...userValidation, validateRequest], updateUser)
router.patch('/:id/password', [...idValidation, ...passwordValidation, validateRequest], updateUserPassword)
router.delete('/:id', [...idValidation, validateRequest], deleteUser)

module.exports = router
