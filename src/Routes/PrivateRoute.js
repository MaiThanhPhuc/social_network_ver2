import {Outlet, Navigate} from "react-router-dom";

const PrivateRoute = () => {
  const auth = localStorage.getItem("user");
  return auth !== null ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
