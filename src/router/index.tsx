import { createBrowserRouter } from 'react-router'
import ErrorBoundary from '../components/ErrorBoundary'
import GuestLayout from '../layouts/GuestLayout'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import AdminLayout from '../layouts/AdminLayout'
import DashboardPage from '../pages/admin/DashboardPage'
import NotFoundPage from '../pages/NotFoundPage'
import StudentsPage from '../pages/admin/students/StudentsPage'
import FingerprintsCapturePage from '../pages/admin/fingerprints/FingerprintsCapturePage'
import StudentCreatePage from '../pages/admin/students/StudentCreatePage'
import StudentPage from '../pages/admin/students/StudentPage'
import FingerprintsMatchPage from '../pages/admin/fingerprints/FingerprintsMatchPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ErrorBoundary children={<GuestLayout />} />,
    children: [
      {
        path: '/',
        element: <ErrorBoundary children={<HomePage />} />,
      },
      {
        path: '/login',
        element: <ErrorBoundary children={<LoginPage />} />,
      },
    ],
  },
  {
    path: '/',
    element: <ErrorBoundary children={<AdminLayout />} />,
    children: [
      {
        path: 'dashboard',
        element: <ErrorBoundary children={<DashboardPage />} />,
      },
      {
        path: '/students',
        children: [
          {
            path: '',
            element: <ErrorBoundary children={<StudentsPage />} />,
          },
          {
            path: 'create',
            element: <ErrorBoundary children={<StudentCreatePage />} />,
          },
          {
            path: ':id',
            element: <ErrorBoundary children={<StudentPage />} />,
          },
        ],
      },
      {
        path: '/fingerprints',
        children: [
          {
            path: ':studentId/enroll',
            element: <ErrorBoundary children={<FingerprintsCapturePage />} />,
          },
          {
            path: ':studentId/verify',
            element: <ErrorBoundary children={<FingerprintsMatchPage />} />,
          },
        ],
      },
    ],
  },

  {
    path: '/',
    element: <ErrorBoundary children={<GuestLayout />} />,
    children: [
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export default router
