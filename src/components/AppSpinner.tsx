const AppSpinner = ({
  style = { margin: '200px 0', fontSize: '3rem' },
}: {
  style?: { margin: string; fontSize: string }
}) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={style}
    >
      <i className={`fas fa-spinner fa-pulse fa-spin text-primary`}></i>
    </div>
  )
}
export default AppSpinner
