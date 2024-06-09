import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"




const EmailVerification:React.FC  = () => {


    const [emailError, setEmailError] = useState("");
    const [email, setEmail] = useState("");


    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setEmailError("");
    
        if (!email.trim()) {
          setEmailError("Email is required");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
          setEmailError("Invalid email format");
        }


        try {
          const response = await axios.post("http://localhost:3000/auth/user/resetemail",{email:email});
          if(response){
            console.log(response);
          }
        } catch (error) {
          console.log(error);
        }
      };




  return (
    <>
      <h2 className="text-2xl font-bold text-center">Verify email</h2>
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
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send verification
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <h1>Trying to login? </h1>
          <Link to="/user/login">
            <span className="mx-2 font-semibold">Login</span>
          </Link>
        </div>
      </form>
    </>
  )
}

export default EmailVerification 