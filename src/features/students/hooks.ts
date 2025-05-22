import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createStudent,
  getStudent,
  getStudents,
  searchStudentsByMatric,
} from './api'
import type { APIResponse, Pagination } from '../../types'
import type { CreateStudentSchema } from './schema'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import type { AxiosError } from 'axios'

const useStudents = (query: Pagination) => {
  return useQuery({
    queryFn: () => getStudents(query),
    queryKey: ['students'],
  })
}

const useSearchStudentsByMatric = () => {
  return useMutation({
    mutationFn: ({
      matricNo,
      query,
    }: {
      matricNo: string
      query: Pagination
    }) => searchStudentsByMatric(matricNo, query),
    mutationKey: ['searchStudents'],
  })
}

const useStudent = (id: string | undefined) => {
  return useQuery({
    queryFn: () => getStudent(id!),
    queryKey: ['student', id],
    enabled: !!id,
  })
}

const useCreateStudent = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateStudentSchema) => createStudent(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['login'] })
      toast.success(data.message)
      navigate(`/students/${data.data.id}`)
    },
    onError: (data: AxiosError<APIResponse>) => {
      toast.error(data.response?.data?.message)
    },
  })
}
export { useStudents, useSearchStudentsByMatric, useStudent, useCreateStudent }
