import { FaTimesCircle } from 'react-icons/fa'
import Modal from 'react-modal'
import AppSpinner from './AppSpinner'
import type { ReactNode } from 'react'

interface Props {
  title?: ReactNode
  children: ReactNode
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  loading?: boolean
}

const AppPopup = ({
  title,
  children,
  isModalOpen,
  setIsModalOpen,
  loading = false,
}: Props) => {
  const el = document.getElementsByClassName('app')

  return (
    <Modal
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      appElement={el}
      className={'modal-style'}
    >
      {loading ? (
        <AppSpinner style={{ margin: '70px 0', fontSize: '2rem' }} />
      ) : (
        <>
          <div className="d-flex justify-content-between cursor-pointer">
            <h6 className="d-flex align-items-center text-sm font-weight-bold">
              {title}
            </h6>
            <button
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="bg-white border-0 p-0 m-0"
            >
              <FaTimesCircle
                className="text-lg text-gray-500"
                style={{ marginTop: '-10px' }}
              />
            </button>
          </div>

          {children}
        </>
      )}
    </Modal>
  )
}

export default AppPopup
