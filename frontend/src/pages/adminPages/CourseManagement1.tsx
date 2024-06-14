// import { ChangeEvent, useEffect, useState } from "react";
// import DashMenu from "../../components/admin/DashMenu";
// import Header from "../../components/admin/Header";
// import { Puff } from "react-loader-spinner";
// import axios from "axios";



// export interface ICourse {
//   title: string;
//   description: string;
//   price: number;
//   prevImage: string;
//   instructor: string;
// }

// // const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dl9db4brv/image/upload";
// // const CLOUDINARY_UPLOAD_PRESET = "qevjzu4w";

// const CourseManagement: React.FC = () => {
//   const initialValue = {
//     title: "",
//     description: "",
//     instructor: "",
//     price: "",
//     prevImage: "",
//   };

//   // const [isMenu, setMenu] = useState(false);
//   // const [courses, setCourses] = useState(true);
//   // const [addCourse, setAddcourse] = useState(true);
//   // const [courseImg, setCourseImg] = useState("");
//   const [loading, _setIsLoading] = useState(false);
//   // const [allCourses, setAllCourses] = useState<ICourse[]>([]);

//   // const [newCourse, setNewCourse] = useState(initialValue);

//   // useEffect(() => {
//   //   try {
//   //     const fetchCourses = async () => {
//   //       const response = await axios.get(
//   //         "http://localhost:3001/course/getcourses"
//   //       );
//   //       if (response.data) {
//   //         setAllCourses(response.data.data);
//   //       }
//   //     };
//   //     fetchCourses();
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // }, []);

//   // const handleMenuShow = () => {
//   //   setMenu(!isMenu);
//   // };

//   // const handleShowCourses = () => {
//   //   setCourses(true);
//   // };
//   // const handleShowUpload = () => {
//   //   setCourses(false);coursemanagement
//   // };
//   // const handleShowAddCourses = () => {
//   //   setAddcourse(true);
//   // };
//   // const handleShowAddLesson = () => {
//   //   setAddcourse(false);
//   // };

//   // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//   //   const { name, value } = e.target;
//   //   setNewCourse({
//   //     ...newCourse,
//   //     [name]: value,
//   //   });
//   // };

//   {
//     /*hanel image*/
//   }
//   const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//       try {
//         const response = await fetch(CLOUDINARY_URL, {
//           method: "POST",
//           body: formData,
//         });

