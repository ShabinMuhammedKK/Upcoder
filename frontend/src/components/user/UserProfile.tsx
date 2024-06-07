import React, { useEffect } from 'react';
import axios from 'axios';
import { useJwt } from 'react-jwt';

const UserProfile: React.FC = () => {

  // const [userData,setUserData] = useState("")

  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No valid token");
  }
  const { decodedToken } = useJwt(token);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFullData = await axios.post(
          "http://localhost:3000/auth/user/storedata",
          decodedToken
        );
        
        console.log("asdfdsf :",userFullData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="user-profile text-white h-screen">
      <h1 className="text-3xl font-semibold mb-4">Profile</h1>
      <div className="flex items-center mb-8">
        {/* <ProfilePicture url={userData.profilePictureUrl} /> */}
        <div className="ml-4">
          {/* <h2 className="text-lg font-semibold">{userFullData.firstName} {userData.lastName}</h2>
          <p className="text-gray-600">{userFullData.email}</p>
          <p className="text-gray-600">{userFullData.phoneNumber}</p> */}
        </div>
      </div>
      <div className='flex justify-around m-10'>
        <div className="mb-8 border rounded-2xl h-[300px] w-[300px]">
          <h2 className="text-xl font-semibold mb-2">Enrolled Courses</h2>
          {/* <CoursesEnrolled courses={enrolledCourses} /> */}
        </div>
        <div className="mb-8 border rounded-2xl h-[300px] w-[300px]">
          <h2 className="text-xl font-semibold mb-2">Completed Courses</h2>
          <ul className="list-disc list-inside">
            {/* {completedCourses.map((course, index) => (
              <li key={index} className="text-gray-600">{course}</li>
            ))} */}
            <li>Course 1</li>
            <li>Course 2</li>
            <li>Course 3</li>
          </ul>
        </div>
        <div className='border rounded-2xl h-[300px] w-[300px]'>
          <h2 className="text-xl font-semibold mb-2">Certificates</h2>
          {/* <Certificates certificates={certificates} /> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
