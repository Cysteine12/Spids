import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { LoginSchema } from './schema'
import { login, logout } from './api'
import { useAuthStore } from './store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import type { AxiosError } from 'axios'
import type { APIResponse } from '../../types'

const useLogin = () => {
  const queryClient = useQueryClient()
  const { login: storeLogin } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: LoginSchema) => login(payload),
    onSuccess: (data) => {
      storeLogin(data.user)
      queryClient.invalidateQueries({ queryKey: ['login'] })
      toast.success(data.message)
      navigate('/dashboard')
    },
    onError: (data: AxiosError<APIResponse>) => {
      toast.error(data.response?.data?.message)
    },
  })
}

const useLogout = () => {
  const queryClient = useQueryClient()
  const { logout: storeLogout } = useAuthStore()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      storeLogout()
      queryClient.clear()
    },
  })
}

export { useLogin, useLogout }
