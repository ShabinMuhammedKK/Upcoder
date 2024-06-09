import React, {useEffect, useState } from "react";
import upcoderLogo from "../../assets/upcoderlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { UserType } from "../../store/datas/userDataSlice";

const Header: React.FC = () => {
  
  const userData: UserType = useAppSelector((state) => state.user);


  const [isOpen, setIsOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

useEffect(() => {
  const getUserStatus = async () => {
    const userToken = await localStorage.getItem("accessToken");
    setIsAuthenticated(userToken !== null);
  };

  getUserStatus();
}, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const handleProfiledDirect = () => {
    navigate("/user/profile");
  };

  const buttonClick = () => {
    navigate("/user/signup");
  };

  return (
    <header className="headerBg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to={"/user/home"}>
          <div className="text-lg font-bold flex items-center">
            <img
              className="h-[20px] w-[40px] md:h-[30px] md:w-[50px]"
              src={upcoderLogo}
              alt="logo"
            />
            <span className="ml-3">Upcoder</span>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <a onClick={()=>navigate("/user/home")} className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            Cources
          </a>
          <a href="#" className="hover:underline">
            Labs
          </a>
          <a href="#" className="hover:underline">
            Articles
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </nav>
        <div className=" gap-3 hidden md:flex">
          <div className="startLearningBtn">
            <button>Start Learning</button>
          </div>
          {isAuthenticated ? (
            <div className="signUpBtn">
              <button
                onClick={handleProfiledDirect}
              >{`${userData.firstName} ${userData.lastName}`}</button>
            </div>
          ) : (
            <div className="signUpBtn">
              <Link to={"/user/signup"}>
                <button onClick={buttonClick}>Sign Up</button>
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black">
          <nav className="flex flex-col space-y-2 p-4">
            <a href="/user/home" className="hover:underline px-2">
              Home
            </a>
            <a href="#" className="hover:underline px-2">
              Cources
            </a>
            <a href="#" className="hover:underline px-2">
              Labs
            </a>
            <a href="#" className="hover:underline px-2">
              Articles
            </a>
            <a href="#" className="hover:underline px-2">
              Contact
            </a>
            <a
              href="#"
              onClick={buttonClick}
              className="hover:underline dropSignUp w-fit"
            >
              Sign Up
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
