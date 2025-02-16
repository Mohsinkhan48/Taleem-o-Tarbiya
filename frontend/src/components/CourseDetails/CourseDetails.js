import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "animate.css";
import { addCourse } from "../../store";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allCourses = useSelector((state) => state.course.allCourses);
  const cartCourses = useSelector((state) => state.cart.courses);
  const isAuthenticated = localStorage.getItem("token") ? true : false;
  
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  
  const courseDetails = allCourses.find((course) => course.id === parseInt(id, 10));
  const isEnrolled = cartCourses.some((course) => course.id === courseDetails?.id);

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
      {/* Course Banner */}
      <div className="bg-[#0E2431] text-white py-16">
        <div className="container mx-auto px-6 md:flex md:items-center md:justify-between">
          <div className="animate__animated animate__fadeInLeft md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{courseDetails.title}</h1>
            <p className="text-lg mb-6">{courseDetails.description}</p>
            <div className="space-y-3">
              <p><strong>Duration:</strong> {courseDetails.time}</p>
              <p><strong>Chapters:</strong> {courseDetails.chapters}</p>
              <p><strong>Modules:</strong> {courseDetails.modules}</p>
              <p><strong>Rating:</strong> ⭐ {courseDetails.rating}/5</p>
            </div>
          </div>
          <div className="relative animate__animated animate__fadeInRight md:w-1/3">
            <img
              src={courseDetails.image}
              alt={courseDetails.title}
              className="rounded-lg shadow-lg w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Course Content & Sidebar */}
      <div className="container mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Course Overview */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeInUp">
          <h2 className="text-2xl font-bold text-black mb-4">Why You Should Learn This Course</h2>
          <ul className="text-left space-y-3">
            {["Master fundamental concepts and practical skills.", "Boost career opportunities.", "Learn from industry experts.", "Access resources anytime.", "Stay updated with trends.", "Enhance problem-solving skills."].map((point, index) => (
              <li key={index} className="flex items-start gap-3 animate__animated animate__fadeInUp animate__delay-1s">
                <i className="fa fa-check text-green-600 text-lg"></i>
                <p className="text-gray-700">{point}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md sticky top-20 animate__animated animate__fadeInRight">
          <h3 className="text-xl font-semibold mb-4">Course Summary</h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Duration:</strong> {courseDetails.time}</li>
            <li><strong>Chapters:</strong> {courseDetails.chapters}</li>
            <li><strong>Modules:</strong> {courseDetails.modules}</li>
            <li><strong>Rating:</strong> ⭐ {courseDetails.rating}/5</li>
            <li><strong>Price:</strong> ${courseDetails.price}</li>
          </ul>
          
          {isEnrolled && (
            <div className="text-green-600 font-semibold mt-4 animate__animated animate__fadeIn">✅ Enrolled in this course</div>
          )}
          
          <button
            onClick={isEnrolled ? () => navigate("/my-cart") : handleEnroll}
            className={`w-full mt-6 py-3 rounded-lg shadow-md transition-transform duration-300 ${
              isEnrolled ? "bg-secondaryColor text-white hover:scale-105" : "bg-primaryColor text-white hover:scale-105"
            }`}
          >
            {isEnrolled ? "Go to Cart" : "Enroll Now"}
          </button>
        </div>
      </div>
      
      {/* Authentication Prompt */}
      {showAuthPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">You need to log in to enroll</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Sign Up
              </button>
            </div>
            <button
              onClick={() => setShowAuthPrompt(false)}
              className="mt-4 text-gray-600 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
