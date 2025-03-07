import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './components/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import { roles } from './types/user'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import PageLoader from './components/PageLoader'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/',
    element:
      <ProtectedRoute allowedRoles={[roles.ADMIN, roles.STUDENT, roles.TEACHER, roles.GUEST]}>
        <MainPage/>
      </ProtectedRoute>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
