import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './components/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import { Role } from './types/user'
import LoginPage from './pages/login-page/LoginPage'
import MainPage from './pages/MainPage'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element:
      <ProtectedRoute allowedRoles={[Role.ADMIN, Role.STUDENT, Role.TEACHER]}>
        <MainPage />
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
