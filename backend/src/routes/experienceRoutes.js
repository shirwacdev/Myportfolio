const express = require('express')
const { body, param } = require('express-validator')
const {
  getExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} = require('../controllers/experienceController')
const validateRequest = require('../middleware/validateRequest')
const requireAuth = require('../middleware/requireAuth')
const authorize = require('../middleware/authorize')
const { PERMISSIONS } = require('../utils/permissions')

const router = express.Router()

const experienceValidation = [
  body('role').trim().isLength({ min: 2, max: 150 }).withMessage('Role is required'),
  body('company').trim().isLength({ min: 2, max: 150 }).withMessage('Company is required'),
  body('year').trim().isLength({ min: 2, max: 80 }).withMessage('Year is required'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1200 })
    .withMessage('Description must be between 10 and 1200 characters'),
  body('order').optional().isNumeric().withMessage('Order must be numeric'),
]

const idValidation = [param('id').isMongoId().withMessage('Invalid id')]

router.get('/', getExperience)
router.get('/:id', [...idValidation, validateRequest], getExperienceById)
router.post('/', [requireAuth, authorize(PERMISSIONS.MANAGE_EXPERIENCE), ...experienceValidation, validateRequest], createExperience)
router.put('/:id', [requireAuth, authorize(PERMISSIONS.MANAGE_EXPERIENCE), ...idValidation, ...experienceValidation, validateRequest], updateExperience)
router.delete('/:id', [requireAuth, authorize(PERMISSIONS.MANAGE_EXPERIENCE), ...idValidation, validateRequest], deleteExperience)

module.exports = router
