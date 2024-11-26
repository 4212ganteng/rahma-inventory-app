import axios from 'axios'

const api_url = process.env.NEXT_PUBLIC_API_URL

const api_v1 = axios.create({
  baseURL: `${api_url}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

api_v1.interceptors.request.use(
  async config => {
    try {
      const token = window.localStorage.getItem('accessToken')

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    } catch (error) {
      return Promise.reject(error)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default api_v1
