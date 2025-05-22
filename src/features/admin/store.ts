import { create } from 'zustand'

type AdminState = {
  data: null
  setProfile: (data: undefined) => void
}

export const useAdminStore = create<AdminState>()((set) => ({
  data: null,
  setProfile: (data) => set({ data }),
}))
