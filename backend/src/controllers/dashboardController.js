const Project = require('../models/Project')
const Service = require('../models/Service')
const Skill = require('../models/Skill')
const Experience = require('../models/Experience')
const Testimonial = require('../models/Testimonial')
const Contact = require('../models/Contact')
const asyncHandler = require('../utils/asyncHandler')

const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const [
    projects,
    featuredProjects,
    services,
    skills,
    experience,
    testimonials,
    messages,
    unreadMessages,
    recentMessages,
    recentProjects,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ featured: true }),
    Service.countDocuments(),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Testimonial.countDocuments(),
    Contact.countDocuments(),
    Contact.countDocuments({ status: 'new' }),
    Contact.find().sort({ createdAt: -1 }).limit(5).lean(),
    Project.find().sort({ createdAt: -1 }).limit(5).lean(),
  ])

  res.json({
    success: true,
    data: {
      totals: {
        projects,
        featuredProjects,
        services,
        skills,
        experience,
        testimonials,
        messages,
        unreadMessages,
      },
      recentMessages,
      recentProjects,
    },
  })
})

module.exports = {
  getDashboardAnalytics,
}
