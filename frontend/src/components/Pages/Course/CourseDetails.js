import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
;
import { addCourse } from "../../redux/features/CartSlice";
import { BACKEND_URL } from "../../constants";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allCourses = useSelector((state) => state.course.allCourses);
  const cartCourses = useSelector((state) => state.cart.courses);
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const courseDetails = allCourses.find((course) => course._id === id);
  const isEnrolled = cartCourses.some((course) => course._id === courseDetails?._id);

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

  const handleEnroll = () => {
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      return;
    }
    if (!isEnrolled) {
      dispatch(addCourse(courseDetails));
    }
  };

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
              src={`${BACKEND_URL}${courseDetails.image}`}
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

          {isEnrolled && (
            <div className="text-green-600 font-semibold mt-4">
              ✅ Enrolled in this course
            </div>
          )}

          <button
            onClick={isEnrolled ? () => navigate("/my-cart") : handleEnroll}
            className={`w-full mt-6 py-3 rounded-lg transition-all ${
              isEnrolled ? "bg-gray-400 text-white" : "bg-blue-600 text-white"
            }`}
          >
            {isEnrolled ? "Go to Cart" : "Enroll Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
