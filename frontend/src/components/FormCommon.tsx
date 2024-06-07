import React from 'react';
// import loginBg from "../assets/login.jpg";
import Header from './user/Header';

interface FormCommonProps {
  children?: React.ReactNode;
  
}

const FormCommon:React.FC<FormCommonProps> = ({children}) => {

  return (
    <>
    <Header/>
    <div className="flex items-center justify-center min-h-screen bg-blue bg-purple-700">
      <div className="w-full max-w-md p-8 space-y-20 bg-white rounded-2xl shadow-md">
        {children}
      </div>
    </div>
    </>
  );
};

export default FormCommon;
