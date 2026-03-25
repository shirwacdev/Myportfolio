import { clearAdminSession, getAdminToken } from '../utils/authSession'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const request = async (path, options = {}, config = {}) => {
  const token = getAdminToken()
  const useAuth = config.auth !== false

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(useAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json()

  if (response.status === 401) {
    clearAdminSession()
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      window.location.assign('/admin/login')
    }
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Request failed')
  }

  return data.data
}

export const loginAdmin = (payload) =>
  request(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    { auth: false },
  )

export const getCurrentAdmin = () => request('/auth/me')

export const fetchCollection = (resource) => request(`/${resource}`)
export const fetchItem = (resource, id) => request(`/${resource}/${id}`)
export const createItem = (resource, payload) =>
  request(`/${resource}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
export const updateItem = (resource, id, payload) =>
  request(`/${resource}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
export const deleteItem = (resource, id) =>
  request(`/${resource}/${id}`, {
    method: 'DELETE',
  })

export const fetchDashboardAnalytics = () => request('/dashboard/analytics')

export const updateMessageStatus = (id, status) =>
  request(`/contacts/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })

export const deleteMessage = (id) =>
  request(`/contacts/${id}`, {
    method: 'DELETE',
  })

export const fetchSettings = () => request('/settings')
export const updateSettings = (payload) =>
  request('/settings', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

export const getAdminApiBaseUrl = () => API_BASE_URL
