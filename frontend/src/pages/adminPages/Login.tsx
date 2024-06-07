import { useState } from 'react'
import FormCommon from '../../components/FormCommon';
import axios from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
   
    setErrors({});

   
    const newErrors: { [key: string]: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const adminRegister = await axios.post("http://localhost:3000/auth/admin/login", { email, password });
        if (adminRegister.data) {
          navigate("/admin/dashboard");
        }
      } catch (error) {
        console.error("Login error:", error);
        
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <FormCommon>
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email ? "border-red-500" : ""}`} value={email} onChange={(e) => setEmail(e.target.value)} required />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.password ? "border-red-500" : ""}`} value={password} onChange={(e) => setPassword(e.target.value)} required />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <div>
            <button onClick={handleSubmit} type="submit" className="w-full px-4 py-2 font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
          </div>
        </form>
      </FormCommon>
    </>
  )
}

export default Login
