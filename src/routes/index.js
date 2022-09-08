import Home from '~/pages/Home';
import TimeLine from '~/pages/Timeline';
import Profile from '~/pages/Profile';
import { ProfileLayout, LoginLayout } from '~/layouts';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';

const publicRoutes = [
   { path: '/', component: Home },
   { path: '/timeline', component: TimeLine },
   { path: '/profile', component: Profile, layout: ProfileLayout },
   { path: '/login', component: Login, layout: LoginLayout },
   { path: '/register', component: Register, layout: LoginLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
