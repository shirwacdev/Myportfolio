const Skill = require('../models/Skill')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/apiError')

const buildSkillPayload = (payload) => ({
  name: payload.name,
  level: Number(payload.level),
  category: payload.category || 'Engineering',
  highlight: Boolean(payload.highlight),
  order: Number(payload.order || 0),
})

const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ order: 1, createdAt: -1 }).lean()

  res.json({
    success: true,
    data: skills,
  })
})

const getSkillById = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id).lean()

  if (!skill) {
    throw new ApiError('Skill not found', 404)
  }

  res.json({
    success: true,
    data: skill,
  })
})

const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(buildSkillPayload(req.body))

  res.status(201).json({
    success: true,
    message: 'Skill created successfully',
    data: skill,
  })
})

const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, buildSkillPayload(req.body), {
    new: true,
    runValidators: true,
  })

  if (!skill) {
    throw new ApiError('Skill not found', 404)
  }

  res.json({
    success: true,
    message: 'Skill updated successfully',
    data: skill,
  })
})

const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id)

  if (!skill) {
    throw new ApiError('Skill not found', 404)
  }

  res.json({
    success: true,
    message: 'Skill deleted successfully',
  })
})

module.exports = {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
}
