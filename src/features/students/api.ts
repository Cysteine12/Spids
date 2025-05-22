import API from '../../libs/api'
import type { Pagination } from '../../types'
import type { CreateStudentSchema, UpdateStudentSchema } from './schema'

const getStudents = async ({ page, limit }: Pagination) => {
  const { data } = await API.get(`/api/students?page=${page}&limit=${limit}`)
  return data
}

const searchStudentsByMatric = async (
  matricNo: string,
  { page, limit }: Pagination
) => {
  const { data } = await API.get(
    `/api/students/search?search=${matricNo}&page=${page}&limit=${limit}`
  )
  return data
}

const getStudent = async (id: string) => {
  const { data } = await API.get(`/api/students/${id}`)
  return data
}

const createStudent = async (payload: CreateStudentSchema) => {
  const { data } = await API.post(`/api/students`, payload)
  return data
}

const updateStudent = async (id: string, payload: UpdateStudentSchema) => {
  const { data } = await API.patch(`/api/students/${id}`, payload)
  return data
}

const deleteStudent = async (id: string) => {
  const { data } = await API.get(`/api/students/${id}`)
  return data
}

export {
  getStudents,
  searchStudentsByMatric,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
}
