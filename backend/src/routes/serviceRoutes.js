const express = require('express')
const { body, param } = require('express-validator')
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController')
const validateRequest = require('../middleware/validateRequest')
const requireAuth = require('../middleware/requireAuth')
const authorize = require('../middleware/authorize')
const { PERMISSIONS } = require('../utils/permissions')

const router = express.Router()

const serviceValidation = [
  body('title').trim().isLength({ min: 2, max: 140 }).withMessage('Title is required'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 600 })
    .withMessage('Description must be between 10 and 600 characters'),
  body('icon').optional().trim().isLength({ max: 80 }).withMessage('Icon value is too long'),
  body('order').optional().isNumeric().withMessage('Order must be numeric'),
]

const idValidation = [param('id').isMongoId().withMessage('Invalid id')]

router.get('/', getServices)
router.get('/:id', [...idValidation, validateRequest], getServiceById)
router.post('/', [requireAuth, authorize(PERMISSIONS.MANAGE_SERVICES), ...serviceValidation, validateRequest], createService)
router.put('/:id', [requireAuth, authorize(PERMISSIONS.MANAGE_SERVICES), ...idValidation, ...serviceValidation, validateRequest], updateService)
router.delete('/:id', [requireAuth, authorize(PERMISSIONS.MANAGE_SERVICES), ...idValidation, validateRequest], deleteService)

module.exports = router
