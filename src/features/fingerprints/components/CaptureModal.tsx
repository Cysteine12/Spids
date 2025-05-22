import { FaFingerprint } from 'react-icons/fa'
import AppPopup from '../../../components/AppPopup'
import FingerImg1 from '../../../assets/imgs/PlaceFinger.bmp'
import FingerImg2 from '../../../assets/imgs/PlaceFinger2.bmp'
import type { FingerType, CaptureState } from '../types'
import { useStudentStore } from '../../students'
import Button from '../../../components/ui/Button'
import { useCreateFingerprint, useFingerprintCapture } from '../hooks'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { toast } from 'react-toastify'
import type { APIResponse } from '../../../types'

interface Props {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  fingerType: FingerType
}

const CaptureModal = ({ isModalOpen, setIsModalOpen, fingerType }: Props) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const [captureStatus, setCaptureStatus] =
    useState<CaptureState>('Ready to capture')
  const [captureResult, setCaptureResult] = useState<Record<
    string,
    string
  > | null>(null)
  const { students } = useStudentStore()
  const { startCapture, stopCapture } = useFingerprintCapture(setCaptureStatus)
  const {
    mutate: createFingerprint,
    isPending,
    isSuccess,
    isError,
    data,
  } = useCreateFingerprint()

  const handleStartCapture = async () => {
    imageRef.current!.src = FingerImg1

    const res = await startCapture()
    if (!res) {
      imageRef.current!.src = FingerImg2
      return
    }

    setCaptureResult(res)
    imageRef.current!.src = `data:image/bmp;base64,${res.BMPBase64}`
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!captureResult) return

    setCaptureStatus('Saving...')

    createFingerprint({
      studentId: students[0].id,
      template: captureResult.TemplateBase64,
      type: fingerType,
    })
  }

  const handleStopCapture = () => stopCapture()

  // Refactor this shit bruh!!!
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message)
      setIsModalOpen(false)
    }
    if (isError) setCaptureStatus((data as unknown as APIResponse).message!)
  }, [isPending])

  return (
    <AppPopup
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={
        <>
          <FaFingerprint className="mt-1 mr-2" /> Fingerprint Enrollment
        </>
      }
    >
      <form
        onSubmit={handleSubmit}
        className="p-1 px-2"
        style={{ minWidth: '500px' }}
      >
        <div className="d-flex flex-col border p-2">
          <fieldset className="border p-2" style={{ width: '280px' }}>
            <legend className="w-auto px-2" style={{ fontSize: '12px' }}>
              Place finger on the capturener
            </legend>
            <div className="text-primary text-center position-relative">
              {!imageRef.current?.src && (
                <FaFingerprint
                  className="absolute-center"
                  style={{ fontSize: '140px' }}
                />
              )}
              <img ref={imageRef} height={150} width={'95%'} />
            </div>
          </fieldset>

          <div
            className="position-relative pl-4 w-100"
            style={{ fontSize: '14px', minHeight: '200px' }}
          >
            <h6 className="">
              <span>Device serial: Secugen</span>
              {captureResult?.Model}
              {captureResult?.SerialNumber}
            </h6>

            <fieldset className="border p-2 w-100" style={{ width: '100%' }}>
              <legend className="w-auto px-2" style={{ fontSize: '12px' }}>
                Student Details
              </legend>
              <table>
                <tbody>
                  <tr>
                    <td className="text-nowrap">Student Matric</td>
                    <td className="pl-2 w-100 text-uppercase">
                      <div className="bg-gray-200 pl-2">
                        {students[0]?.matricNo}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">Student Name</td>
                    <td className="pl-2 w-100 text-capitalize">
                      <div className="bg-gray-200 pl-2">
                        {students[0]?.firstName} {students[0]?.lastName}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>

            <div className="card bg-info text-white px-2 py-1 my-1">
              [{fingerType} FINGER] - {captureStatus}
            </div>

            <div
              className="position-absolute d-flex"
              style={{ bottom: '10px', right: '10px' }}
            >
              <Button
                onClick={handleStartCapture}
                text={'Scan'}
                className="bg-primary px-3"
                disabled={captureStatus === 'Capturing...'}
              />
              <Button
                type="submit"
                text={'Save'}
                className="bg-success px-3 mx-1"
                disabled={captureStatus !== 'Capture successful'}
              />
              <Button
                onClick={handleStopCapture}
                text={'Stop'}
                className="bg-danger px-3"
                disabled={captureStatus !== 'Capturing...'}
              />
            </div>
          </div>
        </div>
      </form>
    </AppPopup>
  )
}
export default CaptureModal
