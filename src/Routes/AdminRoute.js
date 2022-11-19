import { Outlet, Navigate } from 'react-router-dom';

const AdminRoute = () => {
   const auth = JSON.parse(sessionStorage.getItem('user'));

   return auth.role === 'ROLE_ADMIN' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
