import type React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAppSelector } from "../app/hooks"
import { getIsAuth, getUser } from "../features/auth/selectors"

export const PrivateRoute: React.FC = () => {
  const isAuth = useAppSelector(getIsAuth)
  const user = useAppSelector(getUser)
  const location = useLocation()

  return isAuth && user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  )
}
