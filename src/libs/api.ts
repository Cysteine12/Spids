import axios from 'axios'
import { toast } from 'react-toastify'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 429) {
      toast.error(error.response?.message)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await API.post(`/api/auth/refresh-token`)

        return API(originalRequest)
      } catch (err) {
        await API.post(`/api/auth/logout`)
        localStorage.removeItem('auth')

        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)

export default API
