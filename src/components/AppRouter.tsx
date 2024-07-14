import type React from "react"
import { Suspense, useContext, useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { privateRoutes, publicRoutes } from "../router/index"

import { Loader } from "./UI/Loader/Loader"
import { AuthContext } from "./AuthContext"

export const AppRouter: React.FC = () => {
  const { isAuth, login } = useContext(AuthContext)

  useEffect(() => {
    const auth = localStorage.getItem("isAuth")
    if (auth) {
      login()
    }
  }, [login])

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
