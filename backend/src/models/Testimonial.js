const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1200,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    avatar: {
      type: String,
      trim: true,
      default: '',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Testimonial', testimonialSchema)
