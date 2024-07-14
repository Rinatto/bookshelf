import { lazy } from "react"

export const publicRoutes = [
  {
    path: "/signin",
    component: lazy(() =>
      import("../pages/SignIn").then(module => ({ default: module.SignIn })),
    ),
  },
  {
    path: "/signup",
    component: lazy(() =>
      import("../pages/SignUp").then(module => ({ default: module.Signup })),
    ),
  },
  {
    path: "/",
    component: lazy(() =>
      import("../pages/About").then(module => ({ default: module.About })),
    ),
    exact: true,
  },
  {
    path: "/books/:id",
    component: lazy(() =>
      import("../pages/ItemPage").then(module => ({
        default: module.ItemPage,
      })),
    ),
  },
]

export const privateRoutes = [
  {
    path: "/favorites",
    component: lazy(() =>
      import("../pages/Favorites").then(module => ({
        default: module.Favorites,
      })),
    ),
  },
  {
    path: "/history",
    component: lazy(() =>
      import("../pages/HistoryPage").then(module => ({
        default: module.HistoryPage,
      })),
    ),
  },
]
