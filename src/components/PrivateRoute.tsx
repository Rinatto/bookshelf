import type React from "react"
import { Navigate, Outlet } from "react-router-dom"

import { useAppSelector } from "../app/hooks"
import { getIsAuth } from "../features/auth/selectors"

export const PrivateRoute: React.FC = () => {
  const isAuth = useAppSelector(getIsAuth)

  return isAuth ? <Outlet /> : <Navigate to="/signin" />
}
