import { create } from 'zustand'
import type { Student } from './types'

type StudentState = {
  students: Student[]
  setStudents: (students: Student[]) => void
}

export const useStudentStore = create<StudentState>()((set) => ({
  students: [],
  setStudents: (students) => set({ students }),
}))
