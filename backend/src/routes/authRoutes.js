const express = require('express')
const { body } = require('express-validator')
const { login, me } = require('../controllers/authController')
const validateRequest = require('../middleware/validateRequest')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

const loginValidation = [
  body('username')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters'),
  body('email')
    .optional({ values: 'falsy' })
    .trim()
    .isEmail()
    .withMessage('Valid email is required'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  body('password').custom((value, { req }) => {
    const username = String(req.body?.username || '').trim()
    const email = String(req.body?.email || '').trim()

    if (!username && !email) {
      throw new Error('Username or email is required')
    }

    return true
  }),
]

router.post('/login', [...loginValidation, validateRequest], login)
router.get('/me', requireAuth, me)

module.exports = router
