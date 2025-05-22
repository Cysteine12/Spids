import { useParams } from 'react-router'
import LayoutHeading from '../../../components/LayoutHeading'
import Suspense from '../../../components/Suspense'
import CaptureFingerprint from '../../../features/fingerprints/components/CaptureFingerprint'
import { useEffect } from 'react'
import { useFingerprintStore } from '../../../features/fingerprints'
import { useStudent, useStudentStore } from '../../../features/students'

const FingerprintsCreatePage = () => {
  const { studentId } = useParams()
  const { setFingerprints } = useFingerprintStore()
  const { setStudents } = useStudentStore()
  const { data, isLoading } = useStudent(studentId)

  useEffect(() => {
    if (data) setFingerprints(data.data.fingerprints)
    if (data) setStudents([data.data])

    setFingerprints([
      // { template: 'ddssda', type: 'THUMB' },
      // { template: 'ddssda', type: 'INDEX' },
      // { template: 'ddssda', type: 'PINKY' },
    ])
  }, [data])

  return (
    <main>
      <LayoutHeading
        title="Add Fingerprint"
        routes={[
          { name: 'Students', path: `/students` },
          { name: 'Student', path: `/students/${studentId}` },
          { name: 'Fingerprint' },
        ]}
      />

      <Suspense isLoading={isLoading}>
        <div className="row">
          <div className="col-xl-6 col-md-10">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-dark">
                  Fingerprints Map
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
                    <div className="dropdown-header">Dropdown Header:</div>
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

              <div className="card-body" style={{ height: '300px' }}>
                <div className="row text-primary h-100 text-center">
                  <CaptureFingerprint type="THUMB" height="10px" />
                  <CaptureFingerprint type="INDEX" height="60%" />
                  <CaptureFingerprint type="MIDDLE" height="80%" />
                  <CaptureFingerprint type="RING" height="65%" />
                  <CaptureFingerprint type="PINKY" height="40%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  )
}
export default FingerprintsCreatePage
