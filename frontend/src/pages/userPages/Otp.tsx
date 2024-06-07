import React, {
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
} from "react";
import Header from "../../components/user/Header";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";




const Otp = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const {formData} = location.state?location.state:"";


  console.log(formData);

  const [otp, setOTP] = useState<string[]>(["", "", "", "", "", ""]);
  const refs = [
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
  ];

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOTP(newOtp);

    if (value.length === 1 && index < 5) {
      refs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      refs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const otpValue = Number(otp.join(""));
      const response = await axios.post("http://localhost:3000/auth/user/verifyOTP",{user:formData,otp:otpValue});
      if(response){
        navigate("/user/home")
      }
      
    } catch (error) {
      console.log("otp verification error");
      throw error;
    }
  };

  return (
    <>
    <Header />
    <div
      className="flex items-center justify-center min-h-screen bg-purple-700"
    >
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center">Enter OTP</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2">
            {otp.map((value, index) => (
              <input
                key={index}
                ref={refs[index] as React.RefObject<HTMLInputElement>}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-3xl text-center border border-gray-600 rounded-md"
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, e.target.value)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(index, e)
                }
                required
              />
            ))}
          </div>
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full px-4 py-2 font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit OTP
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Otp;
