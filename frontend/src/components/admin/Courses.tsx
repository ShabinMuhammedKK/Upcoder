import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface ICourse {
  _id:string;
  title: string;
  description: string;
  price: number;
  prevImage: string;
  instructor: string;
}




type ModalType = {
  handleShowModal:()=>void
}




const Courses:React.FC<ModalType> = ({handleShowModal}) => {
  const navigate = useNavigate()


  const [allCourses, setAllCourses] = useState<ICourse[]>([]);

  const handleCourseDetails =(courseId:string)=>{
    try {
      navigate(`/admin/coursedetails?id=${courseId}`)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      const fetchCourses = async () => {
        const response = await axios.get(
          "http://localhost:3001/course/getcourses"
        );
        if (response.data) {
          setAllCourses(response.data.data);
        }
      };
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="text-white border rounded-md mx-20 mt-10 border-gray-700 min-h-screen">
      <div className=" flex justify-end">
      <button onClick={handleShowModal} className=" flex justify-center bg-green-700 w-auto p-5 h-10 items-center rounded-md mr-3 mt-5">
      Add new course
        </button>
      </div>
      <h1 className=" flex justify-center text-2xl">Courses</h1>
      <div>
        <div className="mt-10">
          <table className="w-full">
            <thead className="flex font-bold bg-purple-700 min-h-14 items-center">
              <div className="w-1/6 flex justify-center">IMAGE</div>
              <div className="w-1/6 flex justify-center">COURSE NAME</div>
              <div className="w-1/6 flex justify-center">INSTRUCTOR</div>
              <div className="w-1/6 flex justify-center">DESCRIPTION</div>
              <div className="w-1/6 flex justify-center">PRICE</div>
              <div className="w-1/6 flex justify-center">ACTION</div>
            </thead>
            <tbody>
    {allCourses.length > 0 ? (
      allCourses.map((course, index) => (
        <tr onClick={()=>handleCourseDetails(course._id)} key={index} className="flex hover:bg-gray-950">
          <td className="w-1/6 flex justify-center items-center">
            <img src={course.prevImage} alt="prev img" className="h-12 w-12 object-cover rounded-md" />
          </td>
          <td className="w-1/6 flex justify-center items-center">{course.title}</td>
          <td className="w-1/6 flex justify-center items-center">{course.instructor}</td>
          <td className="w-1/6 flex justify-center items-center">{course.description}</td>
          <td className="w-1/6 flex justify-center items-center">{course.price}</td>
          <td className="w-1/6 flex justify-center items-center">
            <button className="bg-red-700 text-white px-4 py-2 rounded-md">
              Unlist
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr className="flex justify-center">
        <td className="py-4">
          <h1>No courses available</h1>
        </td>
      </tr>
    )}
  </tbody>
            
          </table>
        </div>
      </div>
    </div>
  );
};

export default Courses;
