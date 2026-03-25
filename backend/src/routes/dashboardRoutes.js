const express = require('express')
const { getDashboardAnalytics } = require('../controllers/dashboardController')
const requireAuth = require('../middleware/requireAuth')
const authorize = require('../middleware/authorize')
const { PERMISSIONS } = require('../utils/permissions')

const router = express.Router()

router.use(requireAuth, authorize(PERMISSIONS.VIEW_DASHBOARD))
router.get('/analytics', getDashboardAnalytics)

module.exports = router
