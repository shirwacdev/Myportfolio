const PERMISSIONS = Object.freeze({
  VIEW_DASHBOARD: 'view_dashboard',
  MANAGE_PROJECTS: 'manage_projects',
  MANAGE_SERVICES: 'manage_services',
  MANAGE_SKILLS: 'manage_skills',
  MANAGE_EXPERIENCE: 'manage_experience',
  MANAGE_TESTIMONIALS: 'manage_testimonials',
  MANAGE_MESSAGES: 'manage_messages',
  MANAGE_SETTINGS: 'manage_settings',
  MANAGE_USERS: 'manage_users',
})

const ALL_PERMISSIONS = Object.freeze(Object.values(PERMISSIONS))

const ROLE_DEFAULT_PERMISSIONS = Object.freeze({
  super_admin: ALL_PERMISSIONS,
  admin: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.MANAGE_PROJECTS,
    PERMISSIONS.MANAGE_SERVICES,
    PERMISSIONS.MANAGE_SKILLS,
    PERMISSIONS.MANAGE_EXPERIENCE,
    PERMISSIONS.MANAGE_TESTIMONIALS,
    PERMISSIONS.MANAGE_MESSAGES,
    PERMISSIONS.MANAGE_SETTINGS,
    PERMISSIONS.MANAGE_USERS,
  ],
  editor: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.MANAGE_PROJECTS,
    PERMISSIONS.MANAGE_SERVICES,
    PERMISSIONS.MANAGE_SKILLS,
    PERMISSIONS.MANAGE_EXPERIENCE,
    PERMISSIONS.MANAGE_TESTIMONIALS,
  ],
  viewer: [PERMISSIONS.VIEW_DASHBOARD],
})

const USER_ROLES = Object.freeze(Object.keys(ROLE_DEFAULT_PERMISSIONS))

const normalizePermissions = (permissions = []) => {
  if (!Array.isArray(permissions)) return []
  return Array.from(new Set(permissions.filter((permission) => ALL_PERMISSIONS.includes(permission))))
}

const getDefaultPermissionsForRole = (role) => normalizePermissions(ROLE_DEFAULT_PERMISSIONS[role] || [])

const resolvePermissions = ({ role, permissions }) => {
  if (role === 'super_admin') {
    return [...ALL_PERMISSIONS]
  }

  if (Array.isArray(permissions) && permissions.length > 0) {
    return normalizePermissions(permissions)
  }

  return getDefaultPermissionsForRole(role)
}

module.exports = {
  PERMISSIONS,
  ALL_PERMISSIONS,
  USER_ROLES,
  ROLE_DEFAULT_PERMISSIONS,
  normalizePermissions,
  getDefaultPermissionsForRole,
  resolvePermissions,
}
