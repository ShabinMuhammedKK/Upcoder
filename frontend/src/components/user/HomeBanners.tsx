
import { person1,person2,person3,person4,course1,course2,course3,course4 } from "../../assets";
import CourseCard from "./CourseCard";

import ProfileCard from "./ProfileCard";

const HomeBanners = () => {
  return (
    <div className="homebanners">
      <h1 className="mt-10 text-[28px]">Our Team</h1>
      <div className="h-full  courses flex flex-col md:flex-row justify-evenly mt-10 md:px-0 px-10">
        <ProfileCard person={person1} name="Chris Doyle" qualification="Machine Learning | 5+ years"/>
        <ProfileCard person={person2} name="Suzanne Harvey" qualification="React | 7+ years"/>
        <ProfileCard person={person3} name="Erick Moreno" qualification="Block Chain | 3+ years"/>
        <ProfileCard person={person4} name="Ruvanto Sandros" qualification="Python | 3+ years"/>
      </div>


      <h1 className="mt-10 text-[28px]">Top Trending Course</h1>
      <div className="h-full  courses flex flex-col md:flex-row justify-evenly mt-10 md:px-0 px-10">
        <CourseCard image={course1} name="sdlfjh" description="sdfgsdaf"/>
        <CourseCard image={course2} name="sdlfjh" description="sdfg"/>
        <CourseCard image={course3} name="sdlfjh" description="asdfg"/>
        <CourseCard image={course4} name="sdlfjh" description="sdafg"/>
        </div>
      <h1 className="mt-10 text-[28px] ">New Reads</h1>
      <div className="h-full  courses flex flex-col md:flex-row justify-evenly mt-10 md:px-0 px-10">
        <CourseCard image={course1} name="sdlfjh" description="sdfgsdaf"/>
        <CourseCard image={course2} name="sdlfjh" description="sdfg"/>
        <CourseCard image={course3} name="sdlfjh" description="asdfg"/>
        <CourseCard image={course4} name="sdlfjh" description="sdafg"/>
        </div>
    </div>
  );
};

export default HomeBanners;
