const Contact = require('../models/Contact')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/apiError')

const submitContact = asyncHandler(async (req, res) => {
  const { fullName, email, phone, subject, message } = req.body

  const submission = await Contact.create({
    fullName,
    email,
    phone,
    subject,
    message,
  })

  res.status(201).json({
    success: true,
    message: 'Inquiry submitted successfully',
    data: {
      id: submission._id,
      createdAt: submission.createdAt,
    },
  })
})

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 }).lean()

  res.json({
    success: true,
    data: contacts,
  })
})

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id).lean()

  if (!contact) {
    throw new ApiError('Message not found', 404)
  }

  res.json({
    success: true,
    data: contact,
  })
})

const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status },
    {
      new: true,
      runValidators: true,
    },
  )

  if (!contact) {
    throw new ApiError('Message not found', 404)
  }

  res.json({
    success: true,
    message: 'Message status updated successfully',
    data: contact,
  })
})

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id)

  if (!contact) {
    throw new ApiError('Message not found', 404)
  }

  res.json({
    success: true,
    message: 'Message deleted successfully',
  })
})

module.exports = {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
}
