import { Routes, Route } from "react-router-dom";
import Login from "../pages/adminPages/Login"
import UserMangement from "../pages/adminPages/UserManagement";
import { Dashboard } from "../pages/adminPages/Dashboard";


const AdminRouters = () => {
    return (
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="usermanagement" element={<UserMangement />} />
        </Routes>
      )
}

export default AdminRouters;