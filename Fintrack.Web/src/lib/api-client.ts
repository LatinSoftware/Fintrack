import axios from 'axios'

const BASE_URL = "/api"

const USER_ID = "df423648-e1b9-49d5-ad5b-4014b433a4fd"


export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error?.response?.data?.message || 'Unexpected error'
    console.error('API error:', message)
    return Promise.reject(error.response?.data || error.message)
  },
)

api.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params, // Preserve existing params
      userId: USER_ID, // Add the user_id param
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
