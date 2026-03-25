require('dotenv').config()
const mongoose = require('mongoose')
const connectDatabase = require('../config/database')
const Project = require('../models/Project')
const Service = require('../models/Service')
const Skill = require('../models/Skill')
const Testimonial = require('../models/Testimonial')
const Experience = require('../models/Experience')
const Settings = require('../models/Settings')
const { projects, services, skills, testimonials, experience, settings } = require('./sampleData')

const seedDatabase = async () => {
  try {
    await connectDatabase()

    await Promise.all([
      Project.deleteMany({}),
      Service.deleteMany({}),
      Skill.deleteMany({}),
      Testimonial.deleteMany({}),
      Experience.deleteMany({}),
      Settings.deleteMany({}),
    ])

    await Promise.all([
      Project.insertMany(projects),
      Service.insertMany(services),
      Skill.insertMany(skills),
      Testimonial.insertMany(testimonials),
      Experience.insertMany(experience),
      Settings.create(settings),
    ])

    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Seed failed:', error.message)
    process.exitCode = 1
  } finally {
    await mongoose.connection.close()
  }
}

seedDatabase()
