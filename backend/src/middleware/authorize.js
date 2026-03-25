const ApiError = require('../utils/apiError')

const authorize = (requiredPermissions = []) => {
  const permissionList = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions]

  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError('Unauthorized', 401))
    }

    if (req.user.role === 'super_admin') {
      return next()
    }

    const userPermissions = req.user.permissions || []
    const isAllowed = permissionList.every((permission) => userPermissions.includes(permission))

    if (!isAllowed) {
      return next(new ApiError('Forbidden: insufficient permissions', 403))
    }

    return next()
  }
}

module.exports = authorize
