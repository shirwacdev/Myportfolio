const Service = require('../models/Service')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/apiError')

const buildServicePayload = (payload) => ({
  title: payload.title,
  description: payload.description,
  icon: payload.icon || '',
  order: Number(payload.order || 0),
})

const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ order: 1, createdAt: -1 }).lean()

  res.json({
    success: true,
    data: services,
  })
})

const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id).lean()

  if (!service) {
    throw new ApiError('Service not found', 404)
  }

  res.json({
    success: true,
    data: service,
  })
})

const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(buildServicePayload(req.body))

  res.status(201).json({
    success: true,
    message: 'Service created successfully',
    data: service,
  })
})

const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, buildServicePayload(req.body), {
    new: true,
    runValidators: true,
  })

  if (!service) {
    throw new ApiError('Service not found', 404)
  }

  res.json({
    success: true,
    message: 'Service updated successfully',
    data: service,
  })
})

const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id)

  if (!service) {
    throw new ApiError('Service not found', 404)
  }

  res.json({
    success: true,
    message: 'Service deleted successfully',
  })
})

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
}
