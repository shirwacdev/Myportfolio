const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      trim: true,
      default: 'Shirwac Dev',
      maxlength: 120,
    },
    adminEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: 'shirwac.dev@gmail.com',
      maxlength: 160,
    },
    timezone: {
      type: String,
      trim: true,
      default: 'Africa/Nairobi',
      maxlength: 80,
    },
    dashboardGreeting: {
      type: String,
      trim: true,
      default: 'Welcome back, Shirwac.',
      maxlength: 220,
    },
    itemsPerPage: {
      type: Number,
      min: 5,
      max: 100,
      default: 12,
    },
    notificationsEnabled: {
      type: Boolean,
      default: true,
    },
    contactHeadline: {
      type: String,
      trim: true,
      default: "Let's build something legacy.",
      maxlength: 180,
    },
    contactDescription: {
      type: String,
      trim: true,
      default: 'I am currently taking on select high-impact projects. Reach out to discuss your technical vision.',
      maxlength: 360,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: 'shirwac.dev@gmail.com',
      maxlength: 160,
    },
    contactPhone: {
      type: String,
      trim: true,
      default: '+252615835675',
      maxlength: 40,
    },
    contactLocation: {
      type: String,
      trim: true,
      default: 'Nairobi, Kenya',
      maxlength: 120,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Settings', settingsSchema)

