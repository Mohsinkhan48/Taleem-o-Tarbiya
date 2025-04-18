import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { SERVER_URL } from "../../../constants/env.constants";

const CourseDetails = () => {
  const { id } = useParams();
  const allCourses = useSelector((state: RootState) => state.course.allCourses);


  const courseDetails = allCourses.find((course) => course._id === id);

  useEffect(() => {
    if (!courseDetails) {
      console.error("Course not found");
    }
  }, [courseDetails]);

  if (!courseDetails) {
    return (
      <div className="text-center text-red-500 py-10 animate__animated animate__fadeIn">
        Course not found. Please check the course ID.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 animate__animated animate__fadeIn">
      <div className="bg-[#0E2431] text-white py-16">
        <div className="container mx-auto px-6 md:flex md:items-center md:justify-between">
          <div className="animate__animated animate__fadeInLeft md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{courseDetails.title}</h1>
            <p className="text-lg mb-6">{courseDetails.description}</p>
            <div className="space-y-3">
              <p><strong>Duration:</strong> {courseDetails.duration}</p>
              <p><strong>Category:</strong> {courseDetails.category}</p>
              <p><strong>Price:</strong> $ {courseDetails.price}</p>
            </div>
          </div>
          <div className="relative animate__animated animate__fadeInRight md:w-1/3">
            <img
              src={`${SERVER_URL}${courseDetails.image}`}
              alt={courseDetails.title}
              className="rounded-lg shadow-lg w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Course Summary</h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Duration:</strong> {courseDetails.duration}</li>
            <li><strong>Category:</strong> {courseDetails.category}</li>
            <li><strong>Price:</strong> $ {courseDetails.price}</li>
          </ul>

          <button
            className={`w-full mt-6 py-3 rounded-lg transition-all bg-blue-600 text-white}`}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