//         const data = await response.json();
//         if (data.secure_url) {
//           setCourseImg(data.secure_url);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   {
//     /*uploading*/
//   }
//   // const handleSubmit = async () => {
//   //   try {
//   //     newCourse.prevImage = courseImg;
//   //     const response = await axios.post(
//   //       "http://localhost:3001/course/addcourse",
//   //       newCourse
//   //     );
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   return (
//     <div>
//       <Header title={"Course Management"} />
//       <DashMenu isMenu={isMenu} handleMenuShow={handleMenuShow} />
//       <div className="min-h-screen bg-black text-white">
//         <div className="h-[4rem] flex justify-end items-center">
//           <button
//             onClick={handleShowCourses}
//             className="bg-purple-700 hover:bg-purple-900 py-3 w-[16rem] mx-6  rounded"
//           >
//             Courses
//           </button>
//           <button
//             onClick={handleShowUpload}
//             className="bg-purple-700 hover:bg-purple-900 py-3 w-[16rem] mx-6 rounded"
//           >
//             Upload Courses
//           </button>
//         </div>
//         {courses ? (
//           <div className="h-auto p-20">
//             <div className="text-white font-bold rounded-2xl flex flex-row justify-around mb-12 items-center">
//               <div>Preview</div>
//               <div>Title</div>
//               <div>Instrector</div>
//               <div>Price</div>
//               <div>Action</div>
//             </div>
//             <div className="border border-gray-900 rounded-2xl bg-gray-900 flex flex-row justify-around h-[8rem] mb-10 items-center">
//               <div>image</div>
//               <div>title</div>
//               <div>instrector</div>
//               <div>Price</div>
//               <div>Action</div>
//             </div>
//           </div>
//         ) : (
//           <div className="container mx-auto p-8 min-h-screen">
//             <div className="bg-gray-900 rounded-2xl p-8">
//               <div className="flex flex-col md:flex-row items-center justify-around mb-8">
//                 {addCourse === true ? (
//                   <div>
//                     <h1 className="text-xl  text-white mb-4 md:mb-0">
//                       New Course
//                     </h1>
//                   </div>
//                 ) : (
//                   <div>
//                     <h1 className="text-xl  text-white">New Lesson</h1>
//                   </div>
//                 )}
//               </div>
//               <div className="flex flex-col md:flex-row items-center justify-center">
//                 {/* Course Section */}
//                 {addCourse ? (
//                   <div>
//                     <div className="w-full flex flex-col justify-center items-center md:items-start mb-8 md:mb-0">
//                       <div className="md:flex items-center justify-center md:justify-start mb-4 w-full">
//                         <div className="bg-black h-72 w-96 flex justify-center items-center rounded-2xl mr-8">
//                           <button className="text-white">
//                             <input type="file" onChange={handleImageChange} />
//                           </button>
//                         </div>
//                         <div className="flex flex-col w-96">
//                           <input
//                             type="text"
//                             name="title"
//                             value={newCourse.title}
//                             onChange={handleInputChange}
//                             placeholder="Title"
//                             className="bg-gray-800 text-white py-2 px-4 mb-4 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-gray-700"
//                           />
//                           <input
//                             name="description"
//                             placeholder="Description"
//                             value={newCourse.description}
//                             onChange={handleInputChange}
//                             className="bg-gray-800 text-white py-2 px-4 mb-4 rounded-lg h-24 placeholder-gray-500 focus:outline-none focus:bg-gray-700"
//                           />
//                           <input
//                             type="text"
//                             name="instructor"
//                             value={newCourse.instructor}
//                             onChange={handleInputChange}
//                             placeholder="Instructor"
//                             className="bg-gray-800 text-white py-2 px-4 mb-4 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-gray-700"
//                           />
//                           <input
//                             type="text"
//                             name="price"
//                             value={newCourse.price}
//                             onChange={handleInputChange}
//                             placeholder="Price"
//                             className="bg-gray-800 text-white py-2 px-4 mb-4 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-gray-700"
//                           />
//                           <button
//                             onClick={handleSubmit}
//                             className="bg-purple-700 mb-5 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                           >
//                             Save
//                           </button>
//                           <button
//                             onClick={handleShowAddLesson}
//                             className="border border-gray-600 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                           >
//                             Add new lesson
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div>
//                     <div className="w-full flex flex-col justify-center items-center md:items-start">
//                       <div className="md:flex items-center justify-evenly mb-4">
//                         <div className="bg-black  h-72 w-96 flex justify-center items-center rounded-2xl mr-8">
//                           <button className="text-white">
//                             Click to Upload Preview Image
//                           </button>
//                         </div>
//                         <div className="flex flex-col w-96">
//                           <input
//                             type="text"
//                             name="title"
//                             placeholder="Title"
//                             className="bg-gray-800  text-white py-2 px-4 mb-4 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-gray-700"
//                           />
//                           <textarea
//                             name="description"
//                             placeholder="Description"
//                             className="bg-gray-800 text-white py-2 px-4 mb-4 rounded-lg h-24 placeholder-gray-500 focus:outline-none focus:bg-gray-700"
//                           />
//                           <select className="bg-gray-800 text-white py-2 px-4 mb-4 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-gray-700">
//                             <option value="someOption">Some option</option>
//                             <option value="otherOption">Other option</option>
//                           </select>
//                           <input
//                             type="text"
//                             name="Duration"
//                             placeholder="Duration"
//                             className="bg-gray-800 text-white py-2 px-4 mb-4 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-gray-700"
//                           />
//                           <input
//                             type="file"
//                             name="lessonfile"
//                             placeholder="lessonfile"
//                             className="bg-gray-800 text-white py-2 px-4 mb-4 rounded-lg placeholder-gray-500 focus:outline-none focus:bg-gray-700"
//                           />
//                           <button className="bg-purple-700 mb-5 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                             Add
//                           </button>
//                           <button
//                             onClick={handleShowAddCourses}
//                             className="border border-gray-600 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                           >
//                             Add new course
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/*uploaded details*/}
//             <div className="mt-10 flex justify-center text-xl">
//               <h1>Courses</h1>
//             </div>
//             <div className=" bg-gray-900 rounded-2xl p-8 min-h-56 mt-5">
//               {loading === true ? (
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Puff
//                     height={100}
//                     width={100}
//                     radius={1}
//                     color="purple"
//                     ariaLabel="puff-loading"
//                     visible={true}
//                   />
//                   <p>Loading...</p>
//                 </div>
//               ) : (
//                 <CourseList allCourses={allCourses} />
//               )}
//             </div>
//             {addCourse === false && (
//               <div className="bg-gray-900 rounded-2xl p-8 h-56 mt-5">
//                 <h1>Lessons</h1>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseManagement;
