const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    year: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1200,
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

module.exports = mongoose.model('Experience', experienceSchema)
