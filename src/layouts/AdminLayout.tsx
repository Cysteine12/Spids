import { useEffect } from 'react'
import AppSpinner from '../components/AppSpinner'
import { useProfile } from '../features/admin'
import { useAuthStore } from '../features/auth'
import { Navigate, Outlet } from 'react-router'
import LayoutWrapper from '../components/LayoutWrapper'

const AdminLayout = () => {
  const { data, isLoading } = useProfile()
  const { profile: storeProfile } = useAuthStore()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (!isLoading) storeProfile(data.user)
  }, [])

  return (
    <>
      {isLoading ? (
        <AppSpinner />
      ) : isAuthenticated ? (
        <>
          <LayoutWrapper>
            <Outlet />
          </LayoutWrapper>
        </>
      ) : (
        <Navigate to={`/login`} replace />
      )}
    </>
  )
}
export default AdminLayout
