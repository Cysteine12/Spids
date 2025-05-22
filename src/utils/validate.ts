import { toast } from 'react-toastify'
import { Schema, ZodError } from 'zod'

const validate = <T>(schema: Schema, formData: T) => {
  return () => {
    try {
      schema.parse(formData)
    } catch (err: unknown) {
      toast.error((err as ZodError).errors[0].message)
    }
  }
}

export { validate }
