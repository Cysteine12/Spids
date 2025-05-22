import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Admin, AdminRole } from '../../types'

type AuthState = {
  user: Admin | null
  isAuthenticated: boolean
  userRole?: AdminRole | null
  login: (user: Admin) => void
  profile: (user: Admin) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      userRole: null,
      login: (user) => {
        set({ user, userRole: user.role, isAuthenticated: true })
      },
      profile: (user) => {
        set({ user, userRole: user.role, isAuthenticated: true })
      },
      logout: () => set({ user: null, userRole: null, isAuthenticated: false }),
    }),
    {
      name: 'auth',
    }
  )
)
