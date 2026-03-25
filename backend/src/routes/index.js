const express = require('express')
const authRoutes = require('./authRoutes')
const projectRoutes = require('./projectRoutes')
const serviceRoutes = require('./serviceRoutes')
const skillRoutes = require('./skillRoutes')
const testimonialRoutes = require('./testimonialRoutes')
const experienceRoutes = require('./experienceRoutes')
const contactRoutes = require('./contactRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const settingsRoutes = require('./settingsRoutes')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/projects', projectRoutes)
router.use('/services', serviceRoutes)
router.use('/skills', skillRoutes)
router.use('/testimonials', testimonialRoutes)
router.use('/experience', experienceRoutes)
router.use('/contacts', contactRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/settings', settingsRoutes)

module.exports = router
