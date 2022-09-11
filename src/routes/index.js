import Home from '~/pages/Home';
import TimeLine from '~/pages/Timeline';
import Watch from '~/pages/Watch';
import Profile from '~/pages/Profile';
import Message from '~/pages/Message';
import { ProfileLayout, LoginLayout, MessageLayout } from '~/layouts';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';

const publicRoutes = [
   { path: '/', component: Home },
   { path: '/timeline', component: TimeLine },
   { path: '/watchs', component: Watch },
   { path: '/profile', component: Profile, layout: ProfileLayout },
   { path: '/message', component: Message, layout: MessageLayout },
   { path: '/login', component: Login, layout: LoginLayout },
   { path: '/register', component: Register, layout: LoginLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
