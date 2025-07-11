import { z } from 'zod'

const createFingerprintSchema = z.object({
  studentId: z.string().uuid(),
  template: z.string(),
  type: z.enum(['THUMB', 'INDEX', 'MIDDLE', 'RING', 'PINKY']),
})

export type CreateFingerprintSchema = z.infer<typeof createFingerprintSchema>

const updateFingerprintSchema = createFingerprintSchema.partial().extend({
  template: z.string(),
})

export type UpdateFingerprintSchema = z.infer<typeof updateFingerprintSchema>

export default {
  createFingerprintSchema,
  updateFingerprintSchema,
}
