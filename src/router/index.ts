import { About } from '../pages/About';
import { Favorites } from '../pages/Favorites';
import { History } from '../pages/History';
import { ItemPage } from '../pages/ItemPage';
import { SignIn } from '../pages/SignIn';
import { Signup } from '../pages/SignUp';


export const publicRoutes = [
  { path: '/signin', component: SignIn },
  { path: '/signup', component: Signup },
  { path: '/', component: About, exact: true },
  { path: '/book/:id', component: ItemPage }, 
];

export const privateRoutes = [
  { path: '/favorites', component: Favorites },
  { path: '/history', component: History },
];
