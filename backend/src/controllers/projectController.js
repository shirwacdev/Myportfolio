const Project = require('../models/Project')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/apiError')

const normalizeTechStack = (techStack) => {
  if (Array.isArray(techStack)) {
    return techStack.map((item) => String(item).trim()).filter(Boolean)
  }

  if (typeof techStack === 'string') {
    return techStack
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

const buildProjectPayload = (payload) => ({
  title: payload.title,
  description: payload.description,
  image: payload.image,
  category: payload.category,
  techStack: normalizeTechStack(payload.techStack),
  liveDemo: payload.liveDemo || '',
  github: payload.github || '',
  featured: Boolean(payload.featured),
  order: Number(payload.order || 0),
})

const getProjects = asyncHandler(async (req, res) => {
  const filter = {}

  if (typeof req.query.featured !== 'undefined') {
    filter.featured = req.query.featured === 'true'
  }

  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 }).lean()

  res.json({
    success: true,
    data: projects,
  })
})

const getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ featured: true }).sort({ order: 1, createdAt: -1 }).lean()

  res.json({
    success: true,
    data: projects,
  })
})

const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).lean()

  if (!project) {
    throw new ApiError('Project not found', 404)
  }

  res.json({
    success: true,
    data: project,
  })
})

const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(buildProjectPayload(req.body))

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project,
  })
})

const updateProject = asyncHandler(async (req, res) => {
  const payload = buildProjectPayload(req.body)
  const project = await Project.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  })

  if (!project) {
    throw new ApiError('Project not found', 404)
  }

  res.json({
    success: true,
    message: 'Project updated successfully',
    data: project,
  })
})

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id)

  if (!project) {
    throw new ApiError('Project not found', 404)
  }

  res.json({
    success: true,
    message: 'Project deleted successfully',
  })
})

module.exports = {
  getProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
}
