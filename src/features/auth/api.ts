import API from '../../libs/api'
import type { LoginSchema } from './schema'

const login = async (payload: LoginSchema) => {
  const { data } = await API.post('/api/auth/login', payload)
  return data
}

const logout = async () => {
  const { data } = await API.post('/api/auth/logout')
  return data
}

export { login, logout }
