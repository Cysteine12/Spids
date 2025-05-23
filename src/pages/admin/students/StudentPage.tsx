import LayoutHeading from '../../../components/LayoutHeading'
import { useStudent, type Student } from '../../../features/students'
import type { APIResponse } from '../../../types'
import { toast } from 'react-toastify'
import type { AxiosError } from 'axios'
import { formatDateIntl } from '../../../utils/dateFormatter'
import Suspense from '../../../components/Suspense'
import { useNavigate, useParams } from 'react-router'
import Button from '../../../components/ui/Button'
import { FaFingerprint } from 'react-icons/fa'
import type { Fingerprint } from '../../../features/fingerprints'

const StudentPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data: studentRes, isLoading, error } = useStudent(id)
  if (error)
    toast.error((error as AxiosError<APIResponse>).response?.data?.message)

  const student = studentRes?.data as Student & { fingerprints: Fingerprint[] }

  return (
    <main>
      <LayoutHeading
        title="Student Details"
        routes={[{ name: 'Students', path: '/students' }, { name: 'Student' }]}
      />

      <Suspense isLoading={isLoading}>
        <div className="row">
          {/* <!-- Area Chart --> */}
          <div className="col-xl-6 col-lg-7">
            <div className="card shadow mb-4">
              {/* <!-- Card Header - Dropdown --> */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-dark">
                  Student Overview
                </h6>
                <div className="dropdown no-arrow">
                  <a
                    className="dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div className="dropdown-header">Manage:</div>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </div>
              </div>
              {/* <!-- Card Body --> */}
              <div className="card-body">
                <table>
                  <tbody>
                    <tr>
                      <td className="p-2 text-nowrap">Student Matric</td>
                      <td className="p-2 pl-2 w-100 text-uppercase">
                        <div className="bg-gray-200 pl-2">
                          {student?.matricNo}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-nowrap">Student Name</td>
                      <td className="p-2 pl-2 w-100 text-capitalize">
                        <div className="bg-gray-200 pl-2">
                          {student?.firstName} {student?.lastName}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-nowrap">Student Email</td>
                      <td className="p-2 pl-2 w-100 text-lowercase">
                        <div className="bg-gray-200 pl-2">{student?.email}</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-nowrap">Last Updated</td>
                      <td className="p-2 pl-2 w-100 text-capitalize">
                        <div className="bg-gray-200 pl-2">
                          {formatDateIntl(student?.updatedAt)}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-nowrap">Enrollment Status</td>
                      <td className="p-2 pl-2 w-100 text-capitalize">
                        <div className="bg-gray-200 pl-2">
                          {student?.fingerprints?.length === 5 && 'Enrolled'}
                          {student?.fingerprints?.length < 5 && (
                            <>
                              <span>
                                {student?.fingerprints?.length > 0
                                  ? 'Incomplete'
                                  : 'Not Enrolled'}
                              </span>
                              <Button
                                onClick={() =>
                                  navigate(`/fingerprints/${student.id}/enroll`)
                                }
                                className="mx-auto btn-sm ml-1 bg-dark"
                              >
                                <FaFingerprint className="mr-1" /> Enroll
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  )
}
export default StudentPage
