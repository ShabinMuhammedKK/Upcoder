import { Routes, Route } from "react-router-dom";
import Otp from "../pages/userPages/Otp";
import Home from "../pages/userPages/Home";
import Login from "../pages/userPages/Login";
import Profile from "../pages/userPages/Profile";
import Register from "../pages/userPages/Register";
import UpdateUser from "../pages/userPages/UpdateUser";
import ProtectedRoutes from "./UserProtectedRoutes";
import ForgotPassword from "../pages/userPages/ForgotPassword";
import ResetPassword from "../pages/userPages/ResetPassword";

const UserRouters: React.FC = () => {
  return (
    <Routes>
      <Route element={<Home />} path="home" />
      <Route element={<Otp />} path="otp" />
      <Route element={<Register />} path="signup" />
      <Route element={<Login />} path="login" />
      <Route element={<ForgotPassword />} path="forgotpassword" />
      <Route element={<ResetPassword />} path="passwordreset" />
      <Route element={<ProtectedRoutes />}>
        <Route element={<Profile />} path="profile" />
        <Route element={<UpdateUser />} path="edit" />
      </Route>
    </Routes>
  );
};

export default UserRouters;
