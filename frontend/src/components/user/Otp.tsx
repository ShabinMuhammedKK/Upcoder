// import React, { useRef, useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
// import loginBg from "../../assets/login.jpg";

// const Otp = () => {
//   const [otp, setOTP] = useState<string[]>(['', '', '', '', '', '']);
//   const refs = [useRef<HTMLInputElement>(), useRef<HTMLInputElement>(), useRef<HTMLInputElement>(), useRef<HTMLInputElement>(), useRef<HTMLInputElement>(), useRef<HTMLInputElement>()];

//   const handleChange = (index: number, value: string) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOTP(newOtp);

//     if (value.length === 1 && index < 5) {
//       refs[index + 1].current?.focus();
//     }
//   };

//   const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
//       refs[index - 1].current?.focus();
//     }
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const otpValue = otp.join(''); 
//     console.log('OTP:', otpValue);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{backgroundImage: `url(${loginBg})`, backgroundSize: 'cover'}}>
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
//         <h2 className="text-2xl font-bold text-center">Enter OTP</h2>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div className="flex justify-center space-x-2">
//             {otp.map((value, index) => (
//               <input
//                 key={index}
//                 ref={refs[index] as React.RefObject<HTMLInputElement>}
//                 type="text"
//                 maxLength={1}
//                 className="w-12 h-12 text-3xl text-center border rounded-md"
//                 value={value}
//                 onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
//                 onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
//                 required
//               />
//             ))}
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Submit OTP
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Otp;
