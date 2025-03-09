import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './components/AuthProvider'
import { publicRoutes } from './routes/public'
import { adminRoutes } from './routes/admin'
import { teacherRoutes } from './routes/teacher'
import { fallbackRoute } from './routes/fallback'

const router = createBrowserRouter([
  ...fallbackRoute,
  ...publicRoutes,
  ...adminRoutes,
  ...teacherRoutes
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
