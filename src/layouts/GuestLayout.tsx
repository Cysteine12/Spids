import { useAuthStore } from '../features/auth'
import { Navigate, Outlet } from 'react-router'

const GuestLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <div className="bg-gray-200 overflow-auto h-screen">
      {isAuthenticated ? <Navigate to={'/dashboard'} replace /> : <Outlet />}
    </div>
  )
}
export default GuestLayout
