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

export const clearAdminSession = () => {
  if (!hasWindow()) return

  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(USER_KEY)
  window.sessionStorage.removeItem(TOKEN_KEY)
  window.sessionStorage.removeItem(USER_KEY)
}

export const isAdminAuthenticated = () => Boolean(getAdminToken())
