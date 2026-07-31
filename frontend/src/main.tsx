import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import AuthPage from './pages/authPage'
import './index.css'

const router = createBrowserRouter([{
	path: "/auth",
	element: <AuthPage />,
	// action: authenticateAction,
}])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
