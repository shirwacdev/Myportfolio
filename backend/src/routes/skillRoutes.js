const express = require('express')
const { body, param } = require('express-validator')
const {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/skillController')
const validateRequest = require('../middleware/validateRequest')
const requireAuth = require('../middleware/requireAuth')
const authorize = require('../middleware/authorize')
const { PERMISSIONS } = require('../utils/permissions')

const router = express.Router()

const skillValidation = [
  body('name').trim().isLength({ min: 2, max: 120 }).withMessage('Name is required'),
  body('level').isFloat({ min: 0, max: 100 }).withMessage('Level must be between 0 and 100'),
  body('category').optional().trim().isLength({ max: 80 }).withMessage('Category is too long'),
  body('highlight').optional().isBoolean().withMessage('Highlight must be boolean'),
  body('order').optional().isNumeric().withMessage('Order must be numeric'),
]

const idValidation = [param('id').isMongoId().withMessage('Invalid id')]

router.get('/', getSkills)
router.get('/:id', [...idValidation, validateRequest], getSkillById)
router.post('/', [requireAuth, authorize(PERMISSIONS.MANAGE_SKILLS), ...skillValidation, validateRequest], createSkill)
router.put('/:id', [requireAuth, authorize(PERMISSIONS.MANAGE_SKILLS), ...idValidation, ...skillValidation, validateRequest], updateSkill)
router.delete('/:id', [requireAuth, authorize(PERMISSIONS.MANAGE_SKILLS), ...idValidation, validateRequest], deleteSkill)

module.exports = router
