import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface ResetData {
  password: string;
  confirmPassword: string;
  userID?: string;
  token?: string;
}

const ResetPage: React.FC = () => {
  const navigate = useNavigate();

  const [userID, setUserID] = useState("");
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState<ResetData>({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get("id");
    const token = urlParams.get("token");
    if (userID && token) {
      setUserID(userID);
      setToken(token);
    } else {
      console.log("user id or token missing");
    }
  }, []);

  const [errors, setErrors] = useState<Partial<ResetData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const userNewData = {
    userID,
    token,
    newPassword: formData.password,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrors({});

    const newErrors: Partial<ResetData> = {};

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
        const response = await axios.post(
          "http://localhost:3000/auth/user/newPassword",
          userNewData
        );
        if (response) {
          navigate("/user/login", { state: { formData } });
        }
      } catch (error) {
        console.log(`resetting error: ${error}`);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center">Create new password</h2>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.password ? "border-red-500" : ""
            }`}
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <Link to="/user/login">
            <span className="mx-2 font-semibold">Cancel</span>
          </Link>
        </div>
      </form>
    </>
  );
};

export default ResetPage;
