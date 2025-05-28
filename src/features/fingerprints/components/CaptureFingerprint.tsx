import { FaFingerprint } from 'react-icons/fa'
import { useFingerprintStore } from '../store'
import type { FingerType } from '../types'
import { useState } from 'react'
import CaptureModal from './CaptureModal'

interface Props {
  type: FingerType
  height: string
}

const CaptureFingerprint = ({ type, height }: Props) => {
  const col_5 = { flex: '0 0 20%' }
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fingerprint = useFingerprintStore((state) =>
    state.fingerprints.find((fingerprint) => fingerprint?.type === type)
  )

  const handleClick = () => {
    if (fingerprint?.template) return

    setIsModalOpen(true)
  }

  const handleDoubleClick = () => {}

  return (
    <div className="col position-relative" style={col_5}>
      <div className="position-absolute w-100" style={{ bottom: height }}>
        <button
          className={`mt-auto ${
            fingerprint?.template && 'text-success border-success'
          }`}
        >
          <FaFingerprint
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            className="p-2"
            style={{ fontSize: '3rem', marginTop: 'auto' }}
          />
        </button>
        <div
          className={`font-weight-bold ${
            fingerprint?.template && 'text-success border-success'
          }`}
        >
          {type}
        </div>
      </div>
      <CaptureModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        fingerType={type}
      />
    </div>
  )
}
export default CaptureFingerprint
