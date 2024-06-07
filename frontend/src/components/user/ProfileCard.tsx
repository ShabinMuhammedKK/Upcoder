


interface PorpsInterface{
    person:string;
    name:string;
    qualification:string;
}

const ProfileCard:React.FC<PorpsInterface> = (props) => {
  return (
    <div className="facBox flex flex-col items-center p-4 bg-black rounded-lg shadow-md">
          <div className="mb-4">
            <img
              src={props.person}
              alt="Arthur Morrison"
              className="rounded-full w-28 h-28 object-cover lg:h-64 lg:w-64"
            />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">{props.name}</h1>
            <h1 className="text-lg text-gray-600">{props.qualification}</h1>
          </div>
        </div>
  )
}

export default ProfileCard