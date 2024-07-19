import type React from "react"
import { Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { useAppSelector } from "../app/hooks"
import { getIsAuth } from "../features/auth/selectors"
import { privateRoutes, publicRoutes } from "../router/index"

import { Loader } from "./UI/Loader/Loader"

export const AppRouter: React.FC = () => {
  const isAuth = useAppSelector(getIsAuth)

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {publicRoutes.map(route => (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          />
        ))}
        {privateRoutes.map(route => (
          <Route
            path={route.path}
            element={isAuth ? <route.component /> : <Navigate to="/signin" />}
            key={route.path}
          />
        ))}
        <Route path="*" element={<Navigate to={isAuth ? "/" : "/signin"} />} />
      </Routes>
    </Suspense>
  )
}
