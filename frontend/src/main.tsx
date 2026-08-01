import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import AuthPage from './pages/authPage'
import { authenticationAction } from './actions/authAction'
import './index.css'
import Otp from './pages/otpPage'

const router = createBrowserRouter([
	{
		path: "/auth",
		element: <AuthPage />,
		action: authenticationAction,
	},
	{
		path: "/otp",
		element: <Otp />,
	},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
