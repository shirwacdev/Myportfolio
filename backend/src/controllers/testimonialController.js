const Testimonial = require('../models/Testimonial')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/apiError')

const buildTestimonialPayload = (payload) => ({
  quote: payload.quote,
  clientName: payload.clientName,
  role: payload.role,
  company: payload.company,
  avatar: payload.avatar || '',
  rating: Number(payload.rating || 5),
  order: Number(payload.order || 0),
})

const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 }).lean()

  res.json({
    success: true,
    data: testimonials,
  })
})

const getTestimonialById = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id).lean()

  if (!testimonial) {
    throw new ApiError('Testimonial not found', 404)
  }

  res.json({
    success: true,
    data: testimonial,
  })
})

const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(buildTestimonialPayload(req.body))

  res.status(201).json({
    success: true,
    message: 'Testimonial created successfully',
    data: testimonial,
  })
})

const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, buildTestimonialPayload(req.body), {
    new: true,
    runValidators: true,
  })

  if (!testimonial) {
    throw new ApiError('Testimonial not found', 404)
  }

  res.json({
    success: true,
    message: 'Testimonial updated successfully',
    data: testimonial,
  })
})

const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id)

  if (!testimonial) {
    throw new ApiError('Testimonial not found', 404)
  }

  res.json({
    success: true,
    message: 'Testimonial deleted successfully',
  })
})

module.exports = {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
}
