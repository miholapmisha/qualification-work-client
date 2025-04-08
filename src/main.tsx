import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './components/AuthProvider'
import { publicRoutes } from './routes/public'
import { adminRoutes } from './routes/admin'
import { teacherRoutes } from './routes/teacher'
import { fallbackRoute } from './routes/fallback'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AlertsProvider, { useAlerts } from './components/alert/AlertsProvider'
import { ApiResponse } from './services/api/common'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const router = createBrowserRouter([
  ...fallbackRoute,
  ...publicRoutes,
  ...adminRoutes,
  ...teacherRoutes
])

const App = () => {

  const { addAlert } = useAlerts()

  const handleErrorResponse = (response: ApiResponse<any>) => {
    if (response && response.error) {
      addAlert({ id: crypto.randomUUID(), message: response.data.message, type: "error" })
    }
  }

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onSettled: (data, _, __) => {
        handleErrorResponse(data as ApiResponse<any>)
      }
    }),
    mutationCache: new MutationCache({
      onSettled: (data, _, __) => {
        handleErrorResponse(data as ApiResponse<any>)
      }
    })
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlertsProvider>
      <App />
    </AlertsProvider>
  </StrictMode>
)
