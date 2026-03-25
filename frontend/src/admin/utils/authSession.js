const TOKEN_KEY = 'shirwac_admin_token'
const USER_KEY = 'shirwac_admin_user'

const hasWindow = () => typeof window !== 'undefined'

const parseUser = (value) => {
  if (!value) return null

  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export const setAdminSession = ({ token, user, remember = true }) => {
  if (!hasWindow()) return

  const primaryStorage = remember ? window.localStorage : window.sessionStorage
  const secondaryStorage = remember ? window.sessionStorage : window.localStorage

  primaryStorage.setItem(TOKEN_KEY, token)
  primaryStorage.setItem(USER_KEY, JSON.stringify(user || {}))

  secondaryStorage.removeItem(TOKEN_KEY)
  secondaryStorage.removeItem(USER_KEY)
}

export const getAdminToken = () => {
  if (!hasWindow()) return null

  return window.localStorage.getItem(TOKEN_KEY) || window.sessionStorage.getItem(TOKEN_KEY)
}

export const getAdminUser = () => {
  if (!hasWindow()) return null

  return (
    parseUser(window.localStorage.getItem(USER_KEY)) ||
    parseUser(window.sessionStorage.getItem(USER_KEY))
  )
}

export const setAdminUser = (user) => {
  if (!hasWindow()) return

  const localToken = window.localStorage.getItem(TOKEN_KEY)
  const sessionToken = window.sessionStorage.getItem(TOKEN_KEY)

  if (localToken) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user || {}))
  }

  if (sessionToken) {
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user || {}))
  }
}

export const clearAdminSession = () => {
  if (!hasWindow()) return

  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(USER_KEY)
  window.sessionStorage.removeItem(TOKEN_KEY)
  window.sessionStorage.removeItem(USER_KEY)
}

export const isAdminAuthenticated = () => Boolean(getAdminToken())

export const hasAdminPermission = (permission) => {
  if (!permission) return true

  const user = getAdminUser()
  if (!user) return false
  if (user.role === 'super_admin') return true

  const permissions = Array.isArray(user.permissions) ? user.permissions : []
  return permissions.includes(permission)
}
