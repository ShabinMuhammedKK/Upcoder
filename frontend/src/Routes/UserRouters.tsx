import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import Otp from '../pages/userPages/Otp';
import Home from '../pages/userPages/Home';
import Login from '../pages/userPages/Login';
import Profile from '../pages/userPages/Profile';
import Register from '../pages/userPages/Register';
import UpdateUser from '../pages/userPages/UpdateUser';

const UserRouters: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const user = localStorage?.getItem('accessToken') !== null;
    setIsAuthenticated(user);
  }, []);

  console.log(isAuthenticated)



  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="login" element={isAuthenticated===false?<Login />:<Navigate to="/user/home"/>} />
      <Route path="otp" element={<Otp />} />
      <Route path="signup" element={isAuthenticated === false?<Register />:<Navigate to="/user/home"/>} />
      <Route path='profile' element={isAuthenticated === true? <Profile/> :<Navigate to="/user/login"/>}/>
      <Route path='edit' element={isAuthenticated===true? <UpdateUser/> :<Navigate to="/user/login"/>}/>
    </Routes>
  );
};


export default UserRouters;