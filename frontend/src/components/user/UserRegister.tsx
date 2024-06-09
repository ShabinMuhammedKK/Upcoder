import React, { ChangeEvent, FormEvent, useState } from "react";
import googleLogo from "../../assets/google.png"
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

interface FormData {
  firstName:string;
  lastName:string;
  email:string;
  userName:string;
  phoneNumber:string;
  password:string;
  confirmPassword:string;
}

const UserRegister :React.FC = () => {

  const navigate = useNavigate();

  const [formData,setFormData] = useState<FormData>({
    firstName:"",
    lastName:"",
    email:"",
    userName:"",
    phoneNumber:"",
    password:"",
    confirmPassword:"",
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

    // Reset errors
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
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Invalid phone number";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:3000/auth/user/register", formData);
        if (response) {
          navigate('/user/otp', { state: { formData } });
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
    <h2 className="text-2xl font-bold text-center">Signup</h2>
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
        <input type="text" name="firstName" id="firstName" className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.firstName ? "border-red-500" : ""}`} value={formData.firstName} onChange={handleChange} required />
        {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
        <input type="text" name="lastName" id="lastName" className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.lastName ? "border-red-500" : ""}`} value={formData.lastName} onChange={handleChange} required />
        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" name="email" id="email" className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email ? "border-red-500" : ""}`} value={formData.email} onChange={handleChange} required />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" name="userName" id="userName" className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.userName ? "border-red-500" : ""}`} value={formData.userName} onChange={handleChange} required />
        {errors.userName && <p className="text-red-500">{errors.userName}</p>}
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input type="text" name="phoneNumber" id="phoneNumber" className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.phoneNumber ? "border-red-500" : ""}`} value={formData.phoneNumber} onChange={handleChange} required />
        {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" name="password" id="password" className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.password ? "border-red-500" : ""}`} value={formData.password} onChange={handleChange} required />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.confirmPassword ? "border-red-500" : ""}`} value={formData.confirmPassword} onChange={handleChange} required />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
      </div>
      <div className="flex justify-center">
        <h1>Or</h1>
        </div>
          <div  className="flex items-center justify-center bg-white border border-gray-300 rounded-md px-4 py-2 cursor-pointer google-signup-button">
          <img
            className="mr-2"
            src={googleLogo}
            alt="Google Logo"
            width="20"
            height="20"
          />
          <span>Login with Google</span>
        </div>
        <div>
          <button 
          onClick={handleSubmit}
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
          <div className="flex justify-center mt-2"><h1>Already have an acoount? </h1>
            <Link to="/user/login">
            <span className="mx-2 font-semibold">Login</span>
            </Link>
            </div>
          
        </div>
      </form>
      
    </div>
  );
};

export default UserRegister;
