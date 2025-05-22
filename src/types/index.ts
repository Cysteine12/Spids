export interface APIResponse<T = unknown> {
  success: true
  message?: string
  data?: T
  user?: undefined
}

export interface Admin {
  id: string
  email: string
  firstName: string
  lastName: string
  role: AdminRole
  createdAt: string
  updatedAt: string
}

export type AdminRole = 'SUPERADMIN' | 'ENROLLER' | 'AUTHENTICATOR'

export interface Pagination {
  page: number
  limit: number
}
