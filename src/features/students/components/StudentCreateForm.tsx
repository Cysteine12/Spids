import type { FormEvent, ChangeEvent } from 'react'
import Button from '../../../components/ui/Button'
import { createStudentSchema, type CreateStudentSchema } from '../schema'
import { validate } from '../../../utils/validate'

interface Props {
  formData: CreateStudentSchema
  setFormData: (formData: CreateStudentSchema) => void
  handleSubmit: () => void
  isLoading: boolean
}

const StudentCreateForm = ({
  formData,
  setFormData,
  handleSubmit,
  isLoading,
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const submitForm = async (e: FormEvent) => {
    e.preventDefault()

    validate(createStudentSchema, formData)

    handleSubmit()
  }

  return (
    <form onSubmit={submitForm} className="user">
      <div className="form-group row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <label htmlFor="exampleFirstName" className="form-label text-primary">
            First Name*
          </label>
          <input
            value={formData.firstName}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="exampleFirstName"
            name="firstName"
            placeholder="First Name"
            required
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="exampleLastName" className="form-label text-primary">
            Last Name*
          </label>
          <input
            value={formData.lastName}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="exampleLastName"
            name="lastName"
            placeholder="Last Name"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail" className="form-label text-primary">
          Confirmed Email*
        </label>
        <input
          value={formData.email}
          onChange={handleChange}
          type="email"
          className="form-control"
          id="exampleInputEmail"
          name="email"
          placeholder="Email Address"
          required
        />
      </div>
      <div className="form-group">
        <label
          htmlFor="exampleInputMatricNo"
          className="form-label text-primary"
        >
          Matric*
        </label>
        <input
          value={formData.matricNo}
          onChange={handleChange}
          type="text"
          className="form-control"
          id="exampleInputMatricNo"
          name="matricNo"
          placeholder="Matric Number"
          required
        />
      </div>

      <Button
        type="submit"
        text="Add Student"
        className="btn-user btn-block btn-dark mt-4 py-2"
        loading={isLoading}
        disabled={isLoading}
      />
    </form>
  )
}
export default StudentCreateForm
