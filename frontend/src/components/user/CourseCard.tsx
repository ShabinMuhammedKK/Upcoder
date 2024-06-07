

interface PropTypes {
    image:string;
    name:string;
    description:string;

}



const CourseCard:React.FC<PropTypes> = (props) => {
  return (
    <div className="facBox  flex flex-col items-center px-2 bg-black rounded-lg shadow-md">
          <div className="mb-4">
            <img
              src={props.image}
              alt="Arthur Morrison"
              className="rounded-2xl w-28 h-28 object-cover lg:h-40 lg:w-full"
            />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">{props.name}</h1>
            <h1 className="text-lg text-gray-600">{props.description}</h1>
          </div>
        </div>
  )
}

export default CourseCard