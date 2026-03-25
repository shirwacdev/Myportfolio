const express = require('express')
const { body, param } = require('express-validator')
const {
  getProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController')
const validateRequest = require('../middleware/validateRequest')
const requireAuth = require('../middleware/requireAuth')
const authorize = require('../middleware/authorize')
const { PERMISSIONS } = require('../utils/permissions')

const router = express.Router()

const projectValidation = [
  body('title').trim().isLength({ min: 2, max: 180 }).withMessage('Title is required'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1200 })
    .withMessage('Description must be between 10 and 1200 characters'),
  body('image').trim().notEmpty().withMessage('Image URL is required'),
  body('category').trim().isLength({ min: 2, max: 80 }).withMessage('Category is required'),
  body('liveDemo').optional({ values: 'falsy' }).isURL().withMessage('Live demo must be a valid URL'),
  body('github').optional({ values: 'falsy' }).isURL().withMessage('GitHub must be a valid URL'),
  body('featured').optional().isBoolean().withMessage('Featured must be boolean'),
  body('order').optional().isNumeric().withMessage('Order must be numeric'),
]

const idValidation = [param('id').isMongoId().withMessage('Invalid id')]

router.get('/', getProjects)
router.get('/featured', getFeaturedProjects)
router.get('/:id', [...idValidation, validateRequest], getProjectById)
router.post('/', [requireAuth, authorize(PERMISSIONS.MANAGE_PROJECTS), ...projectValidation, validateRequest], createProject)
router.put('/:id', [requireAuth, authorize(PERMISSIONS.MANAGE_PROJECTS), ...idValidation, ...projectValidation, validateRequest], updateProject)
router.delete('/:id', [requireAuth, authorize(PERMISSIONS.MANAGE_PROJECTS), ...idValidation, validateRequest], deleteProject)

module.exports = router
