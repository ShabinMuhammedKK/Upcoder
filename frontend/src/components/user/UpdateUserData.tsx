import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAppSelector } from "../../store/store";
import { UserType } from "../../store/datas/userDataSlice";
import { fetchData, HomeProps } from "../../utils/reduxtDataStoring";
import { useDecodedToken } from "./UserLogin";
import { useDispatch } from "react-redux";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
}

const UpdateUserData: React.FC = () => {
  const userData: UserType = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    email: userData.email || "",
    userName: userData.userName || "",
    phoneNumber: userData.phoneNumber || "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrors({});

    // Validate fields
    const newErrors: Partial<FormData> = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log(formData);
        const response = await axios.post(
          "http://localhost:3000/auth/user/updateuser",
          formData
        );

        if (response) {
          console.log(response)
          const accessToken = localStorage.getItem("accessToken");
          if(accessToken){
            const decodedToken = useDecodedToken(accessToken);
          
          if (accessToken) {
              try {
                  await fetchData(accessToken, decodedToken as HomeProps, dispatch);
              } catch (error) {
                  console.log(`Error fetching data: ${error}`);
              }
          } else {
              console.log("Access token not found in local storage");
          }}
        }
      } catch (error) {
        console.log(`register send error: ${error}`);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-black">
        Edit Profile
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.firstName ? "border-red-500" : ""
            }`}
            value={formData.firstName}
            placeholder={userData.firstName || ""}
            onChange={handleChange}
            required
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.lastName ? "border-red-500" : ""
            }`}
            value={formData.lastName}
            placeholder={userData.lastName || ""}
            onChange={handleChange}
            required
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.email ? "border-red-500" : ""
            }`}
            value={formData.email}
            placeholder={userData.email || ""}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.userName ? "border-red-500" : ""
            }`}
            value={formData.userName}
            placeholder={userData.userName || ""}
            onChange={handleChange}
            required
          />
          {errors.userName && <p className="text-red-500">{errors.userName}</p>}
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.phoneNumber ? "border-red-500" : ""
            }`}
            value={formData.phoneNumber}
            placeholder={userData.phoneNumber || ""}
            onChange={handleChange}
            required
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <Link to="/user/profile">
            <span className="mx-2 font-semibold">Go back</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserData;
