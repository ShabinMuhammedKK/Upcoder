import { Outlet,Navigate } from "react-router-dom"

const ProtectedRoutes = () => {
  const user = localStorage?.getItem('accessToken');
  return user?<Outlet/>:<Navigate to="/user/login"/>
}

export default ProtectedRoutes