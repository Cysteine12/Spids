import LayoutHeading from '../../../components/LayoutHeading'
import {
  useSearchStudentsByMatric,
  useStudents,
  type Student,
} from '../../../features/students'
import type { APIResponse, Pagination } from '../../../types'
import { toast } from 'react-toastify'
import type { AxiosError } from 'axios'
import { formatDateIntl } from '../../../utils/dateFormatter'
import Suspense from '../../../components/Suspense'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../../hooks/useDebounce'
import Button from '../../../components/ui/Button'
import { FaEye, FaFingerprint } from 'react-icons/fa'
import { useNavigate } from 'react-router'

const StudentsPage = () => {
  const navigate = useNavigate()
  const [students, setStudents] = useState<
    (Student & { _count: { fingerprints: number } })[] | null
  >(null)
  const [searchValue, setSearchValue] = useState('')

  const query: Pagination = { page: 1, limit: 20 }
  const { data: studentsData, isLoading, error } = useStudents(query)
  const { mutate: searchStudentsByMatric, data: studentsSearchData } =
    useSearchStudentsByMatric()

  if (error)
    toast.error((error as AxiosError<APIResponse>).response?.data?.message)

  useEffect(() => {
    if (studentsData) setStudents(studentsData?.data)
  }, [studentsData])
  useEffect(() => {
    if (studentsSearchData) setStudents(studentsSearchData?.data)
  }, [studentsSearchData])

  useDebounce(
    () => {
      if (searchValue || studentsData) {
        searchStudentsByMatric({ matricNo: searchValue, query })
      }
    },
    1000,
    [searchValue]
  )

  return (
    <main>
      <LayoutHeading title="Students List" routes={[{ name: 'Students' }]} />

      <Suspense isLoading={isLoading}>
        <div className="card shadow mb-4">
          <div className="card-header text-nowrap py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">
              Students Table
            </h6>
            <label className="d-flex m-0 p-0">
              Search:
              <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="ml-1 form-control form-control-sm"
                placeholder=""
                aria-controls="dataTable"
              />
            </label>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Matric No</th>
                    <th>Email</th>
                    <th>Fingerprint</th>
                    <th>Last Updated</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {students?.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}.</td>
                      <td className="text-capitalize">
                        {student.firstName} {student.lastName}
                      </td>
                      <td>{student.matricNo}</td>
                      <td>{student.email}</td>
                      <td>
                        {student._count?.fingerprints === 5 && (
                          <>
                            <span>Enrolled</span>
                            <Button
                              onClick={() =>
                                navigate(`/fingerprints/${student.id}/verify`)
                              }
                              className="mx-auto btn-sm ml-1 bg-dark"
                            >
                              <FaFingerprint className="mr-1" /> Verify
                            </Button>
                          </>
                        )}
                        {student._count?.fingerprints < 5 && (
                          <>
                            <span>
                              {student._count?.fingerprints > 0
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
                      </td>
                      <td>{formatDateIntl(student.updatedAt)}</td>
                      <td className="d-flex">
                        <Button
                          onClick={() => navigate(`/students/${student.id}`)}
                          className="bg-primary py-0"
                        >
                          <FaEye />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {!students?.length && (
                    <tr>
                      <td colSpan={7} className="text-center">
                        No matching result found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  )
}
export default StudentsPage
