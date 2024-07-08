import About from "../pages/About";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Post from "../pages/Posts";

export const privateRoutes = [
    {path: '/about', component: About, exact: true},
    {path: '/posts', component: Post, exact: true},
    {path: '/posts/:id', component: PostIdPage, exact: true},
    {path: '/', component: Post, exact: true},
]
export const publicRoutes = [
    {path: '/login', component: Login, exact: true},
]