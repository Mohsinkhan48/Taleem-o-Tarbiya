import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'animate.css';
import { fetchAllCourses } from '../../redux/features/CourseSlice';

const OurPopularCourses = ({ secondHeading, heading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allCourses = useSelector(state => state.course.allCourses);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <section className="bg-bright-white py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primaryColor mb-6 animate__animated animate__fadeInUp">
          {secondHeading} {heading}
        </h2>
        <p className="text-lg text-charcoal-gray opacity-80 mb-12 max-w-4xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Explore our wide range of courses tailored for students of all levels, offering in-depth knowledge on various topics.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {allCourses && allCourses.length > 0 ? (
            allCourses.map((course) => (
              <div
                key={course._id}
                onClick={() => handleCourseClick(course._id)}
                className="animate__animated animate__fadeInUp rounded-xl shadow-md overflow-hidden bg-white cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={`http://localhost:8080${course.image}`}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-secondaryColor">{course.title}</h3>
                  <p className="text-sm text-gray-700 mt-2">{course.content}</p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Duration:</span> {course.duration}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Chapters:</span> {course.chapters}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      className="bg-primaryColor text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700"
                    >
                      Enroll Now
                    </button>
                    <span className="text-sm font-semibold text-primaryColor">${course.price}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-600">No courses available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurPopularCourses;
