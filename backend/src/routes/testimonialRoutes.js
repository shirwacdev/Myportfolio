const express = require('express')
const { body, param } = require('express-validator')
const {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController')
const validateRequest = require('../middleware/validateRequest')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

const testimonialValidation = [
  body('quote')
    .trim()
    .isLength({ min: 10, max: 1200 })
    .withMessage('Quote must be between 10 and 1200 characters'),
  body('clientName').trim().isLength({ min: 2, max: 120 }).withMessage('Client name is required'),
  body('role').trim().isLength({ min: 2, max: 120 }).withMessage('Role is required'),
  body('company').trim().isLength({ min: 2, max: 120 }).withMessage('Company is required'),
  body('avatar').optional({ values: 'falsy' }).isURL().withMessage('Avatar must be a valid URL'),
  body('rating').optional().isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('order').optional().isNumeric().withMessage('Order must be numeric'),
]

const idValidation = [param('id').isMongoId().withMessage('Invalid id')]

router.get('/', getTestimonials)
router.get('/:id', [...idValidation, validateRequest], getTestimonialById)
router.post('/', [requireAuth, ...testimonialValidation, validateRequest], createTestimonial)
router.put('/:id', [requireAuth, ...idValidation, ...testimonialValidation, validateRequest], updateTestimonial)
router.delete('/:id', [requireAuth, ...idValidation, validateRequest], deleteTestimonial)

module.exports = router
