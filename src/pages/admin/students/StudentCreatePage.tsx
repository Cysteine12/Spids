import LayoutHeading from '../../../components/LayoutHeading'
import { StudentCreateForm, useCreateStudent } from '../../../features/students'
import { useState } from 'react'

const StudentCreatePage = () => {
  const { mutate: createStudent, isPending } = useCreateStudent()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    matricNo: '',
  })

  const handleSubmit = async () => {
    createStudent(formData)
  }

  return (
    <main>
      <LayoutHeading
        title="Add new student"
        routes={[{ name: 'Students', path: '/students' }, { name: 'Student' }]}
      />

      <div className="container-fluid row">
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-dark">
                Fill in the student details
              </h6>
            </div>

            <div className="card-body">
              <StudentCreateForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                isLoading={isPending}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default StudentCreatePage
