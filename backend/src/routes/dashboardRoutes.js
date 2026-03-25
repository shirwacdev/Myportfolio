const express = require('express')
const { getDashboardAnalytics } = require('../controllers/dashboardController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)
router.get('/analytics', getDashboardAnalytics)

module.exports = router
