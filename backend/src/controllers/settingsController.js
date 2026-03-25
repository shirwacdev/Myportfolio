const Settings = require('../models/Settings')
const asyncHandler = require('../utils/asyncHandler')

const DEFAULT_SETTINGS = {
  brandName: 'Shirwac Dev',
  adminEmail: 'shirwac.dev@gmail.com',
  timezone: 'Africa/Nairobi',
  dashboardGreeting: 'Welcome back, Shirwac.',
  itemsPerPage: 12,
  notificationsEnabled: true,
  contactHeadline: "Let's build something legacy.",
  contactDescription:
    'I am currently taking on select high-impact projects. Reach out to discuss your technical vision.',
  contactEmail: 'shirwac.dev@gmail.com',
  contactPhone: '+252615835675',
  contactLocation: 'Nairobi, Kenya',
}

const getOrCreateSettings = async () => {
  let settings = await Settings.findOne()

  if (!settings) {
    settings = await Settings.create(DEFAULT_SETTINGS)
  }

  return settings
}

const getSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings()

  res.json({
    success: true,
    data: settings,
  })
})

const getPublicSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings()

  res.json({
    success: true,
    data: {
      brandName: settings.brandName,
      contactHeadline: settings.contactHeadline,
      contactDescription: settings.contactDescription,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      contactLocation: settings.contactLocation,
    },
  })
})

const updateSettings = asyncHandler(async (req, res) => {
  const current = await getOrCreateSettings()

  const updates = {
    brandName: req.body.brandName,
    adminEmail: req.body.adminEmail,
    timezone: req.body.timezone,
    dashboardGreeting: req.body.dashboardGreeting,
    itemsPerPage: Number(req.body.itemsPerPage),
    notificationsEnabled: Boolean(req.body.notificationsEnabled),
    contactHeadline: req.body.contactHeadline,
    contactDescription: req.body.contactDescription,
    contactEmail: req.body.contactEmail,
    contactPhone: req.body.contactPhone,
    contactLocation: req.body.contactLocation,
  }

  const settings = await Settings.findByIdAndUpdate(current._id, updates, {
    new: true,
    runValidators: true,
  })

  res.json({
    success: true,
    message: 'Settings updated successfully',
    data: settings,
  })
})

module.exports = {
  getSettings,
  getPublicSettings,
  updateSettings,
}

