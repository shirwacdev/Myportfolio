const Experience = require('../models/Experience')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/apiError')

const buildExperiencePayload = (payload) => ({
  role: payload.role,
  company: payload.company,
  year: payload.year,
  description: payload.description,
  order: Number(payload.order || 0),
})

const getExperience = asyncHandler(async (req, res) => {
  const entries = await Experience.find().sort({ order: 1, createdAt: -1 }).lean()

  res.json({
    success: true,
    data: entries,
  })
})

const getExperienceById = asyncHandler(async (req, res) => {
  const entry = await Experience.findById(req.params.id).lean()

  if (!entry) {
    throw new ApiError('Experience item not found', 404)
  }

  res.json({
    success: true,
    data: entry,
  })
})

const createExperience = asyncHandler(async (req, res) => {
  const entry = await Experience.create(buildExperiencePayload(req.body))

  res.status(201).json({
    success: true,
    message: 'Experience item created successfully',
    data: entry,
  })
})

const updateExperience = asyncHandler(async (req, res) => {
  const entry = await Experience.findByIdAndUpdate(req.params.id, buildExperiencePayload(req.body), {
    new: true,
    runValidators: true,
  })

  if (!entry) {
    throw new ApiError('Experience item not found', 404)
  }

  res.json({
    success: true,
    message: 'Experience item updated successfully',
    data: entry,
  })
})

const deleteExperience = asyncHandler(async (req, res) => {
  const entry = await Experience.findByIdAndDelete(req.params.id)

  if (!entry) {
    throw new ApiError('Experience item not found', 404)
  }

  res.json({
    success: true,
    message: 'Experience item deleted successfully',
  })
})

module.exports = {
  getExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
}
