import { About } from "../pages/About"
import { Favorites } from "../pages/Favorites"
import { HistoryPage } from "../pages/HistoryPage"
import { ItemPage } from "../pages/ItemPage"
import { SignIn } from "../pages/SignIn"
import { Signup } from "../pages/SignUp"

export const publicRoutes = [
  { path: "/signin", component: SignIn },
  { path: "/signup", component: Signup },
  { path: "/", component: About, exact: true },
  { path: "/books/:id", component: ItemPage },
]

export const privateRoutes = [
  { path: "/favorites", component: Favorites },
  { path: "/history", component: HistoryPage },
]
