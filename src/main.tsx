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
import AlertsProvider from './components/alert/AlertsProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AlertListener, { createAlertEvent } from './components/alert/AlertListener'
import { ApiResponse } from './services/api/common'

const router = createBrowserRouter([
  ...fallbackRoute,
  ...publicRoutes,
  ...adminRoutes,
  ...teacherRoutes
])

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onSettled: (data, _, __) => {
      createAlertEvent(data as ApiResponse);
    }
  }),
  mutationCache: new MutationCache({
    onSettled: (data, _, __) => {
      createAlertEvent(data as ApiResponse);
    }
  })
})

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AlertsProvider>
          <AlertListener />
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </AlertsProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
