import { About } from "../pages/About"
import { Favorites } from "../pages/Favorites"
import { History } from "../pages/History"
import { Login } from "../pages/Login"
import { PostIdPage } from "../pages/PostIdPage"

export const privateRoutes = [
  { path: "/favorites", component: Favorites, exact: true },
  { path: "/history", component: History, exact: true },
  { path: "/about/:id", component: PostIdPage, exact: true },
  { path: "/", component: About, exact: true },
]
export const publicRoutes = [
  { path: "/login", component: Login, exact: true },
  { path: "/", component: About, exact: true },
  { path: "/about/:id", component: PostIdPage, exact: true },
]
