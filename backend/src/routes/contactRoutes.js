const express = require('express')
const { body, param } = require('express-validator')
const {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contactController')
const validateRequest = require('../middleware/validateRequest')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

const createContactValidation = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage('Full name must be between 2 and 120 characters'),
  body('email').trim().isEmail().withMessage('A valid email is required'),
  body('phone')
    .trim()
    .isLength({ min: 6, max: 40 })
    .withMessage('Phone number must be between 6 and 40 characters')
    .matches(/^[+0-9()\-\s.]+$/)
    .withMessage('Phone number contains invalid characters'),
  body('subject')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Subject must be between 3 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 3000 })
    .withMessage('Message must be between 10 and 3000 characters'),
]

const statusValidation = [
  body('status').isIn(['new', 'read', 'replied']).withMessage('Invalid status value'),
]

const idValidation = [param('id').isMongoId().withMessage('Invalid id')]

router.post('/', [...createContactValidation, validateRequest], submitContact)

router.get('/', requireAuth, getContacts)
router.get('/:id', [requireAuth, ...idValidation, validateRequest], getContactById)
router.patch(
  '/:id/status',
  [requireAuth, ...idValidation, ...statusValidation, validateRequest],
  updateContactStatus,
)
router.delete('/:id', [requireAuth, ...idValidation, validateRequest], deleteContact)

module.exports = router
