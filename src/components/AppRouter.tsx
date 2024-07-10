import { Navigate, Route, Routes } from "react-router-dom"

import { privateRoutes, publicRoutes } from "../router/index"

interface AppRouterProps {
  isAuth: boolean
}

export const AppRouter: React.FC<AppRouterProps> = ({ isAuth }) => {
  return isAuth ? (
    <Routes>
      {privateRoutes.map(route => {
        const Component = route.component
        return (
          <Route path={route.path} element={<Component />} key={route.path} />
        )
      })}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(route => {
        const Component = route.component
        return (
          <Route path={route.path} element={<Component />} key={route.path} />
        )
      })}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
