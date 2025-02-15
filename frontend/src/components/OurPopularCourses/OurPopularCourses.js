import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'animate.css';
import images from '../../images';
import { addCourse } from '../../store';

const OurPopularCourses = ({ secondHeading, heading }) => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Accessing courses from Redux state correctly
  const Courses = useSelector(state => state.cart.courses);

  const handleCourseAdd = (course) => {
    dispatch(addCourse(course));
  };

  const courseData = [
    {
      tab: 'Islamic Courses',
      courses: [
        {
          id: 1,
          title: 'Dawa o Irshad',
          time: '3 hr 30 min',
          price: 30,
          chapters: 10,
          modules: 5,
          rating: 4.5,
          description: 'Understand the foundations of Islamic preaching and guidance for communities.',
          image: images.Dawa_o_Irshad,
        },
        {
          id: 2,
          title: 'Islamic History',
          time: '3 hr 45 min',
          price: 35,
          chapters: 12,
          modules: 6,
          rating: 4.7,
          description: 'Explore the journey of Islam from its inception to modern times.',
          image: images.Islamic_History,
        },
        {
          id: 3,
          title: 'Seerat un Nabi',
          time: '4 hr 0 min',
          price: 40,
          chapters: 15,
          modules: 8,
          rating: 5.0,
          description: 'Dive deep into the life and teachings of the Prophet Muhammad (PBUH).',
          image: images.seerat_un_nabwi,
        },
      ],
    },
  ];

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <section className="bg-bright-white py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-emerald-green mb-6 animate__animated animate__fadeInUp">
          {secondHeading} {heading}
        </h2>
        <p className="text-lg text-charcoal-gray opacity-80 mb-12 max-w-4xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Explore our wide range of courses tailored for students of all levels, offering in-depth knowledge on various Islamic topics.
        </p>

        <div className="tabs mb-10">
          <ul className="flex justify-center space-x-6">
            {courseData.map((tab, index) => (
              <li
                key={index}
                className={`cursor-pointer text-lg font-semibold ${
                  activeTab === index ? 'text-emerald-green' : 'text-charcoal-gray'
                } hover:text-emerald-green transition duration-300 hover:scale-110 transform`}
                onClick={() => setActiveTab(index)}
              >
                {tab.tab}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courseData[activeTab].courses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
              className="animate__animated animate__fadeInUp rounded-xl shadow-md overflow-hidden bg-white cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 hover:scale-110"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-700 mt-2">{course.description}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Duration:</span> {course.time}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Chapters:</span> {course.chapters}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Modules:</span> {course.modules}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation on button click
                      handleCourseAdd(course);
                    }}
                    className="bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700"
                  >
                    Add to Cart
                  </button>
                  <span className="text-sm font-semibold text-emerald-600">{course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurPopularCourses;
