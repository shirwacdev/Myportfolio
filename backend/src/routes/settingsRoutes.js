const express = require('express')
const { body } = require('express-validator')
const { getPublicSettings, getSettings, updateSettings } = require('../controllers/settingsController')
const validateRequest = require('../middleware/validateRequest')
const requireAuth = require('../middleware/requireAuth')
const authorize = require('../middleware/authorize')
const { PERMISSIONS } = require('../utils/permissions')

const router = express.Router()

const settingsValidation = [
  body('brandName').trim().isLength({ min: 2, max: 120 }).withMessage('Brand name is required'),
  body('adminEmail').trim().isEmail().withMessage('A valid admin email is required'),
  body('timezone').trim().isLength({ min: 2, max: 80 }).withMessage('Timezone is required'),
  body('dashboardGreeting')
    .trim()
    .isLength({ min: 2, max: 220 })
    .withMessage('Dashboard greeting is required'),
  body('itemsPerPage').isInt({ min: 5, max: 100 }).withMessage('Items per page must be between 5 and 100'),
  body('notificationsEnabled').isBoolean().withMessage('Notifications flag must be boolean'),
  body('contactHeadline')
    .trim()
    .isLength({ min: 2, max: 180 })
    .withMessage('Contact headline must be between 2 and 180 characters'),
  body('contactDescription')
    .trim()
    .isLength({ min: 2, max: 360 })
    .withMessage('Contact description must be between 2 and 360 characters'),
  body('contactEmail').trim().isEmail().withMessage('A valid contact email is required'),
  body('contactPhone')
    .trim()
    .isLength({ min: 4, max: 40 })
    .withMessage('Contact phone must be between 4 and 40 characters'),
  body('contactLocation')
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage('Contact location must be between 2 and 120 characters'),
]

router.get('/public', getPublicSettings)
router.use(requireAuth, authorize(PERMISSIONS.MANAGE_SETTINGS))
router.get('/', getSettings)
router.put('/', [...settingsValidation, validateRequest], updateSettings)

module.exports = router
