import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../../assets/google.png";
import axios from "axios";
import { fetchData } from "../../utils/reduxtDataStoring";
import { HomeProps } from "../../utils/reduxtDataStoring";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";

export const useDecodedToken = (accessToken: string) => {
  const decodedToken = jwtDecode<HomeProps>(accessToken);
  return decodedToken as HomeProps;
};

const UserLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Invalid email format");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
    } else if (password.trim().length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/user/login",
        { email, password }
      );
      if (response.data.status === "true") {
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        const decodedToken = useDecodedToken(accessToken);
        
        await fetchData(accessToken, decodedToken as HomeProps, dispatch);

        navigate("/user/home");
      } else {
        console.error("Login failed");
        alert("Login failed");
      }
    } catch (error) {
      throw error;
    }
  };

  const googleBtn = () => {
    console.log("google button clicked");
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <div className="flex flex-row justify-end">
          <Link to="/user/forgotpassword">
        <h1 className="text-blue-800">forgot passoword ?</h1>
        </Link>
        </div>
        
        <div className="flex justify-center">
          <h1>Or</h1>
        </div>
        <div
          onClick={googleBtn}
          className="flex items-center justify-center bg-white border border-gray-300 rounded-md px-4 py-2 cursor-pointer google-signup-button"
        >
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
            type="submit"
            onClick={handleSubmit}
            className="w-full px-4 py-2 font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <h1>If don't have an account? </h1>
          <Link to="/user/signup">
            <span className="mx-2 font-semibold">Signup</span>
          </Link>
        </div>
      </form>
    </>
  );
};

export default UserLogin;
