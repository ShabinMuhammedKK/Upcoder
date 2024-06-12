import React from 'react';


type Course = {
    prevImage: string;
    title: string;
    description: string;
    instructor: string;
    price: string;
};

type CourseListProps = {
    allCourses: Course[];
};

const CourseList:React.FC<CourseListProps> = ({ allCourses }) => {
    return (
        <div>
            {allCourses.length > 0 ? (
                <>
                    <div className="flex flex-row justify-around h-[3rem] mb-4 items-center font-bold">
                        <div className="w-56">Image</div>
                        <div>Title</div>
                        <div>Description</div>
                        <div>Instructor</div>
                        <div>Price</div>
                        <div>Action</div>
                    </div>
                    {allCourses.map((item: { prevImage: string | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; instructor: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                        <div key={index} className="flex flex-row justify-around h-[8rem] mb-10 items-center">
                            <div className="w-56">
                                <img
                                    className="w-full"
                                    src={item.prevImage}
                                    alt="course img"
                                />
                            </div>
                            <div>{item.title}</div>
                            <div>{item.description}</div>
                            <div>{item.instructor}</div>
                            <div>{item.price}</div>
                            <button className="border border-gray-600 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Unlist
                            </button>
                        </div>
                    ))}
                </>
            ) : (
                <p>No courses available</p>
            )}
        </div>
    );
};

export default CourseList;
