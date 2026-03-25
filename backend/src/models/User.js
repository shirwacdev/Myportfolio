const mongoose = require('mongoose')
const { ALL_PERMISSIONS, USER_ROLES } = require('../utils/permissions')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 40,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
      unique: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: 'admin',
    },
    permissions: {
      type: [String],
      default: [],
      validate: {
        validator: (permissions) => permissions.every((item) => ALL_PERMISSIONS.includes(item)),
        message: 'Invalid permission value found',
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.set('toJSON', {
  transform: (_, ret) => {
    delete ret.passwordHash
    return ret
  },
})

module.exports = mongoose.model('User', userSchema)
