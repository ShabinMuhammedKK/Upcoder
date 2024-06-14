import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type ShowModalType = {
  handleModalShow: () => void;
};

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dl9db4brv/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "qevjzu4w";

const ModalComponent: React.FC<ShowModalType> = ({ handleModalShow }) => {
const navigate = useNavigate();


  
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    price: "",
    prevImage:"",
  });
  const [courseImg, setCourseImg] = useState("");

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  {
    /*hanel image*/
  }
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
          console.log(data.secure_url)
          setCourseImg(data.secure_url);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  {
    /*uploading*/
  }
  const handleSubmit = async () => {
    try {
      newCourse.prevImage = courseImg;
      const response = await axios.post(
        "http://localhost:3001/course/addcourse",
        newCourse
      );
      console.log(response.data)
      if(response.data.success === true){
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
  <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
    <div className="p-6">
      <h1 className="font-bold text-2xl text-center mb-4">Add New Course</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={newCourse.title}
            onChange={handleInputChange}
            placeholder="Enter course title"
            className="bg-gray-100 text-gray-900 py-2 px-4 rounded-lg w-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">Description</label>
          <textarea
            name="description"
            value={newCourse.description}
            onChange={handleInputChange}
            placeholder="Enter course description"
            className="bg-gray-100 text-gray-900 py-2 px-4 rounded-lg w-full h-24 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="instructor">Instructor</label>
          <input
            type="text"
            name="instructor"
            value={newCourse.instructor}
            onChange={handleInputChange}
            placeholder="Enter instructor name"
            className="bg-gray-100 text-gray-900 py-2 px-4 rounded-lg w-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            value={newCourse.price}
            onChange={handleInputChange}
            placeholder="Enter course price"
            className="bg-gray-100 text-gray-900 py-2 px-4 rounded-lg w-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="previmage">Preview Image</label>
          <input
            type="file"
            name="previmage"
            onChange={handleImageChange}
            className="bg-gray-100 text-gray-900 py-2 px-4 rounded-lg w-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleModalShow}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default ModalComponent;
