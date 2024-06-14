import axios from "axios";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";



const CourseDetails:React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  if (id !== null) {
    setSearchParams(id);
  }


  useEffect(()=>{
    try {
      
      const fetchData = async()=>{
        const response = await axios.post("http://localhost:3001/course/coursedetails",{id})
        console.log(response)
      }
      fetchData();

    } catch (error) {
      console.log(error);
    }
    
  },[])


  return (<>
    <div className="text-white border rounded-md mx-20 mt-10 border-gray-700 ">
      <div className=" flex justify-end">
        <button className=" flex justify-center bg-green-700 w-auto p-5 h-10 items-center rounded-md mr-3 mt-5">
          Upload new lesson
        </button>
        <button className=" flex justify-cente border border-gray-600  hover:text-black hover:bg-white w-auto p-5 h-10 items-center rounded-md mr-10 mt-5">
          <Link to="/admin/coursemanagement">All courses</Link>
        </button>
      </div>
      <h1 className=" flex justify-center text-2xl">Course Details</h1>
      <div>
        <div className="mt-5 border border-gray-700 min-h-80 flex justify-between border-l-0 border-r-0">
          <div className="w-1/3 flex justify-center items-center">asdf</div>
          <div className="w-1/3 flex flex-col  justify-center items-center">
            <div className="h-1/2 flex justify-center items-center">
              Course name
            </div>
            <div className="h-1/2 flex justify-center items-start">
              Description
            </div>
          </div>
          <div className="w-1/3 flex justify-center items-center flex-col">
            <div className="h-1/3 flex items-end">price</div>
            <div className="h-1/3 flex items-end">Intructor</div>
            <div className="h-1/3 flex items-start">review</div>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-3 mx-20 text-white border border-gray-700 rounded-md">
        <table className="w-full">
            <thead className="flex font-bold bg-purple-700 min-h-14 items-center">
              <div className="w-1/5 flex justify-center">IMAGE</div>
              <div className="w-1/5 flex justify-center">TOPIC</div>
              <div className="w-1/5 flex justify-center">DESCRIPTION</div>
              <div className="w-1/5 flex justify-center">DURATION</div>
              <div className="w-1/5 flex justify-center">ACTION</div>
            </thead>
            <tbody className="py-10 flex hover:bg-gray-950">
              <div className="w-1/5 flex justify-center items-center">image</div>
              <div className="w-1/5 flex justify-center items-center">asdf</div>
              <div className="w-1/5 flex justify-center items-center">asdf</div>
              <div className="w-1/5 flex justify-center items-center">asdgfsdafadsf</div>
              <div className="w-1/5 flex justify-center items-center">
                <button className=" flex justify-center bg-red-700 w-28 h-10 items-center rounded-md">
                  Unlist
                </button>
              </div>
            </tbody>
          </table>
        </div>
    </>
  );
};

export default CourseDetails;
function useQuery() {
  throw new Error("Function not implemented.");
}

