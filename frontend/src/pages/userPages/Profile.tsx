import React, { useEffect, useState } from 'react';
import Header from '../../components/user/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { persistor } from '../../store/store';
import { logout } from '../../store/datas/userDataSlice';

const Profile: React.FC = () => {
  const navigate = useNavigate();


  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No valid token");
        }
        const decodedToken: any = jwtDecode(token);
        const useremail = decodedToken.email;
        
        const response = await axios.post(
          "http://localhost:3000/auth/user/storedata",{email:useremail}
        );
        
        const { firstName, lastName, email, userName, phoneNumber } = response.data;


        setUserData({
          firstName,
          lastName,
          email,
          userName,
          phoneNumber
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    persistor.purge();
    dispatch(logout());
    navigate("/user/login");
  };

  // Edit handler
  const handleEdit = () => {
    navigate("/user/edit");
  };

  return (
    <>
      <Header />
      <div className="user-profile text-white h-screen">
        <h1 className="text-xl mt-5 font-semibold text-center mb-8">Profile</h1>
        <div className="bg-black border border-gray-600 rounded-xl p-8 flex flex-col justify-between items-center md:items-start gap-12 mx-auto max-w-6xl shadow-lg">
          <div className="w-full flex flex-col md:flex-row gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
              <div className="h-60 w-60 rounded-xl bg-gray-700 mb-4 md:mb-0 md:mr-4"></div>
              <div className="text-center md:text-left">
                <h2 className="text-xl font-semibold">{`${userData.firstName} ${userData.lastName}`}</h2>
                <p className="text-gray-400">{`${userData.email}`}</p>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex gap-2">
                  <span className="text-sm text-gray-400">Username:</span>
                  <h1>{`${userData.userName}`}</h1>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm text-gray-400">Phone:</span>
                  <h1>{`${userData.phoneNumber}`}</h1>
                </div>
              </div>
            </div>
          </div>
          {/* Other profile sections */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Enrolled courses section */}
            <div className="border border-gray-600 rounded-2xl p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">Enrolled courses</h3>
              {/* Render enrolled courses here */}
              <li>Enrolled Course 1</li>
              <li>Enrolled Course 2</li>
              <li>Enrolled Course 3</li>
            </div>
            {/* Completed courses section */}
            <div className="border border-gray-600 rounded-2xl p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">Completed courses</h3>
              {/* Render completed courses here */}
              <li>Completed Course 1</li>
              <li>Completed Course 2</li>
              <li>Completed Course 3</li>
            </div>
            {/* Certificates section */}
            <div className="border border-gray-600 rounded-2xl p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-2">Certificates</h3>
              {/* Render certificates here */}
              <li>Certificate 1</li>
              <li>Certificate 2</li>
              <li>Certificate 3</li>
            </div>
          </div>
          <div className="w-full flex justify-center gap-5 mb-6">
            <button className="px-5 py-2 border border-white rounded-2xl text-white" onClick={handleEdit}>Edit</button>
            <button onClick={handleLogout} className="bg-violet-800 px-5 py-2 rounded-2xl text-white">Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;


function dispatch(_arg0: { payload: undefined; type: "user/logout"; }) {
  throw new Error('Function not implemented.');
}

