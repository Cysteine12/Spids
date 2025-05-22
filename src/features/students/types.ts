import type { CreateStudentSchema } from './schema'

export type Student = CreateStudentSchema & {
  id: string
  createdAt: string
  updatedAt: string
}
