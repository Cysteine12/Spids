import type { ReactNode } from 'react'
import AppSpinner from './AppSpinner'

interface Props {
  isLoading: boolean
  children: ReactNode
}

const Suspense = ({ children, isLoading }: Props) => {
  return isLoading ? (
    <AppSpinner />
  ) : (
    <div className="container-fluid">{children}</div>
  )
}
export default Suspense
