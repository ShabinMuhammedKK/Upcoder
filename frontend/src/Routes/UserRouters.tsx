import { Routes, Route} from 'react-router-dom';
import Otp from '../pages/userPages/Otp';
import Home from '../pages/userPages/Home';
import Login from '../pages/userPages/Login';
import Profile from '../pages/userPages/Profile';
import Register from '../pages/userPages/Register';
import UpdateUser from '../pages/userPages/UpdateUser';
import ProtectedRoutes from './UserProtectedRoutes';

const UserRouters: React.FC = () => {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="otp" element={<Otp />} />
      <Route element={<Register/>} path="signup"/>
      <Route element={<Login/>} path="login"/>
      <Route element={<ProtectedRoutes/>}>
        <Route element={<Profile/>} path="profile"/>
        <Route element={<UpdateUser/>} path="edit"/>
      </Route>
    </Routes>
  );
};


export default UserRouters;