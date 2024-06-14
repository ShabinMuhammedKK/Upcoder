import { Routes, Route } from "react-router-dom";
import Login from "../pages/adminPages/Login"
import UserMangement from "../pages/adminPages/UserManagement";
import { Dashboard } from "../pages/adminPages/Dashboard";
import CourseManagement from "../pages/adminPages/CourseManagement";
import CourseDetailPage from "../pages/adminPages/CourseDetailPage";


const AdminRouters = () => {
    return (
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="usermanagement" element={<UserMangement />} />
          <Route path="coursemanagement" element={<CourseManagement />} />
          <Route path="coursedetails" element={<CourseDetailPage />} />
        </Routes>
      )
}

export default AdminRouters;