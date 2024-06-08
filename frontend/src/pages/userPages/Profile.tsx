import React, { useEffect, useState } from "react";
import Header from "../../components/user/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { logout } from "../../store/datas/userDataSlice";
import { useDispatch } from "react-redux";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDecodedToken } from "../../components/user/UserLogin";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editOn, setEditOn] = useState(true);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    phoneNumber: "",
    profilePic: "",
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
          "http://localhost:3000/auth/user/storedata",
          { email: useremail }
        );

        const {
          firstName,
          lastName,
          email,
          userName,
          phoneNumber,
          profilePic,
        } = response.data;

        setUserData({
          firstName,
          lastName,
          email,
          userName,
          phoneNumber,
          profilePic,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
    navigate("/user/home");
  };

  // Edit handler
  const handleEdit = () => {
    navigate("/user/edit");
  };

  const handleProfEdit = () => {
    setEditOn(!editOn);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const decodedToken = useDecodedToken(accessToken);

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("decodedToken", JSON.stringify(decodedToken.email));

        const response = await axios.post(
          "http://localhost:3000/auth/user/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="user-profile text-white h-screen">
        <h1 className="text-xl mt-5 font-semibold text-center mb-8">Profile</h1>
        <div className="bg-black border border-gray-600 rounded-xl p-8 flex flex-col justify-between items-center md:items-start gap-12 mx-auto max-w-6xl shadow-lg">
          <div className="w-full flex flex-col md:flex-row gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
              {editOn ? (
                <div className="relative h-60 w-60 rounded-xl bg-gray-800 overflow-hidden mb-4 md:mb-0 md:mr-4 flex justify-center items-center">
                  <img
                    src={userData.profilePic}
                    alt="Profile Picture"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white py-2 px-4 rounded">
                    <button onClick={handleProfEdit}>
                      <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-60 w-60 rounded-xl bg-gray-800 mb-4 md:mb-0 md:mr-4 flex flex-col justify-center ">
                  <input type="file" onChange={handleFileChange} />
                  <button onClick={handleSubmit}>Upload</button>
                </div>
              )}

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
            <button
              className="px-5 py-2 border border-white rounded-2xl text-white"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              onClick={handleLogout}
              className="bg-violet-800 px-5 py-2 rounded-2xl text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
