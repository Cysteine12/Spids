import API from '../../libs/api'
import type { CreateFingerprintSchema, UpdateFingerprintSchema } from './schema'

const getFingerprintsByStudent = async (studentId: string) => {
  const { data } = await API.get(`/api/fingerprints/student/${studentId}`)
  return data
}

const createFingerprint = async (payload: CreateFingerprintSchema) => {
  const { data } = await API.post(`/api/fingerprints`, payload)
  return data
}

const updateFingerprint = async (
  id: string,
  payload: UpdateFingerprintSchema
) => {
  const { data } = await API.patch(`/api/fingerprints/${id}`, payload)
  return data
}

const deleteFingerprint = async (id: string) => {
  const { data } = await API.get(`/api/fingerprints/${id}`)
  return data
}

export {
  getFingerprintsByStudent,
  createFingerprint,
  updateFingerprint,
  deleteFingerprint,
}
