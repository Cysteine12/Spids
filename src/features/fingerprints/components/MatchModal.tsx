import { FaFingerprint } from 'react-icons/fa'
import AppPopup from '../../../components/AppPopup'
import FingerImg1 from '../../../assets/imgs/PlaceFinger.bmp'
import FingerImg2 from '../../../assets/imgs/PlaceFinger2.bmp'
import type {
  FingerprintCaptureAPIResponse,
  FingerType,
  MatchState,
} from '../types'
import { useStudentStore } from '../../students'
import Button from '../../../components/ui/Button'
import { useFingerprintCapture, useFingerprintMatch } from '../hooks'
import { useRef, useState, type FormEvent } from 'react'

interface Props {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  fingerType: FingerType
  template: string
}

const MatchModal = ({
  isModalOpen,
  setIsModalOpen,
  fingerType,
  template,
}: Props) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const [matchStatus, setMatchStatus] = useState<MatchState>('Ready to match')
  const [captureResult, setCaptureResult] =
    useState<FingerprintCaptureAPIResponse | null>(null)
  const { students } = useStudentStore()
  const { startCapture, stopCapture } = useFingerprintCapture(setMatchStatus)
  const { startMatch, stopMatch } = useFingerprintMatch()

  const handleStartMatch = async () => {
    imageRef.current!.src = FingerImg1

    const captureRes = await startCapture()
    if (!captureRes) {
      imageRef.current!.src = FingerImg2
      return
    }
    setCaptureResult(captureRes)

    imageRef.current!.src = `data:image/bmp;base64,${captureRes.BMPBase64}`

    await startMatch(template, captureRes.TemplateBase64, setMatchStatus)
  }

  const handleClose = (e: FormEvent) => {
    e.preventDefault()

    setIsModalOpen(false)
  }

  const handleStopCapture = () => {
    stopCapture()
    stopMatch()
  }

  return (
    <AppPopup
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={
        <>
          <FaFingerprint className="mt-1 mr-2" /> Fingerprint Verification
        </>
      }
    >
      <form className="p-1 px-2" style={{ minWidth: '500px' }}>
        <div className="d-flex flex-col border p-2">
          <fieldset className="border p-2" style={{ width: '280px' }}>
            <legend className="w-auto px-2" style={{ fontSize: '12px' }}>
              Place finger on the scanner
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
              [{fingerType} FINGER] - {matchStatus}
            </div>

            <div
              className="position-absolute d-flex"
              style={{ bottom: '10px', right: '10px' }}
            >
              <Button
                onClick={handleStartMatch}
                text={'Scan'}
                className="bg-primary px-3"
                disabled={matchStatus === 'Capturing...'}
              />
              <Button
                onClick={handleClose}
                text={'Close'}
                className="bg-success px-3 mx-1"
                disabled={matchStatus === 'Matching...'}
              />
              <Button
                onClick={handleStopCapture}
                text={'Stop'}
                className="bg-danger px-3"
                disabled={matchStatus !== 'Capturing...'}
              />
            </div>
          </div>
        </div>
      </form>
    </AppPopup>
  )
}

export default MatchModal
