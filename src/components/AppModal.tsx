interface Props {
  id?: string
  title: string
  message: string
  confirmAction: () => void
}

const AppModal = ({
  confirmAction,
  id = 'promptModal',
  title,
  message,
}: Props) => {
  const closeModal = () => {
    const body = document.getElementsByClassName('modal-open')[0]
    body.classList.toggle('modal-open')

    const backdrop = document.getElementsByClassName('modal-backdrop')[0]
    backdrop.remove()

    const modal = document.getElementsByClassName('modal fade show')[0]
    modal.classList.toggle('show')
    modal.removeAttribute('role')
    modal.removeAttribute('aria-modal')
    modal.setAttribute('aria-hidden', 'true')
    modal.classList.add('d-none')
  }

  const confirmModal = () => {
    closeModal()
    confirmAction()
  }

  return (
    <div
      className="modal fade"
      id={id}
      role="dialog"
      tabIndex={-1}
      aria-labelledby="modalLabel"
      aria-hidden={true}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={confirmModal}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AppModal
