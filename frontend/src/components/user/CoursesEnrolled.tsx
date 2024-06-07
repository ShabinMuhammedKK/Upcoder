import React from 'react';

interface CoursesEnrolledProps {
  courses: string[];
}

const CoursesEnrolled: React.FC<CoursesEnrolledProps> = ({ courses }) => {
  return (
    <div className="courses-enrolled flex items-center justify-center">
    <h1 className='font-thin text-[150px]'>3</h1>
    </div>
  );
};

export default CoursesEnrolled;
