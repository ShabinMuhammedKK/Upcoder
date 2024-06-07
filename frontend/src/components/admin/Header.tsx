import React, { useState } from "react";
import upcoderLogo  from "../../assets/upcoderlogo.png";


type HeaderProps = {
  title:string;}

const Header: React.FC <HeaderProps>= ({title}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = ()=>{
      
  }

  

  return (
    <header className="headerBg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-lg font-bold flex items-center">
          <img className="h-[20px] w-[40px] mr-5 md:h-[30px] md:w-[50px]" src={upcoderLogo} alt="" />
          <span>UpCoder</span>
        </div>
        <div className="font-bold dashboardTitle">{title}</div>
        <div className=" gap-3 hidden md:flex">
          <div className="startLearningBtn">
            <button>Analatics                </button>
          </div>
          <div className="signUpBtn">
            <button onClick={logout}>Logout</button>
            
          </div>
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
            <a href="#" className="hover:underline px-2">
              Analatics
            </a>
            <a href="#"  className="hover:underline dropSignUp w-fit">
              Prof
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
