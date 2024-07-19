import type React from "react"
import { Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { privateRoutes, publicRoutes } from "../router"

import { Loader } from "./UI/Loader/Loader"
import { PrivateRoute } from "./PrivateRoute"

export const AppRouter: React.FC = () => {
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
        <Route element={<PrivateRoute />}>
          {privateRoutes.map(route => (
            <Route
              path={route.path}
              element={<route.component />}
              key={route.path}
            />
          ))}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  )
}
