const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const parseApiResponse = async (response) => {
  const data = await response.json()

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Request failed')
  }

  return data.data
}

export const getApiBaseUrl = () => API_BASE_URL

export const fetchCollection = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`)
  return parseApiResponse(response)
}

export const fetchPublicSettings = async () => {
  const response = await fetch(`${API_BASE_URL}/settings/public`)
  return parseApiResponse(response)
}

export const submitContactForm = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse(response)
}

